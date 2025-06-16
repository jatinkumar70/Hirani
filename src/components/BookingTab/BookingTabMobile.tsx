// "use client";
// "use client";

// import { format } from "date-fns";
// import { CalendarIcon, Pen, Tag } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useRef, useState } from "react";
// import { formatNumberWithCommas } from "../../constants/constants";
// import {
//   fetchChargesBreakup,
//   fetchInventory,
// } from "../../lib/Booking/fetchApi";
// import { IInventoryPrice, IPriceBreakup } from "../../types/types";
// import { showErrorToast } from "../../utils/toaster/toast";
// import GuestSelector from "../Core/SelectGuest/SelectGuest";
// import { Button } from "../ui/Button/Button";
// import { Card, CardContent } from "../ui/Card/Card";
// import { DateRangeSlider } from "../ui/DateRangeSlider/DateRangeSlider";
// import { Skeleton } from "../ui/skeleton/skeleton";
// import PriceDetailsPopover from "./PricePopover";
// import type { BookingDetails } from "./types/Booking";
// import { useBookingLogic } from "../../hooks/useBookingLogic";
// import PriceBreakdown from "./PriceBreakdown";

// export default function BookingTabMobile({ HotelData }: any) {
//   const [isExpanded, setIsExpanded] = useState(false);
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
//   if (!isExpanded) {
//     return (
//       <div
//         className="flex items-center justify-between w-full py-2 px-4 bg-white cursor-pointer rounded-xl"
//         onClick={() => setIsExpanded(true)}>
//         <div className="flex flex-col">
//           <span className="font-bold text-xl">
//             {isLoading ? (
//               <Skeleton className="h-6 w-16" />
//             ) : (
//               <>
//                 {soldOut ? (
//                   <span className="text-red-600 font-bold">SOLD OUT</span>
//                 ) : (
//                   <>
//                     {bookingPriceBreakup &&
//                       bookingPriceBreakup.total_nights > 0 &&
//                       formatNumberWithCommas(
//                         bookingPriceBreakup.per_night_price || 0
//                       )}
//                     <span className="text-sm font-normal text-muted-foreground">
//                       {" "}
//                       per night
//                     </span>
//                   </>
//                 )}
//               </>
//             )}
//           </span>

//           {startDates && endDates ? (
//             <span className="text-md flex items-center gap-1">
//               {format(startDates, "d")}-{format(endDates, "d")}{" "}
//               {format(startDates, "MMM")} <Pen className="ml-1 h-4 w-4" />
//             </span>
//           ) : (
//             <span className="text-xs">Select dates</span>
//           )}
//         </div>
//         <Button
//           className={`text-white rounded-xl text-lg ${
//             soldOut
//               ? "bg-gray-400 cursor-not-allowed pointer-events-none"
//               : "bg-[#b9aa8e] hover:bg-[#A69880]"
//           }`}
//           disabled={soldOut}
//           onClick={(e) => {
//             e.stopPropagation();
//             if (startDates && endDates) {
//               // Navigate to reservation page
//               window.location.href = `/checkout/${
//                 HotelData.slug
//               }?startDate=${format(startDates, "yyyy-MM-dd")}&endDate=${format(
//                 endDates,
//                 "yyyy-MM-dd"
//               )}&numberOfGuestCount=${formattedGuestString()}`;
//             } else {
//               setIsExpanded(true);
//             }
//           }}>
//           {soldOut ? "SOLD OUT" : "Reserve"}
//         </Button>
//       </div>
//     );
//   }

//   // Expanded view: show calendar, guest selector, and detailed pricing info
//   return (
//     <div className="flex flex-col items-center rounded-xl relative z-[1001]">
//       <div className="flex justify-between w-full mb-2">
//         <button
//           className="text-base text-gray-900"
//           onClick={() => setIsExpanded(false)}>
//           ← Back
//         </button>
//       </div>
//   // Expanded view: show calendar, guest selector, and detailed pricing info
//   return (
//     <div className="flex flex-col items-center rounded-xl relative z-[1001]">
//       <div className="flex justify-between w-full mb-2">
//         <button
//           className="text-base text-gray-900"
//           onClick={() => setIsExpanded(false)}>
//           ← Back
//         </button>
//       </div>

