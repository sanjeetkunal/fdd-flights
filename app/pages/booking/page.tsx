import { BookingPage } from "./booking-page";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default function Page(props: PageProps) {
  return <BookingPage {...props} />;
}
