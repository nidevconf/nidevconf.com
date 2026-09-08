/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { CSSProperties } from "react";
import SocialLinks from "./SocialLinks";
import ThemeToggle from "./ThemeToggle";

export default function SiteFooter() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <span
              className="logo"
              style={{ "--logo-h": "26px" } as CSSProperties}
              role="img"
              aria-label="NIDC"
            >
              <img className="logo-mark" src="/images/nidc-mark.png" alt="" aria-hidden />
              <img className="logo-word" src="/images/nidc-wordmark.png" alt="" aria-hidden />
            </span>
            <p className="foot-blurb">
              Northern Ireland Developer Conference — the event of the year for the tech community.
              Come on down, and bring your friends, family, and colleagues.
            </p>
            <p className="foot-term">
              <span className="prompt">{">"}</span> Sat 21 Nov 2026 · 08:00–17:10 · International Convention Centre Belfast
              <span className="cursor" aria-hidden></span>
            </p>
          </div>

          <div className="foot-cols">
            <div>
              <h4>Get involved</h4>
              <a href="https://ti.to/nidc/nidc-2026-10th-anniversary">Get yer&apos; tickets</a>
              <a href="https://forms.gle/2zWFfxfsPCfqbrCa7">Call for villages</a>
              <a href="https://forms.gle/egaE5KJNsnHv6Asg9">Call for volunteers</a>
              <a href="mailto:sponsors@nidevconf.com">Call for sponsors</a>
            </div>

            <div>
              <h4>Follow us</h4>
              <SocialLinks />
            </div>

            <div>
              <h4>Contact</h4>
              <a href="mailto:organisers@nidevconf.com">organisers@nidevconf.com</a>
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 NIDC · Northern Ireland Developer Conference</span>
          <div className="foot-bottom-end">
            <Link href="/terminal">DON&apos;T PANIC</Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
