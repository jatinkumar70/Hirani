import Image from "next/image";
import { useEffect, useState } from "react";
import FallbackImage from "../../common/FallBackLogo/FallBackLogo";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  quality?: number;
  rounded: boolean;
  fill?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  quality = 75,
  fill,
  rounded,
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setIsError(false);
      setIsLoaded(false);
    }
  }, [src]);

  return (
    <div
      className={`relative ${
        !isLoaded && !isError ? "bg-gray-200 animate-pulse" : ""
      }`}>
      {isError ? (
        <FallbackImage fill={fill} />
      ) : fill ? (
        <Image
          src={imgSrc || "/placeholder.svg"}
          alt={alt || "Image"}
          className={`${className} h-[90px] transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } object-cover w-full  aspect-[4/3] h-full`}
          loading="eager"
          priority
          fill={fill}
          quality={quality}
          onError={() => setIsError(true)}
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <Image
          src={imgSrc || "/placeholder.svg"}
          alt={alt || "Image"}
          width={width}
          height={height}
          className={`${className} transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } object-cover w-full  aspect-[4/3] ${
            rounded ? "rounded-xl h-[300px] lg:h-[280px]" : "h-[200px]"
          }`}
          loading="eager"
          priority
          fill={fill}
          quality={quality}
          onError={() => setIsError(true)}
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}
    </div>
  );
}
