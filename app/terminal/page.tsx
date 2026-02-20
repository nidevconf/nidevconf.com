import type { Metadata } from "next";
import TerminalContent from "./content";

export const metadata: Metadata = {
  title: "Hitchhiker's Guide Mode",
  description:
    "NIDC 2025 — Don't Panic. The Hitchhiker's Guide to the Northern Ireland Developers Conference. November 8th at ICC Belfast.",
  openGraph: {
    title: "NIDC 2025 — Hitchhiker's Guide Mode",
    description: "Don't Panic. 42 speakers. Towel recommended.",
  },
};

export default function TerminalPage() {
  return <TerminalContent />;
}
