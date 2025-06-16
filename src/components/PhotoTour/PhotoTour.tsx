"use client";

import { motion, useAnimation, useScroll } from "framer-motion";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { apiBaseurl, imagePrefix } from "../../utils/api";
import { ImageLightbox } from "../ImageGallery/component/image-lightbox";
import FallbackImageTour from "../../modules/SinglePropertyPage/components/FallBackImageTour/FallBackImageTour";

interface CategoryImage {
  id: string;
  image: StaticImageData;
}

export default function PhotoTour({ imageData }: { imageData: any }) {
  const { scrollY } = useScroll();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: any;
    initialIndex: number;
  }>({
    isOpen: false,
    images: [],
    initialIndex: 0,
  });

  // 1. Reference array with desired order (all lowercase for easy matching).
  // 1. The reference order you want (lowercase for consistent matching).
  const desiredOrder = [
    "living room",
    "kitchen",
    "bedrooms",
    "bathrooms",
    "balcony",
    "maid room",
    "study room",
    "storage rooms",
    "laundry room",
    "hallways",
    "common areas",
    "building exterior",
    "amenities",
    "bathroom 1",
    "bathroom 2",
    "bedroom 1",
    "bedroom 2",
    "gallery",
  ];

  // 2. Enhanced synonyms map with more variations and better matching
  const synonyms = {
    gallery: ["gallery"],
    "living room": ["living room", "living area", "living", "lounge"],
    kitchen: ["kitchen", "kitchenette"],
    bedrooms: [
      "bedroom",
      "bedrooms",
      "master bedroom",
      "guest bedroom",
      "bedroom 1",
      "bedroom 2",
    ],
    bathrooms: [
      "bathroom",
      "bathrooms",
      "bathroom full",
      "bathroom half",
      "half bathroom",
      "full bathroom",
      "bathroom 1",
      "bathroom 2",
    ],
    balcony: ["balcony", "terrace", "porch"],
    "maid room": ["maid room", "maid", "staff room"],
    "study room": ["study room", "study", "office", "home office"],
    "storage rooms": ["storage room", "storage rooms", "storage", "closet"],
    "laundry room": ["laundry room", "laundry", "utility room"],
    hallways: ["hallway", "hallways", "corridor", "passage"],
    "common areas": [
      "common area",
      "common areas",
      "shared space",
      "lobby",
      "dinning area",
      "dining area",
      "dining room",
    ],
    "building exterior": [
      "building exterior",
      "exterior",
      "outside",
      "outdoor",
      "patio",
    ],
    amenities: ["amenities", "facility", "facilities"],
  };

  // 3. Improved helper function: get the desiredOrder index with better matching
  function getAlbumIndex(albumName: string) {
    const lowerName = albumName.toLowerCase();
    let bestMatchIndex = -1;
    let bestMatchScore = -1;

    // Find the best matching category
    for (let i = 0; i < desiredOrder.length; i++) {
      const canonical = desiredOrder[i];
      //@ts-ignore
      const possibleMatches = synonyms[canonical] || [];

      for (const match of possibleMatches) {
        // Exact match gets highest priority
        if (lowerName === match) {
          return i; // Immediate return for exact match
        }

        // Contains match gets medium priority
        if (lowerName.includes(match)) {
          const score = 500 - (lowerName.length - match.length); // Prefer closer matches
          if (score > bestMatchScore) {
            bestMatchIndex = i;
            bestMatchScore = score;
          }
        }

        // Partial match gets lower priority
        if (match.includes(lowerName)) {
          const score = 250 - (match.length - lowerName.length);
          if (score > bestMatchScore) {
            bestMatchIndex = i;
            bestMatchScore = score;
          }
        }
      }
    }

    return bestMatchIndex;
  }

  // Process the image data
  const filteredImages = imageData?.images
    ? imageData.images.filter(
        (album: { album_name: string; paths: string[] }) =>
          album.paths &&
          album.paths.length > 0 &&
          album.album_name.toLowerCase() !== "slider"
      )
    : [];

  // Check if we have Gallery album with images
  const galleryAlbum = imageData?.images?.find(
    (album: { album_name: string; paths: string[] }) =>
      album.album_name.toLowerCase() === "gallery"
  );

  const hasGalleryImages =
    galleryAlbum && galleryAlbum.paths && galleryAlbum.paths.length > 0;

  // Check if we should show Slider (only when Gallery is empty)
  const sliderAlbum = !hasGalleryImages
    ? imageData?.images?.find(
        (album: { album_name: string; paths: string[] }) =>
          album.album_name.toLowerCase() === "slider" &&
          album.paths &&
          album.paths.length > 0
      )
    : null;

  // Prepare the albums to display (filter out empty albums)
  let albumsToShow: any[] = [];

  // Always show all albums with images
  albumsToShow = filteredImages;

  // If there's no gallery but slider has images, add slider as gallery
  if (!hasGalleryImages && sliderAlbum && sliderAlbum.paths.length > 0) {
    albumsToShow = [...albumsToShow, { ...sliderAlbum, album_name: "Gallery" }];
  }

  const hasAnyData = albumsToShow.length > 0;

  // Sort albums by the desired order
  const imageAlbumName = albumsToShow.map(
    (album: { album_name: string }) => album.album_name
  );

  // 5. Pre-compute indices for better performance
  const albumIndices = new Map();
  imageAlbumName.forEach((albumName: string) => {
    albumIndices.set(albumName, getAlbumIndex(albumName));
  });

  // 6. Improved sorting with pre-computed indices
  const sortedAlbums = [...imageAlbumName].sort((a, b) => {
    const aIndex = albumIndices.get(a);
    const bIndex = albumIndices.get(b);

    // Both unknown: keep original order
    if (aIndex === -1 && bIndex === -1) {
      return imageAlbumName.indexOf(a) - imageAlbumName.indexOf(b);
    }
    // One unknown? That one goes after the known album
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    // Same category? Preserve original order
    if (aIndex === bIndex) {
      return imageAlbumName.indexOf(a) - imageAlbumName.indexOf(b);
    }

    // Otherwise, compare canonical indices
    return aIndex - bIndex;
  });

  // Build categories array with only albums that have images
  const categories = sortedAlbums.map((albumName) => {
    const album = albumsToShow.find(
      (album: { album_name: string }) => album.album_name === albumName
    );

    return {
      id: albumName.toLowerCase().replace(/\s+/g, "-"),
      title: albumName,
      images: [
        {
          id: `PT-${albumName}`,
          image: album?.paths || [],
        },
      ],
    };
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory, setActiveCategory]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      controls.start({ opacity: 1, y: 0 });
    });

    return () => unsubscribe();
  }, [scrollY, controls]);

  const openLightbox = (images: any, initialIndex: number) => {
    setLightbox({
      isOpen: true,
      images,
      initialIndex,
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const getImageLayout = (images: any) => {
    if (!images || images.length === 0) {
      return <FallbackImageTour alt={imageData.title} rounded />; // Use the fallback component
    }

    return (
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        {images.map((item: any, itemIndex: number) =>
          // Check if item.image exists and has elements
          !item.image || item.image.length === 0 ? (
            <FallbackImageTour
              alt={imageData.title}
              key={`fallback-${itemIndex}`}
              rounded
            />
          ) : (
            item.image.map((imgSrc: string, index: number) => {
              // Define column span and aspect ratio
              const colSpan = index === 0 ? "col-span-2" : "col-span-1";
              const aspectRatio =
                index === 0 ? "aspect-[16/9]" : "aspect-[4/3]";

              return (
                <motion.div
                  key={`${itemIndex}-${index}`} // Unique key to avoid duplicates
                  className={`rounded-lg cursor-pointer overflow-hidden relative ${colSpan} ${aspectRatio}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openLightbox(item.image, index)} // Fix: Use `item.image`
                >
                  <Image
                    src={
                      imgSrc ? `${imagePrefix}/${imgSrc}` : "/placeholder.svg"
                    }
                    alt={imageData.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>
              );
            })
          )
        )}
      </div>
    );
  };

  // If no data at all, show a single fallback
  if (!hasAnyData) {
    return (
      <div
        className="bg-white w-full -mt-10 lg:w-[80%] min-h-screen mx-auto"
        ref={containerRef}>
        <motion.div
          className="bg-white z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-xl lg:text-3xl font-semibold mb-4">
              Photo tour
            </h2>
            <motion.div
              className="flex p-4 gap-4 hide-scrollbar lg:flex-wrap overflow-x-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              {categories.map((category: any) => (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    scrollToSection(category.id);
                    setActiveCategory(category.id);
                  }}
                  className={`cursor-pointer flex flex-col items-center ${
                    activeCategory === category.id
                      ? "ring-2 ring-blue-500 rounded-lg"
                      : ""
                  }`}>
                  <div className="h-24 rounded-md w-32 overflow-hidden relative">
                    <FallbackImageTour alt={imageData.title} rounded />
                  </div>
                  <span className="text-sm mt-2 whitespace-nowrap">
                    {category.title}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-8">
          {categories.map((category: any, index: number) => (
            <motion.section
              key={category.id}
              id={category.id}
              className="mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
              }}>
              <div className="w-full gap-4 items-start lg:flex lg:justify-between lg:mx-auto">
                <h3 className="text-xl lg:text-3xl font-semibold lg:w-1/3">
                  {category.title}
                </h3>
                <div className="flex-1">
                  <FallbackImageTour alt={imageData.title} rounded />
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white w-full lg:w-[80%] min-h-screen mx-auto"
      ref={containerRef}>
      {!hasGalleryImages && (
        <motion.div
          className="bg-white z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}>
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-xl lg:text-3xl font-semibold mb-4">
              Photo tour
            </h2>
            <motion.div
              className="flex p-4 gap-4 hide-scrollbar lg:flex-wrap overflow-x-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}>
              {categories.map((category: any) => {
                return (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      scrollToSection(category.id);
                      setActiveCategory(category.id);
                    }}
                    className={`cursor-pointer flex flex-col items-center ${
                      activeCategory === category.id
                        ? "ring-2 ring-blue-500 rounded-lg"
                        : ""
                    }`}>
                    <div className="h-24 rounded-md w-32 overflow-hidden relative">
                      {category.images &&
                      category.images.length > 0 &&
                      category.images.some(
                        (imgObj: { image: string | any[] }) =>
                          imgObj.image && imgObj.image.length > 0
                      ) ? (
                        category.images
                          .find(
                            (imgObj: { image: string | any[] }) =>
                              imgObj.image && imgObj.image.length > 0
                          )
                          ?.image.slice(0, 1)
                          .map((imgSrc: string, index: number) => (
                            <Image
                              key={index}
                              src={`${imagePrefix}/${imgSrc}`}
                              alt={imageData.title}
                              fill
                              className="object-cover"
                            />
                          ))
                      ) : (
                        <FallbackImageTour alt={imageData.title} rounded />
                      )}
                    </div>
                    <span className="text-sm mt-2 whitespace-nowrap">
                      {category.title}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      )}

      <div className="container mx-auto px-4 py-8">
        {categories.map((category: any, index: number) => (
          <motion.section
            key={category.id}
            id={category.id}
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.5,
              delay: 0.1 * index,
            }}>
            <div className="w-full gap-4 items-start lg:flex lg:justify-between lg:mx-auto">
              <h3 className="text-xl lg:text-3xl font-semibold lg:w-1/3">
                {category.title}
              </h3>
              <div className="flex-1">
                {!category.images || category.images.length === 0 ? (
                  <FallbackImageTour alt={imageData.title} rounded />
                ) : (
                  getImageLayout(category.images)
                )}
              </div>
            </div>
          </motion.section>
        ))}
      </div>

      <ImageLightbox
        isOpen={lightbox.isOpen}
        images={lightbox.images}
        initialIndex={lightbox.initialIndex}
        onClose={closeLightbox}
      />
    </div>
  );
}
