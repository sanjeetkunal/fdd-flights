"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  Eye,
  LockKeyhole,
  Mail,
  Plane,
  Shield,
  ShieldCheck,
} from "lucide-react";

import { Checkbox } from "../components/ui/checkbox";

const stats = [
  { value: "180+", label: "Destinations" },
  { value: "12k+", label: "Agents Onboard" },
  { value: "IATA", label: "Certified" },
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
            alt="Airplane flying above clouds at sunset"
            fill
            priority
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--primary) 75%, transparent) 0%, color-mix(in oklab, var(--magenta) 45%, transparent) 55%, color-mix(in oklab, var(--sunset) 40%, transparent) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(155,92,255,0.34),transparent_36%),radial-gradient(circle_at_top_right,rgba(34,122,255,0.24),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,186,61,0.18),transparent_22%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,14,40,0.04)_0%,rgba(28,6,48,0.1)_50%,rgba(28,6,48,0.28)_100%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between px-[clamp(1.5rem,2vw,2.5rem)] py-[clamp(1.4rem,1.8vw,2rem)] text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-[clamp(2.1rem,2.2vw,2.5rem)] w-[clamp(2.1rem,2.2vw,2.5rem)] items-center justify-center rounded-2xl border border-white/20 bg-white/12 shadow-[0_14px_28px_rgba(38,9,77,0.18)] backdrop-blur-md">
                <Plane className="h-4 w-4" />
              </div>
              <span className="text-[clamp(1.15rem,1.5vw,1.5rem)] font-semibold tracking-tight">
                SkyBlock-B2B
              </span>
            </div>

            <div className="flex max-w-[clamp(24rem,38vw,34rem)] flex-1 flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/16 bg-white/14 px-[clamp(0.8rem,1vw,1rem)] py-[clamp(0.3rem,0.5vw,0.4rem)] text-[clamp(0.62rem,0.72vw,0.76rem)] font-semibold text-white/92 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
                Live inventory - 240+ carriers
              </div>

              <div className="mt-[clamp(1rem,1.4vw,1.3rem)] max-w-xl">
                <h1 className="max-w-[clamp(22rem,31vw,30rem)] font-[var(--font-sora)] text-[clamp(2rem,3vw,3.15rem)] font-semibold leading-[1.06] tracking-[-0.045em] text-white">
                  Fixed-departure seats, group fares &amp; series blocks booked in seconds.
                </h1>
                <p className="mt-[clamp(0.8rem,1vw,1rem)] max-w-[clamp(19rem,24vw,25rem)] text-[clamp(0.84rem,0.95vw,1rem)] leading-[1.6] text-white/84">
                  The trusted B2B portal where travel agents secure guaranteed inventory on the
                  world&apos;s busiest routes.
                </p>
              </div>

              <div className="mt-[clamp(1rem,1.5vw,1.5rem)] flex flex-wrap gap-2.5">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="min-w-[clamp(6.4rem,8vw,7.4rem)] rounded-[1.15rem] border border-white/14 bg-white/12 px-[clamp(0.8rem,1vw,1rem)] py-[clamp(0.7rem,0.9vw,0.9rem)] shadow-[0_18px_40px_rgba(90,18,64,0.16)] backdrop-blur-md"
                  >
                    <p className="text-[clamp(1.35rem,1.8vw,1.8rem)] font-semibold tracking-tight text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[clamp(0.58rem,0.7vw,0.72rem)] font-medium uppercase tracking-[0.08em] text-white/78">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[clamp(0.7rem,0.8vw,0.85rem)] text-white/72">
              (c) 2026 SkyBlock Aviation Services Pvt. Ltd.
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
                    Work email
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

              <div className="my-[clamp(0.8rem,1vw,1rem)] flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[clamp(0.58rem,0.68vw,0.68rem)] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Or
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <button
                type="button"
                className="flex h-[clamp(2.55rem,3vw,2.9rem)] w-full items-center justify-center gap-3 rounded-[clamp(0.85rem,1vw,1rem)] border border-[rgba(190,203,227,0.72)] bg-[rgba(244,247,253,0.92)] text-[clamp(0.8rem,0.92vw,0.9rem)] font-semibold text-slate-800 hover:bg-white"
              >
                <Shield className="h-4 w-4 text-indigo-700" />
                Continue with SSO
              </button>

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
