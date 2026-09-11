import {
  Compass,
  GraduationCap,
  Languages,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import { values } from "@/data/profile";
import type { Locale } from "@/types/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = [Compass, GraduationCap, Lightbulb, Sparkles];

export function About({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <section id="a-propos" className="section-alt section-space">
      <div className="container-shell">
        {/* TITRE DE LA SECTION */}
        <Reveal direction="up" duration={0.8} distance={35}>
          <SectionHeading
            eyebrow={fr ? "Mon parcours" : "My journey"}
            title={
              fr
                ? "La technologie au service des personnes et des opérations"
                : "Technology serving people and operations"
            }
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          {/* =========================
              COLONNE DE GAUCHE
          ========================== */}
          <div>
            {/* TEXTE */}
            <Reveal
              direction="left"
              duration={0.85}
              distance={50}
              className="space-y-5 text-base leading-8 md:text-lg"
            >
              <p>
                {fr
                  ? "Je relie développement web, support TI et données pour simplifier le quotidien des équipes. Planification, priorités et coordination complètent mon approche."
                  : "I connect web development, IT support and data to simplify everyday work. Planning, priorities and coordination complete my approach."}
              </p>

              <p>
                {fr
                  ? "À Longueuil, je poursuis ma formation CyberCap à Montréal : programmation, réseaux, cybersécurité et IA."
                  : "Based in Longueuil, I am continuing my CyberCap training in Montréal: programming, networking, cybersecurity and AI."}
              </p>
            </Reveal>

            {/* CARTE LANGUES */}
            <Reveal
              direction="left"
              delay={0.12}
              duration={0.75}
              distance={35}
              className="mt-7"
            >
              <div className="card flex items-start gap-4 p-5 text-base leading-6">
                <Languages
                  className="mt-0.5 shrink-0 text-[var(--brand)]"
                  aria-hidden="true"
                />

                <div>
                  <h3 className="font-extrabold">
                    {fr ? "Langues" : "Languages"}
                  </h3>

                  <p className="muted mt-2">
                    {fr
                      ? "Français courant · Anglais intermédiaire"
                      : "Fluent French · Intermediate English"}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* =========================
              COLONNE DE DROITE
          ========================== */}
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = icons[index];

              return (
                <Reveal
                  key={value.title.fr}
                  direction="right"
                  delay={0.1 + index * 0.1}
                  duration={0.75}
                  distance={45}
                  className="h-full"
                >
                  <div className="card h-full p-5">
                    <Icon
                      className="mb-6 text-[var(--brand)]"
                      aria-hidden="true"
                    />

                    <h3 className="font-extrabold">{value.title[locale]}</h3>

                    <p className="muted mt-2 text-sm leading-6">
                      {value.description[locale]}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
