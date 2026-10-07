import Link from "next/link";

export const metadata = { title: "Medlemsinloggning" };

export default function LoginPage() {
  return (
    <main id="innehall" className="editorial-page">
      <header className="page-intro shell">
        <p className="section-number">Medlemssidor</p>
        <h1>Logga in</h1>
        <p>Medlemsinloggningen öppnar tillsammans med medlemsregistret.</p>
      </header>
      <section className="prose-section shell">
        <h2>Inte medlem ännu?</h2>
        <p>Medlemskapet är kostnadsfritt. Registreringen är under utveckling.</p>
        <Link className="text-link" href="/bli-medlem">Läs om medlemskapet</Link>
      </section>
    </main>
  );
}