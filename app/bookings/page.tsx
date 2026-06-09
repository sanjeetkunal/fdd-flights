import { BookingPage } from "../pages/booking/booking-page";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default function BookingsAliasPage(props: PageProps) {
  return <BookingPage {...props} />;
}
