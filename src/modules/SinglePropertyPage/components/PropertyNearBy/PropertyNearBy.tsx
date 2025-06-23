"use client"

import { Building2, Bus, LandPlot, MapPinned, Plane, ShoppingCart, Utensils, Waves, MapPin } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import type { Property } from "../../../../types/types"
import { api } from "../../../../utils/api"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/Card/Card"
import { Badge } from "../../../../components/ui/Badge/Badge"


interface IPropertyData {
  hotelData: Property
}

interface NearbyPlace {
  distance: string
  latitude: number
  location: string
  longitude: number
}

interface NearbyData {
  property_nearby_unique_id: number
  property_nearby_uuid: string
  property_details_uuid: string
  nearby_type: string
  nearby_places: NearbyPlace[]
}

const PropertyNearbyPlaces: React.FC<IPropertyData> = ({ hotelData }) => {
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyData[]>([])

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      try {
        const response = await api.get(
          `/property/get-property-nearby?property_details_uuid=${hotelData.property_details_uuid}`,
        )
        if (response.data?.data) {
          setNearbyPlaces(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching nearby places:", error)
        setNearbyPlaces([])
      }
    }

    if (hotelData?.property_details_uuid) {
      fetchNearbyPlaces()
    }
  }, [hotelData?.property_details_uuid])

  const categoryConfig = {
    Attractions: { icon: MapPinned, color: "bg-red-100 text-red-600", badgeColor: "bg-red-50 text-red-700" },
    "Restaurants and cafes": {
      icon: Utensils,
      color: "bg-orange-100 text-orange-600",
      badgeColor: "bg-orange-50 text-orange-700",
    },
    Supermarkets: {
      icon: ShoppingCart,
      color: "bg-green-100 text-green-600",
      badgeColor: "bg-green-50 text-green-700",
    },
    "Golf courses": {
      icon: LandPlot,
      color: "bg-emerald-100 text-emerald-600",
      badgeColor: "bg-emerald-50 text-emerald-700",
    },
    Beaches: { icon: Waves, color: "bg-blue-100 text-blue-600", badgeColor: "bg-blue-50 text-blue-700" },
    "Shopping malls": {
      icon: Building2,
      color: "bg-purple-100 text-purple-600",
      badgeColor: "bg-purple-50 text-purple-700",
    },
    Airports: { icon: Plane, color: "bg-indigo-100 text-indigo-600", badgeColor: "bg-indigo-50 text-indigo-700" },
    "Public transport": {
      icon: Bus,
      color: "bg-yellow-100 text-yellow-600",
      badgeColor: "bg-yellow-50 text-yellow-700",
    },
  }

  const categories = Object.entries(categoryConfig)
    .map(([type, config]) => {
      const nearbyData = nearbyPlaces.find((place) => place.nearby_type === type)
      return {
        title: type,
        icon: config.icon,
        color: config.color,
        badgeColor: config.badgeColor,
        items:
          nearbyData?.nearby_places?.map((place) => ({
            name: place.location,
            distance: place.distance,
          })) || [],
      }
    })
    .filter((category) => category.items.length > 0)

  if (categories.length === 0) return null

  return (
    <div id="surroundings" style={{ scrollMarginTop: "100px" }} className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
          <MapPin className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">What's nearby?</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <Card
              key={category.title}
              className="shadow-sm hover:shadow-md transition-all duration-200 border-0 shadow-gray-100"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-3 text-lg">
                  <div className={`p-2 rounded-full ${category.color}`}>
                    <IconComponent size={20} />
                  </div>
                  <span className="text-gray-900">{category.title}</span>
                  <Badge variant="secondary" className={`ml-auto ${category.badgeColor} border-0`}>
                    {category.items.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {category.items.slice(0, 5).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      </div>
                      <Badge variant="outline" className="ml-3 text-xs font-medium bg-white">
                        {item.distance}
                      </Badge>
                    </div>
                  ))}
                  {category.items.length > 5 && (
                    <div className="text-center pt-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                        +{category.items.length - 5} more
                      </button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary section */}
      {/* <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Explore the neighborhood</h3>
            <p className="text-gray-600 mb-4">
              Discover {categories.reduce((total, cat) => total + cat.items.length, 0)} nearby places across{" "}
              {categories.length} categories
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.slice(0, 4).map((category) => {
                const IconComponent = category.icon
                return (
                  <Badge key={category.title} variant="secondary" className="bg-white text-gray-700">
                    <IconComponent size={14} className="mr-1" />
                    {category.title}
                  </Badge>
                )
              })}
              {categories.length > 4 && (
                <Badge variant="secondary" className="bg-white text-gray-700">
                  +{categories.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}

export default PropertyNearbyPlaces
