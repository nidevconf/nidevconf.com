import type { Metadata } from "next";
import PastEventsContent from "./content";

export const metadata: Metadata = {
  title: "Past Events",
  description:
    "Browse the history of NIDC — Northern Ireland Developers Conference from 2017 to 2024. See past venues, speakers, and recordings.",
  openGraph: {
    title: "Past Events | NIDC",
    description:
      "Explore the history of the Northern Ireland Developers Conference.",
  },
};

export default function PastEventsPage() {
  return <PastEventsContent />;
}
