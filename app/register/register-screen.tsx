"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Copy,
  Earth,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Plane,
  ShieldCheck,
  TrendingUp,
  UserRound,
} from "lucide-react";

type Field = {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  colSpan?: boolean;
};

type FormState = {
  company_name: string;
  executive: string;
  mobile: string;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
};

type SuccessData = {
  agent_code: string;
  company_name: string;
  executive: string;
  email: string;
};

const INITIAL: FormState = {
  company_name: "",
  executive: "",
  mobile: "",
  email: "",
  password: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

const AGENCY_FIELDS: Field[] = [
  { id: "company_name", label: "Company / Agency name", placeholder: "Global Tours Pvt Ltd", colSpan: true },
  { id: "executive", label: "Contact executive", placeholder: "Amit Sharma" },
];

const CONTACT_FIELDS: Field[] = [
  { id: "mobile", label: "Mobile number", placeholder: "9876543210", type: "tel" },
  { id: "email", label: "Email address", placeholder: "agent@example.com", type: "email" },
];

const ADDRESS_FIELDS: Field[] = [
  { id: "address", label: "Street address", placeholder: "45 Brigade Road", colSpan: true },
  { id: "city", label: "City", placeholder: "Bengaluru" },
  { id: "state", label: "State", placeholder: "Karnataka" },
  { id: "pincode", label: "Pincode", placeholder: "560001" },
  { id: "country", label: "Country", placeholder: "India" },
];

function TextField({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (key: keyof FormState, value: string) => void;
}) {
  return (
    <label className={`block ${field.colSpan ? "sm:col-span-2" : ""}`}>
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a89a4]">
        {field.label}
      </span>
      <input
        type={field.type ?? "text"}
        placeholder={field.placeholder}
        value={value}
        required
        onChange={(e) => onChange(field.id as keyof FormState, e.target.value)}
        className="mt-2 h-12 w-full rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] px-4 text-sm text-[#101a34] outline-none placeholder:text-[#a8b8d0] focus:border-[#377ef6] focus:bg-white"
      />
    </label>
  );
}

