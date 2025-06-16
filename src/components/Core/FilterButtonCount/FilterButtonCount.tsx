import { useState, useEffect } from "react";
import { Settings2 } from "lucide-react";
import { Button } from "../../ui/Button/Button";

type FilterState = {
  priceRange: { min: number; max: number };
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
};

interface FilterButtonProps {
  activeFilters: FilterState;
  handleOpenModal: () => void;
}

export default function FilterButtonCount({
  activeFilters,
  handleOpenModal,
}: FilterButtonProps) {
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    // Count active filters (bedrooms, beds, bathrooms)
    let count = 0;
    if (activeFilters.bedrooms > 0) count++;
    if (activeFilters.beds > 0) count++;
    if (activeFilters.bathrooms > 0) count++;

    // You can also count amenities if needed
    // if (activeFilters.amenities.length > 0) count++

    setActiveCount(count);
  }, [activeFilters]);

  return (
    <Button
      onClick={handleOpenModal}
      variant="outline"
      size="lg"
      className="px-6 py-3 lg:px-3 lg:py-2 h-12 lg:h-10 w-full flex items-center gap-2 justify-between border-2 border-black rounded-lg text-[#0C0C0C] text-lg lg:text-base relative">
      {activeCount > 0 && (
        <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-2 flex items-center justify-center bg-gray-800 text-white rounded-full w-5 h-5 text-xs font-medium">
          {activeCount}
        </span>
      )}
      <Settings2 className="w-6 h-6 lg:w-5 lg:h-5" />
      <span className="text-lg lg:text-base font-semibold">Filters</span>
    </Button>
  );
}
