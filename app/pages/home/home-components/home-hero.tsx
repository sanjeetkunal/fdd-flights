"use client";

import { useId, useState } from "react";
import Image from "next/image";
import {
  ArrowLeftRight,
  CalendarDays,
  Check,
  ChevronsUpDown,
  Minus,
  Plus,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
  Waves,
} from "lucide-react";

import { Calendar } from "../../../components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { cn } from "../../../lib/utils";

const tripModes = ["One way", "Round trip"];
const cabinClasses = ["Economy", "Premium", "Business", "First"] as const;

const airports = [
  { code: "DEL", city: "Delhi", name: "Indira Gandhi International" },
  { code: "DXB", city: "Dubai", name: "Dubai International" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj" },
  { code: "SIN", city: "Singapore", name: "Singapore Changi" },
  { code: "LHR", city: "London", name: "Heathrow" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International" },
  { code: "HYD", city: "Hyderabad", name: "Rajiv Gandhi International" },
  { code: "DOH", city: "Doha", name: "Hamad International" },
];

const quickStats = [
  { icon: Globe2Icon, value: "180+", label: "Destinations" },
  { icon: Waves, value: "Net", label: "Agent fares" },
  { icon: ShieldCheck, value: "24/7", label: "Ops support" },
  { icon: WalletCards, value: "0%", label: "Markup on series" },
];

function Globe2Icon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14.5 14.5 0 0 1 0 18" />
      <path d="M12 3a14.5 14.5 0 0 0 0 18" />
    </svg>
  );
}

type Airport = (typeof airports)[number];
type CabinClass = (typeof cabinClasses)[number];

function formatTravelDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function AirportCombobox({
  label,
  value,
  onChange,
}: {
  label: string;
  value: Airport;
  onChange: (airport: Airport) => void;
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-controls={listId}
          aria-expanded={open}
          aria-haspopup="listbox"
          className="flex min-h-[4.75rem] w-full cursor-pointer flex-col justify-center rounded-xl border border-input bg-background px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <span className="text-primary">
              <MapPin className="h-4 w-4" />
            </span>
            {label}
          </div>
          <div className="mt-1 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-foreground">{value.code}</p>
              <p className="truncate text-[11px] text-muted-foreground">
                {value.city} · {value.name}
              </p>
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 text-foreground/70" />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()} airport`} />
          <CommandList id={listId}>
            <CommandEmpty>No airport found.</CommandEmpty>
            <CommandGroup>
              {airports.map((airport) => (
                <CommandItem
                  key={airport.code}
                  value={`${airport.code} ${airport.city} ${airport.name}`}
                  keywords={[airport.code, airport.city, airport.name]}
                  onSelect={() => {
                    onChange(airport);
                    setOpen(false);
                  }}
                  className="cursor-pointer gap-3 px-3 py-2.5"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {airport.code}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {airport.city}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{airport.name}</p>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 text-primary transition-opacity",
                      value.code === airport.code ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function DateField({
  label,
  value,
  onChange,
  minDate,
}: {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
}) {
  const [open, setOpen] = useState(false);
  const calendarId = useId();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-controls={calendarId}
          aria-expanded={open}
          aria-haspopup="dialog"
          className="flex min-h-[4.75rem] w-full cursor-pointer flex-col justify-center rounded-xl border border-input bg-background px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <span className="text-primary">
              <CalendarDays className="h-4 w-4" />
            </span>
            {label}
          </div>
          <div className="mt-1 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-foreground">
                {formatTravelDate(value)}
              </p>
              <p className="text-[11px] text-transparent">placeholder</p>
            </div>
            <CalendarDays className="h-4 w-4 shrink-0 text-foreground" />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent id={calendarId} className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (!date) return;
            onChange(date);
            setOpen(false);
          }}
          captionLayout="dropdown"
          disabled={(date) => {
            if (date.getFullYear() < 2026 || date.getFullYear() > 2028) return true;
            if (minDate) {
              const floorMinDate = new Date(minDate);
              floorMinDate.setHours(0, 0, 0, 0);
              return date < floorMinDate;
            }
            return false;
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function PaxClassField({
  adults,
  childCount,
  infants,
  cabinClass,
  onAdultsChange,
  onChildCountChange,
  onInfantsChange,
  onCabinClassChange,
}: {
  adults: number;
  childCount: number;
  infants: number;
  cabinClass: CabinClass;
  onAdultsChange: (value: number) => void;
  onChildCountChange: (value: number) => void;
  onInfantsChange: (value: number) => void;
  onCabinClassChange: (value: CabinClass) => void;
}) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  const totalPax = adults + childCount + infants;
  const summary = `${totalPax} Traveller${totalPax > 1 ? "s" : ""}`;
  const detail = `${adults} Adult${adults > 1 ? "s" : ""}, ${childCount} Child${
    childCount !== 1 ? "ren" : ""
  }, ${infants} Infant${infants !== 1 ? "s" : ""}`;

  const countRows = [
    {
      label: "Adults",
      hint: "12+ years",
      value: adults,
      min: 1,
      max: 9,
      onChange: onAdultsChange,
    },
    {
      label: "Children",
      hint: "2-11 years",
      value: childCount,
      min: 0,
      max: 6,
      onChange: onChildCountChange,
    },
    {
      label: "Infants",
      hint: "Under 2 years",
      value: infants,
      min: 0,
      max: adults,
      onChange: onInfantsChange,
    },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-controls={contentId}
          aria-expanded={open}
          aria-haspopup="dialog"
          className="flex min-h-[4.75rem] w-full cursor-pointer flex-col justify-center rounded-xl border border-input bg-background px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <span className="text-primary">
              <Users className="h-4 w-4" />
            </span>
            
          </div>
          <div className="mt-1 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-foreground">{summary}</p>
              <p className="truncate text-[11px] text-muted-foreground">
                {detail} · {cabinClass}
              </p>
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 text-foreground/70" />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent id={contentId} className="w-[320px] p-4" align="end">
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">Travellers</h3>
            <p className="text-xs text-muted-foreground">
              Manage passenger mix and travel cabin from one place.
            </p>
          </div>

          <div className="space-y-3">
            {countRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{row.label}</p>
                  <p className="text-xs text-muted-foreground">{row.hint}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => row.onChange(Math.max(row.min, row.value - 1))}
                    disabled={row.value <= row.min}
                    className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-slate-200 text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-foreground">
                    {row.value}
                  </span>
                  <button
                    type="button"
                    onClick={() => row.onChange(Math.min(row.max, row.value + 1))}
                    disabled={row.value >= row.max}
                    className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-slate-200 text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Cabin class</h4>
            <div className="flex flex-wrap gap-2">
              {cabinClasses.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => onCabinClassChange(item)}
                  className={cn(
                    "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                    cabinClass === item
                      ? "border-transparent bg-primary text-primary-foreground"
                      : "border-input text-muted-foreground hover:bg-muted",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function HomeHero() {
  const [fromAirport, setFromAirport] = useState<Airport>(airports[0]);
  const [toAirport, setToAirport] = useState<Airport>(airports[1]);
  const [departDate, setDepartDate] = useState(new Date(2026, 5, 15));
  const [returnDate, setReturnDate] = useState(new Date(2026, 5, 22));
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState<CabinClass>("Economy");

  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/hero-bg-g9gSlJcK.jpg"
        alt="Airplane wing over clouds during sunset"
        fill
        priority
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.18 0.06 260 / 0.75), oklch(0.18 0.06 260 / 0.92))",
        }}
      />
      <div
        className="absolute -left-20 -top-32 z-[1] h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--magenta)" }}
      />
      <div
        className="absolute -bottom-20 right-0 z-[1] h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--sunset)" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 pb-14 pt-16 text-white sm:px-6 sm:pt-20 lg:px-8 lg:pb-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md ring-1 ring-white/25">
            <Sparkles className="h-3.5 w-3.5" />
            Live fares · Guaranteed group inventory
          </span>

          <h1 className="mt-4 max-w-4xl font-[var(--font-sora)] text-4xl font-semibold tracking-tight md:text-5xl">
            Search the sky. Lock the seats. Beat the rate.
          </h1>
          <p className="mt-3 max-w-2xl text-white/85">
            One portal for live fares, fixed-departure series and block bookings — built
            exclusively for travel agents.
          </p>
        </div>

        <div
          className="relative mt-8 rounded-3xl border border-white/20 bg-white p-5 pb-18 text-foreground backdrop-blur-xl sm:p-6 sm:pb-20"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex flex-wrap items-center gap-2">
            {tripModes.map((mode, index) => (
              <button
                key={mode}
                type="button"
                className={cn(
                  "cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition",
                  index === 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70",
                )}
              >
                {mode}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              IATA verified · Net rates
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-12">
            <div className="relative md:col-span-6">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:gap-3">
                <AirportCombobox label="From" value={fromAirport} onChange={setFromAirport} />
                <AirportCombobox label="To" value={toAirport} onChange={setToAirport} />
              </div>

              <button
                type="button"
                aria-label="Swap airports"
                onClick={() => {
                  setFromAirport(toAirport);
                  setToAirport(fromAirport);
                }}
                className="absolute left-1/2 top-1/2 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-slate-200 bg-white text-foreground shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition hover:scale-105 hover:text-primary md:grid"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>

            <div className="md:col-span-2">
              <DateField
                label="Depart"
                value={departDate}
                onChange={(date) => {
                  setDepartDate(date);
                  if (returnDate < date) {
                    setReturnDate(date);
                  }
                }}
              />
            </div>

            <div className="md:col-span-2">
              <DateField
                label="Return"
                value={returnDate}
                onChange={setReturnDate}
                minDate={departDate}
              />
            </div>

            <div className="md:col-span-2">
              <PaxClassField
                adults={adults}
                childCount={children}
                infants={infants}
                cabinClass={cabinClass}
                onAdultsChange={(value) => {
                  setAdults(value);
                  if (infants > value) {
                    setInfants(value);
                  }
                }}
                onChildCountChange={setChildren}
                onInfantsChange={setInfants}
                onCabinClassChange={setCabinClass}
              />
            </div>
          </div>

          <button
            type="button"
            className="group absolute left-1/2 top-full inline-flex h-13 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center gap-2 rounded-2xl px-8 text-sm font-semibold text-white transition active:scale-[0.98]"
            style={{
              background: "var(--gradient-brand)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            <Search className="h-4 w-4" />
            Search flights
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 text-white/85 sm:grid-cols-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 ring-1 ring-white/15 backdrop-blur-md"
              >
                <Icon className="h-5 w-5" />
                <div>
                  <div className="text-sm font-semibold">{stat.value}</div>
                  <div className="text-[11px] uppercase tracking-wider opacity-80">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
