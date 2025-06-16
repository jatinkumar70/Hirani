import "leaflet/dist/leaflet.css";
import type React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapUpdater } from "../../components/MapUpdater/MapUpdater";
import HotelMarker from "../../components/Core/MapContainer/components/HotelMarker/HotelMarker";
import { Property } from "../../types/types";

const cityCoordinates: Record<string, [number, number]> = {
  Dubai: [25.2048, 55.2708],
  Riyadh: [24.7136, 46.6753],
};

interface DynamicMapProps {
  selectedCity: string;
  hotelMapData?: any;
  // language: string;
  isFullScreen?: boolean;
}

const DynamicMap: React.FC<DynamicMapProps> = ({
  selectedCity,
  hotelMapData,
  // language,
  isFullScreen = false,
}) => {
  // const isRTL = language === "ar";
  const mapCenter = cityCoordinates[selectedCity] || cityCoordinates.Dubai;
  return (
    <MapContainer
      center={mapCenter}
      zoom={15}
      style={{ height: isFullScreen ? "100vh" : "100%", width: "100%" }}>
      <MapUpdater center={mapCenter} />
      <TileLayer
        url={`https://mt1.google.com/vt/lyrs=m&hl}&x={x}&y={y}&z={z}`}
        attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
      />

      <HotelMarker hotel={hotelMapData} />
    </MapContainer>
  );
};

export default DynamicMap;
