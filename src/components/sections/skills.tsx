import { expertiseAreas } from "@/data/skills";
import type { Locale } from "@/types/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillExplorer } from "./skill-explorer";

export function Skills({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const [primary, secondary] = [expertiseAreas.slice(0, 2), expertiseAreas.slice(2)];

  return (
    <section id="competences" className="section-alt section-space">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow={fr ? "Compétences" : "Skills"}
            title={fr ? "Un profil hybride, de l’utilisateur jusqu’à la donnée" : "A hybrid profile, from user needs to data"}
            description={fr ? "Le développement web et les bases de données au cœur de mon travail, soutenus par une solide pratique du support et de la livraison." : "Web development and databases at the core of my work, backed by solid support and delivery experience."}
          />
        </Reveal>

        {/* Bento: core areas get the large tiles. */}
        <div className="grid gap-5 md:grid-cols-2">
          {primary.map(({ icon: Icon, title, text }) => (
            <Reveal key={title.fr} className="h-full">
              <div className="card expertise-primary h-full p-7 md:p-8">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--brand)] text-white">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-extrabold md:text-2xl">{title[locale]}</h3>
                <p className="muted mt-3 leading-7">{text[locale]}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {secondary.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title.fr} delay={index * 0.05} className="h-full">
              <div className="card h-full p-6">
                <Icon className="text-[var(--brand)]" aria-hidden="true" />
                <h3 className="mt-4 font-extrabold">{title[locale]}</h3>
                <p className="muted mt-2 text-sm leading-6">{text[locale]}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <h3 className="mb-5 mt-16 text-2xl font-extrabold">{fr ? "Mes outils, en pratique" : "My tools, in practice"}</h3>
        <SkillExplorer locale={locale} />
      </div>
    </section>
  );
}
