"use client";

import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, PLACEHOLDERS } from "@/data/site";
import type { Locale } from "@/types/content";
import { ThemeToggle } from "./theme-toggle";
import { SafeLink } from "@/components/ui/safe-link";

export function Header({ locale }: { locale: Locale }) {

  const [active, setActive] = useState("accueil");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter((section): section is HTMLElement => !!section);
      const current = sections.filter(section => section.getBoundingClientRect().top <= 150).at(-1);
      if (current) setActive(current.id);
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min(1, window.scrollY / distance) : 0);
      frame = 0;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const otherLocale = locale === "fr" ? "en" : "fr";
  const copy = locale === "fr"
    ? { menu: "Ouvrir le menu", close: "Fermer le menu", theme: "Changer le thème", cv: "Télécharger mon CV", skip: "Aller au contenu" }
    : { menu: "Open menu", close: "Close menu", theme: "Switch theme", cv: "Download my résumé", skip: "Skip to content" };

  useEffect(() => {
    if (!open) return;
    mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <a href="#contenu" className="fixed left-3 top-3 z-[100] -translate-y-24 rounded-md bg-[var(--brand)] px-4 py-2 text-white focus:translate-y-0">{copy.skip}</a>
      <header className="surface fixed inset-x-0 top-0 z-50 border-x-0 border-t-0 bg-[color:var(--surface)]/90 backdrop-blur-xl">
        <div className="reading-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
        <div className="container-shell flex h-20 items-center justify-between gap-4">
          <Link href={`/${locale}#accueil`} className="text-lg font-extrabold tracking-[-.04em]" aria-label="Marc Maurice Freeman">
            MM<span className="text-[var(--brand)]">F</span>
          </Link>
          <nav aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"} className="hidden items-center gap-5 xl:flex">
            {NAV_ITEMS.map((item) => <a key={item.id} href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined} className="nav-link muted text-sm font-semibold hover:text-[var(--brand)]">{item.label[locale]}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <Link href={`/${otherLocale}`} className="button-secondary !h-10 !min-h-10 !px-3" hrefLang={otherLocale} aria-label={otherLocale === "fr" ? "Version française" : "English version"}>{otherLocale.toUpperCase()}</Link>
            <ThemeToggle label={copy.theme} />
            <SafeLink href={PLACEHOLDERS.cv} className="button-primary hidden lg:inline-flex" download label={copy.cv}><Download size={17} aria-hidden="true" />{copy.cv}</SafeLink>
            <button ref={menuButtonRef} type="button" className="button-secondary !h-10 !min-h-10 !w-10 !p-0 xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="true" aria-controls="mobile-menu" aria-label={open ? copy.close : copy.menu}>
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
        {open ? (
          <nav ref={mobileMenuRef} id="mobile-menu" className="container-shell border-t border-[var(--border)] py-4 xl:hidden" aria-label={locale === "fr" ? "Navigation mobile" : "Mobile navigation"}>
            <div className="grid gap-1">
              {NAV_ITEMS.map((item) => <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)} aria-current={active === item.id ? "location" : undefined} className="rounded-md px-3 py-3 font-semibold hover:bg-[var(--surface-muted)]">{item.label[locale]}</a>)}
              <SafeLink href={PLACEHOLDERS.cv} className="button-primary mt-2 lg:hidden" download label={copy.cv}><Download size={17} />{copy.cv}</SafeLink>
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}
