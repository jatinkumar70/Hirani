
import frame from "../../asserts/hotelInterior/Frame.webp";
import frame2 from "../../asserts/hotelInterior/1772.webp";
import frame3 from "../../asserts/hotelInterior/2222.webp";
import frame4 from "../../asserts/hotelInterior/33164.webp";
import { IBlogPost } from "../components/BlogCard/blog-card";





// Assuming you want to use `frame` as a static image URL
const frameImageUrl = frame.src;  // Extracts the URL of the static image

export const blogPosts: IBlogPost[] = [
    {
        id: "1",
        title: "Top 7 reasons why holiday homes are best for travellers in 2023 B2C",
        date: "20/06/2024",
        description:
            "Are you tired of vacationing in the same old hotels when you travel? Say goodbye to cookie-cutter hotel stays and welcome to a personalised and one-of-a-kind trip. For good reason, vacation houses are becoming increasingly popular among travellers. Holiday houses provide additional room, privacy, and flexibility for travellers seeking an authentic and pleasant experience. Here are the top seven reasons why vacation homes are the greatest option for travellers searching for a one-of-a-kind and personalised travel experience.",
        image: frameImageUrl,  // Use the URL from frame.src
        slug: "",
    },
    {
        id: "2",
        title: "Why short-term rentals are better than long-term rentals for landlords in Dubai?",
        date: "20/06/2024",
        description:
            "Dubai has become one of the top tourist destinations in the world. As a result, many tourists and expats prefer a homely touch to their vacations and opt for short-term rental properties, including holiday homes and BnBs. These types of properties provide a hassle-free experience, access to appliances, and all-inclusive utility bills, making them a popular choice in the city.",
            image: frame2.src,
        slug: "",
    },
    {
        id: "3",
        title: "Top mistakes to avoid when buying a property",
        date: "20/06/2024",
        description:
            "Purchasing a home is a major investment that needs careful thought and planning. Although the procedure can be thrilling, it's critical to be mindful of potential dangers that could result in expensive errors. In this blog post, we list the top mistakes to avoid when purchasing real estate in order to make the process easier and more fruitful.",
            image: frame3.src,
        slug: "",
    },
    {
        id: "4",
        title: "An expat investor's guide to promising opportunities in Dubai B2B",
        date: "20/06/2024",
        description:
            "For foreigners wishing to increase their fortune, Dubai provides a wide range of investment opportunities because of its robust economy, investor-friendly legislation, and advantageous location. This blog article is a resource for foreign investors looking for safe places to put their hard-earned cash in Dubai, covering everything from real estate and equities to business initiatives and startups.",
            image: frame4.src,
        slug: "",
    },
];
