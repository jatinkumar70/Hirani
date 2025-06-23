"use client"

import type React from "react"

import { BedDouble, KeyRound, MessageCircle, PawPrint, X, Star, Users, Home, Bath } from "lucide-react"
import { useState } from "react"
import type { Property } from "../../../../types/types"
import { PropertyAmenities } from "../PropertyAmenities/PropertyAmenities"
import PropertyDetailsHeader from "../PropertyDetailsHeader/PropertyDetailsHeader"
import PropertyNearbyPlaces from "../PropertyNearBy/PropertyNearBy"
import { Card, CardContent } from "../../../../components/ui/Card/Card"
import { Badge } from "../../../../components/ui/Badge/Badge"
import { Button } from "../../../../components/ui/Button/Button"


interface ISingleHotelProp {
  hotelData: Property
  handleClick?: () => void
}

const PropertyDetails = ({ hotelData, handleClick }: ISingleHotelProp) => {
  return (
    <div className="w-full md:w-[65%] flex flex-col space-y-8">
      <PropertyDetailsHeader
        button1={"Show All photos"}
        button2={"Video walkthrough"}
        button3={"Floor plans"}
        handleClickImage={handleClick}
        hotelData={hotelData}
      />

      <PropertyInfo hotelData={hotelData} />

      <PropertyHighlights
        propertyListInfo={[
          {
            text: "Great check-in experience",
            desc: "95% of recent guests gave the check-in process a 5-star rating.",
            icon: <KeyRound className="w-6 h-6" />,
            rating: "5.0",
          },
          {
            text: "Pet friendly let",
            desc: "Bring your pets along for the stay.",
            icon: <PawPrint className="w-6 h-6" />,
            rating: null,
          },
          {
            text: "Great communication",
            desc: "90% of recent guests rated Daniel 5-star in communication.",
            icon: <MessageCircle className="w-6 h-6" />,
            rating: "5.0",
          },
        ]}
      />

      {hotelData.description && <PropertyDescription HotelDesc={hotelData} />}

      <SleepingArrangements hotelData={hotelData} />

      <PropertyAmenities hotelAmenities={hotelData} />

      <PropertyNearbyPlaces hotelData={hotelData} />
    </div>
  )
}

export default PropertyDetails

// Property Info Component with modern design
export const PropertyInfo = ({ hotelData }: ISingleHotelProp) => {
  const { available_beds, bathroom_full, bedrooms, guests } = hotelData.details

  const details = [
    {
      text: `${guests} guest${guests > 1 ? "s" : ""}`,
      icon: <Users className="w-5 h-5" />,
      value: guests,
    },
    {
      text: bedrooms && bedrooms > 0 ? `${bedrooms} bedroom${bedrooms > 1 ? "s" : ""}` : "Studio",
      icon: <Home className="w-5 h-5" />,
      value: bedrooms || 0,
    },
    {
      text: `${available_beds} bed${available_beds > 1 ? "s" : ""}`,
      icon: <BedDouble className="w-5 h-5" />,
      value: available_beds,
    },
    {
      text: `${bathroom_full} bathroom${bathroom_full > 1 ? "s" : ""}`,
      icon: <Bath className="w-5 h-5" />,
      value: bathroom_full,
    },
  ]

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {details.map((detail, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
              <div className="text-blue-600">{detail.icon}</div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{detail.value}</div>
                <div className="text-sm text-gray-600">{detail.text.split(" ").slice(1).join(" ")}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Property Highlights with enhanced design
interface IProperty {
  icon: JSX.Element
  text: string
  desc: string
  rating?: string | null
}

interface PropertyHighlightsProps {
  propertyListInfo: IProperty[]
}

const PropertyHighlights = ({ propertyListInfo }: PropertyHighlightsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Property Highlights</h2>
      <div className="grid gap-4">
        {propertyListInfo.map((item, index) => (
          <Card key={index} className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-full text-blue-600">{item.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{item.text}</h3>
                    {item.rating && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {item.rating}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Enhanced Property Description
export const PropertyDescription = ({ HotelDesc }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "unset"
  }

  const shouldShowToggle = HotelDesc.description && HotelDesc.description.length > 200

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal()
    }
  }

  return (
    <>
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About this place</h2>
          <div className="prose prose-gray max-w-none">
            {shouldShowToggle ? (
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: HotelDesc.description.substring(0, 280) + "...",
                }}
              />
            ) : (
              <div
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: HotelDesc.description || "N/A",
                }}
              />
            )}
          </div>

          {shouldShowToggle && (
            <Button onClick={openModal} variant="outline" className="mt-4 border-gray-300 hover:bg-gray-50">
              Show More
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000]"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900">Property Description</h2>
              <Button onClick={closeModal} variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </Button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div
                className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: HotelDesc.description || "N/A",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Enhanced Sleeping Arrangements
const SleepingArrangements = ({ hotelData }: ISingleHotelProp) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Where you'll sleep</h2>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-blue-100 rounded-full text-blue-600">
              <BedDouble size={32} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Living area</h3>
              <p className="text-gray-600">
                {hotelData?.details?.available_beds} double bed{hotelData?.details?.available_beds > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
