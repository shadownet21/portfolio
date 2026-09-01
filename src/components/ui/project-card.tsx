import { CodeXml, ExternalLink, LockKeyhole } from "lucide-react";
import Image from "next/image";
import { isPending, isPlaceholder } from "@/data/site";
import type { Locale, Project } from "@/types/content";

export function ProjectCard({ project, locale, compact = false }: { project: Project; locale: Locale; compact?: boolean }) {
  const fr = locale === "fr";
  const visibleFeatures = project.features.filter((feature) => !isPending(feature[locale]));
  const visibleTechnologies = project.technologies.filter((technology) => !isPending(technology));
  const hasDetails = !isPending(project.problem[locale]) || !isPending(project.solution[locale]) || visibleFeatures.length > 0 || !isPending(project.impact[locale]);
  const link = (href: string, kind: "demo" | "github") => isPlaceholder(href) ? null : (
    <a className="button-secondary" href={href} target="_blank" rel="noreferrer" aria-label={`${kind === "github" ? "GitHub" : fr ? "Démonstration" : "Demo"} — ${project.title[locale]}`}>
      {kind === "github" ? <CodeXml size={17} /> : <ExternalLink size={17} />}{kind === "github" ? "GitHub" : fr ? "Démo" : "Demo"}
    </a>
  );
  return (
    <article className={`card overflow-hidden ${compact ? "flex h-full flex-col" : "grid lg:grid-cols-[.78fr_1.22fr]"}`}>
      <div className={`relative bg-[#071a36] ${compact ? "min-h-48" : "min-h-60"}`}>
        <Image src={project.image} alt="" fill sizes={compact ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 1024px) 100vw, 40vw"} className="object-cover" />
        {!isPending(project.status[locale]) ? <div className="absolute left-4 top-4 rounded-full bg-[#071a36]/85 px-3 py-2 text-xs font-bold text-white backdrop-blur">{project.status[locale]}</div> : null}
      </div>
      <div className={`${compact ? "flex flex-1 flex-col p-6" : "p-6 md:p-8"}`}>
        <div className="flex flex-wrap items-center gap-2"><span className="eyebrow">{project.category[locale]}</span>{project.confidential ? <span className="tag"><LockKeyhole className="mr-1" size={13} />{fr ? "Anonymisé" : "Anonymized"}</span> : null}</div>
        <h3 className={`mt-3 font-extrabold tracking-[-.025em] ${compact ? "text-xl" : "text-2xl"}`}>{project.title[locale]}</h3>
        <p className="muted mt-3 leading-7">{project.summary[locale]}</p>
        {hasDetails ? <details className="mt-5 border-t border-[var(--border)] pt-4">
          <summary className="cursor-pointer font-bold text-[var(--brand)]">{fr ? "Voir l’étude de cas" : "View case study"}</summary>
          <div className="mt-4 grid gap-4 text-sm leading-6 sm:grid-cols-2">
            {!isPending(project.problem[locale]) ? <div><h4 className="font-extrabold">{fr ? "Problème" : "Problem"}</h4><p className="muted mt-1">{project.problem[locale]}</p></div> : null}
            {!isPending(project.solution[locale]) ? <div><h4 className="font-extrabold">{fr ? "Solution" : "Solution"}</h4><p className="muted mt-1">{project.solution[locale]}</p></div> : null}
            {visibleFeatures.length ? <div><h4 className="font-extrabold">{fr ? "Fonctionnalités" : "Features"}</h4><ul className="muted mt-1 list-outside list-disc pl-4">{visibleFeatures.map((feature) => <li key={feature.fr}>{feature[locale]}</li>)}</ul></div> : null}
            {!isPending(project.impact[locale]) ? <div><h4 className="font-extrabold">{fr ? "Impact" : "Impact"}</h4><p className="muted mt-1">{project.impact[locale]}</p></div> : null}
          </div>
        </details> : null}
        {visibleTechnologies.length ? <div className="mt-5 flex flex-wrap gap-2">{visibleTechnologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div> : null}
        {(link(project.projectUrl, "demo") || link(project.githubUrl, "github")) ? <div className="mt-6 flex flex-wrap gap-3">{link(project.projectUrl, "demo")}{link(project.githubUrl, "github")}</div> : null}
      </div>
    </article>
  );
}
