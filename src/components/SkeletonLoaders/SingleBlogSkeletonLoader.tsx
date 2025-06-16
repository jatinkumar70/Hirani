import { Skeleton } from "../ui/skeleton/skeleton";

export const SingleBlogSkeletonLoader = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden bg-gray-100">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-100 animate-pulse"></div>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-3xl">
            <Skeleton className="h-4 w-32 bg-gray-300 mb-6" />
            <div className="flex gap-3 mb-4">
              <Skeleton className="h-6 w-24 rounded-full bg-gray-300" />
              <Skeleton className="h-6 w-20 rounded-full bg-gray-300" />
            </div>
            <Skeleton className="h-12 w-full bg-gray-300 mb-4" />
            <Skeleton className="h-12 w-3/4 bg-gray-300 mb-6" />
            <div className="flex gap-6">
              <Skeleton className="h-5 w-32 bg-gray-300" />
              <Skeleton className="h-5 w-24 bg-gray-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-8 py-4 border-b border-gray-100">
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 bg-gray-200" />
                <Skeleton className="h-8 w-20 bg-gray-200" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
                <Skeleton className="h-6 w-16 rounded-full bg-gray-200" />
              </div>
            </div>

            <div className="space-y-6">
              <Skeleton className="h-6 w-full bg-gray-200" />
              <Skeleton className="h-6 w-full bg-gray-200" />
              <Skeleton className="h-6 w-5/6 bg-gray-200" />
              <Skeleton className="h-40 w-full bg-gray-200" />
              <Skeleton className="h-6 w-full bg-gray-200" />
              <Skeleton className="h-6 w-full bg-gray-200" />
              <Skeleton className="h-6 w-4/6 bg-gray-200" />
            </div>

            <div className="mt-16 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-32 w-full bg-gray-100 rounded-lg" />
              <Skeleton className="h-32 w-full bg-gray-100 rounded-lg" />
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <Skeleton className="h-64 w-full bg-gray-100 rounded-xl mb-8" />
            <Skeleton className="h-96 w-full bg-gray-100 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
