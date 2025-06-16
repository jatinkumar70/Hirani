"use client";

import {
  Anvil,
  Baby,
  Bed,
  BellRing,
  BrushIcon as Broom,
  Calendar,
  Car,
  RockingChairIcon as ChairIcon,
  Coffee,
  CookingPot,
  DoorOpen,
  Droplet,
  Dumbbell,
  Flame,
  GlassWater,
  HeartPulse,
  Laptop,
  LayoutIcon,
  Lock,
  Microwave,
  MicIcon as MixerIcon,
  Moon,
  PawPrint,
  PillIcon as Pillow,
  Refrigerator,
  Shirt,
  ShowerHead,
  Snowflake,
  Sofa,
  SprayCan,
  Square,
  TableIcon,
  Thermometer,
  Tv,
  Umbrella,
  Users,
  Utensils,
  WashingMachine,
  WavesIcon,
  Wifi,
  X,
} from "lucide-react";
import { useState } from "react";
import { FaKitchenSet } from "react-icons/fa6";
import { GiGasStove } from "react-icons/gi";
import { Button } from "../../../../components/ui/Button/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "../../../../components/ui/Dialog/Dialog";
import { MasterAmenitiesProps } from "../../../../components/FilterModal/types";
import {
  AmenityGroup,
  AmenityIcon,
} from "../../../../components/Core/AmenityIcon/AmenityIcon";
// Map amenities to their respective icons
export const getAmenityIcon = (amenityCode: string, iconName?: string) => {
  // If icon name is provided from API, use it to determine the icon
  if (iconName) {
    // Map FontAwesome or custom icon names to Lucide icons
    const iconNameMap: Record<string, JSX.Element> = {
      "fa-elevator": <DoorOpen size={20} />,
      "fa-door-open": <DoorOpen size={20} />,
      "fa-swimming-pool": <WavesIcon size={20} />,
      gym: <Dumbbell size={20} />,
      "fa-hair-dryer": <SprayCan size={20} />,
      laundry: <Shirt size={20} />,
      "fa-iron": <Anvil size={20} />,
      "fa-bed": <Bed size={20} />,
      "shop-shampoo": <ShowerHead size={20} />,
      "fa-door-closed": <DoorOpen size={20} />,
      "fa-lock": <Lock size={20} />,
      "fa-paw": <PawPrint size={20} />,
      "fa-fire-extinguisher": <Flame size={20} />,
      "fa-first-aid": <HeartPulse size={20} />,
      "fa-bell-exclamation": <BellRing size={20} />,
      "fa-skull-crossbones": <BellRing size={20} />,
      "fa-table-tennis": <TableIcon size={20} />,
      "fa-table": <TableIcon size={20} />,
      tv: <Tv size={20} />,
      "fa-chair": <ChairIcon size={20} />,
      wifi: <Wifi size={20} />,
      "cooking-pot": <CookingPot size={20} />,
      refrigerator: <Refrigerator size={20} />,
      "fa-coffee": <Coffee size={20} />,
      microwave: <Microwave size={20} />,
      "fa-fire": <Flame size={20} />,
      "fa-utensils": <Utensils size={20} />,
      "fa-oven": <Flame size={20} />,
      "fa-bread-slice": <Flame size={20} />,
      "fa-calendar-alt": <Calendar size={20} />,
      snowflake: <Snowflake size={20} />,
    };

    return iconNameMap[iconName] || <Users size={20} />;
  }

  // Fallback to code-based icon mapping (for backward compatibility)
  const iconMap: Record<string, JSX.Element> = {
    WIFI: <Wifi size={20} />,
    AIR_CONDITIONING: <Snowflake size={20} />,
    TV: <Tv size={20} />,
    WASHER: <WashingMachine size={20} />,
    IRON_BOARD: <Anvil size={20} />,
    HAIR_DRYER: <SprayCan size={20} />,
    MICROWAVE: <Microwave size={20} />,
    REFRIGERATOR: <Refrigerator size={20} />,
    COFFEE: <Coffee size={20} />,
    COFFEE_MAKER: <Coffee size={20} />,
    KITCHEN: <CookingPot size={20} />,
    LINENS: <Bed size={20} />,
    SHOWER_GEL: <ShowerHead size={20} />,
    SHAMPOO: <ShowerHead size={20} />,
    CONDITIONER: <ShowerHead size={20} />,
    PARKING: <Car size={20} />,
    ELEVATOR: <DoorOpen size={20} />,
    POOL: <WavesIcon size={20} />,
    FITNESS_CENTER: <Dumbbell size={20} />,
    GYM: <Dumbbell size={20} />,
    HIGHCHAIR: <ChairIcon size={20} />,
    SAFE: <Lock size={20} />,
    ROOM_DARKENING_SHADES: <Moon size={20} />,
    OUTDOOR_FURNITURE: <Umbrella size={20} />,
    SMOKE_DETECTOR: <BellRing size={20} />,
    GLASSES_WINE: <GlassWater size={20} />,
    CLEANING_PRODUCTS: <SprayCan size={20} />,
    CO_DETECTOR: <BellRing size={20} />,
    KETTLE: <FaKitchenSet size={20} />,
    CLOSET: <Square size={20} />,
    HOT_TUB: <Thermometer size={20} />,
    BABYSITTER_RECOMMENDATIONS: <Baby size={20} />,
    BALCONY: <LayoutIcon size={20} />,
    LIVING_ROOM: <Sofa size={20} />,
    DINING_TABLE: <TableIcon size={20} />,
    SUN_CHAIRS: <Umbrella size={20} />,
    PRIVATE_ENTRANCE: <DoorOpen size={20} />,
    FIRE_EXTINGUISHER: <Flame size={20} />,
    BLENDER: <MixerIcon size={20} />,
    CLEANING_BEFORE_CHECKOUT: <Broom size={20} />,
    EXTRA_PILLOWS_BLANKETS: <Pillow size={20} />,
    DISHWASHER: <Droplet size={20} />,
    LAPTOP_FRIENDLY: <Laptop size={20} />,
    TOASTER: <Flame size={20} />,
    FIRST_AID_KIT: <HeartPulse size={20} />,
    OUTDOOR_DINING_AREA: <Umbrella size={20} />,
    OVEN: <Microwave size={20} />,
    BED_CRIB: <Baby size={20} />,
    STOVE: <GiGasStove size={20} />,

    CLOTHES_DRYINGRACK: <Shirt size={20} />,
    WATER_HOT: <Droplet size={20} />,
    DISHES_UTENSILS: <Utensils size={20} />,
    HANGERS: <Shirt size={20} />,
    LONG_TERM_RENTERS: <Calendar size={20} />,
    BEDROOM: <Bed size={20} />,
    BED_QUEEN: <Bed size={20} />,
    BED_SINGLE: <Bed size={20} />,
    BATHROOM_FULL: <ShowerHead size={20} />,
    BEDROOM_LIVING_SLEEPING_COMBO: <Bed size={20} />,
    BED_COUCH: <Sofa size={20} />,
    PETS_CONSIDERED: <PawPrint size={20} />,
  };

  return iconMap[amenityCode] || <Users size={20} />;
};

