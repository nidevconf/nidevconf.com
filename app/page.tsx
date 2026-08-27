/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { CSSProperties } from "react";
import Schedule from "./_components/Schedule";
import SocialLinks from "./_components/SocialLinks";
import ThemeToggle from "./_components/ThemeToggle";
import Tickets from "./_components/Tickets";
import TopicChips from "./_components/TopicChips";
import TiltBadge from "./_components/TiltBadge";
import HeroVideo from "./_components/HeroVideo";

export default function HomePage() {
  return (
    <>
      {/* ================= HEADER ================= */}
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
            <a href="#agenda">Agenda</a>
            <a href="#village">Villages</a>
            <a href="#sponsor">Sponsor</a>
            <a className="btn btn-primary" href="#tickets">
              Get an early bird ticket
            </a>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="hero" id="hero">
        <HeroVideo />

        <div className="wrap">
          <TiltBadge>10 Year Anniversary</TiltBadge>

          <h1>
            Technical talks, great craic,{" "}
            <span className="nobr">
              <span className="hl tilt-flat">tech community</span>.
            </span>
          </h1>

          <p className="for-nerds">
            This one is for the{" "}
            <span className="nobr">
              <span className="hl tilt-r">nerds</span>.
            </span>
          </p>

          <p className="when">
            Saturday, 21st November 2026
            <span className="dot"></span> International Convention Centre, Belfast
          </p>

          <div className="cta-row btn-row">
            <a className="btn btn-primary" href="#tickets">
              Get an early bird ticket <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= MAIN ================= */}
      <main id="main-content">
        {/* ----- AGENDA ----- */}
        <section className="section" id="agenda">
          <div className="wrap section-centered">
            <h2 className="sec-title">Agenda</h2>
            <p className="sec-lead">
              Coming out in{" "}
              <span className="nobr">
                <span className="hl hl-y">September</span>.
              </span>
            </p>
            <TopicChips />
            <p className="sec-body">
              The place to be for enthusiasts, students, and professionals across software,
              product, cloud, data, UX, games, infrastructure, open source, security, AI, and
              everything in between. Come on down, and bring along your team.
            </p>
            <Schedule />
          </div>
        </section>

        {/* ----- CALL FOR VILLAGES ----- */}
        <section className="section" id="village">
          <div className="wrap section-split">
            <div>
              <h2 className="sec-title">
                Run a <span className="hl">village</span>
              </h2>
              <p className="sec-body">
                Villages are themed, hands-on spaces run by the community — making, kids&apos;
                coding, cyber, games and more. Got an idea for one? We&apos;d love to host it.
              </p>
              <div className="btn-row">
                <a className="btn btn-primary" href="https://forms.gle/2zWFfxfsPCfqbrCa7">
                  Propose a village <span className="arrow">→</span>
                </a>
              </div>
            </div>
            <div className="section-media single">
              <img
                src="/images/village.jpg"
                width="1600"
                height="1066"
                loading="lazy"
                alt="An attendee works at a laptop beside a desktop 3D printer and reels of filament at an NIDC village stand"
              />
            </div>
          </div>
        </section>

        {/* ----- CALL FOR SPONSORS ----- */}
        <section className="section" id="sponsor">
          <div className="wrap section-split media-left">
            <div>
              <h2 className="sec-title">
                Put your brand in the <span className="hl">room</span>.
              </h2>
              <p className="sec-body">
                Get in touch at <a href="mailto:sponsors@nidevconf.com">sponsors@nidevconf.com</a>
              </p>
            </div>
            <div className="section-media single">
              <img
                src="/images/sponsors.jpg"
                width="1600"
                height="1066"
                loading="lazy"
                alt="Attendees chatting at a village stand at NIDC 2025"
              />
            </div>
          </div>
        </section>

        {/* ----- ABOUT ----- */}
        <section className="section" id="about">
          <div className="wrap section-centered">
            <h2 className="sec-title">
              Celebrating <span className="hl hl-y">10 years</span> of tech community in Northern
              Ireland.
            </h2>
          </div>
        </section>

        {/* ----- TICKETS ----- */}
        <Tickets id="tickets" />

        {/* ----- STATEMENT BAND ----- */}
        <section className="statement" aria-label="Organised by practitioners, run by volunteers">
          <div className="wrap">
            <h2>
              Organised by{" "}
              <span className="nobr">
                <span className="hl">Practitioners</span>,
              </span>{" "}
              run by{" "}
              <span className="nobr">
                <span className="hl hl-y">Volunteers</span>.
              </span>
            </h2>
            <figure className="statement-photo">
              <img
                src="/images/volunteers.jpg"
                width="2000"
                height="1333"
                loading="lazy"
                alt="The NIDC volunteer team in pink shirts cheering in the ICC Belfast foyer"
              />
            </figure>
          </div>
        </section>

      </main>

      {/* ================= FOOTER ================= */}
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
                <span className="prompt">{">"}</span> Sat 21 Nov 2026 · 08:00–17:00 · ICC Belfast
                <span className="cursor" aria-hidden></span>
              </p>
            </div>

            <div className="foot-cols">
              <div>
                <h4>Get involved</h4>
                <a href="https://ti.to/nidc/nidc-2026-10th-anniversary">Get yer&apos; tickets</a>
                <a href="https://forms.gle/2zWFfxfsPCfqbrCa7">Call for villages</a>
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
    </>
  );
}
