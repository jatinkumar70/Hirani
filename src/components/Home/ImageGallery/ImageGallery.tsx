import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "../../../lib/utils";
import { Dialog, DialogContent } from "../../ui/Dialog/Dialog";
import { HotelsImage, Images } from "../../../../asserts/Import/Images";

interface GalleryImage {
  id: number;
  src: StaticImageData;
  alt: string;
  title: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: HotelsImage.Hotel1,
    alt: "Dubai Marina aerial view",
    title: "Dubai Marina",
    description:
      "A stunning view of Dubai Marina's modern skyline, featuring luxury yachts and waterfront properties surrounded by impressive skyscrapers.",
  },
  {
    id: 2,
    src: HotelsImage.Hotel2,
    alt: "Expo City Dubai aerial view",
    title: "Expo City",
    description:
      "Bird's eye view of Expo City Dubai, showcasing its iconic dome structure and sustainable architecture amidst the desert landscape.",
  },
  {
    id: 3,
    src: HotelsImage.Hotel6,
    alt: "Business Bay at twilight",
    title: "Business Bay",
    description:
      "The vibrant Business Bay district captured during twilight, displaying its modern architectural marvels and bustling business hub.",
  },
  {
    id: 4,
    src: HotelsImage.Hotel5,
    alt: "Downtown Dubai sunset view",
    title: "Dubai Downtown",
    description:
      "A breathtaking sunset view of Downtown Dubai, featuring the world's tallest building, Burj Khalifa, and the mesmerizing Dubai Fountain.",
  },
  {
    id: 5,
    src: HotelsImage.Hotel7,
    alt: "Palm Jumeirah aerial view",
    title: "Palm Jumeirah",
    description:
      "An aerial perspective of the iconic Palm Jumeirah, Dubai's man-made island shaped like a palm tree extending into the Arabian Gulf.",
  },
];

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02]",
              index === 0 || index === 1
                ? "md:col-span-1 lg:col-span-1"
                : "lg:col-span-1 md:col-span-1" // For index 0 and 1, make it span 50% and for others 33%
            )}
            onClick={() => setSelectedImage(image)}>
            <div className="h-96 relative">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover w-full h-full object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity opacity-0 hover:opacity-100" />
              <div className="absolute top-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-semibold">{image.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 mt-14 bg-transparent border-none">
          {selectedImage && (
            <div className="flex flex-col">
              <div className="relative aspect-video">
                <Image
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-t-xl"
                  priority
                  quality={100}
                />
              </div>
              <div className="p-6 bg-white rounded-b-xl">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedImage.title}
                </h2>
                <p className="text-gray-600">{selectedImage.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
