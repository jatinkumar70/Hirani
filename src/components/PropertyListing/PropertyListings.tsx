"use client"

import Link from "next/link"
import type { Property } from "../../types/types"
import PropertyListingsSkeleton from "../SkeletonLoaders/PropertyListingsSkeleton"
import { Card, CardContent } from "../ui/Card/Card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/Carousel/Carousel"
import HotelCard from "../Core/PropertyCard/PropertyCard"
import HotelImageSection from "../Core/HotelImageSection/HotelImageSection"

export default function PropertyListings({
  propertyData,
}: {
  propertyData: Property[]
}) {
  if (!propertyData || propertyData.length === 0) {
    return <PropertyListingsSkeleton />
  }

  return (
    <div className="relative group/carousel w-full">
      <Carousel className="w-full max-w-screen-xl md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl mx-auto">
        <CarouselContent className="-ml-2 p-1 lg:-ml-6 lg:p-0">
          {propertyData.map((hotel: Property) => {
            // Format title: show only text after "|" if present
            const formattedTitle = hotel.title.includes("|") ? hotel.title.split("|")[1].trim() : hotel.title

            // Format location area: if "-" is present, take the substring after "-"
            // and remove the last word (e.g. "348R+QGV - JLT Cluster Jin" becomes "JLT Cluster")
            const formattedArea = hotel.location.area.includes("-")
              ? (() => {
                const afterDash = hotel.location.area.split("-")[1].trim()
                const words = afterDash.split(" ")
                return words.length > 1 ? words.slice(0, words.length - 1).join(" ") : afterDash
              })()
              : hotel.location.area

            return (
              <CarouselItem
                key={hotel.id}
                className="pl-2 md:pl-6 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/4 3xl:basis-1/4 group/item"
              >
                <Card className="overflow-hidden shadow-sm transition-all duration-300 bg-white h-full">
                  <div className="relative">
                    <HotelImageSection
                      hotel={hotel}
                      slug={`/property/${hotel.slug}?startDate=${hotel.from_date}&endDate=${hotel.to_date}&adults=2`}
                    />
                  </div>
                  <CardContent className="p-0 h-full">
                    <Link
                      href={`/property/${hotel.slug}?startDate=${hotel.from_date}&endDate=${hotel.to_date}&adults=2`}
                      key={hotel.id}
                      onClick={(e) => e.stopPropagation()}
                      className="block h-full"
                    >
                      <HotelCard hotel={hotel} formattedTitle={formattedTitle} formattedArea={formattedArea} />
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious
          className="opacity-0 group-hover/carousel:opacity-100 group-hover/item:opacity-100 p-1 rounded-full bg-primary-gold text-gray-100 hover:bg-primary-gold hover:text-gray-100 transition-opacity duration-300 pointer-events-auto lg:-left-[2.2rem] -left-[1rem] z-10"
          variant="secondary"
        />
        <CarouselNext
          className="shadow-xl opacity-0 group-hover/carousel:opacity-100 group-hover/item:opacity-100 p-1 rounded-full bg-primary-gold text-gray-100 hover:bg-primary-gold hover:text-gray-100 transition-opacity duration-300 pointer-events-auto lg:-right-[2.2rem] z-10"
          variant="secondary"
        />
      </Carousel>
    </div>
  )
}
