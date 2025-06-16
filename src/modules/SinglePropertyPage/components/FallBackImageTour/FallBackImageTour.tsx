import Image from "next/image";
import React from "react";
import { Images } from "../../../../../asserts/Import/Images";

interface FallbackImageProps {
  rounded?: boolean;
  onClick?: () => void;
  alt: string;
}

const FallbackImageTour: React.FC<FallbackImageProps> = ({
  rounded,
  onClick,
  alt,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center bg-[#c2c2c2] w-full h-[300px] lg:h-[260px] aspect-[4/3] ${
        rounded ? "rounded-2xl" : ""
      }`}>
      <Image
        title={alt}
        src={Images.LogoBlack}
        alt={alt}
        width={170}
        height={170}
        priority
      />
    </div>
  );
};

export default FallbackImageTour;
