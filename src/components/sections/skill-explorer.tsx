"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { skillGroups } from "@/data/skills";
import type { Locale, SkillLevel } from "@/types/content";
const levelStyles: Record<SkillLevel, string> = {
  professional: "border-blue-600/30 bg-blue-600/10 text-[var(--brand-strong)]",
  operational: "border-teal-600/30 bg-teal-600/10 text-[var(--skill-operational)]",
  learning: "border-amber-600/30 bg-amber-500/10 text-[var(--skill-learning)]",
};
export function SkillExplorer({ locale }: { locale: Locale }) {
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
  return <>
    <div className="mb-4 flex flex-wrap gap-3" role="group" aria-label={fr ? "Filtrer par niveau de maîtrise" : "Filter by proficiency"}>
      {(["all", "professional", "operational", "learning"] as const).map(level => <button key={level} type="button" aria-pressed={selected === level} aria-controls="skill-results" onClick={() => setSelected(level === selected ? "all" : level)} className={`skill-filter border px-4 py-3 text-sm font-bold ${level === "all" ? "border-[var(--border)]" : levelStyles[level]}`}>{labels[level]}</button>)}
    </div>
    <p className="muted mb-6 text-sm" role="status" aria-live="polite">{count} {fr ? "compétences affichées" : "skills shown"} · {labels[selected]}</p>
    {/* The whole result set fades out, then the filtered one fades in: no layout animation. */}
    <div id="skill-results">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={selected} className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .25, ease: "easeInOut" }}>
          {groups.map(group => <div key={group.category.fr} className="card p-6">
            <h4 className="text-lg font-extrabold">{group.category[locale]}</h4>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map(skill => <span key={skill.name} className={`skill-chip border px-2.5 py-1.5 text-sm font-semibold ${levelStyles[skill.level]}`} title={labels[skill.level]}>{skill.label?.[locale] ?? skill.name}</span>)}
            </div>
          </div>)}
        </motion.div>
      </AnimatePresence>
    </div>
  </>;
}
