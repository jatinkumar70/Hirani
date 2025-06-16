import Image from "next/image";
import about1 from "../../../asserts/img/palm.webp";
import about2 from "../../../asserts/img/riyadh.webp";
import AboutCarousel from "./AboutCarousel";
import TrophyCarousel from "./TrophyCarousel";
import FloatingWhatsAppButton from "../../components/whatsapp/FloatingWhatsAppButton ";
import Section from "../../common/Section/Section";

export default function AboutPage() {
  return (
    <Section className="pt-32">
      {/* Page title */}
      <h1 className="text-4xl font-bold mb-12">About us</h1>

      {/* Main content section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
        {/* Images section with overlap effect */}
        <div className="relative">
          <div className="relative w-[80%]">
            {" "}
            {/* Increased size of the top image */}
            <Image
              src={about1}
              alt="Palm Jumeirah aerial view"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="absolute left-1/3 top-1/3 lg:w-[80%]">
            {" "}
            {/* Adjusted bottom image size */}
            <Image
              src={about2}
              alt="Dubai skyline"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>

        {/* Story section */}
        <div className="lg:pl-8 w-full  mx-auto mt-24 lg:mt-0 lg:w-2/3">
          {" "}
          {/* Reduced width of text container */}
          <h2 className="text-3xl font-bold mb-6">Our story</h2>
          <p className="text-gray-600 leading-relaxed">
            We help discerning travelers experience the epitome of luxury in the
            realm of vacation homes with our exceptional property management
            services. We invite distinguished property owners LIKE YOU to join
            our owner&apos;s community, where we proudly showcase your property
            as a premium short-term rental. At bnbme, we understand the allure
            and sophistication that accompany a luxury holiday experience. We go
            above and beyond to curate an exclusive collection of breathtaking
            properties, ensuring that every traveler&apos;s desire for opulence,
            comfort, and convenience is met with utmost care. By partnering with
            us, you open the doors to a world of exceptional opportunities. Our
            dedicated team of hospitality experts are committed to maximizing
            the potential of your property, seamlessly handling all aspects of
            its management. From top-notch marketing strategies and professional
            photography to meticulous guest screening and seamless bookings, we
            take care of every detail, allowing you to sit back, relax, and reap
            the rewards of your investment.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 mx-auto mt-20 lg:mt-0 pt-22 lg:pt-28 md:pt-10  ">
        <h2 className="text-3xl text-center lg:mt-32 font-bold">Our Team</h2>
        <AboutCarousel />
      </div>

      <div className="flex flex-col gap-10 pb-4 mx-auto pt-10">
        <h1 className="text-2xl text-center lg:mt-32 font-bold">Awards</h1>
        <TrophyCarousel />
      </div>

      <FloatingWhatsAppButton />
    </Section>
  );
}
