"use client";

import { useId, useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";

type PassengerType = "Adult" | "Child" | "Infant";

function floorDate(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function shiftYears(date: Date, years: number) {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + years);
  return floorDate(next);
}

function formatLabel(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDateBounds(passengerType: PassengerType) {
  const today = floorDate(new Date());

  if (passengerType === "Infant") {
    return {
      minDate: shiftYears(today, -2),
      maxDate: today,
    };
  }

  if (passengerType === "Child") {
    return {
      minDate: shiftYears(today, -12),
      maxDate: shiftYears(today, -2),
    };
  }

  return {
    minDate: shiftYears(today, -100),
    maxDate: shiftYears(today, -12),
  };
}

export function DobPickerField({
  label,
  name,
  passengerType,
  placeholder = "Select DOB",
}: {
  label: string;
  name: string;
  passengerType: PassengerType;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Date>();
  const calendarId = useId();
  const { minDate, maxDate } = useMemo(() => getDateBounds(passengerType), [passengerType]);

  return (
    <label className="space-y-2">
      <span className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
        {label}
      </span>
      <input name={name} type="hidden" value={value ? formatValue(value) : ""} readOnly />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            role="combobox"
            aria-controls={calendarId}
            aria-expanded={open}
            aria-haspopup="dialog"
            className="flex h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] px-4 text-left text-sm text-[#11203f] outline-none transition focus-visible:border-[#4c46c7] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#4c46c7]/20"
          >
            <span className={value ? "text-[#11203f]" : "text-[#94a3b8]"}>
              {value ? formatLabel(value) : placeholder}
            </span>
            <CalendarDays className="h-4 w-4 shrink-0 text-[#64748b]" />
          </button>
        </PopoverTrigger>

        <PopoverContent id={calendarId} className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              if (!date) return;
              setValue(floorDate(date));
              setOpen(false);
            }}
            captionLayout="dropdown"
            startMonth={new Date(minDate.getFullYear(), minDate.getMonth(), 1)}
            endMonth={new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)}
            disabled={(date) => date < minDate || date > maxDate}
          />
        </PopoverContent>
      </Popover>
    </label>
  );
}
