"use client";

import Section from "../../../common/Section/Section";
import OptimizedImage from "../../../components/OptimizedImage/OptimizedImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../components/ui/Carousel/Carousel";

type TestimonialType = {
  imageUrl: string;
  description: string;
  name: string;
  designation: string;
};

const testimonials: TestimonialType[] = [
  {
    imageUrl: "https://v1.bnbmehomes.com/assets/img/home_slider/thumbs-up.jpg", // Add image URL later
    description:
      "bnbme works hard for their property owners ensuring their property is given the best experience",
    name: "Karan",
    designation: "Property Owner, Dubai",
  },
  {
    imageUrl:
      "https://v1.bnbmehomes.com/assets/img/home_slider/testimonial-request-template-1.jpg", // Add image URL later
    description:
      "bnbme has a way of finding the right marketing tools to attract customers to my property",
    name: "Puff J",
    designation: "Property Owner, Dubai",
  },
  {
    imageUrl:
      "https://v1.bnbmehomes.com/assets/img/home_slider/Customer-testimonials-1.jpg", // Add image URL later
    description:
      "I like the bnbme team approach, and they did a great job showcasing the place online with pictures, video and virtual",
    name: "Nerina",
    designation: "Property Owner, Dubai",
  },
  {
    imageUrl:
      "https://v1.bnbmehomes.com/assets/img/home_slider/Customer-testimonial-page.jpg", // Add image URL later
    description:
      "bnbme did a fantastic job, it was quick, efficient and very professional. I am very satisfied.",
    name: "Sara",
    designation: "Property Owner, Dubai",
  },
  {
    imageUrl:
      "https://v1.bnbmehomes.com/assets/img/home_slider/Testimonial-lead-gen-1.jpg", // Add image URL later
    description:
      "bnbme works around the clock to take care of the property, ensuring that  everything is in the best interest of the property owners.",
    name: "Keith",
    designation: "Property Owner, Dubai",
  },
];

const TestimonialCarousel = () => {
  return (
    <Section>
      <h2 className="text-3xl font-bold text-center mb-12">
          What Our Clients Say
        </h2>
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}>
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-64 h-64 mb-6 overflow-hidden rounded-lg bg-gray-200">
                    {testimonial.imageUrl && (
                      <OptimizedImage
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        rounded={true}
                        width={300}
                        height={400}
                      />
                    )}
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {testimonial.description}
                  </p>
                  <h3 className="font-semibold text-lg mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {testimonial.designation}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-6 bg-primary-gold border-primary-gold" />
          <CarouselNext className="-right-4 md:-right-6  bg-primary-gold border-primary-gold" />
        </Carousel>
      </div>
    </Section>
  );
};

export default TestimonialCarousel;
