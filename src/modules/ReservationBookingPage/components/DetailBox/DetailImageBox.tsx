import Image from "next/image";
import { imagePrefix } from "../../../../utils/api";
import BookingFallbackImage from "../../../../common/FallBackLogo/BookingFallbackImage";

export const DetailImageBox = ({
  images,
  title,
}: {
  images: any[];
  title: string;
}) => {
  if (images && images.length > 0) {
    // Check for Slider album
    const sliderAlbum = images.find(
      (img: any) =>
        img.album_name === "Slider" && img.paths && img.paths.length > 0
    );

    if (sliderAlbum) {
      return sliderAlbum.paths.map((path: string, index: number) => (
        <Image
          key={`slider-${index}`}
          src={`${imagePrefix}/${path}`}
          alt={title}
          fill
          className="rounded-lg object-cover"
        />
      ));
    }

    // Check for Gallery album
    const galleryAlbum = images.find(
      (img: any) =>
        img.album_name === "Gallery" && img.paths && img.paths.length > 0
    );

    if (galleryAlbum) {
      return galleryAlbum.paths
        .slice(0, 5)
        .map((path: string, index: number) => (
          <Image
            key={`gallery-${index}`}
            src={`${imagePrefix}/${path}`}
            alt={title}
            fill
            className="rounded-lg object-cover"
          />
        ));
    }

    // Check any album with images
    const firstAlbumWithImages = images.find(
      (img: any) => img.paths && img.paths.length > 0
    );

    if (firstAlbumWithImages) {
      return firstAlbumWithImages.paths
        .slice(0, 5)
        .map((path: string, index: number) => (
          <Image
            key={`alternate-${index}`}
            src={`${imagePrefix}/${path}`}
            alt={title}
            fill
            className="rounded-lg object-cover"
          />
        ));
    }
  }

  // No images found
  return <BookingFallbackImage rounded={true} />;
};
