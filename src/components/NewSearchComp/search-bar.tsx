"use client";

import type React from "react";
import { useFormik } from "formik";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { LocationSearch } from "./location-search";
import { DateRangePicker } from "./date-range-picker";
import { GuestSelector } from "./guest-selector";
import { format } from "date-fns";
import { useRecentSearches } from "../../hooks/use-recent-searches";
import { useOnClickOutside } from "../../hooks/useClickOutside";
import { cn } from "../../lib/utils";
import type { ILocationDetails } from "../../models/Location.model";
import { SearchSidebar } from "../searchSideBar/SearchSideBar";
import { LocationDisplay } from "./location-display";
import { DateDisplay } from "./date-display";
import { GuestDisplay } from "./guest-display";
import { api } from "../../utils/api";

export type SearchSection =
  | "location"
  | "checkIn"
  | "checkOut"
  | "guests"
  | null;

export interface SearchBarProps {
  className?: string;
  variant?: "default" | "expanded";
  initialSection?: SearchSection;
  scrolled?: boolean;
  isActivePage?: boolean;
  onSearch?: (searchParams: {
    location: string;
    placeId: string;
    checkIn: Date | null;
    checkOut: Date | null;
    guests: {
      adult: number;
      kid: number;
      infant: number;
      pet: number;
    };
  }) => void;
}

