"use client";
import { format, parse } from "date-fns"; // Import format and parse from date-fns
import { CalendarIcon } from "lucide-react";
import React, { useEffect } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Button } from "../ui/Button/Button";
import { DateRangeSlider } from "../ui/DateRangeSlider/DateRangeSlider";

interface Props {
  value: {
    startDate: string;
    endDate: string;
  };
  handleDateRangeChange: (startDate: string, endDate: string) => void;
  wordCheckIn?: string;
  wordCheckOut?: string;
}

export default function CustomDateRangePicker({
  value,
  handleDateRangeChange,
  wordCheckIn,
  wordCheckOut,
}: Props) {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  useEffect(() => {
    if (value.startDate && value.endDate) {
      const parsedStartDate = parse(value.startDate, "yyyy-MM-dd", new Date());
      const parsedEndDate = parse(value.endDate, "yyyy-MM-dd", new Date());
      setStartDate(parsedStartDate);
      setEndDate(parsedEndDate);
    }
  }, [value]);

  const handleStartDateChange = (newStartDate: Date | null) => {
    setStartDate(newStartDate);
    if (newStartDate && endDate && newStartDate <= endDate) {
      handleDateRangeChange(
        format(newStartDate, "yyyy-MM-dd"),
        format(endDate as Date, "yyyy-MM-dd")
      );
    }
  };

  const handleEndDateChange = (newEndDate: Date | null) => {
    setEndDate(newEndDate);
    if (startDate && newEndDate && newEndDate >= startDate) {
      handleDateRangeChange(
        format(startDate as Date, "yyyy-MM-dd"),
        format(newEndDate, "yyyy-MM-dd")
      );
    }
  };

  return (
    <div className="relative">
      {/* Input Field */}
      <div className="flex items-center bg-transparent gap-4 lg:gap-0 lg:border-none lg:p-1 py-1 cursor-pointer">
        {/* Check-in Section */}
        <div className="flex items-center space-x-2 flex-1 lg:border-none border border-gray-400 rounded-xl">
          {/* Calendar Icon */}
          <Button
            type="button"
            variant="outline"
            size={"lg"}
            className="text-sm lg:text-base w-full h-16  lg:h-10  justify-start rtl:gap-3 text-left font-normal border-0 outline-none text-gray-800"
            onClick={() => setIsCalendarOpen(true)}>
            <CalendarIcon className="mr-2 rtl:-mr-4  h-5 w-5" />
            {startDate ? (
              <span>{format(startDate, "dd-MMM-yyyy")}</span>
            ) : (
              // Display start date in yyyy-MM-dd format
              wordCheckIn
            )}
          </Button>
        </div>

        {/* Slanted Divider */}
        <div className="relative mx-4 hidden lg:flex flex-col items-center justify-center rtl:ml-2 ml-0">
          <div
            className="ml-2 border border-black h-6 transform  -rotate-45 rtl:rotate-45 origin-bottom mb-1 "
            style={{
              transform: `rotate(${
                typeof window !== "undefined" && document.dir === "rtl"
                  ? "200deg"
                  : "-20deg"
              })`,
            }}></div>
          <div
            className="-mt-1 ml-2 border border-black h-6 transform rotate-45 rtl:rotate-45 origin-top"
            style={{
              transform: `rotate(${
                typeof window !== "undefined" && document.dir === "rtl"
                  ? "160deg"
                  : "20deg"
              })`,
            }}></div>
        </div>

        {/* Check-out Section */}
        <div className="flex items-center space-x-2 w-1/2 lg:border-none border border-gray-400 rounded-xl">
          {/* Calendar Icon */}
          <Button
            type="button"
            variant="outline"
            size={"lg"}
            className="w-full text-sm lg:text-base h-16  lg:h-10  justify-start rtl:gap-3 text-left font-normal border-0 outline-none text-gray-800"
            onClick={() => setIsCalendarOpen(true)}>
            <CalendarIcon className="mr-2 rtl:-mr-4  h-5 w-5" />
            {endDate ? (
              <span>{format(endDate, "dd-MMM-yyyy")}</span>
            ) : (
              wordCheckOut
            )}
          </Button>
        </div>
      </div>

      <DateRangeSlider
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        isOpen={isCalendarOpen}
        onOpenChange={setIsCalendarOpen}
      />
    </div>
  );
}
