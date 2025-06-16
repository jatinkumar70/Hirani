import { NextSeo } from "next-seo";
import MyBookings from "../../modules/MyBookings/MyBookings";
import Navbar from "../../components/Common/Navbar/Navbar";
import { pageDescription, pageTitle } from "../../constants/constants";

export default function bookings() {
  return (
    <>
      <NextSeo
        title={`My Bookings - ${pageTitle}`}
        description={pageDescription}
        canonical="https://www.bnbmehomes.com/my-bookings"
        openGraph={{
          url: "https://www.bnbmehomes.com/my-bookings",
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: "https://www.bnbmehomes.com/my-bookings",
              width: 800,
              height: 600,
              alt: "My Bookings",
            },
          ],
        }}
      />
      <Navbar />
      <MyBookings />
    </>
  );
}
