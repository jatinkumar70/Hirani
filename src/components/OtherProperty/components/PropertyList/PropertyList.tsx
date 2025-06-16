"use client";

import Link from "next/link";
import { Property } from "../../../../types/types";
import HotelImageSection from "../../../Core/HotelImageSection/HotelImageSection";
import HotelCard from "../../../Core/PropertyCard/PropertyCard";
import PropertyListingsSkeleton from "../../../SkeletonLoaders/PropertyListingsSkeleton";
import { Card, CardContent } from "../../../ui/Card/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../ui/Carousel/Carousel";

export default function PropertyList({
  propertyData,
  loc,
}: {
  propertyData: Property[];
  loc: any;
}) {
  if (!propertyData || propertyData.length === 0) {
    return <PropertyListingsSkeleton />;
  }

  const getSearchParams = (loc: {
    placeId?: string;
    startDate?: string;
    endDate?: string;
    adults?: number;
    kids?: number;
    infants?: number;
    pets?: number;
  }): string => {
    let params: string[] = [];

    if (loc.placeId) params.push(`placeId=${loc.placeId}`);
    if (loc.startDate) params.push(`startDate=${loc.startDate}`);
    if (loc.endDate) params.push(`endDate=${loc.endDate}`);
    if (loc.adults) params.push(`adults=${loc.adults}`);
    if (loc.kids) params.push(`kids=${loc.kids}`);
    if (loc.infants) params.push(`infants=${loc.infants}`);
    if (loc.pets) params.push(`pets=${loc.pets}`);

    return params.length > 0 ? `?${params.join("&")}` : "";
  };

  const seenIds = new Set();
  const uniqueHotels = propertyData.filter((hotel: Property) => {
    if (seenIds.has(hotel.id)) return false;
    seenIds.add(hotel.id);
    return true;
  });
  return (
    <Carousel className="w-full group/carousel max-w-screen-3xl mx-auto">
      <CarouselContent className="-ml-2 p-1 lg:-ml-6 lg:p-0">
        {uniqueHotels.map((hotel: Property) => {
          const searchParams = getSearchParams(loc);
          const defaultParams = `?startDate=${hotel.from_date}&endDate=${hotel.to_date}&adults=2`;
          const slug = `/property/${hotel.slug}${
            searchParams ? searchParams : defaultParams
          }`;

          const formattedTitle = hotel.title.includes("|")
            ? hotel.title.split("|")[1].trim()
            : hotel.title;

          // Format location area: if "-" is present, take the substring after "-"
          // and remove the last word (e.g. "348R+QGV - JLT Cluster Jin" becomes "JLT Cluster")
          const formattedArea = hotel.location.area.includes("-")
            ? (() => {
                const afterDash = hotel.location.area.split("-")[1].trim();
                const words = afterDash.split(" ");
                return words.length > 1
                  ? words.slice(0, words.length - 1).join(" ")
                  : afterDash;
              })()
            : hotel.location.area;
          return (
            <CarouselItem
              key={hotel.id}
              className="pl-2 md:pl-6 sm:basis-1/2 md:basis-1/2 lg:basis-1/4">
              <HotelImageSection hotel={hotel} slug={slug} />
              <Card className="overflow-hidden mt-12 lg:mt-6">
                <CardContent className="p-0">
                  <Link
                    href={slug}
                    key={hotel.id}
                    onClick={(e) => e.stopPropagation()}>
                    <HotelCard
                      hotel={hotel}
                      formattedTitle={formattedTitle}
                      formattedArea={formattedArea}
                    />
                  </Link>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious
        className="opacity-100 lg:opacity-0 group-hover/carousel:opacity-100 group-hover/item:opacity-100 p-1 rounded-full bg-primary-gold text-gray-100 hover:bg-primary-gold hover:text-gray-100 transition-opacity duration-300 pointer-events-auto -left-[2.2rem] z-10"
        variant="secondary"
      />
      <CarouselNext
        className="shadow-xl opacity-100 lg:opacity-0 group-hover/carousel:opacity-100 group-hover/item:opacity-100 p-1 rounded-full bg-primary-gold text-gray-100 hover:bg-primary-gold hover:text-gray-100 transition-opacity duration-300 pointer-events-auto -right-[2.2rem] z-10"
        variant="secondary"
      />
    </Carousel>
  );
}
