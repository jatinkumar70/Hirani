import L from "leaflet";
import { MapPin } from "lucide-react";
import type React from "react";
import { Marker, Popup } from "react-leaflet";
import { Property } from "../../../../../types/types";
import ImageCarousel from "../../../../ImageCarousel/ImageCarousel";
import MapFallbackImage from "../../../../../common/FallBackLogo/MapFallBackLogo";
import { formatNumberWithCommas } from "../../../../../constants/constants";
import Link from "next/link";

interface HotelMarkerProps {
  hotel: Property[];
  loc?: any;
}

const HotelMarker: React.FC<HotelMarkerProps> = ({ hotel, loc }) => {
  return (
    <>
      {hotel.map((hotel: Property) => {
        const priceHtml =
          hotel.booking_request === 1
            ? `<span class="text-sm font-bold">bnbme</span>`
            : `<span class="text-sm">${hotel.currency}</span>
     <span class="text-sm">${formatNumberWithCommas(
       hotel.non_refundable_price || 1234
     )}</span>`;
        const customIcon = L.divIcon({
          html: `
  <div class="group relative flex items-center justify-center">
    <div class="absolute top-12 bg-white text-black transition-transform duration-300 hover:scale-125 active:scale-100 font-semibold px-2 py-1 p-1 rounded-3xl shadow-lg flex items-center gap-1">
      ${priceHtml}
    </div>
  </div>
`,
          className: "custom-icon",
          iconSize: [40, 50],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        });

        // Function to pluralize key based on value
        const getPluralKey = (key: string, value: number) => {
          return value > 1 ? `${key}s` : key;
        };

        // Extract query params from the current URL
        const urlParams = new URLSearchParams(window.location.search);

        const startDate = urlParams.get("startDate") || hotel.from_date;
        const endDate = urlParams.get("endDate") || hotel.to_date;
        const adults = Number(urlParams.get("adults")) || 2;
        const infant =
          Number(urlParams.get("infant")) ||
          Number(urlParams.get("infants")) ||
          0;
        const kid = Number(urlParams.get("kid")) || 0;
        const pet = Number(urlParams.get("pet")) || 0;

        // Build query parameters array
        const queryParams = [
          `startDate=${startDate}`,
          `endDate=${endDate}`,
          `${getPluralKey("adult", adults)}=${adults}`,
          infant > 0 && `${getPluralKey("infant", infant)}=${infant}`,
          kid > 0 && `${getPluralKey("kid", kid)}=${kid}`,
          pet > 0 && `${getPluralKey("pet", pet)}=${pet}`,
        ].filter(Boolean); // remove any falsy values (like false when infant = 0 etc)

        // Join them into a query string
        const slug = `/property/${hotel.slug}?${queryParams.join("&")}`;

        const formattedTitle = hotel.title.includes("|")
          ? hotel.title.split("|")[1].trim()
          : hotel.title;

        return (
          <Marker
            key={hotel.id}
            position={[hotel.location.latitude, hotel.location.longitude]}
            icon={customIcon}>
            <Popup className="custom-popup">
              <div className="w-full flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="relative w-full h-[200px]">
                  {hotel.images &&
                  hotel.images.some(
                    (img: any) => img.paths && img.paths.length > 0
                  ) ? (
                    (() => {
                      // Check if Slider or Gallery has images
                      const sliderAlbum = hotel.images.find(
                        (img) =>
                          img.album_name === "Slider" && img.paths.length > 0
                      );
                      const galleryAlbum = hotel.images.find(
                        (img) =>
                          img.album_name === "Gallery" && img.paths.length > 0
                      );

                      // If Slider has images, use it
                      if (sliderAlbum) {
                        return (
                          <ImageCarousel
                            key="slider"
                            images={sliderAlbum.paths}
                            slug={slug}
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
                            slug={slug}
                            rounded={false}
                          />
                        );
                      }
                      // If neither Slider nor Gallery has images, find first album with at least 1 image
                      else {
                        const firstAlbumWithImages = hotel.images.find(
                          (img) => img.paths && img.paths.length > 0
                        );
                        if (firstAlbumWithImages) {
                          return (
                            <ImageCarousel
                              key={firstAlbumWithImages.album_name}
                              images={firstAlbumWithImages.paths.slice(0, 5)}
                              slug={slug}
                              rounded={false}
                            />
                          );
                        }
                        // If no album has images, return null (FallbackImage will be used)
                        return null;
                      }
                    })()
                  ) : (
                    <MapFallbackImage rounded={false} slug={slug} />
                  )}
                </div>
                <Link href={slug}>
                  <div className="p-4">
                    <h3 className="text-gray-900 text-sm font-semibold line-clamp-1">
                      {formattedTitle}
                    </h3>
                    <div className="flex items-center text-xs text-gray-600 mt-1">
                      {/* <MapPin className="w-4 h-4 mr-1" /> */}
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
                          <div className="text-xs font-semibold text-gray-800 mt-1">
                            {hotel.currency}{" "}
                            {formatNumberWithCommas(
                              hotel.non_refundable_price || 0
                            )}{" "}
                            <span className="text-sm font-normal">
                              / per night
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default HotelMarker;
