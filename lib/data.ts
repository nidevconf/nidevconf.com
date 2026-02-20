const SESSIONIZE_ID = "oq4p2lyp";
const SESSIONIZE_API = `https://sessionize.com/api/v2/${SESSIONIZE_ID}/view`;

export const SESSIONIZE = {
  all: `${SESSIONIZE_API}/All`,
  schedule: `${SESSIONIZE_API}/GridSmart`,
  sessions: `${SESSIONIZE_API}/Sessions`,
  speakers: `${SESSIONIZE_API}/Speakers`,
  speakerWall: `${SESSIONIZE_API}/SpeakerWall`,
};

export const CONFERENCE = {
  name: "NIDC",
  fullName: "Northern Ireland Developers Conference",
  date: "November 8th, 2025",
  venue: "ICC Belfast",
  venueAddress: "2 Lanyon Place, Belfast, BT1 3WH",
  ticketUrl: "https://ti.to/nidc/nidc2025",
  sessionizeUrl: "https://nidc-2025.sessionize.com/schedule",
  sessionizeSubmit: "https://sessionize.com/nidc-2025/",
  sessionizeApp: "https://nidc-2025.sessionize.com/",
  photosUrl:
    "https://drive.google.com/drive/u/0/folders/1WDjXOR1Cu6xHmrIKx6SDL6bl18bKjVwT",
  youtubeChannel: "https://www.youtube.com/channel/UCPJftRZO3wYmXLpvfRJtPhQ",
  email: "organisers@nidevconf.com",
  sponsorEmail: "sponsors@nidevconf.com",
};

export const SOCIALS = [
  {
    name: "Bluesky",
    url: "https://bsky.app/profile/nidc.bsky.social",
    icon: "bluesky",
  },
  {
    name: "Discord",
    url: "https://discord.gg/xU8zUt7md3",
    icon: "discord",
  },
  {
    name: "LinkedIn",
    url: "https://uk.linkedin.com/company/northern-ireland-developer-conference",
    icon: "linkedin",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/nidevconf/",
    icon: "instagram",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UCPJftRZO3wYmXLpvfRJtPhQ",
    icon: "youtube",
  },
];

export type Sponsor = {
  name: string;
  logo: string;
  website: string;
  linkedin?: string;
};

export type SponsorTier = {
  tier: string;
  label?: string;
  sponsors: Sponsor[];
};

export const SPONSORS: SponsorTier[] = [
  {
    tier: "Headline",
    sponsors: [
      {
        name: "Gearset",
        logo: "/sponsors/gearset.svg",
        website: "https://gearset.com/",
        linkedin: "https://www.linkedin.com/company/gearset",
      },
    ],
  },
  {
    tier: "Gold",
    sponsors: [
      {
        name: "Enso Recruitment",
        logo: "/sponsors/enso.svg",
        website: "https://www.ensorecruitment.com/",
        linkedin: "https://www.linkedin.com/company/enso-recruitment",
      },
      {
        name: "Payroc",
        logo: "/sponsors/payroc.svg",
        website: "https://payroc.com/",
        linkedin: "https://www.linkedin.com/company/payroc",
      },
      {
        name: "DailyPay",
        logo: "/sponsors/dailypay.svg",
        website: "https://www.dailypay.com/",
        linkedin: "https://www.linkedin.com/company/dailypay",
      },
      {
        name: "Magnite",
        logo: "/sponsors/magnite.svg",
        website: "https://www.magnite.com/",
        linkedin: "https://www.linkedin.com/company/magnite/",
      },
    ],
  },
  {
    tier: "Silver",
    sponsors: [
      {
        name: "SciLeads",
        logo: "/sponsors/scileads.svg",
        website: "https://scileads.com/",
        linkedin: "https://www.linkedin.com/company/scileads/",
      },
      {
        name: "Instil",
        logo: "/sponsors/instil.svg",
        website: "http://instil.co/",
        linkedin: "https://www.linkedin.com/company/instilhq/",
      },
      {
        name: "Allstate NI",
        logo: "/sponsors/allstate.svg",
        website: "https://www.allstateni.com/",
        linkedin:
          "https://www.linkedin.com/company/allstate-northern-ireland",
      },
    ],
  },
  {
    tier: "Bronze",
    sponsors: [
      {
        name: "BCS Northern Ireland",
        logo: "/sponsors/bcs.svg",
        website: "https://www.bcs.org/membership-and-registrations/member-communities/northern-ireland-branch/",
        linkedin: "https://www.linkedin.com/company/it-bcs",
      },
      {
        name: "Curiosity",
        logo: "/sponsors/curiosity.svg",
        website: "#",
        linkedin: "https://www.linkedin.com/company/curiosity-corporation/",
      },
      {
        name: "Uptime Labs",
        logo: "/sponsors/uptimelabs.svg",
        website: "https://uptimelabs.io/",
        linkedin: "https://uk.linkedin.com/company/uptime-labs",
      },
      {
        name: "Cloudsmith",
        logo: "/sponsors/cloudsmith.svg",
        website: "https://cloudsmith.com/",
        linkedin: "https://www.linkedin.com/company/cloudsmith",
      },
      {
        name: "HealthPass",
        logo: "/sponsors/healthpass.svg",
        website: "https://healthpass.io/",
        linkedin: "https://www.linkedin.com/company/healthpass-f2fsolutions/",
      },
      {
        name: "Coding Fury",
        logo: "/sponsors/codingfury.svg",
        website: "https://www.codingfury.com/",
        linkedin: "https://www.linkedin.com/company/codingfury",
      },
      {
        name: "Software NI",
        logo: "/sponsors/softwareni.svg",
        website: "https://softwareni.co.uk/",
        linkedin: "https://www.linkedin.com/company/software-ni",
      },
      {
        name: "UTAW",
        logo: "/sponsors/utaw.svg",
        website: "https://utaw.tech/",
      },
    ],
  },
];

