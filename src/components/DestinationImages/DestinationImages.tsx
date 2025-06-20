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
        "Mandi is a picturesque hill station in Himachal Pradesh, known for its ancient temples, scenic beauty, and rich cultural heritage. It's often called the 'Varanasi of Hills' due to its numerous temples.",
      hotelLocation: "Mandi",
      link: "/search?placeId=ChIJY2IG66kUXz4RZOB_j8cWtjk&startDate=2025-04-08&endDate=2025-04-09&adult=2",
    },
    {
      id: "expo",
      src: HotelsImage.Hotel13,
      alt: "Bird's eye view of Expo City Dubai showing pavilions and landscaping",
      title: "Spiti",
      aspectRatio: "square",
      description:
        "Spiti Valley is a high-altitude desert mountain valley in the Himalayas, known for its stunning landscapes, ancient monasteries, and unique culture. It's often called 'Little Tibet' due to its Tibetan Buddhist influence.",
      hotelLocation: "Spiti",
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
        "Jaisalmer is the 'Golden City' of Rajasthan, famous for its magnificent sandstone fort, havelis, and desert landscapes. It's a gateway to the Thar Desert and offers camel safaris and cultural experiences.",
      hotelLocation: "Jaisalmer",
      link: "/search?placeId=ChIJg_kMcC9oXz4RBLnAdrBYzLU&startDate=2025-04-08&endDate=2025-04-09&adult=2",
    },

    {
      id: "palm",
      src: HotelsImage.Hotel15,
      alt: "Aerial view of Palm Jumeirah showing the palm-shaped island",
      aspectRatio: "square",
      title: "Manali",
      description:
        "Manali is a popular hill station in Himachal Pradesh, known for its snow-capped mountains, adventure sports, apple orchards, and vibrant culture. It's a perfect destination for both relaxation and adventure.",
      hotelLocation: "Manali",
      link: "/search?placeId=ChIJFTtlwikVXz4RFj5Kdq68yj0&startDate=2025-04-08&endDate=2025-04-09&adult=2",
    },
    {
      id: "business-bay",
      src: HotelsImage.Hotel16,
      alt: "Night view of Business Bay district with illuminated buildings",
      title: "Kullu",
      aspectRatio: "square",
      description:
        "Kullu Valley is known as the 'Valley of Gods' in Himachal Pradesh, famous for its scenic beauty, apple orchards, and the annual Kullu Dussehra festival. It's surrounded by snow-capped peaks and offers various outdoor activities.",
      hotelLocation: "Kullu",
      link: "/search?placeId=ChIJV_Ql7y1oXz4RDpVweQnE1D0&startDate=2025-04-08&endDate=2025-04-09&adult=2",
    },
  ],
};
