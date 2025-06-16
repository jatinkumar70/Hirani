"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../components/ui/Button/Button";
import RefundNonRefundPopover from "./RefundNonRefundPopover";
import { Check } from "lucide-react";
import { GuestSelector } from "./GuestSelector";
import { on } from "events";

interface TripDetailsProps {
  dateValue: string;
  guestCount: string;
  onEditDates: () => void;
  onEditGuests: () => void;
  isGuestEditing: boolean;
  guests: {
    adults: number;
    kids: number;
    infants: number;
    pets: number;
  };
  setGuests: React.Dispatch<
    React.SetStateAction<{
      adults: number;
      kids: number;
      infants: number;
      pets: number;
    }>
  >;
  onClose: () => void;
  isRefundable: boolean; // Default: false
  setIsRefundable: React.Dispatch<React.SetStateAction<boolean>>;
  onRequest: boolean;
}

export function TripDetails({
  dateValue,
  guestCount,
  onEditDates,
  onEditGuests,
  isGuestEditing,
  guests,
  setGuests,
  onClose,
  isRefundable,
  setIsRefundable,
  onRequest,
}: TripDetailsProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4 lg:mt-0 mt-6 rounded-xl shadow-sm border border-black/20 space-y-4">
        <h2 className="text-lg text-gray-800 font-medium">Your trip</h2>

        {/* Dates Row */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base text-gray-800 font-medium">Dates</h3>
            <p className="text-base text-gray-500">{dateValue}</p>
          </div>
          <span className="cursor-pointer text-sm" onClick={onEditDates}>
            Edit
          </span>
        </div>

        {/* Guests Row */}
        <div className="relative">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base text-gray-800 font-medium">Guests</h3>
              <p className="text-base text-gray-500">{guestCount}</p>
            </div>
            <span className="cursor-pointer text-sm" onClick={onEditGuests}>
              Edit
            </span>
            {isGuestEditing && (
              <GuestSelector
                guests={guests}
                setGuests={setGuests}
                onClose={onClose}
              />
            )}
          </div>
        </div>

        {/* Refundable Option */}
        {!onRequest && (
          <div className="relative flex justify-between items-center">
            <label
              htmlFor="refundable"
              className="flex items-center w-full cursor-pointer">
              <span className="underline decoration-gray-400 mr-1">
                Refundable
              </span>
              <RefundNonRefundPopover isRefund={true} />
              <div className="flex items-center ml-auto">
                <input
                  id="refundable"
                  name="refundable"
                  type="checkbox"
                  checked={isRefundable}
                  onChange={() => setIsRefundable(true)}
                  className="sr-only"
                />
                <div
                  className={`h-5 w-5 border rounded flex items-center justify-center transition-colors ${
                    isRefundable
                      ? "bg-primary-gold border-primary-gold"
                      : "bg-gray-100 border-black/20"
                  }`}>
                  {isRefundable && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
              </div>
            </label>
          </div>
        )}

        {/* Non-Refundable Option (Default Selected) */}
        {!onRequest && (
          <div className="relative flex justify-between items-center">
            <label
              htmlFor="non-refundable"
              className="flex items-center w-full cursor-pointer">
              <span className="underline decoration-gray-400 mr-1">
                Non-refundable
              </span>
              <RefundNonRefundPopover isRefund={false} />
              <div className="flex items-center ml-auto">
                <input
                  id="non-refundable"
                  name="non-refundable"
                  type="checkbox"
                  checked={!isRefundable}
                  onChange={() => setIsRefundable(false)}
                  className="sr-only"
                />
                <div
                  className={`h-5 w-5 border rounded flex items-center justify-center transition-colors ${
                    !isRefundable
                      ? "bg-primary-gold border-primary-gold"
                      : "bg-gray-100 border-black/20"
                  }`}>
                  {!isRefundable && (
                    <Check className="h-3.5 w-3.5 text-white" />
                  )}
                </div>
              </div>
            </label>
          </div>
        )}
      </motion.div>
    </>
  );
}
