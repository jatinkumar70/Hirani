"use client";

import { useFormik } from "formik";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useState, useRef, useCallback, ReactNode } from "react";
import { GoPeople } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { NavDateRange } from "../NavDateRange/NavDateRange";
import { api } from "../../../utils/api";
import { ILocation, ILocationDetails } from "../../../models/Location.model";
import { debounce } from "lodash";
import FilterButton from "../../Home/Amenities/components/filterButton";
import SearchFilterButton from "./SearchFilterButton";

interface TopBarSearchProps {
  isVisible: boolean;
  searchData: any;
  className: ReactNode;
}
const MotionForm = motion.form;

export const TopBarSearch: React.FC<TopBarSearchProps> = ({ searchData }) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState<string>("");
  const [locationName, setLocationName] = useState<string[]>([]);
  const [guestsDropdownOpen, setGuestsDropdownOpen] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [LocBarExpanded, setLocBarExpanded] = useState(false);
  const [locationOptions, setLocationOptions] = useState<readonly ILocation[]>(
    []
  );
  const guestsDropdownRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [guestCounts, setGuestCounts] = useState<Record<string, number>>({
    adult: 1,
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
        const searchParams = new URLSearchParams(params.toString());

        if (values.placeId) searchParams.set("placeId", values.placeId);
        if (values.startDate && values.endDate) {
          searchParams.set("startDate", values.startDate);
          searchParams.set("endDate", values.endDate);
        }

        searchParams.set(
          `adult${guestCounts.adult > 1 ? "s" : ""}`,
          guestCounts.adult.toString()
        );

        if (guestCounts.kid > 0) {
          searchParams.set(
            `kid${guestCounts.kid > 1 ? "s" : ""}`,
            guestCounts.kid.toString()
          );
        }
        if (guestCounts.infant > 0) {
          searchParams.set(
            `infant${guestCounts.infant > 1 ? "s" : ""}`,
            guestCounts.infant.toString()
          );
        }
        if (guestCounts.pet > 0) {
          searchParams.set(
            `pet${guestCounts.pet > 1 ? "s" : ""}`,
            guestCounts.pet.toString()
          );
        }

        const searchUrl = pathname.includes("search")
          ? `?${searchParams.toString()}`
          : `/search?${searchParams.toString()}`;

        // @ts-ignore
        router.replace(searchUrl, { shallow: true });
      } finally {
        setLoading(false);
        setIsExpanded(false);
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

      const fullAddress = [
        addressLine1Parts.join(", "),
        country, // Country
      ]
        .filter(Boolean)
        .join(" - ");
      setLocationName(addressLine1Parts);
      const addressDetails: ILocationDetails = {
        place_id: finalData.place_id,
        address_line1: addressLine1Parts.join(", "),
        address_line2: getAddressPart(["route"]),
        city: city,
        state: getAddressPart(["administrative_area_level_1", "political"]),
        pin_code: getAddressPart(["postal_code"]),
        country: country,
        longitude: finalData.geometry.location.lng,
        latitude: finalData.geometry.location.lat,
        rating: finalData.rating,
      };

      // Show full address in search bar
      setLocationSearch(fullAddress);

      // Update form values
      setValues({
        ...values,
        placeId: addressDetails.place_id,
      });
    } catch (error) {
      console.error("Error fetching location details:", error);
    } finally {
      setLocationLoading(false);
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

    const newGuestCounts = { ...guestCounts };
    ["adult", "kid", "infant", "pet"].forEach((type) => {
      const singular = params.get(type); // Check for singular form (e.g., "adult")
      const plural = params.get(type + "s"); // Check for plural form (e.g., "adults")

      if (plural) {
        newGuestCounts[type] = Number.parseInt(plural); // Use plural if it exists
      } else if (singular) {
        newGuestCounts[type] = Number.parseInt(singular); // Use singular otherwise
      }
    });

    setGuestCounts(newGuestCounts);
  }, [params, searchData.placeId]);

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

  // Handle date changes
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

  // Handle guest count changes
  const setGuestCount = (type: string, value: number) => {
    setGuestCounts((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // Format guest label for display
  const formatGuestLabel = (type: string, count: number) => {
    if (count === 0) return null;
    const pluralizedType = count > 1 ? `${type}s` : type;
    return `${count} ${pluralizedType}`;
  };

  // Guest types
  const guestTypes = [
    { key: "adult", label: "Adult" },
    { key: "kid", label: "Kid" },
    { key: "infant", label: "Infant" },
    { key: "pet", label: "Pet" },
  ];

  // Format date for compact display

  // Get total guest count
  const getTotalGuestCount = () => {
    return Object.values(guestCounts).reduce((sum, count) => sum + count, 0);
  };

  const formatCompactDate = (date: Date) => {
    if (!date) return "";

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });

    return { day, month };
  };

  // Check if two dates are in the same month and year
  const isSameMonth = (date1: any, date2: any) => {
    return (
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Format compact display text
  const getCompactDisplayText = () => {
    // Default display when no search data is available
    if (
      !searchData ||
      (!searchData.placeId && !searchData.startDate && !searchData.endDate)
    ) {
      return (
        <div
          className={`flex items-center justify-between ${
            LocBarExpanded ? "w-full gap-4" : "w-72 ml-4"
          }  mx-auto text-sm`}>
          <span className="text-gray-800 font-medium">Anywhere</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-800 font-medium">Any week</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-800 font-medium">
            {searchData && searchData.adult
              ? `${searchData.adult} guests`
              : "2 guests"}
          </span>
        </div>
      );
    }

    // Display with search data
    const location = locationName.length > 0 ? locationName : ["Anywhere"];
    let dateDisplay = "Any week";

    const startDateParsed = searchData.startDate
      ? new Date(searchData.startDate)
      : null;
    const endDateParsed = searchData.endDate
      ? new Date(searchData.endDate)
      : null;

    if (startDateParsed && endDateParsed) {
      const startFormatted = formatCompactDate(startDateParsed);
      const endFormatted = formatCompactDate(endDateParsed);

      if (isSameMonth(startDateParsed, endDateParsed)) {
        //@ts-ignore
        dateDisplay = `${startFormatted.day}-${endFormatted.day} ${endFormatted.month}`;
      } else {
        //@ts-ignore
        dateDisplay = `${startFormatted.day} ${startFormatted.month}-${endFormatted.day} ${endFormatted.month}`;
      }
    }

    const totalGuests = getTotalGuestCount();
    const guestDisplay =
      totalGuests > 0
        ? `${totalGuests} Guest${totalGuests > 1 ? "s" : ""}`
        : "Add guests";

    return (
      <div
        className={`flex items-center justify-between ${
          LocBarExpanded ? "w-full gap-4" : "w-72"
        }  mx-auto text-sm`}>
        <span className="text-gray-800 font-semibold">{location}</span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-800 font-semibold">{dateDisplay}</span>
        <span className="text-gray-400">|</span>
        <span className="text-gray-800 font-semibold">{guestDisplay}</span>
      </div>
    );
  };

  useEffect(() => {
    const totalLength = locationName.join(", ").length;
    if (totalLength > 20) {
      setLocBarExpanded(true);
    }
  }, [locationName]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        guestsDropdownRef.current &&
        !guestsDropdownRef.current.contains(event.target as Node)
      ) {
        setGuestsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Render compact view
  const renderCompactView = () => {
    return (
      <motion.div
        className={`bg-white rounded-full shadow-md flex items-center justify-between mx-4 ${
          LocBarExpanded ? "w-full gap-4" : "w-auto"
        } p-3 mt-2 cursor-pointer`}
        onClick={() => setIsExpanded(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        // Expanded width
      >
        <div className="flex-1 px-4">{getCompactDisplayText()}</div>
        <div className="flex bg-primary-gold justify-center p-2 rounded-full text-white hover:bg-dark-gold items-center">
          <Search className="h-4 text-white w-4" />
        </div>
      </motion.div>
    );
  };

  // Render expanded view
  const renderExpandedView = () => {
    return (
      <MotionForm
        onSubmit={handleSubmit}
        layout
        initial={{ width: "50%", opacity: 0.5 }} // Initial collapsed state
        animate={{
          width: isExpanded ? "100%" : "50%", // Expand width first
          opacity: isExpanded ? 1 : 0.5, // Fade in
          height: isExpanded ? "auto" : "50px", // Expand height smoothly
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        className="flex bg-white p-2 rounded-full shadow-md w-full gap-6 items-center max-w-4xl mt-2 mx-4">
        {/* Parent container for animating inner elements */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : -10 }}
          transition={{ duration: 0.3, delay: isExpanded ? 0.3 : 0 }} // Delay child animation
          className="flex flex-1 flex-row gap-6 items-center overflow-hidden">
          {/* Location Search */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: isExpanded ? 1 : 2,
              scale: isExpanded ? 1 : 0.95,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex w-1/4 gap-2 items-center relative">
            <Search className="flex-shrink-0 h-5 text-gray-500 w-5" />
            <div className="w-full relative">
              <div className="flex items-center">
                <input
                  type="text"
                  value={locationSearch}
                  onChange={(e) => {
                    setLocationSearch(e.target.value);
                    setValues({
                      ...values,
                      placeId: "", //* Reset placeId when typing a new location
                    });
                  }}
                  placeholder="Try Dubai..."
                  className="bg-transparent border-none text-gray-700 text-sm w-full outline-none placeholder-gray-400"
                />
                {locationLoading && (
                  <div className="absolute right-2">
                    <div className="border-2 border-gray-500 border-t-transparent h-4 rounded-full w-4 animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          {locationDropdownOpen && locationOptions.length > 0 && (
            <ul className="bg-white border rounded-md shadow-lg text-gray-800 text-sm w-[400px] absolute mt-1 top-24 z-10">
              {locationOptions.map((option) => (
                <li
                  key={option.place_id}
                  className="cursor-pointer hover:bg-gray-100 px-3 py-2"
                  onClick={() => {
                    fetchLocationDetails(option.place_id);
                    setLocationDropdownOpen(false);
                  }}>
                  {option.description}
                </li>
              ))}
            </ul>
          )}

          <div className="border border-gray-300 h-14 text-gray-400"></div>

          {/* Date Range Picker */}
          <div
            // initial={{ opacity: 0, scale: 0.95 }}
            // animate={{
            //   opacity: isExpanded ? 1 : 0,
            //   scale: isExpanded ? 1 : 0.95,
            // }}
            // transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex w-[35%] gap-2 items-center relative">
            <div className="flex items-center space-x-4">
              <div
                className="flex flex-row w-[100px] cursor-pointer items-center"
                onClick={() => setIsCalendarOpen(true)}>
                <CalendarIcon className="h-5 text-gray-500 w-5 mr-2" />
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Check in</span>
                  <span className="text-gray-700 text-sm">
                    {startDate ? format(startDate, "dd-MMM") : ""}
                  </span>
                </div>
              </div>

              <div className="border border-gray-300 h-14 text-gray-400 mx-2"></div>

              <div
                className="flex flex-row w-[100px] cursor-pointer items-center"
                onClick={() => setIsCalendarOpen(true)}>
                <CalendarIcon className="h-5 text-gray-500 w-5 mr-2" />
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Check out</span>
                  <span className="text-gray-700 text-sm">
                    {endDate ? format(endDate, "dd-MMM") : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[400px] absolute left-40 top-20 translate-x-1/2 z-10">
            <NavDateRange
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              isOpen={isCalendarOpen}
              onOpenChange={setIsCalendarOpen}
            />
          </div>

          <div className="border border-gray-300 h-14 text-gray-400 mx-2"></div>

          {/* Guests */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              scale: isExpanded ? 1 : 0.95,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex w-1/4 gap-2 items-center relative">
            <GoPeople size={20} className="flex-shrink-0 text-gray-500" />
            <div className="flex w-full items-center relative">
              <div
                className="flex-grow bg-transparent text-gray-600 text-left text-sm cursor-pointer focus:outline-none mr-0 placeholder-gray-500"
                onClick={() => setGuestsDropdownOpen(!guestsDropdownOpen)}>
                {Object.entries(guestCounts)
                  .map(([type, count]) => formatGuestLabel(type, count))
                  .filter(Boolean)
                  .join(", ") || "Select Guests"}
              </div>
              <div
                onClick={() => setGuestsDropdownOpen(!guestsDropdownOpen)}
                className="cursor-pointer ml-2">
                <motion.div
                  animate={{ rotate: guestsDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}>
                  {guestsDropdownOpen ? (
                    <X size={20} className="text-gray-700" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-700" />
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <div className="w-[400px] -translate-x-1/3 absolute right-44 top-16 z-10">
          {" "}
          <AnimatePresence>
            {guestsDropdownOpen && (
              <motion.div
                ref={guestsDropdownRef}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  scale: { type: "spring", stiffness: 400, damping: 30 },
                }}
                className="bg-white border border-gray-300 rounded-lg shadow-lg w-[200px] absolute mt-9 top-full z-10">
                {guestTypes.map(({ key, label }) => (
                  <div
                    key={key}
                    className="flex border-b border-gray-200 justify-between hover:bg-gray-100 items-center last:border-1 px-4 py-4">
                    <span className="text-gray-800 text-sm capitalize font-medium">
                      {label}
                    </span>
                    <div className="flex items-center">
                      <button
                        aria-label={`Decrease ${label} Count`}
                        type="button"
                        onClick={() =>
                          setGuestCount(
                            key,
                            Math.max(0, (guestCounts[key] || 0) - 1)
                          )
                        }
                        className="flex border-2 border-black h-5 justify-center rounded-3xl text-gray-600 w-5 hover:bg-gray-200 items-center">
                        -
                      </button>
                      <span className="text-gray-800 text-sm px-2">
                        {guestCounts[key] || 0}
                      </span>
                      <button
                        aria-label={`Increase ${label} Count`}
                        type="button"
                        onClick={() =>
                          setGuestCount(key, (guestCounts[key] || 0) + 1)
                        }
                        className="flex border-2 border-black h-5 justify-center rounded-3xl text-gray-600 w-5 hover:bg-gray-200 items-center">
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Expand/Collapse Button */}
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="p-2 text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>

          <button
            type="submit"
            disabled={!isValid || !dirty || loading}
            className={cn(
              "rounded-full flex items-center justify-center text-white transition-all p-3 bg-primary-gold hover:bg-dark-gold"
            )}>
            {loading ? (
              <div
                aria-label="Loading"
                className="border-2 border-opacity-50 border-t-2 border-white h-5 rounded-full w-5 animate-spin"></div>
            ) : (
              <Search className="h-4 text-white w-4" />
            )}
          </button>
        </div>
      </MotionForm>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isExpanded ? "expanded" : "collapsed"}
        initial={{ width: "70%" }} // Default width on load
        animate={{
          width: isExpanded ? "70%" : LocBarExpanded ? "auto" : "70%",
        }}
        transition={{
          type: "spring",
          stiffness: 100, // Lower stiffness for a softer effect
          damping: 20, // Controls smooth stopping, avoids bounce
          mass: 1, // Natural weight
          velocity: 1, // Ensures smooth acceleration & deceleration
        }}
        className="flex items-center gap-4 justify-center">
        {isExpanded ? renderExpandedView() : renderCompactView()}{" "}
        <SearchFilterButton />
      </motion.div>
    </AnimatePresence>
  );
};
