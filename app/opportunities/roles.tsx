import type { ReactNode } from "react";

type Section = { heading: string; body: ReactNode };

export type Role = {
  slug: string;
  title: string;
  /** one-liner for the board card and <meta description> */
  summary: string;
  /** facts strip: type · team · commitment · location */
  facts: string[];
  /** opening paragraph under the title */
  intro: string;
  sections: Section[];
};

const INTRO =
  "NIDC is Northern Ireland's largest grassroots tech conference — a big day out for techies to come together every year.";

/* ------------------------------------------------------------------
   The narrative every post shares. A role's own spec (what you'll do,
   goals, responsibilities…) slots in between "What you'll help make
   happen" and "How you'll set the tone".
   ------------------------------------------------------------------ */

const whyWeNeedYou = (ask: string): Section => ({
  heading: "Why we need you",
  body: (
    <>
      <p>NIDC is growing fast, and we&apos;re looking for {ask}.</p>
      <p>
        In 2025 we brought together 750 people at International Convention Centre Belfast for the last big tech event of the
        year in Northern Ireland. It was our 9th year running the conference.
      </p>
      <p>
        Looking ahead, this role will be foundational to shaping the next phase of NIDC&apos;s
        development: growing it to a 1,500 to 2,000 person event and staying true to community
        roots.
      </p>
    </>
  ),
});

const helpMakeHappen: Section = {
  heading: "What you'll help make happen",
  body: (
    <ul>
      <li>
        Create a high-quality community conference that represents and supports Northern
        Ireland&apos;s tech community.
      </li>
      <li>
        Support Northern Ireland&apos;s tech community through the contacts and resources
        available to NIDC, and to yourself.
      </li>
      <li>
        Nourish NIDC&apos;s roots in the tech community, across domains including game
        development, design, and cybersecurity.
      </li>
      <li>
        Bring both local and global visitors to Belfast: while our focus is all about NI techies,
        we&apos;d also love to see friends from ROI, UK and further afield, making Belfast a
        destination for high quality community events.
      </li>
      <li>
        Launch the next wave of community-first ideas to complement our existing support like
        peer-to-peer speaker training, and childcare.
      </li>
    </ul>
  ),
};

const setTheTone: Section = {
  heading: "How you'll set the tone",
  body: (
    <ul>
      <li>
        Think about people first: always consider how our decisions affect attendees, speakers,
        volunteers, and others.
      </li>
      <li>
        Be you, and talk in your own tone of voice: it&apos;s not a script. We are people talking
        with people. Whether it&apos;s in a team meeting, or posting on social media — we&apos;re
        not about corporate statements.
      </li>
      <li>Reinforce our shared values and goals.</li>
    </ul>
  ),
};

const lookingFor = (commitment: string): Section => ({
  heading: "We are looking for a person who will…",
  body: (
    <ul>
      <li>{commitment}</li>
      <li>
        Have experience organising meetups, communities, or conferences (this isn&apos;t your
        first time). Or, have experience running a non-profit company.
      </li>
      <li>
        Be familiar with (or, willing to learn) the{" "}
        <a href="https://www.gov.uk/guidance/being-a-company-director">
          legal duties of a UK company director
        </a>
        . NIDC is incorporated as Developer Conference Limited, a company limited-by-guarantee,
        and run as a not for profit.
      </li>
      <li>Learn the history, purpose, and values of NIDC.</li>
      <li>Live in Northern Ireland.</li>
      <li>Be part of the community you are building, not just someone managing it.</li>
    </ul>
  ),
});

const niceToHaves: Section = {
  heading: "Nice-to-haves",
  body: (
    <ul>
      <li>Contacts with potential sponsors, venues, speakers, etc.</li>
      <li>Know-how for on the day operations, and working with venues (eg: International Convention Centre Belfast).</li>
    </ul>
  ),
};

const inclusion: Section = {
  heading: "We're serious about inclusion",
  body: (
    <>
      <p>
        We warmly encourage applications from people of all backgrounds. If you&apos;re excited
        about the role but don&apos;t tick every box, please still get in touch — passion and
        fresh perspectives matter.
      </p>
      <p>
        We&apos;re happy to make reasonable adjustments throughout the process or the role
        itself.
      </p>
    </>
  ),
};

const keyActivities: Section = {
  heading: "Key activities",
  body: (
    <p>
      You will define your own key activities, to support the goals of NIDC.
    </p>
  ),
};

/* ------------------------------------------------------------------
   The roles
   ------------------------------------------------------------------ */

