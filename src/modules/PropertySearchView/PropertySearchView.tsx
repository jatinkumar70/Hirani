"use client"

import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import {
  MapPin,
  X,
  Filter,
  Search,
  Calendar,
  Users,
  Home,
  Bed,
  Bath,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Waves,
  SlidersHorizontal,
  Star,
} from "lucide-react"
import { Card, CardContent } from "../../components/ui/Card/Card"
import { cn } from "../../lib/utils"
import { Badge } from "../../components/ui/Badge/Badge"
import { Button } from "../../components/ui/Button/Button"
import { Input } from "../../components/ui/Input/Input"
import { Checkbox } from "../../components/ui/Checkbox/Checkbox"
import { Label } from "../../components/ui/Label/Label"

const SearchPropertyMap = dynamic(() => import("../SearchPage/components/SearchPropertyMap/SearchPropertyMap"), {
  ssr: false,
})

const FilterHotels = dynamic(() => import("./Components/FiltersHotels/FilterHotels"), {
  ssr: false,
  loading: () => <FilterHotelsSkeleton count={10} />,
})

// Skeleton loader component
const FilterHotelsSkeleton = ({ count }: { count: number }) => (
  <div className="space-y-6">
    {Array.from({ length: count }).map((_, i) => (
      <Card key={i} className="overflow-hidden">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-200" />
          <CardContent className="p-6">
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-3 bg-gray-200 rounded w-2/3 mb-4" />
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
          </CardContent>
        </div>
      </Card>
    ))}
  </div>
)

interface IPropertySearchViewProps {
  hotelsList: any[]
  loadingState: boolean
}

