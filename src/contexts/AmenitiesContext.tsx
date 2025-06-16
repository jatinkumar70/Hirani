"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "../utils/api";

interface AmenitiesContextType {
  selectedAmenities: string[];
  setSelectedAmenities: (amenities: string[]) => void;
  hotels: any[]; // Store fetched hotel data
  loading: boolean;
}

const AmenitiesContext = createContext<AmenitiesContextType | undefined>(
  undefined
);

export const AmenitiesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const placeId = searchParams.get("placeId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const amenitiesParam = searchParams.get("amenities");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize selectedAmenities from URL params
  useEffect(() => {
    if (amenitiesParam) {
      const amenitiesFromQuery = amenitiesParam.split(",");
      setSelectedAmenities(amenitiesFromQuery);
    }
  }, [amenitiesParam]);

  // Fetch hotels whenever selectedAmenities change
  useEffect(() => {
    const fetchHotels = async () => {
      if (selectedAmenities.length === 0) {
        return; // No amenities selected, don't fetch
      }

      setLoading(true);

      try {
        // Build the URL with individual amenity parameters
        let url = "/property/search-property?";

        // Add each amenity as a separate parameter with value=true
        selectedAmenities.forEach((amenity, index) => {
          if (index > 0) url += "&";
          url += `${amenity}=true`;
        });

        // Add optional parameters if they exist
        if (placeId) url += `&place_id=${placeId}&radius=5`;
        if (startDate) url += `&from_date=${startDate}`;
        if (endDate) url += `&to_date=${endDate}`;

        const response = await api.get(url);
        setHotels(response.data.data ?? []);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [selectedAmenities, placeId, startDate, endDate]);

  // Update URL when amenities change
  useEffect(() => {
    if (
      selectedAmenities.length > 0 &&
      window.location.pathname === "/search"
    ) {
      // Create a new URLSearchParams object from the current URL
      const params = new URLSearchParams(window.location.search);

      // Update the amenities parameter
      params.set("amenities", selectedAmenities.join(","));

      // Update the URL without refreshing the page
      // const newUrl = `/search?${params.toString()}`;
      // window.history.pushState({ path: newUrl }, "", newUrl);
    }
  }, [selectedAmenities]);

  return (
    <AmenitiesContext.Provider
      value={{ selectedAmenities, setSelectedAmenities, hotels, loading }}>
      {children}
    </AmenitiesContext.Provider>
  );
};

export const useAmenities = () => {
  const context = useContext(AmenitiesContext);
  if (!context) {
    throw new Error("useAmenities must be used within an AmenitiesProvider");
  }
  return context;
};
