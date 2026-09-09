import { Compass, GraduationCap, Languages, Lightbulb, Sparkles } from "lucide-react";
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
        <SectionHeading eyebrow={fr ? "Mon parcours" : "My journey"} title={fr ? "La technologie au service des personnes et des opérations" : "Technology serving people and operations"} />
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal className="space-y-5 text-base leading-8 md:text-lg">
            <p>{fr ? "Mon parcours relie le support TI et le développement web : maintien d’applications métiers, création d’outils internes, exploitation de bases de données et accompagnement quotidien des utilisateurs. J’y apporte également une approche de gestionnaire de projets junior, axée sur la planification des tâches, le suivi des priorités et la coordination des échanges pour contribuer à la réussite des projets." : "My path connects IT support and web development: maintaining business applications, building internal tools, working with databases and supporting users day to day."}</p>
            <p>{fr ? "Installé à Longueuil, je poursuis en 2026 une formation CyberCap à Montréal couvrant la programmation, les réseaux, la cybersécurité et l’intelligence artificielle. Mon objectif est de contribuer avec rigueur au marché technologique québécois." : "Based in Longueuil, I am completing CyberCap training in Montréal in 2026, covering programming, networking, cybersecurity and artificial intelligence. My goal is to contribute rigorously to Québec’s technology sector."}</p>
            <div className="card !mt-7 flex items-start gap-4 p-5 text-base leading-6"><Languages className="mt-0.5 shrink-0 text-[var(--brand)]" aria-hidden="true" /><div><h3 className="font-extrabold">{fr ? "Langues" : "Languages"}</h3><p className="muted mt-2">{fr ? "Français courant · Anglais intermédiaire" : "Fluent French · Intermediate English"}</p></div></div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value, index) => { const Icon = icons[index]; return <Reveal key={value.title.fr} delay={index * .06} className="card p-5"><Icon className="mb-6 text-[var(--brand)]" aria-hidden="true" /><h3 className="font-extrabold">{value.title[locale]}</h3><p className="muted mt-2 text-sm leading-6">{value.description[locale]}</p></Reveal>; })}
          </div>
        </div>
      </div>
    </section>
  );
}
