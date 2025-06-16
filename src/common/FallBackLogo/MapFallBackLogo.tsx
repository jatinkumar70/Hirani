import Image from "next/image";
import React from "react";
import { Images } from "../../../asserts/Import/Images";
import Link from "next/link";

interface MapFallbackImageProps {
  rounded?: boolean;
  slug?: string;
}

const MapFallbackImage: React.FC<MapFallbackImageProps> = ({
  rounded,
  slug,
}) => {
  return (
    <Link href={slug || "#"}>
      {" "}
      <div
        className={`flex items-center justify-center bg-[#c2c2c2] w-full aspect-[4/3] ${
          rounded ? "rounded-2xl h-[200px] " : "h-[200px]"
        }`}>
        <Image
          title="Fallback Logo"
          src={Images.LogoBlack}
          alt="Fallback Logo"
          width={150}
          height={150}
          priority
        />
      </div>{" "}
    </Link>
  );
};

export default MapFallbackImage;
