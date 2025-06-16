export interface IGuestCountProps {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface IDateRangeProps {
  from: Date;
  to: Date | undefined;
}

export interface ILocation {
  place_id: string;
  description: string;
}
