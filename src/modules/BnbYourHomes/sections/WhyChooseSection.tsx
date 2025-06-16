import React from "react";
import FeatureCard from "../Component/FeatureCard";
import { Button } from "../../../components/ui/Button/Button";
import { bnbicons } from "../../../../asserts/Import/Images";
import prop1 from "../../../../asserts/bnb-icons/prop1.webp";
import prop2 from "../../../../asserts/bnb-icons/prop2.webp";
import prop3 from "../../../../asserts/bnb-icons/prop3.webp";
import prop4 from "../../../../asserts/bnb-icons/prop4.webp";
import prop5 from "../../../../asserts/bnb-icons/prop5.webp";
import prop6 from "../../../../asserts/bnb-icons/prop6.webp";
import prop7 from "../../../../asserts/bnb-icons/prop7.webp";
import prop8 from "../../../../asserts/bnb-icons/prop8.png";
import Image from "next/image";
interface WhyChooseSectionProps {
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
}
const WhyChooseSection = ({
  isSubmitted,
  setIsSubmitted,
}: WhyChooseSectionProps) => {
  const scrollToSignupForm = () => {
    // Reset submitted status
    setIsSubmitted(false);

    // Reset URL if it has the success parameter
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    if (
      searchParams.has("enquiry") &&
      searchParams.get("enquiry") === "success"
    ) {
      searchParams.delete("enquiry");

      const newUrl =
        window.location.pathname +
        (searchParams.toString() ? `?${searchParams.toString()}` : "");

      window.history.replaceState({}, "", newUrl);
    }

    // Scroll to the form
    setTimeout(() => {
      const formElement = document.getElementById("signup-form");
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-normal mb-4">
            Why Choose <span className="text-[#D4B779]">bnbme</span> ?
          </h2>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <p className="text-center text-xl text-gray-700 leading-relaxed">
            We are a{" "}
            <span className="text-[#D4B779] font-medium">
              Dubai-based property management company
            </span>{" "}
            specializing in managing holiday homes. Our expertise extends to{" "}
            <span className="text-[#D4B779] font-medium">
              Airbnb management
            </span>{" "}
            in Dubai, ensuring that your property achieves maximum exposure and
            high occupancy rates. Our team of experienced and professional
            property managers is dedicated to providing our clients with the
            highest possible level of service. We understand that your property
            is a valuable investment, and we will take care of it as if it were
            our own. Here&apos;s why you should choose bnbme Holiday Homes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <FeatureCard
            image={prop2.src}
            title={
              <span>
                <span className="text-[#D4B779] font-semibold">
                  Guest Screening
                </span>{" "}
                Policy
              </span>
            }
          />

          <FeatureCard
            image={prop1.src}
            title={
              <span>
                No <span className="text-[#D4B779] font-semibold">sign-up</span>{" "}
                charges
              </span>
            }
          />

          <FeatureCard
            image={prop4.src}
            title={
              <span>
                <span className="font-medium">Free to</span>{" "}
                <span className="text-[#D4B779] font-semibold">
                  use your property
                </span>{" "}
                as per your convenience
              </span>
            }
          />

          <FeatureCard
            image={prop7.src}
            title={
              <span>
                <span className="text-[#D4B779] font-semibold">
                  Hassle-free
                </span>{" "}
                experience We take care of everything
              </span>
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            image={prop6.src}
            title={
              <span>
                <span className="font-medium">Property in the</span>{" "}
                <span className="text-[#D4B779] font-semibold">
                  hands of hoteliers
                </span>
              </span>
            }
          />

          <FeatureCard
            image={prop8.src}
            title={
              <span>
                <span className="text-[#D4B779] font-semibold">
                  Outperforms
                </span>{" "}
                average net rental income
              </span>
            }
          />

          <FeatureCard
            image={prop3.src}
            title={
              <span>
                <span className="font-medium">Well managed</span>{" "}
                <span className="text-[#D4B779] font-semibold">property</span>
              </span>
            }
          />

          <FeatureCard
            image={prop5.src}
            title={
              <span>
                <span className="text-[#D4B779] font-semibold">Flexible</span>{" "}
                contract options
              </span>
            }
          />
        </div>

        <div className="mt-12 text-center">
          <Button
            className="bg-[#D4B779] py-4 px-8 text-white text-xl font-bold rounded-3xl"
            onClick={scrollToSignupForm}>
            Enquire Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
