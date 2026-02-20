import type { Metadata } from "next";
import AttendeeContent from "./content";

export const metadata: Metadata = {
  title: "Attendee Info",
  description:
    "Everything you need for NIDC 2025 — timings, venue directions, transport, registration, food, childcare, floor plans, and after-party details.",
  openGraph: {
    title: "Attendee Info | NIDC 2025",
    description:
      "All the info you need for your day at NIDC 2025 at ICC Belfast.",
  },
};

export default function AttendeePage() {
  return <AttendeeContent />;
}
