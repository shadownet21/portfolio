"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { skillGroups } from "@/data/skills";
import type { Locale, SkillLevel } from "@/types/content";
import { SectionHeading } from "@/components/ui/section-heading";
const levelStyles: Record<SkillLevel, string> = {
  professional: "border-blue-600/30 bg-blue-600/10 text-[var(--brand-strong)]",
  operational: "border-teal-600/30 bg-teal-600/10 text-[var(--skill-operational)]",
  learning: "border-amber-600/30 bg-amber-500/10 text-[var(--skill-learning)]",
};
export function Skills({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const [selected, setSelected] = useState<SkillLevel | "all">("all");
  const reduced = useReducedMotion();
  const labels: Record<SkillLevel | "all", string> = {
    all: fr ? "Tout voir" : "Show all",
    professional: fr ? "Expérience professionnelle" : "Professional experience",
    operational: fr ? "Pratique opérationnelle" : "Working knowledge",
    learning: fr ? "En apprentissage" : "Learning",
  };
  const groups = skillGroups.map(group => ({ ...group, skills: group.skills.filter(skill => selected === "all" || skill.level === selected) })).filter(group => group.skills.length);
  const count = groups.reduce((total, group) => total + group.skills.length, 0);
  return <section id="competences" className="section-alt section-space">
    <div className="container-shell">
      <SectionHeading eyebrow={fr ? "Compétences" : "Skills"} title={fr ? "Mes outils, en pratique" : "My tools, in practice"} description={fr ? "Choisissez un niveau pour explorer les compétences associées." : "Choose a level to explore the related skills."} />
      <div className="mb-4 flex flex-wrap gap-3" role="group" aria-label={fr ? "Filtrer par niveau de maîtrise" : "Filter by proficiency"}>
        {(["all", "professional", "operational", "learning"] as const).map(level => <button key={level} type="button" aria-pressed={selected === level} aria-controls="skill-results" onClick={() => setSelected(level === selected ? "all" : level)} className={`skill-filter rounded-full border px-4 py-3 text-sm font-bold ${level === "all" ? "border-[var(--border)]" : levelStyles[level]}`}>{labels[level]}</button>)}
      </div>
      <p className="muted mb-6 text-sm" role="status" aria-live="polite">{count} {fr ? "compétences affichées" : "skills shown"} · {labels[selected]}</p>
      <motion.div layout={!reduced} id="skill-results" className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {groups.map(group => <motion.div layout={!reduced} key={group.category.fr} initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: reduced ? 1 : .97 }} transition={{ duration: reduced ? 0 : .2 }} className="card p-6">
            <h3 className="text-lg font-extrabold">{group.category[locale]}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              <AnimatePresence mode="popLayout">
                {group.skills.map(skill => <motion.span layout={!reduced} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .15 }} key={skill.name} className={`rounded-md border px-2.5 py-1.5 text-sm font-semibold ${levelStyles[skill.level]}`} title={labels[skill.level]}>{skill.label?.[locale] ?? skill.name}</motion.span>)}
              </AnimatePresence>
            </div>
          </motion.div>)}
        </AnimatePresence>
      </motion.div>
    </div>
  </section>;
}
