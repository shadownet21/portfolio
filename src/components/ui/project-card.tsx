import { BrandIcon } from "@/components/ui/brand-icon";
import { ArrowRight, ExternalLink, LockKeyhole } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { isPending, isPlaceholder } from "@/data/site";
import type { Locale, Project } from "@/types/content";

const MAX_TAGS = 4;

export function isPublicUrl(href: string) {
  return /^https?:\/\//.test(href) && !isPlaceholder(href);
}

export function technologyLabel(technology: string, locale: Locale) {
  return technology === "API IA" && locale === "en" ? "AI API" : technology;
}

export function coverClass(project: Project) {
  const svg = project.image.endsWith(".svg");
  return (project.coverFit ?? (svg ? "contain" : "cover")) === "contain" ? "object-contain p-5" : "object-cover object-top";
}

export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const fr = locale === "fr";
  const technologies = project.technologies.filter((technology) => !isPending(technology));
  const hiddenCount = technologies.length - MAX_TAGS;
  const link = (href: string, kind: "demo" | "github") =>
    isPublicUrl(href) ? (
      <a
        className="button-secondary relative z-10 !min-h-10 !py-2 text-sm"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${kind === "github" ? "GitHub" : fr ? "Démonstration" : "Demo"} — ${project.title[locale]}`}
      >
        {kind === "github" ? <BrandIcon brand="github" size={16} /> : <ExternalLink size={16} aria-hidden="true" />}
        {kind === "github" ? "GitHub" : fr ? "Démo" : "Demo"}
      </a>
    ) : null;
  const demo = link(project.projectUrl, "demo");
  const github = link(project.githubUrl, "github");

  return (
    <article className="card project-card flex h-full flex-col overflow-hidden">
      <div className="project-cover-frame relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={`project-cover ${coverClass(project)}`}
          unoptimized={project.image.endsWith(".svg")}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[var(--brand)]">{project.category[locale]}</span>
          {project.confidential ? (
            <span className="badge">
              <LockKeyhole size={12} aria-hidden="true" />
              {fr ? "Anonymisé" : "Anonymized"}
            </span>
          ) : null}
        </div>
        <h3 className="mt-3 text-xl font-extrabold tracking-[-.025em]">
          {/* Stretched link: the whole card opens the case study. */}
          <Link href={`/${locale}/projets/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {project.title[locale]}
          </Link>
        </h3>
        <p className="muted mt-3 line-clamp-3 text-sm leading-6">{project.summary[locale]}</p>
        {project.featured && !isPending(project.impact[locale]) ? (
          <div className="mt-4 rounded-lg bg-[var(--surface-muted)] p-4 text-sm leading-6">
            <p className="font-extrabold">{fr ? "Résultat" : "Outcome"}</p>
            <p className="muted mt-1 line-clamp-4">{project.impact[locale]}</p>
          </div>
        ) : null}
        {technologies.length ? (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={fr ? "Technologies" : "Technologies"}>
            {technologies.slice(0, MAX_TAGS).map((technology) => (
              <li className="tag" key={technology}>{technologyLabel(technology, locale)}</li>
            ))}
            {hiddenCount > 0 ? <li className="tag">+{hiddenCount}</li> : null}
          </ul>
        ) : null}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <span className="mr-auto inline-flex items-center gap-1.5 text-sm font-bold text-[var(--brand)]" aria-hidden="true">
            {fr ? "Voir l’étude de cas" : "View case study"}
            <ArrowRight size={16} className="project-arrow" />
          </span>
          {demo}
          {github}
        </div>
      </div>
    </article>
  );
}
