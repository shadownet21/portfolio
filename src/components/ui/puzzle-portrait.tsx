"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";

const WIDTH = 900;
const HEIGHT = 1141;
const COLUMNS = 4;
const ROWS = 5;
const tileWidth = WIDTH / COLUMNS;
const tileHeight = HEIGHT / ROWS;

// Shared boundaries use opposite directions, so adjacent tabs fit exactly.
function edge(x: number, y: number, dx: number, dy: number, depth: number) {
  const length = Math.hypot(dx, dy);
  const nx = -dy / length * depth;
  const ny = dx / length * depth;
  return [
    `L ${x + dx * .35} ${y + dy * .35}`,
    `C ${x + dx * .2 + nx} ${y + dy * .2 + ny} ${x + dx * .8 + nx} ${y + dy * .8 + ny} ${x + dx * .65} ${y + dy * .65}`,
    `L ${x + dx} ${y + dy}`,
  ].join(" ");
}
const boundary = (row: number, column: number) => (row + column) % 2 ? 28 : -28;
const pieces = Array.from({ length: COLUMNS * ROWS }, (_, index) => {
  const row = Math.floor(index / COLUMNS), column = index % COLUMNS;
  const x = column * tileWidth, y = row * tileHeight;
  return {
    path: [
      `M ${x} ${y}`,
      edge(x, y, tileWidth, 0, row ? boundary(row, column) : 0),
      edge(x + tileWidth, y, 0, tileHeight, column < COLUMNS - 1 ? boundary(row, column + 1) : 0),
      edge(x + tileWidth, y + tileHeight, -tileWidth, 0, row < ROWS - 1 ? -boundary(row + 1, column) : 0),
      edge(x, y + tileHeight, 0, -tileHeight, column ? -boundary(row, column) : 0),
      "Z",
    ].join(" "),
    style: {
      "--piece-x": `${(column - 1.5) * 95 + (row % 2 ? 30 : -30)}px`,
      "--piece-y": `${(row - 2) * 75 + (column % 2 ? 25 : -25)}px`,
      "--piece-rotation": `${((index * 7) % 19) - 9}deg`,
      "--piece-delay": `${((index * 7) % 20) * 38}ms`,
      transformOrigin: `${x + tileWidth / 2}px ${y + tileHeight / 2}px`,
    } as CSSProperties,
  };
});

export function PuzzlePortrait({ alt }: { alt: string }) {
  const container = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLImageElement>(null);
  const id = useId().replace(/:/g, "");
  const [phase, setPhase] = useState<"idle" | "assembling" | "complete">("idle");
  const [source, setSource] = useState("");

  useEffect(() => {
    const element = container.current;
    const image = portrait.current;
    if (!element || !image) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    // An anchor may scroll after hydration; wait until that initial navigation settles.
    let waitingForExit = !!window.location.hash && !["#accueil", "#contenu"].includes(window.location.hash);
    let played = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if (played || waitingForExit || !visible || !image.complete || !image.naturalWidth || preference.matches) return;
      played = true;
      setSource(image.currentSrc || image.src);
      setPhase("assembling");
      // Last piece finishes at 722 + 1050 ms; then restore the seamless image.
      timeout = setTimeout(() => setPhase("complete"), 1850);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) waitingForExit = false;
      start();
    }, { threshold: .2 });
    const reduce = () => {
      if (preference.matches) {
        played = true;
        clearTimeout(timeout);
        setPhase("complete");
      }
    };
    observer.observe(element);
    image.addEventListener("load", start);
    preference.addEventListener("change", reduce);
    return () => {
      observer.disconnect();
      image.removeEventListener("load", start);
      preference.removeEventListener("change", reduce);
      clearTimeout(timeout);
    };
  }, []);

  return <div ref={container} className="puzzle-portrait" data-phase={phase}>
    <Image ref={portrait} src="/images/profile.png" width={WIDTH} height={HEIGHT}
      sizes="(max-width: 1023px) calc(100vw - 32px), 500px" priority alt={alt} className="portrait-original" />
    {phase === "assembling" && <svg className="portrait-puzzle" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true" focusable="false">
      <defs>
        {pieces.map((piece, index) => <clipPath key={index} id={`${id}-piece-${index}`} clipPathUnits="userSpaceOnUse"><path d={piece.path} /></clipPath>)}
      </defs>
      {pieces.map((piece, index) => <g key={index} className="portrait-piece" style={piece.style}>
        <image href={source} width={WIDTH} height={HEIGHT} clipPath={`url(#${id}-piece-${index})`} />
      </g>)}
    </svg>}
  </div>;
}
