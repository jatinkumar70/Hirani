import React from "react";
import Section from "../../common/Section/Section";
import { Property } from "../../types/types";
import { Checkout } from "./components/Checkout/Checkout";

export function ReservationBookingPage({
  BookHotelData,
}: {
  BookHotelData: Property;
}) {
  return (
    <Section className="lg:px-24 px-8">
      <Checkout data={BookHotelData} />
    </Section>
  );
}
