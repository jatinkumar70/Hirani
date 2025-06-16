"use client";

import { useMobile } from "../../hooks/useMobile";

interface LoadingIndicatorProps {
  isLoading: boolean;
}

export default function LoadingIndicator({ isLoading }: LoadingIndicatorProps) {
  const isMobile = useMobile();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/50  flex items-center justify-center z-50 transition-opacity duration-300">
      <div
        className={` ${
          isMobile ? "w-16 h-16" : "w-12 h-12"
        } border-8 border-t-primary-gold border-gray-300 rounded-full animate-spin`}></div>
    </div>
  );
}
