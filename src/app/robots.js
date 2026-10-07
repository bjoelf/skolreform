export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ribla.org";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/medlem/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}