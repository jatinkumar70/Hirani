"use client";
import { CheckCircle, X, XCircle } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./../../components/ui/Dialog/Dialog"; // Adjust path if needed

export function CancellationPolicyDialog({ t }: { t: any }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer bg-transparent border-none p-0 m-0 text-inherit ">
          {t}
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogTitle className="text-xl font-bold">
          Cancellation Policy{" "}
          <DialogClose className="p-1 absolute right-7 top-6 rounded-lg opacity-70 transition-all hover:opacity-100 disabled:pointer-events-none outline-none border-none hover:outline hover:border border-black hover:bg-black/80 hover:text-gray-100 duration-300">
            <X size={20} />
          </DialogClose>
        </DialogTitle>
        <DialogDescription>
          <div className="mt-4 space-y-6">
            {/* Refundable Policy Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                Refundable Policy
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <p className="text-sm">
                    <span className="font-medium">30+ days&apos; notice:</span>{" "}
                    <span className="text-green-600 font-medium">
                      Full refund
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <p className="text-sm">
                    <span className="font-medium">7–29 days&apos; notice:</span>{" "}
                    <span className="text-green-600 font-medium">
                      50% refund
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm">
                    <span className="font-medium">
                      Less than 7 days&apos; notice:
                    </span>{" "}
                    <span className="text-red-600 font-medium">No refund</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <p className="text-sm">
                    <span className="font-medium">
                      Within 48 hours of booking
                    </span>{" "}
                    (and at least 14 days before check-in):{" "}
                    <span className="text-green-600 font-medium">
                      Full refund
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Non-refundable Policy Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                Non-refundable Policy
              </h3>
              <div className="flex items-start gap-2 text-gray-700">
                <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  For our{" "}
                  <span className="font-semibold">non-refundable rate</span>, if
                  you cancel, modify, or do not show up, the total price of the
                  reservation will be charged. Enjoy our lowest rates with this
                  non-refundable booking.
                </p>
              </div>
            </div>
          </div>
        </DialogDescription>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}

export default CancellationPolicyDialog;
