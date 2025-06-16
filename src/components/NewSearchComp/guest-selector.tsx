"use client";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

interface GuestSelectorProps {
  guests: {
    adult: number;
    kid: number;
    infant: number;
    pet: number;
  };
  onChange: (guests: {
    adult: number;
    kid: number;
    infant: number;
    pet: number;
  }) => void;
  onClose: () => void;
  onApply: () => void;
}

interface GuestTypeProps {
  type: "adult" | "kid" | "infant" | "pet";
  title: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}

function GuestType({
  type,
  title,
  description,
  value,
  onChange,
}: GuestTypeProps) {
  const increment = () => {
    onChange(value + 1);
  };

  const decrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <h3 className="text-base font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        {type === "pet" && (
          <button
            type="button"
            className="text-sm underline mt-1 text-gray-600 hover:text-gray-900 transition-colors">
            Bringing a service animal?
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={decrement}
          disabled={value === 0}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-150",
            value === 0
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-500 hover:border-gray-500"
          )}
          aria-label={`Decrease ${title}`}>
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-5 text-center">{value}</span>
        <button
          type="button"
          onClick={increment}
          className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 text-gray-500 hover:border-gray-500 transition-all duration-150"
          aria-label={`Increase ${title}`}>
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function GuestSelector({
  guests,
  onChange,
  onClose,
  onApply,
}: GuestSelectorProps) {
  const [localGuests, setLocalGuests] = useState(guests);

  useEffect(() => {
    // Handle click outside to close dropdown
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".guest-selector-container") &&
        !target.closest('[data-section="guests"]')
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleChange = (type: keyof typeof localGuests, value: number) => {
    const updatedGuests = { ...localGuests, [type]: value };
    setLocalGuests(updatedGuests);
    onChange(updatedGuests);
  };

  const totalGuests = localGuests.adult + localGuests.kid;

  return (
    <div className="text-gray-500 guest-selector-container absolute top-full right-0 mt-4 w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-200 z-50 overflow-hidden transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95">
      <div className="p-6">
        <GuestType
          type="adult"
          title="Adult"
          description="Ages 13 or above"
          value={localGuests.adult}
          onChange={(value) => handleChange("adult", value)}
        />

        <div className="border-t border-gray-200">
          <GuestType
            type="kid"
            title="Kid"
            description="Ages 2–12"
            value={localGuests.kid}
            onChange={(value) => handleChange("kid", value)}
          />
        </div>

        <div className="border-t border-gray-200">
          <GuestType
            type="infant"
            title="Infant"
            description="Under 2"
            value={localGuests.infant}
            onChange={(value) => handleChange("infant", value)}
          />
        </div>

        <div className="border-t border-gray-200">
          <GuestType
            type="pet"
            title="Pet"
            description=""
            value={localGuests.pet}
            onChange={(value) => handleChange("pet", value)}
          />
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onApply}
            className="px-6 py-2 text-sm font-medium text-black underline rounded-lg hover:bg-gray-50 transition-colors">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
