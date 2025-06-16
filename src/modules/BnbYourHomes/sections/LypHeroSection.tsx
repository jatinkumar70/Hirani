/* eslint-disable @next/next/no-img-element */
import React from "react";
import SignUpForm from "../Component/SignupForm";

interface HeroSectionProps {
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
  referral: string | null;
}

export const LypHeroSection = ({
  isSubmitted,
  setIsSubmitted,
  referral,
}: HeroSectionProps) => {
  return (
    <div>
      <div className="flex py-20 justify-center items-center text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-3xl font-normal leading-tight">
          Start your journey <br />
          towards <span className="text-[#D4B779]">better earnings</span> with
          expert property management services
        </h2>
      </div>

      <section
        id="signup-form"
        className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://v1.bnbmehomes.com/assets/img/home_slider/B2-min.webp"
            alt="Luxury apartment interior"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="relative z-10 md:max-w-xl">
          <SignUpForm
            isSubmitted={isSubmitted}
            setIsSubmitted={setIsSubmitted}
            referral={referral}
          />
        </div>
      </section>
    </div>
  );
};
