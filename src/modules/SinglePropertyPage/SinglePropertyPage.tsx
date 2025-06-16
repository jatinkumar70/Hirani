import { debounce } from "lodash";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import DynamicLoader from "../../components/DynamicLoader/DynamicLoader";
import SinglePropertyLoader from "../../components/SkeletonLoaders/SinglePropertyLoader";
import FloatingWhatsAppButton from "../../components/whatsapp/FloatingWhatsAppButton ";
import { useMobile } from "../../hooks/useMobile";
import { Property } from "../../types/types";
import PropertyDetails from "./components/PropertyDetails/PropertyDetails";
const PropertyHeader = dynamic(
  () => import("../../components/PropertyHeader/PropertyHeader"),
  {
    ssr: false,
    loading: () => <DynamicLoader />,
  }
);
const TabsSection = dynamic(
  () => import("../../components/PropertyTabSection/PropertyTabsSection"),
  {
    ssr: false,
    loading: () => <DynamicLoader />,
  }
);
const FallbackImageTour = dynamic(
  () => import("./components/FallBackImageTour/FallBackImageTour"),
  {
    ssr: false,
    loading: () => <DynamicLoader />,
  }
);

const PropertyMapSection = dynamic(
  () => import("./components/PropertMapSection/PropertyMapSection"),
  {
    ssr: false,
    loading: () => <DynamicLoader />,
  }
);
const PropertyThingsToKnow = dynamic(
  () => import("./components/PropertyThingsToKnow/PropertyThingsToKnow"),
  {
    ssr: false,
    loading: () => <DynamicLoader />,
  }
);
const ImageGallery = dynamic(
  () => import("../../components/ImageGallery/ImageGallery"),
  {
    ssr: false,
    loading: () => <DynamicLoader />,
  }
);
const BookingTabWidget = dynamic(
  () => import("../../components/BookingTab/BookingTabWidget"),
  {
    ssr: false,
    loading: () => <DynamicLoader />,
  }
);

const PhotoTourModal = dynamic(
  () => import("./PhotoTourModal/PhotoTourModal"),
  {
    ssr: false,
    loading: () => <DynamicLoader />,
  }
);

const OtherProperty = dynamic(
  () => import("../../components/OtherProperty/OtherProperty"),
  {
    ssr: true,
    loading: () => (
      <div className="h-[300px] bg-gray-100 animate-pulse rounded-lg my-8"></div>
    ),
  }
);

