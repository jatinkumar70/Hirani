import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import FilterHotelsSkeleton from "../../components/SkeletonLoaders/FilterHotelsSkeleton";
import { IPropertySearchViewProps } from "./types/IPropertySearchView";

const SearchPropertyMap = dynamic(
  () => import("../SearchPage/components/SearchPropertyMap/SearchPropertyMap"),
  { ssr: false }
);

const FilterHotels = dynamic(
  () => import("./Components/FiltersHotels/FilterHotels"),
  {
    ssr: false,
    loading: () => <FilterHotelsSkeleton count={10} />,
  }
);

const PropertySearchView: React.FC<IPropertySearchViewProps> = (props) => {
  const { hotelsList, loadingState } = props;
  const hotelsListRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  console.log(hotelsList[0]?.location.city, "hotelsList");

  // Attach scrollToTop function to window
  useEffect(() => {
    window.scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (hotelsListRef.current) {
        hotelsListRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
  }, []);

  return (
    <section className="max-w-screen mx-auto flex flex-col lg:flex-row lg:gap-6 px-2 py-0 lg:mt-4 mt-2">
      <div className="order-1 lg:order-2 w-full lg:w-[40%] h-[55vh] lg:h-[91vh] overflow-hidden">
        <SearchPropertyMap
          selectedCity={hotelsList[0]?.location.city || ""}
          data={hotelsList}
          loc={router.query}
        />
      </div>
      <div
        ref={hotelsListRef}
        className="mt-6 order-2 lg:order-1 flex flex-col gap-2 w-full lg:w-[60%] overflow-y-auto h-auto lg:h-[87vh] scrollbar-hide">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-2">
            {hotelsList[0]?.location?.city ? (
              <h2 className="hidden lg:block text-center text-gray-800 text-xl font-semibold text-primary md:text-base">
                finest homes in {hotelsList[0].location.city || "Global"}
              </h2>
            ) : null}
          </div>
        </div>
        <div className="lg:mt-4 flex flex-col gap-3 items-center">
          <FilterHotels
            hotels={hotelsList}
            isLoading={loadingState}
            loc={router.query}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertySearchView;
