import { debounce } from "lodash";
import { MapPin } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { ILocation, ILocationDetails } from "../../models/Location.model";
import { api } from "../../utils/api";

export interface IAutoSearchProps {
  onSelect: (data: ILocationDetails) => void;
  disabled?: boolean;
  error?: any;
  value: string | any;
  word: string;
  size?: string;
}

export const LocationAutoSearch: React.FC<IAutoSearchProps> = ({
  onSelect,
  word,
  disabled,
  error,
  value, // Initial placeId if provided
  size,
}) => {
  const [options, setOptions] = useState<readonly ILocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearchText] = useState<string>("");
  const [placeId, setPlaceId] = useState<string>(value || "");
  const [open, setOpen] = useState(false);

  // Fetch location details if placeId is available
    const fetchLocationDetails = async (id: string) => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await api.get(`/google/get-google-nearby?place_id=${id}`);
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

        const fullAddress = [
          addressLine1Parts.join(", "),
          // getAddressPart(["locality", "political"]), // City
          // getAddressPart(["administrative_area_level_1", "political"]), // State
          getAddressPart(["country", "political"]), // Country
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

        // Show full address in search bar
        setSearchText(fullAddress);
        onSelect(addressDetails);
      } catch (error) {
        console.error("Error fetching location details:", error);
      } finally {
        setLoading(false);
      }
    };

  // Fetch autocomplete suggestions
  const fetchSuggestions = async (typedValue: string) => {
    if (!typedValue) return;
    setLoading(true);
    try {
      const res = await api.get(
        `/google/get-google-autocomplete?name=${typedValue}`
      );
      setOptions(res.data.data);
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced function for fetching autocomplete suggestions
  const debounceFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 800),
    []
  );

  // Fetch location details when placeId changes (but allow typing new locations)
  useEffect(() => {
    if (placeId) {
      fetchLocationDetails(placeId);
    }
  }, [placeId]);

  // Fetch autocomplete suggestions when user types
  useEffect(() => {
    if (search.length > 2 && !placeId) {
      debounceFetchSuggestions(search);
    } else {
      setOptions([]);
    }
  }, [search]);

  return (
    <div className="relative flex items-center border border-gray-400 lg:border-none lg:p-0 p-4 rounded-xl">
      <MapPin size={30} className="text-gray-800" />
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearchText(e.target.value);
          setPlaceId(""); // Reset placeId when typing a new location
          setOpen(true); // Show suggestions dropdown
        }}
        placeholder={word}
        disabled={disabled}
        className={`w-full px-4 py-2 text-gray-800 rounded-md placeholder-black ${
          size ? size : "text-base"
        } ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {loading && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <div className="w-4 h-4 border-2 border-t-transparent border-primary-gold rounded-full animate-spin"></div>
        </div>
      )}
      {open && !loading && options.length > 0 && (
        <ul className="absolute z-10 top-16 mt-1 w-[400px] text-sm bg-white text-gray-800 shadow-lg rounded-md border">
          {options.map((option) => (
            <li
              key={option.place_id}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setPlaceId(option.place_id); // Update placeId
                setSearchText(option.description); // Set selected location name
                setOpen(false); // Close dropdown
              }}>
              {option.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
