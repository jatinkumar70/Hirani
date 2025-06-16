"use client";

import { Minus, Plus } from "lucide-react";

export default function RoomCounter({
  label,
  value,
  onDecrement,
  onIncrement,
}: {
  label: string;
  value: string;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <p className="text-base">{label}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={onDecrement}
          className={`w-10 h-10 rounded-full border ${
            value === "Any"
              ? "border-gray-200 text-gray-300"
              : "border-gray-400"
          } flex items-center justify-center hover:border-gray-500 transition-colors`}>
          <Minus size={16} />
        </button>
        <span className="w-12 text-center">{value}</span>
        <button
          onClick={onIncrement}
          className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:border-gray-500 transition-colors">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
