/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { CSSProperties } from "react";

// Anchors are rooted at "/" so the same header works off the home page too.
export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link
          href="/"
          className="logo"
          style={{ "--logo-h": "22px" } as CSSProperties}
          aria-label="NIDC home"
        >
          <img className="logo-mark" src="/images/nidc-mark.png" alt="" aria-hidden />
          <img className="logo-word" src="/images/nidc-wordmark.png" alt="" aria-hidden />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href="/#agenda">Agenda</Link>
          <Link href="/#village">Villages</Link>
          <Link href="/#sponsor">Sponsor</Link>
          <Link className="btn btn-primary" href="/#tickets">
            Get an early bird ticket
          </Link>
        </nav>
      </div>
    </header>
  );
}
