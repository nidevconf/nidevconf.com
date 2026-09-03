"use client";

import { useState } from "react";

/* the two ways people actually pass an announcement on: LinkedIn, and the URL itself */
export default function Share({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {}); // no clipboard (insecure context) — the address bar still works
  }

  return (
    <div className="btn-row">
      <a
        className="btn btn-secondary"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
      >
        Share on LinkedIn
      </a>
      <button type="button" className="btn btn-secondary" onClick={copy} aria-live="polite">
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
