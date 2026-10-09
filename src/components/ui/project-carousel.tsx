"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { ProjectCard } from "@/components/ui/project-card";
import { useSwipe } from "@/lib/use-swipe";
import type { Locale, Project } from "@/types/content";

// Cards further than this from the active one fade out, then leave the layout.
const MAX_VISIBILITY = 3;

// 3D carousel adapted from https://codepen.io/ykadosh/pen/ZEJLapj.
export function ProjectCarousel({ projects, locale }: { projects: Project[]; locale: Locale }) {
  const fr = locale === "fr";
  const count = projects.length;
  const [active, setActive] = useState(() => Math.floor((count - 1) / 2));
  const go = (index: number) => setActive(Math.min(Math.max(index, 0), count - 1));
  const swipe = useSwipe((direction) => go(active + direction));

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") go(active - 1);
    else if (event.key === "ArrowRight") go(active + 1);
    else return;
    event.preventDefault();
  }

  const nav = (direction: -1 | 1) => {
    const blocked = direction < 0 ? active === 0 : active === count - 1;
    const Icon = direction < 0 ? ChevronLeft : ChevronRight;
    return (
      <button
        type="button"
        className={`carousel-nav ${direction < 0 ? "carousel-prev" : "carousel-next"}`}
        onClick={() => go(active + direction)}
        aria-disabled={blocked}
        aria-label={direction < 0 ? (fr ? "Projet précédent" : "Previous project") : fr ? "Projet suivant" : "Next project"}
      >
        <Icon size={30} aria-hidden="true" />
      </button>
    );
  };

  return (
    <div
      className="project-carousel"
      role="region"
      aria-roledescription={fr ? "carrousel" : "carousel"}
      aria-label={fr ? "Autres réalisations" : "Other projects"}
      onKeyDown={onKeyDown}
      {...swipe}
    >
      <div className="carousel-stage">
        {projects.map((project, index) => {
          const distance = active - index;
          const isActive = distance === 0;
          return (
            <div
              key={project.slug}
              className="carousel-card"
              role="group"
              aria-roledescription={fr ? "diapositive" : "slide"}
              aria-label={`${index + 1} / ${count}`}
              inert={!isActive}
              style={{
                "--offset": distance / 3,
                "--direction": Math.sign(distance),
                "--abs-offset": Math.abs(distance) / 3,
                opacity: Math.abs(distance) >= MAX_VISIBILITY ? 0 : 1,
                display: Math.abs(distance) > MAX_VISIBILITY ? "none" : undefined,
              } as CSSProperties}
            >
              <ProjectCard project={project} locale={locale} />
            </div>
          );
        })}
      </div>

      <div className="carousel-controls">
        {nav(-1)}
        <p className="muted text-sm font-bold" aria-live="polite">
          {active + 1} / {count}
        </p>
        {nav(1)}
      </div>
    </div>
  );
}
