import type React from "react";

const HotelLoader: React.FC = () => {
  return (
    <div className="pt-96 fixed inset-0 bg-gradient-to-b from-sky-400 to-sky-200 flex items-center justify-center z-50">
      <div className="w-full max-w-md aspect-[9/16] relative">
        <svg viewBox="0 0 100 177" className="w-full h-[550px]">
          {/* Base */}
          <rect
            className="burj-base"
            x="35"
            y="165"
            width="30"
            height="12"
            fill="#718096"
          />

          {/* Main structure */}
          <path
            className="burj-main"
            d="M50 0 L40 165 H60 L50 0"
            fill="#2D3748"
          />

          {/* Middle section */}
          <path
            className="burj-middle"
            d="M50 40 L45 120 H55 L50 40"
            fill="#4A5568"
          />

          {/* Top spire */}
          <path
            className="burj-spire"
            d="M50 0 L49 40 H51 L50 0"
            fill="#A0AEC0"
          />

          {/* Windows */}
          {[...Array(8)].map((_, i) => (
            <rect
              key={i}
              className={`window window-${i + 1}`}
              x="48"
              y={20 + i * 20}
              width="4"
              height="2"
              fill="#90CDF4"
            />
          ))}

          {/* Clouds */}
          <circle
            className="cloud cloud-1"
            cx="20"
            cy="30"
            r="10"
            fill="#E2E8F0"
            opacity="0.8"
          />
          <circle
            className="cloud cloud-2"
            cx="75"
            cy="60"
            r="15"
            fill="#E2E8F0"
            opacity="0.6"
          />
          <circle
            className="cloud cloud-3"
            cx="15"
            cy="105"
            r="12"
            fill="#E2E8F0"
            opacity="0.7"
          />
        </svg>
      </div>
    </div>
  );
};

export default HotelLoader;
