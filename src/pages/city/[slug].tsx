import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Navbar from "../../components/Common/Navbar/Navbar";
import CityHotelsSkeleton from "../../components/SkeletonLoaders/CityHotelsSkeleton";
import { Property } from "../../types/types";
import { api } from "../../utils/api";
import { Images } from "../../../asserts/Import/Images";
import PageSEO from "../../components/SEO/PageSEO";

const AllHotels = dynamic(() => import("../../modules/AllHotels/AllHotels"), {
  ssr: false,
  loading: () => <CityHotelsSkeleton count={10} />,
});

export default function CityPage({
  allProperties,
  cityName,
  records,
}: {
  allProperties: Property[];
  cityName: string;
  records: number;
}) {
  // City-specific content
  const cityContent = {
    Dubai: {
      title: "Properties in Dubai",
      description:
        "Discover the best accommodations in Dubai for your next stay",
    },
    Riyadh: {
      title: "Properties in Riyadh",
      description:
        "Explore premium accommodations in Riyadh for your next visit",
    },
    London: {
      title: "Properties in London",
      description: "Discover the charm and history of the UK's capital city.",
    },
  };

  const content = cityContent[cityName as keyof typeof cityContent];

  if (!content) {
    return null;
  }
  return (
    <>
      {/* Next SEO Meta Tags */}

      <PageSEO
        title={content.title}
        description={content.description}
        canonical={`https://www.bnbmehomes.com/city/${cityName.toLowerCase()}`}
        image={Images.homePage.src}
      />
      <Navbar />

      <AllHotels
        hotelData={allProperties}
        content={content}
        recordsData={records}
        cityName={cityName}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  // Format city name with first letter uppercase and rest lowercase
  const cityName =
    typeof slug === "string"
      ? slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase()
      : "";

  try {
    const apiUrl = `/property/search-property?radius=10&city=${cityName}&pageNo=1&itemPerPage=14`;

    try {
      const response = await api.get(apiUrl);

      if (!response || !response.data) {
        return { props: { allProperties: [], cityName, records: 0 } };
      }

      return {
        props: {
          allProperties: response.data.data || [],
          cityName,
          records: response.data.currentRecords,
        },
      };
    } catch (error: any) {
      console.error("API fetch error:", error.message);
      return {
        props: {
          allProperties: [],
          cityName,
          records: 0,
        },
      };
    }
  } catch (error: any) {
    console.error("getServerSideProps error:", error.message);
    return {
      props: {
        allProperties: [],
        cityName,
        records: 0,
      },
    };
  }
};
