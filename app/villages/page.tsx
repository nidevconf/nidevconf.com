/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Lightbox from "../_components/Lightbox";
import SiteFooter from "../_components/SiteFooter";
import SiteHeader from "../_components/SiteHeader";

const FORM = "https://forms.gle/2zWFfxfsPCfqbrCa7";

const description =
  "Villages are themed, hands-on spaces run by the community at NIDC on Saturday, 21st November 2026 at the International Convention Centre Belfast.";

export const metadata: Metadata = {
  title: "Villages",
  description,
  alternates: { canonical: "https://nidevconf.com/villages" },
  // openGraph does not merge with the layout's, so the image comes along again
  openGraph: {
    title: "Villages | NIDC 2026",
    description,
    url: "https://nidevconf.com/villages",
    images: ["/images/village.jpg"],
  },
};

type Village = {
  id: string;
  name: string;
  theme: string;
  about: string;
  // a paragraph, or named workshops when a village is running several
  atNidc: string | { title: string; text: string }[];
  // optional photo of the village's stand, shown at the top of its card
  image?: { src: string; alt: string };
  links: { label: string; href?: string }[];
};

const villages: Village[] = [
  {
    id: "retro",
    name: "Timeline",
    theme: "Retro village",
    about:
      "Timeline is a hands-on retro computing exhibition built around original computers and consoles from the 1970s through to the 1990s. The aim is to let people experience the technology rather than simply look at it.",
    atNidc:
      "I’ll be bringing a handpicked selection of original machines from the Timeline collection for attendees to get hands-on with throughout the day. Expect plenty of nostalgia, some familiar favourites and a few surprises.",
    links: [
      {
        label: "Facebook: Timeline Carrickfergus",
        href: "https://www.facebook.com/people/Timeline-Carrickfergus/61592370308595/",
      },
      {
        label: "TimelineExperience@outlook.com",
        href: "mailto:TimelineExperience@outlook.com",
      },
    ],
  },
  {
    id: "security",
    name: "Atlantic Exploit Labs",
    theme: "Security village",
    about: "Atlantic Exploit Labs build cyber security challenges for conferences.",
    atNidc:
      "We have a number of challenges that are designed to be solved without requiring participants to bring any additional hardware.",
    links: [
      {
        label: "LinkedIn: Atlantic Exploit Labs",
        href: "https://www.linkedin.com/company/atlantic-exploit-labs",
      },
    ],
  },
  {
    id: "kids",
    name: "Northern Ireland Raspberry Jam",
    theme: "Kids village",
    about:
      "The Northern Ireland Raspberry Jam is a programme of free, regular and family friendly events, aimed at providing attendees the opportunity to get hands on with coding and electronics, in a fun and practical setting. These events, known as “Raspberry Jams”, are organised and led by a group of 40+ passionate volunteers from across Northern Ireland, who come together to pull off the largest regular coding programme in Northern Ireland, for people of all ages.",
    atNidc: [
      {
        title: "Creating Art with Robots",
        text: "Using a Micro:bit and a Bitbot with a marker, create robot art by programming the Micro:bit to drive around a canvas with other robots. All programming in this workshop uses MakeCode, a super simple graphical Scratch-like code editor.",
      },
      {
        title: "Unicorn Horns",
        text: "In this workshop you will hack the Neopixels (multicoloured LEDs) on a Circuit Playground to create a colour changing Unicorn Horn! All programming in this workshop uses MakeCode, a super simple graphical Scratch-like code editor.",
      },
    ],
    links: [
      { label: "niraspberryjam.com", href: "https://niraspberryjam.com/" },
      { label: "info@niraspberryjam.com", href: "mailto:info@niraspberryjam.com" },
    ],
  },
  {
    id: "maker",
    name: "Farset Labs and Tog Hackerspace",
    theme: "Maker village",
    about:
      "Maker Village is a collaboration between two hackerspaces on the island: Farset Labs in Belfast and Tog in Dublin. They’re bringing it to NIDC as part of a shared island programme to get makers across the island of Ireland to build connections, learn cool stuff from each other, and have a bit of fun making.",
    atNidc:
      "We’ll bring 3D printers so you can give it a go on the day and have something to take home. We’ll also bring a giant, programmable, LED ping pong table from Robin Price’s “This is a table” project, built with Farset Labs members over the past few months.",
    links: [
      { label: "farsetlabs.org.uk", href: "https://www.farsetlabs.org.uk/" },
      { label: "tog.ie", href: "https://www.tog.ie/" },
    ],
  },
];

export default function VillagesPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="section call">
          <div className="wrap page-wrap">
            <p className="page-eyebrow">
              <span className="prompt">{">"}</span> villages
            </p>
            <h1 className="sec-title">
              The <span className="hl">villages</span>.
            </h1>
            <p className="sec-lead">
              Themed, hands-on spaces run by the community. Drop in any time on the day.
            </p>
            <div className="btn-row">
              <a className="btn btn-primary" href="#retro">
                Meet the villages <span className="arrow">→</span>
              </a>
              <a className="btn btn-secondary" href={FORM}>
                Propose a village
              </a>
            </div>

            <figure className="statement-photo">
              <img
                src="/images/village.jpg"
                width="1600"
                height="1066"
                alt="An attendee works at a laptop beside a desktop 3D printer and reels of filament at an NIDC village stand"
              />
            </figure>

            <div className="prose">
              <p>
                Between the talks, the villages are where you get your hands on things. Each one
                is run by a group from the community, with something to try, play with or
                solve. No need to book, just wander in.
              </p>
              <Lightbox
                hero={{
                  src: "/images/villages/maker-stand.jpg",
                  alt: "An attendee looks over a table of 3D printers and filament spools at the Farset Labs maker village",
                }}
                photos={[
                  {
                    src: "/images/villages/maker-printers.jpg",
                    alt: "Two attendees lean in to watch a 3D printer at work beside the Farset Labs banners",
                  },
                  {
                    src: "/images/villages/maker-crowd.jpg",
                    alt: "Attendees chatting around the 3D printers at the maker village, framed through a printer's gantry",
                  },
                ]}
              />
            </div>

            <ul className="villages">
              {villages.map((v) => (
                <li key={v.id} id={v.id} className="village">
                  {v.image && (
                    <img className="village-photo" src={v.image.src} alt={v.image.alt} loading="lazy" />
                  )}
                  <div className="village-body">
                    <p className="village-theme">{v.theme}</p>
                    <h2 className="village-name">{v.name}</h2>
                    <h3>About {v.name}</h3>
                    <p>{v.about}</p>
                    <h3>At NIDC</h3>
                    {typeof v.atNidc === "string" ? (
                      <p>{v.atNidc}</p>
                    ) : (
                      v.atNidc.map((w) => (
                        <div key={w.title} className="village-workshop">
                          <h4>{w.title}</h4>
                          <p>{w.text}</p>
                        </div>
                      ))
                    )}
                    <p className="facts village-links">
                      {v.links.map((l) =>
                        l.href ? (
                          <a key={l.label} href={l.href}>
                            {l.label}
                          </a>
                        ) : (
                          <span key={l.label}>{l.label}</span>
                        ),
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="prose">
              <p className="also">
                Got an idea for a village? <a href={FORM}>Propose one</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
