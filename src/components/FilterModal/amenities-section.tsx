"use client";

import { useCallback, useState } from "react";
import SectionHeader from "./section-header";
import { AmenityIcon } from "../Core/AmenityIcon/AmenityIcon";

// Helper function to format amenity codes
const formatAmenityName = (code: string) => {
  // Check if the code is already formatted
  if (!/^[A-Z_]+$/.test(code)) return code;

  // Convert OUTDOOR_FURNITURE to Outdoor Furniture
  return code
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function AmenitiesSection({
  amenitiesCategory,
  selectedAmenities,
  setSelectedAmenities,
}: {
  amenitiesCategory: any[];
  selectedAmenities: string[];
  setSelectedAmenities: (value: string[]) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_CATEGORIES_TO_SHOW = 1;

  // Handle single amenity toggle
  const handleAmenitiesChange = useCallback(
    (amenity: string) => {
      //@ts-ignore
      setSelectedAmenities((prev) =>
        prev.includes(amenity)
          ? prev.filter((a: string) => a !== amenity)
          : [...prev, amenity]
      );
    },
    [setSelectedAmenities]
  );

  // Handle select all in a category
  const handleSelectAll = useCallback(
    (amenities: string[], checked: boolean) => {
      //@ts-ignore
      setSelectedAmenities((prev) => {
        const newSet = new Set(prev);
        if (checked) {
          amenities.forEach((code) => newSet.add(code));
        } else {
          amenities.forEach((code) => newSet.delete(code));
        }
        return Array.from(newSet);
      });
    },
    [setSelectedAmenities]
  );

  // Sort categories to ensure "other" is last
  const sortedCategories = [
    ...amenitiesCategory.filter(
      (item) => item.category.toLowerCase() !== "other"
    ),
    ...amenitiesCategory.filter(
      (item) => item.category.toLowerCase() === "other"
    ),
  ];

  // Determine which categories to display
  const categoriesToShow = showAll
    ? sortedCategories
    : sortedCategories.slice(0, INITIAL_CATEGORIES_TO_SHOW);

  const hasMoreCategories =
    sortedCategories.length > INITIAL_CATEGORIES_TO_SHOW;

  return (
    <>
      <SectionHeader title="Amenities" />
      <div id="property-amenities" className="flex flex-col gap-4 sm:gap-6">
        {categoriesToShow.map((category, categoryIndex) => {
          const categoryAmenityCodes = category.amenities.map(
            (a: any) => a.code
          );
          const allSelected = categoryAmenityCodes.every((code: string) =>
            selectedAmenities.includes(code)
          );

          return (
            <div key={categoryIndex} className="flex flex-col gap-2 sm:gap-3">
              <div className="flex flex-row items-center justify-between gap-2 ">
                <h3 className="font-semibold text-base">{category.category}</h3>
                <label className="flex items-center space-x-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    className="hidden"
                    onChange={(e) =>
                      handleSelectAll(categoryAmenityCodes, e.target.checked)
                    }
                  />
                  <span
                    className={`w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center rounded-md border-2 transition-all ${
                      allSelected
                        ? "bg-primary-gold text-white border-primary-gold"
                        : "border-gray-300"
                    }`}>
                    {allSelected && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={3}
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>

                  <span className="font-medium text-sm">Select All</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {category.amenities.map((amenity: any) => {
                  const isChecked = selectedAmenities.includes(amenity.code);
                  // Format the amenity name if needed
                  const displayName =
                    amenity.name || formatAmenityName(amenity.code);

                  return (
                    <label
                      key={amenity.code}
                      className="flex items-center space-x-3 py-1 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isChecked}
                        onChange={() => handleAmenitiesChange(amenity.code)}
                      />

                      <span
                        className={`min-w-[28px] min-h-[28px] w-7 h-7 sm:w-6 sm:h-6 flex items-center justify-center rounded-md border-2 transition-all ${
                          isChecked
                            ? "bg-primary-gold text-white border-primary-gold"
                            : "border-gray-300"
                        }`}>
                        {isChecked && (
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </span>

                      <span className="flex items-center gap-2">
                        <AmenityIcon
                          amenityCode={amenity.code}
                          iconName={amenity.icon}
                          size={20}
                        />
                        <span className="text-sm sm:text-base">
                          {displayName}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* See More/See Less Button */}
        {hasMoreCategories && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-gold hover:text-primary-gold/80 transition-colors duration-200 border border-primary-gold hover:border-primary-gold/80 rounded-lg hover:bg-primary-gold/5">
              <span>{showAll ? "See Less" : "See More Amenities"}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  showAll ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
