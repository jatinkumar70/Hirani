import { Property } from "../../../../types/types";

export interface IMapSectionProps {
  title?: string;
  northernIndia: string;
  northEastIndia: string;
  seeFullMap?: string;
  northernIndiaProperties: Property[];
  northEastIndiaProperties: Property[];
}
