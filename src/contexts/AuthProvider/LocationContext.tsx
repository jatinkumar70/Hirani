"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useSearchParams } from "next/navigation";
import { api } from "../../utils/api";
import { getCityByCountry } from "../../lib/locationMapping";

export interface ILocationDetails {
  place_id: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pin_code: string;
  country: string;
  longitude: number;
  latitude: number;
  rating?: number;
}

export type AddressLevel = "country" | "state" | "city" | "full";

interface LocationContextType {
  loading: boolean;
  currentLocation: ILocationDetails | null;
  cityName: string | null;
  formatAddress: (location: ILocationDetails, level: AddressLevel) => string;
  clearLocation: () => void;
  placeId: any;
  dynamicCoordinates: [number, number] | null;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const searchParams = useSearchParams();
  const placeId = searchParams.get("placeId");
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] =
    useState<ILocationDetails | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [dynamicCoordinates, setDynamicCoordinates] = useState<
    [number, number] | null
  >(null);

  const formatAddress = (
    location: ILocationDetails,
    level: AddressLevel
  ): string => {
    switch (level) {
      case "country":
        return location.country;
      case "state":
        return [location.state, location.country].filter(Boolean).join(", ");
      case "city":
        return [location.city, location.state, location.country]
          .filter(Boolean)
          .join(", ");
      case "full":
      default:
        return [
          location.address_line1,
          location.city,
          location.state,
          location.country,
        ]
          .filter(Boolean)
          .join(", ");
    }
  };

  const fetchLocationDetails = async (
    placeId: string
  ): Promise<ILocationDetails | null> => {
    if (!placeId) return null;

    setLoading(true);
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

      const city = getAddressPart(["locality", "political"]);
      const country = getAddressPart(["country", "political"]);
      const mappedCity = getCityByCountry(country) || city;

      const addressLine1Parts = [
        finalData.name,
        getAddressPart(["premise"]),
        getAddressPart(["street_number"]),
        getAddressPart(["route"]),
      ].filter(Boolean);

      const addressDetails: ILocationDetails = {
        place_id: finalData.place_id,
        address_line1: addressLine1Parts.join(", "),
        address_line2: getAddressPart(["route"]),
        city: getAddressPart(["locality", "political"]),
        state: getAddressPart(["administrative_area_level_1", "political"]),
        pin_code: getAddressPart(["postal_code"]),
        country: getAddressPart(["country", "political"]),
        longitude: finalData.geometry.location.lng,
        latitude: finalData.geometry.location.lat,
        rating: finalData.rating,
      };
      const coordinates: [number, number] = [
        finalData.geometry.location.lat,
        finalData.geometry.location.lng,
      ];
      setDynamicCoordinates(coordinates);
      setCurrentLocation(addressDetails);
      setCityName(mappedCity);
      return addressDetails;
    } catch (error) {
      console.error("Error fetching location details:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearLocation = () => {
    setCurrentLocation(null);
    setCityName(null);
  };

  useEffect(() => {
    if (placeId) {
      fetchLocationDetails(placeId);
    }
  }, [placeId]);

  const value: LocationContextType = {
    loading,
    currentLocation,
    formatAddress,
    clearLocation,
    cityName,
    placeId,
    dynamicCoordinates,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
