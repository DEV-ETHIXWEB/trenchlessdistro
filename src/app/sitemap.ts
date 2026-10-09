import type { MetadataRoute } from "next";
import { ITEMS } from "@/data/catalog";
import { productHref } from "@/data/details";

const SITE = "https://trenchlessdistro.com";

/*
 * The homepage, the beginner explainer and one page per product. The rest
 * of the structure still lives as in-page anchors until the manufacturer and
 * support routes land in phase 1.
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
    ...ITEMS.map((i) => ({
      url: `${SITE}${productHref(i)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
