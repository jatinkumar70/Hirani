import dynamic from "next/dynamic";
import React, { useState } from "react";
import { IPropertyMapSectionProps } from "./types/PropertyMapSectionProps";
const PropertyMap = dynamic(() => import("../../../PropertyMap/PropertyMap"), {
  ssr: false,
});

const PropertyMapSection: React.FC<IPropertyMapSectionProps> = (props) => {
  const { title, data } = props;

  const [selectedCity, setSelectedCity] = useState<string>("Dubai");

  const heading = title === undefined ? "Where you'll be" : title;

  return (
    <section className="pt-0 lg:pt-4" id="map">
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-center text-xl font-semibold text-primary md:text-3xl">
              {heading}
            </h2>

            <span>
              {data.location.city}, {data.location.area},{" "}
              {data.location.country}
            </span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="my-4">
          <PropertyMap selectedCity={selectedCity} data={data} />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col items-start gap-1">
            <span className="text-center text-xl font-semibold text-primary md:text-xl">
              {data.neighbourhoodHighlights}
            </span>
            {/* <span className="text-sm my-4 w-2/3">{arbicContent.description}</span> */}

            {/* <Button
              className="w-auto my-2 text-gray-800 border-2"
              variant={"outline"}
              size="sm">
              see more
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyMapSection;
