import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__grid">
        <div>
          <p className="site-footer__brand">RiBLa</p>
          <p>Riksförbundet för barns lärande.</p>
        </div>
        <div>
          <p className="site-footer__heading">Organisationen</p>
          <Link href="/om-oss">Om RiBLa</Link>
          <Link href="/medlemsorganisationer">Medlemsorganisationer</Link>
          <Link href="/styrelse">Styrelse och styrning</Link>
          <Link href="/kontakt">Kontakt</Link>
        </div>
        <div>
          <p className="site-footer__heading">Juridiskt</p>
          <Link href="/integritet">Integritetspolicy</Link>
          <Link href="/stadgar">Stadgar</Link>
        </div>
      </div>
      <div className="shell site-footer__bottom">
        <span>© {new Date().getFullYear()} RiBLa</span>
        <span>ribla.org</span>
      </div>
    </footer>
  );
}