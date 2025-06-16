"use client";
import React from "react";
import Amenities from "./amenities";
import FilterButton from "./components/filterButton";
import Section from "../../../common/Section/Section";

interface ISearchLink {
  isSearchLink: boolean;
}

const AmenitiesBar: React.FC<ISearchLink> = ({ isSearchLink }) => {
  return (
    <>
      <div className="border-b border-black/10 md:mt-16 mt-7"></div>
      <Section className="lg:mt-4 px-6 py-3 lg:py-0 flex flex-col md:flex-row items-center gap-4 justify-between">
        <Amenities isTrue={isSearchLink} />
        <div className="flex lg:hidden">
          <FilterButton />
        </div>
      </Section>
      {/* <div className="border-b border-black/20"></div> */}
    </>
  );
};

export default AmenitiesBar;
