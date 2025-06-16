import {
  CircleCheckBig,
  HeartHandshake,
  KeyRound,
  MapPinned,
  MessageSquare,
  SprayCan,
} from "lucide-react";
import React from "react";
import { Property } from "../../../types/types";

interface ISingleHotelProp {
  HotelData: Property;
}

const PropertyRatingSection: React.FC<ISingleHotelProp> = ({ HotelData }) => {
  const ratings = [5, 4, 3, 2, 1];
  const getRatingPercentage = (rating: 5 | 4 | 3 | 2 | 1): number => {
    const ratingPercentages: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    } = {
      5: 80,
      4: 10,
      3: 5,
      2: 3,
      1: 2,
    };
    return ratingPercentages[rating];
  };

  const ratingSections = [
    {
      title: "Cleanliness",
      value: 5.9,
      icon: <SprayCan size={45} />,
    },
    {
      title: "Accuracy",
      value: 5.0,
      icon: <CircleCheckBig size={45} />,
    },
    {
      title: "Check-in",
      value: 4.8,
      icon: <KeyRound size={45} />,
    },
    {
      title: "Communication",
      value: 5.0,
      icon: <MessageSquare size={45} />,
    },
    {
      title: "Location",
      value: 5.0,
      icon: <MapPinned size={45} />,
    },
  ];

  return (
    <div
      className="p-4 lg:p-8"
      id="reviews"
      style={{ scrollMarginTop: "100px" }}>
      {/* Overall Rating Section */}
      <div className="text-center mb-8 w-56 mx-auto">
        <div className="flex items-center justify-center space-x-2">
          <HeartHandshake size={45} />
          <span className="text-5xl font-bold">4.95</span>
          <HeartHandshake size={45} />
        </div>
        <h2 className="text-2xl font-semibold mt-3">Guest favourite</h2>
        <p className="text-gray-500 text-xs">
          Lorem ipsum dolor sit amet, cons ectetur adipiscing elit.
        </p>
      </div>

      {/* Ratings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mx-auto">
        {/* Overall Rating */}
        <div className="rtl:text-center text-start border-r-2 border-gray-400 pr-4">
          <h3 className="text-base font-medium mb-2">Overall rating</h3>
          <div className="space-y-2">
            {ratings.map((rating) => (
              <div key={rating} className="flex items-center">
                <span className="text-xs w-4 text-right">{rating}</span>
                <div className="flex-1 ml-2 h-1 bg-gray-200 rounded">
                  <div
                    className="h-1 bg-yellow-600 rounded"
                    style={{
                      width: `${getRatingPercentage(
                        rating as 5 | 4 | 3 | 2 | 1
                      )}%`,
                    }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Rating Sections */}
        {ratingSections.map(({ title, value, icon }, index) => (
          <div
            key={index}
            className={`rtl:text-center text-start  hidden lg:flex flex-col gap-4 ${
              index < ratingSections.length - 1
                ? "border-r-2 border-[#999999]"
                : ""
            }`}>
            <h3 className="text-base font-medium">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
            <span className="rtl:mx-auto">{icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyRatingSection;
