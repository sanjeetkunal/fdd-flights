"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Download,
  Filter,
  MapPin,
  Plane,
  RotateCcw,
  Search,
  Ticket,
  Users,
  XCircle,
} from "lucide-react";

import { DashboardSidebar } from "./dashboard-sidebar";

type BookingStatus = "Confirmed" | "Ticketing" | "Pending" | "Cancelled";
type BookingType = "Fixed Departure" | "Series Block" | "Group Request";

type Booking = {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  bookingDate: string;
  passengers: number;
  amount: number;
  status: BookingStatus;
  type: BookingType;
};

const bookings: Booking[] = [
  {
    id: "FDD-240615-128",
    airline: "Emirates",
    flightNumber: "EK 511",
    origin: "DEL",
    destination: "DXB",
    departureDate: "2026-06-18",
    departureTime: "11:00",
    bookingDate: "2026-06-10",
    passengers: 2,
    amount: 42850,
    status: "Confirmed",
    type: "Fixed Departure",
  },
  {
    id: "FDD-240612-096",
    airline: "Air India",
    flightNumber: "AI 131",
    origin: "BOM",
    destination: "LHR",
    departureDate: "2026-06-24",
    departureTime: "14:35",
    bookingDate: "2026-06-08",
    passengers: 4,
    amount: 184600,
    status: "Ticketing",
    type: "Series Block",
  },
  {
    id: "FDD-240608-074",
    airline: "Singapore Airlines",
    flightNumber: "SQ 403",
    origin: "DEL",
    destination: "SIN",
    departureDate: "2026-07-02",
    departureTime: "21:55",
    bookingDate: "2026-06-05",
    passengers: 3,
    amount: 112400,
    status: "Pending",
    type: "Group Request",
  },
  {
    id: "FDD-240602-051",
    airline: "Qatar Airways",
    flightNumber: "QR 571",
    origin: "DEL",
    destination: "DOH",
    departureDate: "2026-06-28",
    departureTime: "09:20",
    bookingDate: "2026-06-02",
    passengers: 1,
    amount: 38750,
    status: "Confirmed",
    type: "Fixed Departure",
  },
  {
    id: "FDD-240529-042",
    airline: "IndiGo",
    flightNumber: "6E 1405",
    origin: "BLR",
    destination: "DXB",
    departureDate: "2026-06-15",
    departureTime: "07:10",
    bookingDate: "2026-05-29",
    passengers: 5,
    amount: 96250,
    status: "Cancelled",
    type: "Series Block",
  },
  {
    id: "FDD-240526-037",
    airline: "Thai Airways",
    flightNumber: "TG 316",
    origin: "DEL",
    destination: "BKK",
    departureDate: "2026-07-12",
    departureTime: "00:20",
    bookingDate: "2026-05-26",
    passengers: 2,
    amount: 58400,
    status: "Confirmed",
    type: "Fixed Departure",
  },
  {
    id: "FDD-240519-019",
    airline: "Etihad Airways",
    flightNumber: "EY 205",
    origin: "BOM",
    destination: "AUH",
    departureDate: "2026-07-20",
    departureTime: "04:30",
    bookingDate: "2026-05-19",
    passengers: 7,
    amount: 247800,
    status: "Ticketing",
    type: "Group Request",
  },
];

const statusStyles: Record<BookingStatus, string> = {
  Confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Ticketing: "bg-blue-50 text-blue-700 ring-blue-200",
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
};

