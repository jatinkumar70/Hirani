import { NextSeo } from "next-seo";
import LoginPage from "../../modules/LoginPage/LoginPage";
import { pageDescription, pageTitle } from "../../constants/constants";
import { Images } from "../../../asserts/Import/Images";

export default function login() {
  return (
    <>
      <NextSeo
        title={`Login - ${pageTitle}`}
        description={
          "Access your bnbmehomes account to manage bookings, view trip details, and enjoy a personalized rental experience. Secure login for guests and property owners"
        }
        canonical="https://www.bnbmehomes.com/login"
        openGraph={{
          url: "https://www.bnbmehomes.com/login",
          title: pageTitle,
          description:
            "Access your bnbmehomes account to manage bookings, view trip details, and enjoy a personalized rental experience. Secure login for guests and property owners",
          images: [
            {
              url: Images.homePage.src,
              width: 800,
              height: 600,
              alt: "Login",
              type: "image/png",
            },
          ],
        }}
      />
      <LoginPage />
    </>
  );
}
