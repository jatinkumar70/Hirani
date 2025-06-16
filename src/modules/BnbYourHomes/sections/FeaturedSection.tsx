// import { Card } from "@/components/ui/card";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/Carousel/Carousel";
import { Card } from "../../../components/ui/Card/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../../../components/ui/Dialog/Dialog";

const FeaturedSection = () => {
  const [selectedAward, setSelectedAward] = useState<
    (typeof awardsData)[0] | null
  >(null);
  const featuredItems = [
    {
      category: "GULF NEWS",
      title: "Hotspot for holiday homes",
      image: "https://v1.bnbmehomes.com/assets/img/11.36.36-min.jpg",
      link: "https://gulfnews.com/business/property/how-dubai-developers-muscle-into-holiday-homes-1.68661264",
      featured: true,
    },
    {
      category: "ARABIAN GAZETTE",
      title: "Leaders in Hospitality",
      image: "https://v1.bnbmehomes.com/assets/img/list_property/boss1_new.jpg",
      link: "https://arabiangazette.com/bnbme-holiday-homes-by-hoteliers-nominated-for-leaders-in-hospitality-award/",
      isNextLink: true,
    },
    {
      category: "THE NATIONAL",
      title: "Demand for our glamping set-ups",
      image: "https://v1.bnbmehomes.com/assets/img/list_property/Glamper.jpg",
      link: "https://www.thenationalnews.com/uae/2022/02/14/uae-hotels-set-for-a-busy-half-term-as-bookings-surge/",
      isNextLink: true,
    },
    {
      category: "ARABIAN BUSINESS",
      title: "Entrepreneur of the week",
      image:
        "https://v1.bnbmehomes.com/assets/img/list_property/Property%202.jpg",
      link: "https://www.arabianbusiness.com/gcc/uae/432760-entrepreneur-of-the-week-shilpa-vinayak-mahtani-founders-of-bnbme-holiday-homes-by-hoteliers",
      isNextLink: true,
    },
    {
      category: "NEXT",
      title: "View More",
      image: "",
      link: "/featured",
      isNextLink: true,
    },
  ];

  const awardsData = [
    {
      title: "Airbnb Superhost",
      description: (
        <>
          Recognized for <strong>outstanding hospitality</strong> and
          exceptional guest experiences
        </>
      ),
      image: "https://v1.bnbmehomes.com/assets/img/Artboar1.png",
      link: "#",
      content:
        "Being an Airbnb Superhost is about providing outstanding hospitality, which means being highly-rated, experienced, reliable, and responsive. Bnbme has won the Airbnb Superhost award for consistently receiving good star reviews and guest experiences. This all have been possible because of seamless bookings, world class facilities and us being solely dedicated to the comfort of our customers.",
    },
    {
      title: "International Travel Award 2021",
      description: (
        <>
          Honored for <strong>excellence</strong> in tourism and travel industry
        </>
      ),
      image: "https://v1.bnbmehomes.com/assets/img/trophy.png",
      link: "#",
      content:
        "International Travel Awards is crafted to honor the excellent performers in the tourism and travel industries around the world. bnbme won the award in 2021, cementing its place amongst the best.",
    },
    {
      title: "International Travel Award 2022",
      description: (
        <>
          Recognized for <strong>outstanding performance</strong> in hospitality
          sector
        </>
      ),
      image: "https://v1.bnbmehomes.com/assets/img/Trophy-min.png",
      link: "#",
      content:
        "International Travel award is crafted to honor the excellent performers in the tourism and travel industry around the world. bnbme won the award in 2022, cementing its place amongst the best.",
    },
    {
      title: "Best Holiday Homes Provider",
      description: (
        <>
          For delivering <strong>exceptional holiday experiences</strong>{" "}
          consistently
        </>
      ),
      image:
        "https://v1.bnbmehomes.com/assets/img/SMEAwards2022_Win_B2C_SME_Business_of_the_year.png",
      link: "#",
      content:
        "This prestigious recognition celebrates our commitment to providing outstanding holiday homes and exceptional guest experiences. Our dedication to maintaining high standards of service and accommodation has established us as a leader in the holiday homes sector.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-center mb-12">
          <h2 className="text-3xl font-semibold">
            Featured <span className="text-bnbme-gold">in</span>
          </h2>
        </div>

        {/* Desktop view - Grid layout with one large image and four smaller images */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 overflow-hidden rounded-xl">
            {/* Large feature image on the left */}
            {featuredItems
              .filter((item) => item.featured)
              .map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group overflow-hidden col-span-6 row-span-2">
                  <div className="h-full overflow-hidden">
                    <div
                      className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-110 ${
                        !item.image ? "bg-[#D4B779]" : ""
                      }`}
                      style={{
                        backgroundImage: item.image
                          ? `url(${item.image})`
                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        aspectRatio: "1/1",
                      }}></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                    <div className="uppercase text-xs tracking-wider mb-1 opacity-80">
                      {item.category}
                    </div>
                    <h3 className="text-xl font-medium">{item.title}</h3>
                    <div className="mt-2">
                      <ExternalLink className="h-4 w-4 text-white opacity-70" />
                    </div>
                  </div>
                </a>
              ))}

            {/* Four smaller images in a 2x2 grid */}
            <div className="col-span-6 grid grid-rows-2 grid-cols-2">
              {featuredItems
                .filter((item) => !item.featured)
                .slice(0, 4)
                .map((item, index) => (
                  <Link
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.isNextLink ? item.link : "#"}
                    className="relative group overflow-hidden"
                    {...(item.isNextLink
                      ? {}
                      : {
                          as: "a",
                          href: item.link,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}>
                    <div className="h-full overflow-hidden">
                      <div
                        className={`w-full h-full transition-transform duration-500 ease-out group-hover:scale-110 ${
                          !item.image ? "bg-[#D4B779]" : ""
                        }`}
                        style={{
                          backgroundImage: item.image
                            ? `url(${item.image})`
                            : "none",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          aspectRatio: "1/1",
                        }}></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                      <div className="uppercase text-xs tracking-wider mb-1 opacity-80">
                        {item.category}
                      </div>
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <div className="mt-2">
                        {item.isNextLink ? (
                          <ArrowRight className="h-4 w-4 text-white opacity-70" />
                        ) : (
                          <ExternalLink className="h-4 w-4 text-white opacity-70" />
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Mobile view - Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {featuredItems.map((item, index) => (
                <CarouselItem key={index}>
                  {item.isNextLink ? (
                    <Link
                      href={item.link}
                      className="relative block overflow-hidden rounded-lg">
                      <div className="aspect-square overflow-hidden">
                        <div
                          className={`w-full h-full transition-transform duration-500 ease-out hover:scale-110 ${
                            !item.image ? "bg-[#D4B779]" : ""
                          }`}
                          style={{
                            backgroundImage: item.image
                              ? `url(${item.image})`
                              : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}></div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                        <div className="uppercase text-xs tracking-wider mb-1 opacity-80">
                          {item.category}
                        </div>
                        <h3 className="text-base font-medium">{item.title}</h3>
                        <div className="mt-2">
                          <ArrowRight className="h-4 w-4 text-white opacity-70" />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block overflow-hidden rounded-lg">
                      <div className="aspect-square overflow-hidden">
                        <div
                          className={`w-full h-full transition-transform duration-500 ease-out hover:scale-110 ${
                            !item.image ? "bg-[#D4B779]" : ""
                          }`}
                          style={{
                            backgroundImage: item.image
                              ? `url(${item.image})`
                              : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}></div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white">
                        <div className="uppercase text-xs tracking-wider mb-1 opacity-80">
                          {item.category}
                        </div>
                        <h3 className="text-base font-medium">{item.title}</h3>
                        <div className="mt-2">
                          <ExternalLink className="h-4 w-4 text-white opacity-70" />
                        </div>
                      </div>
                    </a>
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* Awards and Recognition section */}
        <div className="mt-20">
          <div className="flex justify-center mb-12">
            <h2 className="text-3xl font-semibold">
              Awards & <span className="text-bnbme-gold">Recognition</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awardsData.map((award, index) => (
              <Card
                key={index}
                className="p-0 overflow-hidden hover:shadow-xl rounded-xl transition-all duration-300">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <div
                    className="w-full h-full bg-white"
                    style={{
                      backgroundImage: award.image
                        ? `url(${award.image})`
                        : "none",
                      backgroundSize: "contain ",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}></div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium mb-2">{award.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {award.description}
                  </p>
                  <button
                    onClick={() => setSelectedAward(award)}
                    className="flex items-center text-bnbme-gold text-sm hover:underline">
                    <span className="mr-1">Read more</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Dialog for award details */}
        <Dialog
          open={!!selectedAward}
          onOpenChange={() => setSelectedAward(null)}>
          <DialogContent className="sm:max-w-[500px] p-6 rounded-xl shadow-lg">
            <DialogHeader className="space-y-3 relative pb-4">
              <DialogTitle className="text-2xl font-semibold text-gray-900">
                {selectedAward?.title}
              </DialogTitle>
              <DialogClose className="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4">
                  <path
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"></path>
                </svg>
              </DialogClose>
            </DialogHeader>
            <DialogDescription className="text-base leading-7 text-gray-600 pt-2">
              {selectedAward?.content}
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default FeaturedSection;
