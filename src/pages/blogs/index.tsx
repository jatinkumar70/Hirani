import { Images } from "../../../asserts/Import/Images";
import Navbar from "../../components/Common/Navbar/Navbar";
import HiddenHeading from "../../components/HiddenHeading/HiddenHeading";
import PageSEO from "../../components/SEO/PageSEO";
import FloatingWhatsAppButton from "../../components/whatsapp/FloatingWhatsAppButton ";
import Blogs from "../../modules/BlogsPage/BlogsPage";

export default function blog() {
  return (
    <div>
      <PageSEO
        title="Blogs - Travel Tips & Blogs by Bnbme"
        description={
          "Explore travel tips, local guides, and lifestyle inspiration on the bnbmehomes blog. Discover the best of Dubai and Riyadh through curated content for modern travelers and holidaymakers"
        }
        canonical="https://www.bnbmehomes.com/blogs"
        image={Images.homePage.src}
      />
      <HiddenHeading text="Travel Tips & Blogs by Bnbme" />
      <Navbar />
      <Blogs />
      <FloatingWhatsAppButton />
    </div>
  );
}
