"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  CreditCard,
  IndianRupee,
  Landmark,
  LockKeyhole,
  Plus,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  WalletCards,
} from "lucide-react";

type PaymentView = "wallet" | "gateway";
type GatewayMethod = "card" | "upi" | "net-banking";

type PaymentPageProps = {
  view: PaymentView;
};

const transactions = [
  {
    title: "Flight booking - DEL to DXB",
    reference: "FDD-240615-128",
    date: "10 Jun, 2026",
    amount: "- Rs. 42,850",
    type: "debit",
  },
  {
    title: "Wallet top-up",
    reference: "WLT-240614-091",
    date: "09 Jun, 2026",
    amount: "+ Rs. 75,000",
    type: "credit",
  },
  {
    title: "Booking refund - BOM to LHR",
    reference: "RFD-240611-044",
    date: "07 Jun, 2026",
    amount: "+ Rs. 18,450",
    type: "credit",
  },
];

const gatewayMethods = [
  { id: "card" as const, label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi" as const, label: "UPI", icon: Smartphone },
  { id: "net-banking" as const, label: "Net Banking", icon: Landmark },
];

function formatAmount(value: number) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

export function PaymentPage({ view }: PaymentPageProps) {
  const router = useRouter();
  const [walletBalance, setWalletBalance] = useState(128450);
  const [topUpAmount, setTopUpAmount] = useState(25000);
  const [gatewayMethod, setGatewayMethod] = useState<GatewayMethod>("card");
  const [paymentComplete, setPaymentComplete] = useState(false);

  const isWallet = view === "wallet";

  function handleWalletTopUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setWalletBalance((current) => current + topUpAmount);
    setPaymentComplete(true);
  }

  function handleGatewayPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(
      "/payment/status/success?amount=42850&booking=FDD-240615-128&route=DEL%20to%20DXB",
    );
  }

  return (
    <main className="min-h-screen bg-[#eef4ff] px-3 py-4 sm:px-5 lg:px-6">
      <section className="mx-auto w-full max-w-7xl space-y-4">
          <header className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#29114e_0%,#5d2b91_55%,#7c3aed_100%)] p-6 text-white shadow-[0_18px_45px_rgba(76,29,149,0.2)] sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/85">
                  <ShieldCheck className="h-4 w-4" />
                  Secure payments
                </div>
                <h1 className="mt-4 font-[var(--font-sora)] text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                  {isWallet ? "Agency Wallet" : "Payment Gateway"}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
                  {isWallet
                    ? "Add funds, monitor wallet activity, and keep booking payments ready."
                    : "Complete booking payments securely using card, UPI, or net banking."}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/80">
                <LockKeyhole className="h-4 w-4" />
                256-bit encrypted checkout
              </div>
            </div>
          </header>

          {paymentComplete ? (
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">
                  {isWallet ? "Wallet top-up successful" : "Payment completed successfully"}
                </p>
                <p className="mt-1 text-sm text-emerald-700">
                  {isWallet
                    ? `${formatAmount(topUpAmount)} has been added to your agency wallet.`
                    : "Your booking payment has been recorded and is ready for ticketing."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPaymentComplete(false)}
                className="ml-auto text-sm font-semibold"
              >
                Dismiss
              </button>
            </div>
          ) : null}

          {isWallet ? (
            <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <section className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#1268d6_0%,#35a8ff_100%)] p-6 text-white shadow-[0_18px_40px_rgba(31,125,225,0.2)]">
                  <div className="absolute -right-10 -top-12 h-48 w-48 rounded-full bg-white/10" />
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/75">Available balance</p>
                        <p className="mt-2 text-4xl font-semibold tracking-[-0.05em]">
                          {formatAmount(walletBalance)}
                        </p>
                      </div>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
                        <WalletCards className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white/12 px-4 py-3">
                        <p className="text-xs text-white/70">Credit limit</p>
                        <p className="mt-1 font-semibold">Rs. 2,00,000</p>
                      </div>
                      <div className="rounded-2xl bg-white/12 px-4 py-3">
                        <p className="text-xs text-white/70">Used this month</p>
                        <p className="mt-1 font-semibold">Rs. 4,72,650</p>
                      </div>
                      <div className="rounded-2xl bg-white/12 px-4 py-3">
                        <p className="text-xs text-white/70">Wallet status</p>
                        <p className="mt-1 font-semibold">Active</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-3xl border border-[#d8e2f2] bg-white p-5 shadow-[0_14px_36px_rgba(62,92,144,0.07)] sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-[#101a34]">Recent transactions</h2>
                      <p className="mt-1 text-sm text-[#697894]">Latest wallet credits and debits</p>
                    </div>
                    <ReceiptText className="h-5 w-5 text-[#7c3aed]" />
                  </div>

                  <div className="mt-5 space-y-3">
                    {transactions.map((transaction) => {
                      const isCredit = transaction.type === "credit";

                      return (
                        <div
                          key={transaction.reference}
                          className="flex flex-col gap-3 rounded-2xl border border-[#e8eef8] bg-[#fbfdff] p-4 sm:flex-row sm:items-center"
                        >
                          <div
                            className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
                              isCredit
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-rose-50 text-rose-600"
                            }`}
                          >
                            {isCredit ? (
                              <ArrowDownLeft className="h-5 w-5" />
                            ) : (
                              <ArrowUpRight className="h-5 w-5" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-[#101a34]">{transaction.title}</p>
                            <p className="mt-1 text-xs text-[#7a89a4]">
                              {transaction.reference} | {transaction.date}
                            </p>
                          </div>
                          <p
                            className={`font-semibold ${
                              isCredit ? "text-emerald-600" : "text-[#101a34]"
                            }`}
                          >
                            {transaction.amount}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              <form
                onSubmit={handleWalletTopUp}
                className="h-fit rounded-3xl border border-[#d8e2f2] bg-white p-5 shadow-[0_14px_36px_rgba(62,92,144,0.07)] sm:p-6"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f1edff] text-[#6d28d9]">
                  <Plus className="h-6 w-6" />
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#101a34]">
                  Add money
                </h2>
                <p className="mt-1 text-sm leading-6 text-[#697894]">
                  Top up your wallet to make instant flight bookings.
                </p>

                <label className="mt-6 block">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                    Amount
                  </span>
                  <div className="relative mt-2">
                    <IndianRupee className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6d28d9]" />
                    <input
                      type="number"
                      min="1000"
                      step="500"
                      value={topUpAmount}
                      onChange={(event) => setTopUpAmount(Number(event.target.value))}
                      className="h-14 w-full rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] pl-12 pr-4 text-lg font-semibold text-[#101a34] outline-none focus:border-[#7c3aed] focus:bg-white"
                    />
                  </div>
                </label>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[10000, 25000, 50000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setTopUpAmount(amount)}
                      className={`rounded-xl border px-2 py-2.5 text-sm font-semibold ${
                        topUpAmount === amount
                          ? "border-[#7c3aed] bg-[#f1edff] text-[#6d28d9]"
                          : "border-[#dbe4f3] text-[#52627e] hover:bg-[#f8fbff]"
                      }`}
                    >
                      {formatAmount(amount)}
                    </button>
                  ))}
                </div>

                <label className="mt-5 block">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                    Funding source
                  </span>
                  <select className="mt-2 h-12 w-full rounded-2xl border border-[#d7e2f2] bg-[#f8fbff] px-4 text-sm text-[#101a34] outline-none focus:border-[#7c3aed]">
                    <option>HDFC Bank **** 4821</option>
                    <option>ICICI Bank **** 9074</option>
                    <option>UPI linked account</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#6d28d9_0%,#8b5cf6_100%)] px-5 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(109,40,217,0.22)]"
                >
                  <Plus className="h-4 w-4" />
                  Add {formatAmount(topUpAmount)}
                </button>
              </form>
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
              <form
                onSubmit={handleGatewayPayment}
                className="rounded-3xl border border-[#d8e2f2] bg-white p-5 shadow-[0_14px_36px_rgba(62,92,144,0.07)] sm:p-6"
              >
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#101a34]">
                  Select payment method
                </h2>
                <p className="mt-1 text-sm text-[#697894]">
                  Choose how you want to pay for this booking.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {gatewayMethods.map((method) => {
                    const Icon = method.icon;
                    const isActive = gatewayMethod === method.id;

                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setGatewayMethod(method.id)}
                        className={`flex min-h-24 flex-col items-start justify-between rounded-2xl border p-4 text-left ${
                          isActive
                            ? "border-[#7c3aed] bg-[#f4f0ff] text-[#5b21b6]"
                            : "border-[#dbe4f3] text-[#31456d] hover:bg-[#f8fbff]"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="mt-4 text-sm font-semibold">{method.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl border border-[#e5ebf6] bg-[#fbfdff] p-5">
                  {gatewayMethod === "card" ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="sm:col-span-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                          Card number
                        </span>
                        <input
                          required
                          inputMode="numeric"
                          placeholder="1234 5678 9012 3456"
                          className="mt-2 h-12 w-full rounded-2xl border border-[#d7e2f2] bg-white px-4 text-sm outline-none focus:border-[#7c3aed]"
                        />
                      </label>
                      <label>
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                          Expiry date
                        </span>
                        <input
                          required
                          placeholder="MM / YY"
                          className="mt-2 h-12 w-full rounded-2xl border border-[#d7e2f2] bg-white px-4 text-sm outline-none focus:border-[#7c3aed]"
                        />
                      </label>
                      <label>
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                          CVV
                        </span>
                        <input
                          required
                          type="password"
                          inputMode="numeric"
                          maxLength={4}
                          placeholder="***"
                          className="mt-2 h-12 w-full rounded-2xl border border-[#d7e2f2] bg-white px-4 text-sm outline-none focus:border-[#7c3aed]"
                        />
                      </label>
                      <label className="sm:col-span-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                          Name on card
                        </span>
                        <input
                          required
                          placeholder="Enter cardholder name"
                          className="mt-2 h-12 w-full rounded-2xl border border-[#d7e2f2] bg-white px-4 text-sm outline-none focus:border-[#7c3aed]"
                        />
                      </label>
                    </div>
                  ) : gatewayMethod === "upi" ? (
                    <label>
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                        UPI ID
                      </span>
                      <div className="relative mt-2">
                        <Smartphone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7c3aed]" />
                        <input
                          required
                          placeholder="agency@upi"
                          className="h-12 w-full rounded-2xl border border-[#d7e2f2] bg-white pl-11 pr-4 text-sm outline-none focus:border-[#7c3aed]"
                        />
                      </div>
                      <p className="mt-3 text-sm text-[#697894]">
                        A payment request will be sent to your UPI app.
                      </p>
                    </label>
                  ) : (
                    <label>
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">
                        Select bank
                      </span>
                      <div className="relative mt-2">
                        <Building2 className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7c3aed]" />
                        <select
                          required
                          defaultValue=""
                          className="h-12 w-full appearance-none rounded-2xl border border-[#d7e2f2] bg-white pl-11 pr-4 text-sm outline-none focus:border-[#7c3aed]"
                        >
                          <option value="" disabled>
                            Choose your bank
                          </option>
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>State Bank of India</option>
                          <option>Axis Bank</option>
                        </select>
                      </div>
                    </label>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#6d28d9_0%,#8b5cf6_100%)] px-5 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(109,40,217,0.22)]"
                >
                  <LockKeyhole className="h-4 w-4" />
                  Pay Rs. 42,850 securely
                </button>
              </form>

              <aside className="space-y-4">
                <section className="rounded-3xl border border-[#d8e2f2] bg-white p-5 shadow-[0_14px_36px_rgba(62,92,144,0.07)] sm:p-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#6d28d9]">
                    <ReceiptText className="h-4 w-4" />
                    Payment summary
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-[#101a34]">DEL to DXB</h2>
                  <p className="mt-1 text-sm text-[#697894]">FDD-240615-128 | 2 Travellers</p>

                  <div className="mt-5 space-y-3 text-sm">
                    <div className="flex justify-between text-[#52627e]">
                      <span>Flight fare</span>
                      <span>Rs. 39,900</span>
                    </div>
                    <div className="flex justify-between text-[#52627e]">
                      <span>Taxes and fees</span>
                      <span>Rs. 2,300</span>
                    </div>
                    <div className="flex justify-between text-[#52627e]">
                      <span>Service fee</span>
                      <span>Rs. 650</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#e5ebf6] pt-5">
                    <span className="font-semibold text-[#101a34]">Total payable</span>
                    <span className="text-2xl font-semibold tracking-[-0.04em] text-[#101a34]">
                      Rs. 42,850
                    </span>
                  </div>
                </section>

                <section className="rounded-3xl border border-[#d8e2f2] bg-[#f8fbff] p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-[#101a34]">Payment protection</p>
                      <p className="mt-1 text-sm leading-6 text-[#697894]">
                        Your payment details are encrypted and are not stored on this device.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="rounded-3xl border border-dashed border-[#cbd6e8] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a89a4]">
                    Payment response preview
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#697894]">
                    Open every gateway response state while the payment integration is in demo
                    mode.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      href="/payment/status/pending?amount=42850&booking=FDD-240615-128&route=DEL%20to%20DXB"
                      className="inline-flex h-10 items-center justify-center rounded-xl bg-amber-50 px-3 text-sm font-semibold text-amber-700 hover:bg-amber-100"
                    >
                      View pending
                    </Link>
                    <Link
                      href="/payment/status/failed?amount=42850&booking=FDD-240615-128&route=DEL%20to%20DXB"
                      className="inline-flex h-10 items-center justify-center rounded-xl bg-rose-50 px-3 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                    >
                      View failed
                    </Link>
                  </div>
                </section>
              </aside>
            </div>
          )}
      </section>
    </main>
  );
}
