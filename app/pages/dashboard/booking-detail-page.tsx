"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  Mail,
  MapPin,
  Pencil,
  Percent,
  Plane,
  Plus,
  ReceiptText,
  Send,
  ShieldCheck,
  Smartphone,
  UserRound,
  Users,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { DashboardSidebar } from "./dashboard-sidebar";

type BookingDetailPageProps = {
  bookingId: string;
};

type Passenger = {
  name: string;
  type: string;
  ticketNumber: string;
  seat: string;
};

type BookingDetail = {
  id: string;
  pnr: string;
  status: "Confirmed" | "Ticketing" | "Pending" | "Cancelled";
  airline: string;
  flightNumber: string;
  aircraft: string;
  cabin: string;
  origin: string;
  originCity: string;
  originTerminal: string;
  destination: string;
  destinationCity: string;
  destinationTerminal: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  duration: string;
  baggage: string;
  bookingDate: string;
  bookingType: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  company: string;
  gstNumber: string;
  passengers: Passenger[];
  baseFare: number;
  taxes: number;
  serviceFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentReference: string;
};

type MarkupType = "fixed" | "percentage";

type AgentMarkup = {
  type: MarkupType;
  value: number;
  note: string;
};

const defaultBooking: BookingDetail = {
  id: "FDD-240615-128",
  pnr: "SKY8DX",
  status: "Confirmed",
  airline: "Emirates",
  flightNumber: "EK 511",
  aircraft: "Boeing 777-300ER",
  cabin: "Economy Flex",
  origin: "DEL",
  originCity: "New Delhi",
  originTerminal: "Terminal 3",
  destination: "DXB",
  destinationCity: "Dubai",
  destinationTerminal: "Terminal 3",
  departureDate: "2026-06-18",
  departureTime: "11:00",
  arrivalDate: "2026-06-18",
  arrivalTime: "13:20",
  duration: "3h 50m",
  baggage: "30 kg check-in + 7 kg cabin",
  bookingDate: "2026-06-10",
  bookingType: "Fixed Departure",
  contactName: "Robert Fox",
  contactEmail: "robert@skyblocktravels.com",
  contactPhone: "+91 98765 43210",
  company: "SkyBlock Travels Pvt. Ltd.",
  gstNumber: "07ABCDE1234F1Z5",
  passengers: [
    { name: "Robert Fox", type: "Adult", ticketNumber: "176-9845123456", seat: "22A" },
    { name: "Kristin Fox", type: "Adult", ticketNumber: "176-9845123457", seat: "22B" },
  ],
  baseFare: 39900,
  taxes: 2300,
  serviceFee: 650,
  discount: 0,
  total: 42850,
  paymentMethod: "Credit Card ending 4821",
  paymentReference: "PAY-260610-78421",
};

const bookingOverrides: Record<string, Partial<BookingDetail>> = {
  "FDD-240612-096": {
    pnr: "AIX4LR",
    status: "Ticketing",
    airline: "Air India",
    flightNumber: "AI 131",
    aircraft: "Boeing 787-8",
    cabin: "Economy",
    origin: "BOM",
    originCity: "Mumbai",
    destination: "LHR",
    destinationCity: "London",
    destinationTerminal: "Terminal 2",
    departureDate: "2026-06-24",
    departureTime: "14:35",
    arrivalDate: "2026-06-24",
    arrivalTime: "20:10",
    duration: "10h 05m",
    total: 184600,
    baseFare: 169500,
    taxes: 14450,
    passengers: [
      { name: "Robert Fox", type: "Adult", ticketNumber: "Pending", seat: "Auto" },
      { name: "Kristin Fox", type: "Adult", ticketNumber: "Pending", seat: "Auto" },
      { name: "Jenny Wilson", type: "Adult", ticketNumber: "Pending", seat: "Auto" },
      { name: "Guy Hawkins", type: "Adult", ticketNumber: "Pending", seat: "Auto" },
    ],
  },
  "FDD-240529-042": {
    pnr: "6E7BKL",
    status: "Cancelled",
    airline: "IndiGo",
    flightNumber: "6E 1405",
    aircraft: "Airbus A320neo",
    cabin: "Economy",
    origin: "BLR",
    originCity: "Bengaluru",
    destination: "DXB",
    destinationCity: "Dubai",
    departureDate: "2026-06-15",
    departureTime: "07:10",
    arrivalDate: "2026-06-15",
    arrivalTime: "09:45",
    duration: "4h 05m",
    total: 96250,
    baseFare: 89000,
    taxes: 6600,
    passengers: [
      { name: "Robert Fox", type: "Adult", ticketNumber: "Cancelled", seat: "24A" },
      { name: "Kristin Fox", type: "Adult", ticketNumber: "Cancelled", seat: "24B" },
      { name: "Jenny Wilson", type: "Adult", ticketNumber: "Cancelled", seat: "24C" },
      { name: "Guy Hawkins", type: "Adult", ticketNumber: "Cancelled", seat: "25A" },
      { name: "Cody Fisher", type: "Adult", ticketNumber: "Cancelled", seat: "25B" },
    ],
  },
};

const savedMarkups: Record<string, AgentMarkup> = {
  "FDD-240615-128": {
    type: "fixed",
    value: 1500,
    note: "Agency service markup",
  },
  "FDD-240612-096": {
    type: "percentage",
    value: 2.5,
    note: "Corporate handling markup",
  },
};

const statusStyles = {
  Confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Ticketing: "bg-blue-50 text-blue-700 ring-blue-200",
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Cancelled: "bg-rose-50 text-rose-700 ring-rose-200",
};

function getBooking(bookingId: string): BookingDetail {
  return {
    ...defaultBooking,
    ...bookingOverrides[bookingId],
    id: bookingId,
  };
}

function formatAmount(value: number) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

function makeShareText(booking: BookingDetail, sellingTotal: number) {
  return [
    `Flight booking ${booking.id}`,
    `${booking.airline} ${booking.flightNumber}`,
    `${booking.origin} to ${booking.destination}`,
    `${formatDate(booking.departureDate)} at ${booking.departureTime}`,
    `PNR: ${booking.pnr}`,
    `Status: ${booking.status}`,
    `Total: ${formatAmount(sellingTotal)}`,
  ].join("\n");
}

export function BookingDetailPage({ bookingId }: BookingDetailPageProps) {
  const booking = getBooking(bookingId);
  const canDownloadTicket = booking.status === "Confirmed" || booking.status === "Ticketing";
  const [markup, setMarkup] = useState<AgentMarkup | null>(savedMarkups[bookingId] ?? null);
  const [markupDialogOpen, setMarkupDialogOpen] = useState(false);
  const [draftType, setDraftType] = useState<MarkupType>(
    savedMarkups[bookingId]?.type ?? "fixed",
  );
  const [draftValue, setDraftValue] = useState(savedMarkups[bookingId]?.value ?? 0);
  const [draftNote, setDraftNote] = useState(
    savedMarkups[bookingId]?.note ?? "Agency service markup",
  );
  const markupAmount =
    markup?.type === "percentage"
      ? Math.round((booking.total * markup.value) / 100)
      : (markup?.value ?? 0);
  const sellingTotal = booking.total + markupAmount;
  const draftMarkupAmount =
    draftType === "percentage"
      ? Math.round((booking.total * Math.max(0, draftValue)) / 100)
      : Math.max(0, draftValue);

  function openMarkupDialog() {
    setDraftType(markup?.type ?? "fixed");
    setDraftValue(markup?.value ?? 0);
    setDraftNote(markup?.note ?? "Agency service markup");
    setMarkupDialogOpen(true);
  }

  function saveMarkup() {
    if (draftValue <= 0) {
      setMarkup(null);
    } else {
      setMarkup({
        type: draftType,
        value: draftValue,
        note: draftNote.trim() || "Agency service markup",
      });
    }

    setMarkupDialogOpen(false);
  }

  function downloadTicket() {
    const passengerRows = booking.passengers
      .map(
        (passenger) =>
          `<tr><td>${passenger.name}</td><td>${passenger.type}</td><td>${passenger.ticketNumber}</td><td>${passenger.seat}</td></tr>`,
      )
      .join("");
    const ticket = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Ticket ${booking.id}</title>
<style>body{font-family:Arial,sans-serif;color:#11203f;padding:32px;max-width:850px;margin:auto}header{border-bottom:4px solid #6d28d9;padding-bottom:18px}h1{margin:0}small{color:#64748b}.route{display:flex;justify-content:space-between;align-items:center;background:#f4f1ff;padding:24px;border-radius:16px;margin:24px 0}.airport{font-size:30px;font-weight:700}.meta{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.box{border:1px solid #dbe3f1;border-radius:12px;padding:14px}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{text-align:left;border-bottom:1px solid #e5eaf3;padding:12px 8px}footer{margin-top:30px;color:#64748b;font-size:12px}@media print{body{padding:0}}</style>
</head><body><header><small>E-TICKET / ITINERARY</small><h1>${booking.airline} ${booking.flightNumber}</h1><p>Booking ID: ${booking.id} | PNR: ${booking.pnr}</p></header>
<div class="route"><div><div class="airport">${booking.origin}</div><small>${booking.originCity}</small><p>${formatDate(booking.departureDate)}<br><strong>${booking.departureTime}</strong></p></div><strong>${booking.duration}</strong><div style="text-align:right"><div class="airport">${booking.destination}</div><small>${booking.destinationCity}</small><p>${formatDate(booking.arrivalDate)}<br><strong>${booking.arrivalTime}</strong></p></div></div>
<div class="meta"><div class="box"><small>Cabin</small><p><strong>${booking.cabin}</strong></p></div><div class="box"><small>Baggage</small><p><strong>${booking.baggage}</strong></p></div><div class="box"><small>Status</small><p><strong>${booking.status}</strong></p></div></div>
<h2>Passengers</h2><table><thead><tr><th>Name</th><th>Type</th><th>Ticket no.</th><th>Seat</th></tr></thead><tbody>${passengerRows}</tbody></table>
<h2>Fare</h2><div class="meta"><div class="box"><small>Booking total</small><p><strong>${formatAmount(booking.total)}</strong></p></div><div class="box"><small>Agent markup</small><p><strong>${formatAmount(markupAmount)}</strong></p></div><div class="box"><small>Customer total</small><p><strong>${formatAmount(sellingTotal)}</strong></p></div></div>
<footer>This is a system-generated ticket copy. Please carry a valid government photo ID for travel.</footer></body></html>`;
    const blob = new Blob([ticket], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${booking.id}-ticket.html`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function shareOnWhatsApp() {
    const message = `${makeShareText(booking, sellingTotal)}\n${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  function shareByEmail() {
    const subject = `Flight ticket ${booking.id} - ${booking.origin} to ${booking.destination}`;
    const body = `${makeShareText(booking, sellingTotal)}\n\nView booking: ${window.location.href}`;
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_self",
    );
  }

  return (
    <main className="min-h-screen bg-[#eef4ff] px-3 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto flex w-full max-w-[1440px] gap-4">
        <DashboardSidebar />

        <section className="min-w-0 flex-1 space-y-4">
          <header className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#29114e_0%,#5d2b91_55%,#7c3aed_100%)] p-6 text-white shadow-[0_18px_45px_rgba(76,29,149,0.2)] sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Link
                  href="/dashboard/bookings/my-bookings"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to bookings
                </Link>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <h1 className="font-[var(--font-sora)] text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                    Booking Details
                  </h1>
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusStyles[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/75">
                  Booking ID {booking.id} | PNR {booking.pnr} | Booked {formatDate(booking.bookingDate)}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={downloadTicket}
                  disabled={!canDownloadTicket}
                  className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-semibold text-[#5b21b6] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  Download ticket
                </button>
                <button
                  type="button"
                  onClick={shareOnWhatsApp}
                  className="inline-flex h-11 items-center gap-2 rounded-2xl bg-[#25d366] px-4 text-sm font-semibold text-white hover:bg-[#1fbd5b]"
                >
                  <Smartphone className="h-4 w-4" />
                  WhatsApp
                </button>
                <button
                  type="button"
                  onClick={shareByEmail}
                  className="inline-flex h-11 items-center gap-2 rounded-2xl bg-white/12 px-4 text-sm font-semibold text-white hover:bg-white/20"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </button>
              </div>
            </div>
          </header>

          <section className="overflow-hidden rounded-3xl border border-[#d8e2f2] bg-white shadow-[0_14px_36px_rgba(62,92,144,0.07)]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e7edf7] px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f1edff] font-bold text-[#6d28d9]">
                  {booking.airline
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#101a34]">{booking.airline}</h2>
                  <p className="text-sm text-[#697894]">
                    {booking.flightNumber} | {booking.aircraft} | {booking.cabin}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#f4f6fb] px-3 py-1.5 text-xs font-semibold text-[#52627e]">
                {booking.bookingType}
              </span>
            </div>

            <div className="grid gap-6 px-5 py-7 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div>
                <p className="text-4xl font-semibold tracking-[-0.05em] text-[#101a34]">
                  {booking.departureTime}
                </p>
                <p className="mt-2 text-xl font-semibold text-[#101a34]">
                  {booking.origin} <span className="text-sm font-normal text-[#697894]">{booking.originCity}</span>
                </p>
                <p className="mt-1 text-sm text-[#697894]">{formatDate(booking.departureDate)}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-[#697894]">
                  <MapPin className="h-4 w-4" />
                  {booking.originTerminal}
                </p>
              </div>

              <div className="flex min-w-44 flex-col items-center text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a89a4]">
                  {booking.duration}
                </p>
                <div className="mt-2 flex w-full items-center">
                  <span className="h-2 w-2 rounded-full bg-[#2f91f1]" />
                  <span className="h-px flex-1 bg-[#cbd6e8]" />
                  <Plane className="mx-2 h-5 w-5 text-[#6d28d9]" />
                  <span className="h-px flex-1 bg-[#cbd6e8]" />
                  <span className="h-2 w-2 rounded-full bg-[#ff7b42]" />
                </div>
                <p className="mt-2 text-xs text-[#697894]">Direct flight</p>
              </div>

              <div className="lg:text-right">
                <p className="text-4xl font-semibold tracking-[-0.05em] text-[#101a34]">
                  {booking.arrivalTime}
                </p>
                <p className="mt-2 text-xl font-semibold text-[#101a34]">
                  {booking.destination}{" "}
                  <span className="text-sm font-normal text-[#697894]">
                    {booking.destinationCity}
                  </span>
                </p>
                <p className="mt-1 text-sm text-[#697894]">{formatDate(booking.arrivalDate)}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-[#697894] lg:justify-end">
                  <MapPin className="h-4 w-4" />
                  {booking.destinationTerminal}
                </p>
              </div>
            </div>

            <div className="grid gap-3 border-t border-[#e7edf7] bg-[#f8faff] px-5 py-4 sm:grid-cols-3 sm:px-8">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="h-5 w-5 text-[#6d28d9]" />
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#7a89a4]">Baggage</p>
                  <p className="mt-1 text-sm font-semibold text-[#101a34]">{booking.baggage}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-[#6d28d9]" />
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#7a89a4]">Check-in</p>
                  <p className="mt-1 text-sm font-semibold text-[#101a34]">
                    Opens 3 hours before departure
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#7a89a4]">PNR</p>
                  <p className="mt-1 text-sm font-semibold text-[#101a34]">{booking.pnr}</p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <section className="rounded-3xl border border-[#d8e2f2] bg-white p-5 shadow-[0_14px_36px_rgba(62,92,144,0.07)] sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-[#101a34]">Traveller details</h2>
                    <p className="mt-1 text-sm text-[#697894]">
                      {booking.passengers.length} passengers on this booking
                    </p>
                  </div>
                  <Users className="h-5 w-5 text-[#6d28d9]" />
                </div>

                <div className="mt-5 overflow-x-auto">
                  <div className="min-w-[620px]">
                    <div className="grid grid-cols-[1.2fr_0.6fr_1fr_0.5fr] gap-4 rounded-xl bg-[#f8faff] px-4 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#7a89a4]">
                      <span>Passenger</span>
                      <span>Type</span>
                      <span>Ticket number</span>
                      <span>Seat</span>
                    </div>
                    <div className="divide-y divide-[#e9eef7]">
                      {booking.passengers.map((passenger) => (
                        <div
                          key={`${passenger.name}-${passenger.ticketNumber}`}
                          className="grid grid-cols-[1.2fr_0.6fr_1fr_0.5fr] gap-4 px-4 py-4 text-sm"
                        >
                          <span className="flex items-center gap-2 font-semibold text-[#101a34]">
                            <UserRound className="h-4 w-4 text-[#6d28d9]" />
                            {passenger.name}
                          </span>
                          <span className="text-[#52627e]">{passenger.type}</span>
                          <span className="font-medium text-[#31456d]">{passenger.ticketNumber}</span>
                          <span className="font-semibold text-[#101a34]">{passenger.seat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-[#d8e2f2] bg-white p-5 shadow-[0_14px_36px_rgba(62,92,144,0.07)] sm:p-6">
                <h2 className="text-xl font-semibold text-[#101a34]">Contact and billing</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    { label: "Primary contact", value: booking.contactName, icon: UserRound },
                    { label: "Email", value: booking.contactEmail, icon: Mail },
                    { label: "Phone", value: booking.contactPhone, icon: Smartphone },
                    { label: "Company", value: booking.company, icon: BriefcaseBusiness },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-start gap-3 rounded-2xl bg-[#f8faff] p-4">
                        <Icon className="mt-0.5 h-5 w-5 text-[#6d28d9]" />
                        <div>
                          <p className="text-xs uppercase tracking-[0.1em] text-[#7a89a4]">
                            {item.label}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[#101a34]">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4 text-sm text-[#697894]">GST number: {booking.gstNumber}</p>
              </section>
            </div>

            <aside className="space-y-4">
              <section className="rounded-3xl border border-[#d8e2f2] bg-white p-5 shadow-[0_14px_36px_rgba(62,92,144,0.07)] sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#6d28d9]">
                    <ReceiptText className="h-4 w-4" />
                    Fare and payment
                  </div>
                  <button
                    type="button"
                    onClick={openMarkupDialog}
                    className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#f1edff] px-3 text-xs font-semibold text-[#6d28d9] hover:bg-[#e8e1ff]"
                  >
                    {markup ? <Pencil className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    {markup ? "Edit markup" : "Add markup"}
                  </button>
                </div>
                <div className="mt-5 space-y-3 text-sm">
                  {[
                    ["Base fare", booking.baseFare],
                    ["Taxes and airline fees", booking.taxes],
                    ["Service fee", booking.serviceFee],
                    ["Discount", -booking.discount],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="flex justify-between text-[#52627e]">
                      <span>{label}</span>
                      <span>{formatAmount(Number(value))}</span>
                    </div>
                  ))}
                  {markup ? (
                    <div className="flex justify-between rounded-xl bg-[#fff8e8] px-3 py-2.5 font-semibold text-amber-800">
                      <span>
                        Agent markup
                        <span className="ml-1 text-xs font-medium">
                          ({markup.type === "percentage" ? `${markup.value}%` : markup.note})
                        </span>
                      </span>
                      <span>{formatAmount(markupAmount)}</span>
                    </div>
                  ) : null}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[#e5ebf6] pt-5">
                  <div>
                    <span className="font-semibold text-[#101a34]">
                      {markup ? "Customer total" : "Grand total"}
                    </span>
                    {markup ? (
                      <p className="mt-1 text-xs text-[#7a89a4]">
                        Net booking: {formatAmount(booking.total)}
                      </p>
                    ) : null}
                  </div>
                  <span className="text-2xl font-semibold tracking-[-0.04em] text-[#101a34]">
                    {formatAmount(sellingTotal)}
                  </span>
                </div>
                <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-emerald-800">
                  <p className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="h-4 w-4" />
                    Payment recorded
                  </p>
                  <p className="mt-2 text-sm">{booking.paymentMethod}</p>
                  <p className="mt-1 text-xs text-emerald-700">{booking.paymentReference}</p>
                </div>
              </section>

              <section className="rounded-3xl border border-[#d8e2f2] bg-white p-5 shadow-[0_14px_36px_rgba(62,92,144,0.07)]">
                <h2 className="flex items-center gap-2 font-semibold text-[#101a34]">
                  <Send className="h-4 w-4 text-[#6d28d9]" />
                  Share booking
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#697894]">
                  Send the itinerary and booking link directly to the traveller.
                </p>
                <div className="mt-4 grid gap-2">
                  <button
                    type="button"
                    onClick={shareOnWhatsApp}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#25d366] px-4 text-sm font-semibold text-white hover:bg-[#1fbd5b]"
                  >
                    <Smartphone className="h-4 w-4" />
                    Share via WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={shareByEmail}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#dbe4f3] px-4 text-sm font-semibold text-[#31456d] hover:bg-[#f8faff]"
                  >
                    <Mail className="h-4 w-4" />
                    Share via email
                  </button>
                </div>
              </section>

              <section className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0" />
                <p className="text-sm leading-6">
                  Schedule and terminal information can change. Reconfirm flight details before
                  departure.
                </p>
              </section>
            </aside>
          </div>
        </section>
      </div>

      <Dialog open={markupDialogOpen} onOpenChange={setMarkupDialogOpen}>
        <DialogContent className="max-w-xl border border-[#d8e2f2] bg-white p-0">
          <div className="bg-[linear-gradient(135deg,#29114e_0%,#6d28d9_100%)] px-6 py-5 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl text-white">
                <ReceiptText className="h-5 w-5" />
                {markup ? "Edit agent markup" : "Add agent markup"}
              </DialogTitle>
              <DialogDescription className="text-white/75">
                Set the selling margin for booking {booking.id}. The airline net fare stays
                unchanged.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="space-y-5 px-6 py-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a89a4]">
                Markup type
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDraftType("fixed")}
                  className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-semibold ${
                    draftType === "fixed"
                      ? "border-[#7c3aed] bg-[#f1edff] text-[#6d28d9]"
                      : "border-[#dbe4f3] text-[#52627e]"
                  }`}
                >
                  <ReceiptText className="h-4 w-4" />
                  Fixed amount
                </button>
                <button
                  type="button"
                  onClick={() => setDraftType("percentage")}
                  className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-semibold ${
                    draftType === "percentage"
                      ? "border-[#7c3aed] bg-[#f1edff] text-[#6d28d9]"
                      : "border-[#dbe4f3] text-[#52627e]"
                  }`}
                >
                  <Percent className="h-4 w-4" />
                  Percentage
                </button>
              </div>
            </div>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a89a4]">
                {draftType === "fixed" ? "Markup amount" : "Markup percentage"}
              </span>
              <div className="relative mt-2">
                <input
                  type="number"
                  min="0"
                  max={draftType === "percentage" ? 100 : undefined}
                  step={draftType === "percentage" ? "0.1" : "1"}
                  value={draftValue}
                  onChange={(event) => setDraftValue(Number(event.target.value))}
                  className="h-12 w-full rounded-xl border border-[#d7e2f2] bg-[#f8fbff] px-4 pr-12 text-base font-semibold text-[#101a34] outline-none focus:border-[#7c3aed] focus:bg-white"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-semibold text-[#6d28d9]">
                  {draftType === "fixed" ? "Rs." : "%"}
                </span>
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a89a4]">
                Markup note
              </span>
              <input
                value={draftNote}
                onChange={(event) => setDraftNote(event.target.value)}
                placeholder="e.g. Agency service markup"
                className="mt-2 h-12 w-full rounded-xl border border-[#d7e2f2] bg-[#f8fbff] px-4 text-sm text-[#101a34] outline-none focus:border-[#7c3aed] focus:bg-white"
              />
            </label>

            <div className="rounded-2xl border border-[#e1dafd] bg-[#f8f5ff] p-4">
              <div className="flex justify-between text-sm text-[#64748b]">
                <span>Net booking total</span>
                <span>{formatAmount(booking.total)}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-[#64748b]">
                <span>Calculated markup</span>
                <span>+ {formatAmount(draftMarkupAmount)}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[#ddd5f7] pt-4">
                <span className="font-semibold text-[#101a34]">Customer selling total</span>
                <span className="text-xl font-semibold text-[#6d28d9]">
                  {formatAmount(booking.total + draftMarkupAmount)}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-[#e7edf7] px-6 py-4 sm:justify-between sm:space-x-0">
            <button
              type="button"
              onClick={() => {
                setMarkup(null);
                setMarkupDialogOpen(false);
              }}
              disabled={!markup}
              className="h-11 rounded-xl px-4 text-sm font-semibold text-rose-600 disabled:invisible"
            >
              Remove markup
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMarkupDialogOpen(false)}
                className="h-11 rounded-xl border border-[#dbe4f3] px-5 text-sm font-semibold text-[#52627e]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveMarkup}
                className="h-11 rounded-xl bg-[#101a34] px-5 text-sm font-semibold text-white hover:bg-[#1d2946]"
              >
                Save markup
              </button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
