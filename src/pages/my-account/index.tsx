"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NextSeo } from "next-seo";
import MyAccountPage from "../../modules/MyAccountPage/MyAccountPage"; // Ensure this hook provides user & logout function
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
import { AccountSkeleton } from "../../components/SkeletonLoaders/AccountSkeleton";
import ProfileSettings from "../../modules/MyAccountPage/ProfileSettings";
import Navbar from "../../components/Common/Navbar/Navbar";
import { pageDescription, pageTitle } from "../../constants/constants";

export default function MyAccount() {
  const { loading } = useAuth();

  if (loading) {
    return <AccountSkeleton />;
  }

  return (
    <>
      <NextSeo
        title={`My Account - ${pageTitle}`}
        description={pageDescription}
        canonical="https://www.bnbmehomes.com/my-account"
        openGraph={{
          url: "https://www.bnbmehomes.com/my-account",
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: "https://www.bnbmehomes.com/my-account",
              width: 800,
              height: 600,
              alt: "My Account",
            },
          ],
        }}
      />
      <Navbar />
      <ProfileSettings />
    </>
  );
}
