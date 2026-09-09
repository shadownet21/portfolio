import { ArrowRight } from "lucide-react";

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
        {/* TITRE */}
        <Reveal direction="up" duration={0.8} distance={35}>
          <SectionHeading
            eyebrow={fr ? "Projets sélectionnés" : "Selected projects"}
            title={
              fr
                ? "Des solutions ancrées dans des besoins concrets"
                : "Solutions grounded in real needs"
            }
            description={
              fr
                ? "Applications métier, produits web et initiatives techniques. Les informations confidentielles sont volontairement anonymisées."
                : "Business applications, web products and technical initiatives. Confidential information is intentionally anonymized."
            }
          />
        </Reveal>

        {/* =========================
            PROJETS PRINCIPAUX
        ========================== */}
        <div className="grid gap-7">
          {featuredProjects.map((project, index) => (
            <Reveal
              key={project.slug}
              direction={index % 2 === 0 ? "left" : "right"}
              distance={45}
              duration={0.8}
            >
              <ProjectCard project={project} locale={locale} />
            </Reveal>
          ))}
        </div>

        {/* =========================
            AUTRES RÉALISATIONS
        ========================== */}
        {secondaryProjects.length > 0 && (
          <>
            <Reveal direction="up" duration={0.7} distance={25}>
              <h3 className="mt-14 text-xl font-extrabold">
                {fr ? "Autres réalisations" : "Additional work"}
              </h3>
            </Reveal>

            <div className="mt-6 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
              {secondaryProjects.map((project, index) => (
                <Reveal
                  key={project.slug}
                  direction="scale"
                  delay={index * 0.07}
                  duration={0.7}
                  className="h-full"
                >
                  <ProjectCard project={project} locale={locale} compact />
                </Reveal>
              ))}
            </div>
          </>
        )}

        {/* =========================
            APPEL À L'ACTION
        ========================== */}
        <Reveal direction="up" delay={0.1} duration={0.75} distance={30}>
          <div className="mt-16 text-center">
            <p className="muted mx-auto mb-5 max-w-xl text-base md:text-lg">
              {fr
                ? "Un projet, une opportunité ou simplement envie d’échanger ?"
                : "Have a project, an opportunity, or simply want to connect?"}
            </p>

            <a href="#contact" className="button-primary">
              {fr ? "Contactez-moi" : "Contact me"}

              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
