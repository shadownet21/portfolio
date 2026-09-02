import type { Education, Experience, LocalizedText } from "@/types/content";

export const values: { title: LocalizedText; description: LocalizedText }[] = [
  { title: { fr: "Orientation solutions", en: "Solution focused" }, description: { fr: "Comprendre le besoin avant de choisir la technologie.", en: "Understand the need before choosing the technology." } },
  { title: { fr: "Apprentissage continu", en: "Continuous learning" }, description: { fr: "Faire évoluer mes méthodes avec curiosité et discipline.", en: "Evolve my methods with curiosity and discipline." } },
  { title: { fr: "Innovation", en: "Innovation" }, description: { fr: "Chercher des améliorations utiles, concrètes et durables.", en: "Look for useful, practical and sustainable improvements." } },
  { title: { fr: "Engagement", en: "Commitment" }, description: { fr: "Livrer un travail fiable et accompagner les utilisateurs.", en: "Deliver reliable work and support users." } },
];

export const experiences: Experience[] = [
  {
    organization: "FUCEC-TOGO",
    role: { fr: "Support informatique et développeur web", en: "IT Support and Web Developer" },
    period: { fr: "Novembre 2020 — septembre 2025", en: "February 2022 — September 2025" },
    responsibilities: [
      { fr: "Développement et maintenance d’applications web internes", en: "Development and maintenance of internal web applications" },
      { fr: "Assistance technique aux utilisateurs et support d’applications métiers", en: "Technical user assistance and business application support" },
      { fr: "Administration SQL Server et MySQL", en: "SQL Server and MySQL administration" },
      { fr: "Diagnostic et résolution d’incidents", en: "Incident diagnosis and resolution" },
      { fr: "Gestion des droits et accès", en: "Rights and access management" },
      { fr: "Câblages réseaux", en: "Network cabling" },
      { fr: "Documentation technique", en: "Technical documentation" },
      { fr: "Formation des utilisateurs", en: "Users formation" },
    ],
  },
  {
  organization: "FLASH PRODUCTION",

  role: {
    fr: "Développeur web full stack",
    en: "Full-Stack Web Developer",
  },
  period: {
    fr: "Juillet 2018 — juillet 2020",
    en: "July 2018 — July 2020",
  },

  responsibilities: [
    {
      fr: "Conception et développement d’une plateforme de gestion des commandes et de fidélisation client, automatisant le suivi des activités quotidiennes",
      en: "Designed and developed an order management and customer loyalty platform that automated daily activity tracking",
    },
    {
      fr: "Développement d’une solution de gestion de projets intégrant la planification des ressources, le suivi des stocks et la production de statistiques en temps réel",
      en: "Developed a project management solution integrating resource planning, inventory tracking and real-time statistics",
    },
    {
      fr: "Organisation et suivi des tâches de l’équipe selon une méthodologie Agile afin de favoriser le respect des échéances",
      en: "Organized and monitored team tasks using an Agile methodology to support on-time delivery",
    },
    {
      fr: "Mise en œuvre des procédures de sauvegarde et contribution à la sécurisation des données et des applications",
      en: "Implemented backup procedures and contributed to securing data and applications",
    },
  ],
},
  {
    organization: "GMSI",
    role: { fr: "Gestion informatique et bases de données", en: "IT and database management" },
    period: { fr: "À compléter", en: "To be completed" },
    responsibilities: [],
  },
  {
    organization: "Réseau de plus de 100 points de service",
    role: { fr: "Support informatique", en: "IT Support" },
    period: { fr: "À compléter", en: "To be completed" },
    responsibilities: [],
  },
];

export const education = [
  {
    institution: "CyberCap — Initiative Avenir, Montréal, Québec",

    program: {
      fr: "Formation spécialisée en technologies de l’information",
      en: "Specialized Information Technology Training",
    },

    period: {
      fr: "Avril — octobre 2026",
      en: "April — October 2026",
    },

    topics: [
      {
        fr: "Développement logiciel et programmation web",
        en: "Software development and web programming",
      },
      {
        fr: "Cybersécurité",
        en: "Cybersecurity",
      },
      {
        fr: "Intelligence artificielle",
        en: "Artificial intelligence",
      },
      {
        fr: "Linux",
        en: "Linux",
      },
      {
        fr: "Réseaux informatiques",
        en: "Computer networking",
      },
    ],
  },

  {
    institution: "ESGIS — Lomé, Togo",

    program: {
      fr: "Baccalauréat en informatique, réseaux et télécommunications — Architecture logicielle",
      en: "Bachelor’s Degree in Computer Science, Networks and Telecommunications — Software Architecture",
    },

    period: {
      fr: "Septembre 2017 — juillet 2018",
      en: "September 2017 — July 2018",
    },

    topics: [
      {
        fr: "Informatique",
        en: "Computer science",
      },
      {
        fr: "Réseaux et télécommunications",
        en: "Networks and telecommunications",
      },
      {
        fr: "Architecture logicielle",
        en: "Software architecture",
      },
    ],
  },

  {
    institution: "CIFOP — Lomé, Togo",

    program: {
      fr: "Brevet de technicien supérieur — Développeur d’applications",
      en: "Advanced Technician Diploma — Application Development",
    },

    period: {
      fr: "Septembre 2015 — juillet 2016",
      en: "September 2015 — July 2016",
    },

    topics: [
      {
        fr: "Développement d’applications",
        en: "Application development",
      },
      {
        fr: "Informatique de gestion",
        en: "Business computing",
      },
    ],
  },
];