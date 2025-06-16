import React from "react";
import Section from "../../common/Section/Section";

const TrendingDestinationsLoader: React.FC = () => {
  return (
    <Section className="flex flex-col gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 animate-pulse h-[380px] w-full rounded-xl"></div>
        ))}
      </div>

      {/* Bottom row - 33/33/33 split */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 animate-pulse aspect-[4/3] w-full rounded-xl"></div>
        ))}
      </div>
    </Section>
  );
};

export default TrendingDestinationsLoader;
