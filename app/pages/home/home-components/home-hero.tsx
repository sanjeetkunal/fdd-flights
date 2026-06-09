import Image from "next/image";
import {
  ArrowLeftRight,
  CalendarDays,
  MapPin,
  Search,
  ShieldCheck,
  Users,
  WalletCards,
  Waves,
} from "lucide-react";

const tripModes = ["Round trip", "One way", "Multi-city"];
const cabinClasses = ["Economy", "Premium", "Business", "First"];

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

function SearchField({
  icon: Icon,
  label,
  value,
  hint,
  compact = false,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  hint: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-[1.15rem] border border-[#d9e4f7] bg-[#f3f7ff] px-4 py-3 ${
        compact ? "min-w-[5.9rem]" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#687797]">
        <Icon className="h-3.5 w-3.5 text-[#5955d5]" />
        {label}
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-[1.05rem] font-semibold tracking-[-0.03em] text-[#0e2041]">{value}</p>
          <p className="mt-1 text-[0.72rem] text-[#7d8ca8]">{hint}</p>
        </div>
        {label !== "From" && label !== "To" ? (
          <CalendarDays className="h-4 w-4 text-[#0e2041]" />
        ) : null}
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[#120f29]">
      <div className="absolute inset-0">
        <Image
          src="/hero-bg-g9gSlJcK.jpg"
          alt="Airplane wing over clouds during sunset"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--primary) 72%, transparent) 0%, color-mix(in oklab, var(--magenta) 54%, transparent) 55%, color-mix(in oklab, var(--sunset) 48%, transparent) 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,11,43,0.22)_0%,rgba(14,13,44,0.5)_52%,rgba(16,21,53,0.92)_100%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pb-14 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-18">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-1.5 text-[0.78rem] font-semibold text-white/92 shadow-[0_10px_30px_rgba(6,11,40,0.2)] backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" />
            Live fares · Guaranteed group inventory
          </div>

          <h1 className="mt-5 max-w-4xl font-[var(--font-sora)] text-[clamp(2.4rem,5vw,4.1rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-white">
            Search the sky. Lock the seats. Beat the rate.
          </h1>
          <p className="mt-4 max-w-2xl text-[clamp(1rem,1.5vw,1.25rem)] leading-8 text-white/82">
            One portal for live fares, fixed-departure series and block bookings — built
            exclusively for travel agents.
          </p>
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/55 bg-white/96 p-5 shadow-[0_26px_90px_rgba(7,17,50,0.28)] backdrop-blur-xl lg:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {tripModes.map((mode, index) => (
                <button
                  key={mode}
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    index === 0
                      ? "bg-[#3732b8] text-white shadow-[0_10px_18px_rgba(55,50,184,0.22)]"
                      : "bg-transparent text-[#6d7890]"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-[#737f96]">
              <ShieldCheck className="h-4 w-4 text-[#5955d5]" />
              IATA verified · Net rates
            </div>
          </div>

          <div className="mt-5 grid gap-3 lg:grid-cols-[1.3fr_auto_1.3fr_0.85fr_0.85fr_0.4fr]">
            <SearchField
              icon={MapPin}
              label="From"
              value="DEL"
              hint="Origin airport (IATA)"
            />
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#132444] shadow-[0_10px_24px_rgba(18,36,68,0.14)]"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>
            <SearchField
              icon={MapPin}
              label="To"
              value="DXB"
              hint="Destination airport (IATA)"
            />
            <SearchField
              icon={CalendarDays}
              label="Depart"
              value="15-06-2026"
              hint=""
              compact
            />
            <SearchField
              icon={CalendarDays}
              label="Return"
              value="22-06-2026"
              hint=""
              compact
            />
            <div className="rounded-[1.15rem] border border-[#d9e4f7] bg-[#f3f7ff] px-4 py-3">
              <div className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-[#687797]">
                <Users className="h-3.5 w-3.5 text-[#5955d5]" />
                Pax
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-[1.05rem] font-semibold tracking-[-0.03em] text-[#0e2041]">1</p>
                <svg
                  className="h-4 w-4 text-[#0e2041]"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 7 5 5 5-5" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {cabinClasses.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={`rounded-full px-4 py-1.5 text-sm font-medium ${
                    index === 0 ? "bg-[#efedff] text-[#5955d5]" : "bg-[#f4f6fb] text-[#687797]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[1.1rem] bg-[linear-gradient(90deg,#3990f2_0%,#ea4e97_55%,#ff7c41_100%)] px-7 text-base font-semibold text-white shadow-[0_16px_34px_rgba(238,83,123,0.28)]"
            >
              <Search className="h-4 w-4" />
              Search flights
            </button>
          </div>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {quickStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/8 px-4 py-4 text-white shadow-[0_16px_40px_rgba(11,15,44,0.16)] backdrop-blur-md"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 text-white/90">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-lg font-semibold leading-none">{stat.value}</p>
                  <p className="mt-1 text-[0.78rem] uppercase tracking-[0.08em] text-white/72">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