function Section({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-[#d8e2f2] bg-white p-5 shadow-[0_14px_36px_rgba(62,92,144,0.07)] sm:p-6">
      <div className="flex items-start gap-3">
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${iconBg} ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-[#101a34]">{title}</h2>
          <p className="mt-0.5 text-sm text-[#697894]">{description}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export function RegisterScreen() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<SuccessData | null>(null);
  const [copied, setCopied] = useState(false);

  function update(key: keyof FormState, value: string) {
    setError("");
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, status: "active" }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message ?? "Registration failed. Please try again.");
        return;
      }

      setSuccess({
        agent_code: data.data.agent_code,
        company_name: data.data.company_name,
        executive: data.data.executive,
        email: data.data.email,
      });
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function copyCode() {
    if (!success) return;
    await navigator.clipboard.writeText(success.agent_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (success) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[var(--app-login-shell)] px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="rounded-3xl border border-[#d8e2f2] bg-white p-8 shadow-[0_26px_80px_rgba(74,91,139,0.14)]">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>

            <h1 className="mt-5 font-[var(--font-sora)] text-2xl font-semibold tracking-tight text-[#101a34]">
              Registration successful!
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#697894]">
              Welcome aboard, <strong className="text-[#101a34]">{success.executive}</strong>. Your agent account for{" "}
              <strong className="text-[#101a34]">{success.company_name}</strong> is now active.
            </p>

            <div className="mt-6 rounded-2xl bg-[#f0f6ff] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a89a4]">
                Your Agent Code
              </p>
              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="font-[var(--font-sora)] text-2xl font-bold tracking-widest text-[#377ef6]">
                  {success.agent_code}
                </span>
                <button
                  type="button"
                  onClick={copyCode}
                  aria-label="Copy agent code"
                  className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#7a89a4] shadow-sm ring-1 ring-[#d7e2f2] hover:text-[#377ef6]"
                >
                  {copied ? (
                    <BadgeCheck className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-xs text-[#7a89a4]">
                Keep this code safe — you&apos;ll need it to identify your account.
              </p>
            </div>

            <div className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-left text-xs text-amber-800">
              Login credentials have been sent to{" "}
              <span className="font-semibold">{success.email}</span>.
            </div>

            <Link
              href="/login"
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#2592ef_0%,#ec4899_54%,#ff7b3c_100%)] text-sm font-semibold text-white shadow-[0_16px_34px_rgba(245,104,88,0.22)]"
            >
              Sign in to your account
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[var(--app-login-shell)]">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8 lg:py-12">
        {/* Left branding panel */}
        <aside className="mb-8 lg:mb-0 lg:sticky lg:top-12 lg:self-start">
          <div className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#1a3a6b_0%,#2563eb_50%,#7c3aed_100%)] p-8 text-white shadow-[0_26px_60px_rgba(37,99,235,0.25)]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md ring-1 ring-white/30">
                <Plane className="h-5 w-5 -rotate-45" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                SkyBlock<span className="opacity-70">·B2B</span>
              </span>
            </div>

            <h1 className="mt-8 font-[var(--font-sora)] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Join the fastest-growing B2B flight network.
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/80">
              Register your travel agency and unlock live inventory, group fares, and fixed-departure
              blocks across 240+ carriers — all in one portal.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { icon: TrendingUp, title: "Live seat inventory", desc: "Real-time availability on 10,000+ routes" },
                { icon: Earth, title: "180+ destinations", desc: "Domestic & international blocks" },
                { icon: ShieldCheck, title: "IATA certified platform", desc: "Secure, audited, and compliant" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/15">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-white/70">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-8 text-xs text-white/60">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-white underline underline-offset-2">
                Sign in here
              </Link>
            </p>
          </div>
        </aside>

        {/* Right form panel */}
        <div className="space-y-4">
          <header className="rounded-3xl bg-[linear-gradient(135deg,#29114e_0%,#5d2b91_55%,#7c3aed_100%)] p-6 text-white shadow-[0_18px_45px_rgba(76,29,149,0.2)]">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
              <UserRound className="h-4 w-4" />
              Agent registration
            </div>
            <h2 className="mt-3 font-[var(--font-sora)] text-2xl font-semibold tracking-tight sm:text-3xl">
              Create your agency account
            </h2>
            <p className="mt-1.5 text-sm text-white/75">
              Fill in your agency details to get your unique agent code and portal access.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Section
              icon={Building2}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
              title="Agency details"
              description="Your company name and primary contact person."
            >
              {AGENCY_FIELDS.map((field) => (
                <TextField
                  key={field.id}
                  field={field}
                  value={form[field.id as keyof FormState]}
                  onChange={update}
                />
              ))}
            </Section>

            <Section
              icon={Phone}
              iconBg="bg-[#f1edff]"
              iconColor="text-[#6d28d9]"
              title="Contact & login credentials"
              description="Used for login and booking notifications."
            >
              {CONTACT_FIELDS.map((field) => (
                <TextField
                  key={field.id}
                  field={field}
                  value={form[field.id as keyof FormState]}
                  onChange={update}
                />
              ))}

              {/* Password field with toggle */}
              <label className="block sm:col-span-2">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a89a4]">
                  Password
                </span>
                <div className="relative mt-2">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a8b8d0]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 characters"
                    value={form.password}
                    required
                    minLength={8}
                    onChange={(e) => update("password", e.target.value)}
                    className="h-12 w-full rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] pl-11 pr-12 text-sm text-[#101a34] outline-none placeholder:text-[#a8b8d0] focus:border-[#377ef6] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a8b8d0] hover:text-[#697894]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>
            </Section>

            <Section
              icon={MapPin}
              iconBg="bg-amber-50"
              iconColor="text-amber-600"
              title="Registered address"
              description="Your agency's official correspondence address."
            >
              {ADDRESS_FIELDS.map((field) => (
                <TextField
                  key={field.id}
                  field={field}
                  value={form[field.id as keyof FormState]}
                  onChange={update}
                />
              ))}
            </Section>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-[#d6455d]">
                {error}
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-[#697894]">
                Already registered?{" "}
                <Link href="/login" className="font-semibold text-[#377ef6] hover:text-blue-700">
                  Sign in
                </Link>
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-12 items-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#2592ef_0%,#ec4899_54%,#ff7b3c_100%)] px-7 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(245,104,88,0.22)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Registering..." : "Register agency"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <p className="pb-4 text-center text-xs text-[#a8b8d0]">
            By registering, you agree to our{" "}
            <Link href="#" className="underline underline-offset-2 hover:text-[#697894]">Terms of Service</Link>
            {" "}and{" "}
            <Link href="#" className="underline underline-offset-2 hover:text-[#697894]">Privacy Policy</Link>.
            <br />
            © 2026 SkyBlock Aviation Services Pvt. Ltd.
          </p>
        </div>
      </div>
    </main>
  );
}
