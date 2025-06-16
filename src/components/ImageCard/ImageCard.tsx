"use client";
import Image from "next/image";
import { memo } from "react";
import { GridImage } from "../../types/types";

interface ImageCardProps {
  image: GridImage;
  priority?: boolean;
  onClick: (image: GridImage) => void;
}

const ImageCard = memo(function ImageCard({
  image,
  priority = false,
  onClick,
}: ImageCardProps) {
  const aspectRatioClass =
    image.aspectRatio === "landscape" ? "aspect-[4/3]" : "h-[380px]";

  return (
    <div
      className={`relative ${aspectRatioClass} overflow-hidden rounded-xl group cursor-pointer`}
      onClick={() => onClick(image)}>
      <Image
        src={image.src || "/placeholder.svg"}
        alt={image.alt}
        fill
        priority
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30"
        aria-hidden="true"
      />
      <span className="absolute drop-shadow-xl top-4 left-4 text-white font-semibold text-lg">
        {image.title}
      </span>
    </div>
  );
});

export default ImageCard;
