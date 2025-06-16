import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import HotelMarker from "../../../../components/Core/MapContainer/components/HotelMarker/HotelMarker";
import { MapUpdater } from "../../../../components/MapUpdater/MapUpdater";
import { api } from "../../../../utils/api"; // Adjust import path as needed

// Define available city coordinates
const cityCoordinates: Record<string, [number, number]> = {
  Dubai: [25.2048, 55.2708],
  Riyadh: [24.7136, 46.6753],
  London: [51.5074, -0.1278],
  Paris: [48.8566, 2.3522],
  "New York": [40.7128, -74.006],
  Tokyo: [35.6762, 139.6503],
  Sydney: [-33.8688, 151.2093],
  Mumbai: [19.076, 72.8777],
  Singapore: [1.3521, 103.8198],
  Barcelona: [41.3851, 2.1734],
  Rome: [41.9028, 12.4964],
  Amsterdam: [52.3676, 4.9041],
  Berlin: [52.52, 13.405],
  Madrid: [40.4168, -3.7038],
  Istanbul: [41.0082, 28.9784],
};

interface ILocationDetails {
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

type SearchPropertyMapProps = {
  selectedCity: string;
  data: any;
  loc?: any;
  placeId?: string; // Add placeId prop
};

// iOS-style loading dots component
const LoadingDots: React.FC = () => {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2,3].map((index) => (
        <div
          key={index}
          className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
};

const SearchPropertyMap: React.FC<SearchPropertyMapProps> = ({
  selectedCity,
  data,
  loc,
  placeId,
}) => {
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationDetails, setLocationDetails] =
    useState<ILocationDetails | null>(null);
  const [dynamicCoordinates, setDynamicCoordinates] = useState<
    [number, number] | null
  >(null);

  // Function to fetch location details from API
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

      const city = getAddressPart(["locality", "political"]);
      const country = getAddressPart(["country", "political"]);

      const addressDetails: ILocationDetails = {
        place_id: finalData.place_id,
        address_line1: addressLine1Parts.join(", "),
        address_line2: getAddressPart(["route"]),
        city,
        state: getAddressPart(["administrative_area_level_1", "political"]),
        pin_code: getAddressPart(["postal_code"]),
        country,
        longitude: finalData.geometry.location.lng,
        latitude: finalData.geometry.location.lat,
        rating: finalData.rating,
      };

      setLocationDetails(addressDetails);

      // Set dynamic coordinates from API response
      const coordinates: [number, number] = [
        finalData.geometry.location.lat,
        finalData.geometry.location.lng,
      ];
      setDynamicCoordinates(coordinates);

      // Try to find city in our predefined coordinates, otherwise use API coordinates
      const cityKey = Object.keys(cityCoordinates).find(
        (key) => key.toLowerCase() === city.toLowerCase()
      );

      if (!cityKey) {
        console.log(
          `Using dynamic coordinates for ${city}: [${coordinates[0]}, ${coordinates[1]}]`
        );
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlPlaceId = urlParams.get("placeId") || placeId;

    if (urlPlaceId) {
      fetchLocationDetails(urlPlaceId);
    }
  }, [placeId]);

  // Determine map center coordinates
  const getMapCenter = (): [number, number] => {
    // First priority: Dynamic coordinates from API
    if (dynamicCoordinates) {
      return dynamicCoordinates;
    }

    // Second priority: City from locationDetails
    if (locationDetails?.city) {
      const cityKey = Object.keys(cityCoordinates).find(
        (key) => key.toLowerCase() === locationDetails.city.toLowerCase()
      );
      if (cityKey) {
        return cityCoordinates[cityKey];
      }
    }

    // Third priority: Selected city prop
    const mapCenter = cityCoordinates[selectedCity];
    if (mapCenter) {
      return mapCenter;
    }

    // Fallback to Dubai
    return cityCoordinates.Dubai;
  };

  const finalMapCenter = getMapCenter();

  // Disable browser zoom when Ctrl + scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) setIsCtrlPressed(true);
    };

    const handleKeyUp = () => {
      setIsCtrlPressed(false);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isCtrlPressed) {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isCtrlPressed]);

  return (
    <div className="lg:h-[90vh] rounded-xl flex flex-col overflow-hidden lg:rounded-none">
      <div className="flex justify-center">{/* Navbar or header here */}</div>
      <div className="flex-grow overflow-hidden relative">
        <div className="lg:h-full h-[500px] rounded-xl">
          {loading ? (
            // Loading state with gray background and iOS-style loader
            <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gray-300 opacity-50 rounded-xl" />
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <LoadingDots />
              </div>
            </div>
          ) : (
            <MapContainer
              center={finalMapCenter}
              zoom={dynamicCoordinates ? 15 : 12} // Zoom closer for specific locations
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={isCtrlPressed}>
              <MapUpdater center={finalMapCenter} />
              <TileLayer
                url={`https://mt1.google.com/vt/lyrs=m&hl&x={x}&y={y}&z={z}`}
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
              />
              <HotelMarker hotel={data} loc={locationDetails || loc} />
            </MapContainer>
          )}
        </div>

        {/* Debug info - remove in production */}
        {process.env.NODE_ENV === "development" && locationDetails && (
          <div className="absolute top-4 left-4 bg-white p-2 rounded shadow-lg text-xs max-w-xs">
            <p>
              <strong>City:</strong> {locationDetails.city}
            </p>
            <p>
              <strong>Coordinates:</strong> [{finalMapCenter[0].toFixed(4)},{" "}
              {finalMapCenter[1].toFixed(4)}]
            </p>
            <p>
              <strong>Source:</strong>{" "}
              {dynamicCoordinates ? "API" : "Predefined"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPropertyMap;
