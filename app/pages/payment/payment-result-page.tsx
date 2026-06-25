"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Clock3,
  Download,
  Home,
  RefreshCw,
  ShieldCheck,
  X,
} from "lucide-react";

type PaymentStatus = "success" | "failed" | "pending";

type PaymentResultPageProps = {
  status: PaymentStatus;
  amount: string;
  bookingReference: string;
  flightRoute: string;
};

const resultContent = {
  success: {
    eyebrow: "Payment confirmed",
    title: "Payment successful",
    description:
      "Your payment has been received. The booking is confirmed and the ticketing process has started.",
    note: "A confirmation email and e-ticket will be shared with the registered contact.",
    Icon: Check,
    accent: "#12a272",
    softAccent: "#e9fbf4",
    ring: "rgba(18,162,114,0.18)",
  },
  failed: {
    eyebrow: "Payment declined",
    title: "Payment failed",
    description:
      "We could not complete this payment. No amount has been charged to your account.",
    note: "Please check your payment details or try another payment method.",
    Icon: X,
    accent: "#e34862",
    softAccent: "#fff0f3",
    ring: "rgba(227,72,98,0.17)",
  },
  pending: {
    eyebrow: "Awaiting confirmation",
    title: "Payment pending",
    description:
      "Your bank is still processing this transaction. We will update the booking as soon as a response is received.",
    note: "Please do not make another payment while this transaction is being verified.",
    Icon: Clock3,
    accent: "#e99a19",
    softAccent: "#fff8e8",
    ring: "rgba(233,154,25,0.18)",
  },
} satisfies Record<
  PaymentStatus,
  {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
    Icon: typeof Check;
    accent: string;
    softAccent: string;
    ring: string;
  }
>;

function formatAmount(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? `Rs. ${parsed.toLocaleString("en-IN")}` : `Rs. ${value}`;
}

export function PaymentResultPage({
  status,
  amount,
  bookingReference,
  flightRoute,
}: PaymentResultPageProps) {
  const content = resultContent[status];
  const Icon = content.Icon;
  const isPending = status === "pending";

  return (
    <main className="relative isolate flex min-h-[calc(100dvh-8rem)] items-center overflow-hidden bg-[#f4f7fc] px-4 py-10 sm:px-6">
      <div
        className="pointer-events-none absolute left-[-8rem] top-[-10rem] h-96 w-96 rounded-full blur-3xl"
        style={{ backgroundColor: content.ring }}
      />
      <div className="pointer-events-none absolute bottom-[-14rem] right-[-9rem] h-[30rem] w-[30rem] rounded-full bg-[#e8e5ff] opacity-70 blur-3xl" />

      <section className="payment-result-enter relative mx-auto w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_30px_80px_rgba(57,72,110,0.14)]">
        <div className="h-1.5 w-full bg-[#edf1f8]">
          <div
            className={`h-full ${isPending ? "payment-pending-bar" : "payment-result-bar"}`}
            style={{ backgroundColor: content.accent }}
          />
        </div>

        <div className="px-5 py-9 text-center sm:px-10 sm:py-12">
          <div className="relative mx-auto grid h-32 w-32 place-items-center">
            <span
              className={`absolute inset-0 rounded-full ${
                isPending ? "payment-pulse" : "payment-ring-expand"
              }`}
              style={{ backgroundColor: content.ring }}
            />
            <span
              className="payment-icon-pop relative grid h-24 w-24 place-items-center rounded-full"
              style={{
                backgroundColor: content.softAccent,
                color: content.accent,
                boxShadow: `0 18px 42px ${content.ring}`,
              }}
            >
              <Icon className={`h-11 w-11 ${isPending ? "payment-clock" : ""}`} strokeWidth={2.5} />
            </span>
            {status === "success" ? (
              <>
                <span className="payment-spark payment-spark-one" style={{ background: content.accent }} />
                <span className="payment-spark payment-spark-two" style={{ background: "#5b8cff" }} />
                <span className="payment-spark payment-spark-three" style={{ background: "#ff7b42" }} />
              </>
            ) : null}
          </div>

          <p
            className="mt-5 text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: content.accent }}
          >
            {content.eyebrow}
          </p>
          <h1 className="mt-3 font-[var(--font-sora)] text-3xl font-semibold tracking-[-0.05em] text-[#101a34] sm:text-5xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#657590] sm:text-base">
            {content.description}
          </p>

          <div className="mx-auto mt-8 grid max-w-xl gap-3 rounded-3xl border border-[#e5ebf5] bg-[#f8faff] p-4 text-left sm:grid-cols-3 sm:p-5">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8996aa]">
                Amount
              </p>
              <p className="mt-1 font-semibold text-[#101a34]">{formatAmount(amount)}</p>
            </div>
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8996aa]">
                Booking ID
              </p>
              <p className="mt-1 font-semibold text-[#101a34]">{bookingReference}</p>
            </div>
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#8996aa]">
                Flight
              </p>
              <p className="mt-1 font-semibold text-[#101a34]">{flightRoute}</p>
            </div>
          </div>

          <div
            className="mx-auto mt-4 flex max-w-xl items-start gap-3 rounded-2xl px-4 py-3 text-left"
            style={{ backgroundColor: content.softAccent, color: content.accent }}
          >
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm leading-6">{content.note}</p>
          </div>

          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
            {status === "success" ? (
              <>
                <Link
                  href="/dashboard/bookings/my-bookings"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#101a34] px-6 text-sm font-semibold text-white hover:bg-[#1c2947]"
                >
                  <Download className="h-4 w-4" />
                  View booking
                </Link>
                <Link
                  href="/"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#d8e1ef] bg-white px-6 text-sm font-semibold text-[#31456d] hover:bg-[#f8faff]"
                >
                  <Home className="h-4 w-4" />
                  Back to home
                </Link>
              </>
            ) : status === "failed" ? (
              <>
                <Link
                  href="/payment/payment-gateway"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#101a34] px-6 text-sm font-semibold text-white hover:bg-[#1c2947]"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try payment again
                </Link>
                <Link
                  href="/"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#d8e1ef] bg-white px-6 text-sm font-semibold text-[#31456d] hover:bg-[#f8faff]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to home
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#101a34] px-6 text-sm font-semibold text-white hover:bg-[#1c2947]"
                >
                  <RefreshCw className="h-4 w-4" />
                  Check payment status
                </button>
                <Link
                  href="/dashboard/bookings/my-bookings"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#d8e1ef] bg-white px-6 text-sm font-semibold text-[#31456d] hover:bg-[#f8faff]"
                >
                  View my bookings
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
