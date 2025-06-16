"use client";

import { useCallback } from "react";

import RoomCounter from "./room-counter";
import SectionHeader from "./section-header";
import SectionDivider from "./section-divider";

export default function RoomsSection({
  selectedBedrooms,
  selectedBeds,
  selectedBathrooms,
  setSelectedBedrooms,
  setSelectedBeds,
  setSelectedBathrooms,
}: {
  selectedBedrooms: string;
  selectedBeds: string;
  selectedBathrooms: string;
  setSelectedBedrooms: (value: string) => void;
  setSelectedBeds: (value: string) => void;
  setSelectedBathrooms: (value: string) => void;
}) {
  // Handle room count changes with increment/decrement
  const handleRoomCountChange = useCallback(
    (
      type: "bedrooms" | "beds" | "bathrooms",
      action: "increment" | "decrement"
    ) => {
      const getNextValue = (
        current: string,
        action: "increment" | "decrement",
        type: "bedrooms" | "beds" | "bathrooms"
      ) => {
        // Special case for bedrooms
        if (type === "bedrooms") {
          if (current === "Any") {
            // When "Any" is displayed, treat it as 0
            return action === "increment" ? "Studio" : "Any";
          }

          if (current === "Studio") {
            // When "Studio" is displayed, also treat it as 0
            return action === "increment" ? "1" : "Any";
          }

          const numValue = Number.parseInt(current);
          if (isNaN(numValue)) return "Any";

          if (action === "decrement") {
            if (numValue === 1) return "Studio";
            return (numValue - 1).toString(); // Fixed: Changed + to - for decrement
          } else {
            if (numValue >= 8) return "8+";
            return (numValue + 1).toString();
          }
        } else {
          // Original logic for beds and bathrooms
          if (current === "Any") {
            return action === "increment" ? "1" : "Any";
          }

          const numValue = Number.parseInt(current);
          if (isNaN(numValue)) return "Any";

          if (action === "decrement") {
            if (numValue === 1) return "Any";
            return (numValue - 1).toString();
          } else {
            if (numValue >= 8) return "8+";
            return (numValue + 1).toString();
          }
        }
      };

      if (type === "bedrooms") {
        setSelectedBedrooms(getNextValue(selectedBedrooms, action, type));
      } else if (type === "beds") {
        setSelectedBeds(getNextValue(selectedBeds, action, type));
      } else {
        setSelectedBathrooms(getNextValue(selectedBathrooms, action, type));
      }
    },
    [
      setSelectedBedrooms,
      setSelectedBeds,
      setSelectedBathrooms,
      selectedBedrooms,
      selectedBeds,
      selectedBathrooms,
    ]
  );

  return (
    <>
      <SectionHeader title="Rooms and beds" />

      <RoomCounter
        label="Bedrooms"
        value={selectedBedrooms}
        onDecrement={() => handleRoomCountChange("bedrooms", "decrement")}
        onIncrement={() => handleRoomCountChange("bedrooms", "increment")}
      />

      <RoomCounter
        label="Beds"
        value={selectedBeds}
        onDecrement={() => handleRoomCountChange("beds", "decrement")}
        onIncrement={() => handleRoomCountChange("beds", "increment")}
      />

      <RoomCounter
        label="Bathrooms"
        value={selectedBathrooms}
        onDecrement={() => handleRoomCountChange("bathrooms", "decrement")}
        onIncrement={() => handleRoomCountChange("bathrooms", "increment")}
      />

      <SectionDivider />
    </>
  );
}
