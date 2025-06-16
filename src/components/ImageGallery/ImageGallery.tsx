"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import type React from "react";
import { Images } from "../../../asserts/Import/Images";
import { apiBaseurl, imagePrefix } from "../../utils/api";
import FallbackImage from "../../common/FallBackLogo/FallBackLogo";
import ImageCarousel from "../ImageCarousel/ImageCarousel";

interface ImageGalleryProps {
  images: { src: string | StaticImageData; key: string }[];
  altText: string;
  hotelSlug?: string;
  onClick: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  altText,
  hotelSlug = "gallery",
  onClick,
}) => {
  const displayImages =
    images.length > 0
      ? [
          ...images,
          ...Array(Math.max(0, 5 - images.length)).fill({
            src: Images.LogoBlack,
            key: "fallback",
          }),
        ]
      : Array(5).fill({ src: Images.LogoBlack, key: "fallback" });

  return (
    <>
      {/* Mobile Display: Show only first image */}
      <div
        className="md:hidden relative h-[300px] lg:h-[280px] cursor-pointer rounded-lg overflow-hidden"
        onClick={onClick}>
        {images && images?.length > 0 ? (
          <ImageCarousel images={displayImages.slice(0, 8)} rounded={true} />
        ) : (
          <FallbackImage rounded />
        )}
      </div>

      {/* Desktop Display: Show Grid with fallback images if needed */}
      <div className="relative hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-lg overflow-hidden">
          {/* Large Image on the Left */}
          <div
            className="relative aspect-auto cursor-pointer overflow-hidden"
            onClick={onClick}>
            <Image
              src={
                typeof displayImages[0] === "string"
                  ? `${imagePrefix}/${displayImages[0]}`
                  : Images.LogoBlack
              }
              alt={altText}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-l-lg"
            />
          </div>

          {/* 2x2 Grid on the Right */}
          <div className="grid grid-cols-2 gap-2">
            {displayImages.slice(1, 5).map((image, index) => (
              <div
                key={image.key || `image-${index}`}
                className="relative w-full max-h-[200px] aspect-square cursor-pointer overflow-hidden bg-black/30 flex items-center justify-center"
                onClick={onClick}>
                {image.key === "fallback" ? (
                  <Image
                    src={image.src}
                    alt="Fallback Image"
                    width={130}
                    height={130}
                    className="opacity-60"
                  />
                ) : (
                  <Image
                    src={
                      typeof image === "string"
                        ? `${imagePrefix}/${image}`
                        : `${imagePrefix}/${image}`
                    }
                    alt={`${altText} ${index + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
