"use client";

import { FormEvent, useState } from "react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Camera,
  Check,
  CircleDollarSign,
  FileCheck2,
  Mail,
  MapPin,
  Phone,
  Plane,
  Save,
  ShieldCheck,
  Ticket,
  UserRound,
} from "lucide-react";

import { DashboardSidebar } from "./dashboard-sidebar";

type ProfileData = {
  firstName: string;
  lastName: string;
  designation: string;
  email: string;
  phone: string;
  alternatePhone: string;
  agencyName: string;
  agencyCode: string;
  gstNumber: string;
  panNumber: string;
  iataNumber: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
};

const initialProfile: ProfileData = {
  firstName: "Sanjeet",
  lastName: "Kunal",
  designation: "Agency Administrator",
  email: "skyline@agency.com",
  phone: "+91 98765 43210",
  alternatePhone: "+91 98110 22334",
  agencyName: "Skyline Holidays Pvt. Ltd.",
  agencyCode: "SKY-DEL-4821",
  gstNumber: "07ABCDE1234F1Z5",
  panNumber: "ABCDE1234F",
  iataNumber: "14382910",
  address: "Unit 402, Travel Trade Centre, Connaught Place",
  city: "New Delhi",
  state: "Delhi",
  postalCode: "110001",
};

function Field({
  label,
  value,
  onChange,
  type = "text",
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  readOnly?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a89a4]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        readOnly={readOnly}
        onChange={(event) => onChange(event.target.value)}
        className={`mt-2 h-12 w-full rounded-2xl border px-4 text-sm text-[#101a34] outline-none ${
          readOnly
            ? "cursor-not-allowed border-[#e3e9f3] bg-[#f1f4f9] text-[#7a89a4]"
            : "border-[#d7e2f2] bg-[#f8fbff] focus:border-[#7c3aed] focus:bg-white"
        }`}
      />
    </label>
  );
}

