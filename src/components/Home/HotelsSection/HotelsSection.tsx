"use client";
import type React from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import PropertyListings from "../../PropertyListing/PropertyListings";
import type { IHotelsSectionProps } from "./types/HotelsSectionProps";
import { MapPin } from "lucide-react";
import Section from "../../../common/Section/Section";
import { Button } from "../../ui/Button/Button";
import Link from "next/link";
import { Property } from "../../../types/types";

const HotelsSection: React.FC<IHotelsSectionProps> = ({
  hotelData,
  title,
  description,
  citySlug,
  filter,
}) => {
  const heading = title ?? "Explore Dubai";

  // Determine city slug based on title if not explicitly provided
  const determineCitySlug = () => {
    if (citySlug) return citySlug;

    // Default logic to determine city from title
    if (heading.toLowerCase().includes("dubai")) return "dubai";
    if (heading.toLowerCase().includes("riyadh")) return "riyadh";
    if (heading.toLowerCase().includes("london")) return "london";

    // Default fallback
    return "dubai";
  };

  const targetCitySlug = determineCitySlug();

  const filteredHotels = hotelData?.some(
    (hotel: Property) => hotel.location.city === filter
  )
    ? hotelData.filter((hotel: Property) => hotel.location.city === filter)
    : hotelData.filter((hotel: Property) => hotel.location.city === filter);

  return (
    <Section>
      <div className="flex items-center justify-between gap-2">
        <div className="flex lg:hidden items-center gap-3 cursor-pointer text-lg sm:text-xl font-semibold">
          <MapPin className="text-primary" size={24} />
          <span className="text-gray-700 text-xl sm:text-2xl">{heading}</span>
        </div>
        <div className="hidden lg:flex flex-col items-start">
          <h2 className="text-xl md:text-3xl text-gray-800 font-semibold text-primary">
            {heading}
          </h2>
          <p className="mt-2 text-sm md:text-lg text-secondary-dark">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href={`/city/${targetCitySlug}`} passHref>
            <Button className="text-base text-secondary-dark  gap-2">
              {"View All"}
              <GoArrowRight size={20} className="rtl:hidden" />
              <GoArrowLeft size={20} className="hidden rtl:inline-block" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Property Listings */}
      <div className="mt-4">
        <PropertyListings propertyData={filteredHotels} />
      </div>
    </Section>
  );
};

export default HotelsSection;
