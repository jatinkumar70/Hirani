"use client";

import type * as React from "react";
import {
  Anchor,
  Anvil,
  Armchair,
  Baby,
  Ban,
  Bath,
  BeanIcon as Beach,
  Bed,
  Bell,
  BellRing,
  BikeIcon as Bicycle,
  Book,
  Briefcase,
  BrushIcon as Broom,
  Building2,
  Calendar,
  Car,
  Check,
  BabyIcon as Child,
  Clock,
  Coffee,
  ConciergeBellIcon as Conciergebell,
  CookingPot,
  CreditCard,
  Dumbbell,
  ComputerIcon as Desktop,
  DoorClosed,
  DoorOpen,
  Droplet,
  Fan,
  Film,
  Flame,
  Gamepad2,
  GlassWater,
  Globe,
  ClubIcon as GolfClub,
  Hammer,
  HeartPulse,
  MountainIcon as Hiking,
  Home,
  DogIcon as Horse,
  IceCream2,
  Laptop,
  LayoutDashboard,
  LifeBuoy,
  Lock,
  Microwave,
  Mountain,
  Music,
  ParkingCircle,
  PawPrint,
  BeanOffIcon as PepperOff,
  Phone,
  PillIcon as Pillow,
  PlaneTakeoff,
  RefreshCcw,
  Refrigerator,
  Shirt,
  Ship,
  ShowerHead,
  SkullIcon as Skateboard,
  Snowflake,
  Sofa,
  SpadeIcon as Spa,
  SprayCan,
  Store,
  Sun,
  LuggageIcon as Suitcase,
  ShowerHeadIcon as SwimmingPool,
  Table,
  TableIcon as TableTennis,
  Thermometer,
  Trees,
  Tv,
  Umbrella,
  Users,
  Utensils,
  Video,
  Warehouse,
  WashingMachine,
  Waves,
  Wifi,
  Wind,
  ShipWheelIcon as Wheelchair,
} from "lucide-react";

export type AmenityIconProps = {
  amenityCode?: string;
  iconName?: string;
  size?: number;
  className?: string;
};

