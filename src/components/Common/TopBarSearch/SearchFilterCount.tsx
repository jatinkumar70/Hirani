import { useState, useEffect } from "react";
import { Settings2 } from "lucide-react";
import { Button } from "../../ui/Button/Button";
import { motion } from "framer-motion";
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

export default function SearchFilterCount({
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
    <motion.div
      className="bg-white rounded-full shadow-xl flex items-center justify-between mx-4 
       w-auto
      p-3 mt-2 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      // Expanded width
    >
      <Button
        onClick={handleOpenModal}
        variant="outline"
        size="lg"
        className="border-none outline-none px-2 py-1 h-5 w-full flex items-center gap-2 justify-between rounded-lg text-[#0C0C0C] text-lg lg:text-base relative">
        {activeCount > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-5 flex items-center justify-center bg-gray-800 text-white rounded-full w-5 h-5 text-xs font-medium">
            {activeCount}
          </span>
        )}
        <Settings2 className="w-6 h-6 lg:w-5 lg:h-5" />
        <span className="text-lg lg:text-base font-semibold">Filters</span>
      </Button>
    </motion.div>
  );
}
