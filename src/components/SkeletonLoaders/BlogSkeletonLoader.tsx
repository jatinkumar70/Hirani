import Section from "../../common/Section/Section";
import { Skeleton } from "../ui/skeleton/skeleton";

export const BlogSkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Skeleton */}
      <div className="relative h-[300px] mb-12 rounded-2xl overflow-hidden bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full mx-auto text-center space-y-6">
            <Skeleton className="h-8 w-48 bg-gray-300 mx-auto" />
            <Skeleton className="h-16 w-full max-w-2xl bg-gray-300 mx-auto" />
            <Skeleton className="h-6 w-full max-w-xl bg-gray-300 mx-auto" />
          </div>
        </div>
      </div>

      <div className="w-full mx-auto">
        <div className="flex flex-col items-center mb-16">
          <Skeleton className="h-12 w-64 bg-gray-300 mb-4" />
          <Skeleton className="h-6 w-96 bg-gray-300" />
        </div>

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <Skeleton className="h-64 w-full bg-gray-300" />
                <div className="p-6">
                  <Skeleton className="h-7 w-full bg-gray-300 mb-3" />
                  <Skeleton className="h-4 w-full bg-gray-300 mb-2" />
                  <Skeleton className="h-4 w-full bg-gray-300 mb-2" />
                  <Skeleton className="h-4 w-2/3 bg-gray-300 mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-24 bg-gray-300" />
                    <Skeleton className="h-5 w-24 bg-gray-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
};
