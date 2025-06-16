"use client";
import {
  Building,
  Dumbbell,
  Gem,
  House,
  LampDesk,
  PawPrint,
  Repeat,
  ShoppingCart,
  TrainFrontTunnel,
  TreePalm,
  WavesLadder,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import FilterButton from "../../../../components/Home/Amenities/components/filterButton";
import { useAmenities } from "../../../../contexts/AmenitiesContext";

interface ILinkTrue {
  isTrue: boolean;
}

// Amenity Item Component
const AmenityItem: React.FC<{
  Icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}> = ({ Icon, label, isActive = false, onClick }) => (
  <div
    onClick={onClick}
    className={`flex flex-col items-center w-full cursor-pointer border-b-4 border-gray-500 pb-1 transition-all duration-300 ${
      isActive
        ? "text-gray-800 border-black"
        : "text-gray-800 border-transparent"
    }`}>
    <Icon
      size={22}
      className={`${isActive ? "text-gray-800" : "text-gray-500"}`}
    />
    <span
      className={`text-gray-800 text-xs text-center mt-2 whitespace-nowrap w-full  ${
        isActive ? "font-bold" : ""
      }`}>
      {label}
    </span>
  </div>
);

const SearchAmenities: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const searchParams = useSearchParams();
  const { selectedAmenities, setSelectedAmenities } = useAmenities();

  const isSearchActive =
    searchParams.get("placeId") ||
    searchParams.get("startDate") ||
    searchParams.get("endDate") ||
    searchParams.get("adult") ||
    searchParams.get("amenities"); // Search is active if any filter exists

  const amenities = [
    { key: "is_dubai_mall", Icon: Building, label: "Dubai Mall" },
    { key: "is_beach", Icon: TreePalm, label: "Beach" },
    { key: "is_luxury", Icon: Gem, label: "Luxury" },
    { key: "is_metro", Icon: TrainFrontTunnel, label: "Metro" },
    { key: "is_work_friendly", Icon: LampDesk, label: "Work friendly" },
    { key: "is_gym", Icon: Dumbbell, label: "Gym" },
    { key: "is_pet_friendly", Icon: PawPrint, label: "Pets allowed" },
    { key: "is_pool", Icon: WavesLadder, label: "Pool" },
    { key: "is_super_market", Icon: ShoppingCart, label: "Supermarket" },
    {
      key: "is_monthly_subscription",
      Icon: Repeat,
      label: "Monthly Subscription",
    },
  ];

  const toggleAmenity = (key: string) => {
    // If user is already on the search page, just update the state
    setSelectedAmenities(
      selectedAmenities.includes(key)
        ? selectedAmenities.filter((item) => item !== key)
        : [...selectedAmenities, key]
    );
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      setIsAtStart(scrollContainer.scrollLeft === 0);
      setIsAtEnd(
        scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth - 1
      );
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-white w-full mx-auto px-2 flex items-center flex-col lg:flex-row justify-between gap-2 lg:overflow-hidden overflow-x-auto scroll-smooth scrollbar-hidden">
      <div className="hidden md:flex items-center border-r-2 border-gray-400 pr-4">
        <AmenityItem
          Icon={House}
          label="Your Search"
          isActive
          onClick={() => {}}
        />
      </div>

      <div className="relative w-full lg:overflow-hidden lg:scrollbar-hidden">
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-6 py-2 overflow-x-auto scroll-smooth scrollbar-hidden">
          {amenities.map(({ key, Icon, label }) => (
            <AmenityItem
              key={key}
              Icon={Icon}
              label={label}
              isActive={selectedAmenities.includes(key)}
              onClick={() => toggleAmenity(key)}
            />
          ))}
        </div>
      </div>

      <div className="lg:w-[155px] w-auto items-center gap-4 hidden lg:flex">
        <button
          onClick={() =>
            scrollContainerRef.current &&
            (scrollContainerRef.current.scrollLeft += isAtEnd ? -200 : 200)
          }
          className="bg-[#AA987A] text-white p-2 rounded-full"
          disabled={isAtStart && isAtEnd}
          aria-label={isAtEnd ? "Previous slide" : "Next slide"}>
          {isAtEnd ? <GrFormPrevious size={20} /> : <GrFormNext size={20} />}
        </button>
        <FilterButton />
      </div>
    </div>
  );
};

export default SearchAmenities;
