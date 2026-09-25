import { PLACEHOLDERS, SITE } from "@/data/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { isLocale } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const fr = value === "fr";
  const siteUrl = getSiteUrl();
  const title = fr ? "Marc Maurice Freeman — Développeur web full stack" : "Marc Maurice Freeman — Full-Stack Web Developer";
  return {
    title: fr ? "Développeur web full stack & Support TI" : "Full-Stack Web Developer & IT Support",
    description: fr ? "Portfolio de Marc Maurice Freeman : développement web full stack (PHP, JavaScript, Laravel, SQL), bases de données et soutien TI à Longueuil, Québec." : "Marc Maurice Freeman’s portfolio: full-stack web development (PHP, JavaScript, Laravel, SQL), databases and IT support in Longueuil, Québec.",
    alternates: siteUrl ? { canonical: `${siteUrl}/${value}`, languages: { "fr-CA": `${siteUrl}/fr`, "en-CA": `${siteUrl}/en`, "x-default": `${siteUrl}/fr` } } : undefined,
    openGraph: {
      title,
      description: SITE.signature[value],
      url: siteUrl ? `${siteUrl}/${value}` : undefined,
      locale: fr ? "fr_CA" : "en_CA",
      alternateLocale: fr ? ["en_CA"] : ["fr_CA"],
      siteName: "Marc Maurice Freeman",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: fr ? "Développement web full stack, bases de données et support TI à Longueuil." : "Full-stack web development, databases and IT support in Longueuil.",
    },
  };
}

export default async function PortfolioPage({ params }: PageProps<"/[locale]">) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const siteUrl = getSiteUrl();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.role[value],
    homeLocation: SITE.location,
    email: `mailto:${PLACEHOLDERS.email}`,
    sameAs: [PLACEHOLDERS.github, PLACEHOLDERS.linkedin],
    ...(siteUrl ? { url: `${siteUrl}/${value}` } : {}),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      <Header locale={value} />
      <main id="contenu"><Hero locale={value} /><Projects locale={value} /><Journey locale={value} /><Skills locale={value} /><About locale={value} /><Contact locale={value} /></main>
      <Footer locale={value} />
    </>
  );
}
