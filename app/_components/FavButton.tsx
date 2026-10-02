"use client";

import { Heart } from "lucide-react";
import { toggle, useFavourites } from "./favourites";

/* The heart that puts a session on your agenda. On a timetable card it is just
   the icon; in the session modal and on the session page it says what it does. */
export default function FavButton({
  id,
  title,
  labelled,
}: {
  id: string;
  title: string;
  labelled?: boolean;
}) {
  const picked = useFavourites().includes(id);
  const action = picked ? `Remove “${title}” from my agenda` : `Add “${title}” to my agenda`;

  return (
    <button
      type="button"
      className={labelled ? "fav fav-labelled" : "fav"}
      aria-pressed={picked}
      aria-label={labelled ? undefined : action}
      title={labelled ? undefined : action}
      onClick={() => toggle(id)}
    >
      <Heart size={16} fill={picked ? "currentColor" : "none"} aria-hidden />
      {labelled && (picked ? "On my agenda" : "Add to my agenda")}
    </button>
  );
}
