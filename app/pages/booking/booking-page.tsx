import Link from "next/link";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  Mail,
  Phone,
  PlaneTakeoff,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

import { DobPickerField } from "./dob-picker-field";

type BookingPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

type PassengerType = "Adult" | "Child" | "Infant";

function getValue(value: string | string[] | undefined, fallback: string) {
  if (Array.isArray(value)) {
    return value[0] ?? fallback;
  }

  return value ?? fallback;
}

function getCount(value: string | string[] | undefined, fallback: number) {
  const parsed = Number.parseInt(getValue(value, String(fallback)), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function formatPrice(value: number) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

function buildPassengers(type: PassengerType, count: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${type.toLowerCase()}-${index + 1}`,
    type,
    label: `${type} ${index + 1}`,
  }));
}

function InputField({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="space-y-2">
      <span className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
        {label}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] px-4 text-sm text-[#11203f] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4c46c7] focus:bg-white"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="space-y-2">
      <span className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
        {label}
      </span>
      <select
        name={name}
        className="h-12 w-full rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] px-4 text-sm text-[#11203f] outline-none transition focus:border-[#4c46c7] focus:bg-white"
        defaultValue=""
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export async function BookingPage({ searchParams }: BookingPageProps) {
  const params = (await searchParams) ?? {};

  const airline = getValue(params.airline, "Selected airline");
  const code = getValue(params.code, "--");
  const from = getValue(params.from, "---");
  const to = getValue(params.to, "---");
  const date = getValue(params.date, "TBD");
  const baseFare = Number(getValue(params.price, "0")) || 0;
  const adults = getCount(params.adults, 1);
  const children = getCount(params.children, 0);
  const infants = getCount(params.infants, 0);

  const adultTotal = adults * baseFare;
  const childFare = Math.round(baseFare * 0.78);
  const infantFare = Math.round(baseFare * 0.18);
  const childTotal = children * childFare;
  const infantTotal = infants * infantFare;
  const serviceFee = 650;
  const grandTotal = adultTotal + childTotal + infantTotal + serviceFee;
  const totalTravellers = adults + children + infants;

  const passengerCards = [
    ...buildPassengers("Adult", adults),
    ...buildPassengers("Child", children),
    ...buildPassengers("Infant", infants),
  ];

  const progressSteps = [
    { label: "Booking", active: true },
    { label: "Purchase", active: false },
    { label: "E-ticket", active: false },
  ];

  return (
    <main className="min-h-[calc(100dvh-8rem)] bg-[#eef4ff] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-[1.8rem] border border-[#d7e2f2] bg-white px-5 py-5 shadow-[0_18px_48px_rgba(62,92,144,0.06)] sm:px-6">
          <div className="flex flex-wrap items-center gap-4">
            {progressSteps.map((step, index) => (
              <div key={step.label} className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold ${
                      step.active
                        ? "bg-[linear-gradient(90deg,#2f91f1_0%,#e641a4_54%,#ff7b42_100%)] text-white"
                        : "bg-[#edf2fa] text-[#71829d]"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#11203f]">{step.label}</p>
                    <p className="text-xs text-[#6f7d97]">
                      {index === 0
                        ? "Traveller details"
                        : index === 1
                          ? "Payment and issue"
                          : "Final confirmation"}
                    </p>
                  </div>
                </div>
                {index < progressSteps.length - 1 ? (
                  <div className="hidden h-px w-12 bg-[#d7e2f2] lg:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] border border-[#d7e2f2] bg-white shadow-[0_24px_60px_rgba(62,92,144,0.08)]">
              <div className="bg-[linear-gradient(90deg,#2f91f1_0%,#e641a4_54%,#ff7b42_100%)] px-6 py-6 text-white sm:px-8">
                <div className="flex flex-col gap-5">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/90">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      B2B flight booking
                    </div>
                    <h1 className="mt-4 font-[var(--font-sora)] text-[clamp(2rem,3vw,3rem)] font-semibold tracking-[-0.05em]">
                      {from} to {to}
                    </h1>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-white/85 sm:text-base">
                      Capture traveller details, contact details, and GST info in one clean
                      booking workspace built for travel agents.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 px-6 py-6 sm:px-8 md:grid-cols-3">
                <div className="rounded-[1.4rem] border border-[#e7edf8] bg-[#fbfdff] px-4 py-4">
                  <div className="text-[0.68rem] uppercase tracking-[0.14em] text-[#7a89a4]">
                    Airline
                  </div>
                  <div className="mt-1 text-lg font-semibold text-[#11203f]">
                    {airline} <span className="text-[#6f7d97]">({code})</span>
                  </div>
                </div>
                <div className="rounded-[1.4rem] border border-[#e7edf8] bg-[#fbfdff] px-4 py-4">
                  <div className="text-[0.68rem] uppercase tracking-[0.14em] text-[#7a89a4]">
                    Travel date
                  </div>
                  <div className="mt-1 text-lg font-semibold text-[#11203f]">{date}</div>
                </div>
                <div className="rounded-[1.4rem] border border-[#e7edf8] bg-[#fbfdff] px-4 py-4">
                  <div className="text-[0.68rem] uppercase tracking-[0.14em] text-[#7a89a4]">
                    Traveller mix
                  </div>
                  <div className="mt-1 text-lg font-semibold text-[#11203f]">
                    {totalTravellers} Pax
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <section className="rounded-[1.8rem] border border-[#d7e2f2] bg-white p-6 shadow-[0_18px_48px_rgba(62,92,144,0.06)] sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,#2f91f1_0%,#e641a4_100%)] text-white">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-[var(--font-sora)] text-2xl font-semibold tracking-[-0.04em] text-[#11203f]">
                      Passenger details
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-[#60718e]">
                      Fill names exactly as per passport or government ID. Passenger fields are
                      opened automatically based on the selected pax count.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {passengerCards.map((passenger) => (
                    <div
                      key={passenger.id}
                      className="rounded-[1.4rem] border border-[#e7edf8] bg-[#fbfdff] p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#4c46c7] shadow-[0_10px_24px_rgba(62,92,144,0.06)]">
                            <UserRound className="h-3.5 w-3.5" />
                            {passenger.label}
                          </div>
                          <p className="mt-2 text-sm text-[#6f7d97]">
                            Enter traveller name, title and date of birth carefully for ticketing.
                          </p>
                        </div>
                        <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          {passenger.type}
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-4">
                        <SelectField
                          label="Title"
                          name={`${passenger.id}-title`}
                          options={
                            passenger.type === "Adult"
                              ? ["Mr", "Ms", "Mrs"]
                              : passenger.type === "Child"
                                ? ["Mstr", "Miss"]
                                : ["Inf"]
                          }
                        />
                        <div className="md:col-span-1">
                          <InputField
                            label="First name"
                            name={`${passenger.id}-first-name`}
                            placeholder="Enter first name"
                          />
                        </div>
                        <div className="md:col-span-1">
                          <InputField
                            label="Last name"
                            name={`${passenger.id}-last-name`}
                            placeholder="Enter last name"
                          />
                        </div>
                        <DobPickerField
                          label="Date of birth"
                          name={`${passenger.id}-dob`}
                          passengerType={passenger.type}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[1.8rem] border border-[#d7e2f2] bg-white p-6 shadow-[0_18px_48px_rgba(62,92,144,0.06)] sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#eef1ff] text-[#4c46c7]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-[var(--font-sora)] text-2xl font-semibold tracking-[-0.04em] text-[#11203f]">
                      Contact details
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-[#60718e]">
                      Use the agency or traveller contact that should receive booking updates and
                      airline communication.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                      Email
                    </span>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b89a4]" />
                      <input
                        name="contact-email"
                        type="email"
                        placeholder="agent@company.com"
                        className="h-12 w-full rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] pl-11 pr-4 text-sm text-[#11203f] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4c46c7] focus:bg-white"
                      />
                    </div>
                  </label>

                  <label className="space-y-2">
                    <span className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                      Phone number
                    </span>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b89a4]" />
                      <input
                        name="contact-phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="h-12 w-full rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] pl-11 pr-4 text-sm text-[#11203f] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4c46c7] focus:bg-white"
                      />
                    </div>
                  </label>
                </div>
              </section>

              <section className="rounded-[1.8rem] border border-[#d7e2f2] bg-white p-6 shadow-[0_18px_48px_rgba(62,92,144,0.06)] sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#fff2ea] text-[#f06a2e]">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-[var(--font-sora)] text-2xl font-semibold tracking-[-0.04em] text-[#11203f]">
                      GST details
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-[#60718e]">
                      Add billing details for agency invoicing and tax-compliant B2B settlement.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <InputField label="GST number" name="gst-number" placeholder="27ABCDE1234F1Z5" />
                  <InputField
                    label="Registered company name"
                    name="gst-company-name"
                    placeholder="Enter legal company name"
                  />
                  <div className="md:col-span-2">
                    <label className="space-y-2">
                      <span className="text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                        Billing address
                      </span>
                      <textarea
                        name="billing-address"
                        placeholder="Enter GST billing address"
                        className="min-h-28 w-full rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] px-4 py-3 text-sm text-[#11203f] outline-none transition placeholder:text-[#94a3b8] focus:border-[#4c46c7] focus:bg-white"
                      />
                    </label>
                  </div>
                </div>
              </section>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Link
                  href="/"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[#d7e2f2] bg-white px-6 text-sm font-semibold text-[#31456d] transition hover:bg-[#f7faff]"
                >
                  Back to inventory
                </Link>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[linear-gradient(90deg,#2f91f1_0%,#e641a4_54%,#ff7b42_100%)] px-8 text-sm font-semibold text-white shadow-[0_16px_28px_rgba(234,72,150,0.22)]"
                >
                  Continue to purchase
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.8rem] border border-[#d7e2f2] bg-white p-5 shadow-[0_18px_48px_rgba(62,92,144,0.06)]">
              <div className="flex items-center gap-2 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                <PlaneTakeoff className="h-4 w-4 text-[#4c46c7]" />
                Selected flight
              </div>

              <div className="mt-4 rounded-[1.4rem] border border-[#e7edf8] bg-[#fbfdff] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#1c4ed8] text-sm font-bold text-white">
                      {code}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-[#11203f]">{airline}</p>
                      <p className="mt-1 text-sm text-[#6f7d97]">Business</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Live seats
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                  <div>
                    <p className="text-lg font-semibold text-[#11203f]">{from}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#7a89a4]">
                      Departure
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a89a4]">
                      Direct
                    </span>
                    <div className="flex items-center gap-2 text-[#7282bf]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2f91f1]" />
                      <span className="text-xs">✈</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ff7b42]" />
                    </div>
                    <span className="text-xs text-[#6f7d97]">{date}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-[#11203f]">{to}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#7a89a4]">
                      Arrival
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white px-3 py-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a89a4]">
                      <CalendarDays className="h-3.5 w-3.5 text-[#4c46c7]" />
                      Date
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[#11203f]">{date}</p>
                  </div>
                  <div className="rounded-2xl bg-white px-3 py-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a89a4]">
                      <Users className="h-3.5 w-3.5 text-[#4c46c7]" />
                      Pax
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[#11203f]">
                      {totalTravellers} Travellers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-[#d7e2f2] bg-white p-5 shadow-[0_18px_48px_rgba(62,92,144,0.06)]">
              <div className="flex items-center gap-2 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                <CreditCard className="h-4 w-4 text-[#4c46c7]" />
                Fare breakup
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-[#f8fbff] px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-[#11203f]">Adult fare</p>
                    <p className="text-xs text-[#6f7d97]">
                      {adults} x {formatPrice(baseFare)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#11203f]">
                    {formatPrice(adultTotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#f8fbff] px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-[#11203f]">Child fare</p>
                    <p className="text-xs text-[#6f7d97]">
                      {children} x {formatPrice(childFare)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#11203f]">
                    {formatPrice(childTotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#f8fbff] px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-[#11203f]">Infant fare</p>
                    <p className="text-xs text-[#6f7d97]">
                      {infants} x {formatPrice(infantFare)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-[#11203f]">
                    {formatPrice(infantTotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#f8fbff] px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-[#11203f]">Service fee</p>
                    <p className="text-xs text-[#6f7d97]">Agency handling & fulfilment</p>
                  </div>
                  <span className="text-sm font-semibold text-[#11203f]">
                    {formatPrice(serviceFee)}
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-[1.4rem] bg-[linear-gradient(90deg,#2f91f1_0%,#e641a4_54%,#ff7b42_100%)] px-4 py-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white/85">Grand total</span>
                  <span className="text-2xl font-semibold tracking-[-0.05em]">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-white/80">
                  Taxes are treated as included in the negotiated B2B net fare for this mock flow.
                </p>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-[#d7e2f2] bg-white p-5 shadow-[0_18px_48px_rgba(62,92,144,0.06)]">
              <div className="flex items-center gap-2 text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                <FileText className="h-4 w-4 text-[#4c46c7]" />
                Agent notes
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "Passenger names must match passport exactly.",
                  "Use agency contact details for queue and schedule change alerts.",
                  "GST section helps align invoicing for B2B settlement.",
                ].map((note) => (
                  <div
                    key={note}
                    className="flex items-start gap-3 rounded-2xl border border-[#edf2fa] bg-[#fbfdff] px-4 py-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <p className="text-sm leading-6 text-[#60718e]">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
