"use client";

import { useState, useEffect, useCallback } from "react";
import { MapPin, Building2, Calendar, Users } from "lucide-react";
import { debounce } from "lodash";
import { format, parseISO } from "date-fns";
import type { ILocationDetails } from "../../models/Location.model";
import { api } from "../../utils/api";
import type { RecentSearch } from "../../hooks/use-recent-searches";

//** Types
interface LocationSearchProps {
  value: string;
  onChange: (value: string, details?: ILocationDetails) => void;
  onClose: () => void;
  onSelect: (data: ILocationDetails) => void;
  recentSearches: RecentSearch[];
  onRecentSearchSelect?: () => void;
}

interface Location {
  place_id: string;
  description: string;
}

export function LocationSearch({
  value,
  onChange,
  onClose,
  onSelect,
  recentSearches,
  onRecentSearchSelect,
}: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState(value);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [placeId, setPlaceId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);

  //** Fetch location details when a place is selected
  const fetchLocationDetails = async (id: string) => {
    if (!id) return;
    setLoading(true);
    setError("");

    try {
      const res = await api.get(`/google/get-google-nearby?place_id=${id}`);
      const finalData = res.data.data;

      if (!finalData) {
        setError(
          "Unable to get location details. Please try selecting a different location."
        );
        return;
      }

      const addressComponents = finalData.address_components;

      const getAddressPart = (types: string[]) => {
        const component = addressComponents.find((comp: any) =>
          types.every((type) => comp.types.includes(type))
        );
        return component ? component.long_name : "";
      };

      //** Construct full address
      const addressLine1Parts = [
        finalData.name,
        getAddressPart(["premise"]),
        getAddressPart(["street_number"]),
        getAddressPart(["route"]),
      ].filter(Boolean);

      const fullAddress = [
        addressLine1Parts.join(", "),
        getAddressPart(["country", "political"]),
      ]
        .filter(Boolean)
        .join(" - ");

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

      //** Update search term with full address
      setSearchTerm(fullAddress);
      onChange(fullAddress, addressDetails);
      onSelect(addressDetails);
    } catch (error) {
      console.error("Error fetching location details:", error);
      setError(
        "Unable to get location details. Please try again or select a different location."
      );
    } finally {
      setLoading(false);
    }
  };

  //** Fetch autocomplete suggestions
  const fetchSuggestions = async (typedValue: string) => {
    if (!typedValue || typedValue.length < 3) return;
    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const res = await api.get(
        `/google/get-google-autocomplete?name=${typedValue}`
      );

      const suggestions = res.data.data || [];
      setSuggestions(suggestions);

      //* If no suggestions found, set appropriate error message
      if (suggestions.length === 0) {
        setError(
          "No locations found. Try searching for a different city or place."
        );
      }
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
      setSuggestions([]);

      //* Handle different types of errors
      //@ts-ignore
      if (error.response?.status === 404) {
        setError(
          "Location service is currently unavailable. Please try again later."
        );
        //@ts-ignore
      } else if (error.response?.status >= 500) {
        setError("Server error. Please try again in a moment.");
      } else if (!navigator.onLine) {
        setError(
          "No internet connection. Please check your network and try again."
        );
      } else {
        setError("Unable to search locations. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  //** Debounced function for fetching autocomplete suggestions
  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    []
  );

  //** Handle input change
  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    setPlaceId("");
    setError("");
    setHasSearched(false);

    if (value.length >= 3) {
      debouncedFetchSuggestions(value);
    } else {
      setSuggestions([]);
      setHasSearched(false);
    }
  };

  //** Handle selection of a location
  const handleSelect = (location: Location) => {
    setPlaceId(location.place_id);
    fetchLocationDetails(location.place_id);
    //** Ensure dropdown is closed
    onClose();
  };

  //** Handle selection of a recent search
  const handleRecentSearchSelect = async (search: RecentSearch) => {
    try {
      //** Create a URL with all the search parameters
      const searchParams = new URLSearchParams();
      searchParams.set("placeId", search.placeId);

      if (search.startDate && search.endDate) {
        searchParams.set("startDate", search.startDate);
        searchParams.set("endDate", search.endDate);
      }

      if (search.adult && search.adult > 0) {
        searchParams.set(
          `adult${search.adult > 1 ? "s" : ""}`,
          search.adult.toString()
        );
      }

      if (search.kid && search.kid > 0) {
        searchParams.set(
          `kid${search.kid > 1 ? "s" : ""}`,
          search.kid.toString()
        );
      }

      if (search.infant && search.infant > 0) {
        searchParams.set(
          `infant${search.infant > 1 ? "s" : ""}`,
          search.infant.toString()
        );
      }

      if (search.pet && search.pet > 0) {
        searchParams.set(
          `pet${search.pet > 1 ? "s" : ""}`,
          search.pet.toString()
        );
      }

      //** Close the dropdown first
      onClose();

      //** Call the callback to reset all fields
      if (onRecentSearchSelect) {
        onRecentSearchSelect();
      }

      //** Then open search results in a new tab
      window.open(`/search?${searchParams.toString()}`, "_blank");
    } catch (error) {
      console.error("Error handling recent search selection:", error);
    }
  };

  //** Effect to fetch location details when placeId changes
  useEffect(() => {
    if (placeId) {
      fetchLocationDetails(placeId);
    }
  }, [placeId]);

  //** Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".location-search-container") &&
        !target.closest('[data-section="location"]')
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  //** Format date range for display
  const formatDateRange = (startDate?: string, endDate?: string) => {
    if (!startDate || !endDate) return "";

    try {
      const start = parseISO(startDate);
      const end = parseISO(endDate);
      return `${format(start, "d MMM")}–${format(end, "d MMM")}`;
    } catch (error) {
      console.error("Error formatting date range:", error);
      return "";
    }
  };

  //** Format guests for display
  const formatGuests = (adult?: number) => {
    if (!adult || adult === 0) return "";
    return `${adult} ${adult === 1 ? "adult" : "adults"}`;
  };

  return (
    <div className="location-search-container absolute top-full left-0 mt-4 w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-200 z-50 overflow-hidden transition-all duration-200 ease-in-out">
      <div className="p-4 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Search destinations"
          className={`w-full p-3 pl-10 border rounded-full ${
            loading ? "border-primary-gold" : "border-gray-300"
          } focus:outline-none focus:border-primary-gold placeholder:text-gray-400 text-sm text-gray-700`}
          autoFocus
        />
        <MapPin className="absolute left-7 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-gold" />
        {loading && (
          <div className="-translate-y-1/2 absolute right-16 top-1/2 transform">
            <div className="border-2 border-primary-gold border-t-transparent h-4 rounded-full w-4 animate-spin"></div>
          </div>
        )}
        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              onChange("");
              setSuggestions([]);
            }}
            className="absolute right-8 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center text-gray-700 hover:text-gray-900"
            aria-label="Clear search">
            <svg
              xmlns="http://*www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>

      {/* API Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-4 pb-2">
          <h3 className="text-gray-800 text-lg font-medium mb-2">
            Suggestions
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {suggestions.map((item) => (
              <div
                key={item.place_id}
                className="flex items-center p-2 hover:bg-gray-100 rounded-xl cursor-pointer"
                onClick={() => handleSelect(item)}>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 mr-3">
                  <MapPin className="h-5 w-5 text-primary-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {item.description.substring(0, 60)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && hasSearched && searchTerm.length >= 3 && (
        <div className="px-4 pb-2">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mx-auto mb-3">
                <MapPin className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium mb-1">No results found</p>
              <p className="text-sm text-gray-500 max-w-xs">{error}</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setError("");
                  setHasSearched(false);
                  onChange("");
                  setSuggestions([]);
                }}
                className="mt-3 text-sm text-primary-gold hover:text-primary-gold/80 font-medium">
                Clear search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No suggestions but no error (when typing less than 3 characters) */}
      {!error &&
        hasSearched &&
        searchTerm.length >= 3 &&
        suggestions.length === 0 &&
        !loading && (
          <div className="px-4 pb-2">
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mx-auto mb-3">
                  <MapPin className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium mb-1">
                  No locations found
                </p>
                <p className="text-sm text-gray-500 max-w-xs">
                  Try searching for a different city, landmark, or address.
                </p>
              </div>
            </div>
          </div>
        )}

      {/* Recent searches section */}
      {(suggestions.length === 0 || searchTerm.length < 3) &&
        recentSearches.length > 0 && (
          <div className="px-4 pb-4">
            <h3 className="text-gray-800 text-lg font-medium mb-2">
              Recent searches
            </h3>
            <div className="space-y-3">
              {recentSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-start p-3 hover:bg-gray-100 rounded-xl cursor-pointer"
                  onClick={() => handleRecentSearchSelect(search)}>
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 mr-3">
                    <Building2 className="h-5 w-5 text-primary-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">
                      {search.locationName}
                    </p>
                    <div className="flex flex-wrap items-center mt-1 text-sm text-gray-500">
                      {search.startDate && search.endDate && (
                        <div className="flex items-center mr-3">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>
                            {formatDateRange(search.startDate, search.endDate)}
                          </span>
                        </div>
                      )}
                      {search.adult && search.adult > 0 && (
                        <div className="flex items-center">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          <span>{formatGuests(search.adult)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* No recent searches message */}
      {(suggestions.length === 0 || searchTerm.length < 3) &&
        recentSearches.length === 0 && (
          <div className="px-4 pb-4 text-center py-6">
            <p className="text-gray-500">No recent searches</p>
          </div>
        )}
    </div>
  );
}
