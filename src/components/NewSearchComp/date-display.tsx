import { format, isSameMonth } from "date-fns";
import { Skeleton } from "../ui/skeleton/skeleton";

interface DateDisplayProps {
  startDate: Date | null;
  endDate: Date | null;
  isLoading?: boolean;
}

export function DateDisplay({
  startDate,
  endDate,
  isLoading,
}: DateDisplayProps) {
  // Show skeleton when loading
  if (isLoading) {
    return <Skeleton className="h-5 w-32 bg-gray-200" />;
  }

  if (!startDate && !endDate) {
    return <span className="text-gray-700 font-medium">Any week</span>;
  }

  if (startDate && endDate) {
    const sameMonth = isSameMonth(startDate, endDate);

    return (
      <span className="text-gray-900 font-medium">
        {format(startDate, "d")}
        {sameMonth ? " - " : ` ${format(startDate, "MMM")} - `}
        {format(endDate, "d MMM")}
      </span>
    );
  }

  if (startDate) {
    return (
      <span className="text-gray-700">{format(startDate, "d MMM")} - ?</span>
    );
  }

  return <span className="text-gray-700">? - {format(endDate!, "d MMM")}</span>;
}
