import { projects } from "@/data/projects";
import type { Locale } from "@/types/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";

export function Projects({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const featuredProjects = projects.filter((project) => project.featured);
  const secondaryProjects = projects.filter((project) => !project.featured);
  
  return (
    <section id="projets" className="section-alt section-space">
      <div className="container-shell">
        <SectionHeading 
          eyebrow={fr ? "Projets sélectionnés" : "Selected projects"} 
          title={fr ? "Des solutions ancrées dans des besoins concrets" : "Solutions grounded in real needs"} 
          description={fr ? "Applications métier, produits web et initiatives techniques. Les informations confidentielles sont volontairement anonymisées." : "Business applications, web products and technical initiatives. Confidential information is intentionally anonymized."} 
        />
        
        <div className="grid gap-7">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * .04, .12)}>
              <ProjectCard project={project} locale={locale} />
            </Reveal>
          ))}
        </div>
        
        <h3 className="mt-14 text-xl font-extrabold">
          {fr ? "Autres réalisations" : "Additional work"}
        </h3>
        
        <div className="mt-6 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
          {secondaryProjects.map((project, index) => (
            <Reveal key={project.slug} delay={Math.min(index * .04, .12)} className="h-full">
              <ProjectCard project={project} locale={locale} compact />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
