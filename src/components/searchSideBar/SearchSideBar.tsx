"use client";

import { format } from "date-fns";
import { useFormik } from "formik";
import { debounce } from "lodash";
import { Minus, Plus, Search, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import * as React from "react";
import { api } from "../../utils/api";
import { NavDateRangeMobile } from "../Common/NavDateRange/NavDateRangeMobile";
import { Button } from "../ui/Button/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/Sheet/Sheet";
import { ILocation } from "./types/SearchSideBarProps";

export const SearchSidebar: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [locationSearch, setLocationSearch] = React.useState<string>("");
  const [locationName, setLocationName] = React.useState<string[]>([]);
  const [locationLoading, setLocationLoading] = React.useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = React.useState(false);
  const [locationOptions, setLocationOptions] = React.useState<
    readonly ILocation[]
  >([]);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<
    "location" | "dates" | "guests" | null
  >(null);

  const searchSliderRef = React.useRef<HTMLDivElement>(null);

  const [guestCounts, setGuestCounts] = React.useState<Record<string, number>>({
    adult: 2,
    kid: 0,
    infant: 0,
    pet: 0,
  });

  const { values, handleSubmit, setValues, isValid, dirty } = useFormik({
    initialValues: {
      placeId: "",
      startDate: "",
      endDate: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const searchParams = new URLSearchParams();

        // Add placeId and dates if available
        if (values.placeId) {
          searchParams.set("placeId", values.placeId);
        }
        if (values.startDate && values.endDate) {
          searchParams.set("startDate", values.startDate);
          searchParams.set("endDate", values.endDate);
        }

        // Add guests count only if different from defaults
        if (guestCounts.adult > 0) {
          searchParams.set("adult", guestCounts.adult.toString());
        }
        if (guestCounts.kid > 0) {
          searchParams.set("kid", guestCounts.kid.toString());
        }
        if (guestCounts.infant > 0) {
          searchParams.set("infant", guestCounts.infant.toString());
        }
        if (guestCounts.pet > 0) {
          searchParams.set("pet", guestCounts.pet.toString());
        }

        // If no filters are applied, just navigate to "/search"
        const searchUrl =
          searchParams.toString().length > 0
            ? `/search?${searchParams.toString()}`
            : `/search`;

        // Open search results in a new tab
        window.open(searchUrl, "_blank");
      } finally {
        setLoading(false);
        setGuestCounts({
          adult: 2,
          kid: 0,
          infant: 0,
          pet: 0,
        });
      }
    },
  });
  // Fetch location details when placeId is available
  const fetchLocationDetails = async (placeId: string) => {
    if (!placeId) return;
    setLocationLoading(true);
    try {
      const res = await api.get(
        `/google/get-google-nearby?place_id=${placeId}`
      );
      const finalData = res.data.data;

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

      const city = getAddressPart(["locality", "political"]);
      const country = getAddressPart(["country", "political"]);

      // Set location name for compact display
      const fullAddress = [addressLine1Parts.join(", "), country]
        .filter(Boolean)
        .join(" - ");

      setLocationName(addressLine1Parts);
      setLocationSearch(finalData.name);

      // Update form values
      setValues({
        ...values,
        placeId: finalData.place_id,
      });
    } catch (error) {
      console.error("Error fetching location details:", error);
    } finally {
      setLocationLoading(false);
      setActiveSection(null);
    }
  };

  const fetchLocationSuggestions = async (typedValue: string) => {
    if (!typedValue || typedValue.length < 3) return;
    setLocationLoading(true);
    try {
      const res = await api.get(
        `/google/get-google-autocomplete?name=${typedValue}`
      );
      setLocationOptions(res.data.data);
      setLocationDropdownOpen(true);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    } finally {
      setLocationLoading(false);
    }
  };

  // Debounced function for fetching autocomplete suggestions
  const debouncedFetchLocationSuggestions = React.useCallback(
    debounce(fetchLocationSuggestions, 800),
    []
  );

  // Load data from URL params on initial render
  React.useEffect(() => {
    const urlStartDate = params.get("startDate") || "";
    const urlEndDate = params.get("endDate") || "";
    const urlPlaceId = params.get("placeId") || "";

    setValues({
      placeId: urlPlaceId,
      startDate: urlStartDate,
      endDate: urlEndDate,
    });

    if (urlStartDate) {
      setStartDate(new Date(urlStartDate));
    }
    if (urlEndDate) {
      setEndDate(new Date(urlEndDate));
    }
    if (urlPlaceId) {
      fetchLocationDetails(urlPlaceId);
    }

    // Set guest counts from URL params
    const newGuestCounts = { ...guestCounts };
    ["adult", "kid", "infant", "pet"].forEach((type) => {
      const count = params.get(type);
      if (count) {
        newGuestCounts[type] = Number.parseInt(count);
      }
    });
    setGuestCounts(newGuestCounts);
  }, [params]);

  React.useEffect(() => {
    if (locationSearch.length > 2 && !values.placeId) {
      debouncedFetchLocationSuggestions(locationSearch);
    } else if (locationSearch.length === 0) {
      setLocationOptions([]);
      setValues({
        ...values,
        placeId: "",
      });
    }
  }, [locationSearch]);

  // Handle guest count changes
  const setGuestCount = (type: string, value: number) => {
    setGuestCounts((prev) => ({
      ...prev,
      [type]: Math.max(0, value),
    }));
  };

  const handleDateRangeChange = (
    newStartDateStr: string,
    newEndDateStr: string
  ) => {
    setValues({
      ...values,
      startDate: newStartDateStr,
      endDate: newEndDateStr,
    });
  };

  // Format date for display
  const formatDateRange = () => {
    if (!startDate) return "Add dates";
    if (!endDate) return `${format(startDate, "d MMM")} - Select`;

    // If same month
    if (startDate.getMonth() === endDate.getMonth()) {
      return `${format(startDate, "d")}-${format(endDate, "d")} ${format(
        endDate,
        "MMM"
      )}`;
    }

    // Different months
    return `${format(startDate, "d MMM")}-${format(endDate, "d MMM")}`;
  };

  // Get total guest count
  const getTotalGuestCount = () => {
    return (
      guestCounts.adult + guestCounts.kid + guestCounts.infant + guestCounts.pet
    );
  };

  // Format guest text
  const formatGuestText = () => {
    const total = getTotalGuestCount();
    if (total === 0) return "Add guests";
    return `${total} guest${total > 1 ? "s" : ""}`;
  };

  const handleStartDateChange = (newStartDate: Date | null) => {
    setStartDate(newStartDate);
    if (newStartDate && endDate && newStartDate <= endDate) {
      handleDateRangeChange(
        format(newStartDate, "yyyy-MM-dd"),
        format(endDate, "yyyy-MM-dd")
      );
    }
  };

  const handleEndDateChange = (newEndDate: Date | null) => {
    setEndDate(newEndDate);
    if (startDate && newEndDate && newEndDate >= startDate) {
      handleDateRangeChange(
        format(startDate, "yyyy-MM-dd"),
        format(newEndDate, "yyyy-MM-dd")
      );
    }
  };

  // Close expanded view when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isExpanded &&
        searchSliderRef.current &&
        !searchSliderRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        setActiveSection(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="bg-white p-2 rounded-full w-full max-w-3xl sm:p-4 border border-black/20 shadow-lg">
          <div className="flex gap-3 items-center px-4">
            <Search className="h-6 text-black w-6" />
            <div className="flex-1">
              <p className="text-gray-900 font-medium mb-1">Plan your trip</p>
              <div className="flex text-gray-700 gap-3 items-center">
                <span>City</span>
                <span>-</span>
                <span>Location</span>
                <span>-</span>
                <span>Date</span>
                <span>-</span>
                <span>Guests</span>
              </div>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-3xl">
        <SheetHeader className="border-b p-6">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-2xl">Plan a trip</SheetTitle>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}>
              <X className="h-8 w-8" />
            </Button>
          </div>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="">
          {" "}
          <div className="flex flex-col h-[75vh] justify-between max-w-md mx-auto">
            {/* Header */}

            <div className="flex flex-col p-2 gap-3">
              {/* <div className="flex border-b justify-between p-4 items-center mb-4">
              <button
                onClick={() => {
                  setIsExpanded(false);
                  setActiveSection(null);
                }}
                className="p-1">
                <X className="h-8 w-8" />
              </button>
              <h1 className="text-2xl font-semibold">Plan a trip</h1>
              <div className="w-6"></div> 
            </div> */}

              {/* Location Section */}
              <div
                className={`p-5 border border-black/20 shadow-md rounded-2xl ${
                  activeSection === "location" ? "bg-gray-50" : ""
                }`}
                onClick={() => {
                  setActiveSection("location");
                }}>
                <div className="flex justify-between items-center">
                  <label className="text-base font-medium">Where?</label>
                  <span className="text-base">{locationName[0] || ""}</span>
                </div>

                {activeSection === "location" && (
                  <div className="mt-2">
                    <div className="relative">
                      <div className="flex absolute inset-y-0 items-center left-0 pl-3 pointer-events-none">
                        <Search className="h-6 text-gray-400 w-6" />
                      </div>
                      <input
                        type="text"
                        value={locationSearch}
                        onChange={(e) => {
                          setLocationSearch(e.target.value);
                          setValues({
                            ...values,
                            placeId: "",
                          });
                        }}
                        placeholder="Search for a place"
                        className="border border-black/20 rounded-full text-base w-full focus:outline-none focus:ring-2 focus:ring-primary-gold pl-10 pr-4 py-4"
                      />
                      {locationLoading && (
                        <div className="-translate-y-1/2 absolute right-3 top-1/2 transform">
                          <div className="border-2 border-gray-500 border-t-transparent h-4 rounded-full w-4 animate-spin"></div>
                        </div>
                      )}
                    </div>

                    {locationDropdownOpen && locationOptions.length > 0 && (
                      <ul className="bg-white border border-gray-200 rounded-md shadow-md mt-2">
                        {locationOptions.map((option) => (
                          <li
                            key={option.place_id}
                            className="text-base cursor-pointer hover:bg-gray-100 px-4 py-2"
                            onClick={() => {
                              fetchLocationDetails(option.place_id);
                              setLocationDropdownOpen(false);
                              setActiveSection(null);
                            }}>
                            {option.description}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Date Section */}
              <div
                className={`p-5 border border-black/20 shadow-md rounded-2xl ${
                  activeSection === "dates" ? "bg-gray-50" : ""
                }`}
                onClick={() => {
                  setActiveSection("dates");
                  setIsCalendarOpen((prev) => !prev);
                }}>
                <div className="flex justify-between items-center">
                  <label className="text-base font-medium">When?</label>
                  <span className="text-base">{formatDateRange()}</span>
                </div>
              </div>
              {activeSection === "dates" && (
                <NavDateRangeMobile
                  startDate={startDate}
                  endDate={endDate}
                  onStartDateChange={handleStartDateChange}
                  onEndDateChange={handleEndDateChange}
                  isOpen={isCalendarOpen}
                  onOpenChange={setIsCalendarOpen}
                  activeSelection={() => setActiveSection(null)}
                />
              )}
              {/* Guests Section */}
              <div
                className={`p-5 border border-black/20 shadow-md rounded-2xl ${
                  activeSection === "guests" ? "bg-gray-50" : ""
                }`}
                onClick={() =>
                  setActiveSection(activeSection === "guests" ? null : "guests")
                }>
                <div className="flex justify-between items-center">
                  <label className="text-base font-medium">Who?</label>
                  <span className="text-base">{formatGuestText()}</span>
                </div>

                {activeSection === "guests" && (
                  <div className="mt-4 space-y-4">
                    {[
                      { key: "adult", label: "Adults" },
                      { key: "kid", label: "Kids" },
                      { key: "infant", label: "Infants" },
                      { key: "pet", label: "Pets" },
                    ].map(({ key, label }) => (
                      <div
                        key={key}
                        className="flex justify-between items-center">
                        <span className="text-base">{label}</span>
                        <div className="flex gap-3 items-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setGuestCount(key, guestCounts[key] - 1);
                            }}
                            disabled={guestCounts[key] <= 0}
                            className={`w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center ${
                              guestCounts[key] <= 0
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-100"
                            }`}>
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-center w-4">
                            {guestCounts[key]}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              setGuestCount(key, guestCounts[key] + 1);
                            }}
                            className="flex border border-gray-400 h-8 justify-center rounded-full w-8 hover:bg-gray-100 items-center">
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer with buttons */}
            <div className="flex border border-t-black/30 justify-between p-5 shadow-xl items-center">
              <button
                onClick={() => {
                  // Reset all values
                  setValues({
                    placeId: "",
                    startDate: "",
                    endDate: "",
                  });
                  setLocationSearch("");
                  setLocationName([]);
                  setStartDate(null);
                  setEndDate(null);
                  setGuestCounts({
                    adult: 1,
                    kid: 0,
                    infant: 0,
                    pet: 0,
                  });
                }}
                className="text-base font-medium underline">
                Clear search
              </button>

              <Button
                type="submit"
                aria-label="search"
                disabled={loading}
                className="flex bg-primary-gold rounded-full text-white gap-2 hover:bg-dark-gold items-center px-6 py-2">
                {loading ? (
                  <div className="border-2 border-t-transparent border-white h-4 rounded-full w-4 animate-spin"></div>
                ) : (
                  <Search className="h-5 w-5" />
                )}
                <span>Search</span>
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};