export const roles: Role[] = [
  {
    slug: "chief-executive",
    title: "Chief Executive Officer",
    summary:
      "Lead NIDC and how it runs: head up the director team, keep the conference financially and operationally sound, and grow it to 2,000 people.",
    facts: ["4-12 hours a week, June to November", "Northern Ireland"],
    intro: INTRO,
    sections: [
      whyWeNeedYou("1 hands-on volunteer Chief Executive to lead it"),
      helpMakeHappen,
      {
        heading: "What you'll do",
        body: (
          <p>
            In this role you will lead NIDC and how it runs. You
            will be responsible for the vision, growth, and sustainability of NIDC. This means
            leading the director team, keeping the conference financially and operationally
            sound, and making sure NIDC&apos;s reputation stays strong in the tech community
            &amp; industry.
          </p>
        ),
      },
      {
        heading: "Goals",
        body: (
          <ul>
            <li>Steer NIDC to be what we are all about.</li>
            <li>
              Build NIDC into the largest tech conference in Northern Ireland, with 1,500 - 2,000
              people having a great experience, and 150 - 400 people coming from outside Northern
              Ireland.
            </li>
            <li>
              Bring in enough income to make sure NIDC is financially sustainable and
              able to invest in growing.
            </li>
            <li>Grow partnerships across the island of Ireland.</li>
            <li>Maintain a 1-2 year strategy, with clear goals and measurable progress.</li>
          </ul>
        ),
      },
      {
        heading: "Responsibilities",
        body: (
          <ul>
            <li>Direct and manage the priorities and resources of NIDC.</li>
            <li>
              Direct the annual strategy, goals, and cohesive plans by collaborating with the
              director team on the conference, operations, marketing, and peripherals. And,
              monitor progress to make sure we&apos;re delivering on it.
            </li>
            <li>
              Build and maintain NIDC&apos;s reputation and influence across the tech community
              &amp; industry.
            </li>
            <li>
              Build and maintain relationships with companies, organisations, conferences,
              communities, and meetups across Northern Ireland, and beyond. And, attend community
              &amp; industry events representing NIDC.
            </li>
            <li>
              Take part in board meetings, and prepare reports for the board to give all board
              members the opportunity to make informed decisions and contributions.
            </li>
            <li>
              Oversee preparation and filing of statutory reports, including Confirmation
              Statements, Accounts, and VAT Returns, making sure they have approval of the board.
              And, making timely payments of Corporation Tax and VAT.
            </li>
          </ul>
        ),
      },
      keyActivities,
      {
        heading: "Team",
        body: (
          <>
            <p>
              This role is part of our director team, with your teammates working across
              marketing, conference, and operations to set goals and get it done with their
              teams. In this role you will also be on the board of directors where you will work
              with other board members on nourishing the long-term success of our purpose and
              living out our shared values.
            </p>
            <p>
              The chairperson and board of directors will support you in creating a 1-2 year
              strategy that feeds into the 3+ year timeframe, and making the plans a reality.
              And, of course, you&apos;ll have the support of the full organising team, who will
              want the same from you.
            </p>
          </>
        ),
      },
      setTheTone,
      lookingFor("Commit 4-12 hours a week from June to November, and 2 hours a week from December to May."),
      niceToHaves,
      inclusion,
    ],
  },

  {
    slug: "marketing-director",
    title: "Marketing Director",
    summary:
      "Lead NIDC's marketing and communications: build the brand story, drive sign-ups and sponsor engagement, and make NIDC aspirational and memorable.",
    facts: ["4-8 hours a week, June to November", "Northern Ireland"],
    intro: INTRO,
    sections: [
      whyWeNeedYou(
        "1 hands-on volunteer Marketing Director to join our existing 4-person leadership team",
      ),
      helpMakeHappen,
      {
        heading: "What you'll do",
        body: (
          <>
            <p>
              As Marketing Director, you&apos;ll lead the planning and execution of
              NIDC&apos;s marketing and communications, driving strong brand visibility, audience
              engagement, and sponsor alignment. Your focus will be on crafting and delivering a
              compelling narrative for NIDC, one that not only drives sign-ups but also
              reinforces the positioning of NIDC as one of Northern Ireland&apos;s flagship tech events
              and a truly inclusive platform for the entire community.
            </p>
            <p>
              You&apos;ll collaborate closely with fellow directors, the CEO, and the wider NIDC
              team, including volunteers, to ensure that all marketing efforts are timely,
              targeted, and fully aligned with the event&apos;s overarching goals. From
              awareness-building to post-event storytelling, your aim is to make NIDC not
              just well-attended, but aspirational and memorable.
            </p>
          </>
        ),
      },
      {
        heading: "Goals",
        body: (
          <ul>
            <li>
              Define and communicate NIDC&apos;s vision, objectives, and brand story across all
              channels.
            </li>
            <li>
              Drive attendee registrations and sponsor engagement through segmented, high-impact
              campaigns.
            </li>
            <li>
              Ensure marketing efforts support operational timelines and reflect real-time
              progress.
            </li>
            <li>
              Build and maintain a consistent, aspirational presence for NIDC across social
              media, email, PR, and partner channels.
            </li>
            <li>
              Contribute to NIDC&apos;s reputation as a community-based thought leadership
              platform and community catalyst.
            </li>
          </ul>
        ),
      },
      {
        heading: "Responsibilities",
        body: (
          <ul>
            <li>
              Develop and launch the full marketing strategy, including campaign themes,
              timelines, and channel plans.
            </li>
            <li>
              Get hands on with social media, including release of past talks, speaker highlights,
              countdowns, and engagement campaigns.
            </li>
            <li>Coordinate sponsor-centric marketing efforts and brainstorm new outreach formats.</li>
            <li>
              Create and maintain a shared dashboard for marketing progress, blockers, and
              decision points.
            </li>
            <li>
              Collaborate with operational/events and larger NIDC team members to align marketing
              with speaker announcements, venue updates, and registration milestones.
            </li>
            <li>
              Plan and lead post-event storytelling efforts, including attendee testimonials
              and media coverage.
            </li>
          </ul>
        ),
      },
      keyActivities,
      setTheTone,
      lookingFor(
        "Commit 4-8 hours a week from June to November, and 2 hours a week from December to May.",
      ),
      niceToHaves,
      inclusion,
    ],
  },
];
