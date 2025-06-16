import { format } from "date-fns";

// Simplified WhatsApp message formatter
const formatWhatsAppMessage = (
  guestName: string,
  email: string,
  phone: string,
  countryCode: string,
  checkInDate: Date,
  checkOutDate: Date,
  propertySlug: string
) => {
  const propertyUrl = `https://www.bnbmehomes.com/property/${propertySlug}`;

  const message = `Hi Bnbmehomes Team,
I'm interested in booking your property. Please find my details below:

*Name:* ${guestName}
*Contact:* ${email} | ${countryCode}${phone}
*Check-in – Check-out:* ${format(checkInDate, "MMM dd")} – ${format(
    checkOutDate,
    "MMM dd, yyyy"
  )}
*Property Details:* ${propertyUrl}

Looking forward to hearing from you. Thank you!`;

  return encodeURIComponent(message);
};

export default formatWhatsAppMessage;
