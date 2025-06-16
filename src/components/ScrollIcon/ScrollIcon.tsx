"use client";

import type React from "react";
import { useState, useEffect } from "react";

const ScrollIcon: React.FC = () => {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      setFillPercentage(Math.min(scrollPercentage, 100));
      setIsScrolled(scrollTop > 100); // Change icon when scrolled more than 100px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-50 cursor-pointer"
      onClick={() => window.scrollToTop()}>
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="2"
        />
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="#C3AB79"
          strokeWidth="2"
          strokeDasharray={`${2 * Math.PI * 18}`}
          strokeDashoffset={`${2 * Math.PI * 18 * (1 - fillPercentage / 100)}`}
          transform="rotate(-90 20 20)"
        />
        {isScrolled ? (
          <path
            d="M20 28 L20 12 M14 18 L20 12 L26 18"
            stroke="#C3AB79"
            strokeWidth="2"
            fill="none"
          />
        ) : (
          <path
            d="M20 12 L20 28 M14 22 L20 28 L26 22"
            stroke="#C3AB79"
            strokeWidth="2"
            fill="none"
          />
        )}
      </svg>
    </div>
  );
};

export default ScrollIcon;
