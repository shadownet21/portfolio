export type Locale = "fr" | "en";
export type LocalizedText = Record<Locale, string>;
export type SkillLevel = "professional" | "operational" | "learning";

export interface NavItem {
  id: string;
  label: LocalizedText;
}

export interface Project {
  slug: string;
  title: LocalizedText;
  category: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  technologies: string[];
  features: LocalizedText[];
  impact: LocalizedText;
  image: string;
  /** Logos need "contain"; screenshots default to a top-anchored "cover". */
  coverFit?: "contain" | "cover";
  gallery?: { src: string; caption: LocalizedText }[];
  projectUrl: string;
  githubUrl: string;
  status: LocalizedText;
  featured: boolean;
  confidential?: boolean;
  aiAssistance?: LocalizedText;
}

export interface Experience {
  organization: string | LocalizedText;
  role: LocalizedText;
  period: LocalizedText;
  responsibilities: LocalizedText[];
}

export interface Education {
  institution: string;
  program: LocalizedText;
  period: LocalizedText;
  topics: LocalizedText[];
}

export interface Skill {
  name: string;
  label?: LocalizedText;
  level: SkillLevel;
}

export interface SkillGroup {
  category: LocalizedText;
  skills: Skill[];
}
