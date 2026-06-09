import { CalendarDays, CircleDot, Filter } from "lucide-react";

const months = ["Jun 2026", "Jul 2026", "Aug 2026", "Sep 2026", "Oct 2026", "Nov 2026"];

const fareCards = [
  {
    airline: "Emirates",
    code: "EK",
    tag: "Hot",
    from: "DEL",
    fromCity: "Delhi",
    to: "DXB",
    toCity: "Dubai",
    duration: "3H 40M",
    date: "Fri, Jun 12",
    seats: "18 seats left",
    price: "Rs 14,990",
  },
  {
    airline: "Air India",
    code: "AI",
    tag: "Block",
    from: "BOM",
    fromCity: "Mumbai",
    to: "LHR",
    toCity: "London",
    duration: "9H 25M",
    date: "Mon, Jun 15",
    seats: "24 seats left",
    price: "Rs 42,500",
  },
  {
    airline: "Singapore Airlines",
    code: "SQ",
    tag: "",
    from: "BLR",
    fromCity: "Bengaluru",
    to: "SIN",
    toCity: "Singapore",
    duration: "4H 30M",
    date: "Thu, Jun 18",
    seats: "12 seats left",
    price: "Rs 22,300",
  },
  {
    airline: "Qatar Airways",
    code: "QR",
    tag: "New",
    from: "HYD",
    fromCity: "Hyderabad",
    to: "DOH",
    toCity: "Doha",
    duration: "4H 10M",
    date: "Mon, Jun 22",
    seats: "30 seats left",
    price: "Rs 16,850",
  },
];

function AirlineBadge({ code }: { code: string }) {
  return (
    <div className="flex h-[clamp(2.3rem,2.5vw,2.7rem)] w-[clamp(2.3rem,2.5vw,2.7rem)] items-center justify-center rounded-full bg-[linear-gradient(135deg,#3d8ef3_0%,#e33aa8_55%,#ff7d44_100%)] text-[clamp(0.82rem,0.95vw,0.96rem)] font-semibold text-white shadow-[0_6px_16px_rgba(62,92,144,0.12)]">
      {code}
    </div>
  );
}

function FareCard({
  airline,
  code,
  tag,
  from,
  fromCity,
  to,
  toCity,
  duration,
  date,
  seats,
  price,
}: (typeof fareCards)[number]) {
  return (
    <article className="rounded-[clamp(1.1rem,1.4vw,1.45rem)] border border-[#d7e2f2] bg-white p-[clamp(0.9rem,1.1vw,1.15rem)] shadow-[0_18px_40px_rgba(62,92,144,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-[clamp(0.55rem,0.7vw,0.7rem)]">
          <AirlineBadge code={code} />
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
              {price}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="mt-[clamp(0.8rem,0.95vw,0.95rem)] inline-flex h-[clamp(2.15rem,2.5vw,2.45rem)] w-full items-center justify-center rounded-full bg-[linear-gradient(90deg,#2f91f1_0%,#e641a4_55%,#ff7b42_100%)] text-[clamp(0.74rem,0.84vw,0.84rem)] font-semibold text-white shadow-[0_14px_24px_rgba(234,72,150,0.18)]"
        >
          Block seats
        </button>
      </div>
    </article>
  );
}

export function InventoryBoard() {
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
              className="rounded-full bg-[#3732b8] px-5 py-2 text-sm font-semibold text-white"
            >
              List View
            </button>
            <button
              type="button"
              className="rounded-full px-5 py-2 text-sm font-medium text-[#6f7d97]"
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
              {months.map((month, index) => (
                <button
                  key={month}
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    index === 0
                      ? "bg-[linear-gradient(90deg,#3b82f6_0%,#ec4899_55%,#ff7c40_100%)] text-white"
                      : "bg-[#eef2f9] text-[#60718e]"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>

            <div className="min-w-[15rem] lg:min-w-[18rem]">
              <div className="flex items-center justify-between text-sm font-medium text-[#25365d]">
                <span>Max price</span>
                <span>Rs 50,000</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[#e8ecf6]">
                <div className="relative h-2 w-full rounded-full bg-[linear-gradient(90deg,#ec3da6_0%,#f41989_40%,#ff5e75_100%)]">
                  <span className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-[#ff4c80] shadow-[0_6px_18px_rgba(255,82,134,0.22)]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {fareCards.map((card) => (
            <FareCard key={`${card.airline}-${card.from}-${card.to}`} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
