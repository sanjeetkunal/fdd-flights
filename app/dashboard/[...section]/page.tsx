import { notFound } from "next/navigation";
import { CancelledBookingsPage } from "../../pages/dashboard/cancelled-bookings-page";
import { DashboardSectionPage } from "../../pages/dashboard/dashboard-section-page";
import { MyBookingsPage } from "../../pages/dashboard/my-bookings-page";
import { ProfilePage } from "../../pages/dashboard/profile-page";

const sectionPages: Record<string, { group: string; title: string }> = {
  "flights/add-new-flight": { group: "Flight", title: "Add New Flight" },
  "flights/edit-flights": { group: "Flight", title: "Edit Flights" },
  "flights/flight-schedule": { group: "Flight", title: "Flight Schedule" },
  "flights/cancelled-flights": { group: "Flight", title: "Cancelled Flights" },
  "bookings/my-bookings": { group: "Bookings", title: "My Bookings" },
  "bookings/all-bookings": { group: "Bookings", title: "All Bookings" },
  "bookings/new-booking": { group: "Bookings", title: "New Booking" },
  "bookings/booking-requests": { group: "Bookings", title: "Booking Requests" },
  "bookings/cancelled-bookings": { group: "Bookings", title: "Cancelled Bookings" },
  "analytics/overview": { group: "Analytics", title: "Analytics Overview" },
  "analytics/revenue-report": { group: "Analytics", title: "Revenue Report" },
  "analytics/booking-report": { group: "Analytics", title: "Booking Report" },
  "analytics/flight-performance": { group: "Analytics", title: "Flight Performance" },
  profile: { group: "Account", title: "My Profile" },
  settings: { group: "Account", title: "Settings" },
  help: { group: "Support", title: "Help" },
};

type PageProps = {
  params: Promise<{ section: string[] }>;
};

export function generateStaticParams() {
  return Object.keys(sectionPages).map((section) => ({ section: section.split("/") }));
}

export default async function DashboardSectionRoute({ params }: PageProps) {
  const { section } = await params;
  const sectionKey = section.join("/");

  const page = sectionPages[sectionKey];

  if (!page) {
    notFound();
  }

  if (sectionKey === "bookings/my-bookings") {
    return <MyBookingsPage />;
  }

  if (sectionKey === "bookings/cancelled-bookings") {
    return <CancelledBookingsPage />;
  }

  if (sectionKey === "profile") {
    return <ProfilePage />;
  }

  return <DashboardSectionPage group={page.group} title={page.title} />;
}