// Enhanced Filter Sidebar with improved layout and spacing
const FilterSidebar: React.FC<{ isOpen: boolean; onToggle: () => void }> = ({ isOpen, onToggle }) => {
  const [activeFilters, setActiveFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    priceRange: [200, 20000],
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
    amenities: [] as string[],
    popular: [] as string[],
  })

  const amenities = [
    { key: "wifi", label: "WiFi", icon: Wifi },
    { key: "pool", label: "Pool", icon: Waves },
    { key: "gym", label: "Gym", icon: Dumbbell },
    { key: "parking", label: "Parking", icon: Car },
    { key: "kitchen", label: "Kitchen", icon: Coffee },
  ]

  const popularFilters = [
    { key: "budget", label: "Budget friendly" },
    { key: "breakfast", label: "Breakfast included" },
    { key: "shuttle", label: "Free airport shuttle" },
    { key: "hostel", label: "Hostel/Backpacker" },
  ]

  const handleInput = (field: string, value: any) => {
    setActiveFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckbox = (field: "amenities" | "popular", key: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [field]: prev[field].includes(key) ? prev[field].filter((k: string) => k !== key) : [...prev[field], key],
    }))
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (activeFilters.bedrooms > 0) count++
    if (activeFilters.beds > 0) count++
    if (activeFilters.bathrooms > 0) count++
    if (activeFilters.amenities.length > 0) count++
    if (activeFilters.popular.length > 0) count++
    if (activeFilters.priceRange[0] !== 200 || activeFilters.priceRange[1] !== 20000) count++
    if (activeFilters.destination) count++
    if (activeFilters.checkIn) count++
    if (activeFilters.checkOut) count++
    if (activeFilters.guests > 1) count++
    return count
  }

  const handleReset = () => {
    setActiveFilters({
      destination: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      priceRange: [200, 20000],
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
      amenities: [],
      popular: [],
    })
  }

  const sidebarContent = (
    <div className="flex flex-col h-[90%]">
      {/* Header - More Compact */}
      <div className="flex mt-4 items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg">
            <SlidersHorizontal className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-xs mt-0.5">
                {getActiveFilterCount()} active
              </Badge>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 text-sm font-medium px-3 py-1"
        >
          Reset
        </Button>
      </div>

      {/* Search Form - Compact Layout */}
      <div className="space-y-4 mb-6">
        <div className="relative hidden">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            value={activeFilters.destination}
            onChange={(e) => handleInput("destination", e.target.value)}
            placeholder="Where are you going?"
            className="pl-10 h-10 border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 text-sm"
          />
        </div>

        <div className="hidden grid grid-cols-2 gap-2">
          <div className="relative">
            <Calendar className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <Input
              type="date"
              value={activeFilters.checkIn}
              onChange={(e) => handleInput("checkIn", e.target.value)}
              className="pl-8 h-9 border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 text-xs"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <Input
              type="date"
              value={activeFilters.checkOut}
              onChange={(e) => handleInput("checkOut", e.target.value)}
              className="pl-8 h-9 border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 text-xs"
            />
          </div>
        </div>

        <div className="relative hidden">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="number"
            min={1}
            value={activeFilters.guests}
            onChange={(e) => handleInput("guests", Number(e.target.value))}
            className="pl-10 h-10 border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 text-sm"
            placeholder="Guests"
          />
        </div>
      </div>

      {/* Filter Sections - Compact and Always Visible */}
      <div className="flex-1 space-y-5 overflow-y-auto">
        {/* Popular Filters */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Popular filters</h3>
          <div className="grid grid-cols-1 gap-2">
            {popularFilters.map((f) => (
              <div key={f.key} className="flex items-center space-x-2">
                <Checkbox
                  id={f.key}
                  checked={activeFilters.popular.includes(f.key)}
                  onCheckedChange={() => handleCheckbox("popular", f.key)}
                  className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 h-4 w-4"
                />
                <Label htmlFor={f.key} className="text-sm text-gray-700 cursor-pointer">
                  {f.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Price per night</h3>
          <div className="flex items-center justify-between text-sm text-gray-600 bg-white rounded-md px-3 py-2 border">
            <span>${activeFilters.priceRange[0]}</span>
            <span className="text-gray-400">to</span>
            <span>${activeFilters.priceRange[1]}+</span>
          </div>
        </div>

        {/* Rooms & Beds - Horizontal Layout */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Rooms & beds</h3>
          <div className="space-y-3">
            {[
              { key: "bedrooms", label: "Bedrooms", icon: Home },
              { key: "beds", label: "Beds", icon: Bed },
              { key: "bathrooms", label: "Bathrooms", icon: Bath },
            ].map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gray-500" />
                  <Label className="text-sm text-gray-700">{label}</Label>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleInput(key, Math.max(0, (activeFilters[key as keyof typeof activeFilters] as number) - 1))
                    }
                    className="h-7 w-7 p-0 border-gray-200 hover:border-amber-400 text-xs"
                  >
                    -
                  </Button>
                  <span className="w-6 text-center text-sm font-medium">
                    {activeFilters[key as keyof typeof activeFilters]}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleInput(key, (activeFilters[key as keyof typeof activeFilters] as number) + 1)}
                    className="h-7 w-7 p-0 border-gray-200 hover:border-amber-400 text-xs"
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities - Grid Layout */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Amenities</h3>
          <div className="grid grid-cols-1 gap-2">
            {amenities.map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={activeFilters.amenities.includes(key)}
                  onCheckedChange={() => handleCheckbox("amenities", key)}
                  className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 h-4 w-4"
                />
                <Icon className="h-4 w-4 text-gray-500" />
                <Label htmlFor={key} className="text-sm text-gray-700 cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Button - Always Visible */}
      <div className="mt-4 pt-4 border-t border-gray-200 bg-white">
        <Button className="w-full h-11 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
          <Search className="h-4 w-4 mr-2" />
          Search Properties
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute left-0 top-0 h-full w-80 bg-white transform transition-transform duration-300 shadow-2xl",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="p-6 h-full flex flex-col">
            <Button variant="ghost" size="sm" onClick={onToggle} className="absolute top-4 right-4 h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
            {sidebarContent}
          </div>
        </div>
      </div>

      {/* Desktop Filter Sidebar - Wider and Better Spaced */}
      <div className="hidden lg:flex flex-col bg-white border-r border-gray-200 lg:sticky lg:top-0 lg:w-[380px] lg:min-w-[380px] shadow-sm max-h-[100vh]">
        <div className="p-6 flex-1 overflow-y-auto">{sidebarContent}</div>
      </div>
    </>
  )
}

const PropertySearchView: React.FC<IPropertySearchViewProps> = (props) => {
  const { hotelsList, loadingState } = props
  const hotelsListRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()
  const [showMap, setShowMap] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    window.scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
      if (hotelsListRef.current) {
        hotelsListRef.current.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }, [])

  return (
    <div className="relative bg-gradient-to-br from-gray-50 via-white to-amber-50/20 min-h-screen">
      <div className="flex flex-col lg:flex-row min-h-screen max-w-[1800px] mx-auto">
        {/* Filter Sidebar */}
        <FilterSidebar isOpen={showFilters} onToggle={() => setShowFilters(!showFilters)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Properties List */}
          <div
            ref={hotelsListRef}
            className={cn(
              "flex-1 overflow-y-auto transition-all duration-500 ease-in-out px-4 py-6 lg:py-8 lg:px-8",
              showMap ? "lg:w-1/2" : "lg:w-full",
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8 sticky top-0 bg-white/90 backdrop-blur-sm z-10 py-4 -mx-4 px-4 lg:-mx-8 lg:px-8 border-b border-gray-100 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="outline"
                  size="sm"
                  className="lg:hidden border-amber-200 text-amber-700 hover:bg-amber-50 shadow-sm"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <div className="flex flex-col">
                  {hotelsList[0]?.location?.city && (
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                      Finest homes in{" "}
                      <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                        {hotelsList[0].location.city}
                      </span>
                    </h1>
                  )}
                  <p className="text-gray-600 text-sm mt-1 flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                    {hotelsList.length} properties found
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setShowMap(!showMap)}
                variant="outline"
                className="border-amber-200 text-amber-700 hover:bg-amber-50 font-medium px-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <MapPin className="h-4 w-4 mr-2" />
                {showMap ? "Hide map" : "Show map"}
              </Button>
            </div>

            {/* Properties Grid */}
            <div className="space-y-6">
              <FilterHotels hotels={hotelsList} isLoading={loadingState} loc={router.query} />
            </div>
          </div>

          {/* Map Section */}
          <div
            className={cn(
              "transition-all duration-500 ease-in-out overflow-hidden bg-white border-l border-gray-200 shadow-lg",
              showMap ? "lg:w-1/2 lg:block" : "lg:w-0 lg:hidden",
              "w-full h-[60vh] lg:h-auto",
            )}
          >
            <div className="h-full relative">
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-white/90 backdrop-blur-sm text-gray-700 shadow-md">
                  <MapPin className="h-3 w-3 mr-1" />
                  Interactive Map
                </Badge>
              </div>
              <SearchPropertyMap
                selectedCity={hotelsList[0]?.location.city || ""}
                data={hotelsList}
                loc={router.query}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertySearchView
