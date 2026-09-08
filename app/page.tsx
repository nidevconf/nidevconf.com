/* eslint-disable @next/next/no-img-element */
import Schedule from "./_components/Schedule";
import SiteFooter from "./_components/SiteFooter";
import SiteHeader from "./_components/SiteHeader";
import Tickets from "./_components/Tickets";
import TopicChips from "./_components/TopicChips";
import TiltBadge from "./_components/TiltBadge";
import HeroVideo from "./_components/HeroVideo";
import SponsorStrip from "./_components/SponsorStrip";
import AgendaReminder from "./_components/AgendaReminder";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      {/* ================= HERO ================= */}
      <section className="hero" id="hero">
        <HeroVideo />

        <div className="wrap">
          <TiltBadge href="/articles/community-interest-company">10 years · Big news →</TiltBadge>

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
        </div>

        <div className="hero-sponsor">
          <span className="hero-sponsor-label">Headline Sponsor</span>
          <img src="/images/sponsors/gearset-white.svg" alt="Gearset" />
        </div>
      </section>

      {/* ================= MAIN ================= */}
      <main id="main-content">
        <SponsorStrip />

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
            <div className="btn-row">
              <AgendaReminder />
            </div>
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
                alt="The NIDC volunteer team in pink shirts cheering in the International Convention Centre Belfast foyer"
              />
            </figure>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
