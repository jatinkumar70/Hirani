"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { apiBaseurl, imagePrefix } from "../../utils/api";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

interface CarouselProps {
  images: string[];
  slug?: string | null;
  rounded: boolean;
}

const ImageCarousel: React.FC<CarouselProps> = ({ images, slug, rounded }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const lastSlideTime = useRef(0);
  const slideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);
  const SLIDE_THRESHOLD = 50; // pixels
  const SLIDE_COOLDOWN = 500; // milliseconds

  const slide = useCallback(
    (direction: 1 | -1) => {
      const now = Date.now();
      if (now - lastSlideTime.current < SLIDE_COOLDOWN) return;

      setDirection(direction);
      setCurrentIndex((prevIndex) => {
        if (direction === 1) {
          return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        } else {
          return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
        }
      });

      lastSlideTime.current = now;

      if (slideTimeoutRef.current) {
        clearTimeout(slideTimeoutRef.current);
      }

      slideTimeoutRef.current = setTimeout(() => {
        slideTimeoutRef.current = null;
      }, SLIDE_COOLDOWN);
    },
    [images.length]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    isDraggingRef.current = false;
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isHovering) {
        e.stopPropagation();
        isDraggingRef.current = true;
        startXRef.current = e.clientX;
        startYRef.current = e.clientY;

        // Add global mouse event listeners
        const handleGlobalMouseMove = (e: MouseEvent) => {
          if (!isDraggingRef.current) return;

          const deltaX = e.clientX - startXRef.current;
          const deltaY = e.clientY - startYRef.current;

          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            e.preventDefault();
            e.stopPropagation();

            if (Math.abs(deltaX) > SLIDE_THRESHOLD) {
              if (deltaX > 0) {
                slide(-1);
              } else {
                slide(1);
              }
              startXRef.current = e.clientX;
              startYRef.current = e.clientY;
            }
          }
        };

        const handleGlobalMouseUp = () => {
          isDraggingRef.current = false;
          document.removeEventListener("mousemove", handleGlobalMouseMove);
          document.removeEventListener("mouseup", handleGlobalMouseUp);
        };

        document.addEventListener("mousemove", handleGlobalMouseMove);
        document.addEventListener("mouseup", handleGlobalMouseUp);
      }
    },
    [isHovering, slide]
  );

  const nextSlide = (e: React.MouseEvent) => {
    // Prevent the event from bubbling up to the Link component
    e.preventDefault();
    e.stopPropagation();

    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setShowPrevButton(true);
  };

  const prevSlide = (e: React.MouseEvent) => {
    // Prevent the event from bubbling up to the Link component
    e.preventDefault();
    e.stopPropagation();

    setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  // Remove the mousemove handler from the component and use global handlers instead
  const handleMouseMove = useCallback(() => {}, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.stopPropagation();
      startXRef.current = e.touches[0].clientX;
      startYRef.current = e.touches[0].clientY;

      // Prevent parent carousel from handling this touch
      if (containerRef.current) {
        containerRef.current.style.touchAction = "none";
      }
    },
    []
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const deltaX = e.touches[0].clientX - startXRef.current;
      const deltaY = e.touches[0].clientY - startYRef.current;

      // Check if the movement is more horizontal than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault(); // Prevent scrolling when sliding horizontally

        if (Math.abs(deltaX) > SLIDE_THRESHOLD) {
          if (deltaX > 0) {
            slide(-1);
          } else {
            slide(1);
          }
          startXRef.current = e.touches[0].clientX;
          startYRef.current = e.touches[0].clientY;
        }
      }
    },
    [slide]
  );

  const handleTouchEnd = useCallback(() => {
    // Reset touch action
    if (containerRef.current) {
      containerRef.current.style.touchAction = "";
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (isHovering && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        e.stopPropagation(); // Stop event from reaching product carousel

        if (Math.abs(e.deltaX) > SLIDE_THRESHOLD) {
          if (e.deltaX > 0) {
            slide(1);
          } else {
            slide(-1);
          }
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isHovering, slide]);

  // Add a click handler to prevent click events from bubbling up
  const handleClick = useCallback((e: React.MouseEvent) => {
    // Only stop propagation if we're not clicking on a button or link
    if (
      !(e.target as HTMLElement).closest("button") &&
      !(e.target as HTMLElement).closest("a")
    ) {
      e.stopPropagation();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      data-carousel-type="image"
      className={`relative w-full overflow-hidden ${
        rounded ? "rounded-xl h-[300px] lg:h-[280px]" : "h-[200px]"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}>
      {/* Carousel content */}
      <div
        className={`flex transition-transform ease-out duration-500 w-full ${
          rounded ? "rounded-xl h-[300px] lg:h-[280px]" : "h-[200px]"
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((img, index) => (
          <div key={index} className="min-w-full">
            {/* Only wrap the image in Link, not the controls */}
            <Link href={slug || "#"} className="block w-full h-full">
              <OptimizedImage
                src={`${imagePrefix}/${img}` || img}
                alt={"hotel_image"}
                rounded={rounded}
                width={300}
                height={300}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation buttons - outside of Link */}
      {isHovering && (
        <div className="absolute inset-0 flex items-center justify-between p-4 z-50 pointer-events-none">
          <button
            onClick={prevSlide}
            className={`p-1 rounded-full bg-white/90 text-gray-800 hover:bg-white hover:text-gray-800 transition-opacity duration-300 pointer-events-auto ${
              currentIndex === 0
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}>
            <ChevronLeftIcon size={19} />
          </button>

          <button
            onClick={nextSlide}
            className="p-1 rounded-full bg-white/90 text-gray-800 hover:bg-white hover:text-gray-800 transition pointer-events-auto">
            <ChevronRightIcon size={19} />
          </button>
        </div>
      )}

      {/* Indicator dots - outside of Link */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-1 z-40 pointer-events-none">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all bg-white 
               ${
                 index === currentIndex
                   ? "bg-white p-0.5"
                   : "bg-gray-500 bg-opacity-50"
               }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
