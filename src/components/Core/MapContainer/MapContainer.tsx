import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { MapUpdater } from "../../MapUpdater/MapUpdater";
import HotelMarker from "./components/HotelMarker/HotelMarker";

const cityCoordinates: Record<string, [number, number]> = {
  "Northern India": [31.1048, 77.1734],
  "North-East India": [27.0238, 88.5122],
};

const HotelMap: React.FC<{
  selectedCity: string;
  data: any;
  loc?: any;
}> = ({ selectedCity, data, loc }) => {
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  //* Set fallback center to Northern India if city is not found
  const mapCenter = cityCoordinates[selectedCity] || cityCoordinates["Northern India"];

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
    <div className="lg:h-[87vh] rounded-2xl flex flex-col overflow-hidden">
      <div className="flex justify-center">{/* Your Navbar or Header */}</div>
      <div className="flex-grow overflow-hidden">
        <div className="lg:h-full h-[700px]">
          <MapContainer
            center={mapCenter}
            zoom={6}
            style={{ height: "100%", width: "100%", borderRadius: "10px" }}
            scrollWheelZoom={isCtrlPressed}>
            <MapUpdater center={mapCenter} />
            <TileLayer
              url={`https://mt1.google.com/vt/lyrs=m&hl&x={x}&y={y}&z={z}`}
              attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
            />

            <HotelMarker hotel={data} loc={loc} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default HotelMap;
