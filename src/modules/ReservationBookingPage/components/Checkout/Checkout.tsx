"use client";

import type React from "react";

import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { DateRangeSlider } from "../../../../components/ui/DateRangeSlider/DateRangeSlider";
import FloatingWhatsAppButton from "../../../../components/whatsapp/FloatingWhatsAppButton ";
import {
  fetchChargesBreakup,
  fetchInventory,
} from "../../../../lib/Booking/fetchApi";
import type { IInventoryPrice, Property } from "../../../../types/types";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../../../../utils/toaster/toast";
import { DetailBox } from "../DetailBox/DetailBox";
import { CheckoutForm } from "./CheckoutForm";
import { PromoCode } from "./PromoCode";
import { TripDetails } from "./TripDetails";
interface CheckoutProps {
  data: Property;
}

export const Checkout: React.FC<CheckoutProps> = (props) => {
  const { data } = props;

  const router = useRouter();
  const isFetching = useRef<boolean>(false);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isGuestEditing, setIsGuestEditing] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dailyPrice, setDailyPrice] = useState<IInventoryPrice[] | null>(null);
  const [priceBreakup, setPriceBreakup] = useState<any | null>(null);
  const [roomAvailability, setRoomAvailability] = useState<
    IInventoryPrice[] | null
  >(null);
  const [isRefundable, setIsRefundable] = useState<boolean>(false);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [isVoucherValid, setIsVoucherValid] = useState<boolean>(false);
  const [isApplyingVoucher, setIsApplyingVoucher] = useState<boolean>(false);
  const [guests, setGuests] = useState({
    adults: 2,
    kids: 0,
    infants: 0,
    pets: 0,
  });
  const prevDatesRef = useRef({ startDate: "", endDate: "" });
  const prevGuestCountRef = useRef("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("previousBookingUrl", window.location.href);
    }
  }, []); // Runs only once when the component mounts

  // Initialize dates from URL params
  useEffect(() => {
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");
    const guestsParam = searchParams.get("numberOfGuestCount");

    if (startDateParam) setStartDate(new Date(startDateParam));
    if (endDateParam) setEndDate(new Date(endDateParam));

    if (guestsParam) {
      const guestPattern =
        /(\d+)\s*adults?|(\d+)\s*kids?|(\d+)\s*infants?|(\d+)\s*pets?/gi;
      const parsedGuests = { adults: 1, kids: 0, infants: 0, pets: 0 };

      const matches = Array.from(guestsParam.matchAll(guestPattern));
      matches.forEach((match) => {
        if (match[1]) parsedGuests.adults = Number.parseInt(match[1], 10);
        if (match[2]) parsedGuests.kids = Number.parseInt(match[2], 10);
        if (match[3]) parsedGuests.infants = Number.parseInt(match[3], 10);
        if (match[4]) parsedGuests.pets = Number.parseInt(match[4], 10);
      });

      setGuests(parsedGuests);
    }

    setIsLoading(false);
  }, [searchParams]);

  // Function to apply a voucher code
  const applyVoucherCode = useCallback(
    async (code: string) => {
      if (!data?.property_details_uuid || !startDate || !endDate) return;

      // Skip API call if booking_request is 1
      if (data.booking_request === 1) {
        showInfoToast("Booking requests are currently disabled");
        return null;
      }

      setIsApplyingVoucher(true);

      try {
        const chargesData = await fetchChargesBreakup({
          propertyId: data.property_details_uuid,
          fromDate: format(startDate, "yyyy-MM-dd"),
          toDate: format(endDate, "yyyy-MM-dd"),
          pets: guests.pets,
          voucherCode: code,
          refundable: isRefundable,
        });

        if (chargesData.is_valid_voucher) {
          setPriceBreakup({
            ...chargesData.after_discount,
            discount: chargesData.discount,
          });
        } else {
          setPriceBreakup(chargesData.before_discount);
        }
        if (chargesData.is_valid_voucher) {
          showSuccessToast(`Discount applied with code: ${code}`);
          setIsVoucherValid(true);
          setVoucherCode(code);
        } else {
          showErrorToast("Invalid voucher code");
          setIsVoucherValid(false);
        }

        return chargesData;
      } catch (error: any) {
        showErrorToast(error.message || "Failed to apply voucher code");
        return null;
      } finally {
        setIsApplyingVoucher(false);
      }
    },
    [startDate, endDate, guests.pets, isRefundable, data?.property_details_uuid]
  );

  // Handle removing voucher code
  const handleRemoveVoucher = useCallback(() => {
    setVoucherCode("");
    setIsVoucherValid(false);
    showInfoToast("Your promo code has been removed");
  }, []);

  // Fetch inventory and initial price breakup when dates or property changes
  useEffect(() => {
    if (!data?.property_details_uuid || !startDate || !endDate) return;

    const fetchData = async () => {
      // Skip API calls if booking_request is 1
      if (data.booking_request === 1) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch inventory data for the entire year
        const currentYear = new Date().getFullYear();
        const yearStart = new Date(currentYear, 0, 1);
        const yearEnd = new Date(currentYear, 11, 31);

        // Fetch both inventory and price breakup in parallel
        const [inventoryData, chargesData] = await Promise.all([
          fetchInventory({
            propertyId: data.property_details_uuid,
            fromDate: format(yearStart, "yyyy-MM-dd"),
            toDate: format(yearEnd, "yyyy-MM-dd"),
          }),
          fetchChargesBreakup({
            propertyId: data.property_details_uuid,
            fromDate: format(startDate, "yyyy-MM-dd"),
            toDate: format(endDate, "yyyy-MM-dd"),
            pets: guests.pets,
            voucherCode: isVoucherValid ? voucherCode : undefined,
            refundable: isRefundable,
          }),
        ]);

        setDailyPrice(inventoryData);
        setRoomAvailability(inventoryData);

        // Update price breakup based on voucher validity
        if (chargesData.is_valid_voucher) {
          setPriceBreakup({
            ...chargesData.after_discount,
            discount: chargesData.discount,
          });
        } else {
          setPriceBreakup(chargesData.before_discount);
        }

        // Update voucher validity if a voucher code is being used
        if (voucherCode) {
          setIsVoucherValid(chargesData.is_valid_voucher);
        }
      } catch (error: any) {
        if (error.message === "This property is not pet-friendly") {
          showErrorToast("This property does not allow pets.");
          setGuests((prev) => ({ ...prev, pets: 0 }));
        } else {
          showErrorToast(error.message || "Failed to fetch data");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    startDate,
    endDate,
    guests.pets,
    isRefundable,
    data?.property_details_uuid,
    voucherCode,
    isVoucherValid,
  ]);

  const formattedGuestCount = () => {
    const parts = [];
    if (guests.adults > 0)
      parts.push(`${guests.adults} adult${guests.adults > 1 ? "s" : ""}`);
    if (guests.kids > 0)
      parts.push(`${guests.kids} kid${guests.kids > 1 ? "s" : ""}`);
    if (guests.infants > 0)
      parts.push(`${guests.infants} infant${guests.infants > 1 ? "s" : ""}`);
    if (guests.pets > 0)
      parts.push(`${guests.pets} pet${guests.pets > 1 ? "s" : ""}`);
    return parts.join(", ");
  };

  const dateValue =
    startDate && endDate
      ? `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`
      : "Select dates";

  useEffect(() => {
    if (startDate && endDate) {
      const formattedStartDate = format(startDate, "yyyy-MM-dd");
      const formattedEndDate = format(endDate, "yyyy-MM-dd");

      // Prevent unnecessary URL updates
      if (
        prevDatesRef.current.startDate === formattedStartDate &&
        prevDatesRef.current.endDate === formattedEndDate
      ) {
        return;
      }

      prevDatesRef.current = {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };

      const currentQuery = { ...router.query };
      currentQuery.startDate = formattedStartDate;
      currentQuery.endDate = formattedEndDate;

      router.replace(
        {
          pathname: router.pathname,
          query: currentQuery,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [startDate, endDate, router]); // Runs when date changes

  useEffect(() => {
    const formattedGuestCountStr = formattedGuestCount(); // Get formatted guest count

    // Prevent unnecessary URL updates
    if (prevGuestCountRef.current === formattedGuestCountStr) {
      return;
    }

    prevGuestCountRef.current = formattedGuestCountStr; // Update ref to track last state

    const currentQuery = { ...router.query };
    currentQuery.numberOfGuestCount = formattedGuestCountStr;

    router.replace(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      { shallow: true }
    );
  }, [guests, router]);

  if (!data) {
    return (
      <div className="container flex justify-center p-4 items-center min-h-screen mx-auto">
        <div className="text-lg animate-pulse">Loading property details...</div>
      </div>
    );
  }

  return (
    <div className="container min-h-screen mx-auto">
      <h1 className="text-2xl text-gray-800 font-semibold mb-6">Checkout</h1>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-8">
        {/* Left Column */}
        <div className="order-2 text-gray-800 w-full lg:order-1 lg:w-1/2 space-y-6">
          {/* <PriceMatch /> */}

          <TripDetails
            dateValue={dateValue}
            guestCount={formattedGuestCount()}
            onEditDates={() => setIsCalendarOpen(true)}
            onEditGuests={() => setIsGuestEditing((prev) => !prev)}
            isGuestEditing={isGuestEditing}
            guests={guests}
            setGuests={setGuests}
            onClose={() => setIsGuestEditing(false)}
            isRefundable={isRefundable} // Default: false
            setIsRefundable={setIsRefundable} // Function to update it
            onRequest={data.booking_request === 1}
          />

          {data?.booking_request !== 1 && (
            <PromoCode
              isApplying={isApplyingVoucher}
              isApplied={isVoucherValid}
              voucherCode={voucherCode}
              onApplyVoucher={(code) => applyVoucherCode(code)}
              onRemoveVoucher={handleRemoveVoucher}
            />
          )}

          <CheckoutForm
            propertyId={data.property_details_uuid}
            propertyName={data.title}
            startDate={startDate}
            endDate={endDate}
            guests={guests}
            priceBreakup={priceBreakup}
            currency={data.currency || "AED"}
            voucherCode={voucherCode}
            onRequest={data.booking_request === 1}
            onRequestPrice={
              data.non_refundable_price ? data.non_refundable_price : 0
            }
            onRequestPropertySlug={data.slug}
          />
        </div>

        {/* Right Column */}
        <div className="order-2 w-full hidden lg:block lg:w-2/5 relative">
          <div className="sticky top-[160px]">
            <DetailBox
              isRefundable={isRefundable}
              bookDetails={data}
              priceBreakup={priceBreakup}
              loading={isLoading}
            />
          </div>
        </div>

        {/* Mobile Detail Box */}
        <div className="order-1 w-full block lg:hidden lg:mt-0 lg:w-1/2 my-0 relative">
          <DetailBox
            isRefundable={isRefundable}
            bookDetails={data}
            priceBreakup={priceBreakup}
            loading={isLoading}
          />
        </div>
      </div>

      {/* Date Picker Modal */}
      {isCalendarOpen && (
        <div className="flex bg-black bg-opacity-50 justify-center fixed inset-0 items-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-800 text-lg font-bold">Select Dates</h2>
              <button
                onClick={() => setIsCalendarOpen(false)}
                className="text-gray-700 focus:outline-none hover:text-gray-900">
                Close
              </button>
            </div>
            <DateRangeSlider
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
              isOpen={true}
              onOpenChange={setIsCalendarOpen}
              showPrices={true}
              dailyPrice={dailyPrice}
              roomAvailability={roomAvailability}
            />
          </div>
        </div>
      )}

      <FloatingWhatsAppButton />
    </div>
  );
};
