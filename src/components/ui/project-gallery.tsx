"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LockKeyhole, Maximize2, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useSwipe } from "@/lib/use-swipe";
import type { Locale, Project } from "@/types/content";

// "App · Screen" captions: the app goes in the address bar, the screen under the frame.
function splitCaption(caption: string, fallback: string) {
  const at = caption.indexOf(" · ");
  if (at < 0) return { app: fallback, screen: caption };
  const screen = caption.slice(at + 3);
  return { app: caption.slice(0, at), screen: screen.charAt(0).toLocaleUpperCase() + screen.slice(1) };
}

export function ProjectGallery({ project, locale }: { project: Project; locale: Locale }) {
  const fr = locale === "fr";
  const slides = project.gallery ?? [];
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const strip = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const titleId = useId();
  const move = (step: number) => setIndex(current => (current + step + slides.length) % slides.length);
  const swipe = useSwipe(move);

  // Keep the active thumbnail centred in the strip without scrolling the page (smoothness comes from CSS).
  useEffect(() => {
    const list = strip.current;
    const item = list?.children[index] as HTMLElement | undefined;
    if (!list || !item) return;
    list.scrollLeft = item.offsetLeft - (list.clientWidth - item.clientWidth) / 2;
  }, [index]);

  const slide = slides[index];
  if (!slide) return null;
  const several = slides.length > 1;
  const { app, screen } = splitCaption(slide.caption[locale], project.title[locale]);
  // Only the active slide and its neighbours are mounted: crossfade without loading all 20 screens.
  const mounted = new Set([index, (index + 1) % slides.length, (index - 1 + slides.length) % slides.length]);
  // Page scroll is locked by `body:has(.project-dialog[open])` in globals.css.
  const open = (button: HTMLButtonElement) => {
    trigger.current = button;
    dialog.current?.showModal();
  };

  return <>
    <div
      className="showcase"
      onKeyDown={event => {
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      }}
    >
      <div className="browser-frame">
        <div className="browser-bar" aria-hidden="true">
          <span className="browser-dots"><i /><i /><i /></span>
          <span className="browser-address"><LockKeyhole size={12} />{app}</span>
        </div>
        <div className="showcase-viewport" {...swipe}>
          <button type="button" className="showcase-stage" onClick={event => open(event.currentTarget)} aria-haspopup="dialog" aria-label={`${fr ? "Agrandir" : "Enlarge"} — ${slide.caption[locale]}`}>
            {slides.map((item, number) => mounted.has(number) ? (
              <Image key={item.src} src={item.src} alt="" fill sizes="(max-width: 1100px) 100vw, 1100px" priority={number === 0}
                className="showcase-image" data-active={number === index} />
            ) : null)}
            <span className="showcase-zoom"><Maximize2 size={16} aria-hidden="true" />{fr ? "Agrandir" : "Enlarge"}</span>
          </button>
          {several ? <>
            <button type="button" className="showcase-arrow left-3" onClick={() => move(-1)} aria-label={fr ? "Interface précédente" : "Previous interface"}><ChevronLeft size={22} aria-hidden="true" /></button>
            <button type="button" className="showcase-arrow right-3" onClick={() => move(1)} aria-label={fr ? "Interface suivante" : "Next interface"}><ChevronRight size={22} aria-hidden="true" /></button>
          </> : null}
        </div>
      </div>

      <p className="mt-5 flex items-baseline gap-3" aria-live="polite">
        <span className="showcase-count">{String(index + 1).padStart(2, "0")}<span className="muted"> / {String(slides.length).padStart(2, "0")}</span></span>
        <span className="font-bold leading-6">{screen}</span>
      </p>

      {several ? (
        <ul ref={strip} className="showcase-strip" aria-label={fr ? "Choisir une interface" : "Choose an interface"}>
          {slides.map((item, number) => (
            <li key={item.src}>
              <button type="button" className="showcase-thumb" aria-pressed={number === index} aria-label={`${number + 1} — ${item.caption[locale]}`} onClick={() => setIndex(number)}>
                <Image src={item.src} alt="" width={240} height={150} sizes="160px" className="aspect-[16/10] w-full object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>

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
          <button type="button" className="button-secondary" onClick={() => move(-1)} disabled={!several} aria-label={fr ? "Interface précédente" : "Previous interface"}><ChevronLeft size={18} aria-hidden="true" /><span className="hidden sm:inline">{fr ? "Précédente" : "Previous"}</span></button>
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label={fr ? "Choisir une interface" : "Choose an interface"}>
            {slides.map((item, number) => <button key={item.src} type="button" className="gallery-dot" aria-pressed={number === index} aria-label={`${number + 1} — ${item.caption[locale]}`} onClick={() => setIndex(number)}>{number + 1}</button>)}
          </div>
          <button type="button" className="button-secondary" onClick={() => move(1)} disabled={!several} aria-label={fr ? "Interface suivante" : "Next interface"}><span className="hidden sm:inline">{fr ? "Suivante" : "Next"}</span><ChevronRight size={18} aria-hidden="true" /></button>
        </div>
      </div>
    </dialog>
  </>;
}
