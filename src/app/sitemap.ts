import type { MetadataRoute } from "next";

const SITE = "https://trenchlessdistro.com";

/*
 * Only the homepage exists in this build. The in-page anchors are listed so
 * the structure of the page is discoverable now, and so the file is already
 * in the shape it needs when the catalog, manufacturer and support routes
 * land in phase 1 and these become real URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
