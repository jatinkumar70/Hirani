import { formatNumberWithCommas } from "../../constants/constants";
import type { IPriceBreakup } from "../../types/types";
import { Skeleton } from "../ui/skeleton/skeleton";
import PriceDetailsPopover from "./PricePopover";

interface PriceBreakdownProps {
  isLoading: boolean;
  bookingPriceBreakup: IPriceBreakup | null;
  currency: string;
  soldOut?: boolean;
}

export default function PriceBreakdown({
  isLoading,
  bookingPriceBreakup,
  currency,
  soldOut,
}: PriceBreakdownProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
        ))}
        <div className="flex justify-between pt-3 border-t">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    );
  }

  if (
    !bookingPriceBreakup ||
    bookingPriceBreakup.total_nights <= 0 ||
    soldOut
  ) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="underline decoration-gray-400 mr-2">
          {formatNumberWithCommas(bookingPriceBreakup.breakup_per_night_price)}{" "}
          × {bookingPriceBreakup.total_nights} nights
          {/* <PriceDetailsPopover
            bookingPriceBreakup={bookingPriceBreakup}
            currency={currency}
            text={"Price Details per night"}
            showTax={false}
          /> */}
        </span>
        <span className="font-medium">
          {currency}{" "}
          {formatNumberWithCommas(bookingPriceBreakup.accommodation_fee)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="underline decoration-gray-400">Cleaning fee</span>
        <span className="font-medium">
          {currency} {formatNumberWithCommas(bookingPriceBreakup.cleaning_fee)}
        </span>
      </div>
      {/* <div className="flex justify-between">
        <span className="underline decoration-gray-400">Pet fee</span>
        <span className="font-medium">
          {currency} {formatNumberWithCommas(bookingPriceBreakup.pet_charges)}
        </span>
      </div> */}
      <div className="flex justify-between">
        <span className="underline decoration-gray-400">
          Taxes & fees{" "}
          <PriceDetailsPopover
            bookingPriceBreakup={bookingPriceBreakup}
            currency={currency}
            text={"Taxes & fees"}
            description={
              "From expert care of your home-away-from-home to guest assistance and comprehensive damage protection — everything is thoughtfully included. Taxes, fees, and VAT are all taken care of, so you don’t have to worry."
            }
            showTax={true}
          />
        </span>
        <span className="font-medium">
          {currency}{" "}
          {formatNumberWithCommas(bookingPriceBreakup.total_breakup_tax || 0)}
        </span>
      </div>

      {/* Total Price */}
      <div className="flex justify-between pt-3 border-t font-bold">
        <span>Total</span>
        <span className="font-medium">
          {currency} {formatNumberWithCommas(bookingPriceBreakup.total)}
        </span>
      </div>
    </div>
  );
}
