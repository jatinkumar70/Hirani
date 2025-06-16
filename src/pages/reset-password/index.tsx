import { NextSeo } from "next-seo";
import ResetPasswordPage from "../../modules/ResetPasswordPage/ResetPasswordPage";
import { pageDescription, pageTitle } from "../../constants/constants";


export default function ResetPassword() {
  return (
    <div >
      <NextSeo
        title={`Reset password - ${pageTitle}`}
        description={pageDescription}
        canonical="https://www.bnbmehomes.com/reset-password"
        openGraph={{
          url: "https://www.bnbmehomes.com/reset-password",
          title: pageTitle,
          description:
            pageDescription,
          images: [
            {
              url: "https://www.bnbmehomes.com/reset-password",
              width: 800,
              height: 600,
              alt: "Reset password",
            },
          ],
        }}
      />
      <ResetPasswordPage />
    </div>
  );
}
