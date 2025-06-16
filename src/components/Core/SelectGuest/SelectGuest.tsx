import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Minus, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useClickAway } from "react-use";
import { Button } from "../../ui/Button/Button";
import { Input } from "../../ui/Input/Input";

export interface GuestSelectorProps {
  guestCounts: {
    adults: number;
    kids: number;
    infants: number;
    pets: number;
  };
  setGuestCounts: React.Dispatch<
    React.SetStateAction<{
      adults: number;
      kids: number;
      infants: number;
      pets: number;
    }>
  >;
}

export default function GuestSelector({
  guestCounts,
  setGuestCounts,
}: GuestSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setIsOpen(false));

  const handleCountChange = (
    type: keyof typeof guestCounts,
    increment: boolean
  ) => {
    setGuestCounts((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  const formatGuestString = () => {
    const parts: string[] = [];
    parts.push(
      `${guestCounts.adults} adult${guestCounts.adults !== 1 ? "s" : ""}`
    );
    if (guestCounts.kids > 0)
      parts.push(`${guestCounts.kids} kid${guestCounts.kids !== 1 ? "s" : ""}`);
    if (guestCounts.infants > 0)
      parts.push(
        `${guestCounts.infants} infant${guestCounts.infants !== 1 ? "s" : ""}`
      );
    if (guestCounts.pets > 0)
      parts.push(`${guestCounts.pets} pet${guestCounts.pets !== 1 ? "s" : ""}`);
    return parts.join(", ");
  };

  return (
    <div className="w-full max-w-full pt-2" ref={ref}>
      <div className="relative">
        <label className="absolute -top-2 left-2 bg-white px-1 text-xs font-medium text-gray-500">
          Number of guests
        </label>
        <div
          className="flex cursor-pointer items-center rounded-lg border border-black/40 p-1"
          onClick={() => setIsOpen(!isOpen)}>
          <Input
            type="text"
            value={formatGuestString()}
            className="cursor-pointer p-0"
            readOnly
          />
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </div>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 space-y-3 rounded-lg border border-black/40 bg-white shadow-lg">
            {Object.entries(guestCounts).map(([type, count]) => (
              <div
                key={type}
                className="mt-2 flex items-center justify-between py-2 border-b border-gray-200 last:border-1 p-4">
                <span className="capitalize text-sm mb-2">{type}</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-5 w-5 rounded-3xl border border-black"
                    onClick={() =>
                      handleCountChange(type as keyof typeof guestCounts, false)
                    }>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="min-w-[1rem] text-center text-sm">
                    {count}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-5 w-5 rounded-3xl border border-black"
                    onClick={() =>
                      handleCountChange(type as keyof typeof guestCounts, true)
                    }>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
