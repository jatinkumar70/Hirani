import Image from "next/image";
import type React from "react";
import { Images } from "../../../asserts/Import/Images";

interface FallbackImageProps {
  rounded?: boolean;
  className?: string;
  width?: number;
  height?: number;
}

const BookingFallbackImage: React.FC<FallbackImageProps> = ({
  rounded = false,
  className = "",
  width,
  height,
}) => {
  return (
    <div
      className={`
        flex items-center justify-center 
        bg-gradient-to-br from-gray-300 to-gray-500 
        w-full 
        ${height ? `h-[${height}px]` : "h-[90px]"}
        aspect-[4/3] 
        ${rounded ? "rounded-xl sm:rounded-2xl" : "rounded-lg sm:rounded-xl"}
        transition-all duration-200 ease-in-out
        ${className}
      `}
      role="img"
      aria-label="Property image placeholder">
      <div className="relative flex items-center justify-center p-4 sm:p-6">
        <Image
          title="Fallback Logo"
          src={Images.LogoBlack || "/placeholder.svg"}
          alt="Property placeholder logo"
          width={width || 120}
          height={height || 120}
          className="
            w-auto h-auto 
            max-w-[90px] max-h-[90px]
            sm:max-w-[80px] sm:max-h-[80px]
            md:max-w-[80px] md:max-h-[80px]
            object-contain
            opacity-90 hover:opacity-80
            transition-opacity duration-200
          "
          priority
          sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 180px"
        />
      </div>
    </div>
  );
};

export default BookingFallbackImage;
