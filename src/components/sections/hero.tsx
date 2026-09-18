"use client";

import { useCallback, useState } from "react";
import { PuzzlePortrait } from "@/components/ui/puzzle-portrait";
import { ArrowDownRight, Download, Mail, MapPin } from "lucide-react";
import { PLACEHOLDERS, SITE } from "@/data/site";
import type { Locale } from "@/types/content";
import { Reveal } from "@/components/ui/reveal";
import { SafeLink } from "@/components/ui/safe-link";

export function Hero({ locale }: { locale: Locale }) {
  const [completedReveals, setCompletedReveals] = useState<Set<number>>(() => new Set());
  const completeReveal = useCallback((index: number) => {
    setCompletedReveals(current => current.has(index) ? current : new Set([...current, index]));
  }, []);
  const copy =
    locale === "fr"
      ? {
          intro:
            "Je développe des applications métier et j’accompagne les équipes qui les utilisent. Mon expérience en support TI et en bases de données m’aide à concevoir des solutions adaptées au terrain.",
          projects: "Voir mes projets",
          cv: "Télécharger mon CV",
          contact: "Me contacter",
        }
      : {
          intro:
            "I build business applications and support the teams who use them. My background in IT support and databases helps me deliver solutions grounded in everyday needs.",
          projects: "View my projects",
          cv: "Download my résumé",
          contact: "Contact me",
        };

  return (
    <section
      id="accueil"
      className="container-shell grid min-h-[92vh] items-center gap-12 pb-20 pt-32 lg:grid-cols-[1.12fr_.88fr]"
    >
      {/* =========================
          CONTENU GAUCHE
      ========================== */}
      <div>
        <Reveal onComplete={() => completeReveal(0)} direction="up" delay={0.05} duration={0.7} distance={25}>
          <p className="eyebrow mb-5">{SITE.role[locale]}</p>
        </Reveal>

        <Reveal onComplete={() => completeReveal(1)} direction="up" delay={0.12} duration={0.8} distance={35}>
          <h1 className="display-title">
            Marc Maurice <span className="text-[var(--brand)]">Freeman</span>
          </h1>
        </Reveal>

        <Reveal onComplete={() => completeReveal(2)} direction="up" delay={0.2} duration={0.7} distance={25}>
          <div className="muted mt-6 flex items-center gap-2 font-semibold">
            <MapPin size={18} aria-hidden="true" />
            Longueuil, Québec
          </div>
        </Reveal>

        <Reveal onComplete={() => completeReveal(3)} direction="up" delay={0.27} duration={0.8} distance={30}>
          <p className="mt-6 max-w-2xl text-lg leading-8 md:text-xl">
            {copy.intro}
          </p>
        </Reveal>

        <Reveal onComplete={() => completeReveal(4)} direction="up" delay={0.34} duration={0.7} distance={25}>
          <p className="mt-5 font-extrabold tracking-wide text-[var(--brand)]">
            {SITE.signature[locale]}
          </p>
        </Reveal>

        <Reveal onComplete={() => completeReveal(5)} direction="up" delay={0.4} duration={0.7} distance={25}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a className="button-primary" href="#projets">
              {copy.projects}
              <ArrowDownRight size={18} />
            </a>

            <SafeLink
              className="button-secondary"
              href={PLACEHOLDERS.cv}
              download
              label={copy.cv}
            >
              <Download size={18} />
              {copy.cv}
            </SafeLink>

            <a className="button-secondary" href="#contact">
              <Mail size={18} />
              {copy.contact}
            </a>
          </div>
        </Reveal>
        <dl className="mt-8 grid gap-4 border-t border-[var(--border)] pt-6 sm:grid-cols-3">
          {[
            { value: locale === "fr" ? "4+ ans" : "4+ years", label: locale === "fr" ? "en développement et support TI" : "in development and IT support" },
            { value: "123", label: locale === "fr" ? "sites d’activité concernés par les traitements de données" : "business locations covered by data processing" },
            { value: "100+", label: locale === "fr" ? "bases SQL Server consolidées" : "SQL Server databases consolidated" },
          ].map(({ value, label }) => (
            <div key={value} className="flex flex-col gap-1">
              <dt className="muted text-sm leading-6">{label}</dt>
              <dd className="order-first text-2xl font-extrabold text-[var(--brand)]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* =========================
          PHOTO / PROFIL
      ========================== */}
      <div className="profile-card">
        <div className="profile-glow" />

        <div className="profile-image-wrapper">
          <PuzzlePortrait ready={completedReveals.size === 6} alt={locale === "fr" ? "Portrait de Marc Maurice Freeman" : "Portrait of Marc Maurice Freeman"} />

          <span className="profile-status" />
        </div>

        <div className="profile-info">
          <h2 className="profile-name">MMF</h2>

          <p className="profile-role">
            {locale === "fr"
              ? "Applications métier · Bases de données"
              : "Business applications · Databases"}
          </p>
        </div>
      </div>
    </section>
  );
}
