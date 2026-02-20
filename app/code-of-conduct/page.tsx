import type { Metadata } from "next";
import CodeOfConductContent from "./content";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description:
    "NIDC is dedicated to providing a harassment-free conference experience for everyone. Read our full Code of Conduct.",
  openGraph: {
    title: "Code of Conduct | NIDC 2025",
    description:
      "Our commitment to a safe, inclusive, and harassment-free conference.",
  },
};

export default function CodeOfConductPage() {
  return <CodeOfConductContent />;
}
