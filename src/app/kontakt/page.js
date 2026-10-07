export const metadata = { title: "Kontakt" };

export default function ContactPage() {
  return (
    <main id="innehall" className="editorial-page">
      <header className="page-intro shell">
        <p className="section-number">Hör av dig</p>
        <h1>Kontakt</h1>
        <p>Kontaktuppgifter publiceras här när organisationens adress är beslutad.</p>
      </header>
      <section className="prose-section shell">
        <h2>Press och allmänna frågor</h2>
        <p>
          En kontaktfunktion med tydlig information om personuppgiftshantering
          kopplas in tillsammans med organisationens e-posttjänst.
        </p>
      </section>
    </main>
  );
}