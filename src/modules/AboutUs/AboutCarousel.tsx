import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../components/ui/Carousel/Carousel"; // Import your Carousel components
import Image from "next/image";
import { aboutData } from "../../data/AboutData";

const AboutCarousel: React.FC = () => {
  return (
    <div className="container w-4/5 mx-auto overflow-visible relative">
      <Carousel className="w-full" showIndicators={false}>
        {/* Navigation Buttons */}
        <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50" />
        <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50" />

        {/* Carousel Content */}
        <CarouselContent className="flex space-x-4 px-2">
          {aboutData.map((host: any) => (
            <CarouselItem key={host.id} className="pl-1 lg:basis-1/4">
              <div className="w-full h-auto bg-white rounded-lg overflow-hidden">
                <Image
                  width={100}
                  height={100}
                  src={host.image}
                  alt={host.title}
                  className="w-3/5 mx-auto object-cover rounded-full"
                />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-sm">{host.title}</h3>
                  <p className="text-xs text-gray-600 mt-2">
                    {host.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default AboutCarousel;
