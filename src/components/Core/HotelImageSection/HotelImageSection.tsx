// components/HotelImageSection.tsx
import React from "react";
import ImageCarousel from "../../ImageCarousel/ImageCarousel";
import FallbackImage from "../../../common/FallBackLogo/FallBackLogo";

interface HotelImageSectionProps {
  hotel: {
    slug: string;
    from_date: string;
    to_date: string;
    details: {
      tag?: string;
      rating?: number;
    };
    images?: {
      album_name: string;
      paths: string[];
    }[];
  };
  slug: string;
}

const HotelImageSection: React.FC<HotelImageSectionProps> = ({
  hotel,
  slug,
}) => {
  const urlSlug = `/property/${hotel.slug}?startDate=${hotel.from_date}&endDate=${hotel.to_date}&adults=2`;

  const sliderAlbum = hotel.images?.find(
    (img) => img.album_name === "Slider" && img.paths.length > 0
  );

  const galleryAlbum = hotel.images?.find(
    (img) => img.album_name === "Gallery" && img.paths.length > 0
  );

  const firstAlbumWithImages = hotel.images?.find(
    (img) => img.paths && img.paths.length > 0
  );

  let selectedImages = null;
  if (sliderAlbum) {
    selectedImages = (
      <ImageCarousel
        key="slider"
        images={sliderAlbum.paths}
        slug={slug ? slug : urlSlug}
        rounded
      />
    );
  } else if (galleryAlbum) {
    selectedImages = (
      <ImageCarousel
        key="gallery"
        images={galleryAlbum.paths.slice(0, 5)}
        slug={slug ? slug : urlSlug}
        rounded
      />
    );
  } else if (firstAlbumWithImages) {
    selectedImages = (
      <ImageCarousel
        key={firstAlbumWithImages.album_name}
        images={firstAlbumWithImages.paths.slice(0, 5)}
        slug={slug ? slug : urlSlug}
        rounded
      />
    );
  }

  return (
    <div className="relative h-full">
      {hotel.details.tag && (
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2 py-2 text-xs font-medium bg-white/80 rounded-full">
            {hotel.details.tag}
          </span>
        </div>
      )}

      {selectedImages ? (
        selectedImages
      ) : (
        <FallbackImage rounded slug={urlSlug} />
      )}
    </div>
  );
};

export default HotelImageSection;
