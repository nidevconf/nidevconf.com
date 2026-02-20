"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import Link from "next/link";
import { Camera, Play } from "lucide-react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const pastEvents = [
  {
    year: "2024",
    venue: "ICC Belfast",
    image: "/events/2024.jpg",
    description:
      "Our biggest year yet with record attendance, an expanded expo hall, and an incredible lineup of local speakers.",
    photos: "https://photos.app.goo.gl/D1y48Gw1NSKcPNjKA",
    videos:
      "https://www.youtube.com/watch?v=jdYNwlcRKwU&list=PL7DSy4xHOvv0woCZvBTsFkmv5ZjB-_cIM",
  },
  {
    year: "2023",
    venue: "ICC Belfast",
    image: "/events/2023.jpg",
    description:
      "We aimed to connect with new audiences by launching billboard campaigns, hosting speaker workshops for beginners, and expanding our meetup fest.",
    photos: "https://photos.app.goo.gl/RWhfEvSE9BevF2iC8",
    videos:
      "https://www.youtube.com/watch?v=SLSZ1f7QG7w&list=PL7DSy4xHOvv0xuwT9cKN49tA_qhFyJadK",
  },
  {
    year: "2022",
    venue: "Waterfront Hall",
    image: "/events/2022.jpg",
    description:
      "NIDC returned in person after the pandemic with a bang. Great to see the community back together.",
    photos: "https://photos.app.goo.gl/uziQsAF8Tk7WzcM2A",
    videos:
      "https://www.youtube.com/playlist?list=PL7DSy4xHOvv20xxyVDAqTGxFGRL-1-Bgr",
  },
  {
    year: "2021",
    venue: "Online",
    image: "/events/2021.jpg",
    description:
      "A virtual meetup fest spread across multiple evenings, keeping the community connected.",
    photos:
      "https://drive.google.com/drive/u/2/folders/1cs9tU9fxmUtWnzmegaI2rM2HCMbd_7Hd",
    videos:
      "https://www.youtube.com/playlist?list=PL7DSy4xHOvv3FeWlBWl5mmCw_kpnXU4Xn",
  },
  {
    year: "2020",
    venue: "Online",
    image: "/events/2020.jpg",
    description:
      "When the world went remote, so did we. Our first virtual conference keeping the NI tech community together.",
    videos:
      "https://www.youtube.com/playlist?list=PL7DSy4xHOvv2oyTay6NVD8VPkvCE8KFmH",
  },
  {
    year: "2019",
    venue: "Waterfront Hall",
    image: "/events/2019.jpg",
    description:
      "A packed Waterfront Hall with talks across the full development spectrum.",
    videos:
      "https://www.youtube.com/playlist?list=PL7DSy4xHOvv2BEXa-y-fENyJejSTWZwua",
  },
  {
    year: "2018",
    venue: "Waterfront Hall",
    image: "/events/2018.jpg",
    description:
      "Growing year on year with an even wider range of talks and community engagement.",
    photos: "https://photos.app.goo.gl/iwKYadhnfRAHSqFY9",
    videos:
      "https://www.youtube.com/playlist?list=PL7DSy4xHOvv0Aw5aOOofFTCt94RZYDyS2",
  },
  {
    year: "2017",
    venue: "Peter Froggatt Centre, QUB",
    image: "/events/2017.jpg",
    description:
      "Where it all began! Humble beginnings at Queen's University Belfast with 230 attendees, 38 speakers, and 8 sponsors.",
    photos: "https://photos.app.goo.gl/AjrU4pF4VuR6gy4N7",
    videos:
      "https://www.youtube.com/playlist?list=PL7DSy4xHOvv2nBbBTUILPtLpfOC2bijy1",
  },
];

export default function PastEventsContent() {
  return (
    <>
      <PageHero
        title="Past Events"
        subtitle="Scroll through history and have a look at the events we've hosted in the past."
        gradient="pink"
      />

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-300 text-lg mb-16"
          >
            We look forward to creating a truly unforgettable experience for our
            attendees each and every time.
          </motion.p>

          {/* Timeline */}
          <div>
            {pastEvents.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex"
              >
                {/* Year & venue label */}
                <div className="flex-shrink-0 w-24 sm:w-36 pt-4 pr-4 sm:pr-6 text-right">
                  <h3 className="text-base sm:text-xl font-black gradient-text leading-tight">
                    NIDC {event.year}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                    {event.venue}
                  </p>
                </div>

                {/* Dot + connecting line */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className={`w-px flex-none h-5 ${i === 0 ? "bg-transparent" : "bg-nidc-pink/40"}`} />
                  <div className="w-4 h-4 flex-none rounded-full bg-nidc-dark border-2 border-nidc-pink z-10" />
                  <div className={`w-px flex-1 ${i === pastEvents.length - 1 ? "bg-transparent" : "bg-nidc-pink/40"}`} />
                </div>

                {/* Card */}
                <div className="flex-1 min-w-0 pl-4 sm:pl-6 pb-8 glass-none">
                  <div className="glass rounded-2xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${basePath}${event.image}`}
                      alt={`NIDC ${event.year} at ${event.venue}`}
                      className="w-full h-48 sm:h-56 object-cover"
                      loading="lazy"
                    />
                    <div className="p-6">
                    <p className="text-gray-300 text-sm">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      {event.photos && (
                        <Link
                          href={event.photos}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-full bg-white/5 border border-white/10 text-gray-200 hover:bg-nidc-pink/20 hover:border-nidc-pink/40 hover:text-nidc-pink transition-colors text-sm font-medium"
                        >
                          <Camera className="w-4 h-4" aria-hidden="true" />
                          Photos
                        </Link>
                      )}
                      {event.videos && (
                        <Link
                          href={event.videos}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-full bg-white/5 border border-white/10 text-gray-200 hover:bg-red-500/20 hover:border-red-400/40 hover:text-red-400 transition-colors text-sm font-medium"
                        >
                          <Play className="w-4 h-4" aria-hidden="true" />
                          Videos
                        </Link>
                      )}
                    </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
