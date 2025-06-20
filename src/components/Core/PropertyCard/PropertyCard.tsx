import type React from "react"
import { Users, BedDouble, Bed, Bath, Star, MapPin, Wifi, TrainFront } from "lucide-react"

import { formatNumberWithCommas } from "../../../constants/constants"
import { Button } from "../../ui/Button/Button"
import { FaSwimmingPool } from "react-icons/fa"
import { Badge } from "../../ui/Badge/Badge"

type Hotel = {
  location: {
    city: string
    country?: string
  }
  details: {
    guests: number
    bedrooms: number
    available_beds: number
    bathroom_full: number
  }
  non_refundable_price?: number
  booking_request: number
  currency?: string
  rating?: number
  reviews_count?: number
}

interface HotelCardProps {
  hotel: Hotel
  formattedTitle: string
  formattedArea: string
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, formattedTitle, formattedArea }) => {
  // Mock rating if not provided (you can remove this when you have real ratings)
  const rating = hotel.rating || 4.0 + Math.random() * 1.0
  const reviewsCount = hotel.reviews_count || Math.floor(Math.random() * 500) + 50

  return (
    <div className="p-3 flex flex-col">
      {/* Header with rating */}
      {/* <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
          <span className="text-xs text-gray-500">({reviewsCount})</span>
        </div>
      </div> */}

      {/* Title */}
      <h3 className="font-medium text-base text-gray-900 line-clamp-2 mb-2 flex-grow">{formattedTitle}</h3>

      {/* Location */}
      <div className="flex items-center gap-1 mb-3">
        <MapPin className="w-3 h-3 text-gray-400" />
        <span className="text-sm text-gray-600 line-clamp-1">
          {hotel.location.city}, {formattedArea}
        </span>
      </div>


      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium">
          <Wifi className="w-4 h-4 mr-1 text-gray-500" />
          Wifi
        </span>
        <span className="flex items-center bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium">
          <TrainFront className="w-4 h-4 mr-1 text-gray-500" />
          Metro Access
        </span>
        <span className="flex items-center bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium">
          <FaSwimmingPool className="w-4 h-4 mr-1 text-gray-500" />
          Pool
        </span>
      </div>


      {/* Amenities - Horizontal layout */}
      <div className="flex items-center gap-4 mb-4 py-2 border-t border-gray-100">
        <div className="flex items-center gap-1 text-gray-500">
          <Users className="w-4 h-4" />
          <span className="text-xs">{hotel.details.guests}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <BedDouble className="w-4 h-4" />
          <span className="text-xs">{hotel.details.bedrooms > 0 ? hotel.details.bedrooms : "Studio"}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Bed className="w-4 h-4" />
          <span className="text-xs">{hotel.details.available_beds}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Bath className="w-4 h-4" />
          <span className="text-xs">{hotel.details.bathroom_full}</span>
        </div>
      </div>

      {/* Price and Book Now */}
      <div className="mt-auto">
        {hotel.booking_request === 1 ? (
          <div className="text-center flex items-center gap-2 justify-between">
            <div className="bg-primary-gold relative bottom-[430px] text-white px-3 py-1 rounded-lg text-sm font-medium mb-2">On Request</div>
            <Badge className="bg-gray-600 hover:bg-gray-800 text-white cursor-pointer">Request Now</Badge>
          </div>
        ) : (
          <div className="flex justify-between items-center px-2">
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-xl font-bold text-gray-900">
                {formatNumberWithCommas(hotel.non_refundable_price || 0)}
              </span>
              <span className="text-sm font-medium text-gray-900">{hotel.currency || "AED"}</span>
              <span className="text-sm text-gray-500">per night</span>
            </div>
            <Button className=" bg-gray-600 hover:bg-gray-800 text-white">Book Now</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default HotelCard
