"use client";

import { useEffect } from "react";
import PhotoTour from "../../../components/PhotoTour/PhotoTour";
import { Button } from "../../../components/ui/Button/Button";

interface PhotoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageData: any;
}

export default function PhotoTourModal({
  isOpen,
  onClose,
  imageData,
}: PhotoTourModalProps) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;

      // Add styles to prevent body scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore body scrolling when component unmounts or modal closes
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white z-[1000] overflow-auto"
      style={{ overscrollBehavior: "contain" }}>
      <div className="relative w-full max-w-screen-5xl mx-auto py-6 p-2 h-full flex flex-col">
        {/* Close Button - Sticky */}
        <div className="sticky top-2 p-4 w-full flex justify-end z-20">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onClick={onClose}
            />
            <div className="peer ring-0 bg-black  rounded-full outline-none duration-300 after:duration-500 w-10 h-10  shadow-md peer-checked:bg-dark-gold  peer-focus:outline-none  after:content-['X'] font-bold after:rounded-full after:absolute after:outline-none after:h-8 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 after:-rotate-180 peer-checked:after:rotate-0"></div>
          </label>
        </div>
        {/* PhotoTour inside modal */}
        <div className="flex-1 overflow-auto">
          <PhotoTour imageData={imageData} />
        </div>
      </div>
    </div>
  );
}
