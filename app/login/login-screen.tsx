"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Earth,
  Eye,
  LockKeyhole,
  Mail,
  Plane,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { Checkbox } from "../components/ui/checkbox";

const stats = [
  { value: "180+", label: "Destinations", icon: Earth },
  { value: "12k+", label: "Agents Onboard", icon: TrendingUp },
  { value: "IATA", label: "Certified", icon: ShieldCheck },
];

const DEMO_EMAIL = "demo@skyblockb2b.com";
const DEMO_PASSWORD = "demo123";

export function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("Use demo@skyblockb2b.com and demo123 to continue.");
      return;
    }

    setIsSubmitting(true);
    router.push("/");
  }

  return (
    <main className="relative flex h-dvh min-h-dvh overflow-hidden bg-[var(--app-login-shell)] text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.88),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(247,118,74,0.18),transparent_30%)]" />

      <section className="relative grid h-dvh w-full lg:grid-cols-[minmax(0,1.06fr)_minmax(22rem,0.94fr)] xl:grid-cols-[minmax(0,1.04fr)_minmax(24rem,0.96fr)]">
        <div className="relative hidden overflow-hidden lg:block">
          <Image
            src="/login-hero.jpg"
            alt="Aircraft flying above sunset clouds"
            fill
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--primary) 75%, transparent) 0%, color-mix(in oklab, var(--magenta) 45%, transparent) 55%, color-mix(in oklab, var(--sunset) 40%, transparent) 100%)",
            }}
          />
          <div
            className="absolute -left-24 top-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "var(--magenta)", opacity: 0.45 }}
          />
          <div
            className="absolute -bottom-20 -right-10 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "var(--sunset)", opacity: 0.5 }}
          />

          <div className="relative z-10 flex h-full flex-col justify-between p-12 text-primary-foreground">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md ring-1 ring-white/30">
                <Plane className="h-5 w-5 -rotate-45" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                SkyBlock<span className="opacity-70">·B2B</span>
              </span>
            </div>

            <div className="max-w-md space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur-md ring-1 ring-white/25">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                Live inventory · 240+ carriers
              </span>

              <h1 className="font-[var(--font-sora)] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                Fixed-departure seats, group fares &amp; series blocks — booked in seconds.
              </h1>
              <p className="text-base text-white/85">
                The trusted B2B portal where travel agents secure guaranteed inventory on the
                world&apos;s busiest routes.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/20"
                  >
                    <Icon className="mb-2 h-4 w-4 opacity-90" />
                    <div className="text-lg font-semibold">{stat.value}</div>
                    <div className="text-[11px] uppercase tracking-wider text-white/75">
                      {stat.label}
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-white/70">
              © 2026 SkyBlock Aviation Services Pvt. Ltd.
            </p>
          </div>
        </div>

        <div className="relative flex h-dvh items-center justify-center px-[clamp(0.9rem,1.6vw,2rem)] py-[clamp(0.9rem,1.2vw,1.4rem)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(130,180,255,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(247,118,74,0.12),transparent_28%)]" />

          <div className="relative z-10 flex w-full max-w-[clamp(19.5rem,29vw,23rem)] flex-col justify-center">
            <div className="rounded-[clamp(1.2rem,1.6vw,1.65rem)] border border-white/70 bg-white/92 px-[clamp(1rem,1.4vw,1.75rem)] py-[clamp(1rem,1.4vw,1.5rem)] shadow-[0_26px_80px_rgba(74,91,139,0.18)] backdrop-blur-xl">
              <div className="inline-flex items-center rounded-full bg-[linear-gradient(90deg,#3b82f6_0%,#f97316_100%)] px-[clamp(0.75rem,1vw,0.95rem)] py-1 text-[clamp(0.56rem,0.62vw,0.66rem)] font-bold uppercase tracking-[0.14em] text-white">
                Agent Portal
              </div>

              <h2 className="mt-[clamp(0.75rem,1vw,0.95rem)] font-[var(--font-sora)] text-[clamp(1.65rem,2.2vw,2.05rem)] font-semibold tracking-[-0.05em] text-slate-950">
                Welcome back
              </h2>
              <p className="mt-2 text-[clamp(0.78rem,0.92vw,0.9rem)] leading-[1.45] text-slate-600">
                Sign in to manage your fixed departures, blocks and group bookings.
              </p>

              <form
                className="mt-[clamp(1rem,1.4vw,1.45rem)] space-y-[clamp(0.75rem,1vw,1rem)]"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="work-email"
                    className="mb-1.5 block text-[clamp(0.76rem,0.88vw,0.84rem)] font-semibold text-slate-800"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-[0.95rem] w-[0.95rem] -translate-y-1/2 text-slate-500" />
                    <input
                      id="work-email"
                      name="email"
                      type="email"
                      placeholder="agent@yourtravel.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="h-[clamp(2.55rem,3vw,2.9rem)] w-full rounded-[clamp(0.85rem,1vw,1rem)] border border-[rgba(183,197,222,0.48)] bg-[rgba(239,244,252,0.88)] pl-9 pr-4 text-[clamp(0.8rem,0.9vw,0.9rem)] text-slate-800 outline-none placeholder:text-slate-500 focus:border-[rgba(79,125,245,0.42)] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <label htmlFor="password" className="block text-[clamp(0.76rem,0.88vw,0.84rem)] font-semibold text-slate-800">
                      Password
                    </label>
                    <Link
                      href="mailto:support@skyblockb2b.com"
                      className="text-[clamp(0.72rem,0.82vw,0.8rem)] font-semibold text-indigo-700 hover:text-indigo-800"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-[0.95rem] w-[0.95rem] -translate-y-1/2 text-slate-500" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="**********"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="h-[clamp(2.55rem,3vw,2.9rem)] w-full rounded-[clamp(0.85rem,1vw,1rem)] border border-[rgba(183,197,222,0.48)] bg-[rgba(239,244,252,0.88)] pl-9 pr-9 text-[clamp(0.8rem,0.9vw,0.9rem)] text-slate-800 outline-none placeholder:text-slate-500 focus:border-[rgba(79,125,245,0.42)] focus:bg-white"
                    />
                    <Eye className="pointer-events-none absolute right-3 top-1/2 h-[0.95rem] w-[0.95rem] -translate-y-1/2 text-slate-500" />
                  </div>
                </div>

                <div className="rounded-[0.95rem] border border-[#d8e3f5] bg-[#f5f8ff] px-3 py-2.5 text-[0.74rem] leading-5 text-[#52627e]">
                  Demo login: <span className="font-semibold text-[#142546]">{DEMO_EMAIL}</span> /{" "}
                  <span className="font-semibold text-[#142546]">{DEMO_PASSWORD}</span>
                </div>

                {error ? (
                  <p className="text-[0.78rem] font-medium text-[#d6455d]">{error}</p>
                ) : null}

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="remember-me"
                    className="h-4 w-4 rounded-[5px] border-slate-400 data-[state=checked]:border-transparent"
                  />
                  <label htmlFor="remember-me" className="text-[clamp(0.74rem,0.84vw,0.82rem)] leading-5 text-slate-600">
                    Keep me signed in on this device
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-[clamp(2.55rem,3vw,2.9rem)] w-full items-center justify-center gap-2 rounded-[clamp(0.85rem,1vw,1rem)] bg-[linear-gradient(90deg,#2592ef_0%,#ec4899_54%,#ff7b3c_100%)] text-[clamp(0.8rem,0.92vw,0.9rem)] font-semibold text-white shadow-[0_16px_34px_rgba(245,104,88,0.28)] hover:-translate-y-0.5"
                >
                  {isSubmitting ? "Redirecting..." : "Sign in to portal"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <p className="mt-[clamp(0.8rem,1vw,1rem)] text-center text-[clamp(0.72rem,0.82vw,0.8rem)] leading-5 text-slate-500">
                New travel agency?{" "}
                <Link href="mailto:sales@skyblockb2b.com" className="font-semibold text-indigo-700">
                  Request access
                </Link>
              </p>
            </div>

            <div className="mt-[clamp(0.75rem,1vw,0.95rem)] flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[clamp(0.64rem,0.74vw,0.76rem)] text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
                256-bit secured
              </div>
              <Link href="#" className="hover:text-slate-700">
                Privacy
              </Link>
              <Link href="#" className="hover:text-slate-700">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
