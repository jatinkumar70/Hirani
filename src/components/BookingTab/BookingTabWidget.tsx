"use client";

import { format } from "date-fns";
import { CalendarIcon, Hotel, Pen, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatNumberWithCommas } from "../../constants/constants";
import { useBookingLogic } from "../../hooks/useBookingLogic";
import { useMobile } from "../../hooks/useMobile";
import GuestSelector from "../Core/SelectGuest/SelectGuest";
import { Button } from "../ui/Button/Button";
import { Card, CardContent } from "../ui/Card/Card";
import { DateRangeSlider } from "../ui/DateRangeSlider/DateRangeSlider";
import { Skeleton } from "../ui/skeleton/skeleton";
import PriceBreakdown from "./PriceBreakdown";

interface BookingWidgetProps {
  HotelData: any;
}

export default function BookingTabWidget({ HotelData }: BookingWidgetProps) {
  const isMobile = useMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  const {
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
  } = useBookingLogic(HotelData);

  //* Mobile collapsed view
  if (isMobile && !isExpanded) {
    return (
      <div
        className="flex items-center justify-between w-full py-2 px-4 bg-white cursor-pointer rounded-xl"
        onClick={() => setIsExpanded(true)}>
        <div className="flex flex-col">
          <span className="font-bold text-xl">
            {isLoading && HotelData.booking_request !== 1 ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              <>
                {soldOut ? (
                  <span className="text-red-600 font-bold">SOLD OUT</span>
                ) : (
                  <>
                    {HotelData.booking_request === 1 ? (
                      <div className="bg-primary-gold text-white px-3 py-1 rounded-xl text-xs font-medium -ml-1 mt-1">
                        On Request
                      </div>
                    ) : (
                      <>
                        {bookingPriceBreakup &&
                          bookingPriceBreakup.total_nights > 0 &&
                          formatNumberWithCommas(
                            bookingPriceBreakup.breakup_per_night_price || 0
                          )}
                        <span className="text-sm font-normal text-muted-foreground">
                          {" "}
                          per night
                        </span>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </span>

          {startDates && endDates ? (
            <span className="text-md flex items-center gap-1">
              {format(startDates, "d")}-{format(endDates, "d")}{" "}
              {format(startDates, "MMM")} <Pen className="ml-1 h-4 w-4" />
            </span>
          ) : (
            <span className="text-xs">Select dates</span>
          )}
        </div>
        <Button
          className={`text-white rounded-xl text-lg ${soldOut
            ? "bg-gray-400 cursor-not-allowed pointer-events-none"
            : "bg-[#b9aa8e] hover:bg-[#A69880]"
            }`}
          disabled={soldOut}
          onClick={(e) => {
            e.stopPropagation();
            if (startDates && endDates) {
              // Navigate to reservation page
              window.location.href = `/checkout/${HotelData.slug
                }?startDate=${format(startDates, "yyyy-MM-dd")}&endDate=${format(
                  endDates,
                  "yyyy-MM-dd"
                )}&numberOfGuestCount=${formattedGuestString()}`;
            } else {
              setIsExpanded(true);
            }
          }}>
          {soldOut
            ? "SOLD OUT"
            : HotelData.booking_request === 1
              ? "Request"
              : "Reserve"}
        </Button>
      </div>
    );
  }

  //* Expanded view (mobile) or desktop view
  return (
    <div
      className={`flex flex-col ${isMobile
        ? "items-center rounded-xl relative z-[1001]"
        : "gap-8 items-center pb-6"
        }`}>
      {/* Mobile back button */}
      {isMobile && (
        <div className="flex justify-between w-full mb-2">
          <button
            className="text-base text-gray-900"
            onClick={() => setIsExpanded(false)}>
            ← Back
          </button>
        </div>
      )}

      <Card
        className={`w-full ${isMobile
          ? "shadow-md border-2 border-[#d7d7d7] rounded-xl"
          : "shadow-2xl border border-black/40/15 rounded-2xl"
          }`}>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            {isLoading && HotelData.booking_request !== 1 ? (
              <Skeleton
                className={`h-${isMobile ? "6" : "8"} w-${isMobile ? "16" : "32"
                  }`}
              />
            ) : (
              <div
                className={`${isMobile ? "text-xl" : "text-2xl"
                  } font-bold flex items-center gap-1`}>
                {soldOut ? (
                  <span className="text-red-600 font-bold">SOLD OUT</span>
                ) : (
                  <>
                    {HotelData.booking_request === 1 ? (
                      <div className="bg-primary-gold text-white px-3 py-1 rounded-xl text-xs font-medium -ml-1 mt-1">
                        On Request
                      </div>
                    ) : (
                      <>
                        {!isMobile && (
                          <span className="text-base">
                            {HotelData.currency}
                          </span>
                        )}
                        {bookingPriceBreakup &&
                          bookingPriceBreakup.total_nights > 0 &&
                          formatNumberWithCommas(
                            bookingPriceBreakup.breakup_per_night_price || 0
                          )}

                        {!soldOut && (
                          <span className="text-sm font-normal text-muted-foreground">
                            {" "}
                            per night
                          </span>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Mobile price match tag */}
            {isMobile && (
              <div className="text-xs flex items-center gap-2">
                <span>
                  <Tag size={17} />
                </span>
                <span> Price match</span>
              </div>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className={`w-full h-12 justify-start text-left font-normal border border-black${isMobile ? " rounded-xl" : "/40"
                  }`}
                onClick={() => setIsCalendarOpen(true)}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDates ? (
                  <div className="flex justify-between items-center w-full">
                    <span>{format(startDates, "MMM d, yyyy")}</span>
                  </div>
                ) : (
                  "Check in"
                )}
              </Button>
              <Button
                variant="outline"
                className={`w-full h-12 justify-start text-left font-normal border border-black${isMobile ? " rounded-xl" : "/40"
                  }`}
                onClick={() => setIsCalendarOpen(true)}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDates ? (
                  <div className="flex justify-between items-center w-full">
                    <span>{format(endDates, "MMM d, yyyy")}</span>
                  </div>
                ) : (
                  "Check out"
                )}
              </Button>
            </div>

            <DateRangeSlider
              startDate={startDates}
              endDate={endDates}
              onStartDateChange={setstartDates}
              onEndDateChange={setendDates}
              isOpen={isCalendarOpen}
              onOpenChange={setIsCalendarOpen}
              showPrices={true}
              dailyPrice={dailyPrice}
              roomAvailability={roomAvailability}
            />

            <GuestSelector
              guestCounts={guestCounts}
              setGuestCounts={setGuestCounts}
            />
          </div>

          {isLoading && HotelData.booking_request !== 1 && !isMobile ? (
            <Skeleton className="h-12 w-full mb-6" />
          ) : startDates && endDates ? (
            <Link
              href={{
                pathname: `/checkout/${HotelData.slug}`,
                query: {
                  startDate: format(startDates, "yyyy-MM-dd"),
                  endDate: format(endDates, "yyyy-MM-dd"),
                  numberOfGuestCount: formattedGuestString(),
                  ...(HotelData.booking_request === 1 && {
                    inquiryAttachment: true,
                  }),
                },
              }}
              className={soldOut ? "pointer-events-none" : ""}>
              <Button
                disabled={soldOut}
                className={`text-white w-full mb-6 ${isMobile ? "rounded-xl" : ""
                  } ${soldOut
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-700 hover:bg-[#8898aa]"
                  }`}
                size="lg">
                {soldOut
                  ? "SOLD OUT"
                  : HotelData.booking_request === 1
                    ? "Enquiry"
                    : "Reserve"}
              </Button>
            </Link>
          ) : !isMobile ? (
            <Link
              href={{
                pathname:
                  HotelData.booking_request === 1
                    ? `/inquiry/${HotelData.slug}`
                    : `/checkout/${HotelData.slug}`,
                query: {
                  startDate: startDates
                    ? startDates.toISOString().split("T")[0]
                    : "",
                  endDate: endDates ? endDates.toISOString().split("T")[0] : "",
                  numberOfGuests: `${guestCounts.adults}-${guestCounts.kids}-${guestCounts.infants}-${guestCounts.pets}`,
                  ...(HotelData.booking_request === 1 && {
                    inquiryAttachment: true,
                  }),
                },
              }}>
              <Button
                className="text-white w-full bg-dark-gold mb-6 cursor-not-allowed"
                size="lg"
                disabled>
                {HotelData.booking_request === 1 ? "Enquiry" : "Reserve"}
              </Button>
            </Link>
          ) : null}

          {HotelData.booking_request === 1 ? null : (
            <PriceBreakdown
              isLoading={isLoading}
              bookingPriceBreakup={bookingPriceBreakup}
              currency={HotelData.currency}
              soldOut={soldOut}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
