import { Images } from "../../../asserts/Import/Images";
import Navbar from "../../components/Common/Navbar/Navbar";
import PageSEO from "../../components/SEO/PageSEO";
import { FloatingWhatsAppButtonLandingPage } from "../../components/whatsapp/FloatingWhatsAppButtonLandingPage";
import { BnbYourHomes } from "../../modules/BnbYourHomes/BnbYourHomes";

// O
const BnbYourHoemesPage = () => {
  return (
    <>
      <PageSEO
        title="List Your Property - Top Property Management in UAE for Vacation Rentals"
        description={
          "Partner with bnbmehomes to turn your property into a high-performing short-term rental. From guest management to marketing, we handle it all—your home, our hospitality"
        }
        canonical="https://www.bnbmehomes.com/bnbme-your-home"
        image={Images.homePage.src}
      />
      <Navbar />
      <BnbYourHomes />
      <FloatingWhatsAppButtonLandingPage />
    </>
  );
};

export default BnbYourHoemesPage;
