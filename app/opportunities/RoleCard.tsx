import Link from "next/link";
import type { Role } from "./roles";

/* one board card per role: the opportunities index and an article's "join the team" share it */
export default function RoleCard({ role }: { role: Role }) {
  return (
    <Link href={`/opportunities/${role.slug}`} className="board-card">
      <h2 className="board-title">{role.title}</h2>
      <p className="facts">
        {role.facts.map((f) => (
          <span key={f}>{f}</span>
        ))}
      </p>
      <p className="board-summary">{role.summary}</p>
      <span className="board-cta">
        View role <span className="arrow">→</span>
      </span>
    </Link>
  );
}
