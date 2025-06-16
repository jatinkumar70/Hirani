import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapUpdater } from "../../components/MapUpdater/MapUpdater";
import { Property } from "../../types/types";
import PropertyMarker from "./components/PropertyMaker/PropertyMaker";

const cityCoordinates: Record<string, [number, number]> = {
  Dubai: [25.2048, 55.2708],
  Riyadh: [24.7136, 46.6753],
};

const PropertyMap: React.FC<{
  selectedCity: string;
  data?: Property;
  loc?: any;
}> = ({ selectedCity, data }) => {
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  //* Set fallback center to Dubai if city is not found
  const mapCenter = data?.location
    ? ([data.location.latitude, data.location.longitude] as [number, number])
    : cityCoordinates[selectedCity] || cityCoordinates.Dubai;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) setIsCtrlPressed(true);
    };

    const handleKeyUp = () => {
      setIsCtrlPressed(false);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isCtrlPressed) {
        e.preventDefault(); // ❌ Stop browser zooming
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
    <div className="lg:h-[87vh] flex flex-col overflow-hidden">
      <div className="flex justify-center">{/* Your Navbar or Header */}</div>
      <div className="flex-grow overflow-hidden">
        <div className="lg:h-full h-96">
          <MapContainer
            center={mapCenter}
            zoom={15}
            style={{ height: "100%", width: "100%", borderRadius: "10px" }}
            scrollWheelZoom={isCtrlPressed}>
            <MapUpdater center={mapCenter} />
            <TileLayer
              url={`https://mt1.google.com/vt/lyrs=m&hl&x={x}&y={y}&z={z}`}
              attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
            />
            <PropertyMarker hotel={data} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
