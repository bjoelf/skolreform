import { getDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

const staticRoutes = [
  "",
  "/vara-fragor",
  "/aktuellt",
  "/om-oss",
  "/medlemsorganisationer",
  "/bli-medlem",
  "/kontakt",
  "/styrelse",
  "/integritet",
  "/stadgar",
];

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ribla.org";
  const proposals = getDatabase()
    .prepare(`
      SELECT slug, updated_at
      FROM content
      WHERE type = 'proposal' AND status = 'published'
    `)
    .all();

  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}` })),
    ...proposals.map((proposal) => ({
      url: `${baseUrl}/vara-fragor/${proposal.slug}`,
      lastModified: proposal.updated_at,
    })),
  ];
}