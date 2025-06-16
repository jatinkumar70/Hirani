import { cn } from "../../lib/utils";
import { Skeleton } from "../ui/skeleton/skeleton";

interface LocationDisplayProps {
  locationName: any;
  isLoading?: boolean;
  placeId?: string;
}

export function LocationDisplay({
  locationName,
  isLoading,
  placeId,
}: LocationDisplayProps) {
  console.log(locationName, "locationName");

  // Show skeleton when loading or when we have a placeId but no location name yet
  if (isLoading || (placeId && locationName.length === 0)) {
    return <Skeleton className="h-5 w-20 bg-gray-300" />;
  }

  if (!placeId) {
    return <span className="text-gray-700 font-medium">Anywhere</span>;
  }

  return (
    <span className={cn("text-gray-900 font-medium max-w-auto")}>
      {locationName}
    </span>
  );
}
