"use client";

import * as React from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  addDays,
  addMonths,
  format,
  isSameDay,
  isWithinInterval,
  subMonths,
  isSameMonth,
  startOfMonth,
} from "date-fns";
import { cn } from "../../../lib/utils";
import type { IInventoryPrice } from "../../../types/types";
import { Button } from "../../ui/Button/Button";

interface DateRangeSliderProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  isOpen: boolean;
  showPrices?: boolean;
  onOpenChange: (open: boolean) => void;
  activeSelection: any;
  dailyPrice?: IInventoryPrice[] | any;
}

export function NavDateRangeMobile({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  isOpen,
  showPrices = false,
  onOpenChange,
  activeSelection,
  dailyPrice,
}: DateRangeSliderProps) {
  // Initialize with either the start date, or current date if no dates are selected
  const [currentMonth, setCurrentMonth] = React.useState(() => {
    if (startDate) {
      return startOfMonth(startDate);
    }
    return startOfMonth(new Date());
  });

  const [selectedRange, setSelectedRange] = React.useState<
    "custom" | "30" | "60" | "90"
  >("custom");

  // Update current month when start date changes
  React.useEffect(() => {
    if (startDate) {
      setCurrentMonth(startOfMonth(startDate));
    }
  }, [startDate]);

  React.useEffect(() => {
    // Close the calendar when both start and end dates are selected
    if (startDate && endDate) {
      // Add a small delay to allow the UI to update before closing
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [startDate, endDate, onOpenChange]);

  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.innerWidth < 640
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

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

  // Improved month navigation functions
  const nextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    // Only allow navigating to past months if they're not before the current month
    if (
      currentMonth > firstDayOfCurrentMonth ||
      isSameMonth(currentMonth, firstDayOfCurrentMonth)
    ) {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      // Set startDate and reset endDate
      onStartDateChange(date);
      onEndDateChange(null);
      setSelectedRange("custom");
    } else {
      if (date < startDate) {
        onEndDateChange(startDate);
        onStartDateChange(date);
      } else {
        onEndDateChange(date);
      }

      // When both dates are selected, reset active selection
      if (date !== startDate) {
        activeSelection(null);
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

  const handleRangeSelect = (days: "30" | "60" | "90", e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const start = new Date();
    const end = addDays(start, Number.parseInt(days) - 1);
    onStartDateChange(start);
    onEndDateChange(end);
    setSelectedRange(days);
  };

  const handleCustomClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onStartDateChange(null);
    onEndDateChange(null);
    setSelectedRange("custom");
    // Reset to current month when clearing dates
    setCurrentMonth(startOfMonth(new Date()));
  };

  const clearDates = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onStartDateChange(null);
    onEndDateChange(null);
    setSelectedRange("custom");
    // Reset to current month when clearing dates
    setCurrentMonth(startOfMonth(new Date()));
  };

  // Calculate the second month to display (next month after currentMonth)
  const secondMonth = addMonths(currentMonth, 1);

  return (
    <div className="w-full max-w-[600px] bg-white rounded-lg shadow-lg border border-gray-200 p-3 sm:p-4">
      {/* Top Section with Close Button */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center mb-4 border-b pb-2">
        <div className="text-base font-medium text-gray-600 flex items-center gap-2 mb-2 xs:mb-0">
          <span>
            {startDate ? format(startDate, "MMM d, yyyy") : "Start date"}
          </span>
          <ArrowRight size={16} />
          <span>{endDate ? format(endDate, "MMM d, yyyy") : "End date"}</span>
        </div>
        {/* Close Button */}
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={activeSelection}
          className="p-0 h-8 w-8">
          <X className="h-5 w-5" />
        </Button> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* First Month */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevMonth}
              className="absolute left-0 hover:bg-transparent p-0 h-8 w-8 sm:h-6 sm:w-6">
              <ChevronLeft className="h-5 w-5 sm:h-4 sm:w-4" />
            </Button>
            <div className="flex-1 text-center text-base font-medium">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={nextMonth}
                className="absolute right-0 hover:bg-transparent p-0 h-8 w-8 sm:h-6 sm:w-6">
                <ChevronRight className="h-5 w-5 sm:h-4 sm:w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-7 gap-0 text-center text-xs sm:text-sm mb-1">
            {weekDays.map((day) => (
              <div
                key={day}
                className="py-1 sm:py-0.5 text-[10px] sm:text-[10px]">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {getMonthData(currentMonth).map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} />;
              }

              if (date && isSameMonth(date, currentMonth)) {
                // Look up the price for the date from dailyPrice
                const formattedDate = format(date, "yyyy-MM-dd");
                const priceData = dailyPrice && dailyPrice[formattedDate];
                const price =
                  priceData && priceData.length > 0 ? priceData[0].price : null;
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Normalize time to avoid issues

                const isDisabled = price === 0 || date < today;

                return (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col items-center justify-center rounded-sm",
                      isDisabled
                        ? "cursor-not-allowed opacity-70 line-through decoration-black decoration-2"
                        : "cursor-pointer hover:bg-[#D3D3D3]",
                      "w-14 h-8 sm:w-12 sm:h-7", // Adjusted for mobile
                      {
                        "bg-dark-gold hover:bg-dark-gold text-white z-10 rounded-lg":
                          isDateSelected(date),
                        "bg-[#D3D3D3]":
                          isDateInRange(date) && !isDateSelected(date),
                        "ring-2 ring-primary":
                          isCurrentDate(date) && !isDateSelected(date),
                        // Optionally strike through the entire container when disabled
                        "line-through": isDisabled,
                      }
                    )}
                    onClick={() => {
                      if (!isDisabled) handleDateClick(date);
                    }}>
                    <span
                      className={cn(
                        "text-sm font-medium",
                        isDateSelected(date) ? "text-white" : "text-gray-800"
                      )}>
                      {date.getDate()}
                    </span>
                    {showPrices &&
                      dailyPrice &&
                      priceData &&
                      priceData.length > 0 && (
                        <span
                          className={cn(
                            "text-[9px] font-medium",
                            isDateSelected(date)
                              ? "text-white"
                              : "text-gray-800"
                          )}>
                          {!isDisabled && `$${price}`}
                        </span>
                      )}
                  </div>
                );
              }
              return <div key={index} />;
            })}
          </div>
        </div>

        {/* Second Month - Only visible on desktop or when navigating on mobile */}
        {!isMobile && (
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1 text-center text-base font-medium">
                {months[secondMonth.getMonth()]} {secondMonth.getFullYear()}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextMonth}
                className="absolute right-0 hover:bg-transparent p-0 h-8 w-8 sm:h-6 sm:w-6">
                <ChevronRight className="h-5 w-5 sm:h-4 sm:w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-0 text-center text-xs sm:text-sm mb-1">
              {weekDays.map((day) => (
                <div
                  key={`second-${day}`}
                  className="py-1 sm:py-0.5 text-[10px] sm:text-[10px]">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {getMonthData(secondMonth).map((date, index) => {
                if (!date) {
                  return <div key={`second-empty-${index}`} />;
                }

                if (date && isSameMonth(date, secondMonth)) {
                  // Look up the price for the date from dailyPrice
                  const formattedDate = format(date, "yyyy-MM-dd");
                  const priceData = dailyPrice && dailyPrice[formattedDate];
                  const price =
                    priceData && priceData.length > 0
                      ? priceData[0].price
                      : null;
                  const today = new Date();
                  today.setHours(0, 0, 0, 0); // Normalize time to avoid issues

                  const isDisabled = price === 0 || date < today;

                  return (
                    <div
                      key={`second-${index}`}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-sm",
                        isDisabled
                          ? "cursor-not-allowed opacity-70 line-through decoration-black decoration-2"
                          : "cursor-pointer hover:bg-[#D3D3D3]",
                        "w-14 h-8 sm:w-12 sm:h-7", // Adjusted for mobile
                        {
                          "bg-dark-gold hover:bg-dark-gold text-white z-10 rounded-lg":
                            isDateSelected(date),
                          "bg-[#D3D3D3]":
                            isDateInRange(date) && !isDateSelected(date),
                          "ring-2 ring-primary":
                            isCurrentDate(date) && !isDateSelected(date),
                          // Optionally strike through the entire container when disabled
                          "line-through": isDisabled,
                        }
                      )}
                      onClick={() => {
                        if (!isDisabled) handleDateClick(date);
                      }}>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isDateSelected(date) ? "text-white" : "text-gray-800"
                        )}>
                        {date.getDate()}
                      </span>
                      {showPrices &&
                        dailyPrice &&
                        priceData &&
                        priceData.length > 0 && (
                          <span
                            className={cn(
                              "text-[9px] font-medium",
                              isDateSelected(date)
                                ? "text-white"
                                : "text-gray-800"
                            )}>
                            {!isDisabled && `$${price}`}
                          </span>
                        )}
                    </div>
                  );
                }
                return <div key={`second-${index}`} />;
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1 mt-4">
        <Button
          variant="outline"
          onClick={handleCustomClick}
          className={cn(
            "rounded-full px-3 text-sm h-8 sm:h-7",
            selectedRange === "custom" &&
              `bg-[#D3D3D3]/50 text-gray-800 border-black border-2`
          )}>
          Custom
        </Button>
        <Button
          variant="outline"
          onClick={(e) => handleRangeSelect("30", e)}
          className={cn(
            "rounded-full px-3 text-sm h-8 sm:h-7 border-gray-500",
            selectedRange === "30" &&
              `bg-dark-gold text-white hover:bg-dark-gold border-dark-gold`
          )}>
          30 days
        </Button>
        <Button
          variant="outline"
          onClick={(e) => handleRangeSelect("60", e)}
          className={cn(
            "rounded-full px-3 text-sm h-8 sm:h-7 border-gray-500",
            selectedRange === "60" &&
              `bg-dark-gold text-white hover:bg-dark-gold border-dark-gold`
          )}>
          60 days
        </Button>
        <Button
          variant="outline"
          onClick={(e) => handleRangeSelect("90", e)}
          className={cn(
            "rounded-full px-3 text-sm h-8 sm:h-7 border-gray-600",
            selectedRange === "90" &&
              `bg-dark-gold text-white hover:bg-dark-gold border-dark-gold`
          )}>
          90 days
        </Button>
      </div>

      <div className="flex justify-end mt-3">
        <Button
          variant="ghost"
          onClick={clearDates}
          className="text-sm font-semibold h-8 sm:h-7 px-3 sm:px-2">
          Clear dates
        </Button>
      </div>
    </div>
  );
}
