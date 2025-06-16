import { NextSeo } from "next-seo";
import ConnectWithUsPage from "../../modules/ConnectWithUs/ConnectWithUsPage";
import Navbar from "../../components/Common/Navbar/Navbar";
import { pageDescription, pageTitle } from "../../constants/constants";

const ConnectWithUs = () => {
  return (
    <>
      <NextSeo
        title={`Connect with us ${pageTitle}`}
        description={
          "Have questions or need help with your booking? Get in touch with the bnbmehomes team for personalized support, inquiries, or partnership opportunities—we’re here to assist you"
        }
      />
      <Navbar />
      <ConnectWithUsPage />{" "}
    </>
  );
};

export default ConnectWithUs;
