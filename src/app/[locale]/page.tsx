import { PLACEHOLDERS, SITE } from "@/data/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Expertise } from "@/components/sections/expertise";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LanguageSync } from "@/components/layout/language-sync";
import { isLocale, locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

interface PageProps { params: Promise<{ locale: string }> }

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const fr = value === "fr";
  const siteUrl = getSiteUrl();
  return {
    title: fr ? "Support TI & Développeur Web" : "IT Support & Web Developer",
    description: fr ? "Portfolio de Marc Maurice Freeman : soutien TI, développement web, bases de données et coordination de projets technologiques à Longueuil, Québec." : "Marc Maurice Freeman’s portfolio: IT support, web development, databases and technology project coordination in Longueuil, Québec.",
    alternates: siteUrl ? { canonical: `${siteUrl}/${value}`, languages: { "fr-CA": `${siteUrl}/fr`, "en-CA": `${siteUrl}/en`, "x-default": `${siteUrl}/fr` } } : undefined,
    openGraph: {
      title: fr ? "Marc Maurice Freeman — Support TI & Développeur Web" : "Marc Maurice Freeman — IT Support & Web Developer",
      description: SITE.signature[value],
      url: siteUrl ? `${siteUrl}/${value}` : undefined,
      locale: fr ? "fr_CA" : "en_CA",
      alternateLocale: fr ? ["en_CA"] : ["fr_CA"],
      siteName: "Marc Maurice Freeman",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fr ? "Marc Maurice Freeman — Support TI & Développeur Web" : "Marc Maurice Freeman — IT Support & Web Developer",
      description: fr ? "Support TI, développement web et bases de données à Longueuil." : "IT support, web development and databases in Longueuil.",
    },
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const siteUrl = getSiteUrl();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.role[value],
    homeLocation: SITE.location,
    sameAs: [PLACEHOLDERS.github, PLACEHOLDERS.linkedin],
    ...(siteUrl ? { url: `${siteUrl}/${value}` } : {}),
  };
  return (
    <div lang={value === "fr" ? "fr-CA" : "en-CA"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      <LanguageSync locale={value} />
      <Header locale={value} />
      <main id="contenu"><Hero locale={value} /><Projects locale={value} /><About locale={value} /><Expertise locale={value} /><Journey locale={value} /><Skills locale={value} /><Contact locale={value} /></main>
      <Footer locale={value} />
    </div>
  );
}
