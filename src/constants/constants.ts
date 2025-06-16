export const DRAWER_WIDTH = 245;

export const isProduction = process.env.ENVIRONMENT === "production";

export const MOBILE_NUMBER = process.env["MOBILE_NUMBER"] || "011-47090909";

export const whatsappUrl: string = "https://wa.me/971521792212";

export const whatsappUrlLandingPage: string = "https://wa.me/971504522981";

export const pageTitle = "Bnbme Your Homes - Book Your Dream Getaway Today";

export const pageDescription =
  "Discover a collection of luxurious vacation rentals at BNB Me Homes. Explore our handpicked properties and book your dream getaway today. Experience comfort, convenience, and unmatched hospitality.";

export const generateSlug = (title: string) => {
  return title
    .toLowerCase() //* Convert to lowercase
    .replace(/[^a-z0-9\s]/g, "") //*  Remove special characters except spaces
    .replace(/\s+/g, "-") //*  Replace spaces with hyphens
    .trim(); //*  Remove any leading/trailing spaces
};

export const formatText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/_/g, " ") //*  Replace underscores with spaces
    .replace(/\b\w/g, (char: string) => char.toUpperCase()); //*  Capitalize first letter of each word
};

export function formatNumberWithCommas(value: number | string): string {
  return value.toLocaleString("en-US");
}
