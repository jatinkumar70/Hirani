"use client";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { GridImage, ImageGridProps } from "../../types/types";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGrid({
  topImages,
  bottomImages,
  className,
}: ImageGridProps) {
  const [selectedImage, setSelectedImage] = useState<GridImage | null>(null);

  if (!topImages?.length || !bottomImages?.length) {
    return null;
  }

  const handleImageClick = (image: GridImage) => {
    setSelectedImage(image);
    window.open(image.link, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={cn(
        "w-full max-w-screen-xl md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl 2xl:max-w-screen-3xl mx-auto space-y-4",
        className
      )}>
      {/* Top row - 50/50 split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => handleImageClick(image)}
            className="cursor-pointer">
            <ImageCard
              image={image}
              priority={index === 0}
              onClick={() => {}}
            />
          </div>
        ))}
      </div>

      {/* Bottom row - 33/33/33 split */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bottomImages.map((image) => (
          <div
            key={image.id}
            onClick={() => handleImageClick(image)}
            className="cursor-pointer">
            <ImageCard image={image} onClick={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
}
