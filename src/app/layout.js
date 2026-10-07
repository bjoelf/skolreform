import "./globals.css";
import { Manrope, Newsreader } from "next/font/google";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ribla.org"),
  title: {
    default: "RiBLa",
    template: "%s | RiBLa",
  },
  description: "Riksförbundet för barns lärande.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sv">
      <body className={`${sans.variable} ${serif.variable}`}>
        <a className="skip-link" href="#innehall">
          Hoppa till innehållet
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
