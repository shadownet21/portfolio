"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { useId, useRef, useState } from "react";
import type { Locale, Project } from "@/types/content";

export function ProjectGallery({ project, locale }: { project: Project; locale: Locale }) {
  const fr = locale === "fr";
  const slides = project.gallery ?? [];
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);
  const titleId = useId();
  const slide = slides[index];
  if (!slide) return null;
  const move = (step: number) => setIndex(current => (current + step + slides.length) % slides.length);
  // Page scroll is locked by `body:has(.project-dialog[open])` in globals.css.
  const open = (number: number, button: HTMLButtonElement) => {
    trigger.current = button;
    setIndex(number);
    dialog.current?.showModal();
  };
  return <>
    <ul className="grid gap-4 sm:grid-cols-2">
      {slides.map((item, number) => <li key={item.src}>
        <button type="button" className="gallery-thumb" onClick={event => open(number, event.currentTarget)} aria-haspopup="dialog" aria-label={`${fr ? "Agrandir" : "Enlarge"} — ${item.caption[locale]}`}>
          <Image src={item.src} alt="" width={800} height={500} sizes="(max-width: 640px) 100vw, 540px" className="aspect-[16/10] w-full object-contain" />
          <span className="flex items-center gap-2 p-3 text-left text-sm font-semibold"><Images size={16} aria-hidden="true" className="shrink-0 text-[var(--brand)]" />{item.caption[locale]}</span>
        </button>
      </li>)}
    </ul>
    <dialog ref={dialog} className="project-dialog" aria-labelledby={titleId}
      onClose={() => trigger.current?.focus()}
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "Tab") {
          const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
          const first = buttons[0], last = buttons.at(-1);
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }
      }}>
      <div className="gallery-panel">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] p-4 md:p-6">
          <div><p className="eyebrow">{fr ? "Aperçu du projet" : "Project preview"}</p><h2 id={titleId} className="mt-2 text-lg font-extrabold md:text-2xl">{project.title[locale]}</h2></div>
          <button type="button" className="button-secondary shrink-0 !p-3" onClick={() => dialog.current?.close()} aria-label={fr ? "Fermer la galerie" : "Close gallery"}><X size={20} aria-hidden="true" /></button>
        </div>
        <figure className="p-3 md:p-6">
          <div className="gallery-stage">
            <Image key={slide.src} src={slide.src} alt={slide.caption[locale]} width={1600} height={1100} sizes="(max-width: 768px) 95vw, 1000px" className="gallery-image" />
          </div>
          <figcaption className="mt-4 text-center text-sm" aria-live="polite">{index + 1} / {slides.length} · {slide.caption[locale]}</figcaption>
        </figure>
        <div className="flex items-center justify-between gap-3 px-4 pb-4 md:px-6">
          <button type="button" className="button-secondary" onClick={() => move(-1)} disabled={slides.length < 2} aria-label={fr ? "Interface précédente" : "Previous interface"}><ChevronLeft size={18} aria-hidden="true" /><span className="hidden sm:inline">{fr ? "Précédente" : "Previous"}</span></button>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={fr ? "Choisir une interface" : "Choose an interface"}>
            {slides.map((item, number) => <button key={item.src} type="button" className="gallery-dot" aria-pressed={number === index} aria-label={`${number + 1} — ${item.caption[locale]}`} onClick={() => setIndex(number)}>{number + 1}</button>)}
          </div>
          <button type="button" className="button-secondary" onClick={() => move(1)} disabled={slides.length < 2} aria-label={fr ? "Interface suivante" : "Next interface"}><span className="hidden sm:inline">{fr ? "Suivante" : "Next"}</span><ChevronRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </dialog>
  </>;
}
