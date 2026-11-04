/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Lightbox from "../_components/Lightbox";
import SiteFooter from "../_components/SiteFooter";
import SiteHeader from "../_components/SiteHeader";

const description =
  "NIDC is run by volunteers. Give us a hand on Saturday, 21st November 2026 at the International Convention Centre Belfast.";

export const metadata: Metadata = {
  title: "Call for Volunteers",
  description,
  alternates: { canonical: "https://nidevconf.com/volunteers" },
  // openGraph does not merge with the layout's, so the image comes along again
  openGraph: {
    title: "Call for Volunteers | NIDC 2026",
    description,
    url: "https://nidevconf.com/volunteers",
    images: ["/images/volunteers.jpg"],
  },
};

export default function VolunteersPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="section call">
          <div className="wrap page-wrap">
            <p className="page-eyebrow">
              <span className="prompt">{">"}</span> volunteers
            </p>
            <h1 className="sec-title">
              Call for <span className="hl">volunteers</span>.
            </h1>
            <p className="sec-lead">
              NIDC is back babyyyy. Thanks to everyone who’s part of the team making it happen.
            </p>
            <p className="sec-lead">
              <strong>Volunteer applications are now closed.</strong> Thank you to everyone who
              applied!
            </p>

            <figure className="statement-photo">
              <img
                src="/images/volunteers.jpg"
                width="2000"
                height="1333"
                alt="The NIDC volunteer team in pink shirts cheering in the International Convention Centre Belfast foyer"
              />
            </figure>

            <div className="prose">
              <p>
                Organised by practitioners, run by volunteers. Every year a crew of people from
                the tech community get together on Saturday to make the conference happen. Here’s what the
                crew gets up to on the day.
              </p>
              <p>
                You’ll join a team of people who get it, and see the conference from another angle,
                behind the scenes of the event of the year for the tech community. Pink t-shirt
                included. It’s great craic.
              </p>

              <h2>What volunteers do</h2>
              <p>
                Registration desk, help desk, pointing people the right way, keeping the villages
                running, moving boxes, and putting up the signs. Everyone picks what suits
                them, and we sort the rota.
              </p>
              <Lightbox
                layout="trio"
                photos={[
                  {
                    src: "/images/volunteers/registration.jpg",
                    alt: "Two volunteers in pink NIDC shirts behind the delegate registration desk, pens laid out ready for badges",
                  },
                  {
                    src: "/images/volunteers/badges.jpg",
                    alt: "A volunteer fanning out a stack of Hello world I’m attendee badges and lanyards on the registration desk",
                    focus: "50% 40%",
                  },
                  {
                    src: "/images/volunteers/venue-map.jpg",
                    alt: "Two organisers sticking the venue map poster to the wall beside the escalator",
                  },
                ]}
              />
              <Lightbox
                photos={[
                  {
                    src: "/images/volunteers/help-desk.jpg",
                    alt: "A volunteer in a pink VOLUNTEER shirt at the help desk, an attendee picking pens from a case",
                  },
                  {
                    src: "/images/volunteers/trolley.jpg",
                    alt: "A volunteer wheeling a trolley of banners and boxes into the lift",
                  },
                  {
                    src: "/images/volunteers/coffee.jpg",
                    alt: "A volunteer chatting with an attendee at the coffee station",
                  },
                  {
                    src: "/images/volunteers/ops-room.jpg",
                    alt: "Three organisers in the ops room going over the day’s plan on a phone and a laptop",
                  },
                ]}
              />

              <h2>Hosting a track</h2>
              <p>
                Every talk track has a volunteer host. Welcome the room, introduce the speaker,
                keep time, and run the questions. No experience needed, we’ll show you the ropes.
              </p>
              <Lightbox
                hero={{
                  src: "/images/volunteers/stage-mic.jpg",
                  alt: "A track host with a microphone on the main stage under purple lights, speaking to the audience",
                }}
                photos={[
                  {
                    src: "/images/volunteers/podium-art.jpg",
                    alt: "Art at the International Convention Centre Belfast podium, mid-sentence, hands out",
                  },
                  {
                    src: "/images/volunteers/podium-glasses.jpg",
                    alt: "A track host at the podium introducing the next talk",
                  },
                  {
                    src: "/images/volunteers/podium-portrait.jpg",
                    alt: "A track host smiling at the podium in front of the sponsor banner",
                    focus: "50% 30%",
                  },
                  {
                    src: "/images/volunteers/stage-art.jpg",
                    alt: "Art on stage in a pink NIDC shirt, smiling at the audience",
                  },
                ]}
              />

              <h2>The fun bit</h2>
              <p>
                Volunteering is the best way to see the conference from the inside. You spend the
                day with people who care about the same things you do, and you’re there for the
                craic after 🙂
              </p>
              <Lightbox
                hero={{
                  src: "/images/volunteers/watching.jpg",
                  alt: "Two volunteers in the front row watching the NIDC mark on the big screen before the doors open",
                }}
                photos={[
                  {
                    src: "/images/volunteers/thumbs-up.jpg",
                    alt: "Two organisers in pink shirts giving a thumbs up in the foyer",
                  },
                  {
                    src: "/images/volunteers/three.jpg",
                    alt: "Three volunteers in pink NIDC shirts grinning in the exhibition hall",
                  },
                  {
                    src: "/images/volunteers/unicorn.jpg",
                    alt: "A volunteer in a pink NIDC shirt wearing a glowing unicorn horn on his cap",
                    focus: "50% 35%",
                  },
                  {
                    src: "/images/volunteers/donuts.jpg",
                    alt: "Three organisers holding up chocolate doughnuts in a supermarket",
                  },
                ]}
              />
              <Lightbox
                hero={{
                  src: "/images/volunteers/bar-blue.jpg",
                  alt: "Organisers and volunteers around a table at the after party under blue lights",
                }}
                photos={[
                  {
                    src: "/images/volunteers/bar-chat.jpg",
                    alt: "A volunteer with a pint chatting with attendees at the after party",
                  },
                  {
                    src: "/images/volunteers/dinner.jpg",
                    alt: "The organising team around a long table at the volunteers’ dinner",
                  },
                  {
                    src: "/images/volunteers/billboard-blue.jpg",
                    alt: "The team under the blue NIDC billboard: event of the year for the tech community",
                  },
                  {
                    src: "/images/volunteers/billboard-orange.jpg",
                    alt: "A group selfie in front of the orange NIDC billboard, everyone pointing at nidevconf.com",
                  },
                ]}
              />

              <h2 id="signup">Applications closed</h2>
              <p>
                Volunteer applications for NIDC 2026 are now closed. A huge thank you to everyone
                who applied. If you signed up, we’ll be in touch with the details. See you on the
                day!
              </p>
              <p>
                If you have any questions, contact us at{" "}
                <a href="mailto:organisers@nidevconf.com">organisers@nidevconf.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
