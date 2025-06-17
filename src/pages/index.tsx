"use client";

import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Images } from "../../asserts/Import/Images";
import Navbar from "../components/Common/Navbar/Navbar";
import DynamicLoader from "../components/DynamicLoader/DynamicLoader";
import HiddenHeading from "../components/HiddenHeading/HiddenHeading";
import AmenitiesBar from "../components/Home/Amenities/amenitiesBar";
import HotelsSection from "../components/Home/HotelsSection/HotelsSection";
import MapSection from "../components/Home/MapSection/MapSection";
import TrendingDestination from "../components/Home/TrendingDestination/TrendingDestination";
import WhyUsSection from "../components/Home/WhyUsSection/WhyUsSection";
import PageSEO from "../components/SEO/PageSEO";
import type { Property } from "../types/types";
import { api } from "../utils/api";

interface HomeProps {
  initialData: {
    dubaiProperties: Property[];
    riyadhProperties: Property[];
    londonProperties: Property[];
  };
}

const Home: NextPage<HomeProps> = ({ initialData }) => {
  const [dubaiProperties, setDubaiProperties] = useState<Property[]>(
    initialData.dubaiProperties
  );
  const [riyadhProperties, setRiyadhProperties] = useState<Property[]>(
    initialData.riyadhProperties
  );
  const [londonProperties, setLondonProperties] = useState<Property[]>(
    initialData.londonProperties
  );
  const [isLoading, setIsLoading] = useState(
    initialData.dubaiProperties.length === 0 &&
    initialData.riyadhProperties.length === 0 &&
    initialData.londonProperties.length === 0
  );

  //* Fetch additional data on the client side if needed
  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (dubaiProperties.length === 0) {
        try {
          const response = await api.get(
            `/property/search-property?radius=10&city=Dubai&pageNo=1&itemPerPage=8`
          );
          setDubaiProperties(response.data?.data ?? []);
        } catch (error) {
          console.error("Error fetching Dubai properties:", error);
        }
      }

      if (riyadhProperties.length === 0) {
        try {
          const response = await api.get(
            `/property/search-property?radius=50&city=Riyadh&pageNo=1&itemPerPage=8`
          );
          setRiyadhProperties(response.data?.data ?? []);
        } catch (error) {
          console.error("Error fetching Riyadh properties:", error);
        }
      }

      if (londonProperties.length === 0) {
        try {
          const response = await api.get(
            `/property/search-property?radius=50&city=London&pageNo=1&itemPerPage=8`
          );
          setLondonProperties(response.data?.data ?? []);
        } catch (error) {
          console.error("Error fetching London properties:", error);
        }
      }

      setIsLoading(false);
    };

    if (isLoading) {
      fetchAdditionalData();
    } else if (
      dubaiProperties.length > 0 &&
      riyadhProperties.length > 0 &&
      londonProperties.length > 0
    ) {
      //* If we have initial data but it's incomplete (missing fields), fetch complete data
      const needsCompleteData =
        !dubaiProperties[0].amenities ||
        (dubaiProperties[0].images.length > 0 &&
          dubaiProperties[0].images[0].paths.length < 2);

      if (needsCompleteData) {
        fetchAdditionalData();
      }
    }
  }, [dubaiProperties, riyadhProperties, londonProperties, isLoading]);

  return (
    <>
      <PageSEO
        title="Luxury Vacation Rentals in Dubai & Riyadh | bnbmehomes"
        description="Discover premium vacation rentals in Dubai and Riyadh. Experience luxury accommodations with exceptional amenities and personalized service at bnbmehomes."
        image={Images.homePage.src}
      />

      <HiddenHeading text="Luxury Vacation Rentals in Dubai" />

      {isLoading ? (
        <DynamicLoader />
      ) : (
        <>
          <Navbar />
          {/* <HeroSection /> */}
          <AmenitiesBar isSearchLink />

          <HotelsSection
            hotelData={dubaiProperties}
            title={"Explore Jaipur"}
            description={
              "Discover a blend of modern marvels and cultural heritage in the heart of the India."
            }
            filter="Dubai"
          />

          <HotelsSection
            hotelData={riyadhProperties}
            title={"Explore Shimla"}
            description={
              "Experience the rich history and vibrant modernity of Himachal's capital city."
            }
            filter="Riyadh"
          />

          {londonProperties.length > 0 && (
            <HotelsSection
              hotelData={londonProperties}
              title={"Explore Manali"}
              description={
                "Discover the charm and history of the Himachal's heaven."
              }
              filter="London"
            />
          )}
          <TrendingDestination
            title={"Trending Destinations"}
            description={
              "Uncover the hottest travel spots capturing everyone's attention this season."
            }
          />
          <MapSection
            title={"Search On the map"}
            // seeFullMap={"See full map"}
            northernIndia={"Northern India"}
            northEastIndia={"North-East India"}
            northernIndiaProperties={dubaiProperties}
            northEastIndiaProperties={riyadhProperties}
          />
          <WhyUsSection whyus={"Why us"} />
        </>
      )}
    </>
  );
};

export default Home;

//* Only include essential fields for initial render
const essentialPropertyFields = (properties: Property[]) => {
  return properties.map((property: Property) => {
    const optimizedImages = property.images.reduce((filtered, img) => {
      if (img.album_name === "Slider" || img.album_name === "Gallery") {
        //@ts-ignore
        filtered.push({
          album_name: img.album_name,
          paths: img.paths.slice(0, img.album_name === "Slider" ? 5 : 5),
        });
      } else if (filtered.length === 0 && img.paths && img.paths.length > 0) {
        //@ts-ignore
        filtered.push({
          album_name: img.album_name,
          paths: img.paths.slice(0, 5),
        });
      }
      return filtered;
    }, []);

    return {
      id: property.id,
      property_details_uuid: property.property_details_uuid,
      title: property.title,
      slug: property.slug,
      currency: property.currency,
      images: optimizedImages,
      location: property.location,
      details: {
        bedrooms: property.details.bedrooms,
        bathroom_full: property.details.bathroom_full,
        bathroom_half: property.details.bathroom_half,
        guests: property.details.guests,
        rating: property.details.rating,
        tag: property.details.tag,
      },
      non_refundable_price: property.non_refundable_price,
      booking_request: property.booking_request,
      from_date: property.from_date,
      to_date: property.to_date,
    };
  });
};

export async function getStaticProps() {
  try {
    //* Fetch minimal initial data for SEO and first render
    //* Reduce the number of items per page to minimize data size
    const [dubaiResponse, riyadhResponse, londonResponse] = await Promise.all([
      api.get(
        `/property/search-property?radius=10&city=Dubai&pageNo=1&itemPerPage=8`
      ),
      api.get(
        `/property/search-property?radius=50&city=Riyadh&pageNo=1&itemPerPage=8`
      ),
      api.get(`/property/search-property?radius=50&city=London`),
    ]);

    return {
      props: {
        initialData: {
          dubaiProperties: essentialPropertyFields(
            dubaiResponse.data?.data ?? []
          ),
          riyadhProperties: essentialPropertyFields(
            riyadhResponse.data?.data ?? []
          ),
          londonProperties: essentialPropertyFields(
            londonResponse.data?.data ?? []
          ),
        },
      },
      revalidate: 3600, //* Revalidate every hour
    };
  } catch (error) {
    console.error("API fetch error:", error);
    return {
      props: {
        initialData: {
          dubaiProperties: [],
          riyadhProperties: [],
          londonProperties: [],
        },
      },
      revalidate: 60, //* Retry sooner on error
    };
  }
}
