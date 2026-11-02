/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import sessions from "../_data/sessions.json";
import { large } from "./photos";

const file = (p: string) => readFileSync(`${process.cwd()}/${p}`);
const uri = (p: string, mime: string) => `data:${mime};base64,${file(p).toString("base64")}`;

const INK = "#121212";
const MUTED = "#B5B5B5";
const PINK = "#EC008C";
const FOOT = "Saturday 21 November 2026 · International Convention Centre Belfast · nidevconf.com";

/* The unfurl (1200x630) and the card a speaker downloads for social (1080x1350)
   are one design: the photo, who and what, the event along the foot. Rendered
   at build into out/sessions/<slug>/{og,card}.png — real files with extensions,
   which is what GitHub Pages needs to serve them as images. */
export function image(slug: string, kind: "og" | "card") {
  const s = sessions.find((x) => x.slug === slug);
  if (!s) return new Response("Not found", { status: 404 });
  const portrait = kind === "card";
  const [w, h] = portrait ? [1080, 1350] : [1200, 630];
  const two = s.speakers.length > 1;
  const px = portrait ? (two ? 400 : 520) : two ? 250 : 380;

  const wordmark = (
    <img
      src={uri("public/images/nidc-wordmark.png", "image/png")}
      height={portrait ? 96 : 64}
      width={portrait ? 201 : 134}
    />
  );
  const pics = s.speakers.map((p) => (
    <img
      key={p.name}
      src={uri(`public/images/speakers/${large(p.photo)}`, "image/jpeg")}
      width={px}
      height={px}
      style={{ borderRadius: 24, objectFit: "cover" }}
    />
  ));
  const who = s.speakers.map((p) => (
    <div key={p.name} style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ fontSize: portrait ? 46 : 30, fontWeight: 600, lineHeight: 1.15 }}>{p.name}</div>
      <div style={{ fontSize: portrait ? 26 : 20, color: MUTED, lineHeight: 1.3 }}>{p.tagline}</div>
    </div>
  ));
  const title = (
    <div style={{ fontSize: portrait ? 40 : s.title.length > 60 ? 32 : 38, fontWeight: 600, lineHeight: 1.2 }}>
      {s.title}
    </div>
  );
  const foot = (
    <div style={{ marginTop: "auto", display: "flex", color: MUTED, fontSize: portrait ? 22 : 18, lineHeight: 1.4 }}>
      {FOOT}
    </div>
  );
  const base = { width: w, height: h, background: INK, color: "#fff", fontFamily: "Poppins" };

  const tree = portrait ? (
    <div style={{ ...base, display: "flex", flexDirection: "column", padding: 72, gap: 40 }}>
      {wordmark}
      <div style={{ display: "flex", gap: 32 }}>{pics}</div>
      <div style={{ display: "flex", fontSize: 22, fontWeight: 600, color: PINK, letterSpacing: 2 }}>
        SPEAKING AT NIDC 2026
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>{who}</div>
      {title}
      {foot}
    </div>
  ) : (
    <div style={{ ...base, display: "flex", padding: 56, gap: 48, alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, flexShrink: 0 }}>{pics}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1, minWidth: 0, height: "100%" }}>
        {wordmark}
        {title}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{who}</div>
        {foot}
      </div>
    </div>
  );

  return new ImageResponse(tree, {
    width: w,
    height: h,
    fonts: [
      { name: "Poppins", data: file("app/_fonts/Poppins-Regular.ttf"), weight: 400, style: "normal" },
      { name: "Poppins", data: file("app/_fonts/Poppins-SemiBold.ttf"), weight: 600, style: "normal" },
    ],
  });
}
