import { PLACEHOLDERS } from "@/data/site";
import type { Project } from "@/types/content";

const pending = { fr: "À compléter", en: "To be completed" } as const;

export const projects: Project[] = [
  {
    slug: "gestion-gel-fonds",
    title: { fr: "Application bancaire de gestion du gel de fonds", en: "Banking funds-freeze management application" },
    category: { fr: "Application métier · Finance · Base de données", en: "Business application · Finance · Database" },
    summary: {
      fr: "Étude de cas anonymisée d’une application permettant d’identifier les crédits proches de leur échéance, d’évaluer les comptes et de préparer les écritures comptables requises.",
      en: "An anonymized case study of an application used to identify loans nearing maturity, assess accounts and prepare required entries.",
    },
    problem: {
      fr: "Fiabiliser un processus métier sensible lié aux échéances et aux montants disponibles, sans exposer de données confidentielles.",
      en: "Make a sensitive business process involving maturities and available amounts more reliable without exposing confidential data.",
    },
    solution: {
      fr: "Analyse des règles métier, logique applicative connectée à SQL Server, gestion des échéances, journalisation, traitement des erreurs, tests et mise en production.",
      en: "Business-rule analysis, SQL Server-integrated application logic, due-date management, logging, error handling, testing and production rollout.",
    },
    technologies: ["PHP", "JavaScript", "AJAX", "jQuery", "SQL Server", "Bootstrap"],
    features: [
      { fr: "Détection des échéances", en: "Due-date detection" },
      { fr: "Contrôles métier et gestion d’erreurs", en: "Business controls and error handling" },
      { fr: "Journalisation des opérations", en: "Operation logging" },
    ],
    impact: pending,
    image: "/images/project-fund-freezing.svg",
    projectUrl: PLACEHOLDERS.github,
    githubUrl: PLACEHOLDERS.github,
    status: { fr: "Étude de cas anonymisée", en: "Anonymized case study" },
    featured: true,
    confidential: true,
  },
  {
  slug: "gestion-centralisee-credits-radies",

  title: {
    fr: "Plateforme centralisée de gestion des crédits radiés",
    en: "Centralized Written-Off Loan Management Platform",
  },

  category: {
    fr: "Application métier financière · Base de données",
    en: "Financial Business Application · Database",
  },

  summary: {
    fr: "Plateforme web centralisant les informations relatives aux crédits radiés et aux incidents de remboursement provenant de plus de 120 agences réparties sur l’ensemble du territoire togolais.",
    en: "Web platform centralizing written-off loan and repayment incident information from more than 120 agencies across Togo.",
  },

  problem: {
    fr: "Les agences du réseau exploitaient plus de 100 bases de données réparties sur différents sites. Cette organisation rendait difficile la vérification complète de l’historique de crédit d’un membre sollicitant un nouveau financement dans une autre agence.",
    en: "The network operated more than 100 databases across different locations. This structure made it difficult to fully verify the credit history of a member applying for new financing at another agency.",
  },

  solution: {
    fr: "Développement d’une plateforme web centralisée permettant aux agents autorisés de rechercher un membre, de consulter ses antécédents de remboursement dans l’ensemble du réseau et de prendre une décision de crédit mieux éclairée.",
    en: "Development of a centralized web platform enabling authorized staff to search for a member, review their repayment history across the network and make better-informed lending decisions.",
  },

  technologies: [
    "PHP",
    "JavaScript",
    "jQuery",
    "AJAX",
    "SQL Server",
    "Bootstrap",
    "DataTables",
    "SweetAlert2",
    "Git",
  ],

  features: [
    {
      fr: "Centralisation des données provenant de plus de 100 bases de données",
      en: "Centralization of data from more than 100 databases",
    },
    {
      fr: "Recherche d’un membre dans l’ensemble du réseau",
      en: "Member search across the entire network",
    },
    {
      fr: "Consultation des crédits radiés et des incidents de remboursement",
      en: "Review of written-off loans and repayment incidents",
    },
    {
      fr: "Identification de l’agence d’origine de chaque dossier de crédit",
      en: "Identification of the originating agency for each credit record",
    },
    {
      fr: "Contrôle de l’historique d’un membre avant l’octroi d’un nouveau crédit",
      en: "Verification of a member’s history before approving a new loan",
    },
    {
      fr: "Accès sécurisé réservé aux utilisateurs autorisés",
      en: "Secure access restricted to authorized users",
    },
    {
      fr: "Présentation structurée et filtrable des résultats de recherche",
      en: "Structured and filterable presentation of search results",
    },
  ],

  impact: {
    fr: "Renforcement du contrôle du risque de crédit à l’échelle du réseau, amélioration du partage d’information entre les agences et réduction du risque qu’un membre ayant des incidents de remboursement obtienne un nouveau crédit sans vérification préalable.",
    en: "Strengthened credit risk control across the network, improved information sharing between agencies and reduced the risk of granting a new loan to a member with repayment incidents without prior verification.",
  },

  image: "/images/project-written-off-loans.svg",

  projectUrl: "APPLICATION_INTERNE_NON_PUBLIQUE",

  githubUrl: "CODE_SOURCE_CONFIDENTIEL_NON_PUBLIC",

  status: {
    fr: "Application métier interne",
    en: "Internal business application",
  },

  featured: true,
},
{
  slug: "suivi-comptes-inactifs-dormants",

  title: {
    fr: "Plateforme de suivi des comptes inactifs et dormants",
    en: "Inactive and Dormant Account Monitoring Platform",
  },

  category: {
    fr: "Application métier financière et réglementaire",
    en: "Financial and Regulatory Business Application",
  },

  summary: {
    fr: "Application web permettant de centraliser, analyser et suivre les comptes inactifs et dormants des coopératives du réseau FUCEC-TOGO afin de faciliter les relances des membres et le respect des exigences réglementaires de la BCEAO.",
    en: "Web application for centralizing, analyzing and monitoring inactive and dormant accounts across the FUCEC-TOGO cooperative network, helping staff contact members and comply with BCEAO regulatory requirements.",
  },

  problem: {
    fr: "Les informations relatives aux comptes sans mouvement étaient conservées dans une base de données existante, mais leur exploitation statistique et le suivi des actions de relance demeuraient complexes. Après dix années d’inactivité, les avoirs d’un compte dormant doivent être transférés à la BCEAO si le titulaire n’a pas été retrouvé ou si le compte n’a pas été réactivé.",
    en: "Information about accounts without activity was stored in an existing database, but statistical analysis and outreach tracking remained complex. After ten years of inactivity, the funds held in a dormant account must be transferred to the BCEAO if the account holder has not been located or the account has not been reactivated.",
  },

  solution: {
    fr: "Développement d’une interface web connectée à la base de données existante pour classifier automatiquement les comptes selon leur durée d’inactivité, produire des statistiques consolidées, identifier les comptes proches du seuil réglementaire et assurer la traçabilité des démarches entreprises pour retrouver les membres.",
    en: "Development of a web interface connected to the existing database to automatically classify accounts by inactivity period, produce consolidated statistics, identify accounts approaching regulatory thresholds and track the actions taken to locate members.",
  },

  technologies: [
    "PHP",
    "JavaScript",
    "jQuery",
    "AJAX",
    "SQL Server",
    "Bootstrap",
    "DataTables",
    "SweetAlert2",
    "Git",
  ],

  features: [
    {
      fr: "Classification automatique des comptes selon leur durée d’inactivité",
      en: "Automatic account classification based on inactivity duration",
    },
    {
      fr: "Identification des comptes inactifs entre 8 et 10 ans",
      en: "Identification of accounts inactive for 8 to 10 years",
    },
    {
      fr: "Identification des comptes dormants après 10 ans d’inactivité",
      en: "Identification of dormant accounts after 10 years of inactivity",
    },
    {
      fr: "Tableau de bord statistique par coopérative, agence et catégorie de compte",
      en: "Statistical dashboard by cooperative, agency and account category",
    },
    {
      fr: "Détection des comptes approchant les seuils réglementaires",
      en: "Detection of accounts approaching regulatory thresholds",
    },
    {
      fr: "Consultation des coordonnées disponibles pour contacter les membres",
      en: "Access to available member contact information",
    },
    {
      fr: "Enregistrement et suivi des actions de relance effectuées",
      en: "Recording and monitoring of outreach actions",
    },
    {
      fr: "Mise à jour du statut des membres retrouvés ou des comptes réactivés",
      en: "Status updates for located members or reactivated accounts",
    },
    {
      fr: "Retrait des comptes régularisés de la liste des dossiers à traiter",
      en: "Removal of resolved accounts from the processing list",
    },
    {
      fr: "Historisation des démarches pour assurer la traçabilité des traitements",
      en: "Action history for complete processing traceability",
    },
  ],

  impact: {
    fr: "Amélioration du suivi réglementaire des comptes sans mouvement, centralisation des statistiques du réseau et meilleure anticipation des relances avant que les avoirs des comptes dormants ne soient transférés à la BCEAO.",
    en: "Improved regulatory monitoring of accounts without activity, centralized network-wide statistics and more proactive outreach before dormant account funds are transferred to the BCEAO.",
  },

  image: "/images/project-dormant-accounts.svg",

  projectUrl: "APPLICATION_INTERNE_NON_PUBLIQUE",

  githubUrl: "CODE_SOURCE_CONFIDENTIEL_NON_PUBLIC",

  status: {
    fr: "Application métier interne",
    en: "Internal business application",
  },

  featured: true,
},
{
  slug: "excel-to-sql-data-correction",

  title: {
    fr: "Générateur de scripts SQL à partir de fichiers Excel",
    en: "Excel-to-SQL Script Generator",
  },

  category: {
    fr: "Automatisation et traitement de données",
    en: "Data Processing and Automation",
  },

  summary: {
    fr: "Application Python transformant les données structurées d’un fichier Excel en scripts SQL exploitables pour préparer et sécuriser des opérations de correction dans des bases de données SQL Server de production.",
    en: "Python application that transforms structured Excel data into SQL scripts used to prepare and secure data correction operations in production SQL Server databases.",
  },

  problem: {
    fr: "Les corrections portant sur un grand volume d’enregistrements nécessitaient la rédaction manuelle de nombreuses requêtes SQL. Cette méthode était chronophage et augmentait les risques d’erreurs de saisie, de correspondance ou de formatage.",
    en: "Correcting a large number of records required manually writing numerous SQL queries. This process was time-consuming and increased the risk of input, mapping and formatting errors.",
  },

  solution: {
    fr: "Développement d’un outil Python capable de lire un fichier Excel normalisé, de contrôler la structure des données et de générer automatiquement un script SQL révisable avant son exécution contrôlée dans SQL Server.",
    en: "Development of a Python tool that reads a standardized Excel file, validates its data structure and automatically generates a reviewable SQL script before controlled execution in SQL Server.",
  },

  technologies: [
    "Python",
    "Microsoft Excel",
    "SQL Server",
    "T-SQL",
    "Git",
  ],

  features: [
    {
      fr: "Importation des données depuis un fichier Excel structuré",
      en: "Import of data from a structured Excel file",
    },
    {
      fr: "Validation des colonnes et des valeurs obligatoires",
      en: "Validation of required columns and values",
    },
    {
      fr: "Normalisation des formats avant la génération des requêtes",
      en: "Format normalization before query generation",
    },
    {
      fr: "Génération automatisée de requêtes de correction SQL",
      en: "Automated generation of SQL correction queries",
    },
    {
      fr: "Traitement de plusieurs enregistrements en une seule opération",
      en: "Processing of multiple records in a single operation",
    },
    {
      fr: "Production d’un script SQL révisable avant son exécution",
      en: "Generation of a reviewable SQL script before execution",
    },
    {
      fr: "Signalement des lignes incomplètes ou incorrectement formatées",
      en: "Identification of incomplete or incorrectly formatted rows",
    },
    {
      fr: "Préparation des corrections pour une exécution contrôlée dans SQL Server",
      en: "Preparation of corrections for controlled execution in SQL Server",
    },
  ],

  impact: {
    fr: "Réduction du temps consacré à la préparation des requêtes, uniformisation des corrections et diminution des risques d’erreurs lors du traitement de volumes importants de données.",
    en: "Reduced query preparation time, standardized correction operations and lower risk of errors when processing large volumes of data.",
  },

  image: "/images/project-excel-to-sql.svg",

  projectUrl: "APPLICATION_INTERNE_NON_PUBLIQUE",

  githubUrl: "CODE_SOURCE_CONFIDENTIEL_NON_PUBLIC",

  status: {
    fr: "Outil interne d’automatisation",
    en: "Internal automation tool",
  },

  featured: true,
},
  {
    slug: "initiative-avenir-basketball",
    title: { fr: "Initiative Avenir Basketball Club", en: "Initiative Avenir Basketball Club" },
    category: { fr: "Site web sportif", en: "Sports website" },
    summary: {
      fr: "Site responsive présentant le club, ses programmes, ses équipes et ses activités dans une expérience claire et dynamique.",
      en: "Responsive website presenting the club, its programs, teams and activities through a clear, dynamic experience.",
    },
    problem: { fr: "Regrouper l’information du club et la rendre accessible sur tous les écrans.", en: "Centralize club information and make it accessible on every screen." },
    solution: { fr: "Une interface responsive alimentée par des API ou fichiers JSON pour simplifier la mise à jour des contenus.", en: "A responsive interface powered by APIs or JSON files to simplify content updates." },
    technologies: ["HTML5", "CSS3", "JavaScript", "JSON", "Fetch API", "Git", "GitHub"],
    features: [
      { fr: "Programmes junior, senior et féminin", en: "Junior, senior and women’s programs" },
      { fr: "Calendrier, résultats et actualités", en: "Schedule, results and news" },
      { fr: "Entraîneurs, citations et contact", en: "Coaches, quotes and contact" },
    ],
    impact: pending,
    image: "/images/project-basketball.svg",
    projectUrl: "URL_DEMO_BASKETBALL_A_REMPLACER",
    githubUrl: "URL_GITHUB_BASKETBALL_A_REMPLACER",
    status: { fr: "À compléter", en: "To be completed" },
    featured: true,
  },
  {
    slug: "generateur-cv-ia",
    title: { fr: "Générateur de CV canadien assisté par IA", en: "AI-assisted Canadian résumé builder" },
    category: { fr: "Application web · Intelligence artificielle", en: "Web application · Artificial intelligence" },
    summary: {
      fr: "Outil de saisie et d’optimisation produisant un CV canadien compact, lisible et compatible avec les systèmes ATS.",
      en: "Data-entry and optimization tool producing a compact, readable Canadian résumé compatible with ATS platforms.",
    },
    problem: { fr: "Transformer des informations professionnelles en un document cohérent adapté au marché canadien.", en: "Turn professional information into a coherent document tailored to the Canadian market." },
    solution: { fr: "Une interface guidée, un traitement IA côté serveur et des exports PDF/DOCX sans exposer de clé API dans le navigateur.", en: "A guided interface, server-side AI processing and PDF/DOCX exports without exposing an API key in the browser." },
    technologies: ["HTML", "CSS", "JavaScript", "API IA", "PDF", "DOCX"],
    features: [
      { fr: "Optimisation du contenu", en: "Content optimization" },
      { fr: "Aperçu HTML compact", en: "Compact HTML preview" },
      { fr: "Exports PDF et DOCX", en: "PDF and DOCX exports" },
    ],
    impact: pending,
    image: "/images/project-resume.svg",
    projectUrl: "URL_DEMO_CV_IA_A_REMPLACER",
    githubUrl: "https://github.com/shadownet21/",
    status: { fr: "À compléter", en: "To be completed" },
    featured: true,
  },
  
  {
    slug: "applications-internes",
    title: { fr: "Applications internes FUCEC-TOGO", en: "FUCEC-TOGO internal applications" },
    category: { fr: "Applications métier", en: "Business applications" },
    summary: { fr: "Ensemble anonymisé d’outils internes soutenant des opérations, des crédits, des comptes et le suivi administratif.", en: "An anonymized set of internal tools supporting operations, loans, accounts and administrative tracking." },
    problem: { fr: "Soutenir plusieurs processus internes et assurer la continuité des applications existantes.", en: "Support multiple internal processes and maintain continuity of existing applications." },
    solution: { fr: "Développement, support et maintenance d’applications, avec intégration aux bases SQL Server et MySQL.", en: "Application development, support and maintenance, integrated with SQL Server and MySQL databases." },
    technologies: ["PHP", "Laravel", "JavaScript", "jQuery", "AJAX", "SQL Server", "MySQL", "Bootstrap"],
    features: [
      { fr: "Gestion de comptes dormants", en: "Dormant account management" },
      { fr: "Suivi d’opérations et de crédits radiés", en: "Operations and written-off loan tracking" },
      { fr: "Suivi de stagiaires et support applicatif", en: "Intern tracking and application support" },
    ],
    impact: pending,
    image: "/images/fucec.jpg",
    projectUrl: "URL_DEMO_APPLICATIONS_INTERNES_A_REMPLACER",
    githubUrl: "URL_GITHUB_APPLICATIONS_INTERNES_A_REMPLACER",
    status: { fr: "Projets confidentiels anonymisés", en: "Anonymized confidential projects" },
    featured: false,
    confidential: true,
  },
  {
    slug: "frig-auto",
    title: { fr: "FRIG’AUTO", en: "FRIG’AUTO" },
    category: { fr: "Site vitrine automobile", en: "Automotive showcase website" },
    summary: { fr: "Site professionnel présentant une entreprise automobile, son catalogue de services et ses moyens de contact.", en: "Professional website presenting an automotive company, its service catalog and contact options." },
    problem: pending,
    solution: pending,
    technologies: ["HTML", "CSS", "MySQL", "Bootstrap"],
    features: [{ fr: "Catalogue de services", en: "Service catalog" }, { fr: "Présentation de l’entreprise", en: "Company profile" }, { fr: "Prise de contact", en: "Contact options" }],
    impact: pending,
    image: "/images/logo.png",
    projectUrl: "frigauto.com",
    githubUrl: "URL_GITHUB_FRIGAUTO_A_REMPLACER",
    status: pending,
    featured: false,
  },
  {
    slug: "garage-revelation",
    title: { fr: "Garage La Révélation", en: "Garage La Révélation" },
    category: { fr: "Applications web de gestions", en: "Management web applications" },
    summary: { fr: "Solutions web consacrées à la gestion des services d’un garage automobile.(Casse, garage, boutique).", en: "Web solutions for managing an automotive business’s services, including its salvage yard, repair shop and retail store." },
    problem: pending,
    solution: pending,
    technologies: ["PHP", "Laravel", "JavaScript", "jQuery", "AJAX", "SQL Server", "MySQL", "Bootstrap"],
    features: [pending],
    impact: pending,
    image: "/images/project-garage.svg",
    projectUrl: "URL_DEMO_GARAGE_A_REMPLACER",
    githubUrl: "URL_GITHUB_GARAGE_A_REMPLACER",
    status: pending,
    featured: false,
  },
    {
    slug: "flash-production",
    title: { fr: "Flash Production", en: "Flash Production" },
    category: { fr: "Applications web de gestions", en: "Management web applications" },
    summary: { fr: "Développement d'une solution de gestion de projet publique, incluant la planification des ressources, le suivi des stocks et les statistiques en temps réel.", en: "Development of a public project management solution, including resource planning, inventory tracking and real-time statistics." },
    problem: pending,
    solution: pending,
    technologies: ["PHP", "Laravel", "JavaScript", "jQuery", "AJAX", "SQL Server", "MySQL", "Bootstrap"],
    features: [pending],
    impact: pending,
    image: "/images/project-garage.svg",
    projectUrl: "URL_DEMO_GARAGE_A_REMPLACER",
    githubUrl: "URL_GITHUB_GARAGE_A_REMPLACER",
    status: { fr: "Projets confidentiels anonymisés", en: "Anonymized confidential projects" },
    featured: false,
  },
  {
    slug: "flash-production-gestion-projets",
    title: { fr: "Flash Production", en: "Flash Production" },
    category: { fr: "Applications web de gestions", en: "Management web applications" },
    summary: { fr: "Conception et développement d'une plateforme de gestion des commandes et de la fidélisation client, automatisant le suivi des activités quotidiennes.", en: "Design and development of an order management and customer loyalty platform, automating the monitoring of daily activities." },
    problem: pending,
    solution: pending,
    technologies: ["PHP", "Laravel", "JavaScript", "jQuery", "AJAX", "SQL Server", "MySQL", "Bootstrap"],
    features: [pending],
    impact: pending,
    image: "/images/project-garage.svg",
    projectUrl: "URL_DEMO_GARAGE_A_REMPLACER",
    githubUrl: "URL_GITHUB_GARAGE_A_REMPLACER",
    status: { fr: "Projets confidentiels anonymisés", en: "Anonymized confidential projects" },
    featured: false,
  },
];
