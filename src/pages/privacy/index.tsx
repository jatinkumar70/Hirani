// import TermsAndConditions from "../../modules/TermsPage/TermsPage";
import { Images } from "../../../asserts/Import/Images";
import Navbar from "../../components/Common/Navbar/Navbar";
import PageSEO from "../../components/SEO/PageSEO";
import { pageTitle } from "../../constants/constants";
import PrivacyPage from "../../modules/PrivacyPage/PrivacyPage";

export default function terms() {
  return (
    <>
      <PageSEO
        title={`Privacy - ${pageTitle}`}
        description={
          "Read bnbmehomes’ Privacy Policy to understand how we collect, use, and protect your personal information. Your privacy and data security are our top priorities"
        }
        canonical="https://www.bnbmehomes.com/privacy"
        image={Images.homePage.src}
      />
      <Navbar />
      <div className="">
        <PrivacyPage />
      </div>
    </>
  );
}
