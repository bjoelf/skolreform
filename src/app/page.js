import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Landmark, Users } from "lucide-react";
import { getDatabase } from "@/lib/db";
import heroImage from "../../bilder-web-ribla-org/pexels-anastasia-shuraeva-8466766.jpg";

export const dynamic = "force-dynamic";

function getProposals() {
  return getDatabase()
    .prepare(`
      SELECT slug, title, summary
      FROM content
      WHERE type = 'proposal' AND status = 'published'
      ORDER BY published_at DESC, id DESC
      LIMIT 3
    `)
    .all();
}

export default function Home() {
  const proposals = getProposals();

  return (
    <main id="innehall">
      <section className="hero">
        <Image
          className="hero__image"
          src={heroImage}
          alt="Barn som läser tillsammans"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero__shade" aria-hidden="true" />
        <div className="hero__rule" aria-hidden="true" />
        <div className="shell hero__inner">
          <p className="eyebrow">Riksförbundet för barns lärande</p>
          <h1>RiBLa</h1>
          <p className="hero__lead">Organisationer och människor tillsammans för barn.</p>
          <div className="hero__actions">
            <Link className="button button--primary" href="/bli-medlem">
              Bli medlem <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link className="text-link" href="/vara-fragor">
              Våra frågor
            </Link>
          </div>
        </div>
        <div className="hero__index shell" aria-label="RiBLas inriktning">
          <span>01 Barn</span>
          <span>02 Lärande</span>
          <span>03 Samverkan</span>
        </div>
      </section>

      <section className="position-section" aria-labelledby="position-heading">
        <div className="shell split-layout">
          <div>
            <p className="section-number">01 / Om RiBLa</p>
            <h2 id="position-heading">Ett gemensamt riksförbund.</h2>
          </div>
          <div className="position-copy">
            <p>En nationell organisation för föreningar och enskilda medlemmar.</p>
            <Link className="text-link" href="/om-oss">
              Så arbetar vi <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="proposals-section" aria-labelledby="proposals-heading">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="section-number">02 / Våra frågor</p>
              <h2 id="proposals-heading">Frågor vi samlas kring</h2>
            </div>
            <Link className="text-link text-link--desktop" href="/vara-fragor">
              Se alla frågor <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
          <ol className="proposal-list">
            {proposals.map((proposal, index) => (
              <li key={proposal.slug}>
                <Link href={`/vara-fragor/${proposal.slug}`}>
                  <span className="proposal-list__number">0{index + 1}</span>
                  <span className="proposal-list__content">
                    <strong>{proposal.title}</strong>
                    <span>{proposal.summary}</span>
                  </span>
                  <ArrowRight aria-hidden="true" size={24} />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="principles-section" aria-labelledby="principles-heading">
        <div className="shell">
          <p className="section-number">03 / Organisationen</p>
          <h2 id="principles-heading">Två sätt att vara med</h2>
          <div className="principles-grid">
            <article>
              <BookOpen aria-hidden="true" />
              <h3>Enskild medlem</h3>
              <p>För dig som vill bidra personligen.</p>
            </article>
            <article>
              <Landmark aria-hidden="true" />
              <h3>Medlemsorganisation</h3>
              <p>För föreningar och organisationer.</p>
            </article>
            <article>
              <Users aria-hidden="true" />
              <h3>Gemensam röst</h3>
              <p>En nationell plattform för samverkan.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="membership-band" aria-labelledby="membership-heading">
        <div className="shell membership-band__inner">
          <div>
            <p className="eyebrow">Gör rösten starkare</p>
            <h2 id="membership-heading">Bli en del av RiBLa.</h2>
          </div>
          <Link className="button button--light" href="/bli-medlem">
            Bli medlem <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
