import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import ConfirmationPage from "../../modules/ReservationBookingPage/components/CheckoutComplete/CheckOutComplete";
import ErrorPage from "../../modules/PaymentPage/ErrorPage";

const PaymentStatusPage = () => {
  const router = useRouter();
  const { status, ...queryParams } = router.query;

  return (
    <>
      <NextSeo title={`Payment ${status}`} description={`Payment ${status}`} />

      {status === "success" ? (
        <ConfirmationPage RecordUUID={queryParams} />
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default PaymentStatusPage;
