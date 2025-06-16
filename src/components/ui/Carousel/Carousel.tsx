"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../Button/Button";
import { cn } from "../../../lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  showIndicators?: boolean;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  isHovering: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
        dragFree: false,
        skipSnaps: false,
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [isInteractingWithImageCarousel, setIsInteractingWithImageCarousel] =
      React.useState(false);
    const [isHovering, setIsHovering] = React.useState(false);

    const onSelect = React.useCallback((emblaApi: CarouselApi) => {
      if (!emblaApi) return;
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        // Check if the event originated from an image carousel
        if (
          event.target &&
          (event.target as HTMLElement).closest('[data-carousel-type="image"]')
        ) {
          return; // Don't handle events from image carousel
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    // Disable embla carousel when interacting with image carousel
    React.useEffect(() => {
      if (!api) return;

      const handleMouseDown = (e: MouseEvent) => {
        // Check if the event originated from an image carousel
        if (
          e.target &&
          (e.target as HTMLElement).closest('[data-carousel-type="image"]')
        ) {
          e.stopPropagation();
          //@ts-ignore
          api.reInit({ ...opts, draggable: false });
          setIsInteractingWithImageCarousel(true);
        }
      };

      const handleMouseUp = () => {
        if (isInteractingWithImageCarousel) {
          //@ts-ignore
          api.reInit({ ...opts, draggable: true });
          setIsInteractingWithImageCarousel(false);
        }
      };

      document.addEventListener("mousedown", handleMouseDown, {
        capture: true,
      });
      document.addEventListener("mouseup", handleMouseUp, { capture: true });

      return () => {
        document.removeEventListener("mousedown", handleMouseDown, {
          capture: true,
        });
        document.removeEventListener("mouseup", handleMouseUp, {
          capture: true,
        });
      };
    }, [api, opts, isInteractingWithImageCarousel]);

    // Handle touch events at the document level
    React.useEffect(() => {
      if (!api) return;

      const handleTouchStart = (e: TouchEvent) => {
        // Check if the event originated from an image carousel
        if (
          e.target &&
          (e.target as HTMLElement).closest('[data-carousel-type="image"]')
        ) {
          //@ts-ignore
          api.reInit({ ...opts, draggable: false });
          setIsInteractingWithImageCarousel(true);
        }
      };

      const handleTouchEnd = () => {
        if (isInteractingWithImageCarousel) {
          //@ts-ignore
          api.reInit({ ...opts, draggable: true });
          setIsInteractingWithImageCarousel(false);
        }
      };

      document.addEventListener("touchstart", handleTouchStart, {
        capture: true,
      });
      document.addEventListener("touchend", handleTouchEnd, { capture: true });

      return () => {
        document.removeEventListener("touchstart", handleTouchStart, {
          capture: true,
        });
        document.removeEventListener("touchend", handleTouchEnd, {
          capture: true,
        });
      };
    }, [api, opts, isInteractingWithImageCarousel]);

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("select", onSelect);
      api.on("reInit", onSelect);
      return () => {
        api?.off("select", onSelect);
        api?.off("reInit", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          isHovering,
        }}>
        <div
          ref={ref}
          data-carousel-type="product"
          onKeyDownCapture={handleKeyDown}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}>
          {children}
          {api && props.showIndicators !== false}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-0" : "pt-4",
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev, isHovering } = useCarousel();

  if (!canScrollPrev) return null;

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full transition-opacity duration-300 ",
        orientation === "horizontal"
          ? "left-4 top-1/3 -translate-y-1/3 shadow-2xl"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        isHovering ? "opacity-100" : "opacity-0",
        className
      )}
      onClick={scrollPrev}
      {...props}>
      <ArrowLeft className="h-4 w-4 text-white" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext, isHovering } = useCarousel();

  if (!canScrollNext) return null;

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full transition-opacity duration-300",
        orientation === "horizontal"
          ? "-right-[1rem] top-1/3 -translate-y-1/3 shadow-2xl"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        isHovering ? "opacity-100" : "opacity-0",
        className
      )}
      onClick={scrollNext}
      {...props}>
      <ArrowRight className="h-4 w-4 text-white" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

/**
 * Dot Indicators component.
 *
 * In this updated version each dot represents a group of slides. The "group size" is 4,
 * so clicking a dot will scroll to slide at index group * 4 (i.e. skipping 4 items).
 * Additionally, only a limited number of dot groups (5) are visible at a time.
 * The dot container is positioned slightly below the carousel.
 */
// const CarouselIndicators = () => {
//   const { api } = useCarousel();
//   const [selectedIndex, setSelectedIndex] = React.useState(0);
//   const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

//   const onSelect = React.useCallback(() => {
//     if (!api) return;
//     setSelectedIndex(api.selectedScrollSnap());
//   }, [api]);

//   React.useEffect(() => {
//     if (!api) return;
//     setScrollSnaps(api.scrollSnapList());
//     onSelect(); // initialize
//     api.on("select", onSelect);
//     api.on("reInit", onSelect);
//     return () => {
//       api.off("select", onSelect);
//       api.off("reInit", onSelect);
//     };
//   }, [api, onSelect]);

//   // Grouping logic: one dot represents a jump of 4 slides.
//   const groupSize = 4;
//   const totalSlides = scrollSnaps.length;
//   const totalGroups = Math.ceil(totalSlides / groupSize);
//   const currentGroup = Math.floor(selectedIndex / groupSize);

//   // Limit the number of visible dot groups (5 in this example)
//   const maxDots = 5;
//   let startGroup = 0;
//   let endGroup = totalGroups - 1;
//   if (totalGroups > maxDots) {
//     startGroup = Math.max(0, currentGroup - Math.floor(maxDots / 2));
//     endGroup = startGroup + maxDots - 1;
//     if (endGroup >= totalGroups) {
//       endGroup = totalGroups - 1;
//       startGroup = endGroup - maxDots + 1;
//     }
//   }
//   const visibleGroups = Array.from(
//     { length: endGroup - startGroup + 1 },
//     (_, i) => i + startGroup
//   );

//   return (
//     <div
//       className="absolute left-1/2 transform -translate-x-1/2"
//       style={{ bottom: "-35px" }}>
//       <div className="flex space-x-2">
//         {visibleGroups.map((group) => (
//           <button
//             key={group}
//             onClick={() => api && api.scrollTo(group * groupSize)}
//             className={`h-2 w-2 rounded-full ${
//               currentGroup === group ? "bg-black" : "bg-gray-400"
//             }`}
//             aria-label={`Go to slide ${group * groupSize + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
