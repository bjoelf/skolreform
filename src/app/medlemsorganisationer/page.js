export const metadata = { title: "Medlemsorganisationer" };

export default function MemberOrganizationsPage() {
  return (
    <main id="innehall" className="editorial-page">
      <header className="page-intro shell">
        <p className="section-number">Riksförbundet</p>
        <h1>Medlemsorganisationer</h1>
        <p>Här får anslutna organisationer en tydlig plats.</p>
      </header>
      <div className="empty-state shell">
        <p>Lista och presentationer läggs till senare.</p>
      </div>
    </main>
  );
}