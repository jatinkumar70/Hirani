"use client";

import {
  Ban,
  Briefcase,
  Check,
  Clock,
  Home,
  Info,
  Sparkles,
  UserRound,
  XCircle
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { BookingImage } from "../../../../asserts/Import/Images";
import FloatingWhatsAppButton from "../../../components/whatsapp/FloatingWhatsAppButton ";

interface Package {
  title: string;
  description: string;
  image: any;
  price: string;
  extraPrice: string;
  features: {
    HomeBooking: boolean;
    checkoutCleaning: boolean;
    freeCancelation: [boolean, string];
    earlyCheckIn: boolean;
    earrlyBagDrop: boolean;
    personalConcierge: boolean;
    daiyHousekeeping: boolean;
  };
}

interface PackageSelectionProps {
  onSelectPackage: (pkg: string) => void;
}

export function PackageSelection({ onSelectPackage }: PackageSelectionProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const packages: Package[] = [
    {
      title: "Standard",
      description: "Go light",
      image: BookingImage.booking1,
      price: "$628.56",
      extraPrice: "",
      features: {
        HomeBooking: true,
        checkoutCleaning: true,
        freeCancelation: [false, "not include"],
        earlyCheckIn: false,
        earrlyBagDrop: false,
        personalConcierge: false,
        daiyHousekeeping: false,
      },
    },
    {
      title: "Flexi",
      description: "Go comfy",
      image: BookingImage.booking2,
      price: "+ $100",
      extraPrice: "+100",
      features: {
        HomeBooking: true,
        checkoutCleaning: true,
        freeCancelation: [true, "5 days of notice"],
        earlyCheckIn: true,
        earrlyBagDrop: true,
        personalConcierge: false,
        daiyHousekeeping: false,
      },
    },
    {
      title: "WOW!",
      description: "Go Lux",
      image: BookingImage.booking3,
      price: "+ $300",
      extraPrice: "+300",
      features: {
        HomeBooking: true,
        checkoutCleaning: true,
        freeCancelation: [true, "24 hours notice"],
        earlyCheckIn: true,
        earrlyBagDrop: true,
        personalConcierge: true,
        daiyHousekeeping: true,
      },
    },
  ];

  const labels = [
    { name: "Home booking", subHeading: "27-30 of June 2024", icon: <Home /> },
    {
      name: "Checkout cleaning",
      subHeading: "All properties are cleaned after check-out",
      icon: <Check />,
    },
    {
      name: "Free cancellation",
      subHeading: "Please give appropirate notice as stated in your package",
      icon: <Ban />,
    },
    {
      name: "Early check-in or late checkout",
      subHeading: "You can choose either early check-in or late checkout",
      icon: <Clock />,
    },
    {
      name: "Early bag drop off",
      subHeading: "You can drop the bags as early as you want",
      icon: <Briefcase />,
    },
    {
      name: "Personal concierge",
      subHeading: "Someone always there if you need help",
      icon: <UserRound />,
    },
    {
      name: "Daily housekeeping",
      subHeading: "Come back to a fresh house every day",
      icon: <Sparkles />,
    },
  ];

  return (
    <div className="p-4 container mx-auto bg-gray-bg">
      <h1 className="text-2xl font-bold mb-4">Choose your package</h1>
      <p className="text-sm text-gray-600 mb-6">
        * The selected fare is calculated per night
      </p>

      {/* Package cards for mobile */}
      <div className="md:hidden relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {packages.map((pkg, pkgIndex) => (
            <div
              key={pkgIndex}
              className={`flex-shrink-0 w-[80vw] snap-center border rounded-lg overflow-hidden ${
                selectedPackage === pkg.title ? "ring-2 ring-blue-500" : ""
              }`}>
              <div
                className={`text-center ${
                  pkgIndex === 0
                    ? "bg-[#FDF7D4]"
                    : pkgIndex === 1
                    ? "bg-gradient-to-t from-[#D4B779] to-[#FDF7D4]"
                    : "bg-gradient-to-t from-[#AA987A] to-[#D4B779]"
                }`}>
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.title}
                  className="object-cover w-full h-40"
                />
                <h2
                  className={`text-lg font-bold mt-4 ${
                    pkgIndex === 2 ? "text-white" : "text-gray-700"
                  }`}>
                  {pkg.title}
                </h2>
                <p
                  className={`text-sm mb-4 ${
                    pkgIndex === 2 ? "text-white" : "text-gray-700"
                  }`}>
                  {pkg.description}
                </p>
              </div>
              <div className="p-4 bg-white">
                <button
                  onClick={() => {
                    setSelectedPackage(pkg.title);
                    onSelectPackage(pkg.title);
                  }}
                  className={`w-full ${
                    pkgIndex === 0
                      ? "bg-transparent border-2 text-[#AA987A] border-[#AA987A]"
                      : pkgIndex === 1
                      ? "bg-[#D4B779] border-2 border-[#D4B779] text-white"
                      : "bg-[#AA987A] border-2 border-[#AA987A] text-white"
                  } hover:text-white px-4 py-2 rounded-md hover:bg-yellow-600`}>
                  Select for {pkg.price}
                </button>
              </div>
              {selectedPackage === pkg.title && (
                <div className="mt-4 space-y-10 p-4 bg-gray-100">
                  {labels.map((label, idx) => (
                    <div key={idx} className="flex items-center text-sm ">
                      <div className="mr-2 text-lg">{label.icon}</div>
                      <div>
                        <span className="font-medium">{label.name}</span>
                        <Info className="inline ml-1 my-auto" size={12} />
                        <br />
                        <span className="text-xs text-gray-600">
                          {label.subHeading}
                        </span>
                      </div>
                      <div className="ml-auto">
                        {label.name === "Free cancellation" ? (
                          pkg.features.freeCancelation[0] ? (
                            <Check className="text-green-500" />
                          ) : (
                            <XCircle className="text-red-500" />
                          )
                        ) : (pkg.features as any)[
                            label.name.toLowerCase().replace(/ /g, "")
                          ] ? (
                          <Check className="text-green-500" />
                        ) : (
                          <XCircle className="text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <ChevronRight />
        </button> */}
      </div>

      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-5 gap-4">
        {/* Left column for labels */}
        <div className="col-span-2 mt-72">
          {labels.map((label, idx) => (
            <div
              key={idx}
              className={`flex items-center text-sm py-6 px-4 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}>
              <div className="mr-4 text-lg">{label.icon}</div>
              <div className="flex flex-col">
                <span>
                  {label.name}
                  <Info className="inline ml-1 my-auto" size={12} />
                </span>
                <span className="text-xs">{label.subHeading}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Package columns */}
        {packages.map((pkg, pkgIndex) => (
          <div
            key={pkgIndex}
            className={`col-span-1 overflow-hidden border rounded-lg hover:shadow-lg transition ${
              pkgIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
            }`}>
            <div
              className={`text-center ${
                pkgIndex === 0
                  ? "bg-[#FDF7D4]"
                  : pkgIndex === 1
                  ? "bg-gradient-to-t from-[#D4B779] to-[#FDF7D4]"
                  : "bg-gradient-to-t from-[#AA987A] to-[#D4B779]"
              }`}>
              <Image
                src={pkg.image || "/placeholder.svg"}
                alt={pkg.title}
                className="object-cover w-full h-40 hover:scale-105 transition-transform duration-500"
              />

              <h2
                className={`text-lg font-bold mt-4 ${
                  pkgIndex === 2 ? "text-white" : "text-gray-700"
                }`}>
                {pkg.title}
              </h2>
              <p
                className={`text-sm mb-4 ${
                  pkgIndex === 2 ? "text-white" : "text-gray-700"
                }`}>
                {pkg.description}
              </p>
              <div className="bg-white">
                <button
                  onClick={() => onSelectPackage(pkg.title)}
                  className={`${
                    pkgIndex === 0
                      ? "bg-transparent border-2 text-[#AA987A] border-[#AA987A]"
                      : "text-white"
                  } ${
                    pkgIndex === 1
                      ? "bg-[#D4B779] border-2 border-[#D4B779]"
                      : "bg-[#AA987A] border-2 border-[#AA987A]"
                  } hover:text-white px-4 py-2 rounded-md mt-3 hover:bg-yellow-600`}>
                  Select for {pkg.price}
                </button>
              </div>
            </div>
            {/* Features list */}
            <div>
              {Object.entries(pkg.features).map(
                ([key, value], featureIndex) => (
                  <div
                    key={featureIndex}
                    className={`text-center text-sm py-6 ${
                      featureIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}>
                    {key === "freeCancelation" && Array.isArray(value) ? (
                      <div className="flex flex-col items-center">
                        {value[0] ? (
                          <Check className="text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="text-red-500 mx-auto" />
                        )}
                        <span className="mt-2 text-gray-600">{value[1]}</span>
                      </div>
                    ) : value === true ? (
                      <Check className="text-green-500 mx-auto" />
                    ) : value === false ? (
                      <XCircle className="text-red-500 mx-auto" />
                    ) : (
                      <span>{value}</span>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
      <FloatingWhatsAppButton />
    </div>
  );
}

export default PackageSelection;
