"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "../ui/Dialog/Dialog";
import SelectedFiltersSection from "./selected-filters-section";
import PriceRangeSection from "./price-range-section";
import AmenitiesSection from "./amenities-section";
import RoomsSection from "./rooms-section";
import { Button } from "../ui/Button/Button";
import DotSpinner from "../DotSpinner/DotSpinner";
import type { FiltersProps, FilterState } from "./types";
import { useRouter } from "next/router";

// Constants for price range
const MIN_PRICE = 0;
const MAX_PRICE = 20000;

export default function FiltersModal({
  open,
  onOpenChange,
  onFiltersChange,
  totalPlaces = "See All",
  isLoading,
  amenitiesCategory,
  initialFilters,
}: FiltersProps) {
  const router = useRouter();

  const getInitialValue = useCallback(
    (paramName: string, defaultValue: any) => {
      const paramValue = router.query[paramName];
      return paramValue !== undefined ? paramValue : defaultValue;
    },
    [router.query]
  );

  // Get amenities from URL (can be multiple)
  const getAmenitiesFromUrl = useCallback(() => {
    const amenities = router.query.amenitie;
    if (Array.isArray(amenities)) {
      return amenities;
    } else if (amenities) {
      return [amenities];
    }
    return initialFilters?.amenities || [];
  }, [router.query, initialFilters]);

  const [priceRange, setPriceRange] = useState({
    min: Number(
      getInitialValue("minimum", initialFilters?.priceRange?.min || MIN_PRICE)
    ),
    max: Number(
      getInitialValue("maximum", initialFilters?.priceRange?.max || MAX_PRICE)
    ),
  });

  const [selectedBedrooms, setSelectedBedrooms] = useState(
    getInitialValue(
      "bedrooms",
      initialFilters?.bedrooms ? initialFilters.bedrooms.toString() : "Any"
    )
  );

  const [selectedBeds, setSelectedBeds] = useState(
    getInitialValue(
      "beds",
      initialFilters?.beds ? initialFilters.beds.toString() : "Any"
    )
  );

  const [selectedBathrooms, setSelectedBathrooms] = useState(
    getInitialValue(
      "bathroom",
      initialFilters?.bathrooms ? initialFilters.bathrooms.toString() : "Any"
    )
  );

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    getAmenitiesFromUrl()
  );

  // Reset all filters
  const handleClearAll = useCallback(() => {
    setPriceRange({ min: MIN_PRICE, max: MAX_PRICE });
    setSelectedBedrooms("Any");
    setSelectedBeds("Any");
    setSelectedBathrooms("Any");
    setSelectedAmenities([]);
  }, []);

  const handleShowResults = () => {
    onOpenChange(false);

    // 1. Build the new filters object
    const query: Record<string, string | number | string[]> = {
      minimum: priceRange.min,
      maximum: priceRange.max,
    };
    if (selectedBedrooms !== "Any") {
      query.bedrooms = selectedBedrooms;
    }
    if (selectedBeds !== "Any") query.beds = selectedBeds;
    if (selectedBathrooms !== "Any") query.bathroom = selectedBathrooms;
    if (selectedAmenities.length > 0) query.amenitie = selectedAmenities;

    // 2. (Optional) preserve other router.query params
    const existing = { ...router.query } as Record<string, any>;
    ["minimum", "maximum", "bedrooms", "beds", "bathroom", "amenitie"].forEach(
      (k) => delete existing[k]
    );

    const finalQuery = { ...existing, ...query };

    // 3. Serialize
    const params = new URLSearchParams();
    Object.entries(finalQuery).forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((x) => params.append(k, String(x)));
      } else {
        params.set(k, String(v));
      }
    });
    const newPath = `/search?${params.toString()}`;

    // 4. Decide: same base path => update in-place; otherwise open new tab
    if (window.location.pathname === "/search") {
      // same "place" (page), just push the new query in the same tab
      router.push(newPath);
    } else {
      // not on /search, so open a new tab for the search page
      window.open(newPath, "_blank");
    }
  };
  // Update parent component with filter changes
  useEffect(() => {
    const newFilters: FilterState = {
      priceRange,
      bedrooms:
        selectedBedrooms === "Studio"
          ? -1
          : isNaN(Number(selectedBedrooms))
          ? 0
          : Number(selectedBedrooms),
      beds: isNaN(Number(selectedBeds)) ? 0 : Number(selectedBeds),
      bathrooms: isNaN(Number(selectedBathrooms))
        ? 0
        : Number(selectedBathrooms),
      amenities: selectedAmenities,
    };

    onFiltersChange(newFilters);
    // We don't need to include onFiltersChange in the dependency array
    // as it would cause unnecessary re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    priceRange,
    selectedBedrooms,
    selectedBeds,
    selectedBathrooms,
    selectedAmenities,
  ]);

  // Get selected filters for display
  const getSelectedFilters = useCallback(() => {
    const filters = [];

    if (selectedBedrooms !== "Any") {
      filters.push({
        label:
          selectedBedrooms === "Studio"
            ? "Studio"
            : `${selectedBedrooms}+ bedrooms`,
        onRemove: () => setSelectedBedrooms("Any"),
      });
    }

    if (selectedBathrooms !== "Any") {
      filters.push({
        label: `${selectedBathrooms}+ bathrooms`,
        onRemove: () => setSelectedBathrooms("Any"),
      });
    }

    if (selectedBeds !== "Any") {
      filters.push({
        label: `${selectedBeds}+ beds`,
        onRemove: () => setSelectedBeds("Any"),
      });
    }

    return filters;
  }, [selectedBedrooms, selectedBathrooms, selectedBeds]);

  const selectedFilters = getSelectedFilters();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 rounded-2xl max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-center border-b border-gray-400 p-4 relative">
          <h2 className="text-xl font-medium">Filters</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 p-2 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Selected filters */}
          {selectedFilters.length > 0 && (
            <SelectedFiltersSection selectedFilters={selectedFilters} />
          )}

          {/* Price Range Section */}
          <PriceRangeSection
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minPrice={MIN_PRICE}
            maxPrice={MAX_PRICE}
          />

          {/* Rooms and Beds Section */}
          <RoomsSection
            selectedBedrooms={selectedBedrooms}
            selectedBeds={selectedBeds}
            selectedBathrooms={selectedBathrooms}
            setSelectedBedrooms={setSelectedBedrooms}
            setSelectedBeds={setSelectedBeds}
            setSelectedBathrooms={setSelectedBathrooms}
          />

          {/* Amenities Section */}
          <AmenitiesSection
            amenitiesCategory={amenitiesCategory}
            selectedAmenities={selectedAmenities}
            setSelectedAmenities={setSelectedAmenities}
          />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 p-7 lg:p-2 flex justify-between items-center bg-white">
          <button
            onClick={handleClearAll}
            className="text-black font-medium underline">
            Clear all
          </button>
          <Button
            onClick={handleShowResults}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
            {isLoading ? (
              <DotSpinner />
            ) : (
              <>
                {totalPlaces.toLocaleString() > "0"
                  ? "show " + totalPlaces.toLocaleString() + "+ places"
                  : "No place found"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
