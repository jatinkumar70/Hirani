import { GuestCounts } from "./types";


interface GuestDisplayProps {
  guestCounts: GuestCounts;
}

export function GuestDisplay({ guestCounts }: GuestDisplayProps) {
  const totalGuests = Object.values(guestCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const guestDisplay =
    totalGuests > 0
      ? `${totalGuests} Guest${totalGuests > 1 ? "s" : ""}`
      : "Add guests";

  return <span className="text-gray-800 font-medium">{guestDisplay}</span>;
}
