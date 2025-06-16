"use client";

import { Bath, Bed, BedDouble, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/Carousel/Carousel";
import { Card, CardContent } from "../ui/Card/Card";
import { Skeleton } from "../ui/skeleton/skeleton";

export default function PropertyListingsSkeleton({
  count = 5,
}: {
  count?: number;
}) {
  return (
    <Carousel className="container mx-auto my-6">
      <CarouselContent className="-ml-2 md:-ml-4">
        {Array.from({ length: count }).map((_, index) => (
          <CarouselItem
            key={index}
            className="pl-2 md:pl-6 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 3xl:basis-1/6">
            <div className="relative mb-2 h-[280px] rounded-xl">
              <Skeleton className="h-full w-full rounded-xl" />
              <div className="absolute top-3 left-3 z-10">
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="absolute top-3 right-3 z-10">
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-1 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="flex items-center justify-between">
                    {[Bed, BedDouble, Users, Bath].map((Icon, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <Skeleton className="h-6 w-6 rounded" />
                        <Skeleton className="h-4 w-12" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 justify-between pt-2 border-t">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
