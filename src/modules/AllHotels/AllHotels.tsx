"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Section from "../../common/Section/Section";
import HotelImageSection from "../../components/Core/HotelImageSection/HotelImageSection";
import HotelCard from "../../components/Core/PropertyCard/PropertyCard";
import CityHotelsSkeleton from "../../components/SkeletonLoaders/CityHotelsSkeleton";
import { Card, CardContent } from "../../components/ui/Card/Card";
import { Property } from "../../types/types";
import { api } from "../../utils/api";
import { EmptyState } from "../PropertySearchView/Components/EmptyState/EmptyState";

export default function AllHotels({
  hotelData,
  content,
  recordsData,
  cityName,
}: {
  hotelData: Property[];
  content: any;
  recordsData: number;
  cityName: string;
}) {
  const [hotelsData, setHotelsData] = useState<Property[]>(hotelData || []);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [loadedHotelIds, setLoadedHotelIds] = useState<Set<string>>(
    new Set(hotelData?.map((hotel) => hotel.id) || [])
  );

  const observerTarget = useRef<HTMLDivElement>(null);

  // ⬇️ Fetch hotels when cityName changes
  useEffect(() => {
    const fetchHotelsForCity = async () => {
      try {
        setIsLoading(true);
        setPage(2);
        setHasMore(true);

        const apiUrl =
          cityName === "Riyadh"
            ? `/property/search-property?radius=10&city=${cityName}`
            : `/property/search-property?radius=10&city=${cityName}&pageNo=1&itemPerPage=14`;

        const response = await api.get(apiUrl);

        const freshHotels = response.data.data || [];
        const newIds = new Set(freshHotels.map((hotel: Property) => hotel.id));

        setHotelsData(freshHotels);
        //@ts-ignore
        setLoadedHotelIds(newIds);
        setHasMore(freshHotels.length > 0);
      } catch (error) {
        console.error("Error fetching hotels for city:", error);
        setHotelsData([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotelsForCity();
    window.scrollTo(0, 0); // optional: scroll to top on city change
  }, [cityName, recordsData]);

  // Fetch more hotels on scroll (infinite load)
  const fetchMoreHotels = async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);

      const apiUrl =
        cityName === "Riyadh"
          ? `/property/search-property?radius=10&city=${cityName}`
          : `/property/search-property?radius=10&city=${cityName}&pageNo=${page}&itemPerPage=14`;

      const response = await api.get(apiUrl);

      if (!response?.data?.data) {
        setHasMore(false);
        return;
      }

      const newHotels = response.data.data || [];
      const uniqueNewHotels = newHotels.filter(
        (hotel: Property) => !loadedHotelIds.has(hotel.id)
      );

      if (uniqueNewHotels.length === 0) {
        setHasMore(false);
        return;
      }

      const newIds = new Set(loadedHotelIds);
      uniqueNewHotels.forEach((hotel: Property) => newIds.add(hotel.id));

      setHotelsData((prev) => [...prev, ...uniqueNewHotels]);
      setLoadedHotelIds(newIds);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching more hotels:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          fetchMoreHotels();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isLoading, hasMore, page, cityName]); // include cityName dependency too

  if (!hotelsData || hotelsData.length === 0) {
    return (
      <Section>
        <h1 className="text-3xl font-bold mb-1">{content.title}</h1>
        <p className="text-muted-foreground mb-8">{content.description}</p>
        <EmptyState
          icon="map"
          title="No Property Found"
          description="We couldn't find any properties matching your criteria. Try a different location."
        />
      </Section>
    );
  }

  return (
    <>
      <Section className="">
        <h1 className="text-3xl font-bold mb-1">{content.title}</h1>
        <p className="text-muted-foreground mb-8">{content.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  3xl:grid-cols-6 gap-4  mx-auto">
          {hotelsData?.map((hotel: Property) => {
            // Format title: show only text after "|" if present
            const formattedTitle = hotel.title.includes("|")
              ? hotel.title.split("|")[1].trim()
              : hotel.title;

            // Format location area: if "-" is present, take the substring after "-"
            // and remove the last word (e.g. "348R+QGV - JLT Cluster Jin" becomes "JLT Cluster")
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
                  <HotelImageSection hotel={hotel} slug="" />
                  <Link
                    href={`/property/${hotel.slug}?startDate=${hotel.from_date}&endDate=${hotel.to_date}&adults=2`}
                    key={hotel.id}
                    onClick={(e) => e.stopPropagation()}>
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
        {/* Loading indicator */}
        {isLoading && <CityHotelsSkeleton count={recordsData} />}

        {/* Observer target element */}
        <div
          ref={observerTarget}
          className="observer-element"
          style={{ height: "0px", margin: "20px 0" }}
        />
      </Section>
    </>
  );
}
