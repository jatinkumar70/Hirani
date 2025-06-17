"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import CitySelectButton from "../../Core/CitySelectorButton/CitySelectButton";
import { IMapSectionProps } from "./types/MapSectionProps";
import { Button } from "../../ui/Button/Button";
import Link from "next/link";
import Section from "../../../common/Section/Section";
const HotelMapContainer = dynamic(
  () => import("../../Core/MapContainer/MapContainer"),
  {
    ssr: false,
  }
);

const MapSection: React.FC<IMapSectionProps> = (props) => {
  const {
    title,
    seeFullMap,
    northernIndia,
    northEastIndia,
    northernIndiaProperties = [],
    northEastIndiaProperties = [],
  } = props;

  const [selectedCity, setSelectedCity] = useState<string>("Northern India");

  const heading = title ?? "Explore Dubai";

  const handleCityToggle = (city: string) => {
    setSelectedCity(city);
  };

  // Show the correct properties based on selected city
  const filteredData =
    selectedCity === "Northern India" ? northernIndiaProperties : northEastIndiaProperties;

  return (
    <Section className="flex flex-col gap-3">
      <div className="flex items-center  justify-center lg:justify-between">
        <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-4">
          <h2 className="text-start lg:text-center text-3xl font-semibold text-gray-800">
            {heading}
          </h2>
          <CitySelectButton
            textOne={northernIndia}
            textTwo={northEastIndia}
            onToggle={handleCityToggle}
          />
        </div>
        <div className="hidden lg:flex items-center gap-3">
          {/* <Link
            href={{
              pathname: "/full-map",
              query: {
                selectedCity,
              },
            }}
            passHref
            className="flex items-center gap-2">
            <span className="text-base text-secondary-dark  font-semibold">
              {seeFullMap}
            </span>
            <GoArrowRight size={25} className="flex rtl:hidden" />
            <GoArrowLeft size={25} className="hidden rtl:inline-block" />
          </Link> */}
        </div>
      </div>

      {/* Services Grid */}
      <div className="mt-6">
        <HotelMapContainer selectedCity={selectedCity} data={filteredData} />
      </div>

      <div className="mt-4 lg:hidden block">
        <Link
          href={{
            pathname: "/full-map",
            query: {
              selectedCity,
            },
          }}
          passHref>
          <Button
            variant={"default"}
            size="lg"
            className="bg-black w-full py-7 flex gap-3 text-md">
            {seeFullMap}
            <GoArrowRight size={25} className="flex rtl:hidden" />
            <GoArrowLeft size={25} className="hidden rtl:inline-block" />
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default MapSection;
