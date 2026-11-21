import type { Metadata } from "next";

// Alias so /map works as well as /maps. The site is a static export, so there are no
// server redirects: a meta refresh sends visitors on (same approach as /agenda), and the
// link covers anything that ignores it. noindex keeps the alias out of search results.
export const metadata: Metadata = {
  title: "Maps",
  robots: { index: false },
};

export default function Map() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/maps" />
      <p>
        <a href="/maps">Go to the venue maps</a>
      </p>
    </>
  );
}
