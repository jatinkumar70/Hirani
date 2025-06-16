import { Images } from "../../../../asserts/Import/Images";
import Navbar from "../../../components/Common/Navbar/Navbar";
import PageSEO from "../../../components/SEO/PageSEO";
import { pageDescription, pageTitle } from "../../../constants/constants";
import PDFViewer from "../../../modules/PDFViewer/PDFViewer";

export default function BookingConfirmation() {
  return (
    <div>
      <PageSEO
        title={`Booking Confirmation - ${pageTitle}`}
        description={pageDescription}
        canonical="https://www.bnbmehomes.com/booking-confirmation"
        image={Images.homePage.src}
      />
      <Navbar />
      <main className="bg-white py-2">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <PDFViewer pdfPath="/bnbme_booking_confirm.pdf" />
          </div>
        </div>
      </main>
    </div>
  );
}
