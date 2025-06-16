export interface Hotel {
  id: string;
  title: string;
  slug: string;
  images: string[];

  location: {
    city: string;
    area: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  details: {
    beds: number;
    bedrooms: number;
    guests: number;
    baths: number;
    rating: number;
    tag: string;
  };
  pricePerNight: number;
  amenities: string[];
}

export interface DubaiHotel {
  hotels: Hotel[];
}

export interface RiyadhHotel {
  hotels: Hotel[];
}
