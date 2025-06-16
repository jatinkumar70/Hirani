import { Images } from "../../../asserts/Import/Images";
import Navbar from "../../components/Common/Navbar/Navbar";
import PageSEO from "../../components/SEO/PageSEO";
import { pageTitle } from "../../constants/constants";
import TermsAndConditions from "../../modules/TermsPage/TermsPage";

export default function terms() {
  return (
    <div>
      <PageSEO
        title={`Terms and Conditions - ${pageTitle}`}
        description={
          "Review the terms and conditions for booking with bnbmehomes. Understand your rights, responsibilities, cancellation policies, and service guidelines before confirming your stay"
        }
        canonical="https://www.bnbmehomes.com/terms"
        image={Images.homePage.src}
      />
      <Navbar />
      <div className="">
        <TermsAndConditions />
      </div>
    </div>
  );
}
