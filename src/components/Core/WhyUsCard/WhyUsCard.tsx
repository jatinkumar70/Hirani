import React from "react";
import Section from "../../../common/Section/Section";

interface WhyUsProps {
  items: any;
  title: string; // Array of items to display
}

const WhyUs: React.FC<WhyUsProps> = ({ items, title }) => {
  return (
    <Section>
      <h2 className="text-4xl md:text-2xl  text-gray-800 font-bold mb-3">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-1 lg:p-0">
        {items.map((item: any, index: number) => (
          <div
            key={index}
            className="flex flex-col lg:items-start lg:gap-0 gap-2 justify-center text-start">
            <div className="text-xl lg:text-4xl text-gray-700 mb-2">
              {item.icon}
            </div>
            <h3 className="text-sm text-gray-800 lg:text-xl md:text-lg font-semibold mb-2">
              {item.title}
            </h3>
            <p className="text-base md:text-sm text-gray-500">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default WhyUs;
