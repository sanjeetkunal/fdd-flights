import Link from "next/link";
import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Gauge,
  Grid2x2,
  HelpCircle,
  Plane,
  Receipt,
  Settings,
  Ticket,
  TrendingDown,
  TrendingUp,
  WalletCards,
} from "lucide-react";

const sidebarGroups = [
  {
    title: "Flight",
    icon: Plane,
    expandable: true,
    items: ["Add New Flight", "Edit Flights", "Flight Schedule", "Cancelled Flights"],
  },
  { title: "Bookings", icon: Ticket, expandable: true },
  { title: "Payments", icon: CreditCard, expandable: true },
  { title: "Analytics", icon: BarChart3, expandable: true },
  { title: "Settings", icon: Settings, expandable: false },
  { title: "Help", icon: HelpCircle, expandable: false },
];

const statCards = [
  {
    title: "Total Booking",
    value: "550",
    change: "20%",
    trend: "down",
    bg: "bg-[linear-gradient(135deg,#7c3aed_0%,#c084fc_100%)]",
    glow: "before:bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.22),transparent_40%)]",
    icon: CalendarDays,
  },
  {
    title: "Total Revenue",
    value: "₹10,55,000",
    change: "58.9%",
    trend: "up",
    bg: "bg-[linear-gradient(135deg,#7ee7c5_0%,#d9fff4_100%)]",
    glow: "before:bg-[radial-gradient(circle_at_bottom_right,rgba(33,191,115,0.18),transparent_42%)]",
    icon: CircleDollarSign,
    darkText: true,
  },
  {
    title: "Active Flight",
    value: "128",
    change: "10%",
    trend: "up",
    bg: "bg-[linear-gradient(135deg,#1d8cf8_0%,#75b8ff_100%)]",
    glow: "before:bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.2),transparent_42%)]",
    icon: Plane,
  },
  {
    title: "Total Expenses",
    value: "₹5,98,700",
    change: "25.5%",
    trend: "down",
    bg: "bg-[linear-gradient(135deg,#ffd84f_0%,#fff1a6_100%)]",
    glow: "before:bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.28),transparent_42%)]",
    icon: Receipt,
    darkText: true,
  },
];

const bookingRows = [
  {
    destination: "Australia",
    from: "India",
    to: "AUS",
    duration: "1h 45m",
    bookingDate: "15 February, 2024",
    type: "Series Block",
    status: "Confirmed",
  },
  {
    destination: "Dubai",
    from: "Delhi",
    to: "DXB",
    duration: "3h 40m",
    bookingDate: "18 February, 2024",
    type: "Fixed Departure",
    status: "Awaiting names",
  },
  {
    destination: "London",
    from: "Mumbai",
    to: "LHR",
    duration: "9h 25m",
    bookingDate: "20 February, 2024",
    type: "Group Request",
    status: "Ticketing",
  },
];

const scheduleRows = [
  { day: "Mon", date: "02", time: "09:00 AM", route: "DEL → DXB" },
  { day: "Tue", date: "03", time: "01:30 PM", route: "BOM → LHR" },
  { day: "Wed", date: "04", time: "10:15 AM", route: "BLR → SIN" },
  { day: "Thu", date: "05", time: "06:45 PM", route: "HYD → DOH" },
  { day: "Fri", date: "06", time: "08:20 AM", route: "MAA → DXB" },
];

const profitPoints = [18, 42, 36, 76, 54, 94];
const expenseBars = [18, 42, 20, 66, 38, 84];

function MiniLineChart() {
  const points = profitPoints
    .map((value, index) => `${index * 20},${100 - value}`)
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="h-52 w-full">
      <defs>
        <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path
        d={`M0 100 L ${profitPoints
          .map((value, index) => `${index * 20} ${100 - value}`)
          .join(" L ")} L 100 100 Z`}
        fill="url(#profitFill)"
      />
      <polyline
        fill="none"
        stroke="#7c3aed"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
      <circle cx="60" cy={100 - profitPoints[3]} r="4.5" fill="#fff" stroke="#7c3aed" strokeWidth="2.5" />
    </svg>
  );
}

