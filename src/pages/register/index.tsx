import { NextSeo } from "next-seo";
import RegisterPage from "../../modules/RegisterPage/RegisterPage";
import { pageDescription, pageTitle } from "../../constants/constants";

export default function register() {
  return (
    <>
      <NextSeo
        title={"Register - Bnbme Your Homes - Book Your Dream Getaway Today"}
        description={
          "Create your bnbmehomes account to book stays, manage reservations, and enjoy a personalized travel experience. Quick, secure registration for guests and property owners"
        }
        canonical="https://www.bnbmehomes.com/register"
        openGraph={{
          url: "https://www.bnbmehomes.com/register",
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: "https://www.bnbmehomes.com/register",
              width: 800,
              height: 600,
              alt: "Register",
            },
          ],
        }}
      />
      <RegisterPage />
    </>
  );
}
