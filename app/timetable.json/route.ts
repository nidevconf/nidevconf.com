import { TIMETABLE } from "../_components/Schedule";

/* The day as data, for the organisers' admin page on the agenda Worker. It is
   the same agenda the home page shows, so it holds nothing that is not public. */
export const dynamic = "force-static";

export function GET() {
  return Response.json(TIMETABLE);
}