//       <Card className="w-full shadow-md border-2 border-[#d7d7d7] rounded-xl">
//         <CardContent className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <div className="text-xl font-bold flex items-center gap-1">
//               {isLoading ? (
//                 <Skeleton className="h-6 w-16" />
//               ) : (
//                 <>
//                   {soldOut ? (
//                     <span className="text-red-600 font-bold">SOLD OUT</span>
//                   ) : (
//                     <>
//                       {bookingPriceBreakup &&
//                         bookingPriceBreakup.total_nights > 0 &&
//                         formatNumberWithCommas(
//                           bookingPriceBreakup.per_night_price || 0
//                         )}
//                       <span className="text-sm font-normal text-muted-foreground">
//                         {" "}
//                         per night
//                       </span>
//                     </>
//                   )}
//                 </>
//               )}
//             </div>
//             <div className="text-xs flex items-center gap-2">
//               <span>
//                 <Tag size={17} />
//               </span>
//               <span> Price match</span>
//             </div>
//           </div>
//       <Card className="w-full shadow-md border-2 border-[#d7d7d7] rounded-xl">
//         <CardContent className="p-6">
//           <div className="flex justify-between items-center mb-6">
//             <div className="text-xl font-bold flex items-center gap-1">
//               {isLoading ? (
//                 <Skeleton className="h-6 w-16" />
//               ) : (
//                 <>
//                   {soldOut ? (
//                     <span className="text-red-600 font-bold">SOLD OUT</span>
//                   ) : (
//                     <>
//                       {bookingPriceBreakup &&
//                         bookingPriceBreakup.total_nights > 0 &&
//                         formatNumberWithCommas(
//                           bookingPriceBreakup.per_night_price || 0
//                         )}
//                       <span className="text-sm font-normal text-muted-foreground">
//                         {" "}
//                         per night
//                       </span>
//                     </>
//                   )}
//                 </>
//               )}
//             </div>
//             <div className="text-xs flex items-center gap-2">
//               <span>
//                 <Tag size={17} />
//               </span>
//               <span> Price match</span>
//             </div>
//           </div>

//           <div className="space-y-4 mb-6">
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 className="w-full h-12 justify-start text-left font-normal border border-black rounded-xl"
//                 onClick={() => setIsCalendarOpen(true)}>
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {startDates ? (
//                   <span>{format(startDates, "MMM d, yyyy")}</span>
//                 ) : (
//                   "Check in"
//                 )}
//               </Button>
//               <Button
//                 variant="outline"
//                 className="w-full h-12 justify-start text-left font-normal border border-black rounded-xl"
//                 onClick={() => setIsCalendarOpen(true)}>
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {endDates ? (
//                   <span>{format(endDates, "MMM d, yyyy")}</span>
//                 ) : (
//                   "Check out"
//                 )}
//               </Button>
//             </div>
//           <div className="space-y-4 mb-6">
//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 className="w-full h-12 justify-start text-left font-normal border border-black rounded-xl"
//                 onClick={() => setIsCalendarOpen(true)}>
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {startDates ? (
//                   <span>{format(startDates, "MMM d, yyyy")}</span>
//                 ) : (
//                   "Check in"
//                 )}
//               </Button>
//               <Button
//                 variant="outline"
//                 className="w-full h-12 justify-start text-left font-normal border border-black rounded-xl"
//                 onClick={() => setIsCalendarOpen(true)}>
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {endDates ? (
//                   <span>{format(endDates, "MMM d, yyyy")}</span>
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

//           {startDates && endDates && (
//             <Link
//               href={{
//                 pathname: `/checkout/${HotelData.slug}`,
//                 query: {
//                   startDate: startDates
//                     ? startDates.toISOString().split("T")[0]
//                     : "",
//                   endDate: endDates ? endDates.toISOString().split("T")[0] : "",
//                   numberOfGuestCount: formattedGuestString(),
//                 },
//               }}
//               className={`${soldOut ? "pointer-events-none opacity-50" : ""}`}>
//               <Button
//                 disabled={soldOut}
//                 className={`text-white w-full mb-6 rounded-xl ${
//                   soldOut
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-dark-gold hover:bg-[#A69880]"
//                 }`}
//                 size="lg">
//                 {soldOut ? "SOLD OUT" : "Reserve"}
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
