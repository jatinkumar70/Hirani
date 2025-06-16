import { Property } from "../../../../types/types";
import { DubaiHotel, Hotel } from "../../../PropertyListing/types/hotels";

export interface IHotelsSectionProps {
  title?: string;
  description?: string;
  hotelData: Property[];
  citySlug?: string;
  filter: string;
}
