/* eslint-disable @next/next/no-img-element */
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import type { Property } from "../../types/types"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "../../../../components/ui/Button/Button"

// Helper function to extract YouTube video ID

import type { Property } from "../../../../types/types"

const getYoutubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

interface VideoCarouselProps {
  videos: string[]
  onClose: () => void
}

const VideoCarousel = ({ videos, onClose }: VideoCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Reset playing state when video changes
  useEffect(() => {
    setIsPlaying(false)
  }, [currentIndex])

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering play
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1))
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering play
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1))
  }

  const handlePlayVideo = () => {
    setIsPlaying(true)
  }

  const videoId = getYoutubeVideoId(videos[currentIndex])

  return (
    <div className="relative w-full max-h-[90vh]" ref={containerRef}>
      {/* Close button - always visible */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        className="absolute top-4 right-4 z-20 bg-black/80 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-black transition-colors"
        aria-label="Close video"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative aspect-video bg-black overflow-hidden rounded-lg">
        {videoId ? (
          isPlaying ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          ) : (
            <div className="relative w-full h-full cursor-pointer group" onClick={handlePlayVideo}>
              <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-black/60 rounded-full flex items-center justify-center shadow-lg group-hover:bg-black/80 group-hover:scale-105 transition-all duration-300">
                  <div className="w-0 h-0 border-t-[15px] border-b-[15px] border-l-[24px] border-t-transparent border-b-transparent border-l-white ml-2"></div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
            Invalid YouTube URL
          </div>
        )}
      </div>

      {/* Navigation buttons - always show when multiple videos */}
      {videos.length > 1 && (
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2 z-30 pointer-events-none">
          <button
            onClick={handlePrev}
            className="bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-all pointer-events-auto"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-all pointer-events-auto"
            aria-label="Next video"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Indicator dots - always show when multiple videos */}
      {videos.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-white scale-110" : "bg-white/50"
                }`}
              onClick={(e) => {
                e.stopPropagation() // Prevent triggering play
                setCurrentIndex(index)
              }}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface FloorPlanViewerProps {
  images: string[]
  onClose: () => void
}

const FloorPlanViewer = ({ images, onClose }: FloorPlanViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 bg-black/80 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-black transition-colors"
        aria-label="Close floor plan"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="relative bg-white rounded-lg overflow-hidden max-h-[80vh]">
        <div className="max-h-[80vh] overflow-auto">
          <img
            width={1200}
            height={800}
            src={images[currentIndex] || "/placeholder.svg"}
            alt="Floor plan"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Navigation buttons - only show when multiple images */}
      {images.length > 1 && (
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2 z-10">
          <button
            onClick={handlePrev}
            className="bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-all"
            aria-label="Previous floor plan"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-all"
            aria-label="Next floor plan"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Indicator dots - only show when multiple images */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-black scale-110" : "bg-black/50"
                }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to floor plan ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface PropertyDetailsHeaderProps {
  button1: string
  button2: string
  button3: string
  handleClickImage?: () => void
  hotelData: Property
}

const PropertyDetailsHeader = ({
  button1,
  button2,
  button3,
  handleClickImage,
  hotelData,
}: PropertyDetailsHeaderProps) => {
  const [popupContent, setPopupContent] = useState<"image1" | "video" | "image2" | null>(null)

  // Check if yt_walkthrough_video exists and is an array
  const hasVideos = Array.isArray(hotelData?.yt_walkthrough_video) && hotelData.yt_walkthrough_video.length > 0

  // Check if floor_plan exists and is an array
  const hasFloorPlans = Array.isArray(hotelData?.floor_plan) && hotelData.floor_plan.length > 0

  // Handle modal close
  const handleClose = () => {
    setPopupContent(null)
    // Add body scroll lock removal if needed
    document.body.style.overflow = "auto"
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (popupContent) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [popupContent])

  return (
    <div>
      {/* Buttons - Scrollable on mobile */}
      <div className="mb-6">
        <div className="flex gap-4 overflow-x-auto flex-nowrap scroll-smooth scrollbar-hide md:justify-start pb-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-shrink-0 flex items-center py-5 gap-2 border border-black/20 hover:bg-gray-100 transition-colors"
            onClick={handleClickImage}
          >
            {button1}
          </Button>

          {hasVideos && (
            <Button
              variant="outline"
              size="sm"
              className="flex-shrink-0 flex items-center py-5 gap-2 border border-black/20 hover:bg-gray-100 transition-colors"
              onClick={() => setPopupContent("video")}
            >
              {button2}
            </Button>
          )}

          {hasFloorPlans && (
            <Button
              variant="outline"
              size="sm"
              className="flex-shrink-0 flex items-center py-5 gap-2 border border-black/20 hover:bg-gray-100 transition-colors"
              onClick={() => setPopupContent("image2")}
            >
              {button3}
            </Button>
          )}
        </div>
      </div>

      {/* Modal Overlay */}
      {popupContent && (
        <div
          className="fixed inset-0 z-[1000] bg-black/90 flex justify-center items-center p-4 md:p-8"
          onClick={handleClose}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {popupContent === "video" && hasVideos ? (
              <VideoCarousel videos={hotelData.yt_walkthrough_video} onClose={handleClose} />
            ) : popupContent === "image2" && hasFloorPlans ? (
              <FloorPlanViewer images={hotelData.floor_plan} onClose={handleClose} />
            ) : (
              <div className="relative">
                <button
                  className="absolute top-4 right-4 z-20 bg-black/80 rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-black transition-colors"
                  onClick={handleClose}
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="max-h-[80vh] overflow-auto bg-white rounded-lg">
                  <Image
                    width={1200}
                    height={800}
                    src={"/placeholder.svg"}
                    alt="Property Image"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertyDetailsHeader
