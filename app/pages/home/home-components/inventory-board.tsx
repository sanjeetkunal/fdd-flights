"use client";

import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Filter,
  Minus,
  Plus,
  Users,
} from "lucide-react";

import airIndiaLogo from "../../../assets/Airline-Logo/AI.png";
import emiratesLogo from "../../../assets/Airline-Logo/EK.png";
import qatarAirwaysLogo from "../../../assets/Airline-Logo/QR.png";
import singaporeAirlinesLogo from "../../../assets/Airline-Logo/SQ.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

const months = ["All", "Jun 2026", "Jul 2026", "Aug 2026", "Sep 2026", "Oct 2026", "Nov 2026"] as const;

type MonthLabel = (typeof months)[number];

type FareCardItem = {
  airline: string;
  code: string;
  logo: StaticImageData;
  tag: string;
  from: string;
  fromCity: string;
  to: string;
  toCity: string;
  duration: string;
  date: string;
  seats: string;
  price: number;
  month: MonthLabel;
};

const fareCards: FareCardItem[] = [
  {
    airline: "Emirates",
    code: "EK",
    logo: emiratesLogo,
    tag: "Hot",
    from: "DEL",
    fromCity: "Delhi",
    to: "DXB",
    toCity: "Dubai",
    duration: "3H 40M",
    date: "Fri, Jun 12",
    seats: "18 seats left",
    price: 14990,
    month: "Jun 2026",
  },
  {
    airline: "Air India",
    code: "AI",
    logo: airIndiaLogo,
    tag: "Block",
    from: "BOM",
    fromCity: "Mumbai",
    to: "LHR",
    toCity: "London",
    duration: "9H 25M",
    date: "Mon, Jul 15",
    seats: "24 seats left",
    price: 42500,
    month: "Jul 2026",
  },
  {
    airline: "Singapore Airlines",
    code: "SQ",
    logo: singaporeAirlinesLogo,
    tag: "",
    from: "BLR",
    fromCity: "Bengaluru",
    to: "SIN",
    toCity: "Singapore",
    duration: "4H 30M",
    date: "Thu, Aug 18",
    seats: "12 seats left",
    price: 22300,
    month: "Aug 2026",
  },
  {
    airline: "Qatar Airways",
    code: "QR",
    logo: qatarAirwaysLogo,
    tag: "New",
    from: "HYD",
    fromCity: "Hyderabad",
    to: "DOH",
    toCity: "Doha",
    duration: "4H 10M",
    date: "Mon, Sep 22",
    seats: "30 seats left",
    price: 16850,
    month: "Sep 2026",
  },
  {
    airline: "Air India",
    code: "AI",
    logo: airIndiaLogo,
    tag: "",
    from: "DEL",
    fromCity: "Delhi",
    to: "BKK",
    toCity: "Bangkok",
    duration: "4H 15M",
    date: "Sat, Oct 11",
    seats: "16 seats left",
    price: 19500,
    month: "Oct 2026",
  },
  {
    airline: "Emirates",
    code: "EK",
    logo: emiratesLogo,
    tag: "",
    from: "MAA",
    fromCity: "Chennai",
    to: "DXB",
    toCity: "Dubai",
    duration: "4H 20M",
    date: "Wed, Nov 19",
    seats: "22 seats left",
    price: 26750,
    month: "Nov 2026",
  },
];

const minPrice = Math.min(...fareCards.map((card) => card.price));
const maxPrice = Math.max(...fareCards.map((card) => card.price));

function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function getMonthDate(month: MonthLabel) {
  if (month === "All") {
    return new Date(2026, 5, 1);
  }

  const [monthName, year] = month.split(" ");
  return new Date(`${monthName} 1, ${year}`);
}

function getCalendarTitle(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();
}

function getTravelDate(card: FareCardItem) {
  const dayToken = card.date.split(" ").at(-1) ?? "1";
  const day = Number.parseInt(dayToken, 10);
  const monthDate = getMonthDate(card.month);

  return new Date(monthDate.getFullYear(), monthDate.getMonth(), Number.isNaN(day) ? 1 : day);
}

