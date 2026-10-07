import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Om oss" };

export default function AboutPage() {
  return (
    <main id="innehall" className="editorial-page">
      <header className="page-intro shell">
        <p className="section-number">Organisationen</p>
        <h1>Om RiBLa</h1>
        <p>Riksförbundet för barns lärande.</p>
      </header>
      <section className="prose-section shell">
        <h2>Organisationen</h2>
        <p>Plats för syfte, arbetssätt och bakgrund.</p>
        <Link className="text-link" href="/medlemsorganisationer">
          Medlemsorganisationer <ArrowRight aria-hidden="true" size={17} />
        </Link>
        <Link className="text-link" href="/styrelse">
          Styrelse och styrning <ArrowRight aria-hidden="true" size={17} />
        </Link>
      </section>
    </main>
  );
}