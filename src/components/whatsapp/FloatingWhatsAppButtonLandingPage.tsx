"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappUrlLandingPage, whatsappUrl } from "../../constants/constants";
import { usePathname } from "next/navigation";

export const FloatingWhatsAppButtonLandingPage: React.FC = () => {
  const pathname = usePathname();
  const isBnbYourHome = pathname === "/bnbme-your-home";
  const whatsappRedirectUrl = isBnbYourHome
    ? whatsappUrlLandingPage
    : whatsappUrl;

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    e.preventDefault(); // Prevent default anchor behavior
    window.location.href = whatsappRedirectUrl; // Redirect to the WhatsApp URL
  };

  return (
    <a
      href={whatsappRedirectUrl}
      onClick={handleClick}
      className="z-50 fixed bottom-14 lg:bottom-10 right-5 bg-green-500 p-3 rounded-full shadow-lg text-white text-xl hover:bg-green-600 transition"
      aria-label="Chat with us on WhatsApp">
      <FaWhatsapp size={30} aria-hidden="true" />
    </a>
  );
};
