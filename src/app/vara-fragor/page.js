import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Våra frågor" };

export default function IssuesPage() {
  const issues = getDatabase()
    .prepare(`
      SELECT slug, title, summary
      FROM content
      WHERE type = 'proposal' AND status = 'published'
      ORDER BY published_at DESC, id DESC
    `)
    .all();

  return (
    <main id="innehall" className="editorial-page">
      <header className="page-intro shell">
        <p className="section-number">Inriktning</p>
        <h1>Våra frågor</h1>
        <p>En första struktur för RiBLas sakfrågor.</p>
      </header>
      <section className="shell" aria-label="RiBLas frågor">
        <ol className="proposal-list proposal-list--page">
          {issues.map((issue, index) => (
            <li key={issue.slug}>
              <Link href={`/vara-fragor/${issue.slug}`}>
                <span className="proposal-list__number">0{index + 1}</span>
                <span className="proposal-list__content">
                  <strong>{issue.title}</strong>
                  <span>{issue.summary}</span>
                </span>
                <ArrowRight aria-hidden="true" size={24} />
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}