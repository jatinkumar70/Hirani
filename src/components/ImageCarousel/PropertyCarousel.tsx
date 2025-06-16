"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import OptimizedImage from "../OptimizedImage/OptimizedImage";
// import { cn } from "@/lib/utils"

interface CarouselProps {
  images: string[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slug: string;
  onClose?: () => void;
}

export default function PropertyCarousel({
  images,
  autoSlide = false,
  autoSlideInterval = 3000,
  slug,
  onClose,
}: CarouselProps) {
  const [curr, setCurr] = useState(0);

  const prev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurr((curr) => (curr === 0 ? images.length - 1 : curr - 1));
    },
    [images.length]
  );

  const next = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setCurr((curr) => (curr === images.length - 1 ? 0 : curr + 1));
    },
    [images.length]
  );

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next]);

  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative lg:w-[60%] mx-auto lg:py-10 lg:px-16">
        {/* Close Button - Now top left */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute left-0 -top-10 lg:top-5 z-20 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white transition-colors"
            aria-label="Close gallery">
            <X size={24} />
          </button>
        )}

        {/* Main Carousel Container */}
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${curr * 100}%)` }}>
            {images.map((img, index) => (
              <OptimizedImage
                key={index}
                src={img}
                alt="Property image"
                rounded={false}
                width={0}
                height={0}
              />
            ))}
          </div>
        </div>

        {/* Navigation Buttons - Outside the image container */}
        <button
          onClick={prev}
          className="absolute left-[40%] top-[112%] lg:left-4 lg:top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white transition-colors"
          aria-label="Previous image">
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="absolute right-[40%] top-[112%] lg:right-4 lg:top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white transition-colors"
          aria-label="Next image">
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurr(i)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  curr === i
                    ? "bg-white scale-100"
                    : "bg-white/50 scale-90 hover:scale-95 hover:bg-white/70"
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
