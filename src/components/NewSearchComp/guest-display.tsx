import { Skeleton } from "../ui/skeleton/skeleton";

interface GuestDisplayProps {
  guestCounts: {
    adult: number;
    kid: number;
    infant: number;
    pet: number;
  };
  isLoading?: boolean;
}

export function GuestDisplay({ guestCounts, isLoading }: GuestDisplayProps) {
  // Show skeleton when loading
  if (isLoading) {
    return <Skeleton className="h-5 w-20 bg-gray-200" />;
  }

  const { adult, kid, infant, pet } = guestCounts;
  const totalGuests = adult + kid;

  if (totalGuests === 0 && infant === 0 && pet === 0) {
    return <span className="text-gray-700 font-medium">Add guests</span>;
  }

  let displayText = `${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`;

  // For compact display, we'll show a more condensed format
  if (infant > 0 || pet > 0) {
    const extras = [];
    if (infant > 0) extras.push(`${infant} inf`);
    if (pet > 0) extras.push(`${pet} pet${pet !== 1 ? "s" : ""}`);

    displayText += `, ${extras.join(", ")}`;
  }

  return (
    <span className="text-gray-900 font-medium truncate max-w-auto">
      {displayText}
    </span>
  );
}