export const AmenityIcon: React.FC<AmenityIconProps> = ({
  amenityCode = "",
  iconName = "",
  size = 20,
  className = "",
}) => {
  // Use either the amenity code or icon name to determine which icon to display
  const code = amenityCode || iconName;

  // Organized by categories for better maintenance
  const livingSpacesIcons: Record<string, JSX.Element> = {
    LIVING_ROOM: <Sofa size={size} className={className} />,
    TELEPHONE: <Phone size={size} className={className} />,
    DECK_PATIO_UNCOVERED: <Sun size={size} className={className} />,
    LANAI_GAZEBO_COVERED: <Umbrella size={size} className={className} />,
    GARDEN: <Trees size={size} className={className} />,
    GRILL: <Flame size={size} className={className} />,
    GAME_ROOM: <Gamepad2 size={size} className={className} />,
    SITTING_AREA: <Armchair size={size} className={className} />,
    VERANDA: <Umbrella size={size} className={className} />,
    ROOF_TERRACE: <Building2 size={size} className={className} />,
    PRIVATE_YARD: <Trees size={size} className={className} />,
    GARAGE: <Warehouse size={size} className={className} />,
    PARKING_INCLUDED: <ParkingCircle size={size} className={className} />,
    PARKING_POSSIBLE: <Car size={size} className={className} />,
    PARKING_PAID: <CreditCard size={size} className={className} />,
    PRIVATE_ENTRANCE: <DoorClosed size={size} className={className} />,
    SAFE: <Lock size={size} className={className} />,
    LOCKERS: <Lock size={size} className={className} />,
    BEACH: <Beach size={size} className={className} />,
    HOT_TUB: <Bath size={size} className={className} />,
    PETS_NOT_ALLOWED: <Ban size={size} className={className} />,
    PETS_CONSIDERED: <PawPrint size={size} className={className} />,
    POOL_CHILDREN: <Child size={size} className={className} />,
    MASSAGE: <Spa size={size} className={className} />,
    SAUNA: <Thermometer size={size} className={className} />,
    POOL_HEATED: <Thermometer size={size} className={className} />,
    POOL_INDOOR: <Home size={size} className={className} />,
    POOL_PRIVATE: <Lock size={size} className={className} />,
  };

  const heatingCoolingIcons: Record<string, JSX.Element> = {
    FIREPLACE: <Flame size={size} className={className} />,
    HEATING: <Thermometer size={size} className={className} />,
    AIR_CONDITIONING: <Snowflake size={size} className={className} />,
    CEILING_FAN: <Fan size={size} className={className} />,
  };

  const outdoorFacilitiesIcons: Record<string, JSX.Element> = {
    WOOD_STOVE: <Flame size={size} className={className} />,
    ELEVATOR: <DoorOpen size={size} className={className} />,
    BALCONY: <DoorOpen size={size} className={className} />,
    POOL: <SwimmingPool size={size} className={className} />,
    GYM: <Dumbbell size={size} className={className} />,
    BASKETBALL_COURT: <LayoutDashboard size={size} className={className} />,
    FISHING: <Anchor size={size} className={className} />,
    HUNTING: <Hammer size={size} className={className} />,
    MOUNTAIN_CLIMBING: <Mountain size={size} className={className} />,
    SAILING: <Anchor size={size} className={className} />,
    SURFING: <Waves size={size} className={className} />,
    WATER_SPORTS_GEAR: <LifeBuoy size={size} className={className} />,
    BICYCLE: <Bicycle size={size} className={className} />,
    FITNESS_ROOM: <Dumbbell size={size} className={className} />,
    ICE_SKATING: <Skateboard size={size} className={className} />,
    MOUNTAINEERING: <Hiking size={size} className={className} />,
    SCUBA_OR_SNORKELING: <SwimmingPool size={size} className={className} />,
    SWIMMING: <SwimmingPool size={size} className={className} />,
    WHITEWATER_RAFTING: <Waves size={size} className={className} />,
    BOAT: <Ship size={size} className={className} />,
    GOLF: <GolfClub size={size} className={className} />,
    JET_SKIING: <Waves size={size} className={className} />,
    PARAGLIDING: <Wind size={size} className={className} />,
    SKIING: <Hiking size={size} className={className} />,
    TENNIS: <TableTennis size={size} className={className} />,
    WIND_SURFING: <Wind size={size} className={className} />,
    CYCLING: <Bicycle size={size} className={className} />,
    KAYAK_CANOE: <Waves size={size} className={className} />,
    PARASAILING: <Wind size={size} className={className} />,
    SKIING_WATER: <Waves size={size} className={className} />,
    TRAMPOLINE: <RefreshCcw size={size} className={className} />,
    CROSS_COUNTRY_SKIING: <Hiking size={size} className={className} />,
    HIKING: <Hiking size={size} className={className} />,
    KAYAKING: <Waves size={size} className={className} />,
    RAFTING: <Waves size={size} className={className} />,
    SNOW_SPORTS_GEAR: <Snowflake size={size} className={className} />,
    TUBING_WATER: <LifeBuoy size={size} className={className} />,
    HORSE_RIDING: <Horse size={size} className={className} />,
    MOUNTAIN_BIKING: <Bicycle size={size} className={className} />,
    ROLLER_BLADING: <Skateboard size={size} className={className} />,
    SNOWBOARDING: <Snowflake size={size} className={className} />,
    WATER_SPORTS: <SwimmingPool size={size} className={className} />,
    ADULTS_ONLY: <Users size={size} className={className} />,
    EQUESTRIAN_EVENTS: <Horse size={size} className={className} />,
  };

  const homeSafetyIcons: Record<string, JSX.Element> = {
    DOORBELL: <Bell size={size} className={className} />,
    FIRE_EXTINGUISHER: <Flame size={size} className={className} />,
    FIRST_AID_KIT: <HeartPulse size={size} className={className} />,
    SMOKE_DETECTOR: <BellRing size={size} className={className} />,
    CO_DETECTOR: <BellRing size={size} className={className} />,
    SAFETY_CARD: <Check size={size} className={className} />,
    LOCK_BEDROOM: <Lock size={size} className={className} />,
    EVENTS_ALLOWED: <Calendar size={size} className={className} />,
    SMOKING_NOT_ALLOWED: <Ban size={size} className={className} />,
    CAR_NECESSARY: <Car size={size} className={className} />,
    INFANTS_NOT_ALLOWED: <Baby size={size} className={className} />,
    DISABLED_ACCESSIBLE: <Wheelchair size={size} className={className} />,
    CAR_RECOMMENDED: <Car size={size} className={className} />,
    WHEELCHAIR_YES: <Wheelchair size={size} className={className} />,
    CAR_NOT_NECESSARY: <Bicycle size={size} className={className} />,
    MINIMUM_AGE_LIMIT: <Users size={size} className={className} />,
    WHEELCHAIR_NO: <Wheelchair size={size} className={className} />,
    CHILDREN_NOT_ALLOWED: <Child size={size} className={className} />,
    SENIOR_ADULTS_ONLY: <Users size={size} className={className} />,
    CHILDREN_WELCOME: <Child size={size} className={className} />,
    SMOKING_ALLOWED: <Flame size={size} className={className} />,
  };

  const bathroomIcons: Record<string, JSX.Element> = {
    BATHROBE: <Bath size={size} className={className} />,
    HAIR_DRYER: <SprayCan size={size} className={className} />,
    TOILETRIES: <SprayCan size={size} className={className} />,
    TOWELS: <Droplet size={size} className={className} />,
  };

  const bedroomLaundryIcons: Record<string, JSX.Element> = {
    SLIPPERS: <Pillow size={size} className={className} />,
    HANGERS: <Shirt size={size} className={className} />,
    IRON_BOARD: <Anvil size={size} className={className} />,
    LINENS: <Bed size={size} className={className} />,
    DRYER: <SprayCan size={size} className={className} />,
    WASHER: <WashingMachine size={size} className={className} />,
  };

  const toiletriesIcons: Record<string, JSX.Element> = {
    SHAMPOO: <ShowerHead size={size} className={className} />,
  };

  const internetOfficeIcons: Record<string, JSX.Element> = {
    BUSINESS_CENTER: <Briefcase size={size} className={className} />,
    DESK: <Desktop size={size} className={className} />,
    LAPTOP_FRIENDLY: <Laptop size={size} className={className} />,
    BOOKS: <Book size={size} className={className} />,
    INTERNET: <Globe size={size} className={className} />,
    WIFI: <Wifi size={size} className={className} />,
  };

  const familyIcons: Record<string, JSX.Element> = {
    DVD: <Film size={size} className={className} />,
    FOOSBALL: <Table size={size} className={className} />,
    GAMES: <Gamepad2 size={size} className={className} />,
    MUSIC_LIBRARY: <Music size={size} className={className} />,
    TABLE_TENNIS: <TableTennis size={size} className={className} />,
    POOL_TABLE: <Table size={size} className={className} />,
    CABLE: <Tv size={size} className={className} />,
    SATELLITE: <Tv size={size} className={className} />,
    STEREO: <Music size={size} className={className} />,
    TV: <Tv size={size} className={className} />,
    TOYS: <Child size={size} className={className} />,
    VIDEO_GAMES: <Gamepad2 size={size} className={className} />,
    VIDEO_LIBRARY: <Film size={size} className={className} />,
    VIDEO_ON_DEMAND: <Video size={size} className={className} />,
    HIGHCHAIR: <Armchair size={size} className={className} />,
  };

  const kitchenDiningIcons: Record<string, JSX.Element> = {
    KITCHEN: <CookingPot size={size} className={className} />,
    FREEZER: <IceCream2 size={size} className={className} />,
    REFRIGERATOR: <Refrigerator size={size} className={className} />,
    DINING_AREA: <Utensils size={size} className={className} />,
    DINING_ROOM: <Utensils size={size} className={className} />,
    KETTLE: <Coffee size={size} className={className} />,
    SPICES: <PepperOff size={size} className={className} />,
    COFFEE_MAKER: <Coffee size={size} className={className} />,
    MICROWAVE: <Microwave size={size} className={className} />,
    STOVE: <Flame size={size} className={className} />,
    DISHES_UTENSILS: <Utensils size={size} className={className} />,
    OVEN: <Microwave size={size} className={className} />,
    TOASTER: <Flame size={size} className={className} />,
    DISHWASHER: <WashingMachine size={size} className={className} />,
  };

  const scenicViewsIcons: Record<string, JSX.Element> = {
    MOUNTAIN_VIEW: <Mountain size={size} className={className} />,
    OCEAN_VIEW: <Waves size={size} className={className} />,
  };

  const servicesIcons: Record<string, JSX.Element> = {
    AIRPORT_SHUTTLE: <PlaneTakeoff size={size} className={className} />,
    CLEANING_POSSIBLE: <Broom size={size} className={className} />,
    SHOP: <Store size={size} className={className} />,
    BAGGAGE_STORAGE: <Suitcase size={size} className={className} />,
    CONCIERGE: <Conciergebell size={size} className={className} />,
    BAR: <GlassWater size={size} className={className} />,
    DOORMAN: <Users size={size} className={className} />,
    CAR_AVAILABLE: <Car size={size} className={className} />,
    RECEPTION: <Conciergebell size={size} className={className} />,
    CHAUFFEUR: <Car size={size} className={className} />,
    RECEPTION_24_HOUR: <Clock size={size} className={className} />,
    CLEANING_INCLUDED: <SprayCan size={size} className={className} />,
    STAFF: <Users size={size} className={className} />,
    LONG_TERM_RENTERS: <Calendar size={size} className={className} />,
  };

  // Additional icon mappings for common icon names
  const iconNameMap: Record<string, JSX.Element> = {
    "fa-elevator": <DoorOpen size={size} className={className} />,
    "fa-door-open": <DoorOpen size={size} className={className} />,
    "fa-swimming-pool": <SwimmingPool size={size} className={className} />,
    gym: <Dumbbell size={size} className={className} />,
    "fa-hair-dryer": <SprayCan size={size} className={className} />,
    laundry: <Shirt size={size} className={className} />,
    "fa-iron": <Anvil size={size} className={className} />,
    "fa-bed": <Bed size={size} className={className} />,
    "shop-shampoo": <ShowerHead size={size} className={className} />,
    "fa-door-closed": <DoorClosed size={size} className={className} />,
    "fa-lock": <Lock size={size} className={className} />,
    "fa-paw": <PawPrint size={size} className={className} />,
    "fa-fire-extinguisher": <Flame size={size} className={className} />,
    "fa-first-aid": <HeartPulse size={size} className={className} />,
    "fa-bell-exclamation": <BellRing size={size} className={className} />,
    "fa-skull-crossbones": <BellRing size={size} className={className} />,
    "fa-table-tennis": <TableTennis size={size} className={className} />,
    "fa-table": <Table size={size} className={className} />,
    tv: <Tv size={size} className={className} />,
    "fa-chair": <Armchair size={size} className={className} />,
    wifi: <Wifi size={size} className={className} />,
    "cooking-pot": <CookingPot size={size} className={className} />,
    refrigerator: <Refrigerator size={size} className={className} />,
    "fa-coffee": <Coffee size={size} className={className} />,
    microwave: <Microwave size={size} className={className} />,
    "fa-fire": <Flame size={size} className={className} />,
    "fa-utensils": <Utensils size={size} className={className} />,
    "fa-oven": <Microwave size={size} className={className} />,
    "fa-bread-slice": <Flame size={size} className={className} />,
    "fa-calendar-alt": <Calendar size={size} className={className} />,
    snowflake: <Snowflake size={size} className={className} />,
    bedroom: <Bed size={size} className={className} />,
    "phone-call": <Phone size={size} className={className} />,
    "fa-sun": <Sun size={size} className={className} />,
    "fa-umbrella": <Umbrella size={size} className={className} />,
    trees: <Trees size={size} className={className} />,
    "fa-fire-grill": <Flame size={size} className={className} />,
    "fa-gamepad": <Gamepad2 size={size} className={className} />,
    armchair: <Armchair size={size} className={className} />,
    "fa-bench-tree": <Trees size={size} className={className} />,
    "fa-city": <Building2 size={size} className={className} />,
    "fa-tree": <Trees size={size} className={className} />,
    "fa-warehouse": <Warehouse size={size} className={className} />,
    "fa-parking": <ParkingCircle size={size} className={className} />,
    "fa-car": <Car size={size} className={className} />,
    "fa-credit-card": <CreditCard size={size} className={className} />,
    "fa-user-shield": <Lock size={size} className={className} />,
    "fa-thermometer-half": <Thermometer size={size} className={className} />,
    "fa-fan": <Fan size={size} className={className} />,
    "fa-fire-alt": <Flame size={size} className={className} />,
    "fa-basketball-ball": <LayoutDashboard size={size} className={className} />,
    "fa-fish": <Anchor size={size} className={className} />,
    "fa-bullseye": <Hammer size={size} className={className} />,
    "fa-mountain": <Mountain size={size} className={className} />,
    "fa-anchor": <Anchor size={size} className={className} />,
    "fa-water": <Waves size={size} className={className} />,
    "fa-life-ring": <LifeBuoy size={size} className={className} />,
    "fa-bicycle": <Bicycle size={size} className={className} />,
    "fa-dumbbell": <Dumbbell size={size} className={className} />,
    "fa-skating": <Skateboard size={size} className={className} />,
    "fa-hiking": <Hiking size={size} className={className} />,
    "fa-swimmer": <SwimmingPool size={size} className={className} />,
    "fa-ship": <Ship size={size} className={className} />,
    "fa-golf-ball": <GolfClub size={size} className={className} />,
    "fa-wind": <Wind size={size} className={className} />,
    "fa-skiing": <Hiking size={size} className={className} />,
    "fa-parachute-box": <Wind size={size} className={className} />,
    "fa-drum": <RefreshCcw size={size} className={className} />,
    "fa-skiing-nordic": <Snowflake size={size} className={className} />,
    "fa-horse": <Horse size={size} className={className} />,
    "fa-snowboarding": <Snowflake size={size} className={className} />,
    "fa-horse-head": <Horse size={size} className={className} />,
    "fa-bell": <Bell size={size} className={className} />,
    "fa-id-card": <Check size={size} className={className} />,
    "fa-calendar-check": <Calendar size={size} className={className} />,
    "fa-ban": <Ban size={size} className={className} />,
    "fa-baby": <Baby size={size} className={className} />,
    "fa-wheelchair": <Wheelchair size={size} className={className} />,
    "fa-user": <Users size={size} className={className} />,
    "fa-child": <Child size={size} className={className} />,
    "fa-smoking": <Flame size={size} className={className} />,
    "fa-bath": <Bath size={size} className={className} />,
    towel: <Droplet size={size} className={className} />,
    "fa-slippers": <Pillow size={size} className={className} />,
    washer: <WashingMachine size={size} className={className} />,
    "hair-dryer": <SprayCan size={size} className={className} />,
    "fa-briefcase": <Briefcase size={size} className={className} />,
    "fa-desktop": <Desktop size={size} className={className} />,
    "fa-laptop": <Laptop size={size} className={className} />,
    "fa-book": <Book size={size} className={className} />,
    globe: <Globe size={size} className={className} />,
    "fa-film": <Film size={size} className={className} />,
    "fa-music": <Music size={size} className={className} />,
    "fa-video": <Video size={size} className={className} />,
    "fa-icicles": <IceCream2 size={size} className={className} />,
    "fa-pepper-hot": <PepperOff size={size} className={className} />,
    "fa-shuttle-van": <PlaneTakeoff size={size} className={className} />,
    "fa-broom": <Broom size={size} className={className} />,
    "fa-store": <Store size={size} className={className} />,
    "fa-suitcase": <Suitcase size={size} className={className} />,
    "fa-concierge-bell": <Conciergebell size={size} className={className} />,
    "fa-glass-cheers": <GlassWater size={size} className={className} />,
    "fa-user-tie": <Users size={size} className={className} />,
    "fa-taxi": <Car size={size} className={className} />,
    "fa-clock": <Clock size={size} className={className} />,
    "fa-spray-can": <SprayCan size={size} className={className} />,
    "fa-users": <Users size={size} className={className} />,
    "fa-toilet-paper": <SprayCan size={size} className={className} />,
    beach: <Beach size={size} className={className} />,
    bath: <Bath size={size} className={className} />,
  };

  const allIcons: Record<string, JSX.Element> = {
    ...livingSpacesIcons,
    ...heatingCoolingIcons,
    ...outdoorFacilitiesIcons,
    ...homeSafetyIcons,
    ...bathroomIcons,
    ...bedroomLaundryIcons,
    ...toiletriesIcons,
    ...internetOfficeIcons,
    ...familyIcons,
    ...kitchenDiningIcons,
    ...scenicViewsIcons,
    ...servicesIcons,
    ...iconNameMap,
  };

  // Default icon if the code is not found
  const defaultIcon = <Check size={size} className={className} />;

  return allIcons[code] || defaultIcon;
};

// Export a component that displays amenities grouped by category
export const AmenityGroup: React.FC<{
  category: string;
  amenities: Array<{
    name: string;
    code: string;
    icon: string;
  }>;
  size?: number;
}> = ({ category, amenities, size = 20 }) => {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg border-b pb-2">{category}</h2>
      <div className="grid grid-cols-2 gap-y-3 gap-x-6">
        {amenities.map((amenity) => (
          <div key={amenity.code} className="flex items-center gap-2 text-base">
            <AmenityIcon amenityCode={amenity.code} size={size} />
            <span className="text-sm">{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
