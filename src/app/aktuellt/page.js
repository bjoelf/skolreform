export const metadata = { title: "Aktuellt" };

export default function NewsPage() {
  return (
    <main id="innehall" className="editorial-page">
      <header className="page-intro shell">
        <p className="section-number">Nyheter och analys</p>
        <h1>Aktuellt</h1>
        <p>Här publiceras organisationens nyheter, analyser och kommentarer.</p>
      </header>
      <div className="empty-state shell">
        <p>Den första artikeln är ännu inte publicerad.</p>
      </div>
    </main>
  );
}