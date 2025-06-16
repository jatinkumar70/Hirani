import React from "react";

export default function DynamicLoader() {
  return (
    <div className="fixed inset-0 bg-white/50  flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="w-12 h-12 border-8 border-t-primary-gold border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
}
