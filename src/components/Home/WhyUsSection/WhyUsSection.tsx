import { Globe, HandPlatter, IdCard, PhoneCall } from "lucide-react";
import React from "react";
import WhyUs from "../../Core/WhyUsCard/WhyUsCard";

interface WhyUsProps {
  whyus: string;
}

const WhyUsSection: React.FC<WhyUsProps> = ({ whyus }) => {
  const whyUsItems = [
    {
      icon: <Globe size={40} />,
      title: "Exceptional Locations", // ✅ Correct way to access data
      description:
        "Stay in prime locations, close to top attractions and amenities.", // ✅ Accessing from data object
    },
    {
      icon: <HandPlatter size={40} />,
      title: "Personalized Guest Services",
      description:
        "Experience tailored services, from airport pickups to curated experiences. ",
    },
    {
      icon: <IdCard size={40} />,
      title: "Hassle-Free Booking",
      description:
        "Secure and straightforward booking for a stress-free getaway.",
    },
    {
      icon: <PhoneCall size={40} />,
      title: "24/7 Support",
      description:
        "Our dedicated team is always available to assist you during your stay.",
    },
  ];

  return <WhyUs items={whyUsItems} title={whyus} />;
};

export default WhyUsSection;
