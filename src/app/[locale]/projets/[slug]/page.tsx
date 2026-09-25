import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, LockKeyhole, Mail } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { BrandIcon } from "@/components/ui/brand-icon";
import { coverClass, isPublicUrl, technologyLabel } from "@/components/ui/project-card";
import { ProjectGallery } from "@/components/ui/project-gallery";
import { getProject, projects } from "@/data/projects";
import { isPending } from "@/data/site";
import { isLocale, locales } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projets/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  const siteUrl = getSiteUrl();
  const path = (value: string) => `${siteUrl}/${value}/projets/${slug}`;
  return {
    title: project.title[locale],
    description: project.summary[locale],
    alternates: siteUrl ? { canonical: path(locale), languages: { "fr-CA": path("fr"), "en-CA": path("en"), "x-default": path("fr") } } : undefined,
    openGraph: { title: project.title[locale], description: project.summary[locale], url: siteUrl ? path(locale) : undefined, type: "article" },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projets/[slug]">) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();
  const fr = locale === "fr";
  const position = projects.indexOf(project);
  const next = projects[(position + 1) % projects.length];
  const features = project.features.filter((feature) => !isPending(feature[locale]));
  const story = [
    { title: fr ? "Le besoin" : "The need", text: project.problem[locale] },
    { title: fr ? "Ma contribution" : "My contribution", text: project.solution[locale] },
    { title: fr ? "Le résultat" : "The outcome", text: project.impact[locale] },
  ].filter(({ text }) => !isPending(text));
  const demo = isPublicUrl(project.projectUrl) ? project.projectUrl : null;
  const github = isPublicUrl(project.githubUrl) ? project.githubUrl : null;

  return (
    <>
      <Header locale={locale} />
      <main id="contenu" className="pb-20 pt-28">
        <article className="container-shell">
          <Link href={`/${locale}#projets`} className="muted inline-flex items-center gap-2 text-sm font-bold hover:text-[var(--brand)]">
            <ArrowLeft size={16} aria-hidden="true" />
            {fr ? "Tous les projets" : "All projects"}
          </Link>

          <header className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="eyebrow">{project.category[locale]}</p>
                {project.confidential ? <span className="badge"><LockKeyhole size={12} aria-hidden="true" />{fr ? "Anonymisé" : "Anonymized"}</span> : null}
                {!isPending(project.status[locale]) ? <span className="badge">{project.status[locale]}</span> : null}
              </div>
              <h1 className="section-title mt-4">{project.title[locale]}</h1>
              <p className="muted mt-5 text-lg leading-8">{project.summary[locale]}</p>
              {demo || github ? (
                <div className="mt-7 flex flex-wrap gap-3">
                  {demo ? <a className="button-primary" href={demo} target="_blank" rel="noopener noreferrer"><ExternalLink size={18} aria-hidden="true" />{fr ? "Voir la démo" : "View demo"}</a> : null}
                  {github ? <a className="button-secondary" href={github} target="_blank" rel="noopener noreferrer"><BrandIcon brand="github" size={18} />{fr ? "Code source" : "Source code"}</a> : null}
                </div>
              ) : null}
            </div>
            <div className="project-cover-frame relative aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border)]">
              <Image src={project.image} alt="" fill priority sizes="(max-width: 1024px) 100vw, 580px" className={coverClass(project)} unoptimized={project.image.endsWith(".svg")} />
            </div>
          </header>

          {story.length ? (
            <section aria-labelledby="etude" className="mt-16">
              <h2 id="etude" className="sr-only">{fr ? "Étude de cas" : "Case study"}</h2>
              <ol className="grid gap-5 md:grid-cols-3">
                {story.map(({ title, text }, index) => (
                  <li key={title} className="surface rounded-2xl p-6">
                    <p className="eyebrow">0{index + 1}</p>
                    <h3 className="mt-3 text-lg font-extrabold">{title}</h3>
                    <p className="muted mt-3 leading-7">{text}</p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.4fr_.6fr]">
            {features.length ? (
              <section aria-labelledby="fonctionnalites">
                <h2 id="fonctionnalites" className="text-2xl font-extrabold">{fr ? "Fonctionnalités clés" : "Key features"}</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {features.map((feature) => (
                    <li key={feature.fr} className="flex gap-3 leading-7 before:mt-2.5 before:h-2 before:w-2 before:shrink-0 before:rounded-full before:bg-[var(--brand)] before:content-['']">
                      {feature[locale]}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
            <section aria-labelledby="technologies">
              <h2 id="technologies" className="text-2xl font-extrabold">{fr ? "Technologies" : "Technologies"}</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((technology) => <li key={technology} className="tag">{technologyLabel(technology, locale)}</li>)}
              </ul>
              {project.aiAssistance ? <p className="muted mt-5 text-sm leading-6">{project.aiAssistance[locale]}</p> : null}
            </section>
          </div>

          {project.gallery?.length ? (
            <section aria-labelledby="interfaces" className="mt-16">
              <h2 id="interfaces" className="text-2xl font-extrabold">{fr ? "Interfaces" : "Interfaces"}</h2>
              {project.confidential ? <p className="muted mt-2 text-sm">{fr ? "Captures anonymisées : les données sensibles ont été masquées." : "Anonymized screenshots: sensitive data has been masked."}</p> : null}
              <div className="mt-6"><ProjectGallery project={project} locale={locale} /></div>
            </section>
          ) : null}

          <nav aria-label={fr ? "Suite de la visite" : "Keep exploring"} className="mt-20 grid gap-5 border-t border-[var(--border)] pt-10 md:grid-cols-2">
            <Link href={`/${locale}/projets/${next.slug}`} className="card card-interactive group p-6">
              <p className="muted text-sm font-bold">{fr ? "Projet suivant" : "Next project"}</p>
              <p className="mt-2 flex items-center justify-between gap-3 text-lg font-extrabold">{next.title[locale]}<ArrowRight size={20} aria-hidden="true" className="project-arrow shrink-0 text-[var(--brand)]" /></p>
            </Link>
            <Link href={`/${locale}#contact`} className="card card-interactive group p-6">
              <p className="muted text-sm font-bold">{fr ? "Un projet similaire ?" : "A similar project?"}</p>
              <p className="mt-2 flex items-center justify-between gap-3 text-lg font-extrabold">{fr ? "Discutons-en" : "Let’s talk"}<Mail size={20} aria-hidden="true" className="shrink-0 text-[var(--brand)]" /></p>
            </Link>
          </nav>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
