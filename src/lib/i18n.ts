import type { Locale } from "@/types/content";

export const locales: Locale[] = ["fr", "en"];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
