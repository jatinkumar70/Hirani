"use client";

import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { FilterState, MasterAmenitiesProps } from "../FilterModal/types";
import {
  MasterAmenities,
  MasterFilter,
} from "../../lib/MasterFilter/filterApi";
import FiltersModal from "../FilterModal/filters-modal";
import DownFilterButtonCount from "./DownFilterButtonCount";
import { useLocation } from "../../contexts/AuthProvider/LocationContext";

// Debounce utility function
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Sanitize filters to remove default values
const sanitizeFilters = (filters: FilterState): Partial<FilterState> => {
  const cleanedFilters: Partial<FilterState> = {};

  if (filters.priceRange.min !== 200 || filters.priceRange.max !== 20000) {
    cleanedFilters.priceRange = filters.priceRange;
  }

  if (filters.bedrooms > 0) {
    cleanedFilters.bedrooms = filters.bedrooms;
  } else if (filters.bedrooms === -1) {
    cleanedFilters.bedrooms = 0;
  }

  if (filters.beds > 0) {
    cleanedFilters.beds = filters.beds;
  }

  if (filters.bathrooms > 0) {
    cleanedFilters.bathrooms = filters.bathrooms;
  }

  if (filters.amenities.length > 0) {
    cleanedFilters.amenities = filters.amenities;
  }

  return cleanedFilters;
};

export default function SearchFilterButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amenities, setAmenities] = useState<MasterAmenitiesProps[]>([]);
  const [propertyData, setPropertyData] = useState({
    currentRecords: 56, // Default value until actual data is loaded
    data: [],
  });
  const { cityName } = useLocation();
  const hasInitialized = useRef(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>(() => {
    const defaultFilters: FilterState = {
      priceRange: { min: 0, max: 20000 },
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
      amenities: [],
    };
    return defaultFilters;
  });

  // Initialize filters from URL params when router is ready
  useEffect(() => {
    if (router.isReady && !hasInitialized.current) {
      hasInitialized.current = true;

      const { minimum, maximum, bedrooms, beds, bathroom, amenitie } =
        router.query;
      const newFilters = { ...activeFilters };

      if (minimum || maximum) {
        newFilters.priceRange = {
          min: minimum ? Number(minimum) : 0,
          max: maximum ? Number(maximum) : 20000,
        };
      }

      if (bedrooms !== undefined) {
        newFilters.bedrooms = bedrooms === "Any" ? 0 : Number(bedrooms);
      }

      if (beds !== undefined) {
        newFilters.beds = beds === "Any" ? 0 : Number(beds);
      }

      if (bathroom !== undefined) {
        newFilters.bathrooms = bathroom === "Any" ? 0 : Number(bathroom);
      }

      if (amenitie !== undefined) {
        newFilters.amenities = Array.isArray(amenitie) ? amenitie : [amenitie];
      }

      setActiveFilters(newFilters);
      // Don't apply filters automatically on page load
    }
  }, [router.isReady, router.query, activeFilters]);

  // Apply filters (after cleaning)
  const applyFilters = async (filters: FilterState) => {
    try {
      setLoading(true);
      const cleanedFilters = sanitizeFilters(filters);
      const result = await MasterFilter(cleanedFilters, true, cityName);
      setPropertyData({
        currentRecords: result?.length || 0,
        data: result || [],
      });
    } catch (error) {
      console.error("Failed to fetch filtered properties:", error);
    } finally {
      setLoading(false);
    }
  };
  // Update the debounced function to also pass locationDetails
  const debouncedApplyFilters = useCallback(
    debounce((filters: FilterState) => {
      applyFilters(filters);
    }, 500),
    [cityName] // Add locationDetails as a dependency
  );

  const handleFiltersChange = (newFilters: FilterState) => {
    setActiveFilters(newFilters);
    debouncedApplyFilters(newFilters);
  };
  const handleOpenModal = async () => {
    setOpen(true);

    // Start loading state
    setLoading(true);

    try {
      // Fetch amenities if not already loaded
      if (amenities.length === 0) {
        const amenitiesResult = await MasterAmenities();
        setAmenities(amenitiesResult);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-3 flex justify-center">
        <DownFilterButtonCount
          activeFilters={activeFilters}
          handleOpenModal={handleOpenModal}
        />
        ;
      </div>

      {open && (
        <FiltersModal
          open={open}
          onOpenChange={setOpen}
          onFiltersChange={handleFiltersChange}
          totalPlaces={propertyData.currentRecords}
          isLoading={loading}
          amenitiesCategory={amenities}
          initialFilters={activeFilters}
        />
      )}
    </div>
  );
}
