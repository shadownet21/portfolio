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
      { fr: "Analyser les besoins des utilisateurs et collaborer avec les équipes métiers et techniques pour définir des solutions adaptées aux opérations.", en: "Analyze user needs and collaborate with business and technical teams to define solutions suited to operational needs." },
      { fr: "Participer au cycle complet des projets technologiques : analyse, développement, tests, déploiement, mise en production et soutien aux utilisateurs.", en: "Contribute throughout the technology project lifecycle: analysis, development, testing, deployment, production rollout and user support." },
      { fr: "Coordonner les interventions des équipes métiers et techniques, suivre les demandes et contribuer au respect des priorités et des livrables.", en: "Coordinate business and technical team activities, track requests and help meet priorities and deliverables." },
      { fr: "Planifier et réaliser les tests fonctionnels, diagnostiquer les anomalies et coordonner leur correction avant les mises en production.", en: "Plan and perform functional tests, diagnose defects and coordinate fixes before production releases." },
      { fr: "Concevoir, développer et maintenir des applications internes pour la gestion des crédits, des comptes dormants et le traitement de données provenant de 123 sites d’activité.", en: "Design, develop and maintain internal applications for loan management, dormant accounts and data processing across 123 business locations." },
      { fr: "Rédiger des procédures, de la documentation technique et des consignes pour faciliter la communication avec les utilisateurs et l’équipe informatique.", en: "Write procedures, technical documentation and instructions to support clear communication with users and the IT team." },
      { fr: "Former et accompagner les utilisateurs lors des mises à jour logicielles et des activités de sensibilisation à la cybersécurité à l’échelle nationale.", en: "Train and support users during software updates and nationwide cybersecurity awareness activities." },
      { fr: "Assurer le soutien technique N1/N2 et résoudre les incidents pour maintenir la continuité des opérations.", en: "Provide L1/L2 technical support and resolve incidents to maintain operational continuity." },
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
    organization: "FUCEC-TOGO, Garage La Révolution, École Cours Lumière, EcoHub — Togo",
    role: { fr: "Analyste-développeur Web (stages académiques)", en: "Web Analyst and Developer (Academic Internships)" },
    period: { fr: "2017 — 2018", en: "2017 — 2018" },
    responsibilities: [
      { fr: "Recueillir et analyser les besoins des utilisateurs pour concevoir des solutions web de gestion.", en: "Gather and analyze user needs to design web-based management solutions." },
      { fr: "Participer au développement, aux tests, à l’installation et au déploiement des solutions.", en: "Contribute to solution development, testing, installation and deployment." },
      { fr: "Collaborer avec les utilisateurs lors de la mise en service et assurer le soutien de premier niveau des solutions et équipements.", en: "Collaborate with users during rollout and provide first-level support for solutions and equipment." },
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