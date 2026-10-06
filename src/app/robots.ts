import type { MetadataRoute } from "next";

const SITE = "https://trenchlessdistro.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing to hide yet; this is where the future cart, account and
        // internal search routes get excluded.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
