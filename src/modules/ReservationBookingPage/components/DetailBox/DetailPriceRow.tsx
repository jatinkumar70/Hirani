import { Tag } from "lucide-react";
import { Badge } from "../../../../components/ui/Badge/Badge";
import { formatNumberWithCommas } from "../../../../constants/constants";
import PriceDetailsPopover from "../../../../components/BookingTab/PricePopover";
import { Skeleton } from "../../../../components/ui/skeleton/skeleton";

export const DetailPriceRow = ({
  label,
  amount,
  currency,
  originalAmount = null,
  discount = null,
  loading = false,
  nights = null,
  showPopover = false,
  priceBreakup,
}: {
  label: string;
  amount: number;
  currency: string;
  originalAmount?: any;
  discount?: any;
  loading?: boolean;
  nights?: number | null;
  showPopover?: boolean;
  priceBreakup: any;
}) => {
  if (loading) {
    return (
      <div className="flex w-full justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
      </div>
    );
  }

  // Check if any of the tax labels have discounts
  const taxLabels = [
    "damage_waiver",
    "tourism_fee",
    "service_fee",
    "pet_charges",
    "vat",
  ];
  const hasTaxDiscount =
    priceBreakup?.discount &&
    taxLabels.some((taxLabel) => priceBreakup?.discount[taxLabel]);

  // If we have a tax discount, use the original total tax amount
  const totalTaxDiscount = hasTaxDiscount
    ? taxLabels.reduce(
        (total, label) => total + (priceBreakup?.discount?.[label] || 0),
        0
      )
    : 0;

  const discountedTaxAmount = priceBreakup?.total_breakup_tax || 0;

  const originalTaxAmount = hasTaxDiscount
    ? discountedTaxAmount + totalTaxDiscount
    : null;
  // For "Taxes & fees" label, we need special handling
  const isTaxesAndFees = label === "Taxes & fees";

  // Use the provided discount or the tax discount if this is the taxes and fees row
  const displayDiscount = isTaxesAndFees && hasTaxDiscount ? true : discount;

  // Use the provided original amount or the original tax amount if this is the taxes and fees row
  const displayOriginalAmount =
    isTaxesAndFees && hasTaxDiscount ? originalTaxAmount : originalAmount;

  return (
    <div className="flex justify-between">
      <div className="flex">
        <span className="decoration-gray-400 mr-2 underline">
          {label}
          {nights && ` × ${nights} nights`}
          {showPopover && (
            <PriceDetailsPopover
              bookingPriceBreakup={priceBreakup}
              currency={currency}
              text={"Tax Details"}
              showTax={true}
              description={
                "From expert care of your home-away-from-home to guest assistance and comprehensive damage protection — everything is thoughtfully included. Taxes, fees, and VAT are all taken care of, so you don't have to worry."
              }
            />
          )}
        </span>

        {displayDiscount && (
          <div className="group relative mr-2">
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1 px-2 py-1">
              <Tag size={14} />
              <span className="text-xs">Promo applied</span>
            </Badge>
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs rounded p-2 w-auto z-10 transition-all duration-300">
              Discount: {currency}{" "}
              {formatNumberWithCommas(
                typeof displayDiscount === "boolean"
                  ? taxLabels.reduce(
                      (total, label) =>
                        total + (priceBreakup?.discount?.[label] || 0),
                      0
                    )
                  : displayDiscount
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <span className="font-medium flex flex-col items-center">
          {displayOriginalAmount && (
            <span className="line-through text-gray-500 text-sm">
              {currency} {formatNumberWithCommas(displayOriginalAmount)}
            </span>
          )}
          {currency} {formatNumberWithCommas(amount)}
        </span>
      </div>
    </div>
  );
};
