import { PuzzlePortrait } from "@/components/ui/puzzle-portrait";
import { ArrowDownRight, Download, Mail, MapPin } from "lucide-react";
import { PLACEHOLDERS, SITE } from "@/data/site";
import type { Locale } from "@/types/content";
import { SafeLink } from "@/components/ui/safe-link";

// Rendered without entrance animations: this is the first screen and holds the LCP.
export function Hero({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const copy = fr
    ? {
        intro:
          "Je conçois et maintiens des applications web métier en PHP, JavaScript, Laravel et SQL, de l’analyse du besoin jusqu’au support en production. Mon expérience en support TI m’aide à livrer des solutions adaptées au terrain.",
        projects: "Voir mes projets",
        cv: "Télécharger mon CV",
        contact: "Me contacter",
        available: "Ouvert aux occasions · Montréal et Rive-Sud",
        portrait: "Portrait de Marc Maurice Freeman",
        puzzle: "Assembler le portrait en puzzle",
      }
    : {
        intro:
          "I design and maintain business web applications in PHP, JavaScript, Laravel and SQL, from requirements through production support. My IT support background helps me deliver solutions grounded in everyday needs.",
        projects: "View my projects",
        cv: "Download my résumé",
        contact: "Contact me",
        available: "Open to opportunities · Montréal and South Shore",
        portrait: "Portrait of Marc Maurice Freeman",
        puzzle: "Assemble the portrait as a puzzle",
      };

  const stats = [
    { value: fr ? "7 ans" : "7 years", label: fr ? "de développement web" : "of web development" },
    { value: "120+", label: fr ? "agences couvertes par mes traitements SQL" : "branches covered by my SQL jobs" },
    { value: "100+", label: fr ? "bases SQL Server consolidées" : "SQL Server databases consolidated" },
  ];

  return (
    <section
      id="accueil"
      className="container-shell grid min-h-[92vh] items-center gap-12 pb-20 pt-32 lg:grid-cols-[1.12fr_.88fr]"
    >
      <div>
        <p className="eyebrow mb-5">{SITE.role[locale]}</p>

        <h1 className="display-title">
          Marc Maurice <span className="text-[var(--brand)]">Freeman</span>
        </h1>

        <p className="muted mt-6 flex items-center gap-2 font-semibold">
          <MapPin size={18} aria-hidden="true" />
          Longueuil, Québec
        </p>

        <p className="mt-6 max-w-2xl text-lg leading-8 md:text-xl">{copy.intro}</p>

        <p className="mt-5 font-extrabold tracking-wide text-[var(--brand)]">{SITE.signature[locale]}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a className="button-primary" href="#projets">
            {copy.projects}
            <ArrowDownRight size={18} aria-hidden="true" />
          </a>

          <SafeLink className="button-secondary" href={PLACEHOLDERS.cv} download label={copy.cv}>
            <Download size={18} aria-hidden="true" />
            {copy.cv}
          </SafeLink>

          <a className="button-ghost" href="#contact">
            <Mail size={18} aria-hidden="true" />
            {copy.contact}
          </a>
        </div>

        <dl className="mt-10 grid gap-4 border-t border-[var(--border)] pt-6 sm:grid-cols-3">
          {stats.map(({ value, label }) => (
            <div key={value} className="flex flex-col gap-1">
              <dt className="muted text-sm leading-6">{label}</dt>
              <dd className="order-first text-3xl font-extrabold tracking-tight text-[var(--brand)]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="profile-card">
        <div className="profile-glow" aria-hidden="true" />

        <div className="profile-image-wrapper">
          <PuzzlePortrait alt={copy.portrait} playLabel={copy.puzzle} />

          <div className="profile-info">
            <p className="availability-badge">
              <span className="availability-dot" aria-hidden="true" />
              {copy.available}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
