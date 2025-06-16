"use client";

import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchChargesBreakup, fetchInventory } from "../lib/Booking/fetchApi";
import type { IInventoryPrice } from "../types/types";
import { showErrorToast } from "../utils/toaster/toast";

export function useBookingLogic(HotelData: any) {
  const router = useRouter();
  const { startDate, endDate, adults, kids, infants, pets } = router.query;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startDates, setstartDates] = useState<Date | null>(null);
  const [endDates, setendDates] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dailyPrice, setDailyPrice] = useState<IInventoryPrice[] | null>(null);
  const [roomAvailability, setRoomAvailability] = useState<
    IInventoryPrice[] | null
  >(null);
  const [bookingPriceBreakup, setBookingPriceBreakup] = useState<any | null>(
    null
  );
  const [isRefunable, setIsRefundable] = useState(false);
  let bestPrice = 0;
  let totalPrice = 0;

  if (startDate && endDate && dailyPrice) {
    //@ts-ignore
    const fromDatePrice = dailyPrice[startDate]?.[0]?.non_refundable_price || 0;
    //@ts-ignore
    const toDatePrice = dailyPrice[endDate]?.[0]?.non_refundable_price || 0;

    totalPrice = fromDatePrice + toDatePrice;
    bestPrice = fromDatePrice;
  }

  const [guestCounts, setGuestCounts] = useState({
    adults: Number(adults) || 2,
    kids: Number(kids) || 0,
    infants: Number(infants) || 0,
    pets: Number(pets) || 0,
  });

  useEffect(() => {
    if (startDate && endDate) {
      const parsedstartDates = new Date(startDate as string);
      const parsedendDates = new Date(endDate as string);
      setstartDates(parsedstartDates);
      setendDates(parsedendDates);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (!HotelData?.property_details_uuid || !startDates || !endDates) return;

    const fetchData = async () => {
      // Don't fetch API if booking_request is 1
      if (HotelData.booking_request === 1) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch inventory data for the entire year
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth(); // Get the current month (0-based index)

        const startMonth = currentMonth; // Start from the current month
        const endMonth = (currentMonth + 3) % 12; // Show data for the next 4 months

        const yearStart = new Date(currentYear, startMonth, 1);
        const yearEnd = new Date(
          currentYear + (endMonth < startMonth ? 1 : 0), // Handle year rollover
          endMonth,
          new Date(currentYear, endMonth + 1, 0).getDate() // Last day of the end month
        );

        const inventoryData = await fetchInventory({
          propertyId: HotelData.property_details_uuid,
          fromDate: format(yearStart, "yyyy-MM-dd"),
          toDate: format(yearEnd, "yyyy-MM-dd"),
        });
        setDailyPrice(inventoryData);
        setRoomAvailability(inventoryData);
        // Fetch charges breakup for selected dates
        const chargesData = await fetchChargesBreakup({
          propertyId: HotelData.property_details_uuid,
          fromDate: format(startDates, "yyyy-MM-dd"),
          toDate: format(endDates, "yyyy-MM-dd"),
          pets: guestCounts.pets,
          refundable: isRefunable,
        });
        setBookingPriceBreakup(
          chargesData.is_valid_voucher
            ? chargesData.after_discount
            : chargesData.before_discount
        );
      } catch (error: any) {
        if (error.message === "This property is not pet-friendly") {
          showErrorToast("This property does not allow pets.");

          // Reset pets count to 0
          setGuestCounts((prev) => ({ ...prev, pets: 0 }));
        } else {
          showErrorToast("Data not Found");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    startDates,
    endDates,
    guestCounts.pets,
    isRefunable,
    HotelData.property_details_uuid,
  ]);

  const formattedGuestString = () => {
    return [
      guestCounts.adults
        ? `${guestCounts.adults} adult${guestCounts.adults > 1 ? "s" : ""}`
        : "",
      guestCounts.kids
        ? `${guestCounts.kids} kid${guestCounts.kids > 1 ? "s" : ""}`
        : "",
      guestCounts.infants
        ? `${guestCounts.infants} infant${guestCounts.infants > 1 ? "s" : ""}`
        : "",
      guestCounts.pets
        ? `${guestCounts.pets} pet${guestCounts.pets > 1 ? "s" : ""}`
        : "",
    ]
      .filter(Boolean)
      .join(", ");
  };

  useEffect(() => {
    if (startDates && endDates) {
      const formattedStartDate = format(startDates, "yyyy-MM-dd");
      const formattedEndDate = format(endDates, "yyyy-MM-dd");

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
  }, [startDates, endDates]); // Runs when date changes

  useEffect(() => {
    const currentQuery = {
      ...router.query,
      ...guestCounts,
      guestCounts: formattedGuestString(),
    };

    router.replace(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      { shallow: true }
    );
  }, [guestCounts]);

  // Effect to handle localStorage logic
  useEffect(() => {
    if (
      bookingPriceBreakup &&
      typeof bookingPriceBreakup.per_night_price === "number"
    ) {
      // Remove old data first (optional)
      localStorage.removeItem("price_per_night");

      // Store new value
      localStorage.setItem(
        "price_per_night",
        bookingPriceBreakup.per_night_price.toString()
      );
    }
  }, [HotelData.id, bookingPriceBreakup?.per_night_price]);

  // Helper function to check if a date is sold out.
  const isDateSoldOut = (date: Date | null) => {
    if (!date || !dailyPrice) return false;
    const formattedDate = format(date, "yyyy-MM-dd");
    return (
      //@ts-ignore
      dailyPrice[formattedDate]?.[0]?.available_room === 0 &&
      //@ts-ignore
      dailyPrice[formattedDate]?.[0]?.non_refundable_price === 0
    );
  };

  // Update the soldOut calculation to ensure it's always boolean
  const soldOut: boolean =
    Boolean(startDates && isDateSoldOut(startDates)) ||
    Boolean(endDates && isDateSoldOut(endDates));

  return {
    isCalendarOpen,
    setIsCalendarOpen,
    startDates,
    setstartDates,
    endDates,
    setendDates,
    isLoading,
    dailyPrice,
    bookingPriceBreakup,
    guestCounts,
    setGuestCounts,
    soldOut,
    formattedGuestString,
    roomAvailability,
  };
}
