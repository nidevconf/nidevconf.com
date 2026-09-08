/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Article } from "../articles";
import AgendaReminder from "../../_components/AgendaReminder";
import VideoWall from "../../_components/VideoWall";
import Lightbox from "../../_components/Lightbox";
import SponsorTiers from "../../_components/SponsorTiers";
import RoleCard from "../../opportunities/RoleCard";
import { roles } from "../../opportunities/roles";

const VOLUNTEER_FORM = "https://forms.gle/egaE5KJNsnHv6Asg9";
const CIC_GUIDANCE =
  "https://www.gov.uk/government/publications/community-interest-companies-how-to-form-a-cic/community-interest-companies-guidance-chapters";

const article: Article = {
  slug: "community-interest-company",
  title: "We are Becoming a Community Interest Company, and recruiting a CEO",
  date: "2026-09-04",
  author: "Art Kondratiev, CEO",
  avatar: "/images/art-kondratiev.jpg",
  body: (
    <>
      <p>
        NIDC is registering as a <a href={CIC_GUIDANCE}>Community Interest Company</a>. Due to
        complete before the 10 year anniversary conference in November.
      </p>
      <p>
        We are recruiting a new <Link href="/opportunities/chief-executive">CEO</Link> to lead
        it, and a <Link href="/opportunities/marketing-director">Marketing Director</Link>{" "}
        to help tell the story. They will get started this year to see what happens behind the
        scenes, and take the lead in 2027.
      </p>
      <p>
        This plan has been in the works for the past 2 years. I (current CEO 🙂) will be moving
        on in April next year to enjoy the conference as an attendee.
      </p>
      <p>
        It’s the most important decision we’ve made since starting the conference.
        Committing it to a purpose for the rest of its time, and looking for great people to show
        us what exciting things can be done with it.
      </p>

      <h2>What’s a Community Interest Company?</h2>
      <p>
        NIDC is organised by volunteers from the tech industry. People working in engineering,
        product, design, security, and students preparing to enter it. People who get it, and
        spend their free time to make it happen for the community.
      </p>
      <p>
        Reaching the 10 year anniversary means a lot of evenings and weekends, given up by a lot
        of people like you. The organisers, volunteers, speakers, and supporters of community
        events. That can make you wonder: what happens with all the effort I put in for the
        community after I’m gone?
      </p>
      <p>
        I’ve been asked many times how we’ll “finally” make a profit from
        doing it. Maybe selling the company to a brand? Maybe selling your data? No. That’s{" "}
        <em>not</em> why we do it, and we don’t want it to happen in the future. This is
        where becoming a CIC comes in.
      </p>
      <p>
        Community Interest Companies form an <em>asset lock</em> (in a good way) to serve the
        benefit of the community. The change is not reversible. It’s a big deal. This
        benefit is public on{" "}
        <a href="https://find-and-update.company-information.service.gov.uk/">Companies House</a>{" "}
        for every registered CIC (eg: <a href="https://bsidesbelfast.org/">BSides Belfast</a>).
        All future organisers & directors have to pursue it. That means each volunteer’s
        contribution keeps benefiting the community after they move on.
      </p>
      <blockquote>
        <p>
          Northern Ireland is bursting with talent, creativity and curiosity. Becoming a CIC is
          the next step for NIDC, building on what we’ve built together as a community and
          making sure it continues to benefit people for years to come.
        </p>
        <footer>
          <b>
            <a href="https://www.linkedin.com/in/ppbreen/">Paul Breen</a>
          </b>
          <span>Director, NIDC</span>
        </footer>
      </blockquote>

      <h2>Story of NIDC, and how it all started</h2>
      <p>
        In 2017 three meetup organisers got together and thought “let’s get together,
        talk about tech, and have a bit of fun”.{" "}
        <a href="https://www.linkedin.com/in/phil-weir-033b5a62/">Phil Weir</a> from{" "}
        <a href="https://www.meetup.com/belfast-lug/">BLUG</a>,{" "}
        <a href="https://www.linkedin.com/in/markxa/">Mark Allan</a> from{" "}
        <a href="https://x.com/dotnetbelfast">@DotNetBelfast</a>, and{" "}
        <a href="https://www.linkedin.com/in/naughtonmartin/">Martin Naughton</a> from{" "}
        <a href="https://x.com/BelfastJUG">@BelfastJUG</a>. This was a conference for the nerds.
      </p>
      <blockquote>
        <p>
          We’re finally having a conference that’s going to be full of actual
          developers.
        </p>
        <footer>
          <b>Angie McKeown</b>
          <span>
            Founder, <a href="https://nigame.dev/">NI Game Dev Network</a>
          </span>
        </footer>
      </blockquote>
      <p>
        This was the beginning of <a href="https://x.com/nidevconf">@NIDevConf</a>, which almost
        got called “UsefulConf” or “Meetup of Meetups”. Kicking off with
        a launch party at PwC’s Google Lab near the waterfront in Belfast.
      </p>
      <VideoWall
        items={[
          {
            slug: "martin-and-phil",
            name: "Martin Naughton, Phil Weir",
            role: "NIDC founders",
            quote: "Talking to people getting excited at the launch party gives a real feeling of energy.",
            duration: "4:00",
            focus: "100% 50%", // Martin, at the mic, while the card is narrow
          },
          {
            slug: "paddy-carey",
            name: "Paddy Carey",
            role: "Lead Engineer, ShopKeep",
            quote: "The best part of the conference for me is the hallway track.",
            duration: "1:22",
          },
          {
            slug: "phil-wilkinson",
            name: "Phil Wilkinson",
            role: "Site Manager, BDNA",
            quote:
              "They're not gods of engineering, they are just engineers like you and me.",
            duration: "1:19",
          },
          {
            slug: "angie-mckeown",
            name: "Angie McKeown",
            role: "Founder, NI Game Dev Network",
            quote: "We're finally having a conference that's going to be full of actual developers.",
            duration: "1:16",
          },
        ]}
      />

      <p>
        Interest in technology should be the only barrier for getting involved. Not money, not
        where you work or study. Inclusion became foundational to the conference to help people
        pursue their personal interest in technology.
      </p>
      <p>
        <b>Tickets are affordable</b> thanks to each year’s conference sponsors. The goal is
        to make it low enough for someone to buy it personally, without requiring a corporate
        budget and a company paying for it. Think £10s, not £100s or £1,000s. But, if the price
        of the ticket is the only thing stopping you from going, pay what you can for an{" "}
        <em>Honesty Ticket</em> and come along. These tickets have been a part of NIDC since day
        one.
      </p>
      <SponsorTiers />
      <p>
        <b>Childcare</b> is provided for free, with more child-friendly activities throughout the
        conference for those bringing family.{" "}
        <a href="https://www.linkedin.com/in/joan-mcaleer/">Joan Breen</a>{" "}
        got this started at NIDC 2018, and we’re proud to see that in 2026 it’s offered
        across a number of other conferences in Northern Ireland.
      </p>
      <p>
        <b>Speaker workshops</b> get more technical people talking, and doing it well. We run 3
        types: applying to speak at a technical conference, structuring your presentation, and
        practice presenting technical content. That started in 2018 when we partnered with{" "}
        <a href="https://belfast.toastmastersclubs.org/">Belfast Toastmasters</a> for a workshop
        at <a href="https://ormeaulabs.com/">Ormeau Labs</a>. Now, almost 10 years later we run
        it together with{" "}
        <a href="https://serverlessdaysbelfast.com/">ServerlessDays Belfast</a>, and{" "}
        <a href="https://bsidesbelfast.org/">BSides Belfast</a>, with{" "}
        <a href="https://www.linkedin.com/in/garthgilmour/">Garth</a> and{" "}
        <a href="https://www.linkedin.com/in/ciaran-conliffe-7133843a/">Ciaran</a> leading it.
        If you’re curious, I’m sure folks like{" "}
        <a href="https://www.linkedin.com/in/kirstine-boyd/">Kirstine</a> won’t mind telling you
        about their experience coming along.
      </p>
      <Lightbox
        layout="trio"
        photos={[
          {
            src: "/images/speaker-workshop-1.jpg",
            alt: "A small circle of chairs at a speaker workshop, a woman in glasses mid-conversation with three others",
            focus: "40% 50%",
          },
          {
            src: "/images/speaker-workshop-2.jpg",
            alt: "Four people in a circle of chairs, one explaining something with her hands while the others listen",
          },
          {
            src: "/images/speaker-workshop-3.jpg",
            alt: "Four people in a circle taking notes while one of them makes a point",
            focus: "45% 50%",
          },
        ]}
      />
      <p>
        All community conferences follow similar principles.{" "}
        <a href="https://bsidesbelfast.org/">BSides Belfast</a>,{" "}
        <a href="https://serverlessdaysbelfast.com/">Serverless Days Belfast</a>,{" "}
        <a href="https://www.womentechmakersbelfast.com/">Women Techmakers Belfast</a>,{" "}
        <a href="https://elevateni.com/">Elevate NI</a>, and many more.
      </p>

      <p>
        In 2020 almost every meetup and conference stopped running. Understandably. Everyone was
        anxious, and isolated at home. But, that is the reason we felt it was important to keep
        NIDC running. Events bring people together, and when do we need it most if not when we
        are the most apart?
      </p>
      <p>
        In the space of a few months we learned everything from logistics of live television, to
        implementing COVID precautions. There was a lot more to it than turning on a camera, and
        streaming to YouTube than you’d expect. But, with the help of{" "}
        <a href="https://www.linkedin.com/in/dsrkane/">David Kane</a> we found an old flax &
        linen mill on the Newtownards Road. The most spacious rooms you’ll set your eyes on,
        with a great view of Samson & Goliath. The team worked hard to keep
        everyone safe, and bring people together with a feeling of community we’ve all been
        missing. And, we tried to have a bit of fun with it, too. I hope you felt it.
      </p>
      <div className="section-media pair">
        <img
          src="/images/pandemic-mixer.jpg"
          alt="David Kane in headphones at a vision mixer, with monitors and camera feeds stacked in front of him"
          style={{ objectPosition: "12% 50%" }}
        />
        <img
          src="/images/pandemic-crew.jpg"
          alt="The crew rigging cameras and lights across the mill floor, Art in a mask in the foreground"
          style={{ objectPosition: "70% 50%" }}
        />
      </div>
      <p>
        One of the coolest things was teaming up with{" "}
        <a href="https://niraspberryjam.com/">NI Raspberry Jam</a>. Kids around Northern
        Ireland (and the world) were at home bored. The jam was on pause. Inviting them to watch
        a 4 hour educational livestream probably wouldn’t help. So, we got creative, found a
        way to give <em>free</em> electronics kits for anyone signing up to the make-along, and
        posted them 1st class to 20 families across Northern Ireland. After that, the jam team
        went on to run livestream jams for kids for another year before being back in-person.
        Now, they come to NIDC every year and make cool things running a Raspberry Pi village.
      </p>
      <VideoWall
        items={[
          {
            slug: "lucy-bell-night-light",
            youtube: "lLU2sjgUadI",
            name: "Lucy Bell",
            role: "Software Engineer, Queen's University Belfast",
            quote:
              "It's a really good way of bringing technology that seems so futuristic to real life with younger students.",
            duration: "50:18",
          },
        ]}
      />
      <p>
        Next year, we were confident that the lockdown was over. We even filmed a conference date
        announcement. Until the conference venue cancelled our booking 30 days before the event.
        But, no pressure (definitely pressure 😅).{" "}
        <a href="https://ormeaulabs.com/">Ormeau Labs</a> came to the rescue.{" "}
        <a href="https://uk.linkedin.com/in/claireshalliday">Claire Halliday</a> heard our story,
        and offered a place to run it for free. That week we reached
        out to organisers who paused their meetups for lockdowns with an idea: Meetup Week. NIDC
        handles the COVID safety, venue, and catering. Organisers bring their communities
        together for the first time since isolation started. That’s what it’s all
        about. We even had a rooftop party since we didn’t need a big venue anymore. It was
        great craic. The <em>Meetup Fest</em> (what we renamed it) ran for 3 years making
        September a vibrant month on the tech community calendar.
      </p>
      <p className="list-title">Meetup Week & Meetup Fest Communities</p>
      <ul className="tiles">
        <li>
          <a href="https://belfast.js.org/">Belfast JS</a>
        </li>
        <li>
          <a href="https://twitter.com/pcampbelfast">ProductCamp</a>
        </li>
        <li>
          <a href="https://www.meetup.com/artificial-intelligence-northern-ireland/">AI NI</a>
        </li>
        <li>
          <a href="https://www.meetup.com/devops-belfast/">DevOps Belfast</a>
        </li>
        <li>
          <a href="https://www.meetup.com/belfast-lug/">Belfast Linux/Libre User Group</a>
        </li>
        <li>
          <a href="https://x.com/belfastelixir">Belfast Elixir</a>
        </li>
        <li>
          <a href="https://www.awsbelfast.co.uk/">BelfAWSt Meetup</a>
        </li>
        <li>
          <a href="https://infosecni.net/">InfoSecNI</a>
        </li>
        <li>
          <a href="https://geekdinnerclub.com/">Geek Dinner Club</a>
        </li>
        <li>
          <a href="https://www.meetup.com/pybelfast/">PyBelfast</a>
        </li>
        <li>
          <a href="https://www.nicreative.co/">NI Creative Community</a>
        </li>
        <li>
          <a href="https://www.farsetlabs.org.uk/">Farset Labs Hackerspace</a>
        </li>
        <li>
          <a href="https://nigame.dev/">NI Game Dev Network</a>
        </li>
        <li>
          <a href="https://newrydigital.com/">Newry Digital</a>
        </li>
        <li>
          <a href="https://www.meetup.com/belfast-software-craftsmanship-community/">Belfast Software Craftsmanship Community</a>
        </li>
        <li>
          <a href="https://x.com/wwcodebelfast">Women Who Code</a>
        </li>
        <li>
          <a href="https://www.meetup.com/uxbelfast/">UX Belfast</a>
        </li>
        <li>Organisers Roundtable</li>
        <li>
          <a href="https://www.meetup.com/producttank-belfast/">ProductTank Belfast</a>
        </li>
        <li>
          <a href="https://uk.linkedin.com/company/computingsocietyuu">UU Computing Society</a>
        </li>
        <li>
          <a href="https://queenscomputingsociety.com/">Queen’s Computing Society</a>
        </li>
        <li>
          <a href="https://www.meetup.com/belfast-automation-software-testing/">Belfast Automation and Software Testing</a>
        </li>
      </ul>
      <p>
        Even though <em>Meetup Fest</em> and lockdowns are (finally) done, we did keep doing one
        thing. Something bringing the tech community together aside from the conference, started
        by <a href="https://www.linkedin.com/in/yuan-zhang-965aaa141/">Yuan</a> back in 2023. The
        NI Tech Community still gets together every year for{" "}
        <a href="https://belfastpride.com/">Belfast Pride</a>, behind the colourful banner
        designed by our friend and organiser{" "}
        <a href="https://www.linkedin.com/in/zan-dani/">Zan</a>.
      </p>
      <Lightbox
        hero={{
          src: "/images/pride-banner.jpg",
          alt: "The NI Tech Community group marching through Belfast Pride behind a rainbow-striped banner reading NI Tech Community, All together",
        }}
      />
      <p>
        I hope all the things we did during lockdowns left people something to remember. Beyond
        the rectangles on a screen containing their colleagues.
      </p>

      <p>
        In 2023, we had a decision to make: go back to where we always ran the conference and see
        if anyone still goes to these things, or go big and see what we can make of it all. We
        landed on going for the{" "}
        <a href="https://iccbelfast.com/">International Convention Centre Belfast</a>. Go big,
        with the event of the year for the tech community.
      </p>
      <Lightbox
        hero={{
          src: "/images/late-game-billboard.jpg",
          alt: "Two people jumping for a high five in front of the NIDC billboard at night: Peer-to-peer learning at its finest",
        }}
        photos={[
          {
            src: "/images/late-game-visit-1.jpg",
            alt: "Organisers sizing up an empty meeting room on a site visit, one of them pointing at the screen",
          },
          {
            src: "/images/late-game-visit-2.jpg",
            alt: "The team walking the empty main hall of the International Convention Centre Belfast on a site visit",
          },
          {
            src: "/images/late-game-office.jpg",
            alt: "Art grinning beside a door with a sign reading Organiser’s Office",
            focus: "35% 50%",
          },
        ]}
      />
      <p>
        Everyone joining the team was experienced, and excited to get stuck in. But, we all had
        different ideas. The conference has been running in all sorts of ways. Each organiser got
        involved in different years, pictured different things, had different experiences taking
        part in the conference.
      </p>
      <p className="credits-title">Organisers from 2017 to present</p>
      <ul className="credits">
        <li>
          <a href="https://www.linkedin.com/in/phil-weir-033b5a62/">Phil Weir</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/markxa/">Mark Allan</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/naughtonmartin/">Martin Naughton</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/artemiy-kondratiev/">Art Kondratiev</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/emmapollock/">Emma Pollock</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/garthgilmour/">Garth Gilmour</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/heatherhello/">Heather McNamee</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/james-bunch-cto/">James Bunch</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/ibarrajessica/">Jessica Ibarra</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/joan-mcaleer/">Joan Breen</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/josh-beatty/">Josh Beatty</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/kirstine-boyd/">Kirstine Boyd</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/lauren-taylor-48a15013b/">Lauren Taylor</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/louise-croft-21865483/">Louise Croft</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/matthew-close-214715209/">Matthew Close</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/maycheungni/">May Cheung</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/megan-d-arcy-953950203/">Megan D’Arcy</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/michealcolhoun/">Michael Colhoun</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/neilallenworks/">Neil Allen</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/ppbreen/">Paul Breen</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/ruthmarriott/">Ruth Frizzell</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/ryan-rogan-se/">Ryan Rogan</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/stefanie-dickson-05744b1a9/">Stefanie Dickson</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/yaroslava-navrotskaaa-815683325/">Yaroslava Navrotska</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/yasrigby/">Yasmine Rigby</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/yuan-zhang-965aaa141/">Yuan Zhang</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/zan-dani/">Zan Dani</a>
        </li>
      </ul>
      <p>
        To make it work we had to get more serious. How things run, how we bring people into the
        team, and what we’re actually trying to do. So, we wrote it down.
      </p>
      <h3>Our Vision 🤩</h3>
      <p className="callout">
        <span className="emoji" aria-hidden>
          🤩
        </span>{" "}
        Bringing together the whole tech community of Northern Ireland, every year.
      </p>
      <h3>Our Mission 🏔️</h3>
      <p className="callout">
        <span className="emoji" aria-hidden>
          🏔️
        </span>{" "}
        Organise the biggest meetup of the year, bringing together techies, meetups and
        companies from all over Northern Ireland.
      </p>
      <table className="dos">
        <thead>
          <tr>
            <th>✅ Dos</th>
            <th>❌ Don’ts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Create an easy-going, casual and community-driven conference.</td>
            <td>Create a formal, corporate or business-focused conference.</td>
          </tr>
          <tr>
            <td>Create a conference connecting and supporting meetups across Northern Ireland.</td>
            <td>
              Create a conference separated from, competing with, trying to own, or using meetups
              across Northern Ireland.
            </td>
          </tr>
          <tr>
            <td>
              Create a conference bringing together cross-functional disciplines (ie: product,
              project, security, testing, engineering, Linux, Windows, electronics, OSS,
              licensing, etc.), projects and ideas.
            </td>
            <td>Create a conference focused only on mainstream topics.</td>
          </tr>
          <tr>
            <td>
              Create a conference raising the profiles of people, meetups and companies from
              across Northern Ireland.
            </td>
            <td>
              Create a conference prioritising international speakers and companies with no
              presence in Northern Ireland.
            </td>
          </tr>
          <tr>
            <td>
              Create a conference with low barriers to get involved in any part of the
              conference, based on people’s interests. (get creative, invest in people!)
            </td>
            <td>
              Create a conference with high barriers to entry, gatekeeping opportunities to take
              part behind invisible walls.
            </td>
          </tr>
          <tr>
            <td>Create a conference you want to go to with your friends, family and colleagues.</td>
            <td>Create a conference you wouldn’t go to with your friends, family and colleagues.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Each year, we learned a bit more. Tried something new, and found new ways to make it a
        little bit more exciting. The 4 tracks of technical talks, the hands-on workshops, the
        villages run by local community groups. I’d say it’s coming together okay 😜
      </p>
      <VideoWall
        items={[
          {
            slug: "trailer",
            name: "NIDC trailer",
            role: "Event of the year for the tech community",
            duration: "1:22",
          },
        ]}
      />
      <p>
        This year it’s the 10th anniversary conference. In the past 10 years amazing things
        happened in the tech community in Northern Ireland, not just at NIDC. That’s why this
        year is about celebrating this wonderful decade of tech community.
      </p>
      <p>
        You’ll hear more soon. But for now, I hope it paints a picture of what kind of Community
        Interest Company we’d like it to be.
      </p>

      <h2>Ready to write the next chapter?</h2>
      <p>
        That’s the story we’ve got so far. If you can see yourself writing the next chapter as a{" "}
        <Link href="/opportunities/marketing-director">Marketing Director</Link>, or leading the
        team as the next <Link href="/opportunities/chief-executive">CEO</Link>, you know what to
        do.
      </p>
      <ul className="board board-compact">
        {roles.map((role) => (
          <li key={role.slug}>
            <RoleCard role={role} />
          </li>
        ))}
      </ul>
      <p className="also">
        Or, come along as a <a href={VOLUNTEER_FORM}>volunteer</a>.
      </p>

      <h2>Come to the conference</h2>
      <p>
        Agenda is announced on Friday, 11th September at 10am. General availability tickets,
        including honesty tickets and childcare, go on sale at the same time.
      </p>
      <div className="btn-row">
        <AgendaReminder />
        <Link className="btn btn-ghost" href="/#agenda">
          Preview the agenda <span className="arrow">→</span>
        </Link>
      </div>
      <aside className="ticket">
        <div className="ticket-top">
          <h3>
            Last chance for <span className="hl">early bird</span> tickets
          </h3>
          <p>
            Early bird tickets are on sale until the agenda is out, so if you’re coming
            anyway, this is your last chance to get them with a wee discount.
          </p>
        </div>
        <div className="ticket-tear" aria-hidden />
        <div className="ticket-stub">
          <Link className="btn ticket-btn" href="/#tickets">
            Get an early bird ticket <span className="arrow">→</span>
          </Link>
        </div>
      </aside>
    </>
  ),
};

export default article;
