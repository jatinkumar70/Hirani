import { NextSeo } from "next-seo";
import { ReservationBookingPage } from "../../modules/ReservationBookingPage/ReservationBookingPage";
import { convertObjectToStringRecord } from "../../utils";
import { api } from "../../utils/api";
import { GetServerSideProps } from "next";
import { Property } from "../../types/types";
import Navbar from "../../components/Common/Navbar/Navbar";

const ReservationBooking = ({
  singleHotelDetails,
}: {
  singleHotelDetails: Property;
}) => {
  return (
    <>
      <NextSeo
        title="Reservation Booking of Hotel"
        description="Reservation Booking of Hotel"
      />
      <Navbar />
      <div className="bg-[#FAFAFA]">
        <ReservationBookingPage BookHotelData={singleHotelDetails} />
      </div>
    </>
  );
};

export default ReservationBooking;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    if (!slug) {
      return { props: { singleHotelDetails: null } };
    }

    const queryParams = convertObjectToStringRecord({
      obj: { pageNo: 1, itemPerPage: 10 },
    });
    const apiUrl = `/property/get-property?slug=${slug}&is_transform_data=true&${queryParams}`;

    // Fetch data with error handling
    const response = await api.get(apiUrl).catch(() => null);
    const singleHotelDetails = response?.data?.data?.[0] || null;

    return {
      props: { singleHotelDetails },
    };
  } catch (error: any) {
    console.error("getServerSideProps error:", error.message);
    return { props: { singleHotelDetails: null } };
  }
};
