import { notFound } from "next/navigation";

import { PaymentResultPage } from "../../../pages/payment/payment-result-page";

type PaymentStatus = "success" | "failed" | "pending";

type PageProps = {
  params: Promise<{ status: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getValue(value: string | string[] | undefined, fallback: string) {
  return Array.isArray(value) ? (value[0] ?? fallback) : (value ?? fallback);
}

export default async function Page({ params, searchParams }: PageProps) {
  const { status } = await params;

  if (!["success", "failed", "pending"].includes(status)) {
    notFound();
  }

  const query = await searchParams;

  return (
    <PaymentResultPage
      status={status as PaymentStatus}
      amount={getValue(query.amount, "42850")}
      bookingReference={getValue(query.booking, "FDD-240615-128")}
      flightRoute={getValue(query.route, "DEL to DXB")}
    />
  );
}
