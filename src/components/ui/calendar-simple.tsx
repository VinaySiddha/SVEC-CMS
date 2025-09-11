import * as React from "react";
import { format } from "date-fns";

interface CalendarProps {
  mode?: "single" | "range" | "multiple";
  selected?: Date | Date[] | undefined;
  onSelect?: (date: Date | undefined) => void;
  disabled?: (date: Date) => boolean;
  initialFocus?: boolean;
  className?: string;
}

const Calendar = ({ 
  mode = "single", 
  selected, 
  onSelect, 
  disabled,
  className = ""
}: CalendarProps) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  
  const handleDateClick = (day: number) => {
    if (onSelect) {
      const selectedDate = new Date(currentYear, currentMonth, day);
      if (disabled && disabled(selectedDate)) {
        return;
      }
      onSelect(selectedDate);
    }
  };
  
  const isSelected = (day: number) => {
    if (!selected) return false;
    
    const date = new Date(currentYear, currentMonth, day);
    
    if (Array.isArray(selected)) {
      return selected.some(selectedDate => 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth && 
        selectedDate.getFullYear() === currentYear
      );
    }
    
    return selected.getDate() === day && 
           selected.getMonth() === currentMonth && 
           selected.getFullYear() === currentYear;
  };
  
  const isDisabled = (day: number) => {
    if (!disabled) return false;
    return disabled(new Date(currentYear, currentMonth, day));
  };
  
  const isToday = (day: number) => {
    const now = new Date();
    return day === now.getDate() && 
           currentMonth === now.getMonth() && 
           currentYear === now.getFullYear();
  };
  
  const renderDays = () => {
    const days = [];
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    
    // Render days of the week
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`header-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-500">
          {daysOfWeek[i]}
        </div>
      );
    }
    
    // Fill in empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="w-8 h-8" />
      );
    }
    
    // Render calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const disabled = isDisabled(day);
      days.push(
        <button
          key={`day-${day}`}
          type="button"
          onClick={() => !disabled && handleDateClick(day)}
          disabled={disabled}
          className={`w-8 h-8 rounded-md flex items-center justify-center text-sm
            ${isSelected(day) ? 'bg-blue-600 text-white' : ''}
            ${isToday(day) && !isSelected(day) ? 'bg-gray-100' : ''}
            ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}`
          }
        >
          {day}
        </button>
      );
    }
    
    return days;
  };
  
  return (
    <div className={`p-3 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium">
          {format(new Date(currentYear, currentMonth), "MMMM yyyy")}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
};

Calendar.displayName = "Calendar";

export { Calendar };
