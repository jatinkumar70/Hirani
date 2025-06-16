"use client";

import * as React from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  addDays,
  format,
  isSameDay,
  isWithinInterval,
  isSameMonth,
} from "date-fns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/Dialog/Dialog";
import { Button } from "../Button/Button";
import { cn } from "../../../lib/utils";
import type { IInventoryPrice } from "../../../types/types";

interface DateRangeSliderProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  isOpen: boolean;
  showPrices?: boolean;
  onOpenChange: (open: boolean) => void;
  dailyPrice?: IInventoryPrice[] | any;
  roomAvailability?: IInventoryPrice[] | any;
}

export function DateRangeSlider({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  isOpen,
  showPrices = false,
  onOpenChange,
  dailyPrice,
  roomAvailability,
}: DateRangeSliderProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    startDate || new Date()
  );
  const [selectedRange, setSelectedRange] = React.useState<
    "custom" | "30" | "60" | "90"
  >("custom");

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      // Set initial state
      setIsMobile(window.innerWidth < 768);

      // Add event listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener("resize", handleResize);

      // Clean up
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  React.useEffect(() => {
    if (startDate) {
      // Always set to the start date when available
      setCurrentMonth(startDate);
    } else if (endDate) {
      setCurrentMonth(endDate);
    } else {
      // If no dates are selected, default to current month
      setCurrentMonth(new Date());
    }
  }, [startDate, endDate]);

  const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const getMonthData = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const days = [];
    const currentDate = new Date(firstDay);

    // Adjust to start from Monday (1) instead of Sunday (0)
    const startDay = firstDay.getDay() || 7;

    // Add empty days for the first week
    for (let i = 1; i < startDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    while (currentDate <= lastDay) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      onStartDateChange(date);
      onEndDateChange(null);
      setSelectedRange("custom");
    } else {
      if (date < startDate) {
        onEndDateChange(startDate);
        onStartDateChange(date);
      } else {
        onEndDateChange(date);
        onOpenChange(false);
      }
    }
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return isWithinInterval(date, { start: startDate, end: endDate });
  };

  const isDateSelected = (date: Date) => {
    return (
      (startDate && isSameDay(date, startDate)) ||
      (endDate && isSameDay(date, endDate))
    );
  };

  const isCurrentDate = (date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  };

  const handleRangeSelect = (days: "30" | "60" | "90") => {
    const start = new Date();
    const end = addDays(start, Number.parseInt(days) - 1);
    onStartDateChange(start);
    onEndDateChange(end);
    setSelectedRange(days);
  };

  const clearDates = () => {
    onStartDateChange(null);
    onEndDateChange(null);
    setSelectedRange("custom");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-4 sm:p-6 lg:p-4 bg-white" maxWidth="800px">
        <DialogHeader className="flex justify-between items-center mb-2">
          <DialogTitle className="text-xl font-medium text-center">
            Filters
            <DialogClose className="p-1 absolute right-5 top-5 rounded-lg opacity-70 transition-all hover:opacity-100 disabled:pointer-events-none outline-none border-none hover:outline hover:border border-black hover:bg-black/80 hover:text-gray-100 duration-300">
              <X size={20} />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-row gap-2 sm:gap-4 items-start sm:items-center mb-2 text-sm sm:text-base p-2 border-gray-300 border-b">
          <div className="text-[#999999] font-medium">
            {startDate ? format(startDate, "MMM d, yyyy") : "Start date"}
          </div>
          <span className="hidden sm:block">
            <ArrowRight size={22} />
          </span>
          <span className="block sm:hidden self-center">
            <ArrowRight size={18} />
          </span>
          <div className="text-[#999999] font-medium">
            {endDate ? format(endDate, "MMM d, yyyy") : "End date"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
          {(isMobile ? [0] : [0, 1]).map((offset) => {
            const monthDate = addDays(currentMonth, offset * 31);
            const monthData = getMonthData(monthDate);

            return (
              <div key={offset} className="relative">
                <div className="flex items-center justify-between mb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevMonth}
                    className="absolute left-0 hover:bg-transparent">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <div className="flex-1 text-center">
                    {months[monthDate.getMonth()]}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextMonth}
                    className="absolute right-0 hover:bg-transparent">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2">
                  {weekDays.map((day) => (
                    <div key={day} className="py-1 text-[10px] sm:text-xs">
                      {day}
                    </div>
                  ))}
                </div>

                <div
                  className={cn(
                    "grid",
                    !showPrices
                      ? "grid-cols-7 gap-3 sm:gap-2"
                      : "grid-cols-7 gap-3 sm:gap-3"
                  )}>
                  {monthData.map((date, index) => {
                    if (date && isSameMonth(date, monthDate)) {
                      // Look up the price for the date from dailyPrice
                      const formattedDate = format(date, "yyyy-MM-dd");
                      const priceData = dailyPrice && dailyPrice[formattedDate];
                      const price =
                        priceData && priceData.length > 0
                          ? priceData[0].non_refundable_price
                          : null;
                      const today = new Date();
                      today.setHours(0, 0, 0, 0); // Normalize time to avoid issues

                      // Check room availability
                      const availabilityData =
                        roomAvailability && roomAvailability[formattedDate];
                      const availableRooms =
                        availabilityData && availabilityData.length > 0
                          ? availabilityData[0].available_room
                          : null;

                      // Disable if no rooms available or if date is in past
                      const isDisabled = availableRooms === 0 || date < today;

                      return (
                        <div
                          key={index}
                          className={cn(
                            "flex flex-col items-center justify-center rounded-sm w-full h-full",
                            // Remove pointer events if disabled
                            isDisabled
                              ? "cursor-not-allowed opacity-70 line-through decoration-black decoration-2"
                              : "cursor-pointer hover:bg-[#D3D3D3]",
                            !showPrices
                              ? "w-14 h-12 sm:w-12 sm:h-10"
                              : "w-14 h-12 sm:w-12 sm:h-10",
                            {
                              "bg-dark-gold hover:bg-dark-gold text-white z-10 rounded-lg":
                                isDateSelected(date) ||
                                (isCurrentDate(date) && !startDate && !endDate),
                              "bg-[#D3D3D3] rounded-lg":
                                isDateInRange(date) && !isDateSelected(date),
                              // Optionally strike through the entire container when disabled
                              "line-through": isDisabled,
                            }
                          )}
                          onClick={() => {
                            if (!isDisabled && date) handleDateClick(date);
                          }}>
                          <span
                            className={cn(
                              "text-sm font-semibold",
                              isDateSelected(date)
                                ? "text-white"
                                : "text-gray-800"
                            )}>
                            {date ? date.getDate() : ""}
                          </span>
                          {showPrices &&
                            dailyPrice &&
                            priceData &&
                            priceData.length > 0 &&
                            availableRooms > 0 &&
                            date >= today && (
                              <span
                                className={cn(
                                  "text-[10px] font-medium",
                                  isDateSelected(date)
                                    ? "text-white"
                                    : "text-gray-800"
                                )}>
                                {`${price}`}
                              </span>
                            )}
                        </div>
                      );
                    }
                    return <div key={index} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant="outline"
            className={cn(
              "rounded-full px-3 sm:px-4 text-sm sm:text-base",
              selectedRange === "custom" &&
                `bg-[#D3D3D3]/50 text-gray-800 border-black border-2`
            )}>
            Custom
          </Button>
          <Button
            variant="outline"
            onClick={() => handleRangeSelect("30")}
            className={cn(
              "rounded-full px-3 sm:px-4 text-sm sm:text-base border-gray-500",
              selectedRange === "30" &&
                `bg-dark-gold text-white hover:bg-dark-gold border-dark-gold`
            )}>
            30 days
          </Button>
          <Button
            variant="outline"
            onClick={() => handleRangeSelect("60")}
            className={cn(
              "rounded-full px-3 sm:px-4 text-sm sm:text-base border-gray-500",
              selectedRange === "60" &&
                `bg-dark-gold text-white hover:bg-dark-gold border-dark-gold`
            )}>
            60 days
          </Button>
          <Button
            variant="outline"
            onClick={() => handleRangeSelect("90")}
            className={cn(
              "rounded-full px-3 sm:px-4 text-sm sm:text-base border-gray-600",
              selectedRange === "90" &&
                `bg-dark-gold text-white hover:bg-dark-gold border-dark-gold`
            )}>
            90 days
          </Button>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="ghost"
            onClick={clearDates}
            className="text-base font-semibold">
            Clear dates
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