function AirlineBadge({ airline, logo }: { airline: string; logo: StaticImageData }) {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      <Image
        src={logo}
        alt={`${airline} logo`}
        width={40}
        height={40}
        className="h-[78%] w-[78%] object-contain"
      />
    </div>
  );
}

function FareCard({
  airline,
  logo,
  tag,
  from,
  fromCity,
  to,
  toCity,
  duration,
  date,
  seats,
  price,
  onBookNow,
}: FareCardItem & { onBookNow: () => void }) {
  return (
    <article className="rounded-[clamp(1.1rem,1.4vw,1.45rem)] border border-[#d7e2f2] bg-white p-[clamp(0.9rem,1.1vw,1.15rem)] shadow-[0_18px_40px_rgba(62,92,144,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-[clamp(0.55rem,0.7vw,0.7rem)]">
          <AirlineBadge airline={airline} logo={logo} />
          <div className="min-w-0">
            <h3 className="truncate text-[clamp(0.9rem,1vw,1rem)] font-semibold tracking-[-0.03em] text-[#11203f]">
              {airline}
            </h3>
            <p className="mt-0.5 text-[clamp(0.56rem,0.62vw,0.62rem)] uppercase tracking-[0.08em] text-[#6f7d97]">
              Series - Fixed departure
            </p>
          </div>
        </div>

        {tag ? (
          <div
            className={`shrink-0 rounded-full px-[clamp(0.45rem,0.65vw,0.7rem)] py-[0.24rem] text-[clamp(0.52rem,0.58vw,0.6rem)] font-semibold uppercase tracking-[0.08em] ${
              tag === "Hot"
                ? "bg-[#fff0e4] text-[#f06a2e]"
                : tag === "Block"
                  ? "bg-[#ffe4f3] text-[#d83a99]"
                  : "bg-[#e8f2ff] text-[#2484f3]"
            }`}
          >
            {tag}
          </div>
        ) : null}
      </div>

      <div className="mt-[clamp(0.95rem,1.1vw,1.15rem)] grid grid-cols-[1fr_auto_1fr] items-end gap-[clamp(0.45rem,0.65vw,0.7rem)]">
        <div>
          <p className="text-[clamp(1.45rem,1.85vw,1.7rem)] font-semibold tracking-[-0.05em] text-[#0d1e40]">
            {from}
          </p>
          <p className="text-[clamp(0.68rem,0.76vw,0.78rem)] text-[#6f7d97]">{fromCity}</p>
        </div>

        <div className="flex min-w-[clamp(4.8rem,5.6vw,5.8rem)] flex-col items-center">
          <p className="text-[clamp(0.54rem,0.6vw,0.62rem)] font-medium uppercase tracking-[0.08em] text-[#8c97ae]">
            {duration}
          </p>
          <div className="mt-1 flex w-full items-center gap-1.5 text-[#4f63cf]">
            <div className="h-px flex-1 bg-[#d9e4f7]" />
            <span className="text-[0.66rem]">-&gt;</span>
            <div className="h-px flex-1 bg-[#d9e4f7]" />
          </div>
          <p className="mt-1 text-[clamp(0.52rem,0.58vw,0.6rem)] text-[#7b89a4]">Non-stop</p>
        </div>

        <div className="text-right">
          <p className="text-[clamp(1.45rem,1.85vw,1.7rem)] font-semibold tracking-[-0.05em] text-[#0d1e40]">
            {to}
          </p>
          <p className="text-[clamp(0.68rem,0.76vw,0.78rem)] text-[#6f7d97]">{toCity}</p>
        </div>
      </div>

      <div className="mt-[clamp(0.95rem,1.1vw,1.15rem)] border-t border-[#e6edf8] pt-[clamp(0.72rem,0.85vw,0.85rem)]">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5 text-[clamp(0.66rem,0.76vw,0.76rem)] text-[#586781]">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-[#7988a4]" />
              {date}
            </div>
            <div className="flex items-center gap-1.5">
              <CircleDot className="h-3.5 w-3.5 text-[#7988a4]" />
              {seats}
            </div>
          </div>

          <div className="text-right">
            <p className="text-[clamp(0.5rem,0.58vw,0.58rem)] uppercase tracking-[0.08em] text-[#8895af]">
              Net fare / pax
            </p>
            <p className="mt-1 text-[clamp(1.35rem,1.75vw,1.6rem)] font-semibold tracking-[-0.05em] text-[#2b35bc]">
              {formatPrice(price)}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onBookNow}
          className="mt-[clamp(0.8rem,0.95vw,0.95rem)] inline-flex h-[clamp(2.15rem,2.5vw,2.45rem)] w-full cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(90deg,#2f91f1_0%,#e641a4_55%,#ff7b42_100%)] text-[clamp(0.74rem,0.84vw,0.84rem)] font-semibold text-white shadow-[0_14px_24px_rgba(234,72,150,0.18)]"
        >
          Book now
        </button>
      </div>
    </article>
  );
}

