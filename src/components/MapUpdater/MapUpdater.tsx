"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);

  return null;
};
