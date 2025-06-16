import React from "react";
import PropertyListings from "../PropertyListing/PropertyListings";
import { IOtherPropertyProps } from "./types/OtherPropertyProps";
import Section from "../../common/Section/Section";
import PropertyList from "./components/PropertyList/PropertyList";
import { useRouter } from "next/router";

const OtherProperty: React.FC<IOtherPropertyProps> = (props) => {
  const { hotelData, SingleHotelData, title } = props;
  const heading = title === undefined ? "Explore Dubai" : title;
  const router = useRouter();

  return (
    <div className="pt-8 rtl:mb-2 mb-10 overflow-x-hidden">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-center text-gray-800 text-xl font-semibold text-primary md:text-3xl">
              {heading}
            </h2>

            <span className="text-sm">
              {SingleHotelData.location.city}, {SingleHotelData.location.area},{" "}
              {SingleHotelData.location.country}
            </span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="mt-4">
          <PropertyList propertyData={hotelData} loc={router.query} />
        </div>
      </div>
    </div>
  );
};

export default OtherProperty;
