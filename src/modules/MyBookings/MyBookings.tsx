import image1 from "../../../asserts/hotels/hotel-10.webp";
import { useState } from "react";
import TripCard from "./components/TripCard";
import FloatingWhatsAppButton from "../../components/whatsapp/FloatingWhatsAppButton ";
import Section from "../../common/Section/Section";

export default function MyBookings() {
  const [dismissedRatings, setDismissedRatings] = useState<number[]>([]);

  const upcomingTrips = [
    {
      title: "Chic Apartment Dubai Creek",
      image: image1,
      dateRange: "27-30th of June, 2024",
      location: "Dubai",
      beds: 2,
      bedrooms: 2,
      guests: 4,
      price: 672,
      status: "Completed",
      showActions: true,
    },
  ];

  const pastTrips = [
    {
      image: image1,
      title: "Chic Apartment Dubai Creek",
      dateRange: "27-30th of June, 2024",
      location: "Dubai",
      beds: 2,
      bedrooms: 2,
      guests: 4,
      price: 672,
      status: "Completed",
      showRating: true,
    },
    {
      image: image1,
      title: "Chic Apartment Dubai Creek",
      dateRange: "27-30th of June, 2024",
      location: "Dubai",
      beds: 2,
      bedrooms: 2,
      guests: 4,
      price: 672,
      status: "Completed",
      showRating: true,
    },
  ];

  return (
    <div className="bg-[#FAFAFA]">
      <Section className="py-12 bg-[#FAFAFA]">
        <h1 className="mb-8 text-3xl font-semibold">My bookings</h1>

        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Upcoming trips</h2>
            <div className="space-y-4">
              {upcomingTrips.map((trip, index) => (
                <TripCard key={index} {...trip} isUpcoming={true} />
              ))}
            </div>
          </div>
          <div className="h-px bg-[#E5D6A7]" /> {/* Golden separator */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Past trips</h2>
            <div className="space-y-4">
              {pastTrips.map((trip, index) => (
                <TripCard
                  key={index}
                  {...trip}
                  isUpcoming={false}
                  showRating={!dismissedRatings.includes(index)}
                  onDismissRating={() => {
                    setDismissedRatings((prev) => [...prev, index]);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>
      <FloatingWhatsAppButton />
    </div>
  );
}
