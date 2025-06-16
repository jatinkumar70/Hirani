"use client";

import { useState, useEffect } from "react";

export function useMobile() {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize); // Listen for resize events

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobileView;
}
