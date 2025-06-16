import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { GoPeople } from "react-icons/go";
import { ILocationDetails } from "../../../models/Location.model";
import { LocationAutoSearch } from "../../auto-searches/LocationAutoSearch";
import CustomDateRangePicker from "../../form-componet/CustomDateRangePicker";
import { SearchSidebar } from "../../searchSideBar/SearchSideBar";

export function SearchProperty() {
  const [loading, setLoading] = React.useState(false);
  const params = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = React.useState(false);

  // Updated guestCounts keys to be lowercase for consistency
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

        // Check if placeId and dates exist
        const hasFilters =
          values.placeId || (values.startDate && values.endDate);

        if (values.placeId) {
          searchParams.set("placeId", values.placeId);
        }
        if (values.startDate && values.endDate) {
          searchParams.set("startDate", values.startDate);
          searchParams.set("endDate", values.endDate);
        }

        // Add guests count
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

        // If no placeId and no dates, just redirect to "/search"
        const searchUrl = hasFilters
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

  useEffect(() => {
    setValues({
      placeId: params.get("placeId") || "",
      startDate: params.get("startDate") || "",
      endDate: params.get("endDate") || "",
    });
  }, [params]);

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setValues({
      ...values,
      startDate,
      endDate,
    });
  };

  const handleLocation = (data: ILocationDetails) => {
    setTimeout(() => {
      setValues({
        ...values,
        placeId: data.place_id,
      });
    }, 500);
  };

  const setGuestCount = (type: string, value: number) => {
    setGuestCounts((prevCounts) => ({
      ...prevCounts,
      [type]: value,
    }));
  };

  React.useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => {
          setShowDropdown(false);
        }, 100); // Small delay to allow toggle function to execute
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const formatGuestLabel = (type: string, count: number) => {
    if (count === 0) return null; // Don't show if the count is 0
    const pluralizedType = count > 1 ? `${type}s` : type; // Add 's' if count > 1
    return `${count} ${pluralizedType}`;
  };

  // Define an array of guest types with keys and labels from translations
  const guestTypes = [
    { key: "adult", label: "adult" },
    { key: "kid", label: "kid" },
    { key: "infant", label: "infant" },
    { key: "pet", label: "pet" },
  ];

  return (
    <div className="container rounded-full bg-white shadow-xl border border-primary-gold py-0">
      <form onSubmit={handleSubmit} className="py-0">
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Location Section */}
          <div className="col-span-12 md:col-span-3 flex items-center h-12 border-black px-2 border-r-2 rtl:border-l-2 rtl:border-r-0">
            <LocationAutoSearch
              word={"try dubai"}
              value={values.placeId}
              onSelect={handleLocation}
            />
          </div>
          {/* Date Range Picker Section */}
          <div className="col-span-12 md:col-span-5">
            <CustomDateRangePicker
              value={{
                startDate: values.startDate,
                endDate: values.endDate,
              }}
              wordCheckIn={"check in"}
              wordCheckOut={"check out"}
              handleDateRangeChange={handleDateRangeChange}
            />
          </div>
          {/* Guests Section */}
          <div className="col-span-12 md:col-span-3 border-l-2 rtl:border-l-0 rtl:border-r-2 border-black h-12">
            <div className="flex items-center justify-center ml-4 rtl:ml-0 mt-3 px-2 relative">
              <GoPeople size={24} color="black" className="mr-2" />
              <div className="w-full relative flex items-center">
                <div
                  className="text-base bg-transparent placeholder-black text-gray-800 focus:outline-none text-left rtl:text-right mr-0 rtl:mr-3 cursor-pointer flex-grow"
                  onClick={toggleDropdown}>
                  {Object.entries(guestCounts)
                    .map(([type, count]) => formatGuestLabel(type, count))
                    .filter(Boolean)
                    .join(", ") || "Select Guests"}
                </div>
                <div onClick={toggleDropdown} className="ml-2 cursor-pointer">
                  <motion.div
                    animate={{ rotate: showDropdown ? 180 : 0 }}
                    transition={{ duration: 0.3 }}>
                    {showDropdown ? (
                      <X size={20} className="text-gray-800" />
                    ) : (
                      <ChevronDown size={23} className="text-gray-800" />
                    )}
                  </motion.div>
                </div>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      ref={dropdownRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full mt-6 bg-white border border-gray-300 shadow-lg rounded-lg w-full z-10">
                      {guestTypes.map(({ key, label }) => (
                        <div
                          key={key}
                          className="flex justify-between items-center px-4 py-4 hover:bg-gray-100 border-b border-gray-200 last:border-1">
                          <span className="text-sm font-medium text-gray-800 capitalize">
                            {label}
                          </span>
                          <div className="flex items-center">
                            <button
                              aria-label="Decrease Guest Count"
                              type="button"
                              onClick={() =>
                                setGuestCount(
                                  key,
                                  Math.max(0, (guestCounts[key] || 0) - 1)
                                )
                              }
                              className="h-5 w-5 rounded-3xl border border-gray-400 text-gray-400 hover:bg-gray-200 flex items-center justify-center">
                              -
                            </button>
                            <span className="px-2 text-sm text-gray-800">
                              {guestCounts[key] || 0}
                            </span>
                            <button
                              aria-label="Increase Guest Count"
                              type="button"
                              onClick={() =>
                                setGuestCount(key, (guestCounts[key] || 0) + 1)
                              }
                              className="h-5 w-5 rounded-3xl border border-gray-400 text-gray-400 hover:bg-gray-200 flex items-center justify-center">
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          {/* Submit Button Section */}
          <div className="col-span-12 md:col-span-1 flex items-center justify-end px-2">
            <button
              type="submit"
              aria-label="search"
              className="flex cursor-pointer justify-center items-center p-3 bg-primary-gold rounded-full text-white transition">
              {loading ? (
                <div
                  aria-label="Loading"
                  className="w-6 h-6 border-4 border-t-4 border-white border-opacity-50 rounded-full animate-spin"></div>
              ) : (
                <Search size={22} className="font-semibold" />
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