export function InventoryBoard() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState<MonthLabel>("All");
  const [selectedView, setSelectedView] = useState<"list" | "table" | "calendar">("list");
  const [priceCap, setPriceCap] = useState(maxPrice);
  const [calendarMonth, setCalendarMonth] = useState<Date>(getMonthDate("Jun 2026"));
  const [selectedFare, setSelectedFare] = useState<FareCardItem | null>(null);
  const [bookingAdults, setBookingAdults] = useState(1);
  const [bookingChildren, setBookingChildren] = useState(0);
  const [bookingInfants, setBookingInfants] = useState(0);

  const filteredCards = useMemo(() => {
    return fareCards.filter(
      (card) => (selectedMonth === "All" || card.month === selectedMonth) && card.price <= priceCap,
    );
  }, [priceCap, selectedMonth]);

  const availableCalendarMonths = useMemo(() => {
    const visibleMonths =
      selectedMonth === "All" ? months.filter((month) => month !== "All") : [selectedMonth];

    return visibleMonths.map((month) => getMonthDate(month));
  }, [selectedMonth]);

  const visibleCalendarMonth = useMemo(() => {
    if (selectedMonth !== "All") {
      return getMonthDate(selectedMonth);
    }

    return (
      availableCalendarMonths.find(
        (month) =>
          month.getMonth() === calendarMonth.getMonth() &&
          month.getFullYear() === calendarMonth.getFullYear(),
      ) ??
      availableCalendarMonths[0] ??
      getMonthDate("Jun 2026")
    );
  }, [availableCalendarMonths, calendarMonth, selectedMonth]);

  const currentCalendarIndex = availableCalendarMonths.findIndex(
    (month) =>
      month.getMonth() === visibleCalendarMonth.getMonth() &&
      month.getFullYear() === visibleCalendarMonth.getFullYear(),
  );

  const calendarGrid = useMemo(() => {
    const monthStart = new Date(
      visibleCalendarMonth.getFullYear(),
      visibleCalendarMonth.getMonth(),
      1,
    );
    const monthEnd = new Date(
      visibleCalendarMonth.getFullYear(),
      visibleCalendarMonth.getMonth() + 1,
      0,
    );
    const firstWeekday = monthStart.getDay();
    const totalCells = Math.ceil((firstWeekday + monthEnd.getDate()) / 7) * 7;

    return Array.from({ length: totalCells }, (_, index) => {
      const dayNumber = index - firstWeekday + 1;
      const inCurrentMonth = dayNumber > 0 && dayNumber <= monthEnd.getDate();

      const cards = inCurrentMonth
        ? filteredCards.filter((card) => {
            const travelDate = getTravelDate(card);

            return (
              travelDate.getDate() === dayNumber &&
              travelDate.getMonth() === visibleCalendarMonth.getMonth() &&
              travelDate.getFullYear() === visibleCalendarMonth.getFullYear()
            );
          })
        : [];

      return {
        key: `${visibleCalendarMonth.getMonth()}-${index}`,
        dayNumber,
        inCurrentMonth,
        cards,
      };
    });
  }, [filteredCards, visibleCalendarMonth]);

  function openBookingModal(card: FareCardItem) {
    setSelectedFare(card);
    setBookingAdults(1);
    setBookingChildren(0);
    setBookingInfants(0);
  }

  function adjustCount(
    type: "adults" | "children" | "infants",
    direction: "increase" | "decrease",
  ) {
    if (type === "adults") {
      const nextAdults =
        direction === "increase" ? Math.min(9, bookingAdults + 1) : Math.max(1, bookingAdults - 1);
      setBookingAdults(nextAdults);
      if (bookingInfants > nextAdults) {
        setBookingInfants(nextAdults);
      }
      return;
    }

    if (type === "children") {
      setBookingChildren((current) =>
        direction === "increase" ? Math.min(6, current + 1) : Math.max(0, current - 1),
      );
      return;
    }

    setBookingInfants((current) =>
      direction === "increase"
        ? Math.min(bookingAdults, current + 1)
        : Math.max(0, current - 1),
    );
  }

  function proceedToBooking() {
    if (!selectedFare) return;

    const params = new URLSearchParams({
      airline: selectedFare.airline,
      code: selectedFare.code,
      from: selectedFare.from,
      to: selectedFare.to,
      date: selectedFare.date,
      price: String(selectedFare.price),
      adults: String(bookingAdults),
      children: String(bookingChildren),
      infants: String(bookingInfants),
    });

    setSelectedFare(null);
    router.push(`/pages/booking?${params.toString()}`);
  }

  return (
    <section className="bg-[#eef4ff] py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <div className="inline-flex w-fit rounded-full bg-[linear-gradient(90deg,#3b82f6_0%,#ec4899_55%,#ff7c40_100%)] px-4 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white">
          Fixed Departures
        </div>

        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-[var(--font-sora)] text-[clamp(2.1rem,3.2vw,3.25rem)] font-semibold tracking-[-0.06em] text-[#091b3b]">
              Guaranteed seats on series &amp; group blocks
            </h2>
            <p className="mt-3 max-w-3xl text-[1.04rem] leading-7 text-[#667691]">
              Pre-purchased inventory at net rates. Pick a month, set your budget, and lock the
              seats instantly.
            </p>
          </div>

          <div className="inline-flex w-fit items-center rounded-full border border-[#d5def1] bg-white p-1 shadow-[0_10px_24px_rgba(38,65,110,0.06)]">
            <button
              type="button"
              onClick={() => setSelectedView("list")}
              className={`rounded-full px-5 py-1 text-xs font-semibold ${
                selectedView === "list" ? "bg-[#3732b8] text-white" : "text-[#6f7d97]"
              } cursor-pointer`}
            >
              List View
            </button>
            <button
              type="button"
              onClick={() => setSelectedView("table")}
              className={`rounded-full px-5 py-1 text-xs font-medium ${
                selectedView === "table" ? "bg-[#3732b8] text-white" : "text-[#6f7d97]"
              } cursor-pointer`}
            >
              Table View
            </button>
            <button
              type="button"
              onClick={() => setSelectedView("calendar")}
              className={`rounded-full px-5 py-1 text-xs font-medium ${
                selectedView === "calendar" ? "bg-[#3732b8] text-white" : "text-[#6f7d97]"
              } cursor-pointer`}
            >
              Calendar View
            </button>
          </div>
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-[#d7e2f2] bg-white px-4 py-4 shadow-[0_18px_40px_rgba(62,92,144,0.06)] sm:px-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold text-[#15264a]">
                <Filter className="h-4 w-4" />
                Filters
              </div>
              {months.map((month) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => setSelectedMonth(month)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    selectedMonth === month
                      ? "bg-[linear-gradient(90deg,#3b82f6_0%,#ec4899_55%,#ff7c40_100%)] text-white"
                      : "bg-[#eef2f9] text-[#60718e]"
                  } cursor-pointer`}
                >
                  {month}
                </button>
              ))}
            </div>

            <div className="min-w-[15rem] lg:min-w-[18rem]">
              <div className="flex items-center justify-between text-sm font-medium text-[#25365d]">
                <span>Max price</span>
                <span>{formatPrice(priceCap)}</span>
              </div>
              <div className="relative mt-3">
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step={500}
                  value={priceCap}
                  onChange={(event) => setPriceCap(Number(event.target.value))}
                  className="absolute inset-0 z-20 h-4 w-full cursor-pointer appearance-none bg-transparent opacity-0"
                />
                <div className="relative h-2 rounded-full bg-[#e8ecf6]">
                  <div
                    className="absolute left-0 top-0 h-2 rounded-full bg-[linear-gradient(90deg,#ec3da6_0%,#f41989_40%,#ff5e75_100%)]"
                    style={{ width: `${((priceCap - minPrice) / (maxPrice - minPrice)) * 100}%` }}
                  />
                  <span
                    className="absolute top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#ff4c80] shadow-[0_6px_18px_rgba(255,82,134,0.22)]"
                    style={{ left: `${((priceCap - minPrice) / (maxPrice - minPrice)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredCards.length > 0 ? (
          selectedView === "list" ? (
            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {filteredCards.map((card) => (
                <FareCard
                  key={`${card.airline}-${card.from}-${card.to}-${card.month}`}
                  {...card}
                  onBookNow={() => openBookingModal(card)}
                />
              ))}
            </div>
          ) : selectedView === "calendar" ? (
            <div className="mt-7 overflow-hidden rounded-[1.75rem] border border-[#d7e2f2] bg-white shadow-[0_24px_50px_rgba(62,92,144,0.08)]">
              <div className="bg-[linear-gradient(90deg,#2f91f1_0%,#e641a4_52%,#ff7b42_100%)] px-5 py-4 text-white sm:px-6">
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentCalendarIndex > 0) {
                        setCalendarMonth(availableCalendarMonths[currentCalendarIndex - 1]);
                      }
                    }}
                    disabled={selectedMonth !== "All" || currentCalendarIndex <= 0}
                    className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/15 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="text-center">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/80">
                      Agent inventory calendar
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-[0.18em]">
                      {getCalendarTitle(visibleCalendarMonth)}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (currentCalendarIndex < availableCalendarMonths.length - 1) {
                        setCalendarMonth(availableCalendarMonths[currentCalendarIndex + 1]);
                      }
                    }}
                    disabled={
                      selectedMonth !== "All" ||
                      currentCalendarIndex === -1 ||
                      currentCalendarIndex >= availableCalendarMonths.length - 1
                    }
                    className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/15 transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-white/85">
                  <span className="rounded-full bg-white/14 px-3 py-1">
                    {filteredCards.length} live departures
                  </span>
                  <span className="rounded-full bg-white/14 px-3 py-1">
                    Day-wise fare snapshot
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-7 border-b border-[#dbe4f3] bg-[#f8fbff]">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="px-3 py-3 text-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#6b7b97]"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {calendarGrid.map((cell) => (
                  <div
                    key={cell.key}
                    className={`min-h-[10rem] border-b border-r border-[#dbe4f3] p-2.5 sm:min-h-[11rem] sm:p-3 ${
                      cell.inCurrentMonth ? "bg-white" : "bg-[#fbfcff]"
                    }`}
                  >
                    {cell.inCurrentMonth ? (
                      <>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-[#0e1c40]">{cell.dayNumber}</span>
                          {cell.cards.length > 0 ? (
                            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#eef1ff] px-1.5 text-[0.64rem] font-semibold text-[#4c46c7]">
                              {cell.cards.length}
                            </span>
                          ) : null}
                        </div>

                        <div className="mt-2 space-y-2">
                          {cell.cards.slice(0, 2).map((card) => (
                            <button
                              key={`${card.airline}-${card.from}-${card.to}-${card.date}-calendar`}
                              type="button"
                              onClick={() => openBookingModal(card)}
                              className="w-full cursor-pointer rounded-2xl border border-[#e8eef8] bg-[#fbfdff] p-2.5 text-left transition hover:border-[#cad7ee] hover:shadow-[0_10px_22px_rgba(62,92,144,0.10)]"
                            >
                              <div className="flex items-center gap-2">
                                <div className="rounded-full bg-[linear-gradient(90deg,#2f91f1_0%,#e641a4_55%,#ff7b42_100%)] px-2.5 py-1 text-[0.66rem] font-semibold text-white">
                                  from {formatPrice(card.price)}
                                </div>
                                {card.tag ? (
                                  <span className="rounded-full bg-[#eef1ff] px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-[#4c46c7]">
                                    {card.tag}
                                  </span>
                                ) : null}
                              </div>
                              <p className="mt-2 text-[0.75rem] font-semibold text-[#15264a]">
                                {card.from} → {card.to}
                              </p>
                              <p className="mt-1 text-[0.68rem] text-[#6f7d97]">
                                {card.airline} · {card.seats}
                              </p>
                            </button>
                          ))}

                          {cell.cards.length > 2 ? (
                            <div className="rounded-xl border border-dashed border-[#d2dcf0] px-2.5 py-2 text-[0.7rem] font-medium text-[#60718e]">
                              +{cell.cards.length - 2} more departures
                            </div>
                          ) : null}
                        </div>
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-7 overflow-hidden rounded-[1.5rem] border border-[#d7e2f2] bg-white shadow-[0_18px_40px_rgba(62,92,144,0.06)]">
              <div className="grid grid-cols-[1.4fr_1fr_1fr_0.9fr_0.85fr_0.7fr] gap-4 border-b border-[#e6edf8] bg-[#f7faff] px-5 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-[#6f7d97]">
                <span>Airline</span>
                <span>Route</span>
                <span>Travel date</span>
                <span>Duration</span>
                <span>Seats</span>
                <span className="text-right">Fare</span>
              </div>
              <div className="divide-y divide-[#e6edf8]">
                {filteredCards.map((card) => (
                  <div
                    key={`${card.airline}-${card.from}-${card.to}-${card.month}-table`}
                    className="grid grid-cols-[1.4fr_1fr_1fr_0.9fr_0.85fr_0.7fr] gap-4 px-5 py-4 text-sm text-[#11203f]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <AirlineBadge airline={card.airline} logo={card.logo} />
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{card.airline}</p>
                        <p className="text-[0.74rem] uppercase tracking-[0.08em] text-[#6f7d97]">
                          {card.tag || "Series"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">
                        {card.from} - {card.to}
                      </p>
                      <p className="text-[0.8rem] text-[#6f7d97]">
                        {card.fromCity} to {card.toCity}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">{card.date}</p>
                      <p className="text-[0.8rem] text-[#6f7d97]">{card.month}</p>
                    </div>
                    <div>
                      <p className="font-semibold">{card.duration}</p>
                      <p className="text-[0.8rem] text-[#6f7d97]">Non-stop</p>
                    </div>
                    <div>
                      <p className="font-semibold">{card.seats}</p>
                      <p className="text-[0.8rem] text-[#6f7d97]">Instant block</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#2b35bc]">{formatPrice(card.price)}</p>
                      <button
                        type="button"
                        onClick={() => openBookingModal(card)}
                        className="mt-2 inline-flex cursor-pointer rounded-full bg-[linear-gradient(90deg,#2f91f1_0%,#e641a4_55%,#ff7b42_100%)] px-3 py-1.5 text-[0.78rem] font-semibold text-white"
                      >
                        Book now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : null}

        {filteredCards.length === 0 ? (
          <div className="mt-7 rounded-[1.5rem] border border-dashed border-[#cdd8eb] bg-white p-8 text-center shadow-[0_18px_40px_rgba(62,92,144,0.04)]">
            <p className="text-lg font-semibold text-[#11203f]">No matching departures found</p>
            <p className="mt-2 text-sm text-[#60718e]">
              Try another month or increase the max price filter.
            </p>
          </div>
        ) : null}

        <Dialog open={Boolean(selectedFare)} onOpenChange={(open) => !open && setSelectedFare(null)}>
          <DialogContent className="max-w-md rounded-[1.6rem] border border-[#d9e4f2] p-0 shadow-[0_28px_70px_rgba(29,52,94,0.22)]">
            {selectedFare ? (
              <div className="overflow-hidden rounded-[1.6rem] bg-white">
                <div className="bg-[linear-gradient(90deg,#2f91f1_0%,#e641a4_55%,#ff7b42_100%)] px-6 py-5 text-white">
                  <DialogHeader className="space-y-2 text-left">
                    <DialogTitle className="text-xl font-semibold tracking-tight">
                      Book {selectedFare.from} to {selectedFare.to}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-white/85">
                      Select passengers for {selectedFare.airline} and proceed to the booking page.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/12 px-4 py-3 backdrop-blur-sm">
                    <div>
                      <p className="text-sm font-semibold">{selectedFare.airline}</p>
                      <p className="text-xs text-white/75">
                        {selectedFare.date} · {selectedFare.duration} · {selectedFare.seats}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.68rem] uppercase tracking-[0.12em] text-white/70">
                        Net fare / pax
                      </p>
                      <p className="text-lg font-semibold">{formatPrice(selectedFare.price)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 px-6 py-5">
                  <div className="rounded-2xl border border-[#e6edf8] bg-[#f8fbff] px-4 py-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#142546]">
                      <Users className="h-4 w-4 text-[#4c46c7]" />
                      Passenger selection
                    </div>
                    <p className="mt-1 text-xs text-[#60718e]">
                      Choose the traveller mix before continuing to booking.
                    </p>
                  </div>

                  {[
                    {
                      label: "Adults",
                      hint: "12+ years",
                      value: bookingAdults,
                      canDecrease: bookingAdults > 1,
                      canIncrease: bookingAdults < 9,
                      type: "adults" as const,
                    },
                    {
                      label: "Children",
                      hint: "2-11 years",
                      value: bookingChildren,
                      canDecrease: bookingChildren > 0,
                      canIncrease: bookingChildren < 6,
                      type: "children" as const,
                    },
                    {
                      label: "Infants",
                      hint: "Under 2 years",
                      value: bookingInfants,
                      canDecrease: bookingInfants > 0,
                      canIncrease: bookingInfants < bookingAdults,
                      type: "infants" as const,
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-2xl border border-[#e6edf8] px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#11203f]">{row.label}</p>
                        <p className="text-xs text-[#6f7d97]">{row.hint}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => adjustCount(row.type, "decrease")}
                          disabled={!row.canDecrease}
                          className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[#d7e2f2] text-[#31456d] transition hover:border-[#4c46c7] hover:text-[#4c46c7] disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold text-[#11203f]">
                          {row.value}
                        </span>
                        <button
                          type="button"
                          onClick={() => adjustCount(row.type, "increase")}
                          disabled={!row.canIncrease}
                          className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-[#d7e2f2] text-[#31456d] transition hover:border-[#4c46c7] hover:text-[#4c46c7] disabled:cursor-not-allowed disabled:opacity-35"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <DialogFooter className="pt-2 sm:justify-between sm:space-x-0">
                    <button
                      type="button"
                      onClick={() => setSelectedFare(null)}
                      className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full border border-[#d7e2f2] px-5 text-sm font-semibold text-[#31456d] transition hover:bg-[#f7faff]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={proceedToBooking}
                      className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-[linear-gradient(90deg,#2f91f1_0%,#e641a4_55%,#ff7b42_100%)] px-6 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(234,72,150,0.18)]"
                    >
                      Proceed to booking
                    </button>
                  </DialogFooter>
                </div>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
