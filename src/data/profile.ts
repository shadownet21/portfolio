import type { Education, Experience, LocalizedText } from "@/types/content";

export const values: { title: LocalizedText; description: LocalizedText }[] = [
  {
    title: { fr: "Orientation solutions", en: "Solution focused" },
    description: {
      fr: "Comprendre le besoin avant de choisir la technologie.",
      en: "Understand the need before choosing the technology.",
    },
  },
  {
    title: { fr: "Apprentissage continu", en: "Continuous learning" },
    description: {
      fr: "Faire évoluer mes méthodes avec curiosité et discipline.",
      en: "Evolve my methods with curiosity and discipline.",
    },
  },
  {
    title: { fr: "Innovation", en: "Innovation" },
    description: {
      fr: "Chercher des améliorations utiles, concrètes et durables.",
      en: "Look for useful, practical and sustainable improvements.",
    },
  },
  {
    title: { fr: "Engagement", en: "Commitment" },
    description: {
      fr: "Livrer un travail fiable et accompagner les utilisateurs.",
      en: "Deliver reliable work and support users.",
    },
  },
];

export const experiences: Experience[] = [
  {
    organization: "FUCEC-TOGO",
    role: {
      fr: "Support informatique et développeur web",
      en: "IT Support and Web Developer",
    },
    period: {
      fr: "Novembre 2020 — septembre 2025",
      en: "November 2020 — September 2025",
    },
    responsibilities: [
      {
        fr: "Gérer les accréditations des utilisateurs : création de comptes utilisateurs, attribution et modification des gabarits d’accès.",
        en: "Manage user access permissions: create user accounts, assign and update access templates.",
      },
      {
        fr: "Analyser les besoins des utilisateurs et collaborer avec les équipes métiers et techniques afin de traduire les enjeux opérationnels en solutions fonctionnelles et technologiques.",
        en: "Analyze user needs and collaborate with business and technical teams to translate operational challenges into functional and technology solutions.",
      },

      {
        fr: "Contribuer au cycle complet des projets technologiques, de l’analyse fonctionnelle à la mise en production, en passant par le développement, les tests, le déploiement et l’accompagnement des utilisateurs.",
        en: "Contribute throughout the technology project lifecycle, from functional analysis to production rollout, including development, testing, deployment and user enablement.",
      },

      {
        fr: "Concevoir, développer et maintenir des applications web internes pour la gestion des crédits, le suivi des comptes dormants et le traitement de données provenant de 123 sites d’activité.",
        en: "Design, develop and maintain internal web applications for loan management, dormant account monitoring and data processing across 123 business locations.",
      },

      {
        fr: "Coordonner les interventions des équipes métiers et techniques, assurer le suivi des demandes et contribuer au respect des priorités, des échéances et des livrables.",
        en: "Coordinate business and technical team activities, track requests and contribute to meeting priorities, deadlines and deliverables.",
      },

      {
        fr: "Planifier et exécuter les tests fonctionnels, analyser les anomalies et coordonner leur correction avant le déploiement des solutions en production.",
        en: "Plan and execute functional testing, analyze defects and coordinate their resolution before deploying solutions to production.",
      },

      {
        fr: "Centraliser les données issues de plus de 100 bases SQL Server en restaurant les bases des coopératives dans un entrepôt de données destiné aux opérations de consolidation et d’analyse.",
        en: "Centralize data from more than 100 SQL Server databases by restoring cooperative databases into a data warehouse used for consolidation and analysis.",
      },

      {
        fr: "Extraire, consolider, transformer et valider les données relatives aux emprunteurs, aux crédits et aux historiques de paiement afin d’en garantir la qualité et la cohérence.",
        en: "Extract, consolidate, transform and validate borrower, loan and payment history data to ensure its quality and consistency.",
      },

      {
        fr: "Administrer et exploiter les solutions BIC/CIF et ECI pour le traitement des informations de crédit, le suivi des comptes dormants et la production des déclarations réglementaires.",
        en: "Administer and operate BIC/CIF and ECI solutions for credit information processing, dormant account monitoring and regulatory reporting.",
      },

      {
        fr: "Automatiser la production et le contrôle des fichiers XML réglementaires, puis assurer leur chiffrement et leur transmission sécurisée vers la plateforme centralisée de la BCEAO.",
        en: "Automate the generation and validation of regulatory XML files, then ensure their encryption and secure submission to the BCEAO centralized platform.",
      },

      {
        fr: "Produire des procédures, des documents techniques et des consignes d’exploitation afin d’assurer la traçabilité des projets, le transfert de connaissances et l’autonomie des utilisateurs.",
        en: "Produce procedures, technical documentation and operating guidelines to support project traceability, knowledge transfer and user autonomy.",
      },

      {
        fr: "Former et accompagner les utilisateurs lors du déploiement de nouvelles solutions, des mises à jour logicielles et des activités de sensibilisation à la cybersécurité.",
        en: "Train and support users during new solution deployments, software updates and cybersecurity awareness initiatives.",
      },
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
    organization:
      "FUCEC-TOGO, Garage La Révolution, École Cours Lumière, EcoHub — Togo",
    role: {
      fr: "Analyste-développeur Web (stages académiques)",
      en: "Web Analyst and Developer (Academic Internships)",
    },
    period: { fr: "2017 — 2018", en: "2017 — 2018" },
    responsibilities: [
      {
        fr: "Recueillir et analyser les besoins des utilisateurs pour concevoir des solutions web de gestion.",
        en: "Gather and analyze user needs to design web-based management solutions.",
      },
      {
        fr: "Participer au développement, aux tests, à l’installation et au déploiement des solutions.",
        en: "Contribute to solution development, testing, installation and deployment.",
      },
      {
        fr: "Collaborer avec les utilisateurs lors de la mise en service et assurer le soutien de premier niveau des solutions et équipements.",
        en: "Collaborate with users during rollout and provide first-level support for solutions and equipment.",
      },
    ],
  },

  {
    organization: "GMSI",
    role: {
      fr: "Gestion informatique et bases de données",
      en: "IT and database management",
    },
    period: { fr: "À compléter", en: "To be completed" },
    responsibilities: [],
  },
  {
    organization: {
      fr: "Réseau de plus de 120 points de service",
      en: "Network of more than 120 service locations",
    },
    role: { fr: "Support informatique", en: "IT Support" },
    period: { fr: "À compléter", en: "To be completed" },
    responsibilities: [],
  },
];

export const education: Education[] = [
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
