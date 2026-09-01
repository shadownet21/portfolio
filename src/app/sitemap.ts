import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  return ["fr", "en"].map((locale) => ({ url: `${siteUrl}/${locale}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: locale === "fr" ? 1 : .9 }));
}
