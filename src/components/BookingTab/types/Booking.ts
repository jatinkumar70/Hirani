export interface BookingDetails {
  pricePerNight: number;
  cleaningFee: number;
  taxRate: number;
  maxGuests: number;
}

export interface DateRange {
  checkIn: Date;
  checkOut: Date;
}
