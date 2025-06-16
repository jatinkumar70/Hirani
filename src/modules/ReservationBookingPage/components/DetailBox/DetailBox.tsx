"use client";

import { motion } from "framer-motion";
import { Award, Star, Tag } from "lucide-react";
import { useMemo } from "react";
import { Skeleton } from "../../../../components/ui/skeleton/skeleton";
import { formatNumberWithCommas } from "../../../../constants/constants";
import type { Property } from "../../../../types/types";
import { DetailImageBox } from "./DetailImageBox";
import { DetailPriceRow } from "./DetailPriceRow";

export const DetailBox = ({
  bookDetails,
  priceBreakup,
  loading,
  isRefundable,
}: {
  bookDetails: Property;
  priceBreakup: any;
  loading: boolean;
  isRefundable: boolean;
}) => {
  const formattedTitle = useMemo(() => {
    return bookDetails.title.includes("|")
      ? bookDetails.title.split("|")[1].trim()
      : bookDetails.title;
  }, [bookDetails.title]);

  const { hasPromoCode, getOriginalPrice } = useMemo(() => {
    // Check if promo code is applied
    const hasPromo =
      priceBreakup?.discount && Object.keys(priceBreakup.discount).length > 0;

    // Get original prices when discount is applied
    const getOriginal = (key: string) => {
      if (!hasPromo || !priceBreakup.discount[key]) return null;
      // Return the current price plus the discount amount
      return priceBreakup[key] + priceBreakup.discount[key];
    };

    return { hasPromoCode: hasPromo, getOriginalPrice: getOriginal };
  }, [priceBreakup]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white border border-black/20 h-auto p-4 rounded-2xl shadow-sm w-full lg:max-w-none max-w-lg mx-auto sm:p-6">
      <div className="space-y-4">
        {/* Image & Title Section */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="h-20 w-20 mx-auto relative sm:h-24 sm:mx-0 sm:w-24">
            <DetailImageBox
              images={bookDetails.images}
              title={bookDetails.title}
            />
          </div>
          <div className="flex-1 text-center gap-2 sm:text-left space-y-1">
            <h2 className="text-gray-800 text-xs font-medium lg:text-lg sm:text-base">
              {formattedTitle}
            </h2>

            {/* Ratings & Host Status */}
            <div className="flex justify-center gap-2 items-center mt-1 sm:justify-start">
              <div className="flex gap-1 items-center">
                <Star size={16} className="text-amber-500" />
                <span className="text-xs font-medium sm:text-sm">
                  {bookDetails.details.rating}
                </span>
                <span className="text-gray-500 text-xs">(61 reviews)</span>
              </div>
              <div className="bg-black h-1 rounded-full w-1 hidden mx-2 sm:block"></div>
              <div className="flex gap-1 items-center">
                <Award size={16} className="text-blue-600" />
                <span className="text-xs font-semibold sm:text-sm">
                  {bookDetails.details.tag}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Details */}
        {bookDetails.booking_request === 1 ? null : (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <h3 className="text-sm font-medium sm:text-base">
                Price details
              </h3>
            </div>

            <div className="sm:space-y-4 space-y-2">
              <div className="space-y-3">
                <DetailPriceRow
                  priceBreakup={priceBreakup}
                  label={formatNumberWithCommas(
                    priceBreakup?.breakup_per_night_price || 0
                  )}
                  amount={priceBreakup?.accommodation_fee || 0}
                  currency={bookDetails.currency}
                  originalAmount={
                    hasPromoCode ? getOriginalPrice("accommodation_fee") : null
                  }
                  discount={
                    hasPromoCode
                      ? priceBreakup?.discount?.accommodation_fee
                      : null
                  }
                  loading={
                    loading || !priceBreakup || priceBreakup.total_nights === 0
                  }
                  nights={priceBreakup?.total_nights}
                />

                <DetailPriceRow
                  priceBreakup={priceBreakup}
                  label="Cleaning fee"
                  amount={priceBreakup?.cleaning_fee || 0}
                  currency={bookDetails.currency}
                  originalAmount={
                    hasPromoCode ? getOriginalPrice("cleaning_fee") : null
                  }
                  discount={
                    hasPromoCode ? priceBreakup?.discount?.cleaning_fee : null
                  }
                  loading={
                    loading || !priceBreakup || priceBreakup.total_nights === 0
                  }
                />

                <DetailPriceRow
                  priceBreakup={priceBreakup}
                  label="Taxes & fees"
                  amount={priceBreakup?.total_breakup_tax || 0}
                  currency={bookDetails.currency}
                  loading={
                    loading || !priceBreakup || priceBreakup.total_nights === 0
                  }
                  showPopover={true}
                />

                <div className="flex border-t justify-between font-bold pt-3">
                  {loading ||
                  !priceBreakup ||
                  priceBreakup.total_nights === 0 ? (
                    <div className="w-full flex justify-between pt-3 border-t">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  ) : (
                    <>
                      <span>Total</span>
                      <span className="font-medium">
                        {bookDetails.currency}{" "}
                        {formatNumberWithCommas(priceBreakup.total)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-gray-900 text-xs sm:text-sm">
                All taxes are included. There won&apos;t be extra charges later
                on.
              </p>
              {hasPromoCode && (
                <p className="text-green-600 text-xs sm:text-sm font-medium flex items-center gap-1">
                  <Tag size={14} />
                  Promo code applied successfully! Hover over badge to see your
                  savings.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
