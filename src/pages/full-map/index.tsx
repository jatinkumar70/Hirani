import "leaflet/dist/leaflet.css";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Navbar from "../../components/Common/Navbar/Navbar";
import { api } from "../../utils/api";
import { pageDescription, pageTitle } from "../../constants/constants";
import { Images } from "../../../asserts/Import/Images";
const DynamicMap = dynamic(
  () => import("../../modules/DynamicMap/DynamicMap"),
  {
    ssr: false,
  }
);

export default function FullMap({ allProperties }: any) {
  const router = useRouter();
  const selectedCity = router.query.selectedCity ?? "";

  return (
    <>
      <NextSeo
        title={`Full map - ${pageTitle}`}
        description={pageDescription}
        canonical="https://www.bnbmehomes.com/full-map"
        openGraph={{
          url: "https://www.bnbmehomes.com/full-map",
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: Images.homePage.src,
              width: 800,
              height: 600,
              alt: "Full map",
              type: "image/png",
            },
          ],
        }}
      />
      <Navbar />
      <div className="h-screen w-screen">
        <DynamicMap
          selectedCity={selectedCity as string}
          // language={language}
          isFullScreen={true}
          hotelMapData={allProperties}
        />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const validCities = ["Dubai", "Riyadh"];
  const selectedCity = query.selectedCity as string;
  const cityName =
    typeof selectedCity === "string"
      ? selectedCity.charAt(0).toUpperCase() +
        selectedCity.slice(1).toLowerCase()
      : "";

  // Validate city name
  if (!validCities.includes(cityName)) {
    return {
      notFound: true,
    };
  }
  try {
    const apiUrl = `/property/search-property?radius=5&city=${cityName}`;
    try {
      const response = await api.get(apiUrl);

      if (!response || !response.data) {
        return { props: { allProperties: [] } };
      }

      return {
        props: {
          allProperties: response.data.data || [],
          cityName,
        },
      };
    } catch (error: any) {
      console.error("API fetch error:", error.message);
      return {
        props: {
          allProperties: [],
          cityName,
        },
      };
    }
  } catch (error: any) {
    console.error("getServerSideProps error:", error.message);
    return {
      props: {
        allProperties: [],
        cityName,
      },
    };
  }
};
