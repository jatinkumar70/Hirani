import Image from "next/image";
import React from "react";
import { Images } from "../../../asserts/Import/Images";
import Link from "next/link";

interface FallbackImageProps {
  rounded?: boolean;
  slug?: string;
  fill?: boolean;
}

const FallbackImage: React.FC<FallbackImageProps> = ({
  rounded,
  slug,
  fill,
}) => {
  return (
    <Link href={slug || "/"}>
      {" "}
      {fill ? (
        <div className="flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300   w-full h-full aspect-[14/5]">
          <Image
            title="Fallback Logo"
            src={Images.LogoBlack}
            alt="Fallback Logo"
            width={300}
            height={300}
            priority
            className="object-contain object-center -mt-20"
          />
        </div>
      ) : (
        <div
          className={`flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300   w-full h-[300px] lg:h-[280px] aspect-[4/3] ${
            rounded ? "rounded-2xl" : ""
          }`}>
          <Image
            title="Fallback Logo"
            src={Images.LogoBlack}
            alt="Fallback Logo"
            width={170}
            height={170}
            priority
          />
        </div>
      )}
    </Link>
  );
};

export default FallbackImage;
