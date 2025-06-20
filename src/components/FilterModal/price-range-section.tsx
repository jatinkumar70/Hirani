"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionDivider from "./section-divider";
import { priceDistributionData } from "./PriceHistogramData/PriceHistogramData";
import SectionHeader from "./section-header";

export default function PriceRangeSection({
  priceRange,
  setPriceRange,
  minPrice,
  maxPrice,
}: {
  priceRange: { min: number; max: number };
  setPriceRange: (value: { min: number; max: number }) => void;
  minPrice: number;
  maxPrice: number;
}) {
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [showTooltip, setShowTooltip] = useState<"min" | "max" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastX = useRef<number>(0);
  const touchId = useRef<number | null>(null);

  // Calculate max count and scaled prices once
  const { maxCount, scaledPrices } = useMemo(() => {
    const maxCount = Math.max(...priceDistributionData.map((d) => d.count));
    const scaledPrices = priceDistributionData.map(
      (d) => (d.price / 400) * (maxPrice - minPrice) + minPrice
    );
    return { maxCount, scaledPrices };
  }, [maxPrice, minPrice]);

  // Sync local state with props
  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  // Commit local changes to parent state when dragging ends
  useEffect(() => {
    if (isDragging === null) {
      setPriceRange(localPriceRange);
    }
  }, [isDragging, localPriceRange, setPriceRange]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, thumb: "min" | "max") => {
      e.preventDefault();
      setIsDragging(thumb);
      setShowTooltip(thumb);
      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        lastX.current = e.clientX - rect.left;
      }
    },
    []
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, thumb: "min" | "max") => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        touchId.current = touch.identifier;
        setIsDragging(thumb);
        setShowTooltip(thumb);
        if (sliderRef.current) {
          const rect = sliderRef.current.getBoundingClientRect();
          lastX.current = touch.clientX - rect.left;
        }
      }
    },
    []
  );

  const updateSliderPosition = useCallback(
    (clientX: number) => {
      if (!sliderRef.current || !isDragging) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = x / rect.width;
      const value = Math.round(percentage * (maxPrice - minPrice) + minPrice);

      setLocalPriceRange((prev) => {
        if (isDragging === "min") {
          return { ...prev, min: Math.min(value, prev.max - 1) };
        } else {
          return { ...prev, max: Math.max(value, prev.min + 1) };
        }
      });

      // Store the last X position
      lastX.current = x;
    },
    [isDragging, maxPrice, minPrice]
  );

  // Optimized mouse move handler using requestAnimationFrame
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      animationRef.current = requestAnimationFrame(() => {
        updateSliderPosition(e.clientX);
      });
    };

    const handleMouseUp = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      setIsDragging(null);

      // Hide tooltip after a short delay
      setTimeout(() => {
        setShowTooltip(null);
      }, 1000);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove, { passive: false });
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isDragging, updateSliderPosition]);

  // Handle touch events for mobile with improved performance
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      // Find the touch that matches our stored ID
      let touchIndex = -1;
      for (let i = 0; i < e.touches.length; i++) {
        if (e.touches[i].identifier === touchId.current) {
          touchIndex = i;
          break;
        }
      }

      if (touchIndex === -1) return;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      animationRef.current = requestAnimationFrame(() => {
        updateSliderPosition(e.touches[touchIndex].clientX);
      });
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Check if our touch has ended
      let touchFound = false;
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === touchId.current) {
          touchFound = true;
          break;
        }
      }

      if (!touchFound) return;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      touchId.current = null;
      setIsDragging(null);

      // Hide tooltip after a short delay
      setTimeout(() => {
        setShowTooltip(null);
      }, 1000);
    };

    if (isDragging && sliderRef.current) {
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
      document.addEventListener("touchcancel", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleTouchEnd);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isDragging, updateSliderPosition]);

  // Handle price input changes
  const handlePriceInput = useCallback(
    (value: string, type: "min" | "max") => {
      const numValue =
        Number.parseInt(value) || (type === "min" ? minPrice : maxPrice);
      const newRange = {
        ...localPriceRange,
        [type]:
          type === "min"
            ? Math.min(Math.max(numValue, minPrice), localPriceRange.max - 1)
            : Math.max(Math.min(numValue, maxPrice), localPriceRange.min + 1),
      };

      setLocalPriceRange(newRange);
      setPriceRange(newRange);
    },
    [minPrice, maxPrice, setPriceRange, localPriceRange]
  );

  // Calculate slider positions
  const minPosition = useMemo(
    () => ((localPriceRange.min - minPrice) / (maxPrice - minPrice)) * 100,
    [localPriceRange.min, minPrice, maxPrice]
  );

  const maxPosition = useMemo(
    () => ((localPriceRange.max - minPrice) / (maxPrice - minPrice)) * 95,
    [localPriceRange.max, minPrice, maxPrice]
  );

  // Format price with currency symbol
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()}`;
  };

  return (
    <div className="px-1 sm:px-4">
      <SectionHeader
        title="Price range"
        subtitle="Nightly prices before fees and taxes"
      />

      <div className="relative h-28 sm:h-36 mb-6 sm:mb-8" ref={sliderRef}>
        {/* Bars Container */}
        <div className="absolute inset-0 flex items-end justify-center pt-6">
          {priceDistributionData.map((d, i) => (
            <motion.div
              key={i}
              className="flex-none mx-[0.5px] sm:mx-[1px] rounded-t-md"
              style={{
                width:
                  typeof window !== "undefined" && window.innerWidth < 768
                    ? "8px"
                    : "13px",
                maxWidth: "13px",
                backgroundColor: "#8898aa",
                height: `${(d.count / maxCount) * 100}%`,
              }}
              initial={{ height: 0 }}
              animate={{
                height: `${(d.count / maxCount) * 100}%`,
                opacity:
                  scaledPrices[i] >= localPriceRange.min &&
                    scaledPrices[i] <= localPriceRange.max
                    ? 1
                    : 0.3,
              }}
              transition={{
                height: { duration: 0.5, ease: "easeOut" },
                opacity: { duration: isDragging ? 0.05 : 0.2 },
              }}
            />
          ))}
        </div>

        {/* Horizontal Line & Slider Buttons at the Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="w-full h-1 bg-gray-200 relative">
            <motion.div
              className="absolute h-1 bg-gray-600"
              initial={{
                left: `${minPosition}%`,
                right: `${100 - maxPosition}%`,
              }}
              animate={{
                left: `${minPosition}%`,
                right: `${100 - maxPosition}%`,
              }}
              transition={{
                type: "spring",
                stiffness: isDragging ? 1000 : 300,
                damping: isDragging ? 50 : 30,
                mass: 0.5,
              }}
            />

            {/* Min Thumb */}
            <motion.div
              className="absolute -translate-x-1/2 -top-4 cursor-grab active:cursor-grabbing z-10"
              style={{ left: `${minPosition}%` }}
              animate={{
                left: `${minPosition}%`,
                scale: isDragging === "min" || showTooltip === "min" ? 1.15 : 1,
              }}
              transition={{
                left: {
                  type: "spring",
                  stiffness: isDragging === "min" ? 1000 : 500,
                  damping: isDragging === "min" ? 50 : 30,
                  mass: 0.5,
                },
                scale: { type: "spring", stiffness: 500, damping: 15 },
              }}>
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 bg-white border-2 ${isDragging === "min"
                  ? "border-gray-600"
                  : "border-gray-600"
                  } rounded-full shadow-lg flex items-center justify-center transition-all`}
                onMouseDown={(e) => handleMouseDown(e, "min")}
                onTouchStart={(e) => handleTouchStart(e, "min")}
                onMouseEnter={() => setShowTooltip("min")}
                onMouseLeave={() => !isDragging && setShowTooltip(null)}>
                {isDragging === "min" && (
                  <div className="w-2 h-2 bg-gray-600 rounded-full" />
                )}
              </div>

              {/* Min Tooltip */}
              <AnimatePresence>
                {(showTooltip === "min" || isDragging === "min") && (
                  <motion.div
                    className="absolute -top-12 -left-[20%] -translate-x-1/3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg z-20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}>
                    {formatPrice(localPriceRange.min)}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Max Thumb */}
            <motion.div
              className="absolute  -top-4 cursor-grab active:cursor-grabbing z-10"
              style={{ left: `${maxPosition}%` }}
              animate={{
                left: `${maxPosition}%`,
                scale: isDragging === "max" || showTooltip === "max" ? 1.15 : 1,
              }}
              transition={{
                left: {
                  type: "spring",
                  stiffness: isDragging === "max" ? 1000 : 500,
                  damping: isDragging === "max" ? 50 : 30,
                  mass: 0.5,
                },
                scale: { type: "spring", stiffness: 500, damping: 15 },
              }}>
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 bg-white border-2 ${isDragging === "max"
                  ? "border-gray-600"
                  : "border-gray-600"
                  } rounded-full shadow-lg flex items-center justify-center transition-all`}
                onMouseDown={(e) => handleMouseDown(e, "max")}
                onTouchStart={(e) => handleTouchStart(e, "max")}
                onMouseEnter={() => setShowTooltip("max")}
                onMouseLeave={() => !isDragging && setShowTooltip(null)}>
                {isDragging === "max" && (
                  <div className="w-2 h-2 bg-gray-600 rounded-full" />
                )}
              </div>

              {/* Max Tooltip */}
              <AnimatePresence>
                {(showTooltip === "max" || isDragging === "max") && (
                  <motion.div
                    className="absolute -top-12 -left-[92%] -translate-x-1/3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg z-20"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}>
                    {formatPrice(localPriceRange.max)}
                    {localPriceRange.max === maxPrice ? "+" : ""}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
        <div className="w-full sm:w-1/4">
          <label className="block text-sm mb-1 ml-2">Minimum</label>
          <input
            type="text"
            value={`${priceRange.min}`}
            onChange={(e) =>
              handlePriceInput(e.target.value.replace(/\D/g, ""), "min")
            }
            className="w-full p-3 border rounded-xl text-center"
          />
        </div>
        <div className="hidden sm:block border-t w-12 border-gray-300"></div>
        <div className="w-full sm:w-1/4">
          <label className="block text-sm mb-1 ml-2">Maximum</label>
          <input
            type="text"
            value={`${localPriceRange.max}${localPriceRange.max === maxPrice ? "+" : ""
              }`}
            onChange={(e) =>
              handlePriceInput(e.target.value.replace(/\D/g, ""), "max")
            }
            className="w-full p-3 border rounded-xl text-center"
          />
        </div>
      </div>

      <SectionDivider />
    </div>
  );
}
