"use client";
import Image from "next/image";
import { memo } from "react";
import { GridImage } from "../../types/types";
import { MapPin, Info } from "lucide-react";

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
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
      />
      
      {/* Gradient overlay for better text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"
        aria-hidden="true"
      />
      
      {/* Title - always visible */}
      <span className="absolute drop-shadow-xl top-4 left-4 text-white font-semibold text-lg z-10 transition-all duration-300 group-hover:translate-y-[-8px]">
        {image.title}
      </span>

      {/* Hover Overlay with Information */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 z-20">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {/* Location */}
          <div className="flex items-center gap-2 mb-3 text-white/90">
            <MapPin className="w-4 h-4 text-white/70" />
            <span className="text-sm font-medium">{image.hotelLocation}</span>
          </div>
          
          {/* Description */}
          <p className="text-white/90 text-sm leading-relaxed mb-4 line-clamp-3">
            {image.description}
          </p>
          
          {/* Explore Button */}
          <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
            <Info className="w-4 h-4 text-white/70" />
            <span className="text-white font-medium text-sm">Explore Destination</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ImageCard;
