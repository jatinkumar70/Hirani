import { NextSeo } from "next-seo";

import Navbar from "../../components/Common/Navbar/Navbar";
import { pageDescription, pageTitle } from "../../constants/constants";
import BniLandingPage from "../../modules/bni/Bni";

export default function contact() {
  return (
    <div>
      <NextSeo
        title={`BNI- ${pageTitle}`}
        description={pageDescription}
        canonical="https://www.bnbmehomes.com/bni"
        openGraph={{
          url: "https://www.bnbmehomes.com/bni",
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: "https://www.bnbmehomes.com/bni",
              width: 800,
              height: 600,
              alt: "BNI",
            },
          ],
        }}
      />
      <Navbar />
      <BniLandingPage />
    </div>
  );
}
