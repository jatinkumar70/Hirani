import { Images } from "../../../asserts/Import/Images";
import Navbar from "../../components/Common/Navbar/Navbar";
import HiddenHeading from "../../components/HiddenHeading/HiddenHeading";
import PageSEO from "../../components/SEO/PageSEO";
import FloatingWhatsAppButton from "../../components/whatsapp/FloatingWhatsAppButton ";
import FAQ from "../../modules/BnbYourHomes/FAQ";

export default function about() {
  return (
    <>
      <PageSEO
        title="FAQs - Dubai Stay Made Easy"
        description={
          "Find answers to common questions about booking, check-in, amenities, cancellations, and more at bnbmehomes. Get the information you need for a smooth and enjoyable stay"
        }
        canonical="https://www.bnbmehomes.com/faqs"
        image={Images.homePage.src}
      />
      <HiddenHeading text="Bnbme FAQs - Dubai Stay Made Easy" />
      <Navbar />
      <div className="mx-auto px-4">
        <FAQ />
      </div>
      <FloatingWhatsAppButton />
    </>
  );
}
