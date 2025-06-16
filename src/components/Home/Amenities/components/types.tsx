export interface FiltersProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onFiltersChange: (filters: FilterState) => void
    totalPlaces?: number
    
  }
  
  export interface FilterState {
    priceRange: {
      min: number
      max: number
    }
    bedrooms: string;
    beds: string;               
    bathrooms: string;          
    amenities: string[];
  }