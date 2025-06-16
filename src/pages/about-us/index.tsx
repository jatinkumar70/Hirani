import { Images } from "../../../asserts/Import/Images";
import Navbar from "../../components/Common/Navbar/Navbar";
import PageSEO from "../../components/SEO/PageSEO";
import { pageTitle } from "../../constants/constants";
import AboutPage from "../../modules/AboutUs/AboutUs";

export default function about() {
  return (
    <div>
      <PageSEO
        title={`About Us - ${pageTitle}`}
        description={
          "Learn more about bnbmehomes; your trusted partner in luxury vacation rentals across Dubai and Riyadh. Discover our story, values, and commitment to delivering exceptional guest experiences"
        }
        canonical="https://www.bnbmehomes.com/about-us"
        image={Images.homePage.src}
      />
      <Navbar />
      <AboutPage />
    </div>
  );
}
