"use client";

import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Images } from "../../../asserts/Import/Images";
import Topbar from "../../components/Common/Topbar/Topbar";
import HiddenHeading from "../../components/HiddenHeading/HiddenHeading";
import PageSEO from "../../components/SEO/PageSEO";
import FloatingWhatsAppButton from "../../components/whatsapp/FloatingWhatsAppButton ";
import PropertySearchView from "../../modules/PropertySearchView/PropertySearchView";
import type { Property } from "../../types/types";
import { server_base_api } from "../../utils/api";

export default function ProductSearch() {
  const router = useRouter();
  const [hotelsListData, setHotelsListData] = useState<Property[]>([]);
  const [propertyRecords, setPropertyRecords] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Memoized function to generate query parameters
  const getQueryParams = useCallback(() => {
    const {
      placeId,
      startDate,
      endDate,
      minimum,
      maximum,
      bedrooms,
      beds,
      bathroom,
      amenitie,
    } = router.query;

    const queryParams: string[] = [];

    if (placeId) queryParams.push(`place_id=${placeId}`);
    if (startDate) queryParams.push(`from_date=${startDate}`);
    if (endDate) queryParams.push(`to_date=${endDate}`);
    if (minimum) queryParams.push(`min=${minimum}`);
    if (maximum) queryParams.push(`max=${maximum}`);
    if (bedrooms) {
      const bedroomValue = bedrooms === "Studio" ? 0 : bedrooms;
      queryParams.push(`bedrooms=${bedroomValue}`);
    }
    if (beds) queryParams.push(`total_beds=${beds}`);
    if (bathroom) queryParams.push(`bathroom_full=${bathroom}`);

    // Convert amenities query param to array for filtering
    let amenityList: string[] = [];
    if (amenitie) {
      if (Array.isArray(amenitie)) {
        amenityList = amenitie;
      } else {
        amenityList = [amenitie];
      }
    }

    return queryParams.length > 0 ? `&${queryParams.join("&")}` : "";
  }, [router.query]);

  // Fetch hotels with debounced effect
  useEffect(() => {
    if (!router.isReady) return;

    const fetchHotels = async () => {
      setIsLoading(true);

      const queryParams = getQueryParams(); // string starting with `&`
      const urlSearchParams = new URLSearchParams(queryParams);
      const placeId = urlSearchParams.get("place_id");

      const dubaiId = "ChIJRcbZaklDXz4RYlEphFBu5r0";
      const riyadhId = "ChIJmZNIDYkDLz4R1Z_nmBxNl7o";

      // decide radius based on placeId
      const radius = placeId === dubaiId || placeId === riyadhId ? 50 : 10;

      // build final API URL
      const apiUrl = `/property/search-property?radius=${radius}${queryParams}`;

      try {
        const res = await server_base_api.get(apiUrl);
        setPropertyRecords(res.data.currentRecords);
        console.log(res, "========");

        setHotelsListData(res.data.data || []);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, [router.isReady, getQueryParams]);

  return (
    <div className="-mt-3 overflow-hidden">
      <PageSEO
        title="Search - Bnbme Your Homes - Book Your Dream Getaway Today"
        description={
          "Search and discover luxury vacation rentals and serviced apartments with bnbmehomes. Filter by location, dates, and amenities to find your perfect stay in Dubai or Riyadh."
        }
        canonical="https://www.bnbmehomes.com/search?"
        image={Images.homePage.src}
      />
      <HiddenHeading text="Find Your Ideal Stay in Dubai" />

      {/* Use Topbar for both mobile and desktop since we have a dedicated filter sidebar */}
      <Topbar />

      <PropertySearchView
        hotelsList={hotelsListData}
        loadingState={isLoading}
        propertyRecords={propertyRecords}
      />
      <FloatingWhatsAppButton />
    </div>
  );
}
