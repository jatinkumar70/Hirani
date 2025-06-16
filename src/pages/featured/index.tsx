import { Images } from "../../../asserts/Import/Images";
import Navbar from "../../components/Common/Navbar/Navbar";
import MediaFeatured from "../../components/Featured/Featured";
import HiddenHeading from "../../components/HiddenHeading/HiddenHeading";
import PageSEO from "../../components/SEO/PageSEO";
import FloatingWhatsAppButton from "../../components/whatsapp/FloatingWhatsAppButton ";

export default function featured() {
  return (
    <>
      <PageSEO
        title="Featured - Bnbme Your Homes - Book Your Dream Getaway Today"
        description={
          "Explore bnbmehomes’ handpicked featured properties across Dubai and Riyadh. Discover top-rated stays with premium amenities, stunning views, and exceptional guest experiences"
        }
        canonical="https://www.bnbmehomes.com/featured"
        image={Images.homePage.src}
      />
      <HiddenHeading text="Featured Dubai Vacation Rentals" />
      <Navbar />
      <div className="mx-auto px-4">
        <MediaFeatured />
      </div>
      <FloatingWhatsAppButton />
    </>
  );
}
