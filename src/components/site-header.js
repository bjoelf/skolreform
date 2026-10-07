import Image from "next/image";
import Link from "next/link";
import { LogIn, Menu } from "lucide-react";
import logo from "../../logo.jpeg";

const navigation = [
  { href: "/vara-fragor", label: "Våra frågor" },
  { href: "/aktuellt", label: "Aktuellt" },
  { href: "/om-oss", label: "Om RiBLa" },
  { href: "/bli-medlem", label: "Bli medlem" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <Link className="wordmark" href="/" aria-label="RiBLa, startsida">
          <Image
            className="site-logo"
            src={logo}
            alt=""
            priority
            sizes="(max-width: 850px) 190px, 270px"
          />
        </Link>
        <nav aria-label="Huvudmeny">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Öppna meny">
            <Menu aria-hidden="true" size={22} />
          </summary>
          <div>
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </details>
        <Link className="member-login" href="/logga-in">
          <LogIn aria-hidden="true" size={17} />
          Medlemsinloggning
        </Link>
      </div>
    </header>
  );
}