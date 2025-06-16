"use client";

import { format } from "date-fns";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { debounce } from "lodash";
import { ArrowLeft, Minus, Plus, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { api } from "../../utils/api";
import { NavDateRangeMobile } from "../Common/NavDateRange/NavDateRangeMobile";
import { Button } from "../ui/Button/Button";
import DownFilterButton from "./FilterButtonDown";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/Sheet/Sheet";

interface SearchSliderProps {
  searchData?: any;
  className?: string;
}

interface ILocation {
  place_id: string;
  description: string;
}

export const DownSearchSlider: React.FC<SearchSliderProps> = ({
  searchData = {},
  className,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState<string>("");
  const [locationName, setLocationName] = useState<string[]>([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationOptions, setLocationOptions] = useState<readonly ILocation[]>(
    []
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<
    "location" | "dates" | "guests" | null
  >(null);
  const searchSliderRef = useRef<HTMLDivElement>(null);
  // Add a state to track if search has been manually cleared
  const [isSearchCleared, setIsSearchCleared] = useState(false);

  const [guestCounts, setGuestCounts] = useState<Record<string, number>>({
    adult: Number.parseInt(searchData.adult) || 2,
    kid: Number.parseInt(searchData.kid) || 0,
    infant: Number.parseInt(searchData.infant) || 0,
    pet: Number.parseInt(searchData.pet) || 0,
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
        const searchParams = new URLSearchParams(params.toString());

        // If search was cleared, don't add any values to the URL
        if (!isSearchCleared) {
          if (values.placeId) searchParams.set("placeId", values.placeId);
          if (values.startDate && values.endDate) {
            searchParams.set("startDate", values.startDate);
            searchParams.set("endDate", values.endDate);
          }

          searchParams.set("adult", guestCounts.adult.toString());
          if (guestCounts.kid > 0)
            searchParams.set("kid", guestCounts.kid.toString());
          if (guestCounts.infant > 0)
            searchParams.set("infant", guestCounts.infant.toString());
          if (guestCounts.pet > 0)
            searchParams.set("pet", guestCounts.pet.toString());
        }

        const searchUrl = pathname.includes("search")
          ? `?${searchParams.toString()}`
          : `/search?${searchParams.toString()}`;
        //@ts-ignore
        router.replace(searchUrl, { shallow: true });

        // Reset the cleared state when submitting a new search
        setIsSearchCleared(false);
      } finally {
        setLoading(false);
        setIsExpanded(false);
        setActiveSection(null);
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

      const country = getAddressPart(["country", "political"]);

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
  const debouncedFetchLocationSuggestions = useCallback(
    debounce(fetchLocationSuggestions, 800),
    []
  );

  // Load data from URL params on initial render

  useEffect(() => {
    const urlStartDate = params.get("startDate") || "";
    const urlEndDate = params.get("endDate") || "";
    const urlPlaceId = params.get("placeId") || searchData.placeId || "";

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
  }, [params, searchData.placeId, isSearchCleared]);

  useEffect(() => {
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
    if (!startDate) return "Any Week";
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

  // Function to handle clearing the search
  const handleClearSearch = () => {
    // Reset all form values
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

    // Set the flag to prevent reloading from URL params but don't change the URL
    setIsSearchCleared(true);
  };

  // Close expanded view when clicking outside
  useEffect(() => {
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
  // Render expanded view (the search modal)
  const renderExpandedView = () => {
    return (
      <div className="flex w-full items-center">
        <div className="mt-4 p-2 flex items-center bg-gray-100 hover:bg-gray-200 rounded-full ">
          <ArrowLeft
            className="w-7 h-7 text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={(event) => {
              event.stopPropagation();
              router.push("/");
            }}
          />
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="w-[80%] mx-auto mt-4">
            <motion.div
              className="flex bg-white border border-primary-gold p-3 rounded-full shadow-md w-full cursor-pointer gap-4 items-center max-w-md mx-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}>
              <div
                className="flex flex-col justify-center text-lg items-start px-2"
                onClick={() => {
                  setIsExpanded(true);
                  setActiveSection("location");
                }}>
                <span className="font-medium">
                  {locationName?.[0]
                    ? locationName[0].slice(0, 20) + "..."
                    : "Any Where"}
                </span>
                <div className="flex text-gray-800 text-lg font-medium gap-2 items-center">
                  <span>{formatDateRange()}</span>
                  <span>-</span>
                  <span>{formatGuestText()}</span>
                </div>
              </div>
            </motion.div>
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
                      <span className="text-base">
                        {activeSection === "location" ? "" : locationName[0]}
                      </span>
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
                      setActiveSection(
                        activeSection === "guests" ? null : "guests"
                      )
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
                    type="button"
                    onClick={handleClearSearch}
                    className="text-base font-medium underline">
                    Clear search
                  </button>

                  <Button
                    type="submit"
                    aria-label="search"
                    onClick={() => setIsOpen(false)}
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
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div className={cn("relative", className)}>
        <div className="flex justify-center p-2 w-full gap-3 items-center mx-auto">
          {renderExpandedView()}
          <DownFilterButton />
        </div>
      </div>
    </AnimatePresence>
  );
};
