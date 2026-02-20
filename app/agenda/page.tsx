import type { Metadata } from "next";
import AgendaContent from "./content";

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "View the full NIDC 2025 schedule. Browse sessions by room, explore talks and workshops, and plan your day at ICC Belfast on November 8th.",
  openGraph: {
    title: "Agenda | NIDC 2025",
    description:
      "Browse the full NIDC 2025 schedule — talks, workshops, and more at ICC Belfast.",
  },
};

export default function AgendaPage() {
  return <AgendaContent />;
}
