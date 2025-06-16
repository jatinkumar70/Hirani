// Define your FilterState type
export interface FilterState {
  priceRange: { min: number; max: number };
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  // placeType: string | null; // adjust based on your actual usage
}

export interface FiltersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFiltersChange: (filters: FilterState) => void;
  totalPlaces?: number | string;
  isLoading: boolean;
  amenitiesCategory: MasterAmenitiesProps[];
  initialFilters?: FilterState;
}

export interface Amenity {
  master_amenities_uuid: string;
  name: string;
  code: string;
  icon: string;
  category: string;
}

export interface MasterAmenitiesProps {
  category: string;
  amenities: Amenity[];
}
