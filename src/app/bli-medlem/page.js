import Link from "next/link";
import { ArrowRight, Building2, UserRound } from "lucide-react";

export const metadata = { title: "Bli medlem" };

export default function MembershipPage() {
  return (
    <main id="innehall" className="editorial-page">
      <header className="page-intro shell">
        <p className="section-number">Medlemskap</p>
        <h1>Bli medlem</h1>
        <p>Välj den medlemsform som passar dig.</p>
      </header>
      <section className="membership-info shell">
        <article className="membership-path">
          <UserRound aria-hidden="true" />
          <p className="section-number">Privatperson</p>
          <h2>Enskild medlem</h2>
          <p>Plats för information och registrering.</p>
          <Link className="text-link" href="/logga-in">Registrering kommer <ArrowRight aria-hidden="true" size={17} /></Link>
        </article>
        <article className="membership-path">
          <Building2 aria-hidden="true" />
          <p className="section-number">Organisation</p>
          <h2>Medlemsorganisation</h2>
          <p>Plats för villkor och intresseanmälan.</p>
          <Link className="text-link" href="/kontakt">Kontakta oss <ArrowRight aria-hidden="true" size={17} /></Link>
        </article>
      </section>
    </main>
  );
}