"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Filter,
  Plane,
  ReceiptText,
  RotateCcw,
  Search,
  ShieldAlert,
  TicketX,
  Undo2,
  Users,
  XCircle,
} from "lucide-react";

import { DashboardSidebar } from "./dashboard-sidebar";

type RefundStatus = "Processed" | "Processing" | "Pending" | "Failed";
type BookingType = "Fixed Departure" | "Series Block" | "Group Request";
type CancelledBy = "Traveller" | "Airline" | "Agency";

type CancelledBooking = {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  travelDate: string;
  cancelledDate: string;
  passengers: number;
  bookingAmount: number;
  deduction: number;
  refundAmount: number;
  refundStatus: RefundStatus;
  bookingType: BookingType;
  cancelledBy: CancelledBy;
  reason: string;
};

const cancelledBookings: CancelledBooking[] = [
  {
    id: "FDD-240529-042",
    airline: "IndiGo",
    flightNumber: "6E 1405",
    origin: "BLR",
    destination: "DXB",
    travelDate: "2026-06-15",
    cancelledDate: "2026-06-09",
    passengers: 5,
    bookingAmount: 96250,
    deduction: 12500,
    refundAmount: 83750,
    refundStatus: "Processing",
    bookingType: "Series Block",
    cancelledBy: "Traveller",
    reason: "Passenger travel plan changed",
  },
  {
    id: "FDD-240517-014",
    airline: "Air India",
    flightNumber: "AI 187",
    origin: "DEL",
    destination: "YYZ",
    travelDate: "2026-06-22",
    cancelledDate: "2026-06-07",
    passengers: 2,
    bookingAmount: 164800,
    deduction: 0,
    refundAmount: 164800,
    refundStatus: "Processed",
    bookingType: "Fixed Departure",
    cancelledBy: "Airline",
    reason: "Airline schedule cancellation",
  },
  {
    id: "FDD-240511-008",
    airline: "Emirates",
    flightNumber: "EK 503",
    origin: "BOM",
    destination: "DXB",
    travelDate: "2026-06-12",
    cancelledDate: "2026-06-03",
    passengers: 3,
    bookingAmount: 72450,
    deduction: 9600,
    refundAmount: 62850,
    refundStatus: "Pending",
    bookingType: "Group Request",
    cancelledBy: "Agency",
    reason: "Group size requirement not met",
  },
  {
    id: "FDD-240428-193",
    airline: "Qatar Airways",
    flightNumber: "QR 557",
    origin: "BOM",
    destination: "DOH",
    travelDate: "2026-05-30",
    cancelledDate: "2026-05-25",
    passengers: 1,
    bookingAmount: 41200,
    deduction: 6200,
    refundAmount: 35000,
    refundStatus: "Failed",
    bookingType: "Fixed Departure",
    cancelledBy: "Traveller",
    reason: "Duplicate booking",
  },
  {
    id: "FDD-240419-156",
    airline: "Singapore Airlines",
    flightNumber: "SQ 401",
    origin: "DEL",
    destination: "SIN",
    travelDate: "2026-05-26",
    cancelledDate: "2026-05-18",
    passengers: 4,
    bookingAmount: 148600,
    deduction: 18400,
    refundAmount: 130200,
    refundStatus: "Processed",
    bookingType: "Series Block",
    cancelledBy: "Traveller",
    reason: "Visa application rejected",
  },
  {
    id: "FDD-240406-121",
    airline: "Etihad Airways",
    flightNumber: "EY 203",
    origin: "DEL",
    destination: "AUH",
    travelDate: "2026-05-18",
    cancelledDate: "2026-05-11",
    passengers: 6,
    bookingAmount: 209400,
    deduction: 0,
    refundAmount: 209400,
    refundStatus: "Processing",
    bookingType: "Group Request",
    cancelledBy: "Airline",
    reason: "Operational flight cancellation",
  },
];