const PropertyListing = ({
  singlePropertyDetails,
  allProperties,
}: {
  singlePropertyDetails: any;
  allProperties: Property[];
}) => {
  const isMobile = useMobile();
  const [isPhotoTourOpen, setIsPhotoTourOpen] = useState(false);
  const bookingWidgetContainerRef = useRef<HTMLDivElement>(null);
  const bookingWidgetRef = useRef<HTMLDivElement>(null);
  const propertyRatingRef = useRef<HTMLDivElement>(null);
  const [bookingWidgetStickyStyle, setBookingWidgetStickyStyle] =
    useState<React.CSSProperties>({});
  const [isDataReady, setIsDataReady] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const mapSectionRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (index: number) => {
    console.log(`Active tab: ${index}`);
  };

  const openPhotoTour = () => {
    setIsPhotoTourOpen(true);
  };

  const closePhotoTour = () => {
    setIsPhotoTourOpen(false);
  };

  // Verify data is ready before rendering
  useEffect(() => {
    if (
      singlePropertyDetails &&
      Object.keys(singlePropertyDetails).length > 0
    ) {
      setIsDataReady(true);
    }
  }, [singlePropertyDetails]);

  // Lazy load map when it's about to come into view
  useEffect(() => {
    if (!mapSectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsMapVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load map when it's 200px from viewport
    );

    observer.observe(mapSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isDataReady]);

  useEffect(() => {
    const topBarHeight = 48; // Adjust based on actual top bar height
    const fixedOffset = topBarHeight + 80; // Adjust sticky position to account for top bar

    const handleScrollBookingWidget = debounce(() => {
      if (
        !bookingWidgetContainerRef.current ||
        !bookingWidgetRef.current ||
        !propertyRatingRef.current
      ) {
        return;
      }

      const container = bookingWidgetContainerRef.current;
      const widget = bookingWidgetRef.current;
      const propertyRating = propertyRatingRef.current;

      const containerRect = container.getBoundingClientRect();
      const propertyRatingRect = propertyRating.getBoundingClientRect();
      const widgetHeight = widget.offsetHeight;

      let newStyle: React.CSSProperties = {};

      if (containerRect.top > fixedOffset) {
        // Widget is above viewport, do not apply sticky
        newStyle = {};
      } else if (propertyRatingRect.top < fixedOffset + widgetHeight) {
        // Reached the bottom boundary, switch to absolute positioning
        newStyle = {
          position: "absolute",
          top: propertyRatingRect.top - widgetHeight - containerRect.top + "px",
          left: 0,
          width: containerRect.width + "px",
        };
      } else {
        // Default sticky position
        newStyle = {
          position: "fixed",
          top: `${fixedOffset}px`,
          left: `${containerRect.left}px`,
          width: `${containerRect.width}px`,
        };
      }

      setBookingWidgetStickyStyle(newStyle);
    }, 10); // Debounce for smooth performance

    window.addEventListener("scroll", handleScrollBookingWidget);
    window.addEventListener("resize", handleScrollBookingWidget);
    handleScrollBookingWidget(); // Call once to set initial state

    return () => {
      window.removeEventListener("scroll", handleScrollBookingWidget);
      window.removeEventListener("resize", handleScrollBookingWidget);
    };
  }, [isDataReady]);

  // If data isn't ready yet, show a minimal loading state
  if (!isDataReady) {
    return <SinglePropertyLoader />;
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto py-6 p-4 lg:p-3">
      {/*-----PROPERTY HEADER SECTION---------*/}
      <PropertyHeader title={singlePropertyDetails?.title} />

      {/*-----PROPERTY TABS SECTION---------*/}
      <TabsSection
        hotelData={singlePropertyDetails}
        onTabChange={handleTabChange}
      />

      {/*-----PROPERTY IMAGE GALLERY SECTION---------*/}
      {(() => {
        // Check if Slider album has images
        const sliderAlbum = singlePropertyDetails.images?.find(
          (img: any) =>
            img.album_name === "Slider" && img.paths && img.paths.length > 0
        );

        if (sliderAlbum) {
          return (
            <ImageGallery
              key="slider"
              images={sliderAlbum.paths}
              altText={singlePropertyDetails?.title}
              onClick={openPhotoTour}
            />
          );
        }

        // Check if Gallery album has images
        const galleryAlbum = singlePropertyDetails.images?.find(
          (img: any) =>
            img.album_name === "Gallery" && img.paths && img.paths.length > 0
        );

        if (galleryAlbum) {
          return (
            <ImageGallery
              key="gallery"
              images={galleryAlbum.paths.slice(0, 5)}
              altText={singlePropertyDetails?.title}
              onClick={openPhotoTour}
            />
          );
        }

        // Find any album with images
        const firstAlbumWithImages = singlePropertyDetails.images.find(
          (img: any) => img.paths && img.paths.length > 0
        );

        if (firstAlbumWithImages) {
          return (
            <ImageGallery
              key="alternate"
              images={firstAlbumWithImages.paths.slice(0, 5)}
              altText={singlePropertyDetails?.title}
              onClick={openPhotoTour}
            />
          );
        }

        // No images found
        return (
          <FallbackImageTour
            alt={singlePropertyDetails.title}
            rounded={true}
            onClick={openPhotoTour}
          />
        );
      })()}

      {/*-----PROPERTY DETAILS SECTION---------*/}
      <div className="flex flex-col md:flex-row items-start gap-10 pt-8">
        <PropertyDetails
          hotelData={singlePropertyDetails}
          handleClick={openPhotoTour}
        />

        {/*-----DESKTOP BOOKING WIDGET (Sticky)---------*/}
        {isMobile ? (
          <div className="z-[1000] fixed bottom-0 left-0 right-0 bg-white border border-t-gray-400 shadow-2xl p-2 md:hidden">
            <BookingTabWidget HotelData={singlePropertyDetails} />
          </div>
        ) : (
          <div
            ref={bookingWidgetContainerRef}
            className="w-full md:w-[35%] mx-auto block relative">
            <div ref={bookingWidgetRef} style={bookingWidgetStickyStyle}>
              <BookingTabWidget HotelData={singlePropertyDetails} />
            </div>
          </div>
        )}
      </div>

      <div ref={propertyRatingRef} className="border-b border-[#dddddd] my-6" />

      {/*-----PROPERTY MAP SECTION---------*/}
      <div ref={mapSectionRef}>
        {isMapVisible ? (
          <PropertyMapSection data={singlePropertyDetails} />
        ) : (
          <div className="h-[300px] bg-gray-100 animate-pulse rounded-lg my-8"></div>
        )}
      </div>

      <div className="border-b-2 border-[#dddddd] my-8"></div>

      {/*-----PROPERTY THINGS TO KNOW SECTION---------*/}
      <PropertyThingsToKnow />

      {/*-----OTHER PROPERTY SLIDER SECTION---------*/}
      {allProperties.length > 0 && (
        <OtherProperty
          hotelData={allProperties}
          title={"Other similar properties"}
          SingleHotelData={singlePropertyDetails}
        />
      )}

      {isPhotoTourOpen && (
        <PhotoTourModal
          isOpen={isPhotoTourOpen}
          onClose={closePhotoTour}
          imageData={singlePropertyDetails}
        />
      )}

      <FloatingWhatsAppButton />
    </div>
  );
};

export default PropertyListing;
