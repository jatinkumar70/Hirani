import {
  BedDouble,
  ChevronDown,
  ChevronUp,
  KeyRound,
  MessageCircle,
  PawPrint,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import HtmlContentRenderer from "../../../../components/HtmlContentRenderer/HtmlContentRenderer";
import { Property } from "../../../../types/types";
import { PropertyAmenities } from "../PropertyAmenities/PropertyAmenities";
import PropertyDetailsHeader from "../PropertyDetailsHeader/PropertyDetailsHeader";
import PropertyNearbyPlaces from "../PropertyNearBy/PropertyNearBy";

interface ISingleHotelProp {
  hotelData: Property;
  handleClick?: () => void;
}

const PropertyDetails = ({ hotelData, handleClick }: ISingleHotelProp) => {
  return (
    <div className="w-full md:w-[65%]  flex flex-col">
      <PropertyDetailsHeader
        button1={"Show All photos"}
        button2={"Video walkthrough"}
        button3={"Floor plans"}
        handleClickImage={handleClick}
        hotelData={hotelData}
      />
      <PropertyInfo hotelData={hotelData} />

      {/* <PhotoTour /> */}

      <div className="border-b border-black/20 py-3"></div>

      <PropertyListingInfo
        propertyListInfo={[
          {
            text: "Great check-in experience",
            desc: "95% of recent guests gave the check-in process a 5-star rating.",
            icon: <KeyRound />,
          },
          {
            text: "Pet friendly let",
            desc: "Bring your pets along for the stay.",
            icon: <PawPrint />,
          },
          {
            text: "Great communication",
            desc: "90% of recent guests rated Daniel 5-star in communication.",
            icon: <MessageCircle />,
          },
        ]}
      />
      <div className="border-b border-black/20 py-3"></div>

      {hotelData.description && <PropertyDescription HotelDesc={hotelData} />}

      <div className="py-6 flex flex-col gap-2 ">
        {/* <HotelRoomCard hotelData={hotelData} /> */}
        <span className="text-xl font-semibold">Where you&apos;ll sleep</span>
        <div className="flex flex-col gap-4 border border-black/20 p-8 w-44 rounded-xl">
          <BedDouble size={25} />
          <div className="flex flex-col gap-1">
            <span className="text-xl font-semibold">Living area</span>
            <span className="text-base">
              {hotelData?.details?.available_beds} double bed
            </span>
          </div>
        </div>
      </div>
      <div className="border-b border-black/20 "></div>
      <PropertyAmenities hotelAmenities={hotelData} />
      {/* <div className="border-b border-black/20 py-3"></div> */}
      <PropertyNearbyPlaces hotelData={hotelData} />
    </div>
  );
};

export default PropertyDetails;

//**  ---------  PROPERTY DETAILS INFO ---------------- */

export const PropertyInfo = ({ hotelData }: ISingleHotelProp) => {
  const { available_beds, bathroom_full, bedrooms, guests } = hotelData.details;
  const details = [
    { text: `${guests} guest${guests > 1 ? "s" : ""}` },
    {
      text:
        bedrooms && bedrooms > 0
          ? `${bedrooms} bedroom${bedrooms > 1 ? "s" : ""}`
          : "Studio",
    },
    { text: `${available_beds} bed${available_beds > 1 ? "s" : ""}` },
    { text: `${bathroom_full} bathroom${bathroom_full > 1 ? "s" : ""}` },
    // { text: `${min_stay}`, icon: <User size={17} /> },
  ];

  return (
    <div className="flex overflow-x-auto hide-scrollbar text-base gap-4 lg:gap-1">
      {details.map((detail, index) => (
        <div key={index} className="flex items-center lg:min-w-0">
          {index > 0 && <span className="mx-1 text-gray-500">•</span>}
          <div className="flex items-center gap-1 whitespace-nowrap">
            <span className="text-center">{detail?.text}</span>
            {/* {detail.icon && (
              <span className="text-primary">{detail?.icon}</span>
            )} */}
          </div>
        </div>
      ))}
    </div>
  );
};

//**  ---------  PROPERTY LIST INFO ---------------- */

interface IProperty {
  icon: JSX.Element;
  text: string;
  desc: string;
}

interface PropertyListInfoProps {
  propertyListInfo: IProperty[];
}

const PropertyListingInfo = ({ propertyListInfo }: PropertyListInfoProps) => {
  return (
    <div className="flex flex-col gap-3 pt-4">
      {propertyListInfo.map((propertyList) => (
        <div
          key={propertyList.text} // Use a unique identifier as key instead of index
          className="flex items-start gap-3 pt-1"
          role="listitem">
          <div className="icon-container">{propertyList.icon}</div>
          <div className="flex flex-col gap-1 text-base">
            <div className="font-semibold">{propertyList.text}</div>
            <div className="font-light">{propertyList.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

//**  ---------  PROPERTY DESCRIPTION ---------------- */

export const PropertyDescription = ({ HotelDesc }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Restore body scroll
    document.body.style.overflow = "unset";
  };

  // Check if description is long enough to need truncation
  const shouldShowToggle =
    HotelDesc.description && HotelDesc.description.length > 200;

  // Handle escape key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 pt-4 text-base">
        <div className="text-gray-700 leading-relaxed">
          {shouldShowToggle ? (
            <div
              dangerouslySetInnerHTML={{
                __html: HotelDesc.description.substring(0, 280) + "...",
              }}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: HotelDesc.description || "N/A",
              }}
            />
          )}
        </div>

        {shouldShowToggle && (
          <button
            onClick={openModal}
            className="text-sm text-black font-semibold border border-black/20 bg-gray-100 rounded-lg p-2 transition-colors w-fit">
            Show More
          </button>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000]"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}>
          <div
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Property Description
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal">
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div
                className="text-gray-700 leading-relaxed prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{
                  __html: HotelDesc.description || "N/A",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
