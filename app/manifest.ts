import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NIDC - Northern Ireland Developers Conference",
    short_name: "NIDC",
    description:
      "Event of the Year for the Tech Community. November 8th, 2025 at ICC Belfast.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0d1a",
    theme_color: "#ff0066",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
