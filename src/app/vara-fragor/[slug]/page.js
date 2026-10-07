import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

function getIssue(slug) {
  return getDatabase()
    .prepare(`
      SELECT title, summary, body_markdown
      FROM content
      WHERE slug = ? AND type = 'proposal' AND status = 'published'
    `)
    .get(slug);
}

export async function generateMetadata({ params }) {
  const issue = getIssue((await params).slug);
  return issue ? { title: issue.title, description: issue.summary } : {};
}

export default async function IssuePage({ params }) {
  const issue = getIssue((await params).slug);
  if (!issue) notFound();

  return (
    <main id="innehall" className="editorial-page">
      <article className="article shell">
        <Link className="text-link article__back" href="/vara-fragor">
          <ArrowLeft aria-hidden="true" size={17} /> Alla frågor
        </Link>
        <p className="section-number">Våra frågor</p>
        <h1>{issue.title}</h1>
        <p className="article__summary">{issue.summary}</p>
        <div className="article__body">
          <p>Plats för fortsatt arbete med texten.</p>
        </div>
      </article>
    </main>
  );
}