export function SearchBar({
  className,
  variant = "default",
  initialSection = null,
  scrolled = false,
  isActivePage = false,
  onSearch,
}: SearchBarProps) {
  const [activeSection, setActiveSection] =
    useState<SearchSection>(initialSection);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState({
    adult: 0,
    kid: 0,
    infant: 0,
    pet: 0,
  });
  const [isWideLayout, setIsWideLayout] = useState(false);
  const [locationName, setLocationName] = useState<string[]>([]);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { recentSearches, addRecentSearch } = useRecentSearches();

  const {
    values,
    handleSubmit: formikHandleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      placeId: "",
      startDate: "",
      endDate: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const searchParams = new URLSearchParams();

        // Always ensure we have the latest date values from state
        const currentValues = {
          ...values,
          startDate: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
          endDate: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
        };

        // Check if we have any search criteria
        const hasFilters =
          currentValues.placeId ||
          (currentValues.startDate && currentValues.endDate);

        if (currentValues.placeId) {
          searchParams.set("placeId", currentValues.placeId);
        }

        // Always include dates if they exist
        if (checkIn) {
          searchParams.set("startDate", format(checkIn, "yyyy-MM-dd"));
        }

        if (checkOut) {
          searchParams.set("endDate", format(checkOut, "yyyy-MM-dd"));
        }

        // Add guest information
        if (guests.adult > 0) {
          searchParams.set(
            `adult${guests.adult > 1 ? "s" : ""}`,
            guests.adult.toString()
          );
        }

        if (guests.kid > 0) {
          searchParams.set(
            `kid${guests.kid > 1 ? "s" : ""}`,
            guests.kid.toString()
          );
        }

        if (guests.infant > 0) {
          searchParams.set(
            `infant${guests.infant > 1 ? "s" : ""}`,
            guests.infant.toString()
          );
        }

        if (guests.pet > 0) {
          searchParams.set(
            `pet${guests.pet > 1 ? "s" : ""}`,
            guests.pet.toString()
          );
        }

        // If no placeId and no dates, just redirect to "/search"
        const searchUrl = hasFilters
          ? `/search?${searchParams.toString()}`
          : `/search`;

        // Save to recent searches if we have a location
        if (location && currentValues.placeId) {
          addRecentSearch({
            locationName: location,
            placeId: currentValues.placeId,
            startDate: currentValues.startDate,
            endDate: currentValues.endDate,
            adult: guests.adult,
            kid: guests.kid,
            infant: guests.infant,
            pet: guests.pet,
          });
        }

        // Open search results in a new tab
        window.open(searchUrl, "_blank");

        // Also call the onSearch prop if provided
        if (onSearch) {
          onSearch({
            location,
            placeId: currentValues.placeId,
            checkIn,
            checkOut,
            guests,
          });
        }
      } finally {
        setLoading(false);
        setGuests({
          adult: 0,
          kid: 0,
          infant: 0,
          pet: 0,
        });
        setActiveSection(null);
        setLocation("");
        setCheckIn(null);
        setCheckOut(null);
      }
    },
  });

  const resetSearchBar = () => {
    setLocation("");
    setCheckIn(null);
    setCheckOut(null);
    setGuests({
      adult: 0,
      kid: 0,
      infant: 0,
      pet: 0,
    });
    setValues({
      placeId: "",
      startDate: "",
      endDate: "",
    });
    setActiveSection(null);
  };

  // Create a custom submit handler that prevents default form behavior
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure form values are up to date with the latest date selections
    if (checkIn) {
      setValues((prev) => ({
        ...prev,
        startDate: format(checkIn, "yyyy-MM-dd"),
      }));
    }

    if (checkOut) {
      setValues((prev) => ({
        ...prev,
        endDate: format(checkOut, "yyyy-MM-dd"),
      }));
    }

    // Submit the form
    formikHandleSubmit(e as any);
  };

  useOnClickOutside(searchBarRef, () => {
    setActiveSection(null);
  });

  // When check-in is selected, automatically focus on check-out
  useEffect(() => {
    if (activeSection === "checkIn" && checkIn) {
      setActiveSection("checkOut");
    }
  }, [checkIn]);

  // Add a new useEffect to handle when both dates are selected
  useEffect(() => {
    if (checkIn && checkOut) {
      // Wait a moment before switching to guests section
      setTimeout(() => {
        setActiveSection("guests");
      }, 300);
    }
  }, [checkIn, checkOut]);

  // Add this useEffect to ensure the search bar is inactive when the component mounts or when returning to the page
  useEffect(() => {
    // Reset all fields when component mounts or when user returns to the page
    resetSearchBar();

    return () => {
      // Cleanup function to ensure state is reset when component unmounts
      resetSearchBar();
    };
  }, []);

  // Update form values when dates change
  useEffect(() => {
    if (checkIn) {
      setValues((prev) => ({
        ...prev,
        startDate: format(checkIn, "yyyy-MM-dd"),
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        startDate: "",
      }));
    }

    if (checkOut) {
      setValues((prev) => ({
        ...prev,
        endDate: format(checkOut, "yyyy-MM-dd"),
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        endDate: "",
      }));
    }
  }, [checkIn, checkOut, setValues]);

  const handleLocation = (data: ILocationDetails) => {
    setValues({
      ...values,
      placeId: data.place_id,
    });

    // Move to next section after location is selected
    setTimeout(() => {
      setActiveSection("checkIn");
    }, 300);
  };

  const totalGuests = guests.adult + guests.kid;

  const clearCheckIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckIn(null);
    setValues((prev) => ({
      ...prev,
      startDate: "",
    }));
  };

  const clearCheckOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckOut(null);
    setValues((prev) => ({
      ...prev,
      endDate: "",
    }));
  };

  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  useEffect(() => {
    // Parse URL parameters when component mounts
    const parseUrlParams = async () => {
      try {
        // Get the current URL
        const url = new URL(window.location.href);
        const params = url.searchParams;

        // Check if we have any search parameters
        if (params.toString()) {
          // Parse location and placeId
          const placeId = params.get("placeId");

          // Parse dates
          const startDateStr = params.get("startDate");
          const endDateStr = params.get("endDate");

          // Parse guests - handle both singular and plural parameter names
          const adults = Number.parseInt(
            params.get("adults") || params.get("adult") || "0"
          );
          const kids = Number.parseInt(
            params.get("kids") || params.get("kid") || "0"
          );
          const infants = Number.parseInt(
            params.get("infants") || params.get("infant") || "0"
          );
          const pets = Number.parseInt(
            params.get("pets") || params.get("pet") || "0"
          );

          // Update state with URL parameters
          if (placeId) {
            setValues((prev) => ({ ...prev, placeId }));

            // Fetch location name based on placeId
            try {
              const res = await api.get(
                `/google/get-google-nearby?place_id=${placeId}`
              );
              const finalData = res.data.data;

              if (finalData) {
                const addressComponents = finalData.address_components;

                const getAddressPart = (types: string[]) => {
                  const component = addressComponents.find((comp: any) =>
                    types.every((type) => comp.types.includes(type))
                  );
                  return component ? component.long_name : "";
                };

                // Construct full address
                const addressLine1Parts = [
                  finalData.name,
                  getAddressPart(["premise"]),
                  getAddressPart(["street_number"]),
                  getAddressPart(["route"]),
                ].filter(Boolean);

                setLocationName(addressLine1Parts);

                const fullAddress = [
                  addressLine1Parts.join(", "),
                  getAddressPart(["country", "political"]),
                ]
                  .filter(Boolean)
                  .join(" - ");

                setLocation(fullAddress);
              }
            } catch (error) {
              console.error("Error fetching location details:", error);
            }
          }

          // Set dates if available
          if (startDateStr) {
            const startDate = new Date(startDateStr);
            if (!isNaN(startDate.getTime())) {
              setCheckIn(startDate);
              setValues((prev) => ({
                ...prev,
                startDate: format(startDate, "yyyy-MM-dd"),
              }));
            }
          }

          if (endDateStr) {
            const endDate = new Date(endDateStr);
            if (!isNaN(endDate.getTime())) {
              setCheckOut(endDate);
              setValues((prev) => ({
                ...prev,
                endDate: format(endDate, "yyyy-MM-dd"),
              }));
            }
          }

          // Set guest counts
          if (adults > 0 || kids > 0 || infants > 0 || pets > 0) {
            setGuests({
              adult: adults,
              kid: kids,
              infant: infants,
              pet: pets,
            });
          }
        }
      } catch (error) {
        console.error("Error parsing URL parameters:", error);
      }
    };

    parseUrlParams();
  }, []);

  const getGuestDisplayText = () => {
    if (totalGuests === 0) return "Add guests";

    let displayText = `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`;

    // Add infants if any
    if (guests.infant > 0) {
      displayText += `, ${guests.infant} infant${
        guests.infant !== 1 ? "s" : ""
      }`;
    }

    // Add pets if any
    if (guests.pet > 0) {
      displayText += `, ${guests.pet} pet${guests.pet !== 1 ? "s" : ""}`;
    }

    return displayText;
  };

  // Render compact search bar if scrolled is true
  if (scrolled) {
    return (
      <div
        ref={searchBarRef}
        className={cn(
          "fixed top-20 left-0 right-0 flex justify-center transition-all duration-200 transform " ,
          isActivePage
            ? "opacity-100 translate-y-0"
            : scrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none",
          "z-30",
          className
        )}>
        <div
          className={cn(
            "flex items-center transition-all duration-300 mx-2 cursor-pointer",
            "bg-white rounded-full shadow-lg border border-primary-gold",
            isWideLayout ? "w-auto" : "w-auto",
            "p-4 mt-[-64px] gap-2 h-12 hover:shadow-xl hover:border-primary-gold/50"
          )}
          onClick={() => setActiveSection("location")}>
          <div className={cn("flex items-center flex-1 flex-row gap-2")}>
            <div
              className={cn(
                "flex items-center justify-between",
                isWideLayout ? "w-full gap-4" : "w-full ml-4 gap-4",
                "mx-auto text-sm"
              )}>
              <LocationDisplay
                locationName={locationName}
                isLoading={location === "" && values.placeId !== ""}
                placeId={values.placeId}
              />
              <span className="text-gray-400">|</span>
              <DateDisplay startDate={checkIn} endDate={checkOut} />
              <span className="text-gray-400">|</span>
              <GuestDisplay guestCounts={guests} />
            </div>
          </div>

          <button
            type="button"
            className={cn(
              "-mr-2.5 rounded-full flex items-center justify-center text-white transition-all p-2 bg-primary-gold hover:bg-primary-gold/90"
            )}>
            <Search className={cn("text-white h-4 w-4")} />
          </button>
        </div>
      </div>
    );
  }

  // Render full-width search bar
  return (
    <div
      className={cn("relative w-full max-w-7xl mx-auto", className)}
      ref={searchBarRef}>
      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            "lg:flex hidden items-center rounded-full bg-white shadow-lg transition-all duration-300 border border-black/20",
            activeSection && "shadow-none p-0.5 bg-[#EBEBEB] border-[#EBEBEB]"
          )}>
          {/* Location Section */}
          <div
            className={cn(
              "group relative flex-1 min-w-[33%] p-4 py-7 rounded-l-full cursor-pointer transition-all duration-200",
              activeSection === "location"
                ? "bg-white shadow-md rounded-full"
                : "hover:bg-none rounded-full"
            )}
            onClick={() => setActiveSection("location")}
            data-section="location">
            <div className="flex flex-col ml-6">
              <span className="text-gray-800 text-xs font-medium">Where</span>
              <span
                className={cn(
                  "text-sm truncate",
                  location ? "text-gray-900 font-medium" : "text-gray-500"
                )}>
                {location ? location : "Search destinations"}
              </span>
            </div>
          </div>

          <div
            className={cn(
              "h-8 w-px",
              activeSection === "location" || activeSection === "checkIn"
                ? "bg-none"
                : "bg-gray-300"
            )}
          />

          {/* Check-in Section */}
          <div
            className={cn(
              "relative w-36 p-4 cursor-pointer transition-all duration-200",
              activeSection === "checkIn"
                ? "bg-white shadow-md rounded-full"
                : "hover:bg-none rounded-full"
            )}
            onClick={() => setActiveSection("checkIn")}
            data-section="checkIn">
            <div className="flex flex-col ml-3">
              <span className="text-xs text-gray-800 font-medium">
                Check in
              </span>
              <div className="flex items-center">
                <span
                  className={cn(
                    "text-sm truncate",
                    checkIn ? "text-gray-900 font-medium" : "text-gray-500"
                  )}>
                  {checkIn ? format(checkIn, "d MMM") : "Add dates"}
                </span>
                {checkIn && (
                  <button
                    onClick={clearCheckIn}
                    className="ml-1 p-1 rounded-full hover:bg-gray-100"
                    aria-label="Clear check-in date"
                    type="button">
                    <X className="h-3 w-3 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div
            className={cn(
              "h-8 w-px",
              activeSection === "checkIn" || activeSection === "checkOut"
                ? "bg-none"
                : "bg-gray-300"
            )}
          />

          {/* Check-out Section */}
          <div
            className={cn(
              "relative w-36 p-4 cursor-pointer transition-all duration-200",
              activeSection === "checkOut"
                ? "bg-white shadow-md rounded-full"
                : "hover:bg-none rounded-full"
            )}
            onClick={() => setActiveSection("checkOut")}
            data-section="checkOut">
            <div className="flex flex-col ml-3">
              <span className="text-xs text-gray-800 font-medium">
                Check out
              </span>
              <div className="flex items-center">
                <span
                  className={cn(
                    "text-sm truncate",
                    checkOut ? "text-gray-900 font-medium" : "text-gray-500"
                  )}>
                  {checkOut ? format(checkOut, "d MMM") : "Add dates"}
                </span>
                {checkOut && (
                  <button
                    onClick={clearCheckOut}
                    className="ml-1 p-1 rounded-full hover:bg-gray-100"
                    aria-label="Clear check-out date"
                    type="button">
                    <X className="h-3 w-3 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div
            className={cn(
              "h-8 w-px",
              activeSection === "checkOut" || activeSection === "guests"
                ? "bg-none"
                : "bg-gray-300"
            )}
          />

          {/* Guests Section */}
          <div
            className={cn(
              "relative w-48 p-4 cursor-pointer transition-all duration-200",
              activeSection === "guests"
                ? "bg-white shadow-md rounded-full"
                : "hover:bg-none rounded-full"
            )}
            onClick={() => setActiveSection("guests")}
            data-section="guests">
            <div className="flex flex-col ml-3">
              <span className="text-xs text-gray-800 font-medium">Who</span>
              <span
                className={cn(
                  "text-sm truncate",
                  totalGuests ? "text-gray-900 font-medium" : "text-gray-500"
                )}>
                {getGuestDisplayText()}
              </span>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "flex items-center justify-center h-12 bg-primary-gold hover:bg-primary-gold/90 text-white rounded-full ml-2 mr-2 transition-all duration-200",
              loading ? "opacity-70" : "",
              activeSection ? "px-5 w-auto" : "w-12"
            )}
            aria-label="Search">
            <Search className="h-5 w-5" />
            {activeSection && <span className="ml-2">Search</span>}
          </button>
        </div>
      </form>

      <div className="lg:hidden flex px-4 -mt-2">
        <SearchSidebar />
      </div>

      {/* Dropdown Panels */}
      {activeSection === "location" && (
        <LocationSearch
          value={location}
          onChange={(newLocation) => {
            setLocation(newLocation);
            if (!newLocation) {
              // If location is cleared, reset the placeId
              setValues((prev) => ({ ...prev, placeId: "" }));
            }
          }}
          onSelect={(data) => {
            handleLocation(data);
            setActiveSection(null);
          }}
          onClose={() => setActiveSection(null)}
          recentSearches={recentSearches}
          onRecentSearchSelect={() => {
            resetSearchBar();
          }}
        />
      )}

      {(activeSection === "checkIn" || activeSection === "checkOut") && (
        <DateRangePicker
          checkIn={checkIn}
          checkOut={checkOut}
          onCheckInChange={(date) => {
            setCheckIn(date);
            if (date) {
              setValues((prev) => ({
                ...prev,
                startDate: format(date, "yyyy-MM-dd"),
              }));
            }
          }}
          onCheckOutChange={(date) => {
            setCheckOut(date);
            if (date) {
              setValues((prev) => ({
                ...prev,
                endDate: format(date, "yyyy-MM-dd"),
              }));
            }
          }}
          activeField={activeSection as "checkIn" | "checkOut"}
          onClose={() => setActiveSection(null)}
        />
      )}

      {activeSection === "guests" && (
        <GuestSelector
          guests={guests}
          onChange={setGuests}
          onClose={() => setActiveSection(null)}
          onApply={() => {
            setActiveSection(null);
          }}
        />
      )}
    </div>
  );
}
