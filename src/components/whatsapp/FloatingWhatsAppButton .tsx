import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappUrl } from "../../constants/constants";

const FloatingWhatsAppButton: React.FC = () => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    e.preventDefault(); // Prevent default anchor behavior
    window.location.href = whatsappUrl; // Redirect to the WhatsApp URL
  };

  return (
    <a
      href={whatsappUrl}
      onClick={handleClick}
      className="z-50 fixed bottom-24 lg:bottom-10 right-5 bg-green-500 p-3 rounded-full shadow-lg text-white text-xl hover:bg-green-600 transition"
      aria-label="Chat with us on WhatsApp">
      <FaWhatsapp size={30} aria-hidden="true" />
    </a>
  );
};

export default FloatingWhatsAppButton;
