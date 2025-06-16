import Link from "next/link";
import HotelImageSection from "../../../../components/Core/HotelImageSection/HotelImageSection";
import HotelCard from "../../../../components/Core/PropertyCard/PropertyCard";
import FilterHotelsSkeleton from "../../../../components/SkeletonLoaders/FilterHotelsSkeleton";
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
    return <FilterHotelsSkeleton count={21} />;
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mx-auto">
        {hotels?.map((hotel: any) => {
          const searchParams = getSearchParams(loc);
          const defaultParams = `?startDate=${hotel.from_date}&endDate=${hotel.to_date}&adults=2`;

          const slug = `/property/${hotel.slug}${
            searchParams ? searchParams : defaultParams
          }`;

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
          return (
            <Card className="overflow-hidden rounded-xl" key={hotel.id}>
              <CardContent className="p-0">
                <HotelImageSection hotel={hotel} slug={slug} />
                <Link href={slug} onClick={(e) => e.stopPropagation()}>
                  <HotelCard
                    hotel={hotel}
                    formattedTitle={formattedTitle}
                    formattedArea={formattedArea}
                  />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
