"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useFavourites } from "./favourites";

/* The way back to your picks. It carries the count once there is one, and
   unlike the other text links it stays on a phone, where it is needed most. */
export default function AgendaLink() {
  const n = useFavourites().length;
  return (
    <Link href="/my-agenda" className="nav-agenda" aria-label={n ? `My agenda, ${n} session${n > 1 ? "s" : ""}` : "My agenda"}>
      <Heart size={15} fill={n ? "currentColor" : "none"} aria-hidden />
      <span className="nav-agenda-label">My agenda</span>
      {n > 0 && <span className="nav-agenda-n">{n}</span>}
    </Link>
  );
}
