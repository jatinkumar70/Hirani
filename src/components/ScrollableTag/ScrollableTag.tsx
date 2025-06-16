"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LucideTag } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button/Button";
import { Badge } from "../ui/Badge/Badge";

interface TagType {
  id: string;
  name: string;
}

interface ScrollableTagsProps {
  tags: any[];
}

export function ScrollableTag({ tags }: ScrollableTagsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [tags]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (!tags || tags.length === 0) return null;

  return (
    <div className="relative flex items-center gap-2 w-full">
      {/* Left scroll button */}
      {showLeftButton && (
        <Button
          onClick={() => scroll("left")}
          variant="ghost"
          size="sm"
          className="absolute left-0 z-10 h-7 w-7 sm:h-8 sm:w-8 p-0 bg-white/90 backdrop-blur-sm border border-amber-200 shadow-sm hover:bg-amber-50 hover:border-amber-300 transition-all duration-200">
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
        </Button>
      )}

      {/* Scrollable tags container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScrollButtons}
        className={`flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide scroll-smooth ${
          showLeftButton ? "pl-8 sm:pl-10" : "pl-1"
        } ${showRightButton ? "pr-8 sm:pr-10" : "pr-1"}`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
        {tags.map((tag) => (
          <div key={`tag-${tag.id}`}>
            <Badge
              variant="outline"
              className="whitespace-nowrap text-xs sm:text-sm bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-200 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 hover:border-amber-300 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md">
              <LucideTag className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
              {tag.name}
            </Badge>
          </div>
        ))}
      </div>

      {/* Right scroll button */}
      {showRightButton && (
        <Button
          onClick={() => scroll("right")}
          variant="ghost"
          size="sm"
          className="absolute right-0 z-10 h-7 w-7 sm:h-8 sm:w-8 p-0 bg-white/90 backdrop-blur-sm border border-amber-200 shadow-sm hover:bg-amber-50 hover:border-amber-300 transition-all duration-200">
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
        </Button>
      )}
    </div>
  );
}
