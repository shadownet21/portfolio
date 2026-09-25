import type { NavItem } from "@/types/content";

export const PLACEHOLDERS = {
  github: "https://github.com/shadownet21/",
  linkedin: "https://www.linkedin.com/in/marc-maurice-freeman-324816394",
  cv: "/documents/marc-maurice-freeman-cv.pdf",
  email: "birkhofxy@gmail.com",
} as const;

export const SITE = {
  name: "Marc Maurice Freeman",
  location: "Longueuil, Québec, Canada",

  role: {
    fr: "Développeur web full stack · Support TI",
    en: "Full-Stack Web Developer · IT Support",
  },

  signature: {
    fr: "Des applications utiles. Des données fiables. Des utilisateurs accompagnés.",
    en: "Useful applications. Reliable data. Supported users.",
  },
} as const;

export const NAV_ITEMS: NavItem[] = [
  {
    id: "projets",
    label: {
      fr: "Projets",
      en: "Projects",
    },
  },
  {
    id: "experience",
    label: {
      fr: "Expérience",
      en: "Experience",
    },
  },
  {
    id: "competences",
    label: {
      fr: "Compétences",
      en: "Skills",
    },
  },
  {
    id: "a-propos",
    label: {
      fr: "À propos",
      en: "About",
    },
  },
  {
    id: "contact",
    label: {
      fr: "Contact",
      en: "Contact",
    },
  },
];

export function isPlaceholder(value: string): boolean {
  return value.includes("_A_REMPLACER");
}

export function isPending(value: string): boolean {
  return value === "À compléter" || value === "To be completed";
}