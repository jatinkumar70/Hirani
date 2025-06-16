"use client";
import React from "react";
import { DestinationImages } from "../../DestinationImages/DestinationImages";
import ImageGrid from "../../ImageGrid/ImageGrid";
import { ITrendingDestinationProps } from "./types/TrendingDestinationProps";
import Section from "../../../common/Section/Section";

const TrendingDestination: React.FC<ITrendingDestinationProps> = (props) => {
  const { title, description } = props;

  const heading = title === undefined ? "Explore Dubai" : title;

  return (
    <Section>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-center text-3xl font-semibold text-primary md:text-3xl">
            {heading}
          </h2>

          <p className="lg:block hidden mt-4 text-center text-sm md:text-lg text-secondary-dark  md:mt-0">
            {description}
          </p>
        </div>
      </div>
      {/* Services Grid */}
      <main className="mt-4">
        <ImageGrid
          topImages={DestinationImages.topRow}
          bottomImages={DestinationImages.bottomRow}
        />
      </main>
    </Section>
  );
};

export default TrendingDestination;
