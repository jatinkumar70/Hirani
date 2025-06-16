// "use client";
// "use client";


// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import Link from "next/link";
// import { formatNumberWithCommas } from "../../constants/constants";
// import { useBookingLogic } from "../../hooks/useBookingLogic";
// import GuestSelector from "../Core/SelectGuest/SelectGuest";
// import { Button } from "../ui/Button/Button";
// import { Card, CardContent } from "../ui/Card/Card";
// import { DateRangeSlider } from "../ui/DateRangeSlider/DateRangeSlider";
// import { Skeleton } from "../ui/skeleton/skeleton";
// import PriceBreakdown from "./PriceBreakdown";

// export default function BookingWidget({ HotelData }: any) {
//   const {
//     isCalendarOpen,
//     setIsCalendarOpen,
//     startDates,
//     setstartDates,
//     endDates,
//     setendDates,
//     isLoading,
//     dailyPrice,
//     bookingPriceBreakup,
//     guestCounts,
//     setGuestCounts,
//     soldOut,
//     formattedGuestString,
//   } = useBookingLogic(HotelData);

//   return (
//     <div className="flex flex-col gap-8 items-center pb-6">
//       <Card className="w-full shadow-2xl border border-black/40/15 rounded-2xl">
//         <CardContent className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             {isLoading ? (
//               <Skeleton className="h-8 w-32" />
//             ) : (
//               <div className="text-2xl font-bold flex items-center gap-1">
//                 {isLoading ? (
//                   <Skeleton className="h-8 w-32" />
//                 ) : (
//                   <div className="text-2xl font-bold flex items-center gap-1">
//                     {soldOut ? (
//                       <span className="text-red-600 font-bold">SOLD OUT</span>
//                     ) : (
//                       <>
//                         <span className="text-base">{HotelData.currency}</span>
//                         {bookingPriceBreakup &&
//                           bookingPriceBreakup.total_nights > 0 &&
//                           formatNumberWithCommas(
//                             bookingPriceBreakup.per_night_price || 0
//                           )}
//                       </>
//                     )}
//                     {!soldOut && (
//                       <span className="text-sm font-normal text-muted-foreground">
//                         {" "}
//                         per night
//                       </span>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           <div className="space-y-4 mb-6">
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 className="w-full h-12 justify-start text-left font-normal border border-black/40"
//                 onClick={() => setIsCalendarOpen(true)}>
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {startDates ? (
//                   <div className="flex justify-between items-center w-full">
//                     <span>{format(startDates, "MMM d, yyyy")}</span>
//                   </div>
//                 ) : (
//                   "Check in"
//                 )}
//               </Button>
//               <Button
//                 variant="outline"
//                 className="w-full h-12 justify-start text-left font-normal border border-black/40"
//                 onClick={() => setIsCalendarOpen(true)}>
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {endDates ? (
//                   <div className="flex justify-between items-center w-full">
//                     <span>{format(endDates, "MMM d, yyyy")}</span>
//                   </div>
//                 ) : (
//                   "Check out"
//                 )}
//               </Button>
//             </div>
//           <div className="space-y-4 mb-6">
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 className="w-full h-12 justify-start text-left font-normal border border-black/40"
//                 onClick={() => setIsCalendarOpen(true)}>
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {startDates ? (
//                   <div className="flex justify-between items-center w-full">
//                     <span>{format(startDates, "MMM d, yyyy")}</span>
//                   </div>
//                 ) : (
//                   "Check in"
//                 )}
//               </Button>
//               <Button
//                 variant="outline"
//                 className="w-full h-12 justify-start text-left font-normal border border-black/40"
//                 onClick={() => setIsCalendarOpen(true)}>
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {endDates ? (
//                   <div className="flex justify-between items-center w-full">
//                     <span>{format(endDates, "MMM d, yyyy")}</span>
//                   </div>
//                 ) : (
//                   "Check out"
//                 )}
//               </Button>
//             </div>

//             <DateRangeSlider
//               startDate={startDates}
//               endDate={endDates}
//               onStartDateChange={setstartDates}
//               onEndDateChange={setendDates}
//               isOpen={isCalendarOpen}
//               onOpenChange={setIsCalendarOpen}
//               showPrices={true}
//               dailyPrice={dailyPrice}
//             />
//             <DateRangeSlider
//               startDate={startDates}
//               endDate={endDates}
//               onStartDateChange={setstartDates}
//               onEndDateChange={setendDates}
//               isOpen={isCalendarOpen}
//               onOpenChange={setIsCalendarOpen}
//               showPrices={true}
//               dailyPrice={dailyPrice}
//             />

//             <GuestSelector
//               guestCounts={guestCounts}
//               setGuestCounts={setGuestCounts}
//             />
//           </div>
//             <GuestSelector
//               guestCounts={guestCounts}
//               setGuestCounts={setGuestCounts}
//             />
//           </div>

//           {isLoading ? (
//             <Skeleton className="h-12 w-full mb-6" />
//           ) : startDates && endDates ? (
//             <Link
//               href={{
//                 pathname: `/checkout/${HotelData.slug}`,
//                 query: {
//                   startDate: format(startDates, "yyyy-MM-dd"),
//                   endDate: format(endDates, "yyyy-MM-dd"),
//                   numberOfGuestCount: formattedGuestString(),
//                 },
//               }}
//               className={soldOut ? "pointer-events-none" : ""}>
//               <Button
//                 disabled={soldOut}
//                 className={`text-white w-full mb-6 ${
//                   soldOut
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-dark-gold hover:bg-[#A69880]"
//                 }`}
//                 size="lg">
//                 {soldOut ? "SOLD OUT" : "Reserve"}
//               </Button>
//             </Link>
//           ) : (
//             <Link
//               href={{
//                 pathname: `/checkout/${HotelData.slug}`,
//                 query: {
//                   startDate: startDates
//                     ? startDates.toISOString().split("T")[0]
//                     : "",
//                   endDate: endDates ? endDates.toISOString().split("T")[0] : "",
//                   numberOfGuests: `${guestCounts.adults}-${guestCounts.kids}-${guestCounts.infants}-${guestCounts.pets}`,
//                 },
//               }}>
//               <Button
//                 className="text-white w-full bg-dark-gold mb-6 cursor-not-allowed"
//                 size="lg"
//                 disabled>
//                 Reserve
//               </Button>
//             </Link>
//           )}

//           <PriceBreakdown
//             isLoading={isLoading}
//             bookingPriceBreakup={bookingPriceBreakup}
//             currency={HotelData.currency}
//             soldOut={soldOut}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
