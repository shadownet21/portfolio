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
    period: { fr: "Février 2022 — septembre 2025", en: "February 2022 — September 2025" },
    responsibilities: [
      { fr: "Développement et maintenance d’applications web internes", en: "Development and maintenance of internal web applications" },
      { fr: "Assistance technique aux utilisateurs et support d’applications métiers", en: "Technical user assistance and business application support" },
      { fr: "Administration SQL Server et MySQL", en: "SQL Server and MySQL administration" },
      { fr: "Diagnostic et résolution d’incidents", en: "Incident diagnosis and resolution" },
      { fr: "Gestion des droits et accès", en: "Rights and access management" },
      { fr: "Documentation technique", en: "Technical documentation" },
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

export const education: Education[] = [
  {
    institution: "CyberCap — Initiative Avenir, Montréal",
    program: { fr: "Formation intensive", en: "Intensive training program" },
    period: { fr: "Avril — octobre 2026", en: "April — October 2026" },
    topics: [
      { fr: "Programmation web", en: "Web programming" },
      { fr: "Cybersécurité", en: "Cybersecurity" },
      { fr: "Intelligence artificielle", en: "Artificial intelligence" },
      { fr: "Linux", en: "Linux" },
      { fr: "Réseaux informatiques", en: "Computer networking" },
    ],
  },
  // Ajoutez les diplômes futurs ici en respectant l’interface Education.
];
