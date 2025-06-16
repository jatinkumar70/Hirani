import { Property } from "../../../types/types";

export interface IPropertySearchViewProps {
  hotelsList: Property[];
  loadingState: boolean;
  propertyRecords: number;
}
