import React from "react";
import Section from "../../common/Section/Section";

const MapContainerLoader: React.FC = () => {
  return (
    <Section className="flex flex-col gap-3">
      <div className="lg:h-[87vh] rounded-2xl flex flex-col overflow-hidden">
        {Array.from({ length: 1 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-300 animate-pulse lg:h-full h-[700px] w-full rounded-xl"></div>
        ))}
      </div>
    </Section>
  );
};

export default MapContainerLoader;
