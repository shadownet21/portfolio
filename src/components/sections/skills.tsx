import { skillGroups } from "@/data/skills";
import type { Locale, SkillLevel } from "@/types/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const levelStyles: Record<SkillLevel, string> = {
  professional: "border-blue-600/30 bg-blue-600/10 text-[var(--brand-strong)]",
  operational: "border-teal-600/30 bg-teal-600/10 text-[var(--skill-operational)]",
  learning: "border-amber-600/30 bg-amber-500/10 text-[var(--skill-learning)]",
};

export function Skills({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const labels: Record<SkillLevel, string> = { professional: fr ? "Expérience professionnelle" : "Professional experience", operational: fr ? "Pratique opérationnelle" : "Working knowledge", learning: fr ? "En apprentissage" : "Learning" };
  return (
    <section id="competences" className="section-alt section-space">
      <div className="container-shell">
        <SectionHeading eyebrow={fr ? "Compétences" : "Skills"} title={fr ? "Des outils choisis selon le problème" : "Tools selected for the problem"} description={fr ? "Les niveaux reflètent l’usage professionnel ou actuel, sans pourcentages arbitraires." : "Levels reflect professional or current usage, without arbitrary percentages."} />
        <div className="mb-8 flex flex-wrap gap-3" aria-label={fr ? "Légende des niveaux" : "Skill level legend"}>{(["professional", "operational", "learning"] as SkillLevel[]).map((level) => <span key={level} className={`rounded-full border px-3 py-1 text-xs font-bold ${levelStyles[level]}`}>{labels[level]}</span>)}</div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{skillGroups.map((group, index) => <Reveal key={group.category.fr} className="card p-6" delay={index * .04}><h3 className="text-lg font-extrabold">{group.category[locale]}</h3><div className="mt-5 flex flex-wrap gap-2">{group.skills.map((skill) => <span key={skill.name} className={`rounded-md border px-2.5 py-1.5 text-sm font-semibold ${levelStyles[skill.level]}`} title={labels[skill.level]}>{skill.name}</span>)}</div></Reveal>)}</div>
      </div>
    </section>
  );
}
