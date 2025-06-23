"use client";

import { Card, CardContent } from "../ui/Card/Card";
import { Skeleton } from "../ui/skeleton/skeleton";

export default function FilterHotelsLongSkeleton({
  count = 6,
}: {
  count?: number;
}) {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-5 mx-auto">
        {Array.from({ length: count }).map((_, index) => (
          <Card className="overflow-visible rounded-xl w-full shadow-md border border-gray-200 bg-white" key={index}>
            <CardContent className="p-0 flex flex-col md:flex-row w-full">
              {/* Left: Image skeleton */}
              <div className="md:w-2/5 w-full flex-shrink-0">
                <div className="relative h-[280px] md:h-full">
                  <Skeleton className="w-full h-full rounded-l-xl" />
                </div>
              </div>
              
              {/* Right: Content skeleton */}
              <div className="flex-1 flex flex-col justify-between p-4 md:p-6 gap-2">
                {/* Top: Title, rating, location */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-1" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <Skeleton className="h-6 w-12 rounded" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
                
                {/* Amenities skeleton */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                
                {/* Features skeleton */}
                <div className="flex flex-wrap gap-4 mt-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-36" />
                </div>
                
                {/* Bottom: Price and CTA skeleton */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-2 border-t pt-4">
                  <div className="flex flex-col md:flex-row md:items-end gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-6 w-32 mt-2 md:mt-0 md:ml-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 