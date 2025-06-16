const SinglePropertyLoader = () => {
  return (
    <div className="w-full max-w-[1100px] mx-auto py-6 p-3">
      {/* Header Skeleton */}
      <div className="animate-pulse mb-6">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>

      {/* Tabs Skeleton */}
      <div className="animate-pulse flex mb-6">
        <div className="h-10 bg-gray-200 rounded w-1/3 mr-2"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3 mr-2"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3"></div>
      </div>

      {/* Image Gallery Skeleton */}
      <div className="animate-pulse mb-8">
        <div className="h-[400px] bg-gray-200 rounded-lg"></div>
      </div>

      {/* Content Skeleton */}
      <div className="flex flex-col md:flex-row items-start gap-10 pt-8">
        {/* Left Column */}
        <div className="w-full md:w-[65%] animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>

          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
        </div>

        {/* Right Column (Booking Widget) */}
        <div className="w-full md:w-[35%] animate-pulse">
          <div className="h-[500px] bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Map Section Skeleton */}
      <div className="animate-pulse my-8">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-[500px] bg-gray-200 rounded-lg"></div>
      </div>

      {/* Things to Know Skeleton */}
      <div className="animate-pulse my-8">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Other Properties Skeleton */}
      <div className="animate-pulse my-8">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="flex gap-4 overflow-x-auto">
          <div className="h-[200px] bg-gray-200 rounded-lg w-[250px] flex-shrink-0"></div>
          <div className="h-[200px] bg-gray-200 rounded-lg w-[250px] flex-shrink-0"></div>
          <div className="h-[200px] bg-gray-200 rounded-lg w-[250px] flex-shrink-0"></div>
          <div className="h-[200px] bg-gray-200 rounded-lg w-[250px] flex-shrink-0"></div>
        </div>
      </div>
    </div>
  );
};

export default SinglePropertyLoader;
