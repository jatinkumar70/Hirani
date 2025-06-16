import L from "leaflet";
import { MapPin } from "lucide-react";
import type React from "react";
import { Marker, Popup } from "react-leaflet";
import MapFallbackImage from "../../../../common/FallBackLogo/MapFallBackLogo";
import ImageCarousel from "../../../../components/ImageCarousel/ImageCarousel";
import { formatNumberWithCommas } from "../../../../constants/constants";

interface HotelMarkerProps {
  hotel: any;
}

const PropertyMarker: React.FC<HotelMarkerProps> = ({ hotel }) => {
  const customIcon = L.divIcon({
    html: `
    <div class="flex items-center justify-center w-10 h-10 bg-primary-gold text-white rounded-full shadow-lg cursor-pointer hover:bg-primary-gold/90 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 10a3 3 0 110-6 3 3 0 010 6z" />
      </svg>
    </div>
  `,
    className: "custom-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  const formattedTitle = hotel.title.includes("|")
    ? hotel.title.split("|")[1].trim()
    : hotel.title;

  const pricePerNightFromStorage = localStorage.getItem("price_per_night");

  return (
    <>
      <Marker
        key={hotel.id}
        position={[hotel.location.latitude, hotel.location.longitude]}
        icon={customIcon}>
        <Popup className="custom-popup">
          <div className="w-full flex flex-col overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="relative w-full">
              {hotel.images &&
              hotel.images.some(
                (img: any) => img.paths && img.paths.length > 0
              ) ? (
                (() => {
                  // Check if Slider or Gallery has images
                  const sliderAlbum = hotel.images.find(
                    (img: { album_name: string; paths: string | any[] }) =>
                      img.album_name === "Slider" && img.paths.length > 0
                  );
                  const galleryAlbum = hotel.images.find(
                    (img: { album_name: string; paths: string | any[] }) =>
                      img.album_name === "Gallery" && img.paths.length > 0
                  );

                  // If Slider has images, use it
                  if (sliderAlbum) {
                    return (
                      <ImageCarousel
                        key="slider"
                        images={sliderAlbum.paths}
                        slug={`/property/${hotel.slug}?startDate=${hotel.from_date}&endDate=${hotel.to_date}&adults=2`}
                        rounded={false}
                      />
                    );
                  }
                  // If Gallery has images, use it (limited to 5)
                  else if (galleryAlbum) {
                    return (
                      <ImageCarousel
                        key="gallery"
                        images={galleryAlbum.paths.slice(0, 5)}
                        slug={`/property/${hotel.slug}?startDate=${hotel.from_date}&endDate=${hotel.to_date}&adults=2`}
                        rounded={false}
                      />
                    );
                  }
                  // If neither Slider nor Gallery has images, find first album with at least 1 image
                  else {
                    const firstAlbumWithImages = hotel.images.find(
                      (img: { paths: string | any[] }) =>
                        img.paths && img.paths.length > 0
                    );
                    if (firstAlbumWithImages) {
                      return (
                        <ImageCarousel
                          key={firstAlbumWithImages.album_name}
                          images={firstAlbumWithImages.paths.slice(0, 5)}
                          slug={`/property/${hotel.slug}?startDate=${hotel.from_date}&endDate=${hotel.to_date}&adults=2`}
                          rounded={false}
                        />
                      );
                    }
                    // If no album has images, return null (FallbackImage will be used)
                    return null;
                  }
                })()
              ) : (
                <MapFallbackImage rounded={false} slug={"#"} />
              )}
            </div>
            <div className="p-3">
              <h3 className="text-gray-900 text-sm font-semibold line-clamp-1">
                {formattedTitle}
              </h3>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="line-clamp-1">
                  {hotel.location.city}, {hotel.location.country}
                </span>
              </div>
              <div className="text-xs font-semibold text-gray-800 mt-1">
                {hotel.booking_request === 1 ? (
                  <div className="bg-primary-gold text-white px-3 py-1 rounded-xl text-xs font-medium -ml-1 mt-1 w-24">
                    On Request
                  </div>
                ) : (
                  <>
                    {pricePerNightFromStorage &&
                    Number(pricePerNightFromStorage) > 0 ? (
                      <>
                        {hotel.currency}{" "}
                        {formatNumberWithCommas(pricePerNightFromStorage || 0)}
                        <span className="text-sm font-normal text-muted-foreground">
                          {" "}
                          per night
                        </span>
                      </>
                    ) : (
                      // Skeleton loader
                      <div className="h-4 w-24 bg-gray-300 animate-pulse rounded" />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </Popup>
      </Marker>
    </>
  );
};

export default PropertyMarker;
