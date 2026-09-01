import { CodeXml, ContactRound } from "lucide-react";
import { NAV_ITEMS, PLACEHOLDERS, SITE } from "@/data/site";
import type { Locale } from "@/types/content";
import { SafeLink } from "@/components/ui/safe-link";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="container-shell grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
        <div><p className="text-lg font-extrabold">{SITE.name}</p><p className="muted mt-2 text-sm">© {new Date().getFullYear()} · {locale === "fr" ? "Conçu avec Next.js et TypeScript" : "Built with Next.js and TypeScript"}</p></div>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
          {NAV_ITEMS.filter((item) => ["projets", "experience", "contact"].includes(item.id)).map((item) => <a key={item.id} href={`#${item.id}`}>{item.label[locale]}</a>)}
          <SafeLink href={PLACEHOLDERS.github} label="GitHub" newTab><CodeXml size={20} /></SafeLink>
          <SafeLink href={PLACEHOLDERS.linkedin} label="LinkedIn" newTab><ContactRound size={20} /></SafeLink>
        </div>
      </div>
    </footer>
  );
}
