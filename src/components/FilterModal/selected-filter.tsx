"use client";

import { X } from "lucide-react";

export default function SelectedFilter({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <div className="inline-flex items-center px-4 py-2 rounded-full border border-gray-300 mr-2 mb-2">
      <span className="mr-2">{label}</span>
      <button onClick={onRemove} className="text-gray-500 hover:text-gray-700">
        <X size={16} />
      </button>
    </div>
  );
}
