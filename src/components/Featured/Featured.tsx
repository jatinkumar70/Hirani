import React from "react";
import { ArrowRight } from "lucide-react";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

interface ArticleProps {
  id: number;
  image: string;
  title: string;
  content: string;
  link?: string;
}

const articles: ArticleProps[] = [
  {
    id: 1,
    image: "https://v1.bnbmehomes.com/assets/img/list_property/Link%201.jpg",
    title: "Holiday Homes Are The New Trend For Tourists Travelling To Dubai",
    content:
      "Bed and Breakfast (b&b&apos;s) holiday homes are fast becoming the new trend for travellers in Dubai. The main reason for the preference is that these holiday homes are the safest option for a holiday especially during COVID 19 times.With the gradual opening up of international travel, insiders now have the...",
    link: "https://boldoutline.in/holiday-homes-are-the-new-trend-for-tourists-travelling-to-dubai.html",
  },
  {
    id: 2,
    image: "https://v1.bnbmehomes.com/assets/img/list_property/link%202.jpg",
    title:
      "You may not be in as bad a position as you think says Vinayak Mahtani, bnbme",
    content:
      "The world is in chaos, with the biggest and most influential economies falling. Arguably, the sector that has taken the hardest hit are hospitality and travel. If you are a small business owner, you need to remember that this is where you need to step up as an entrepreneur. After all...",
    link: "https://gecnewswire.com/you-may-not-be-in-as-bad-a-position-as-you-think-says-vinayak-mahtani-bnbme/",
  },
  {
    id: 3,
    image: "https://v1.bnbmehomes.com/assets/img/list_property/Link%203.JPG",
    title:
      "bnbme holiday homes introduces UAE&apos;s first bespoke supper club with luxury",
    content:
      "Curated by celebrity chefs at luxury residences, guests can choose from a range of locations - a private tent, the pool, desert or even a few exclusive spots only their expert guides know...",
    link: "https://www.hotelnewsme.com/fb/bnbme-holiday-homes-introduces-uaes-first-bespoke-supper-club-with-luxury/",
  },
  {
    id: 4,
    image: "https://v1.bnbmehomes.com/assets/img/list_property/Link%204.JPG",
    title:
      "Glamping takes off as Expo 2020 Dubai attracts over 2m visitors in October",
    content:
      "Looking to Expo 2020 Dubai are increasingly turning to glamping as their accommodation of choice during their stay in the emirate, according to a leading industry expert Vinayak...",
    link: "https://www.arabianbusiness.com/gcc/uae/470622-glamping-takes-off-as-expo-2020-dubai-attracts-over-2m-visitors-in-october",
  },
];

const MediaFeatured: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 md:px-8 container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-black relative inline-block">
          MEDIA &amp; FEATURED
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-400"></span>
        </h2>
      </div>

      <div className="space-y-8">
        {articles.slice(0, 15).map((article) => (
          <div
            key={article.id}
            className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="md:w-2/5 lg:w-1/3">
              <OptimizedImage
                src={article.image}
                alt={article.title}
                width={300}
                height={300}
                rounded={false}
              />
            </div>
            <div className="md:w-3/5 lg:w-2/3 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-black mb-2">
                {article.title.replace(/&apos;/g, "'")}
              </h3>
              <p className="text-gray-700 mb-3 text-sm md:text-base">
                {article.content.replace(/&apos;/g, "'")}
              </p>
              <a
                href={`${article.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-medium flex items-center text-sm group">
                Read More
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MediaFeatured;
