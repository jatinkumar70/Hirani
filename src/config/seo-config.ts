import { Images } from "../../asserts/Import/Images";

export const SITE_URL = "https://www.bnbmehomes.com";
export const SITE_NAME = "bnbmehomes";
export const DEFAULT_TITLE = "Luxury Vacation Rentals | bnbmehomes";
export const DEFAULT_DESCRIPTION =
  "Discover luxury vacation rentals in Dubai and Riyadh. Book your perfect stay with bnbmehomes for an unforgettable experience.";
export const NEXT_SEO_DEFAULT = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  canonical: SITE_URL,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: Images.homePage.src,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
        type: "image/png",
      },
    ],
  },
  twitter: {
    handle: "@bnbmehomes",
    site: "@bnbmehomes",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "theme-color",
      content: "#ffffff",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/logo_white.png",
    },
    {
      rel: "apple-touch-icon",
      href: "/logo_white.png",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
  ],
};
