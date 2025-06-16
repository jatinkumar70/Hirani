import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../components/ui/Carousel/Carousel"; // Import your Carousel components
import { hostsData } from "../../data/HostsData"; // Import the hosts data
import Image from "next/image";

const HostsCarousel: React.FC = () => {
  return (
    <div className="container w-4/5 mx-auto overflow-visible relative">
      <Carousel className="w-full" showIndicators={false}>
        {/* Navigation Buttons */}
        <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50" />
        <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-50" />

        {/* Carousel Content */}
        <CarouselContent className="flex space-x-4 px-2">
          {hostsData.map((host: any) => (
            <CarouselItem
              key={host.id}
              className="pl-1 basis-full lg:basis-1/4">
              <div className="w-full h-auto bg-white border rounded-lg overflow-hidden text-center">
                <Image
                  width={400}
                  height={300}
                  src={host.image}
                  alt={host.title}
                  className="w-3/5 mx-auto h-64 object-contain py-2"
                />
                <div className="p-4">
                  <h3 className="font-bold text-sm text-center">
                    {host.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 text-center">
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

export default HostsCarousel;
