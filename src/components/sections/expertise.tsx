import {
  ClipboardList,
  Code2,
  Database,
  Headphones,
  ListChecks,
  ShieldCheck,
} from "lucide-react";

import type { Locale } from "@/types/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const items = [
  {
    icon: Code2,
    title: { fr: "Développement Web", en: "Web Development" },
    text: {
      fr: "Applications métier, interfaces responsive et API REST avec JavaScript, PHP et Laravel; React et Next.js sont actuellement en approfondissement.",
      en: "Business applications, responsive interfaces and REST APIs with JavaScript, PHP and Laravel; React and Next.js are currently being developed further.",
    },
  },
  {
    icon: Headphones,
    title: { fr: "Support informatique", en: "IT Support" },
    text: {
      fr: "Diagnostic matériel et logiciel, soutien aux utilisateurs, gestion des comptes et accès, documentation et suivi d’incidents.",
      en: "Hardware and software diagnostics, user assistance, account and access management, documentation and incident tracking.",
    },
  },
  {
    icon: Database,
    title: { fr: "Bases de données", en: "Databases" },
    text: {
      fr: "SQL Server, MySQL et PostgreSQL : requêtes, maintenance, exploitation et analyse structurée des données.",
      en: "SQL Server, MySQL and PostgreSQL: queries, maintenance, operations and structured data analysis.",
    },
  },
  {
    icon: ShieldCheck,
    title: { fr: "Sécurité et fiabilité", en: "Security and Reliability" },
    text: {
      fr: "Linux, contrôle des accès, sauvegardes, principes de cybersécurité, réseaux TCP/IP et virtualisation.",
      en: "Linux, access control, backups, cybersecurity principles, TCP/IP networking and virtualization.",
    },
  },
  {
    icon: ClipboardList,
    title: {
      fr: "Gestion de projets junior",
      en: "Junior Project Management",
    },
    text: {
      fr: "Analyse des besoins, planification des tâches, coordination des équipes métiers et techniques, suivi des priorités et des livrables.",
      en: "Requirements analysis, task planning, coordination of business and technical teams, and tracking of priorities and deliverables.",
    },
  },
  {
    icon: ListChecks,
    title: {
      fr: "Tests et mise en production",
      en: "Testing and Production Rollout",
    },
    text: {
      fr: "Planification des tests fonctionnels, suivi des anomalies et de leur correction, participation aux déploiements et accompagnement des utilisateurs.",
      en: "Functional test planning, defect and fix tracking, deployment participation and user support.",
    },
  },
];

export function Expertise({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <section id="expertise" className="section-alt section-space">
      <div className="container-shell">
        {/* TITRE */}
        <Reveal direction="up" duration={0.8} distance={35}>
          <SectionHeading
            eyebrow={fr ? "Domaines d’expertise" : "Areas of expertise"}
            title={
              fr
                ? "Un profil hybride, de l’utilisateur jusqu’à la donnée"
                : "A hybrid profile, from user needs to data"
            }
            description={
              fr
                ? "Une vision transversale pour diagnostiquer, développer et fiabiliser les solutions."
                : "A cross-functional perspective to diagnose, build and make solutions reliable."
            }
          />
        </Reveal>

        {/* CARTES */}
        <div className="grid gap-5 md:grid-cols-2">
          {items.map(({ icon: Icon, title, text }, index) => (
            <Reveal
              key={title.fr}
              direction="scale"
              delay={index * 0.08}
              duration={0.7}
              className="h-full"
            >
              <div className="card h-full p-6 md:p-8">
                <div className="mb-8 grid h-12 w-12 place-items-center rounded-xl bg-[var(--surface-muted)] text-[var(--brand)]">
                  <Icon aria-hidden="true" />
                </div>

                <h3 className="text-xl font-extrabold">{title[locale]}</h3>

                <p className="muted mt-3 leading-7">{text[locale]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
