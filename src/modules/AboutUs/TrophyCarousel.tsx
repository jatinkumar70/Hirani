import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/Carousel/Carousel";
import { TrophyData } from "../../data/TrophyData";
import Image from "next/image";

const TrophyCarousel: React.FC = () => {
  return (
    <div className="container w-4/5 mx-auto overflow-visible relative mb-10">
      <Carousel className="w-full" showIndicators={false}>
        {/* Navigation Buttons */}
        <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50" />
        <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50" />

        {/* Carousel Content */}
        <CarouselContent className="flex space-x-4 px-2">
          {TrophyData.map((host: any) => (
            <CarouselItem key={host.id} className="pl-1 basis-full lg:basis-1/4">
              <div className="w-full h-auto bg-white rounded-lg overflow-hidden">
                <Image
                  width={200}
                  height={200}
                  src={host.image}
                  alt={host.title}
                  className="w-full h-40 object-contain"
                />
                <div className="p-2">
                  {/* <h3 className="font-bold text-sm">{host.title}</h3>
                  <p className="text-xs text-gray-600 mt-2">
                    {host.description}
                  </p> */}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default TrophyCarousel;
