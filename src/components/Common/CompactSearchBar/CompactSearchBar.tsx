"use client";
import { parse } from "date-fns";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import type { GuestCounts, LocationDetails } from "./types";
import { fetchLocationById } from "../../../lib/location-service";
import { cn } from "../../../lib/utils";
import { LocationDisplay } from "./location-display";
import { DateDisplay } from "./date-display";
import { GuestDisplay } from "./guest-display.tsx";

interface CompactSearchBarProps {
  scrolled: boolean;
  isActivePage: boolean;
  className?: string | ReactNode;
  onClick?: () => void;
}

export default function CompactSearchBar({
  scrolled,
  className,
  isActivePage,
  onClick,
}: CompactSearchBarProps) {
  const params = useSearchParams();
  const searchRef = useRef<HTMLDivElement>(null);

  // State management
  const [locationDetails, setLocationDetails] =
    useState<LocationDetails | null>(null);
  const [locationName, setLocationName] = useState<string[]>([]);
  const [locationSearch, setLocationSearch] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [guestCounts, setGuestCounts] = useState<GuestCounts>({
    adult: 2,
    kid: 0,
    infant: 0,
    pet: 0,
  });
  const [isWideLayout, setIsWideLayout] = useState(false);

  // Load initial values from URL params
  useEffect(() => {
    const loadFromParams = async () => {
      const placeId = params.get("placeId") || "";
      const startDateStr = params.get("startDate") || "";
      const endDateStr = params.get("endDate") || "";

      // Load guest counts
      setGuestCounts({
        adult: Number(params.get("adult") || params.get("adults") || 2),
        kid: Number(params.get("kid") || params.get("kids") || 0),
        infant: Number(params.get("infant") || params.get("infants") || 0),
        pet: Number(params.get("pet") || params.get("pets") || 0),
      });

      // Fetch location details if placeId is available
      if (placeId) {
        try {
          const details = await fetchLocationById(placeId);
          setLocationDetails(details);
          setLocationName(details.addressParts);
          setLocationSearch(details.fullAddress);
        } catch (error) {
          console.error("Error fetching location details:", error);
        }
      }

      // Parse dates if available
      if (startDateStr && endDateStr) {
        try {
          setStartDate(parse(startDateStr, "yyyy-MM-dd", new Date()));
          setEndDate(parse(endDateStr, "yyyy-MM-dd", new Date()));
        } catch (error) {
          console.error("Error parsing dates:", error);
        }
      }
    };

    loadFromParams();
  }, [params]);

  // Adjust layout based on location name length
  useEffect(() => {
    const totalLength = locationName.join(", ").length;
    setIsWideLayout(totalLength > 20);
  }, [locationName]);

  return (
    <div
      ref={searchRef}
      className={cn(
        "absolute left-0 right-0 flex justify-center transition-all duration-500 transform",
        isActivePage
          ? "opacity-100 translate-y-0"
          : scrolled
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none",
        "z-30",
        className
      )}>
      <div
        className={cn(
          "flex items-center transition-all duration-300 mx-4 cursor-pointer",
          "bg-white rounded-full shadow-lg border border-gray-300",
          isWideLayout ? "w-auto" : "max-w-sm w-full",
          "p-2 mt-[-64px] gap-2 h-12 hover:shadow-xl hover:border-primary-gold/50"
        )}
        onClick={onClick}>
        <div className={cn("flex items-center flex-1 flex-row gap-2")}>
          <div
            className={cn(
              "flex items-center justify-between",
              isWideLayout ? "w-full gap-4" : "w-72 ml-4",
              "mx-auto text-sm"
            )}>
            <LocationDisplay locationName={locationName} />
            <span className="text-gray-400">|</span>
            <DateDisplay startDate={startDate} endDate={endDate} />
            <span className="text-gray-400">|</span>
            <GuestDisplay guestCounts={guestCounts} />
          </div>
        </div>

        <button
          type="button"
          className={cn(
            "rounded-full flex items-center justify-center text-white transition-all p-2 bg-primary-gold hover:bg-primary-gold/90"
          )}>
          <Search className={cn("text-white h-4 w-4")} />
        </button>
      </div>
    </div>
  );
}
