import Link from "next/link";
import HotelImageSection from "../../../../components/Core/HotelImageSection/HotelImageSection";
import FilterHotelsLongSkeleton from "../../../../components/SkeletonLoaders/FilterHotelsLongSkeleton";
import { Card, CardContent } from "../../../../components/ui/Card/Card";
import { Property } from "../../../../types/types";
import { EmptyState } from "../EmptyState/EmptyState";
interface IFilterData {
  hotels: Property[]; // Assuming this type is already defined
  isLoading?: boolean;
  loc: any;
}

export default function FilterHotels({ hotels, isLoading, loc }: IFilterData) {
  if (isLoading) {
    return <FilterHotelsLongSkeleton count={21} />;
  }

  if (!hotels || hotels.length === 0) {
    return (
      <>
        <EmptyState />
      </>
    );
  }

  const getSearchParams = (loc: {
    placeId?: string;
    startDate?: string;
    endDate?: string;
    adults?: number;
    adult?: number;
    kids?: number;
    kid?: number;
    infants?: number;
    infant?: number;
    pets?: number;
    pet?: number;
  }): string => {
    let params: string[] = [];

    if (loc.placeId) params.push(`placeId=${loc.placeId}`);
    if (loc.startDate) params.push(`startDate=${loc.startDate}`);
    if (loc.endDate) params.push(`endDate=${loc.endDate}`);

    // Helper to decide singular/plural param name
    const addCountParam = (
      value: number | undefined,
      singular: string,
      plural: string
    ) => {
      if (value !== undefined) {
        params.push(`${value > 1 ? plural : singular}=${value}`);
      }
    };

    addCountParam(loc.adults ?? loc.adult, "adult", "adults");
    addCountParam(loc.kids ?? loc.kid, "kid", "kids");
    addCountParam(loc.infants ?? loc.infant, "infant", "infants");
    addCountParam(loc.pets ?? loc.pet, "pet", "pets");

    return params.length > 0 ? `?${params.join("&")}` : "";
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-5 mx-auto">
        {hotels?.map((hotel: any) => {
          const searchParams = getSearchParams(loc);
          const defaultParams = `?startDate=${hotel.from_date}&endDate=${hotel.to_date}&adults=2`;
          const slug = `/property/${hotel.slug}${searchParams ? searchParams : defaultParams}`;

          const formattedTitle = hotel.title.includes("|")
            ? hotel.title.split("|")[1].trim()
            : hotel.title;
          const formattedArea = hotel.location.area.includes("-")
            ? (() => {
              const afterDash = hotel.location.area.split("-")[1].trim();
              const words = afterDash.split(" ");
              return words.length > 1
                ? words.slice(0, words.length - 1).join(" ")
                : afterDash;
            })()
            : hotel.location.area;

          // Mock rating and reviews if not present
          const rating = hotel.details.rating || 4.1;
          const reviewsCount = hotel.reviews_count || 3200;

          return (
            <Card className="overflow-visible rounded-xl w-full shadow-md border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300" key={hotel.id}>
              <CardContent className="p-0 flex flex-col md:flex-row w-full">
                {/* Left: Images */}
                <div className="md:w-2/5 w-full h-full flex-shrink-0">
                  <HotelImageSection hotel={hotel} slug={slug} />
                </div>
                {/* Right: Info */}
                <div className="flex-1 flex flex-col justify-between p-4">
                  {/* Top: Title, rating, location */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-2">{formattedTitle}</h2>
                      <div className="text-sm text-gray-600 mb-1">
                        {hotel.location.area} | {hotel.location.city}
                      </div>
                      <div className="text-xs text-gray-500">{hotel.description?.slice(0, 60)}...</div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">{rating.toFixed(1)}</span>
                      <span className="text-xs text-gray-500">{reviewsCount} Ratings</span>
                    </div>
                  </div>
                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="flex items-center bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium">
                      <span className="mr-1">🛁</span> Jacuzzi
                    </span>
                    <span className="flex items-center bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium">
                      <span className="mr-1">💆‍♂️</span> Spa
                    </span>
                    <span className="flex items-center bg-gray-100 text-blue-700 rounded-full px-3 py-1 text-xs font-medium cursor-pointer">
                      &amp; more
                    </span>
                  </div>
                  {/* Features (like couple friendly, free cancellation, etc.) */}
                  <div className="flex flex-wrap gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1 text-black font-medium">
                      <span>•</span> Couple Friendly
                    </div>
                    <div className="flex items-center gap-1 text-gray-700">
                      <span>✔</span> Free Cancellation
                    </div>
                    <div className="flex items-center gap-1 text-gray-700">
                      <span>✔</span> Book @ ₹0 available
                    </div>
                    <div className="flex items-center gap-1 text-gray-700">
                      <span>✔</span> Breakfast available at extra charges
                    </div>
                  </div>
                  {/* Bottom: Price and CTA */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-2 border-t pt-4">
                    <div className="flex flex-col md:flex-row md:items-end gap-2">
                      <div className="text-gray-400 line-through text-sm">₹4,000</div>
                      <div className="text-2xl font-bold text-gray-900">₹3,600</div>
                      <div className="text-xs text-gray-500">+₹432 taxes &amp; fees per night</div>
                    </div>
                    <Link href={slug} className="text-gray-800 font-semibold hover:underline text-sm md:text-base mt-2 md:mt-0 md:ml-4">
                      Login now &amp; save more
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
