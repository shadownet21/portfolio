import type { Skill, SkillGroup, SkillLevel } from "@/types/content";

const translatedNames: Record<string, string> = {
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
  "Accompagnement des utilisateurs": "User support"
};

const skills = (level: SkillLevel, names: string[]): Skill[] => names.map((name) => ({ name, level, ...(translatedNames[name] ? { label: { fr: name, en: translatedNames[name] } } : {}) }));

export const skillGroups: SkillGroup[] = [
  {
    category: { fr: "Frontend", en: "Frontend" },
    skills: [
      ...skills("professional", ["HTML5", "CSS3", "JavaScript", "Bootstrap", "jQuery", "AJAX"]),
      ...skills("operational", ["React"]),
      ...skills("learning", ["TypeScript", "Next.js", "Tailwind CSS"]),
    ],
  },
  { category: { fr: "Backend", en: "Backend" }, skills: [...skills("professional", ["PHP", "Laravel"]), ...skills("operational", ["Python", "C#"])] },
  { category: { fr: "Bases de données", en: "Databases" }, skills: [...skills("professional", ["SQL Server", "MySQL"]), ...skills("operational", ["PostgreSQL", "PL/SQL"])] },
  {
    category: { fr: "Infrastructure et support", en: "Infrastructure and support" },
    skills: [
      ...skills("professional", ["Windows", "GLPI", "TCP/IP"]),
      ...skills("operational", ["Linux", "Bash", "Active Directory", "Microsoft 365", "Intune", "ServiceNow", "VPN", "VMware", "VirtualBox", "Proxmox"]),
    ],
  },
  { category: { fr: "Outils", en: "Tools" }, skills: [...skills("professional", ["Git", "GitHub", "VS Code"]), ...skills("operational", ["Docker", "Power BI", "WordPress"])] },
  { category: { fr: "Méthodes", en: "Methods" }, skills: [...skills("professional", ["Analyse fonctionnelle", "Documentation technique", "Résolution de problèmes"]), ...skills("operational", ["Agile", "UML"])] },
  {
    category: { fr: "Planification de projets", en: "Project planning" },
    skills: [
      ...skills("operational", ["Planification des tâches", "Suivi des priorités", "Suivi des livrables"]),
      ...skills("learning", ["Microsoft Planner", "Trello"]),
    ],
  },
  {
    category: { fr: "Coordination et livraison", en: "Coordination and delivery" },
    skills: [
      ...skills("operational", ["Coordination métiers / TI", "Suivi des demandes", "Tests fonctionnels", "Suivi des anomalies", "Accompagnement des utilisateurs"]),
    ],
  },
];
