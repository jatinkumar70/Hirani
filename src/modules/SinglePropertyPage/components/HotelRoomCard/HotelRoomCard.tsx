import Image from "next/image";
import { apiBaseurl, imagePrefix } from "../../../../utils/api";

interface HotelRoomCardProps {
  hotelData: any;
}

export default function HotelRoomCard({ hotelData }: HotelRoomCardProps) {
  // Find the bedroom and bathroom albums if available
  const bedroomAlbum = hotelData.images?.find((img: { album_name: string }) =>
    img.album_name.toLowerCase().includes("bedroom")
  );

  // Room type and bed information
  const roomType = hotelData.roomType || "Living area";
  const bedInfo = hotelData.bedType || "1 double bed";

  return (
    <div className="w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Where you&apos;ll sleep</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Bedroom Card */}
        <div className="relative h-52 rounded-lg overflow-hidden">
          {bedroomAlbum?.paths?.[0] ? (
            <Image
              src={`${imagePrefix}/${bedroomAlbum.paths[0]}`}
              alt="Bedroom"
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-black"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-xl font-semibold">Bedroom</h3>
            <p className="text-sm">{bedInfo}</p>
          </div>
        </div>

        {/* Bathroom Card */}
        {/* <div className="relative h-48 rounded-lg overflow-hidden">
          {bedroomAlbum?.paths?.[1] ? (
            <Image
              src={`${imagePrefix}/${bedroomAlbum.paths[4]}`}
              alt="Bathroom"
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-black"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-xl font-semibold">Bathroom</h3>
            <p className="text-sm">Private bathroom</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
