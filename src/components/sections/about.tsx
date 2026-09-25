import {
  Building2,
  Compass,
  GraduationCap,
  Languages,
  Lightbulb,
  Sparkles,
} from "lucide-react";

import { references, values } from "@/data/profile";
import type { Locale } from "@/types/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = [Compass, GraduationCap, Lightbulb, Sparkles];

export function About({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <section id="a-propos" className="section-space">
      <div className="container-shell">
        {/* TITRE DE LA SECTION */}
        <Reveal direction="up" duration={0.8} distance={35}>
          <SectionHeading
            eyebrow={fr ? "À propos" : "About"}
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
                  ? "Développeur web full stack depuis 2018, j’ai conçu des applications métier pour une agence web, puis pour un réseau coopératif financier de plus de 120 agences. De l’analyse du besoin au déploiement, je m’appuie sur la gestion des données, les tests et la coordination avec les équipes."
                  : "A full-stack web developer since 2018, I have built business applications for a web agency and then for a cooperative financial network of more than 120 branches. From requirements to deployment, I draw on data management, testing and coordination with teams."}
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

            {/* RÉFÉRENCES */}
            <Reveal delay={0.1} className="mt-5">
              <div className="card p-5">
                <h3 className="flex items-center gap-3 font-extrabold">
                  <Building2 className="shrink-0 text-[var(--brand)]" aria-hidden="true" />
                  {fr ? "Ils m’ont fait confiance" : "Organizations I have worked with"}
                </h3>
                <ul className="mt-4 grid gap-3">
                  {references.map(({ name, work }) => (
                    <li key={name} className="border-l-2 border-[var(--brand)] pl-3 text-sm leading-6">
                      <span className="font-bold">{name}</span>
                      <span className="muted"> — {work[locale]}</span>
                    </li>
                  ))}
                </ul>
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
