
import { Images } from "../../../asserts/Import/Images";
import Section from "../../common/Section/Section";
import Navbar from "../../components/Common/Navbar/Navbar";
import PageSEO from "../../components/SEO/PageSEO";
import FloatingWhatsAppButton from "../../components/whatsapp/FloatingWhatsAppButton ";
import { pageTitle } from "../../constants/constants";
import ContactPage from "../../modules/ContactUs/ContactPage";

export default function contact() {
  return (
    <>
      <PageSEO
        title={`Contact us - ${pageTitle}`}
        description={
          "Need assistance? Contact bnbmehomes for support with bookings, property management, or general inquiries. Our team is ready to help you 24/7 across Dubai and Riyadh"
        }
        canonical="https://www.bnbmehomes.com/contact-us"
        image={Images.homePage.src}
      />
      <Navbar />
      <Section className="py-12 px-8 lg:px-24">
        <ContactPage />
        <FloatingWhatsAppButton />
      </Section>
    </>
  );
}
