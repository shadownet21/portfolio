import { ProjectGallery } from "@/components/ui/project-gallery";
import { BrandIcon } from "@/components/ui/brand-icon";
import { ExternalLink, LockKeyhole } from "lucide-react";
import Image from "next/image";
import { isPending, isPlaceholder } from "@/data/site";
import type { Locale, Project } from "@/types/content";

export function ProjectCard({
  project,
  locale,
  compact = false,
}: {
  project: Project;
  locale: Locale;
  compact?: boolean;
}) {
  const fr = locale === "fr";
  const visibleFeatures = project.features.filter(
    (feature) => !isPending(feature[locale]),
  );
  const visibleTechnologies = project.technologies.filter(
    (technology) => !isPending(technology),
  );
  const hasDetails =
    !isPending(project.problem[locale]) ||
    !isPending(project.solution[locale]) ||
    visibleFeatures.length > 0 ||
    !isPending(project.impact[locale]);
  const link = (href: string, kind: "demo" | "github") =>
    !/^https?:\/\//.test(href) || isPlaceholder(href) ? null : (
      <a
        className="button-secondary"
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${kind === "github" ? "GitHub" : fr ? "Démonstration" : "Demo"} — ${project.title[locale]}`}
      >
        {kind === "github" ? <BrandIcon brand="github" size={17} /> : <ExternalLink size={17} />}
        {kind === "github" ? "GitHub" : fr ? "Démo" : "Demo"}
      </a>
    );
  return (
    <article
      className={`card project-card overflow-hidden ${compact ? "flex h-full flex-col" : "grid lg:grid-cols-[.78fr_1.22fr]"}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title[locale]}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={project.image.endsWith(".svg") ? "project-cover object-contain p-5" : "project-cover object-contain p-2"}
          unoptimized={project.image.endsWith(".svg")}
        />
      </div>
      <div className={`${compact ? "flex flex-1 flex-col p-6" : "p-6 md:p-8"}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[var(--brand)]">{project.category[locale]}</span>
          {project.confidential ? (
            <span className="tag">
              <LockKeyhole className="mr-1" size={13} />
              {fr ? "Anonymisé" : "Anonymized"}
            </span>
          ) : null}
        </div>
        <h3
          className={`mt-3 font-extrabold tracking-[-.025em] ${compact ? "text-xl" : "text-2xl"}`}
        >
          {project.title[locale]}
        </h3>
        <p className="muted mt-3 text-sm leading-6">{project.summary[locale]}</p>
        {project.featured && !isPending(project.impact[locale]) ? (
          <div className="mt-4 rounded-lg bg-[var(--surface-muted)] p-4 text-sm leading-6">
            <p className="font-extrabold">{fr ? "Résultat" : "Outcome"}</p>
            <p className="muted mt-1">{project.impact[locale]}</p>
          </div>
        ) : null}
        {hasDetails ? (
          <details className="mt-5 border-t border-[var(--border)] pt-4">
            <summary className="cursor-pointer font-bold text-[var(--brand)]">
              {fr ? "Voir l’étude de cas" : "View case study"}
            </summary>
                        <div className="mt-4 grid gap-4 text-sm leading-6">
              {!isPending(project.problem[locale]) ? (
                <div>
                  <h4 className="font-extrabold">
                    {fr ? "Problème" : "Problem"}
                  </h4>
                  <p className="muted mt-1">{project.problem[locale]}</p>
                </div>
              ) : null}
              {!isPending(project.solution[locale]) ? (
                <div>
                  <h4 className="font-extrabold">
                    {fr ? "Ma contribution" : "My contribution"}
                  </h4>
                  <p className="muted mt-1">{project.solution[locale]}</p>
                </div>
              ) : null}
              {visibleFeatures.length ? (
                <div>
                  <h4 className="font-extrabold">
                    {fr ? "Fonctionnalités" : "Features"}
                  </h4>
                  <ul className="muted mt-1 list-outside list-disc pl-4">
                    {visibleFeatures.map((feature) => (
                      <li key={feature.fr}>{feature[locale]}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {!project.featured && !isPending(project.impact[locale]) ? (
                <div>
                  <h4 className="font-extrabold">{fr ? "Impact" : "Impact"}</h4>
                  <p className="muted mt-1">{project.impact[locale]}</p>
                </div>
              ) : null}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">{visibleTechnologies.map(technology => <span className="tag" key={technology}>{technology}</span>)}</div>
          </details>
        ) : null}
        {project.aiAssistance ? <p className="muted mt-4 text-xs leading-5">{project.aiAssistance[locale]}</p> : null}
        {visibleTechnologies.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {visibleTechnologies.slice(0, 3).map((technology) => (
              <span className="tag" key={technology}>
                {technology === "API IA" && !fr ? "AI API" : technology}
              </span>
            ))}
          </div>
        ) : null}
        {project.gallery?.length || link(project.projectUrl, "demo") ||
        link(project.githubUrl, "github") ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            <ProjectGallery project={project} locale={locale} />
            {link(project.projectUrl, "demo")}
            {link(project.githubUrl, "github")}
          </div>
        ) : null}
      </div>
    </article>
  );
}
