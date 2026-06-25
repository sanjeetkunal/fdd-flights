"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Grid2x2,
  HelpCircle,
  LogOut,
  Plane,
  Settings,
  Ticket,
  UserRound,
} from "lucide-react";

const sidebarGroups = [
  {
    title: "Flight",
    icon: Plane,
    items: [
      { label: "Add New Flight", href: "/dashboard/flights/add-new-flight" },
      { label: "Edit Flights", href: "/dashboard/flights/edit-flights" },
      { label: "Flight Schedule", href: "/dashboard/flights/flight-schedule" },
      { label: "Cancelled Flights", href: "/dashboard/flights/cancelled-flights" },
    ],
  },
  {
    title: "Bookings",
    icon: Ticket,
    items: [
      { label: "My Bookings", href: "/dashboard/bookings/my-bookings" },
      { label: "All Bookings", href: "/dashboard/bookings/all-bookings" },
      { label: "New Booking", href: "/dashboard/bookings/new-booking" },
      { label: "Booking Requests", href: "/dashboard/bookings/booking-requests" },
      { label: "Cancelled Bookings", href: "/dashboard/bookings/cancelled-bookings" },
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    items: [
      { label: "Wallet", href: "/payment/wallet" },
      { label: "Payment Gateway", href: "/payment/payment-gateway" },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    items: [
      { label: "Overview", href: "/dashboard/analytics/overview" },
      { label: "Revenue Report", href: "/dashboard/analytics/revenue-report" },
      { label: "Booking Report", href: "/dashboard/analytics/booking-report" },
      { label: "Flight Performance", href: "/dashboard/analytics/flight-performance" },
    ],
  },
];

const directLinks = [
  { title: "My Profile", icon: UserRound, href: "/dashboard/profile" },
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
  { title: "Help", icon: HelpCircle, href: "/dashboard/help" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<string[]>(() => {
    const activeGroup = sidebarGroups.find((group) =>
      group.items.some((item) => pathname.startsWith(item.href)),
    );

    return [activeGroup?.title ?? "Flight"];
  });

  const toggleGroup = (title: string) => {
    setOpenGroups((current) =>
      current.includes(title)
        ? current.filter((group) => group !== title)
        : [...current, title],
    );
  };

  return (
    <aside className="hidden w-[220px] shrink-0 rounded-3xl border border-[#d8e2f2] bg-white p-4 shadow-[0_14px_36px_rgba(62,92,144,0.07)] xl:flex xl:flex-col">
      <Link
        href="/dashboard"
        className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${
          pathname === "/dashboard"
            ? "bg-[linear-gradient(135deg,#29114e_0%,#4d267f_100%)] text-white shadow-[0_12px_24px_rgba(53,19,98,0.2)]"
            : "text-[#1b2c4d] hover:bg-[#f5f8ff]"
        }`}
      >
        <Grid2x2 className="h-4 w-4" />
        Dashboard
      </Link>

      <nav className="mt-4 space-y-1" aria-label="Dashboard navigation">
        {sidebarGroups.map((group) => {
          const Icon = group.icon;
          const isOpen = openGroups.includes(group.title);
          const isGroupActive = group.items.some((item) => pathname.startsWith(item.href));

          return (
            <div key={group.title}>
              <button
                type="button"
                onClick={() => toggleGroup(group.title)}
                aria-expanded={isOpen}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  isGroupActive
                    ? "bg-[#f1edff] text-[#5b21b6]"
                    : "text-[#1b2c4d] hover:bg-[#f5f8ff]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {group.title}
                </span>
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 text-[#6e7d98]" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-[#6e7d98]" />
                )}
              </button>

              {isOpen ? (
                <div className="ml-4 border-l border-[#dbe4f3] pl-5">
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`relative block py-2.5 text-[0.8rem] font-medium transition before:absolute before:-left-5 before:top-1/2 before:h-px before:w-4 before:-translate-y-1/2 ${
                          isActive
                            ? "text-[#6d28d9] before:bg-[#6d28d9]"
                            : "text-[#304563] before:bg-[#dbe4f3] hover:text-[#6d28d9]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}

        {directLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-[#f1edff] text-[#5b21b6]"
                  : "text-[#1b2c4d] hover:bg-[#f5f8ff]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 pt-5">
        <div className="overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#ffe76c_0%,#ffc935_100%)] p-4 text-center shadow-[0_14px_28px_rgba(255,197,58,0.22)]">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/45 text-[#1e3a8a]">
            <Plane className="h-7 w-7 -rotate-45" />
          </div>
          <p className="mt-3 text-sm font-semibold leading-5 text-[#3f2a06]">
            Enjoy Savings of 25% or Higher
          </p>
        </div>

        <Link
          href="/login"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#1b2c4d] transition hover:bg-[#f5f8ff]"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Link>
      </div>
    </aside>
  );
}
