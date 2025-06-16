import { isSameMonth } from "date-fns";

interface DateDisplayProps {
  startDate: Date | null;
  endDate: Date | null;
}

export function DateDisplay({ startDate, endDate }: DateDisplayProps) {
  if (!startDate || !endDate) {
    return <span className="text-gray-800 font-medium">Any week</span>;
  }

  const formatCompactDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return { day, month };
  };

  const startFormatted = formatCompactDate(startDate);
  const endFormatted = formatCompactDate(endDate);

  let dateDisplay;
  if (isSameMonth(startDate, endDate)) {
    dateDisplay = `${startFormatted.day}-${endFormatted.day} ${endFormatted.month}`;
  } else {
    dateDisplay = `${startFormatted.day} ${startFormatted.month}-${endFormatted.day} ${endFormatted.month}`;
  }

  return <span className="text-gray-800 font-medium">{dateDisplay}</span>;
}