// Types for the new API response format

interface HotelAmenitiesProps {
  amenities?: MasterAmenitiesProps[];
}

export const PropertyAmenities = ({
  hotelAmenities,
}: {
  hotelAmenities?: HotelAmenitiesProps;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Use the sample data if hotelAmenities is not provided
  const amenitiesData = hotelAmenities?.amenities || [];

  // Count total amenities
  const totalAmenities = amenitiesData.reduce(
    (total, category) => total + category.amenities.length,
    0
  );

  // Get the first 4 categories for the preview display
  const previewCategories = amenitiesData.slice(0, 4);

  return (
    <div className="flex flex-col gap-5 pt-4">
      <span className="text-xl font-semibold">What this place offers</span>

      {/* Preview of amenities by category */}
      <div id="property-amenities" className="flex flex-col gap-6">
        {previewCategories.map((category, categoryIndex) => (
          <AmenityGroup
            key={category.category}
            category={category.category}
            amenities={category.amenities}
            size={24}
          />
        ))}
      </div>

      {/* Show all amenities button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsDialogOpen(true)}
        className="px-4 py-3 border border-black/50 text-sm text-gray-800 font-semibold flex items-center gap-2 text-left w-auto self-start">
        {`Show all ${totalAmenities} amenities`}
      </Button>

      {/* Dialog to show all amenities by category */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogTitle className="text-xl font-semibold mb-6 -mt-2">
            All Amenities
            <DialogClose className="p-1 absolute right-7 top-2 lg:top-4 rounded-lg opacity-70 transition-all hover:opacity-100 disabled:pointer-events-none outline-none border-none hover:outline hover:border border-black hover:bg-black/80 hover:text-gray-100 duration-300">
              <X size={20} />
            </DialogClose>
          </DialogTitle>

          <div className="flex flex-col gap-8">
            {amenitiesData.map((category, categoryIndex) => (
              <AmenityGroup
                key={category.category}
                category={category.category}
                amenities={category.amenities}
                size={24}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
