"use client";

import { useEffect, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  addMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isAfter,
  isBefore,
  isWithinInterval,
} from "date-fns";
import { Separator } from "../ui/Separator/Separator";

interface DateRangePickerProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onCheckInChange: (date: Date | null) => void;
  onCheckOutChange: (date: Date | null) => void;
  activeField: "checkIn" | "checkOut";
  onClose: () => void;
  onFlexibilityChange?: (flexibility: FlexibilityOption) => void;
}

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

type FlexibilityOption = {
  label: string;
  days: number;
};

export function DateRangePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  activeField,
  onClose,
  onFlexibilityChange,
}: DateRangePickerProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    startDate: checkIn,
    endDate: checkOut,
  });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [viewMode, setViewMode] = useState<"dates" | "months" | "flexible">(
    "dates"
  );

  // Month tab state
  const [monthCount, setMonthCount] = useState(1);
  const [monthStartDate, setMonthStartDate] = useState<Date | null>(null);
  const [monthEndDate, setMonthEndDate] = useState<Date | null>(null);

  // Flexibility state
  const [selectedFlexibility, setSelectedFlexibility] =
    useState<FlexibilityOption>({
      label: "Exact dates",
      days: 0,
    });

  // Computed flexible date range
  const [flexibleRange, setFlexibleRange] = useState<{
    earliestCheckIn: Date | null;
    latestCheckIn: Date | null;
    earliestCheckOut: Date | null;
    latestCheckOut: Date | null;
  }>({
    earliestCheckIn: null,
    latestCheckIn: null,
    earliestCheckOut: null,
    latestCheckOut: null,
  });

  const flexibilityOptions: FlexibilityOption[] = [
    { label: "Exact dates", days: 0 },
    { label: "+1 day", days: 1 },
    { label: "+2 days", days: 2 },
    { label: "+3 days", days: 3 },
    { label: "+7 days", days: 7 },
    { label: "+14 days", days: 14 },
  ];

  // Initialize month tab dates
  useEffect(() => {
    if (viewMode === "months" && !monthStartDate) {
      const today = new Date();
      const currentMonthStart = startOfMonth(today);
      const currentMonthEnd = endOfMonth(today);
      const middleOfMonth = new Date(
        currentMonthStart.getTime() +
          (currentMonthEnd.getTime() - currentMonthStart.getTime()) / 2
      );

      // If we're past the middle of the current month, start with next month
      let startingMonth;
      if (today > middleOfMonth) {
        startingMonth = startOfMonth(addMonths(today, 1));
      } else {
        startingMonth = currentMonthStart;
      }

      const lastDayOfMonth = endOfMonth(
        addMonths(startingMonth, monthCount - 1)
      );

      setMonthStartDate(startingMonth);
      setMonthEndDate(lastDayOfMonth);
    }
  }, [viewMode, monthStartDate, monthCount]);

  // Update month end date when month count changes
  useEffect(() => {
    if (monthStartDate) {
      const lastDayOfMonth = endOfMonth(
        addMonths(monthStartDate, monthCount - 1)
      );
      setMonthEndDate(lastDayOfMonth);
    }
  }, [monthCount, monthStartDate]);

  // Calculate flexible date ranges whenever selected dates or flexibility changes
  useEffect(() => {
    if (selectedRange.startDate && selectedFlexibility.days > 0) {
      // Only apply flexibility forward in time, not backward
      const earliestCheckIn = selectedRange.startDate;
      const latestCheckIn = addDays(
        selectedRange.startDate,
        selectedFlexibility.days
      );

      let earliestCheckOut = null;
      let latestCheckOut = null;

      if (selectedRange.endDate) {
        earliestCheckOut = selectedRange.endDate;
        latestCheckOut = addDays(
          selectedRange.endDate,
          selectedFlexibility.days
        );
      }

      setFlexibleRange({
        earliestCheckIn,
        latestCheckIn,
        earliestCheckOut,
        latestCheckOut,
      });
    } else {
      // Reset flexible range if exact dates or no dates selected
      setFlexibleRange({
        earliestCheckIn: null,
        latestCheckIn: null,
        earliestCheckOut: null,
        latestCheckOut: null,
      });
    }
  }, [
    selectedRange.startDate,
    selectedRange.endDate,
    selectedFlexibility.days,
  ]);

  // Notify parent component when flexibility changes
  useEffect(() => {
    if (onFlexibilityChange) {
      onFlexibilityChange(selectedFlexibility);
    }
  }, [selectedFlexibility, onFlexibilityChange]);

  const handleDateClick = (date: Date) => {
    if (
      !selectedRange.startDate ||
      (selectedRange.startDate && selectedRange.endDate) ||
      isBefore(date, selectedRange.startDate)
    ) {
      // Start a new selection
      setSelectedRange({ startDate: date, endDate: null });
      onCheckInChange(date);
      onCheckOutChange(null);
    } else {
      // Complete the selection
      setSelectedRange({ ...selectedRange, endDate: date });
      onCheckOutChange(date);
    }
  };

  const handleDateHover = (date: Date) => {
    setHoverDate(date);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  // Apply month selection
  const applyMonthSelection = () => {
    if (monthStartDate && monthEndDate) {
      // Create new Date objects to ensure we're not passing references
      const startDate = new Date(monthStartDate);
      const endDate = new Date(monthEndDate);

      // First update the local state
      setSelectedRange({
        startDate: startDate,
        endDate: endDate,
      });

      // Ensure we're calling the parent component's callbacks with the correct dates
      onCheckInChange(startDate);
      onCheckOutChange(endDate);
      // Close the date picker
      onClose();
    }
  };

  // Handle flexibility option selection
  const handleFlexibilityChange = (option: FlexibilityOption) => {
    setSelectedFlexibility(option);

    // If check-in date is selected and flexibility days > 0, automatically set checkout date
    if (selectedRange.startDate && option.days > 0) {
      const newCheckoutDate = addDays(selectedRange.startDate, option.days);
      setSelectedRange({
        startDate: selectedRange.startDate,
        endDate: newCheckoutDate,
      });
      onCheckOutChange(newCheckoutDate);
    }
  };

  useEffect(() => {
    // Handle click outside to close dropdown
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".date-picker-container") &&
        !target.closest('[data-section="checkIn"]') &&
        !target.closest('[data-section="checkOut"]')
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    // Update the selected range when parent component's state changes
    setSelectedRange({
      startDate: checkIn,
      endDate: checkOut,
    });

    // If both dates are cleared, reset the hover date as well
    if (!checkIn && !checkOut) {
      setHoverDate(null);
    }
  }, [checkIn, checkOut]);

  // Generate calendar for a specific month
  const generateCalendar = (date: Date) => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const isDateSelected = (date: Date) => {
    if (!date) return false;

    return (
      (selectedRange.startDate && isSameDay(date, selectedRange.startDate)) ||
      (selectedRange.endDate && isSameDay(date, selectedRange.endDate))
    );
  };

  const isDateInRange = (date: Date) => {
    if (!date || !selectedRange.startDate) return false;

    // If we have a complete range
    if (selectedRange.endDate) {
      return isWithinInterval(date, {
        start: selectedRange.startDate,
        end: selectedRange.endDate,
      });
    }

    // If we're hovering during selection
    if (hoverDate && isAfter(hoverDate, selectedRange.startDate)) {
      return isWithinInterval(date, {
        start: selectedRange.startDate,
        end: hoverDate,
      });
    }

    return false;
  };

  const isDateInFlexibleRange = (date: Date) => {
    if (!date || selectedFlexibility.days === 0) return false;

    // For check-in flexibility - only dates after the selected check-in date
    if (flexibleRange.earliestCheckIn && flexibleRange.latestCheckIn) {
      if (
        !isSameDay(date, selectedRange.startDate!) &&
        isWithinInterval(date, {
          start: flexibleRange.earliestCheckIn,
          end: flexibleRange.latestCheckIn,
        })
      ) {
        return true;
      }
    }

    // For check-out flexibility - only dates after the selected check-out date
    if (flexibleRange.earliestCheckOut && flexibleRange.latestCheckOut) {
      if (
        !isSameDay(date, selectedRange.endDate!) &&
        isWithinInterval(date, {
          start: flexibleRange.earliestCheckOut,
          end: flexibleRange.latestCheckOut,
        })
      ) {
        return true;
      }
    }

    return false;
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isBefore(date, today);
  };

  const isCheckInDate = (date: Date) => {
    return selectedRange.startDate && isSameDay(date, selectedRange.startDate);
  };

  const isCheckOutDate = (date: Date) => {
    return selectedRange.endDate && isSameDay(date, selectedRange.endDate);
  };

  const formatMonthYear = (date: Date) => {
    return format(date, "MMMM yyyy");
  };

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="date-picker-container absolute top-full left-0 right-0 mt-4 mx-auto w-full max-w-4xl px-11 bg-white rounded-3xl shadow-lg border border-gray-200 z-50 overflow-hidden transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95">
      {/* View mode selector */}
      <div className="flex justify-center p-4">
        <div className="inline-flex bg-[#EBEBEB] rounded-full p-1">
          <button
            className={cn(
              "px-6 py-2 rounded-full text-gray-600 text-sm font-medium transition-colors",
              viewMode === "dates" ? "bg-white shadow-sm" : "hover:bg-[#DDDDDD]"
            )}
            onClick={() => setViewMode("dates")}>
            Dates
          </button>
          <button
            className={cn(
              "px-6 py-2 rounded-full text-gray-600 text-sm font-medium transition-colors",
              viewMode === "months"
                ? "bg-white shadow-sm"
                : "hover:bg-[#DDDDDD]"
            )}
            onClick={() => setViewMode("months")}>
            Months
          </button>
        </div>
      </div>

      {viewMode === "dates" && (
        <div className="p-4">
          <div className="text-gray-500 flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Previous month">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex-1 flex justify-around">
              <h3 className="text-base text-black font-medium">
                {formatMonthYear(currentMonth)}
              </h3>
              <h3 className="text-base text-black font-medium">
                {formatMonthYear(addMonths(currentMonth, 1))}
              </h3>
            </div>
            <button
              onClick={nextMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next month">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Current Month Calendar */}
            <div>
              <div className="grid grid-cols-7 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {generateCalendar(currentMonth).map((date, index) => {
                  const isCurrentMonth = isSameMonth(date, currentMonth);
                  const isSelected = isDateSelected(date);
                  const isInRange = isDateInRange(date);
                  const isInFlexRange = isDateInFlexibleRange(date);
                  const isDisabled = isDateDisabled(date);
                  const isStartDate = isCheckInDate(date);
                  const isEndDate = isCheckOutDate(date);

                  return (
                    <div key={index} className="h-full">
                      <button
                        className={cn(
                          "w-11 h-11 my-0.5 ml-1 flex items-center justify-center rounded-full text-sm transition-all duration-150",
                          !isCurrentMonth && "opacity-0 pointer-events-none",
                          isDisabled && "text-gray-400 cursor-not-allowed",
                          isSelected &&
                            "bg-primary-gold text-gray-100 hover:bg-gray-800",
                          !isSelected &&
                            !isDisabled &&
                            "hover:border-gray-300 text-black font-medium hover:bg-gray-50",
                          isInRange &&
                            !isSelected &&
                            "bg-gray-200 hover:bg-none border hover:border-primary-gold text-gray-700",
                          isInFlexRange &&
                            "bg-gray-100 border border-dashed border-primary-gold/70 text-gray-700",
                          isStartDate && "hover:bg-primary-gold text-gray-100",
                          isEndDate && "hover:bg-primary-gold text-gray-100"
                        )}
                        disabled={isDisabled || !isCurrentMonth}
                        onClick={() => !isDisabled && handleDateClick(date)}
                        onMouseEnter={() =>
                          !isDisabled && handleDateHover(date)
                        }
                        aria-label={format(date, "MMMM d, yyyy")}>
                        {format(date, "d")}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Month Calendar */}
            <div>
              <div className="grid grid-cols-7 mb-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {generateCalendar(addMonths(currentMonth, 1)).map(
                  (date, index) => {
                    const isCurrentMonth = isSameMonth(
                      date,
                      addMonths(currentMonth, 1)
                    );
                    const isSelected = isDateSelected(date);
                    const isInRange = isDateInRange(date);
                    const isInFlexRange = isDateInFlexibleRange(date);
                    const isDisabled = isDateDisabled(date);
                    const isStartDate = isCheckInDate(date);
                    const isEndDate = isCheckOutDate(date);

                    return (
                      <div key={index} className="h-full">
                        <button
                          className={cn(
                            "w-11 h-11 my-0.5 ml-1 flex items-center justify-center rounded-full text-sm transition-all duration-150",
                            !isCurrentMonth && "opacity-0 pointer-events-none",
                            isDisabled &&
                              "text-gray-400 cursor-not-allowed line-through decoration-black decoration-2",
                            isSelected &&
                              "bg-primary-gold text-gray-100 hover:bg-gray-800",
                            !isSelected &&
                              !isDisabled &&
                              "hover:border-gray-300 text-black font-medium hover:bg-gray-50",
                            isInRange &&
                              !isSelected &&
                              "bg-gray-200 hover:bg-none border hover:border-primary-gold text-gray-700",
                            isInFlexRange &&
                              "bg-gray-100 border border-dashed border-primary-gold/70 text-gray-700",
                            isStartDate &&
                              "hover:bg-primary-gold text-gray-100",
                            isEndDate && "hover:bg-primary-gold text-gray-100"
                          )}
                          disabled={isDisabled || !isCurrentMonth}
                          onClick={() => !isDisabled && handleDateClick(date)}
                          onMouseEnter={() =>
                            !isDisabled && handleDateHover(date)
                          }
                          aria-label={format(date, "MMMM d, yyyy")}>
                          {format(date, "d")}
                        </button>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Flexibility options */}
          <div className="flex flex-wrap gap-2 mt-6 justify-center">
            {flexibilityOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => handleFlexibilityChange(option)}
                className={cn(
                  "px-4 py-2 rounded-full border text-sm font-medium transition-colors",
                  selectedFlexibility.days === option.days
                    ? "border-primary-gold bg-primary-gold/10 text-gray-800"
                    : "border-gray-300 text-gray-500 hover:border-primary-gold hover:bg-primary-gold/5"
                )}>
                {option.label}
              </button>
            ))}
          </div>

          {/* Flexibility explanation */}
          {selectedFlexibility.days > 0 && selectedRange.startDate && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              <p className="font-medium text-center">
                {selectedFlexibility.label} flexibility applied
                {selectedRange.endDate
                  ? " to both check-in and check-out dates"
                  : " to check-in date"}
              </p>
              {selectedRange.startDate && (
                <p className="mt-1 text-center">
                  Check-in: {format(flexibleRange.earliestCheckIn!, "MMM d")} -{" "}
                  {format(flexibleRange.latestCheckIn!, "MMM d")}
                </p>
              )}
              {selectedRange.endDate && (
                <p className="text-center">
                  Check-out: {format(flexibleRange.earliestCheckOut!, "MMM d")}{" "}
                  - {format(flexibleRange.latestCheckOut!, "MMM d")}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {viewMode === "months" && (
        <div className="p-6">
          {/* Month selector */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-base font-medium text-gray-700">Month(s)</div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMonthCount(Math.max(1, monthCount - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                aria-label="Decrease months"
                disabled={monthCount <= 1}>
                <span className="text-lg">-</span>
              </button>
              <span className="text-gray-700 font-medium text-lg">
                {monthCount}
              </span>
              <button
                onClick={() => setMonthCount(monthCount + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
                aria-label="Increase months">
                <span className="text-lg">+</span>
              </button>
            </div>
          </div>
          <Separator className="my-1 bg-gray-200" />

          {/* Starting and ending date display */}
          <div className="flex flex-col mb-6 my-3">
            <div className="flex justify-between items-center">
              <div className="text-base font-medium text-gray-700">
                Starting date
              </div>
              <div className="text-base font-medium text-black underline m-1">
                {monthStartDate
                  ? format(monthStartDate, "EEE, MMM d")
                  : "Select date"}
              </div>
            </div>
            <Separator className="my-4 bg-gray-200" />
            <div className="flex justify-between items-center">
              <div className="text-base font-medium text-gray-700">
                End date
              </div>
              <div className="text-base font-medium text-black underline m-1">
                {monthEndDate
                  ? format(monthEndDate, "EEE, MMM d")
                  : "Select date"}
              </div>
            </div>
          </div>

          {/* Apply button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={applyMonthSelection}
              className="px-6 py-2 bg-primary-gold hover:bg-primary-gold/90 text-white rounded-full font-medium transition-colors">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
