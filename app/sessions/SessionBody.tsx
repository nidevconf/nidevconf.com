/* eslint-disable @next/next/no-img-element */
import FavButton from "../_components/FavButton";
import type sessions from "../_data/sessions.json";

export type Session = (typeof sessions)[number];

/* A session in full: title, who is giving it, the abstract, the bios, and the
   ways to pass it on. The agenda modal and /sessions/<slug> both render this. */
export default function SessionBody({
  session: s,
  faces,
  when,
  track,
  heading: H = "h3",
}: {
  session: Session;
  /** one photo file per speaker, the large crop where there is one */
  faces: string[];
  when?: string;
  track?: string;
  heading?: "h1" | "h3";
}) {
  const meta = [when ?? `${s.minutes} minutes`, track, s.format, s.level, s.chip]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <H className={H === "h1" ? "sec-title" : "td-title"}>{s.title}</H>
      <p className="td-meta">{meta}</p>
      <FavButton id={s.id} title={s.title} labelled />
      <div className="td-people">
        {s.speakers.map((p, i) => (
          <figure key={p.name} className="td-person">
            <img src={`/images/speakers/${faces[i]}`} alt={p.name} width={800} height={800} />
            <figcaption>
              <b>{p.name}</b>
              <span>{p.tagline}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="td-desc">{s.description}</p>
      {s.speakers.map((p) => (
        <div key={p.name} className="td-speaker">
          <p className="td-name">{p.name}</p>
          <p className="td-bio">{p.bio}</p>
        </div>
      ))}
    </>
  );
}
