import { NextSeo } from "next-seo";
import VerificationPage from "../../modules/VerificationPage/VerificationPage";
import Navbar from "../../components/Common/Navbar/Navbar";
import { pageDescription, pageTitle } from "../../constants/constants";

export default function verification() {
  return (
    <div>
      <NextSeo
        title={`Verification - ${pageTitle}`}
        description={pageDescription}
        canonical="https://www.bnbmehomes.com/verification"
        openGraph={{
          url: "https://www.bnbmehomes.com/verification",
          title: pageTitle,
          description:
            pageDescription,
          images: [
            {
              url: "https://www.bnbmehomes.com/verification",
              width: 800,
              height: 600,
              alt: "Verification",
            },
          ],
        }}
      />
      <Navbar />
      <VerificationPage />
    </div>
  );
}
