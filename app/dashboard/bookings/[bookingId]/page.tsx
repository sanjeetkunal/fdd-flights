import { BookingDetailPage } from "../../../pages/dashboard/booking-detail-page";

type PageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { bookingId } = await params;

  return <BookingDetailPage bookingId={bookingId} />;
}
