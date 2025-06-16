import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/Dialog/Dialog"; // Update with actual import path
import { X } from "lucide-react";

export function TermsDialog({ t }: { t: any }) {
  return (
    <Dialog>
      {/* Use the DialogTrigger asChild to wrap the Link */}
      <DialogTrigger asChild>
        <button className="cursor-pointer bg-transparent border-none p-0 m-0 text-inherit">
          {t.footer.terms}
        </button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="lg:w-full lg:max-w-5xl">
        <DialogHeader className="lg:pb-5">
          <DialogTitle>
            Things to know
            <DialogClose className="p-1 absolute right-7 top-6 rounded-lg opacity-70 transition-all hover:opacity-100 disabled:pointer-events-none outline-none border-none hover:outline hover:border border-black hover:bg-black/80 hover:text-gray-100 duration-300">
              <X size={20} />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* House rules */}
          <div>
            <h3 className="mb-2 text-base font-semibold">House rules</h3>
            <ul className="space-y-1 text-sm leading-5">
              <li>Check-in after 15:00</li>
              <li>Checkout before 12:00</li>
              <li>2 guests maximum</li>
              <li>No smoking</li>
              <li>Pets allowed</li>
              <li>24-hour concierge</li>
              <li>Drinks taken from the fridge will be charged</li>
              <li>The gaming devices are free to use</li>
              <li>The work station is free to use</li>
            </ul>
          </div>

          {/* Safety & property */}
          <div>
            <h3 className="mb-2 text-base font-semibold">
              Safety &amp; property
            </h3>
            <ul className="space-y-1 text-sm leading-5">
              <li>Carbon monoxide alarm</li>
              <li>Smoke alarm</li>
              <li>Fire extinguisher</li>
            </ul>
          </div>

          {/* Cancellation policy */}
          <div>
            <h3 className="mb-2 text-base font-semibold">
              Cancellation policy
            </h3>
            <p className="mb-2 text-sm leading-5">
              Cancel before 20 Jun for a partial refund. Review the Host’s full
              cancellation policy which applies even if you cancel for illness
              or disruptions caused by COVID-19.
            </p>
            <p className="text-sm leading-5">
              You can cancel up to a week before with the Flexi package. You can
              cancel up to 24 hours before with the WOW! package.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
