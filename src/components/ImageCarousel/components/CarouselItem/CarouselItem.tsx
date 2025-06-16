import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Images } from "../../../../../asserts/Import/Images";
import FallbackImage from "../../../../common/FallBackLogo/FallBackLogo";

interface CarouselItemProps {
  src: string;
  alt: string;
  slug: string | null | undefined;
  rounded: boolean;
}

const CarouselItem: React.FC<CarouselItemProps> = ({
  src,
  alt,
  slug,
  rounded,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (src) {
      setImgSrc(src); // Reset to real image when src changes
      setIsError(false); // Reset error state
      setIsLoaded(false); // Reset loading state
    }
  }, [src]);
  return (
    <div className="w-full h-full flex-shrink-0">
      {isError ? (
        <FallbackImage />
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          width={300}
          height={400}
          priority
          loading="eager" // Load immediately instead of lazy loading
          quality={75} // Optimize image quality for faster loading
          className={`object-cover w-full lg:h-full h-[260px] aspect-[4/3] ${
            rounded ? "rounded-xl" : " h-[180px]"
          }`}
          onError={() => setIsError(true)} // Show fallback if image fails
          onLoad={() => setIsLoaded(true)} // Show real image only when fully loaded
        />
      )}
    </div>
  );
};

export default CarouselItem;