export const GOLD_LABELS: Record<string, string> = {
  "Enso Recruitment": "Afterparty Sponsor",
  Payroc: "Cyber Village Sponsor",
  DailyPay: "Kids' Village Sponsor",
  Magnite: "Maker Village Sponsor",
};

export const TESTIMONIALS = [
  {
    quote:
      "Excellent conference. A great opportunity to meet fellow local devs and learn current best practices and exchange war stories!",
  },
  {
    quote:
      "Technical peer-to-peer learning at its finest. No sales pitches, no posturing, just local industry professionals working at the coal face in a huge range of technologies. You'd be mad to miss it.",
  },
  {
    quote:
      "One of the most informative conferences of the year, both in presentations and hallway chats. A great day of fun and learning.",
  },
];

export const PREVIOUS_TALKS = [
  {
    quote:
      "If you're the one doing everything... then they're not going to feel part of the team",
    speaker: "Stacy Mallon",
    role: "Site Lead at Wolfspeed NI",
    videoUrl: "https://www.youtube.com/watch?v=3Y3g8zmEch8",
  },
  {
    quote:
      "I guarantee the people you work with... they're not dwelling on your mistake",
    speaker: "Patrick Boyd",
    role: "Principal Software Engineer at Gearset",
    videoUrl: "https://youtube.com/watch?v=-XrgjLxg1uo",
  },
  {
    quote:
      "8 Years of Hacking Furbies..... sparked by my 3 year old being terrified of them",
    speaker: "Luke McNeice",
    role: "Head of Engineering and Site Lead for Hamilton Robson Belfast",
    videoUrl: "https://youtu.be/gpVnUUO-XcI?si=mYRTSpbAUqcleC3K",
  },
];

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Sponsors", href: "/sponsors" },
  {
    label: "Conference",
    href: "/agenda",
    children: [
      { label: "Agenda", href: "/agenda" },
      { label: "Speakers", href: "/speakers" },
      { label: "Attendee Info", href: "/attendee" },
    ],
  },
  {
    label: "Events",
    href: "#",
    children: [
      { label: "NIDC 2025", href: "/agenda" },
      { label: "Past Events", href: "/past-events" },
    ],
  },
  {
    label: "About",
    href: "#",
    children: [
      { label: "FAQ", href: "/faq" },
      { label: "Sponsor Info", href: "/sponsor-info" },
      { label: "Past Events", href: "/past-events" },
      { label: "Code of Conduct", href: "/code-of-conduct" },
    ],
  },
];
