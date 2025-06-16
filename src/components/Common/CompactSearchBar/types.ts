export interface LocationDetails {
  placeId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
  longitude: number;
  latitude: number;
  rating: number;
  fullAddress: string;
  addressParts: string[];
}

export interface GuestCounts {
  adult: number;
  kid: number;
  infant: number;
  pet: number;
}
