import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteFooter from "../../_components/SiteFooter";
import SiteHeader from "../../_components/SiteHeader";
import { roles } from "../roles";

type Params = { params: Promise<{ slug: string }> };

const APPLY = "organisers@nidevconf.com";

// static export: every role is prerendered, anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return roles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);
  if (!role) return {};
  return {
    title: role.title,
    description: role.summary,
    // unlisted for now — reachable by URL only
    robots: { index: false, follow: false },
  };
}

export default async function RolePage({ params }: Params) {
  const { slug } = await params;
  const role = roles.find((r) => r.slug === slug);
  if (!role) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <article className="section role">
          <div className="wrap page-wrap">
            <p className="page-eyebrow">
              <Link href="/opportunities">
                <span className="prompt">{"<"}</span> All opportunities
              </Link>
            </p>
            <h1 className="sec-title">{role.title}</h1>
            <p className="facts">
              {role.facts.map((f) => (
                <span key={f}>{f}</span>
              ))}
            </p>
            <p className="sec-lead">{role.intro}</p>

            {role.sections.map(({ heading, body }) => (
              <section className="prose" key={heading}>
                <h2>{heading}</h2>
                {body}
              </section>
            ))}

            {/* same for every role, so it lives here rather than in the data */}
            <section className="prose">
              <h2>How to apply</h2>
              <p>
                To apply or ask questions, get in touch with the organising team on{" "}
                <a href={`mailto:${APPLY}`}>{APPLY}</a>. Be mindful that this is a shared inbox.
                So, don&apos;t share any private or personal details.
              </p>
              <div className="btn-row">
                <a
                  className="btn btn-primary"
                  href={`mailto:${APPLY}?subject=${encodeURIComponent(`${role.title} role`)}`}
                >
                  Get in touch <span className="arrow">→</span>
                </a>
              </div>
            </section>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
