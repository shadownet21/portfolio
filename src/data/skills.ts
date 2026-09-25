import {
  ClipboardList,
  Code2,
  Database,
  Headphones,
  ListChecks,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { LocalizedText, Skill, SkillGroup, SkillLevel } from "@/types/content";

// The first two areas are the core of the profile and get larger cards.
export const expertiseAreas: { icon: LucideIcon; title: LocalizedText; text: LocalizedText }[] = [
  {
    icon: Code2,
    title: { fr: "Développement web full stack", en: "Full-stack web development" },
    text: {
      fr: "Applications métier en PHP, Laravel et JavaScript, architecture MVC et API REST, de l’analyse du besoin au déploiement. React et Next.js sont en approfondissement.",
      en: "Business applications in PHP, Laravel and JavaScript, MVC architecture and REST APIs, from requirements to deployment. React and Next.js are currently being developed further.",
    },
  },
  {
    icon: Database,
    title: { fr: "Bases de données", en: "Databases" },
    text: {
      fr: "SQL Server, MySQL et PostgreSQL : conception et optimisation de requêtes, procédures, consolidation et contrôle de la qualité des données.",
      en: "SQL Server, MySQL and PostgreSQL: query design and optimization, procedures, consolidation and data quality control.",
    },
  },
  {
    icon: Headphones,
    title: { fr: "Support informatique", en: "IT Support" },
    text: {
      fr: "Support N1/N2, diagnostic, gestion des comptes et des accès, suivi d’incidents.",
      en: "Level 1/2 support, diagnostics, account and access management, incident tracking.",
    },
  },
  {
    icon: ShieldCheck,
    title: { fr: "Sécurité et fiabilité", en: "Security and Reliability" },
    text: {
      fr: "Linux, contrôle des accès, sauvegardes, réseaux TCP/IP et virtualisation.",
      en: "Linux, access control, backups, TCP/IP networking and virtualization.",
    },
  },
  {
    icon: ClipboardList,
    title: { fr: "Coordination de projets", en: "Project coordination" },
    text: {
      fr: "Analyse des besoins, planification, suivi des priorités et des livrables.",
      en: "Requirements analysis, planning, priority and deliverable tracking.",
    },
  },
  {
    icon: ListChecks,
    title: { fr: "Tests et mise en production", en: "Testing and rollout" },
    text: {
      fr: "Tests fonctionnels, suivi des anomalies, déploiement et accompagnement des utilisateurs.",
      en: "Functional testing, defect tracking, deployment and user support.",
    },
  },
];

const translatedNames: Record<string, string> = {
  "API REST": "REST APIs",
  POO: "OOP",
  "Analyse fonctionnelle": "Functional analysis",
  "Documentation technique": "Technical documentation",
  "Résolution de problèmes": "Problem solving",
  "Planification des tâches": "Task planning",
  "Suivi des priorités": "Priority tracking",
  "Suivi des livrables": "Deliverable tracking",
  "Coordination métiers / TI": "Business / IT coordination",
  "Suivi des demandes": "Request tracking",
  "Tests fonctionnels": "Functional testing",
  "Suivi des anomalies": "Defect tracking",
  "Accompagnement des utilisateurs": "User support",
};

const skills = (level: SkillLevel, names: string[]): Skill[] =>
  names.map((name) => ({
    name,
    level,
    ...(translatedNames[name]
      ? { label: { fr: name, en: translatedNames[name] } }
      : {}),
  }));

export const skillGroups: SkillGroup[] = [
  {
    category: { fr: "Frontend", en: "Frontend" },
    skills: [
      ...skills("professional", [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Bootstrap",
        "jQuery",
        "AJAX",
      ]),
      ...skills("operational", ["React"]),
      ...skills("learning", ["TypeScript", "Next.js", "Tailwind CSS"]),
    ],
  },
  {
    category: { fr: "Backend", en: "Backend" },
    skills: [
      ...skills("professional", ["PHP", "Laravel", "API REST"]),
      ...skills("operational", ["Python", "C#"]),
    ],
  },
  {
    category: { fr: "Bases de données", en: "Databases" },
    skills: [
      ...skills("professional", ["SQL Server", "MySQL"]),
      ...skills("operational", ["PostgreSQL", "PL/SQL"]),
    ],
  },
  {
    category: {
      fr: "Infrastructure et support",
      en: "Infrastructure and support",
    },
    skills: [
      ...skills("professional", ["Windows", "GLPI", "TCP/IP"]),
      ...skills("operational", [
        "Linux",
        "Bash",
        "Active Directory",
        "Microsoft 365",
        "Intune",
        "ServiceNow",
        "VPN",
        "VMware",
        "VirtualBox",
        "Proxmox",
      ]),
    ],
  },
  {
    category: { fr: "Outils", en: "Tools" },
    skills: [
      ...skills("professional", ["Git", "GitHub", "VS Code"]),
      ...skills("operational", ["Docker", "Nginx", "Power BI", "WordPress"]),
    ],
  },
  {
    category: { fr: "Méthodes", en: "Methods" },
    skills: [
      ...skills("professional", [
        "Analyse fonctionnelle",
        "Documentation technique",
        "Résolution de problèmes",
        "MVC",
        "POO",
      ]),
      ...skills("operational", ["Agile", "UML"]),
    ],
  },
  {
    category: { fr: "Planification de projets", en: "Project planning" },
    skills: [
      ...skills("operational", [
        "Planification des tâches",
        "Suivi des priorités",
        "Suivi des livrables",
      ]),
      ...skills("learning", ["Microsoft Planner", "Trello"]),
    ],
  },
  {
    category: {
      fr: "Coordination et livraison",
      en: "Coordination and delivery",
    },
    skills: [
      ...skills("operational", [
        "Coordination métiers / TI",
        "Suivi des demandes",
        "Tests fonctionnels",
        "Suivi des anomalies",
        "Accompagnement des utilisateurs",
      ]),
    ],
  },
  {
    category: {
      fr: "Informatique décisionnelle (BI)",
      en: "Business Intelligence (BI)",
    },

    skills: [
      {
        name: "Power BI",
        level: "operational",
      },
      {
        name: "Excel Data Processing",
        label: {
          fr: "Traitement de données avec Excel",
          en: "Excel data processing",
        },
        level: "professional",
      },
      {
        name: "Data Extraction",
        label: {
          fr: "Extraction de données",
          en: "Data extraction",
        },
        level: "professional",
      },
      {
        name: "Data Transformation",
        label: {
          fr: "Transformation et consolidation des données",
          en: "Data transformation and consolidation",
        },
        level: "professional",
      },
      {
        name: "Data Quality",
        label: {
          fr: "Contrôle de la qualité des données",
          en: "Data quality control",
        },
        level: "professional",
      },
      {
        name: "Data Visualization",
        label: {
          fr: "Visualisation de données",
          en: "Data visualization",
        },
        level: "operational",
      },
      {
        name: "Dashboard Design",
        label: {
          fr: "Conception de tableaux de bord",
          en: "Dashboard design",
        },
        level: "operational",
      },
      {
        name: "Reporting",
        label: {
          fr: "Production de rapports",
          en: "Report generation",
        },
        level: "professional",
      },
      {
        name: "ETL",
        label: {
          fr: "Processus ETL",
          en: "ETL processes",
        },
        level: "operational",
      },
    ],
  },
];
