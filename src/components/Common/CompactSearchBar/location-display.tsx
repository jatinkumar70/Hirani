interface LocationDisplayProps {
  locationName: string[];
}

export function LocationDisplay({ locationName }: LocationDisplayProps) {
  const locationDisplay =
    locationName.length > 0 ? locationName.join(", ") : "Anywhere";

  return (
    <span className="text-gray-800 font-medium truncate max-w-[150px]">
      {locationDisplay}
    </span>
  );
}