const refundStyles: Record<RefundStatus, string> = {
  Processed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Processing: "bg-blue-50 text-blue-700 ring-blue-200",
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Failed: "bg-rose-50 text-rose-700 ring-rose-200",
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

export function CancelledBookingsPage() {
  const [query, setQuery] = useState("");
  const [refundStatus, setRefundStatus] = useState("All");
  const [bookingType, setBookingType] = useState("All");
  const [cancelledBy, setCancelledBy] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredBookings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return cancelledBookings.filter((booking) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          booking.id,
          booking.airline,
          booking.flightNumber,
          booking.origin,
          booking.destination,
          booking.reason,
        ].some((value) => value.toLowerCase().includes(normalizedQuery));

      return (
        matchesQuery &&
        (refundStatus === "All" || booking.refundStatus === refundStatus) &&
        (bookingType === "All" || booking.bookingType === bookingType) &&
        (cancelledBy === "All" || booking.cancelledBy === cancelledBy) &&
        (!dateFrom || booking.cancelledDate >= dateFrom) &&
        (!dateTo || booking.cancelledDate <= dateTo)
      );
    });
  }, [bookingType, cancelledBy, dateFrom, dateTo, query, refundStatus]);

  const hasActiveFilters =
    query !== "" ||
    refundStatus !== "All" ||
    bookingType !== "All" ||
    cancelledBy !== "All" ||
    dateFrom !== "" ||
    dateTo !== "";

  function resetFilters() {
    setQuery("");
    setRefundStatus("All");
    setBookingType("All");
    setCancelledBy("All");
    setDateFrom("");
    setDateTo("");
  }

  const totalRefund = cancelledBookings.reduce(
    (total, booking) => total + booking.refundAmount,
    0,
  );
  const pendingRefund = cancelledBookings
    .filter((booking) => booking.refundStatus !== "Processed")
    .reduce((total, booking) => total + booking.refundAmount, 0);

  return (
    <main className="min-h-screen bg-[#eef4ff] px-3 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto flex w-full max-w-[1440px] gap-4">
        <DashboardSidebar />

        <section className="min-w-0 flex-1 space-y-4">
          <header className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#481225_0%,#9f274a_56%,#e34862_100%)] p-6 text-white shadow-[0_18px_45px_rgba(159,39,74,0.2)] sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
                  <TicketX className="h-4 w-4" />
                  Cancellation workspace
                </div>
                <h1 className="mt-4 font-[var(--font-sora)] text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  Cancelled Bookings
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                  Review cancelled sectors, deductions, refund progress, and cancellation reasons
                  across all agency bookings.
                </p>
              </div>
              <Link
                href="/dashboard/bookings/my-bookings"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-semibold text-[#9f274a] shadow-sm hover:bg-[#fff7f9]"
              >
                <Undo2 className="h-4 w-4" />
                Back to my bookings
              </Link>
            </div>
          </header>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total cancellations",
                value: cancelledBookings.length,
                icon: XCircle,
                color: "bg-rose-50 text-rose-600",
              },
              {
                label: "Refund processed",
                value: cancelledBookings.filter(
                  (booking) => booking.refundStatus === "Processed",
                ).length,
                icon: ReceiptText,
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                label: "Refund outstanding",
                value: formatAmount(pendingRefund),
                icon: Clock3,
                color: "bg-amber-50 text-amber-600",
              },
              {
                label: "Total refund value",
                value: formatAmount(totalRefund),
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
                  <Filter className="h-5 w-5 text-[#d63d5a]" />
                  Filter cancellations
                </h2>
                <p className="mt-1 text-sm text-[#697894]">
                  Search by booking, airline, route, or cancellation reason.
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
                  className="h-12 w-full rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] pl-11 pr-4 text-sm text-[#101a34] outline-none placeholder:text-[#94a3b8] focus:border-[#d63d5a] focus:bg-white"
                />
              </label>

              <select
                value={refundStatus}
                onChange={(event) => setRefundStatus(event.target.value)}
                className="h-12 rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] px-4 text-sm text-[#31456d] outline-none focus:border-[#d63d5a] focus:bg-white"
              >
                <option value="All">All refund statuses</option>
                {["Processed", "Processing", "Pending", "Failed"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                value={bookingType}
                onChange={(event) => setBookingType(event.target.value)}
                className="h-12 rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] px-4 text-sm text-[#31456d] outline-none focus:border-[#d63d5a] focus:bg-white"
              >
                <option value="All">All booking types</option>
                {["Fixed Departure", "Series Block", "Group Request"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                value={cancelledBy}
                onChange={(event) => setCancelledBy(event.target.value)}
                className="h-12 rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] px-4 text-sm text-[#31456d] outline-none focus:border-[#d63d5a] focus:bg-white"
              >
                <option value="All">Cancelled by anyone</option>
                {["Traveller", "Airline", "Agency"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:max-w-xl">
              <label>
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#7a89a4]">
                  Cancelled from
                </span>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(event) => setDateFrom(event.target.value)}
                  className="h-11 w-full rounded-xl border border-[#d7e2f2] bg-[#f8fbff] px-3 text-sm text-[#31456d] outline-none focus:border-[#d63d5a] focus:bg-white"
                />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#7a89a4]">
                  Cancelled to
                </span>
                <input
                  type="date"
                  value={dateTo}
                  min={dateFrom || undefined}
                  onChange={(event) => setDateTo(event.target.value)}
                  className="h-11 w-full rounded-xl border border-[#d7e2f2] bg-[#f8fbff] px-3 text-sm text-[#31456d] outline-none focus:border-[#d63d5a] focus:bg-white"
                />
              </label>
            </div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-[#d8e2f2] bg-white shadow-[0_14px_36px_rgba(62,92,144,0.07)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e7edf7] px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold text-[#101a34]">Cancellation records</h2>
                <p className="mt-1 text-sm text-[#697894]">
                  Showing {filteredBookings.length} of {cancelledBookings.length} cancellations
                </p>
              </div>
              <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700">
                Latest first
              </span>
            </div>

            {filteredBookings.length > 0 ? (
              <div className="divide-y divide-[#e9eef7]">
                {filteredBookings.map((booking) => (
                  <article
                    key={booking.id}
                    className="grid gap-4 px-5 py-5 transition hover:bg-[#fffafb] xl:grid-cols-[1.15fr_0.9fr_1.15fr_0.9fr_auto] xl:items-center"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-rose-50 font-semibold text-rose-600">
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
                          {booking.bookingType}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 font-semibold text-[#101a34]">
                        <span>{booking.origin}</span>
                        <Plane className="h-4 w-4 text-[#d63d5a]" />
                        <span>{booking.destination}</span>
                      </div>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-[#697894]">
                        <CalendarDays className="h-4 w-4" />
                        Travel: {formatDate(booking.travelDate)}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-rose-600">
                        <TicketX className="h-3.5 w-3.5" />
                        Cancelled: {formatDate(booking.cancelledDate)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.1em] text-[#8a96aa]">
                        Cancellation reason
                      </p>
                      <p className="mt-1 text-sm font-semibold leading-5 text-[#101a34]">
                        {booking.reason}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-[#697894]">
                        <Users className="h-3.5 w-3.5" />
                        {booking.passengers} travellers | By {booking.cancelledBy}
                      </p>
                    </div>

                    <div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${refundStyles[booking.refundStatus]}`}
                      >
                        Refund {booking.refundStatus}
                      </span>
                      <p className="mt-2 font-semibold text-[#101a34]">
                        {formatAmount(booking.refundAmount)}
                      </p>
                      <p className="mt-1 text-xs text-[#7a89a4]">
                        Deduction: {formatAmount(booking.deduction)}
                      </p>
                    </div>

                    <Link
                      href={`/dashboard/bookings/${booking.id}`}
                      className="inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-[#101a34] px-4 text-sm font-semibold text-white hover:bg-[#1d2946]"
                    >
                      Details
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-rose-50 text-rose-600">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#101a34]">
                  No cancellations found
                </h3>
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

          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm leading-6">
              Refund timelines depend on the airline and payment method. Failed refunds require
              manual review before another settlement attempt.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
