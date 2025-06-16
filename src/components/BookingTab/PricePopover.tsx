"use client";

import { InfoIcon } from "lucide-react";
import { formatNumberWithCommas } from "../../constants/constants";
import type { IPriceBreakup } from "../../types/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover/Popover";

interface PriceDetailsPopoverProps {
  bookingPriceBreakup: IPriceBreakup;
  currency: string;
  text: string;
  showTax: boolean;
  description: string;
}

export default function PriceDetailsPopover({
  bookingPriceBreakup,
  currency,
  text,
  showTax,
  description,
}: PriceDetailsPopoverProps) {
  //* Calculate Vat

  const fees =
    showTax === false
      ? [
          {
            label: `${bookingPriceBreakup?.breakup_per_night_price || 0} * ${
              bookingPriceBreakup?.total_nights || 0
            } per night`,
            value: bookingPriceBreakup?.accommodation_fee || 0,
          },
        ]
      : [
          {
            label: "Damage Waiver",
            value: bookingPriceBreakup?.damage_waiver || 0,
          },
          {
            label: "Tourism Fee",
            value: bookingPriceBreakup?.tourism_fee || 0,
          },
          {
            label: "Pet Fee",
            value: bookingPriceBreakup?.pet_charges || 0,
          },
          {
            label: "Service Fee",
            value: formatNumberWithCommas(bookingPriceBreakup?.service_fee),
          },
          {
            label: "VAT",
            value: formatNumberWithCommas(bookingPriceBreakup?.vat || 0),
          },
        ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="bg-white inline-flex items-center justify-center rounded-full h-6 w-6 text-muted-foreground hover:text-foreground focus:outline-none ml-1 touch-manipulation">
          <InfoIcon className="h-3 w-3 text-black" />
          <span className="sr-only">{text}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-4 z-[9999] relative bg-white shadow-lg rounded-lg border border-gray-200 focus:outline-none">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-sm">{text}</h4>
          </div>
          <span className="font-normal text-[13px]">{description}</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
