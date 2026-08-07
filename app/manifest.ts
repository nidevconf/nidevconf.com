import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NIDC 2026 — Northern Ireland Developer Conference",
    short_name: "NIDC 2026",
    description:
      "Event of the year for the tech community — celebrating 10 years. Saturday 21 November 2026 at ICC Belfast.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBFBFB",
    theme_color: "#EC008C",
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
