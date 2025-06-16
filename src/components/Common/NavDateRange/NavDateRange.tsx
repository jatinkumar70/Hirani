"use client";

import * as React from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  addDays,
  format,
  isSameDay,
  isWithinInterval,
  subDays,
  isSameMonth,
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
  dailyPrice?: IInventoryPrice[] | any;
}

export function NavDateRange({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  isOpen,
  showPrices = false,
  onOpenChange,
  dailyPrice,
}: DateRangeSliderProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    startDate || new Date()
  );
  const [selectedRange, setSelectedRange] = React.useState<
    "custom" | "30" | "60" | "90"
  >("custom");

  React.useEffect(() => {
    if (startDate) {
      setCurrentMonth(startDate);
    } else if (endDate) {
      setCurrentMonth(endDate);
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

  // Fix the month navigation to prevent triggering search actions
  const nextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const prevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const handleDateClick = (date: Date, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

  // Modify the handleRangeSelect function to properly update dates without causing loops
  const handleRangeSelect = (days: "30" | "60" | "90", e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const start = new Date();
    const end = addDays(start, Number.parseInt(days) - 1);

    // Update local state first
    setSelectedRange(days);

    // Then update parent component state
    onStartDateChange(start);
    onEndDateChange(end);

    // Close the calendar after a short delay
    setTimeout(() => onOpenChange(false), 300);
  };

  // Modify the clearDates function to properly clear dates without causing loops
  const clearDates = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Update local state first
    setSelectedRange("custom");

    // Then update parent component state
    onStartDateChange(null);
    onEndDateChange(null);

    // Close the calendar after a short delay
    setTimeout(() => onOpenChange(false), 300);
  };

  const handleCustomClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedRange("custom");
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenChange(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="w-[600px] absolute top-full left-0 mt-5 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
      onClick={(e) => e.stopPropagation()}>
      {/* Top Section with Close Button */}
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
          <span>
            {startDate ? format(startDate, "MMM d, yyyy") : "Start date"}
          </span>
          <ArrowRight size={16} />
          <span>{endDate ? format(endDate, "MMM d, yyyy") : "End date"}</span>
        </div>
        {/* Close Button */}
        <button
          type="button"
          onClick={handleCloseClick}
          className="text-gray-500 hover:text-gray-800">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {[0, 1].map((offset) => {
          // Calculate the month to display
          const displayMonth = new Date(currentMonth);
          displayMonth.setMonth(currentMonth.getMonth() + offset);

          const monthData = getMonthData(displayMonth);

          return (
            <div key={offset} className="relative">
              <div className="flex items-center justify-between mb-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={offset === 0 ? prevMonth : undefined}
                  className={cn(
                    "absolute left-0 hover:bg-transparent p-0 h-6 w-6",
                    offset === 1 && "invisible"
                  )}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center text-base font-medium">
                  {months[displayMonth.getMonth()]}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={offset === 1 ? nextMonth : undefined}
                  className={cn(
                    "absolute right-0 hover:bg-transparent p-0 h-6 w-6",
                    offset === 0 && "invisible"
                  )}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-0 text-center text-sm mb-1">
                {weekDays.map((day) => (
                  <div key={day} className="py-0.5 text-[10px]">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {monthData.map((date, index) => {
                  if (date && isSameMonth(date, displayMonth)) {
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
                        key={index}
                        className={cn(
                          "flex flex-col items-center justify-center rounded-sm text-white",
                          isDisabled
                            ? "cursor-not-allowed opacity-70 line-through decoration-black decoration-2"
                            : "cursor-pointer hover:bg-[#D3D3D3]",
                          "w-12 h-7 text-white",
                          {
                            "bg-dark-gold hover:bg-dark-gold text-white z-10 rounded-lg":
                              isDateSelected(date) ||
                              (isCurrentDate(date) && !startDate && !endDate),
                            "bg-[#D3D3D3]":
                              isDateInRange(date) && !isDateSelected(date),
                            // Optionally strike through the entire container when disabled
                            "line-through": isDisabled,
                          }
                        )}
                        onClick={(e) => {
                          if (!isDisabled) handleDateClick(date, e);
                        }}>
                        <span className="text-sm text-gray-800 font-medium">
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
          );
        })}
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleCustomClick}
          className={cn(
            "rounded-full px-2 text-sm h-7",
            selectedRange === "custom" &&
              `bg-[#D3D3D3]/50 text-gray-800 border-black border-2`
          )}>
          Custom
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={(e) => handleRangeSelect("30", e)}
          className={cn(
            "rounded-full px-2 text-sm h-7 border-gray-500",
            selectedRange === "30" &&
              `bg-dark-gold text-white hover:bg-dark-gold border-dark-gold`
          )}>
          30 days
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={(e) => handleRangeSelect("60", e)}
          className={cn(
            "rounded-full px-2 text-sm h-7 border-gray-500",
            selectedRange === "60" &&
              `bg-dark-gold text-white hover:bg-dark-gold border-dark-gold`
          )}>
          60 days
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={(e) => handleRangeSelect("90", e)}
          className={cn(
            "rounded-full px-2 text-sm h-7 border-gray-600",
            selectedRange === "90" &&
              `bg-dark-gold text-white hover:bg-dark-gold border-dark-gold`
          )}>
          90 days
        </Button>
      </div>

      <div className="flex justify-end mt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={clearDates}
          className="text-sm font-semibold h-7 px-2">
          Clear dates
        </Button>
      </div>
    </div>
  );
}

export default NavDateRange;
