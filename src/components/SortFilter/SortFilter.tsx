import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type SortOption = {
  label: string;
  value: string;
};

const SortFilter: React.FC<{ onSortChange: (value: string) => void }> = ({
  onSortChange,
}) => {
  // Sort options
  const sortOptions: SortOption[] = [
    { label: "Price - Lowest first", value: "price_asc" },
    { label: "Newest", value: "newest" },
    { label: "Top Rated", value: "top_rated" },
  ];

  // State for the selected option
  const [selectedOption, setSelectedOption] = useState<string>(
    sortOptions[0].value
  );

  // Handle change in sorting
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedOption(value);
    onSortChange(value);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-md font-medium text-gray-800">Sort by:</label>
      <div className="relative">
        <select
          value={selectedOption}
          onChange={handleSortChange}
          className="appearance-none text-sm text-gray-700 bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 cursor-pointer transition-all duration-200 outline-none">
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="p-3 transition-all duration-200 hover:bg-gray-100">
              {option.label}
            </option>
          ))}
        </select>
        {/* Dropdown Icon */}
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default SortFilter;