function ExpenseBars() {
  return (
    <div className="mt-5 flex h-52 items-end gap-4">
      {expenseBars.map((value, index) => (
        <div key={index} className="flex flex-1 flex-col items-center gap-3">
          <div className="w-full rounded-full bg-[#eef2fb]">
            <div
              className="w-full rounded-full bg-[linear-gradient(180deg,#ffe36e_0%,#f4cc23_100%)]"
              style={{ height: `${value * 1.8}px` }}
            />
          </div>
          <span className="text-xs font-medium text-[#7c8aa6]">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#eef4ff] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1500px] gap-6">
        <aside className="hidden w-[250px] shrink-0 rounded-[2rem] border border-[#d8e2f2] bg-white p-5 shadow-[0_18px_48px_rgba(62,92,144,0.08)] xl:flex xl:flex-col">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-2xl bg-[linear-gradient(135deg,#29114e_0%,#4d267f_100%)] px-4 py-4 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(53,19,98,0.24)]"
          >
            <Grid2x2 className="h-4 w-4" />
            Dashboard
          </Link>

          <div className="mt-5 space-y-2">
            {sidebarGroups.map((group, index) => {
              const Icon = group.icon;

              return (
                <div key={group.title}>
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-medium text-[#1b2c4d] transition hover:bg-[#f5f8ff]"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-[#1b2c4d]" />
                      {group.title}
                    </span>
                    {group.expandable ? (
                      index === 0 ? (
                        <ChevronDown className="h-4 w-4 text-[#6e7d98]" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-[#6e7d98]" />
                      )
                    ) : null}
                  </button>

                  {index === 0 ? (
                    <div className="ml-4 border-l border-[#dbe4f3] pl-5">
                      {group.items?.map((item) => (
                        <div
                          key={item}
                          className="relative py-4 text-sm font-medium text-[#304563] before:absolute before:-left-5 before:top-1/2 before:h-px before:w-4 before:-translate-y-1/2 before:bg-[#dbe4f3]"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-auto space-y-5 pt-6">
            <div className="overflow-hidden rounded-[1.75rem] bg-[linear-gradient(180deg,#ffe76c_0%,#ffc935_100%)] p-5 text-center shadow-[0_20px_34px_rgba(255,197,58,0.28)]">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/45 text-[#1e3a8a]">
                <Plane className="h-10 w-10 -rotate-45" />
              </div>
              <p className="mt-4 text-lg font-semibold text-[#3f2a06]">Enjoy Savings of 25% or Higher</p>
            </div>

            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-[#1b2c4d] transition hover:bg-[#f5f8ff]"
            >
              <Plane className="h-4 w-4 rotate-180 text-[#1b2c4d]" />
              Log Out
            </button>
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          <div className="flex flex-col gap-5 rounded-[2rem] border border-[#d8e2f2] bg-white p-6 shadow-[0_18px_48px_rgba(62,92,144,0.08)] lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-[var(--font-sora)] text-[clamp(2rem,3vw,2.8rem)] font-semibold tracking-[-0.05em] text-[#2c4bcf]">
                Welcome! <span className="text-[#101a34]">Robert Fox</span>
              </p>
              <p className="mt-2 max-w-2xl text-[1.02rem] leading-7 text-[#697894]">
                Manage your flight booking operations with ease and efficiency across fixed departures,
                group seat blocks, and ongoing agency fulfilment.
              </p>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-4xl font-semibold tracking-[-0.05em] text-[#101a34]">20:00 PM</p>
              <p className="mt-2 text-xl text-[#697894]">15 February, 2024</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {statCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className={`relative overflow-hidden rounded-[1.8rem] p-5 shadow-[0_18px_42px_rgba(62,92,144,0.10)] before:absolute before:inset-0 before:content-[''] ${card.bg} ${card.glow}`}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid h-14 w-14 place-items-center rounded-full bg-white/80 text-[#5342d4] shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div
                        className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-sm font-semibold ${
                          card.darkText
                            ? "bg-white/55 text-[#15264a]"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        {card.trend === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {card.change}
                      </div>
                    </div>

                    <div className="mt-8">
                      <p className={`text-base ${card.darkText ? "text-[#31456d]" : "text-white/88"}`}>
                        {card.title}
                      </p>
                      <p
                        className={`mt-2 text-[clamp(2rem,2.4vw,2.3rem)] font-semibold tracking-[-0.05em] ${
                          card.darkText ? "text-[#101a34]" : "text-white"
                        }`}
                      >
                        {card.value}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr_1fr]">
            <section className="rounded-[1.8rem] border border-[#d8e2f2] bg-white p-5 shadow-[0_18px_48px_rgba(62,92,144,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-[var(--font-sora)] text-2xl font-semibold tracking-[-0.04em] text-[#101a34]">
                    Total Profit
                  </h2>
                  <p className="mt-1 text-sm text-[#6f7d97]">1 January - 31 December</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl border border-[#dbe4f3] px-4 py-2 text-sm font-medium text-[#5f6f8b]">
                  Last 6 Month
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 rounded-[1.5rem] bg-[#fafbff] p-4">
                <div className="rounded-2xl bg-white px-4 py-3 shadow-[0_12px_28px_rgba(62,92,144,0.06)]">
                  <p className="text-3xl font-semibold tracking-[-0.05em] text-[#101a34]">₹10,55,000</p>
                  <p className="mt-1 text-sm text-[#6f7d97]">June 2023</p>
                </div>
                <MiniLineChart />
                <div className="mt-2 grid grid-cols-6 text-center text-xs font-medium text-[#7d8aa5]">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-[1.8rem] border border-[#d8e2f2] bg-white p-5 shadow-[0_18px_48px_rgba(62,92,144,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-[#101a34]">Total Expense</p>
                  <p className="mt-1 text-3xl font-semibold tracking-[-0.05em] text-[#101a34]">₹5,98,737</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl border border-[#dbe4f3] px-4 py-2 text-sm font-medium text-[#5f6f8b]">
                  Last 6 Month
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="rounded-[1.5rem] bg-[#fafbff] p-4">
                <ExpenseBars />
              </div>
            </section>

            <section className="rounded-[1.8rem] border border-[#d8e2f2] bg-white p-5 shadow-[0_18px_48px_rgba(62,92,144,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-[var(--font-sora)] text-2xl font-semibold tracking-[-0.04em] text-[#101a34]">
                    Analytics
                  </h2>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl border border-[#dbe4f3] px-4 py-2 text-sm font-medium text-[#5f6f8b]">
                  Website Analytics
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-[1fr_1.05fr] xl:grid-cols-1 2xl:grid-cols-[1fr_1.05fr]">
                <div className="space-y-4 text-sm text-[#60718e]">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-3 w-3 rounded-full bg-[#7c3aed]" />
                    <div>
                      <p className="font-semibold text-[#101a34]">Website Traffic</p>
                      <p>Total Visitors 2550</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-3 w-3 rounded-full bg-[#8cf1d4]" />
                    <div>
                      <p className="font-semibold text-[#101a34]">User Demographics</p>
                      <p>Age 24, Male 50, Female 20</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-3 w-3 rounded-full bg-[#3f68ff]" />
                    <div>
                      <p className="font-semibold text-[#101a34]">Conversation Rate</p>
                      <p>Total 52%</p>
                    </div>
                  </div>
                </div>

                <div className="grid place-items-center">
                  <div
                    className="grid h-60 w-60 place-items-center rounded-full"
                    style={{
                      background:
                        "conic-gradient(#6d28d9 0 38%, #8ff3d7 38% 66%, #4361ee 66% 100%)",
                    }}
                  >
                    <div className="grid h-38 w-38 place-items-center rounded-full bg-white text-center shadow-[inset_0_0_0_1px_rgba(219,228,243,0.8)]">
                      <span className="text-base font-medium text-[#60718e]">Total</span>
                      <span className="text-4xl font-semibold tracking-[-0.05em] text-[#101a34]">40%</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
            <section className="rounded-[1.8rem] border border-[#d8e2f2] bg-white p-5 shadow-[0_18px_48px_rgba(62,92,144,0.08)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <h2 className="font-[var(--font-sora)] text-2xl font-semibold tracking-[-0.04em] text-[#101a34]">
                  All Booking
                </h2>
                <button className="inline-flex items-center gap-2 rounded-xl border border-[#dbe4f3] px-4 py-2 text-sm font-medium text-[#5f6f8b]">
                  Monthly
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                {["Departure Date", "Booking Type", "Date Range"].map((filter) => (
                  <button
                    key={filter}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#f6f9ff] px-4 py-3 text-sm font-medium text-[#34486a]"
                  >
                    {filter}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ))}
              </div>

              <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#ebf0f9]">
                <div className="grid grid-cols-[1.35fr_1fr_1fr_0.8fr] gap-4 bg-[#f8fbff] px-5 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#6f7d97]">
                  <span>Destination</span>
                  <span>Duration</span>
                  <span>Booking Date</span>
                  <span>Status</span>
                </div>
                <div className="divide-y divide-[#ebf0f9]">
                  {bookingRows.map((row) => (
                    <div
                      key={`${row.destination}-${row.bookingDate}`}
                      className="grid grid-cols-[1.35fr_1fr_1fr_0.8fr] gap-4 px-5 py-4"
                    >
                      <div>
                        <p className="text-lg font-semibold tracking-[-0.03em] text-[#101a34]">
                          {row.destination}
                        </p>
                        <p className="mt-1 text-sm text-[#6f7d97]">
                          {row.from} → {row.to}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8b97ad]">
                          {row.type}
                        </p>
                      </div>
                      <div className="text-sm text-[#31456d]">
                        <p className="font-semibold">{row.duration}</p>
                        <p className="mt-1 text-[#6f7d97]">Direct sector</p>
                      </div>
                      <div className="text-sm text-[#31456d]">
                        <p className="font-semibold">{row.bookingDate}</p>
                        <p className="mt-1 text-[#6f7d97]">Agency logged</p>
                      </div>
                      <div>
                        <span className="inline-flex rounded-full bg-[#eef7ff] px-3 py-1 text-xs font-semibold text-[#3456d1]">
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-[1.8rem] border border-[#d8e2f2] bg-white p-5 shadow-[0_18px_48px_rgba(62,92,144,0.08)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <h2 className="font-[var(--font-sora)] text-2xl font-semibold tracking-[-0.04em] text-[#101a34]">
                  Flight Schedule
                </h2>
                <button className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#7c3aed_0%,#8b5cf6_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_24px_rgba(124,58,237,0.22)]">
                  <Gauge className="h-4 w-4" />
                  Add Flight
                </button>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[1.4rem] bg-[#f8fbff] px-4 py-4">
                <div className="flex items-center gap-3">
                  <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-[#34486a]">
                    December
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-[#34486a]">
                    2023
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <div className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#34486a]">
                  <WalletCards className="h-4 w-4 text-[#4c46c7]" />
                  9:00 AM
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {scheduleRows.map((item) => (
                  <div
                    key={`${item.day}-${item.date}`}
                    className="flex items-center justify-between rounded-[1.4rem] border border-[#ebf0f9] bg-[#fbfdff] px-4 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-center shadow-[0_10px_24px_rgba(62,92,144,0.08)]">
                        <span className="text-xs font-semibold uppercase text-[#8a96ad]">
                          {item.day}
                        </span>
                        <span className="text-lg font-semibold text-[#101a34]">{item.date}</span>
                      </div>
                      <div>
                        <p className="text-lg font-semibold tracking-[-0.03em] text-[#101a34]">
                          {item.route}
                        </p>
                        <p className="mt-1 text-sm text-[#6f7d97]">Scheduled departure</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#101a34]">{item.time}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#8a96ad]">
                        Operations slot
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