function formatAmount(value: number) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export function MyBookingsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [bookingType, setBookingType] = useState("All");
  const [route, setRoute] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const routeOptions = useMemo(
    () => Array.from(new Set(bookings.map((booking) => `${booking.origin}-${booking.destination}`))),
    [],
  );

  const filteredBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          booking.id,
          booking.airline,
          booking.flightNumber,
          booking.origin,
          booking.destination,
        ].some((value) => value.toLowerCase().includes(normalizedQuery));
      const matchesStatus = status === "All" || booking.status === status;
      const matchesType = bookingType === "All" || booking.type === bookingType;
      const matchesRoute =
        route === "All" || `${booking.origin}-${booking.destination}` === route;
      const matchesStartDate = !dateFrom || booking.departureDate >= dateFrom;
      const matchesEndDate = !dateTo || booking.departureDate <= dateTo;

      return (
        matchesQuery &&
        matchesStatus &&
        matchesType &&
        matchesRoute &&
        matchesStartDate &&
        matchesEndDate
      );
    });
  }, [bookingType, dateFrom, dateTo, query, route, status]);

  const hasActiveFilters =
    query !== "" ||
    status !== "All" ||
    bookingType !== "All" ||
    route !== "All" ||
    dateFrom !== "" ||
    dateTo !== "";

  function resetFilters() {
    setQuery("");
    setStatus("All");
    setBookingType("All");
    setRoute("All");
    setDateFrom("");
    setDateTo("");
  }

  return (
    <main className="min-h-screen bg-[#eef4ff] px-3 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto flex w-full max-w-[1440px] gap-4">
        <DashboardSidebar />

        <section className="min-w-0 flex-1 space-y-4">
          <header className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#29114e_0%,#5d2b91_55%,#7c3aed_100%)] p-6 text-white shadow-[0_18px_45px_rgba(76,29,149,0.2)] sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
                  <Ticket className="h-4 w-4" />
                  Booking workspace
                </div>
                <h1 className="mt-4 font-[var(--font-sora)] text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  My Bookings
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                  Track every agency booking, ticketing update, payment value, and upcoming
                  departure from one place.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-[#5b21b6] shadow-sm hover:bg-[#f8f5ff]"
              >
                <Plane className="h-4 w-4" />
                Create new booking
              </Link>
            </div>
          </header>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total bookings",
                value: bookings.length,
                icon: Ticket,
                color: "bg-[#f1edff] text-[#6d28d9]",
              },
              {
                label: "Confirmed",
                value: bookings.filter((booking) => booking.status === "Confirmed").length,
                icon: CheckCircle2,
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                label: "Awaiting action",
                value: bookings.filter(
                  (booking) => booking.status === "Pending" || booking.status === "Ticketing",
                ).length,
                icon: Clock3,
                color: "bg-amber-50 text-amber-600",
              },
              {
                label: "Booking value",
                value: formatAmount(bookings.reduce((total, booking) => total + booking.amount, 0)),
                icon: CircleDollarSign,
                color: "bg-blue-50 text-blue-600",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className="rounded-2xl border border-[#d8e2f2] bg-white p-4 shadow-[0_12px_30px_rgba(62,92,144,0.07)]"
                >
                  <div className="flex items-center gap-3">
                    <div className={`grid h-11 w-11 place-items-center rounded-2xl ${item.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a89a4]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-xl font-semibold tracking-[-0.03em] text-[#101a34]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <section className="rounded-3xl border border-[#d8e2f2] bg-white p-4 shadow-[0_14px_36px_rgba(62,92,144,0.07)] sm:p-5">
            <div className="flex flex-col gap-4 border-b border-[#e7edf7] pb-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-[#101a34]">
                  <Filter className="h-5 w-5 text-[#6d28d9]" />
                  Filter bookings
                </h2>
                <p className="mt-1 text-sm text-[#697894]">
                  Search by booking ID, airline, flight number, or route.
                </p>
              </div>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#dbe4f3] px-4 text-sm font-semibold text-[#52627e] hover:bg-[#f8fbff]"
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear filters
                </button>
              ) : null}
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-[1.5fr_repeat(3,0.8fr)]">
              <label className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8491a8]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search booking, airline, route..."
                  className="h-12 w-full rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] pl-11 pr-4 text-sm text-[#101a34] outline-none placeholder:text-[#94a3b8] focus:border-[#7c3aed] focus:bg-white"
                />
              </label>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-12 rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] px-4 text-sm text-[#31456d] outline-none focus:border-[#7c3aed] focus:bg-white"
              >
                <option value="All">All statuses</option>
                {["Confirmed", "Ticketing", "Pending", "Cancelled"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                value={bookingType}
                onChange={(event) => setBookingType(event.target.value)}
                className="h-12 rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] px-4 text-sm text-[#31456d] outline-none focus:border-[#7c3aed] focus:bg-white"
              >
                <option value="All">All booking types</option>
                {["Fixed Departure", "Series Block", "Group Request"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                value={route}
                onChange={(event) => setRoute(event.target.value)}
                className="h-12 rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] px-4 text-sm text-[#31456d] outline-none focus:border-[#7c3aed] focus:bg-white"
              >
                <option value="All">All routes</option>
                {routeOptions.map((item) => (
                  <option key={item} value={item}>
                    {item.replace("-", " to ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:max-w-xl">
              <label>
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#7a89a4]">
                  Travel from
                </span>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(event) => setDateFrom(event.target.value)}
                  className="h-11 w-full rounded-xl border border-[#d7e2f2] bg-[#f8fbff] px-3 text-sm text-[#31456d] outline-none focus:border-[#7c3aed] focus:bg-white"
                />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#7a89a4]">
                  Travel to
                </span>
                <input
                  type="date"
                  value={dateTo}
                  min={dateFrom || undefined}
                  onChange={(event) => setDateTo(event.target.value)}
                  className="h-11 w-full rounded-xl border border-[#d7e2f2] bg-[#f8fbff] px-3 text-sm text-[#31456d] outline-none focus:border-[#7c3aed] focus:bg-white"
                />
              </label>
            </div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-[#d8e2f2] bg-white shadow-[0_14px_36px_rgba(62,92,144,0.07)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e7edf7] px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-[#101a34]">Booking records</h2>
                <p className="mt-1 text-sm text-[#697894]">
                  Showing {filteredBookings.length} of {bookings.length} bookings
                </p>
              </div>
              <div className="rounded-full bg-[#f1edff] px-3 py-1.5 text-xs font-semibold text-[#6d28d9]">
                Latest first
              </div>
            </div>

            {filteredBookings.length > 0 ? (
              <div className="divide-y divide-[#e9eef7]">
                {filteredBookings.map((booking) => (
                  <article
                    key={booking.id}
                    className="grid gap-4 px-5 py-5 transition hover:bg-[#fbfcff] xl:grid-cols-[1.25fr_1fr_1fr_0.8fr_auto] xl:items-center"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#f1edff] font-semibold text-[#6d28d9]">
                        {booking.airline
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#101a34]">{booking.airline}</p>
                        <p className="mt-1 text-sm text-[#697894]">
                          {booking.flightNumber} | {booking.id}
                        </p>
                        <span className="mt-2 inline-flex rounded-full bg-[#f4f6fb] px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-[#667590]">
                          {booking.type}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 font-semibold text-[#101a34]">
                        <span>{booking.origin}</span>
                        <span className="h-px w-7 bg-[#b9c6da]" />
                        <Plane className="h-4 w-4 text-[#6d28d9]" />
                        <span className="h-px w-7 bg-[#b9c6da]" />
                        <span>{booking.destination}</span>
                      </div>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-[#697894]">
                        <CalendarDays className="h-4 w-4" />
                        {formatDate(booking.departureDate)}, {booking.departureTime}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 xl:block">
                      <div>
                        <p className="text-xs uppercase tracking-[0.1em] text-[#8a96aa]">Passengers</p>
                        <p className="mt-1 flex items-center gap-1.5 font-semibold text-[#101a34]">
                          <Users className="h-4 w-4 text-[#6d28d9]" />
                          {booking.passengers} travellers
                        </p>
                      </div>
                      <div className="xl:mt-3">
                        <p className="text-xs uppercase tracking-[0.1em] text-[#8a96aa]">Amount</p>
                        <p className="mt-1 font-semibold text-[#101a34]">
                          {formatAmount(booking.amount)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusStyles[booking.status]}`}
                      >
                        {booking.status}
                      </span>
                      <p className="mt-2 text-xs text-[#7a89a4]">
                        Booked {formatDate(booking.bookingDate)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 xl:justify-end">
                      {booking.status === "Confirmed" || booking.status === "Ticketing" ? (
                        <button
                          type="button"
                          aria-label={`Download ticket for ${booking.id}`}
                          className="grid h-10 w-10 place-items-center rounded-xl border border-[#dbe4f3] text-[#52627e] hover:bg-[#f5f8ff]"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      ) : null}
                      <Link
                        href={`/dashboard/bookings/${booking.id}`}
                        className="inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-[#101a34] px-4 text-sm font-semibold text-white hover:bg-[#1d2946]"
                      >
                        Details
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#f1edff] text-[#6d28d9]">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#101a34]">No bookings found</h3>
                <p className="mt-2 text-sm text-[#697894]">
                  Try changing your search or clearing the active filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[#101a34] px-4 text-sm font-semibold text-white"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset filters
                </button>
              </div>
            )}
          </section>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-2xl border border-[#d8e2f2] bg-white p-4">
              <MapPin className="mt-0.5 h-5 w-5 text-[#6d28d9]" />
              <div>
                <p className="font-semibold text-[#101a34]">Route tracking</p>
                <p className="mt-1 text-sm leading-6 text-[#697894]">Filter bookings sector-wise.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-[#d8e2f2] bg-white p-4">
              <Download className="mt-0.5 h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-semibold text-[#101a34]">Quick tickets</p>
                <p className="mt-1 text-sm leading-6 text-[#697894]">Download issued documents.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-[#d8e2f2] bg-white p-4">
              <XCircle className="mt-0.5 h-5 w-5 text-rose-600" />
              <div>
                <p className="font-semibold text-[#101a34]">Status visibility</p>
                <p className="mt-1 text-sm leading-6 text-[#697894]">Spot pending actions quickly.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