export function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  function updateProfile(field: keyof ProfileData, value: string) {
    setSaved(false);
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <main className="min-h-screen bg-[#eef4ff] px-3 py-4 sm:px-5 lg:px-6">
      <div className="mx-auto flex w-full max-w-[1440px] gap-4">
        <DashboardSidebar />

        <section className="min-w-0 flex-1 space-y-4">
          <header className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#29114e_0%,#5d2b91_55%,#7c3aed_100%)] p-6 text-white shadow-[0_18px_45px_rgba(76,29,149,0.2)] sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
                  <UserRound className="h-4 w-4" />
                  Account profile
                </div>
                <h1 className="mt-4 font-[var(--font-sora)] text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  My Profile
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                  Manage your personal information, agency credentials, and billing identity.
                </p>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-4 py-3">
                <ShieldCheck className="h-6 w-6 text-emerald-300" />
                <div>
                  <p className="text-sm font-semibold">Verified agency account</p>
                  <p className="mt-0.5 text-xs text-white/70">KYC completed on 18 May 2026</p>
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
            <aside className="space-y-4">
              <section className="rounded-3xl border border-[#d8e2f2] bg-white p-6 text-center shadow-[0_14px_36px_rgba(62,92,144,0.07)]">
                <div className="relative mx-auto w-fit">
                  <div className="grid h-28 w-28 place-items-center rounded-full bg-[linear-gradient(135deg,#6d28d9_0%,#9f67f5_100%)] text-3xl font-semibold text-white shadow-[0_18px_38px_rgba(109,40,217,0.24)]">
                    SK
                  </div>
                  <button
                    type="button"
                    aria-label="Change profile photo"
                    className="absolute bottom-0 right-0 grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-[#101a34] text-white"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-[#101a34]">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="mt-1 text-sm text-[#697894]">{profile.designation}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <BadgeCheck className="h-4 w-4" />
                  Agency Admin
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[#f8faff] p-3">
                    <Ticket className="mx-auto h-5 w-5 text-[#6d28d9]" />
                    <p className="mt-2 text-xl font-semibold text-[#101a34]">128</p>
                    <p className="text-xs text-[#7a89a4]">Bookings</p>
                  </div>
                  <div className="rounded-2xl bg-[#f8faff] p-3">
                    <CircleDollarSign className="mx-auto h-5 w-5 text-emerald-600" />
                    <p className="mt-2 text-xl font-semibold text-[#101a34]">Rs. 12.8L</p>
                    <p className="text-xs text-[#7a89a4]">Sales</p>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-[#d8e2f2] bg-white p-5 shadow-[0_14px_36px_rgba(62,92,144,0.07)]">
                <h2 className="font-semibold text-[#101a34]">Verification status</h2>
                <div className="mt-4 space-y-3">
                  {[
                    { label: "Email address", icon: Mail },
                    { label: "Mobile number", icon: Phone },
                    { label: "GST certificate", icon: FileCheck2 },
                    { label: "Agency KYC", icon: ShieldCheck },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-[#f8faff] p-3">
                        <Icon className="h-4 w-4 text-[#6d28d9]" />
                        <span className="flex-1 text-sm font-medium text-[#31456d]">{item.label}</span>
                        <Check className="h-4 w-4 text-emerald-600" />
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-blue-900">
                <CalendarDays className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold">Member since</p>
                  <p className="mt-1 text-sm">12 January 2023</p>
                </div>
              </section>
            </aside>

            <form onSubmit={saveProfile} className="space-y-4">
              {saved ? (
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800">
                  <Check className="h-5 w-5" />
                  <p className="text-sm font-semibold">Profile changes saved successfully.</p>
                </div>
              ) : null}

              <section className="rounded-3xl border border-[#d8e2f2] bg-white p-5 shadow-[0_14px_36px_rgba(62,92,144,0.07)] sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f1edff] text-[#6d28d9]">
                    <UserRound className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#101a34]">Personal information</h2>
                    <p className="mt-1 text-sm text-[#697894]">
                      Details used for account communication and booking ownership.
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="First name"
                    value={profile.firstName}
                    onChange={(value) => updateProfile("firstName", value)}
                  />
                  <Field
                    label="Last name"
                    value={profile.lastName}
                    onChange={(value) => updateProfile("lastName", value)}
                  />
                  <Field
                    label="Designation"
                    value={profile.designation}
                    onChange={(value) => updateProfile("designation", value)}
                  />
                  <Field
                    label="Email address"
                    type="email"
                    value={profile.email}
                    onChange={(value) => updateProfile("email", value)}
                  />
                  <Field
                    label="Mobile number"
                    type="tel"
                    value={profile.phone}
                    onChange={(value) => updateProfile("phone", value)}
                  />
                  <Field
                    label="Alternate number"
                    type="tel"
                    value={profile.alternatePhone}
                    onChange={(value) => updateProfile("alternatePhone", value)}
                  />
                </div>
              </section>

              <section className="rounded-3xl border border-[#d8e2f2] bg-white p-5 shadow-[0_14px_36px_rgba(62,92,144,0.07)] sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#101a34]">Agency information</h2>
                    <p className="mt-1 text-sm text-[#697894]">
                      Legal and commercial details used on invoices and settlements.
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Agency name"
                    value={profile.agencyName}
                    onChange={(value) => updateProfile("agencyName", value)}
                  />
                  <Field
                    label="Agency code"
                    value={profile.agencyCode}
                    readOnly
                    onChange={() => undefined}
                  />
                  <Field
                    label="GST number"
                    value={profile.gstNumber}
                    onChange={(value) => updateProfile("gstNumber", value)}
                  />
                  <Field
                    label="PAN number"
                    value={profile.panNumber}
                    onChange={(value) => updateProfile("panNumber", value)}
                  />
                  <Field
                    label="IATA number"
                    value={profile.iataNumber}
                    onChange={(value) => updateProfile("iataNumber", value)}
                  />
                </div>
              </section>

              <section className="rounded-3xl border border-[#d8e2f2] bg-white p-5 shadow-[0_14px_36px_rgba(62,92,144,0.07)] sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-50 text-amber-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#101a34]">Registered address</h2>
                    <p className="mt-1 text-sm text-[#697894]">
                      Primary billing and agency correspondence address.
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a89a4]">
                      Address
                    </span>
                    <textarea
                      value={profile.address}
                      onChange={(event) => updateProfile("address", event.target.value)}
                      className="mt-2 min-h-24 w-full rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] px-4 py-3 text-sm text-[#101a34] outline-none focus:border-[#7c3aed] focus:bg-white"
                    />
                  </label>
                  <Field
                    label="City"
                    value={profile.city}
                    onChange={(value) => updateProfile("city", value)}
                  />
                  <Field
                    label="State"
                    value={profile.state}
                    onChange={(value) => updateProfile("state", value)}
                  />
                  <Field
                    label="Postal code"
                    value={profile.postalCode}
                    onChange={(value) => updateProfile("postalCode", value)}
                  />
                </div>
              </section>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#6d28d9_0%,#8b5cf6_100%)] px-6 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(109,40,217,0.22)]"
                >
                  <Save className="h-4 w-4" />
                  Save profile changes
                </button>
              </div>
            </form>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Plane, label: "Preferred departure", value: "Delhi (DEL)" },
              { icon: BriefcaseBusiness, label: "Account type", value: "B2B Agency" },
              { icon: BadgeCheck, label: "Verification", value: "Fully verified" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-[#d8e2f2] bg-white p-4">
                  <Icon className="h-5 w-5 text-[#6d28d9]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.1em] text-[#7a89a4]">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-[#101a34]">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
