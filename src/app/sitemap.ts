import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];
  return locales.flatMap((locale) => [
    { url: `${siteUrl}/${locale}`, changeFrequency: "monthly" as const, priority: locale === "fr" ? 1 : .9 },
    ...projects.map(({ slug }) => ({ url: `${siteUrl}/${locale}/projets/${slug}`, changeFrequency: "yearly" as const, priority: .7 })),
  ]);
}
