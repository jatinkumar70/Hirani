import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Images } from "../../../asserts/Import/Images";
import Navbar from "../../components/Common/Navbar/Navbar";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import ErrorFallback from "../../components/ErrorFallback/ErrorFallback";
import PageSEO from "../../components/SEO/PageSEO";
import SinglePropertyLoader from "../../components/SkeletonLoaders/SinglePropertyLoader";
import SinglePropertyPage from "../../modules/SinglePropertyPage/SinglePropertyPage";
import { Property } from "../../types/types";
import { convertObjectToStringRecord } from "../../utils";
import { api } from "../../utils/api";

const SingleProperty = ({
  singleHotelDetails,
  AllHotelsDetails,
}: {
  singleHotelDetails: Property | null;
  AllHotelsDetails: Property[] | null;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a short delay to ensure hydration is complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const formattedTitle = singleHotelDetails?.title.includes("|")
    ? singleHotelDetails?.title.split("|")[1].trim()
    : singleHotelDetails?.title;
  return (
    <>
      <PageSEO
        title={`${"Property"} - ${formattedTitle}` || "Property"}
        description={singleHotelDetails?.description || "Property details"}
        canonical={`https://www.bnbmehomes.com//property/${singleHotelDetails?.slug}?startDate=${singleHotelDetails?.from_date}&endDate=${singleHotelDetails?.to_date}&adults=2`}
        image={Images.homePage.src}
      />
      <Navbar />
      <div className="lg:pt-6">
        <ErrorBoundary
          fallback={
            <ErrorFallback
              title="Something went wrong"
              message="We're having trouble displaying this property. Please try again later."
            />
          }>
          {isLoading ? (
            <SinglePropertyLoader />
          ) : (
            <SinglePropertyPage
              singlePropertyDetails={singleHotelDetails}
              allProperties={AllHotelsDetails ?? []}
            />
          )}
        </ErrorBoundary>
      </div>
    </>
  );
};

export default SingleProperty;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
}) => {
  try {
    const slug = params?.slug as string;
    if (!slug) {
      return { props: { singleHotelDetails: null, AllHotelsDetails: null } };
    }

    // If there are no date parameters, add them
    if (!query.startDate || !query.endDate) {
      // Get current date
      const today = new Date();

      // Set start date to next month
      const startDate = new Date(today);
      startDate.setMonth(startDate.getMonth() + 1);

      // Set end date to 10 days after start date
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 2);

      // Format dates as YYYY-MM-DD
      const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      return {
        redirect: {
          destination: `/property/${slug}?startDate=${formatDate(
            startDate
          )}&endDate=${formatDate(endDate)}&adults=${query.adults || 2}&kids=${
            query.kids || 0
          }&infants=${query.infants || 0}&pets=${query.pets || 0}&guestCounts=${
            query.guestCounts || "2 adults"
          }`,
          permanent: false,
        },
      };
    }

    const allPageQuery = { pageNo: 1, itemPerPage: 10 };
    const queryParams = convertObjectToStringRecord({ obj: allPageQuery });

    const [propertyResponse, allPropertiesResponse] = await Promise.allSettled([
      api.get(
        `/property/get-property?slug=${slug}&is_transform_data=true&${queryParams}`
      ),
      api.get(`/property/search-property?${queryParams}`),
    ]);

    const singleHotelDetails =
      propertyResponse.status === "fulfilled" &&
      propertyResponse.value?.data?.data?.[0]
        ? propertyResponse.value.data.data[0]
        : null;

    const AllHotelsDetails =
      allPropertiesResponse.status === "fulfilled" &&
      allPropertiesResponse.value?.data?.data
        ? allPropertiesResponse.value.data.data
        : [];

    return {
      props: {
        singleHotelDetails,
        AllHotelsDetails,
      },
    };
  } catch (error: any) {
    console.error("getServerSideProps error:", error.message);
    return {
      props: {
        singleHotelDetails: null,
        AllHotelsDetails: null,
      },
    };
  }
};
