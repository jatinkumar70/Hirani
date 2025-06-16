"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { imagePrefix } from "../../../utils/api";

interface ImageLightboxProps {
  images: any;
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Add this effect to update currentIndex when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // These functions don't depend on props or state that change
  // so they don't need to be in the dependency array
  // We can use useCallback if needed, but this is simpler

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[1000] "
      onClick={onClose}>
      {/* Header */}
      <div className="fixed lg:top-0 top-7 left-0 right-0 z-50 flex items-center justify-between p-4 text-white">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="cursor-pointer flex items-center gap-2 rounded-lg bg-black/50 px-4 py-2 text-sm hover:bg-black/70">
          <X className="h-4 w-4" />
          Close
        </button>
        <div className="flex items-center gap-2">
          <span className="rounded-lg bg-black/50 px-4 py-2 text-sm">
            {currentIndex + 1} / {images.length}
          </span>
          {/* <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg bg-black/50 p-2 hover:bg-black/70">
            <Heart className="h-5 w-5" />
          </button> */}
        </div>
      </div>

      {/* Main content */}
      <div
        className="relative flex h-full items-center justify-center"
        onClick={(e) => e.stopPropagation()}>
        {/* Navigation buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          aria-label="Previous image">
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
          aria-label="Next image">
          <ChevronRight className="h-8 w-8" />
        </button>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="relative h-[calc(100vh-120px)] w-full max-w-7xl px-16">
            <Image
              src={`${imagePrefix}/${encodeURIComponent(images[currentIndex])}`}
              alt={`View ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
