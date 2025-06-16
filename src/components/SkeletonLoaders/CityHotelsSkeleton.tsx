"use client";

import { Bath, Bed, BedDouble, Users } from "lucide-react";
import { Card, CardContent } from "../ui/Card/Card";
import { Skeleton } from "../ui/skeleton/skeleton";

export default function CityHotelsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="container mx-auto my-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  3xl:grid-cols-6 gap-4  mx-auto">
        {Array.from({ length: count }).map((_, index) => (
          <Card className="overflow-hidden" key={index}>
            <CardContent className="p-0">
              <div className="relative mb-1 h-[280px] ">
                <div className="absolute top-3 left-3 z-10">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="w-full rounded-xl h-[280px] " />
              </div>
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
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
