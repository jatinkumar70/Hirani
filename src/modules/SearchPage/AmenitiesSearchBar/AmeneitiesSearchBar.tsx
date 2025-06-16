"use client";
import React from "react";
import FilterButton from "../../../components/Home/Amenities/components/filterButton";
import SearchAmenities from "../components/SearchAmenities/SearchAmenities";

const AmenitiesSearchBar: React.FC = () => {
  return (
    <>
      <section className="w-full mt-24 lg:mt-10 flex flex-col md:flex-row items-center gap-4 justify-between">
        <SearchAmenities />
        <div className="flex lg:hidden">
          <FilterButton />
        </div>
      </section>
      <div className="border-b-2 border-black/20 mt-2 md:mt-0"></div>
    </>
  );
};

export default AmenitiesSearchBar;
