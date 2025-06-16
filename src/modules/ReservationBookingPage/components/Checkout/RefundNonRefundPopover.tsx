"use client";

import { InfoIcon, CheckCircle, XCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/Popover/Popover";

interface PriceDetailsPopoverProps {
  isRefund: boolean;
}

export default function RefundNonRefundPopover({
  isRefund,
}: PriceDetailsPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="bg-white flex items-center justify-center rounded-full h-4 w-4 text-muted-foreground hover:text-foreground focus:outline-none">
          <InfoIcon className="h-4 w-4 text-black" />
          <span className="sr-only">Cancellation Policy</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[calc(100vw-2rem)] sm:max-w-xl w-full p-4 sm:ml-28 mt-2">
        <h4 className="font-medium text-sm flex items-center gap-1">
          Cancellation Policy <InfoIcon className="h-4 w-4 text-primary" />
        </h4>
        {isRefund ? (
          <ul className="text-sm text-muted-foreground mt-2 space-y-3">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>
                Cancel <strong>30 days</strong> or more before check-in:{" "}
                <strong>Full refund</strong>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>
                {" "}
                Cancel between <strong>7 and 30 days</strong> before check-in:
                <strong> 50% refund</strong>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <span>
                Cancel less than <strong>7 days</strong> before check-in:
                <strong>Non-refundable</strong>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>
                Cancel within <strong>48 hours</strong> of booking (and at least
                14 days before check-in): <strong>Full refund</strong>
              </span>
            </li>
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground mt-2 flex items-start gap-2">
            <XCircle className="h-10 w-12 text-red-500 -mt-2" />
            <span>
              For our <strong>non-refundable rate</strong>, if you cancel,
              modify, or do not show up, the total price of the reservation will
              be charged. Enjoy our lowest rates with this non-refundable
              booking. We appreciate your commitment!
            </span>
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}
