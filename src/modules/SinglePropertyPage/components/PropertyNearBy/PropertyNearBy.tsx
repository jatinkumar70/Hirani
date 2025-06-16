import {
  Building2,
  Bus,
  LandPlot,
  MapPinned,
  Plane,
  ShoppingCart,
  Utensils,
  Waves,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Property } from "../../../../types/types";
import { api } from "../../../../utils/api";

interface IPropertyData {
  hotelData: Property;
}

interface NearbyPlace {
  distance: string;
  latitude: number;
  location: string;
  longitude: number;
}

interface NearbyData {
  property_nearby_unique_id: number;
  property_nearby_uuid: string;
  property_details_uuid: string;
  nearby_type: string;
  nearby_places: NearbyPlace[];
}

const PropertyNearbyPlaces: React.FC<IPropertyData> = ({ hotelData }) => {
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyData[]>([]);

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      try {
        const response = await api.get(
          `/property/get-property-nearby?property_details_uuid=${hotelData.property_details_uuid}`
        );
        if (response.data?.data) {
          setNearbyPlaces(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching nearby places:", error);
        setNearbyPlaces([]);
      }
    };

    if (hotelData?.property_details_uuid) {
      fetchNearbyPlaces();
    }
  }, [hotelData?.property_details_uuid]);

  const categories = [
    {
      title: "Attractions",
      icon: <MapPinned size={20} />,
      items:
        nearbyPlaces
          .find((place) => place.nearby_type === "Attractions")
          ?.nearby_places?.map((place) => ({
            name: place.location,
            distance: place.distance,
          })) || [],
    },
    {
      title: "Restaurants and cafes",
      icon: <Utensils size={20} />,
      items:
        nearbyPlaces
          .find((place) => place.nearby_type === "Restaurants and cafes")
          ?.nearby_places?.map((place) => ({
            name: place.location,
            distance: place.distance,
          })) || [],
    },
    {
      title: "Supermarkets",
      icon: <ShoppingCart size={20} />,
      items:
        nearbyPlaces
          .find((place) => place.nearby_type === "Supermarkets")
          ?.nearby_places?.map((place) => ({
            name: place.location,
            distance: place.distance,
          })) || [],
    },
    {
      title: "Golf courses",
      icon: <LandPlot size={20} />,
      items:
        nearbyPlaces
          .find((place) => place.nearby_type === "Golf courses")
          ?.nearby_places?.map((place) => ({
            name: place.location,
            distance: place.distance,
          })) || [],
    },
    {
      title: "Beaches",
      icon: <Waves size={20} />,
      items:
        nearbyPlaces
          .find((place) => place.nearby_type === "Beaches")
          ?.nearby_places?.map((place) => ({
            name: place.location,
            distance: place.distance,
          })) || [],
    },
    {
      title: "Shopping malls",
      icon: <Building2 size={20} />,
      items:
        nearbyPlaces
          .find((place) => place.nearby_type === "Shopping malls")
          ?.nearby_places?.map((place) => ({
            name: place.location,
            distance: place.distance,
          })) || [],
    },
    {
      title: "Airports",
      icon: <Plane size={20} />,
      items:
        nearbyPlaces
          .find((place) => place.nearby_type === "Airports")
          ?.nearby_places?.map((place) => ({
            name: place.location,
            distance: place.distance,
          })) || [],
    },
    {
      title: "Public transport",
      icon: <Bus size={20} />,
      items:
        nearbyPlaces
          .find((place) => place.nearby_type === "Public transport")
          ?.nearby_places?.map((place) => ({
            name: place.location,
            distance: place.distance,
          })) || [],
    },
  ].filter((category) => category.items.length > 0);

  // If there are no nearby places at all, don't show the section
  if (categories.length === 0) return null;

  return (
    <>
      {/* {hotelData.slug === "bnbme-elegant-apt-w-pool-gym-near-downtown-262899" && ( */}
      <div
        id="surroundings"
        style={{ scrollMarginTop: "100px" }}
        className="flex flex-col gap-3 py-8">
        <span className="text-xl font-semibold mb-3">What is nearby?</span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.title} className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                {category.title} <span>{category.icon}</span>
              </h3>
              <ul className="space-y-2">
                {category.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-sm"
                    style={{ whiteSpace: "nowrap" }}>
                    <span className="w-[80%] break-words truncate whitespace-normal">
                      {item.name}
                    </span>
                    <span className="w-[20%] text-gray-500 text-right">
                      {item.distance}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default PropertyNearbyPlaces;
