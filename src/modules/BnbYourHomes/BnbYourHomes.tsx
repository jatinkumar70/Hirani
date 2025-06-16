// import { ProfitCalculator } from "../../components/Calculator/Calculator";
import { Banner } from "../../components/Common/Banner/Banner";
import { useEffect, useState } from "react";
import FAQ from "./FAQ";
import FeaturedSection from "./sections/FeaturedSection";
import HeroImageSection from "./sections/HeroImageSection";
import { LypHeroSection } from "./sections/LypHeroSection";
import TestimonialCarousel from "./sections/TestimonialCarousel";
import TestimonialSection from "./sections/TestimonialSection";
import WhatWeDoSection from "./sections/WhatWeDoSection";
import WhyChooseSection from "./sections/WhyChooseSection";
import { FloatingWhatsAppButtonLandingPage } from "../../components/whatsapp/FloatingWhatsAppButtonLandingPage";

export const BnbYourHomes = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referral, setReferral] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const enquiry = url.searchParams.get("enquiry");
    const ref = url.searchParams.get("referral");

    // enquiry flag
    if (enquiry === "success") {
      setIsSubmitted(true);
    }

    // referral param
    if (ref) {
      setReferral(ref);
      // scroll to form
      setTimeout(() => {
        document
          .getElementById("signup-form")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 200); // slight delay to ensure the form is in the DOM
    }
  }, []);
  return (
    <div className="bg-gray-50">
      <div className="relative">
        <Banner isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />

        {/* ProfitCalculator position adjustment for mobile and large screens */}
        <div className="absolute top-20 right-[7%] lg:block hidden">
          {/* <ProfitCalculator /> */}
        </div>

        {/* ProfitCalculator for mobile */}
        {/* <div className="lg:hidden mt-8 mx-4">
          <ProfitCalculator />
        </div> */}
      </div>
      <LypHeroSection
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        referral={referral}
      />
      <WhatWeDoSection />
      <TestimonialSection />
      <WhyChooseSection
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
      />
      <TestimonialCarousel />
      <HeroImageSection />
      <FeaturedSection />

      {/* <WhyUs />
      <PropertyDetails />
      <div className="App">
        <div className="flex justify-between w-[75%] mx-auto">
          <h1 className="lg:text-2xl font-bold my-6">What do our hosts think</h1>
          <div className="flex justify-center items-center cursor-pointer gap-3">
            <h1 className="hidden lg:block">View all </h1>
            <MoveRight />
          </div>
        </div> */}
      {/* <HostsCarousel /> */}
      <FAQ />
      <FloatingWhatsAppButtonLandingPage />
      {/* </div> */}
    </div>
  );
};
