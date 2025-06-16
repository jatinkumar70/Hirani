import React from "react";
import { Users, BedDouble, Bed, Bath } from "lucide-react";
import { formatNumberWithCommas } from "../../../constants/constants";
// make sure this function exists

type Hotel = {
  location: {
    city: string;
    country?: string;
  };
  details: {
    guests: number;
    bedrooms: number;
    available_beds: number;
    bathroom_full: number;
  };
  non_refundable_price?: number;
  booking_request: number;
  currency?: string;
};

interface HotelCardProps {
  hotel: Hotel;
  formattedTitle: string;
  formattedArea: string;
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  formattedTitle,
  formattedArea,
}) => {
  return (
    <div className="p-1">
      <span className="font-medium text-xl text-black lg:text-sm line-clamp-1">
        {formattedTitle}
      </span>

      <div className="flex items-center gap-2 text-md lg:text-sm mt-0.5">
        <span className="line-clamp-1 text-gray-500">
          {hotel.location.city}, {formattedArea}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between text-md lg:text-sm">
        <div className=" text-gray-500 flex flex-col items-center gap-1">
          <Users className="w-6 h-6 lg:w-4 lg:h-4" />
          <span className="text-xs">{hotel.details.guests} guests</span>
        </div>
        <div className=" text-gray-500 flex flex-col items-center gap-1">
          <BedDouble className="w-6 h-6 lg:w-4 lg:h-4" />
          <span className="text-xs">
            {hotel.details.bedrooms > 0
              ? `${hotel.details.bedrooms} bedrooms`
              : "Studio"}
          </span>
        </div>
        <div className=" text-gray-500 flex flex-col items-center gap-1">
          <Bed className="w-6 h-6 lg:w-4 lg:h-4" />
          <span className="text-xs">{hotel.details.available_beds} bed</span>
        </div>
        <div className=" text-gray-500 flex flex-col items-center gap-1">
          <Bath className="w-6 h-6 lg:w-4 lg:h-4" />
          <span className="text-xs">{hotel.details.bathroom_full} baths</span>
        </div>
      </div>

      {/* <div className="border-t mt-2" /> */}
      <div className="flex items-center gap-2 justify-between pt-1">
        {hotel.booking_request === 1 ? (
          <div className="bg-primary-gold text-white px-3 py-1 rounded-xl text-xs font-medium -ml-1 mt-1">
            On Request
          </div>
        ) : (
          <div className="flex items-center gap-1 font-semibold text-lg lg:text-sm">
            {formatNumberWithCommas(hotel.non_refundable_price || 0)}
            {hotel.booking_request === 1 ? null : (
              <>
                <span className="font-semibold text-lg lg:text-sm">
                  {hotel.currency || null}
                </span>
                <span className="text-sm lg:text-sm font-normal text-muted-foreground">
                  per night
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelCard;
