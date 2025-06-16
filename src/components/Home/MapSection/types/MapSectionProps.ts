import { Property } from "../../../../types/types";

export interface IMapSectionProps {
  title?: string;
  dubai: string;
  riyadh: string;
  seeFullMap?: string;
  dubaiProperties: Property[];
  riyadhProperties: Property[];
}
