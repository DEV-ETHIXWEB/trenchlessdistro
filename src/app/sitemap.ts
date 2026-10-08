import type { MetadataRoute } from "next";

const SITE = "https://trenchlessdistro.com";

/*
 * Two routes exist in this build: the homepage and the beginner explainer.
 * The rest of the structure still lives as in-page anchors, and this file is
 * already in the shape it needs when the catalog, manufacturer and support
 * routes land in phase 1 and those become real URLs.
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
    {
      url: `${SITE}/new-to-cipp`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
