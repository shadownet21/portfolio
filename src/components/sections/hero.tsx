import { PuzzlePortrait } from "@/components/ui/puzzle-portrait";
import { ArrowDownRight, Download, Mail } from "lucide-react";
import { PLACEHOLDERS, SITE } from "@/data/site";
import type { Locale } from "@/types/content";
import { SafeLink } from "@/components/ui/safe-link";

// Rendered without entrance animations: this is the first screen and holds the LCP.
export function Hero({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const copy = fr
    ? {
        intro:
          "Développeur web et spécialiste TI, je transforme les besoins opérationnels en applications métier robustes, développées en PHP, Laravel, JavaScript et SQL. De la conception des bases de données à la coordination des projets technologiques, en passant par le support en production, j'assure des solutions durables, sécurisées et adaptées à leurs utilisateurs.",
        projects: "Voir mes projets",
        cv: "Télécharger mon CV",
        contact: "Me contacter",
        available: "Ouvert aux occasions · Montréal et Rive-Sud",
        portrait: "Portrait de Marc Maurice Freeman",
        puzzle: "Assembler le portrait en puzzle",
      }
    : {
        intro:
          "As a web developer and IT specialist, I turn operational needs into robust business applications built with PHP, Laravel, JavaScript, and SQL. From database design to technology project coordination and production support, I deliver solutions that are durable, secure, and built around the people who use them.",
        projects: "View my projects",
        cv: "Download my résumé",
        contact: "Contact me",
        available: "Open to opportunities · Montréal and South Shore",
        portrait: "Portrait of Marc Maurice Freeman",
        puzzle: "Assemble the portrait as a puzzle",
      };

  const stats = [
    {
      value: fr ? "7 ans" : "7 years",
      label: fr ? "de développement web" : "of web development",
    },
    {
      value: "120+",
      label: fr
        ? "agences couvertes par mes traitements SQL"
        : "branches covered by my SQL jobs",
    },
    {
      value: "100+",
      label: fr
        ? "bases SQL Server consolidées"
        : "SQL Server databases consolidated",
    },
  ];

  return (
    <section
      id="accueil"
      className="container-shell grid min-h-[92vh] items-center gap-12 pb-20 pt-32 lg:grid-cols-[1.12fr_.88fr]"
    >
      <div>
        <p className="eyebrow mb-5"><span className="eyebrow-index">&gt;_</span>{SITE.role[locale]}</p>

        <h1 className="display-title">
          Marc Maurice <span className="outline-word">Freeman</span>
        </h1>

        {/* Signature: the location written as the SQL query a database developer would run. */}
        <p className="hero-query mt-7">
          <span className="sql-keyword">SELECT</span> * <span className="sql-keyword">FROM</span> {fr ? "développeurs" : "developers"}{" "}
          <span className="sql-keyword">WHERE</span> {fr ? "ville" : "city"} = <span className="sql-string">&apos;Montréal, QC&apos;</span>;
        </p>

        <p className="mt-6 max-w-2xl text-lg leading-8 md:text-xl">
          {copy.intro}
        </p>

        <p className="mt-5 font-extrabold tracking-wide text-[var(--brand)]">
          {SITE.signature[locale]}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a className="button-primary" href="#projets">
            {copy.projects}
            <ArrowDownRight size={18} aria-hidden="true" />
          </a>

          <SafeLink
            className="button-secondary"
            href={PLACEHOLDERS.cv}
            download
            label={copy.cv}
          >
            <Download size={18} aria-hidden="true" />
            {copy.cv}
          </SafeLink>

          <a className="button-ghost" href="#contact">
            <Mail size={18} aria-hidden="true" />
            {copy.contact}
          </a>
        </div>

        <p className="query-result mt-10" aria-hidden="true">-- {fr ? "3 lignes retournées" : "3 rows returned"}</p>
        <dl className="stats-grid mt-3 grid gap-4 sm:grid-cols-3">
          {stats.map(({ value, label }) => (
            <div key={value} className="flex flex-col gap-1">
              <dt className="muted text-sm leading-6">{label}</dt>
              <dd className="stat-value order-first">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="profile-card">

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
