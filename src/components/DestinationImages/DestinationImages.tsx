import { HotelsImage } from "../../../asserts/Import/Images";
import { GridImage } from "../../types/types";

export const DestinationImages: {
  topRow: GridImage[];
  bottomRow: GridImage[];
} = {
  topRow: [
    {
      id: "marina",
      src: HotelsImage.Hotel12,
      alt: "Aerial view of Dubai Marina showing modern skyscrapers and yacht harbor",
      title: "Mandi",
      aspectRatio: "square",
      description:
        "Dubai Marina is an artificial canal city, built along a 3 km stretch of Persian Gulf shoreline. It features luxury apartments, hotels, and a vibrant waterfront promenade.",
      hotelLocation: "Address Dubai Marina",
      link: "/search?placeId=ChIJY2IG66kUXz4RZOB_j8cWtjk&startDate=2025-04-08&endDate=2025-04-09&adult=2",
    },
    {
      id: "expo",
      src: HotelsImage.Hotel13,
      alt: "Bird's eye view of Expo City Dubai showing pavilions and landscaping",
      title: "Spiti",
      aspectRatio: "square",
      description:
        "Bluewaters Dubai is a futuristic district that has been repurposed from the Expo 2020 site. It showcases innovation, sustainability, and cutting-edge technology.",
      hotelLocation: "Rove Expo 2020",
      link: "/search?placeId=ChIJT8PGYKQUXz4RigdkEYbMr5k&startDate=2025-04-08&endDate=2025-04-09&adult=2",
    },
  ],
  bottomRow: [
    {
      id: "downtown",
      src: HotelsImage.Hotel14,
      alt: "Sunset view of Dubai Downtown featuring Burj Khalifa",
      title: "Jaisalmer",
      aspectRatio: "square",
      description:
        "Downtown Dubai is a bustling city center known for the iconic Burj Khalifa, Dubai Mall, and the Dubai Fountain. It's a hub for tourism, entertainment, and luxury living.",
      hotelLocation: "Address Downtown",
      link: "/search?placeId=ChIJg_kMcC9oXz4RBLnAdrBYzLU&startDate=2025-04-08&endDate=2025-04-09&adult=2",
    },

    {
      id: "palm",
      src: HotelsImage.Hotel15,
      alt: "Aerial view of Palm Jumeirah showing the palm-shaped island",
      aspectRatio: "square",
      title: "Manali",
      description:
        "Palm Jumeirah is an artificial archipelago in the shape of a palm tree. It features luxury hotels, beach clubs, and high-end residences with stunning views of the Arabian Gulf.",
      hotelLocation: "Atlantis, The Palm",
      link: "/search?placeId=ChIJFTtlwikVXz4RFj5Kdq68yj0&startDate=2025-04-08&endDate=2025-04-09&adult=2",
    },
    {
      id: "business-bay",
      src: HotelsImage.Hotel16,
      alt: "Night view of Business Bay district with illuminated buildings",
      title: "Kullu",
      aspectRatio: "square",
      description:
        "Business Bay is a central business district offering a mix of residential and commercial properties. It's known for its modern architecture and proximity to Downtown Dubai.",
      hotelLocation: "JW Marriott Marquis Hotel Dubai",
      link: "/search?placeId=ChIJV_Ql7y1oXz4RDpVweQnE1D0&startDate=2025-04-08&endDate=2025-04-09&adult=2",
    },
  ],
};
