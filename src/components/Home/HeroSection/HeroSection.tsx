import { SearchBar } from "../../NewSearchComp/search-bar";
import FloatingWhatsAppButton from "../../whatsapp/FloatingWhatsAppButton ";

export default function HeroSection() {
  return (
    <section className="bg-white pt-36">
      <div className="text-white">
        {/* Banner Section */}
        <div className="relative  flex items-center justify-start px-6 md:px-[7%] lg:px-[10%] text-left">
          {/* Hero Image with Next.js Image optimization */}
          {/* <div className="absolute inset-0 z-0">
            <Image
              src={Images.HeroImage.src || "/placeholder.svg"}
              alt="Luxury accommodations"
              fill
              priority
              quality={75}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1600px"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div> */}

          {/* <div className="container mx-left text-left w-full lg:max-w-xl flex flex-col gap-4 mt-20 z-10">
            <h1 className="lg:text-5xl text-4xl font-semibold">
              Find a short stay
            </h1>
            <p className="lg:text-lg font-semibold">
              Experience unforgettable stays with bnbme Holiday Homes – your
              gateway to luxury and comfort.
            </p>
          </div> */}
        </div>

        {/* Search Section */}
        <div className="mt-12 px-4 sm:px-6 md:px-[7%] lg:px-[10%]">
          <div className="relative -mt-[5rem] sm:-mt-16 md:-mt-[4.8rem]">
            <div className="container mx-auto ">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
      <FloatingWhatsAppButton />
    </section>
  );
}
