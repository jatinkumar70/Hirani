"use client";

import type React from "react";

import { useRef, useEffect } from "react";
import { MinusCircle, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/Button/Button";

interface GuestSelectorProps {
  guests: {
    adults: number;
    kids: number;
    infants: number;
    pets: number;
  };
  setGuests: React.Dispatch<
    React.SetStateAction<{
      adults: number;
      kids: number;
      infants: number;
      pets: number;
    }>
  >;
  onClose: () => void;
}

export function GuestSelector({
  guests,
  setGuests,
  onClose,
}: GuestSelectorProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const updateGuestCount = (type: string, delta: number) => {
    setGuests((prev) => {
      const key = type.toLowerCase() as keyof typeof prev;
      const current = prev[key];
      const newValue = Math.max(0, current + delta);

      // Ensure at least 1 adult
      if (key === "adults" && newValue === 0) {
        return prev;
      }

      return { ...prev, [key]: newValue };
    });
  };

  return (
    <motion.div
      ref={dropdownRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute mt-80 bg-white p-4 rounded-2xl  shadow-md  w-full z-10 border border-black/20 max-w-sm">
      {["Adults", "Kids", "Infants", "Pets"].map((type, index) => (
        <div
          key={index}
          className="flex justify-between items-center  py-2 border-b last:border-none">
          <span className="text-base font-medium">{type}</span>
          <div className="flex items-center space-x-2">
            <MinusCircle
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => updateGuestCount(type, -1)}
            />
            <span className="text-base w-6 text-center">
              {guests[type.toLowerCase() as keyof typeof guests]}
            </span>
            <PlusCircle
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => updateGuestCount(type, 1)}
            />
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full text-base mt-2 shadow-xl border border-black/20" onClick={onClose}>
        Done
      </Button>
    </motion.div>
  );
}
