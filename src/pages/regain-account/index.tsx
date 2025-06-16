import { NextSeo } from "next-seo";
import RegainAccountPage from "../../modules/RegainAccountPage/RegainAccountPage";
import { pageDescription, pageTitle } from "../../constants/constants";


export default function RegainAccount() {
  return (
    <div >
      <NextSeo
        title={`Regain Account - ${pageTitle}`}
        description={pageDescription}
        canonical="https://www.bnbmehomes.com/regain-account"
        openGraph={{
          url: "https://www.bnbmehomes.com/regain-account",
          title: pageTitle,
          description:
            pageDescription,
          images: [
            {
              url: "https://www.bnbmehomes.com/regain-account",
              width: 800,
              height: 600,
              alt: "Regain Account",
            },
          ],
        }}
      />
      <RegainAccountPage />
    </div>
  );
}
