"use client";

import { motion, useAnimationControls, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "scale";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  duration?: number;
  distance?: number;
};

// Short, blur-free entrances: cheap to paint and never hide content for long.
const offsets: Record<RevealDirection, (distance: number) => { x: number; y: number; scale: number }> = {
  up: (distance) => ({ x: 0, y: distance, scale: 1 }),
  down: (distance) => ({ x: 0, y: -distance, scale: 1 }),
  left: (distance) => ({ x: -distance, y: 0, scale: 1 }),
  right: (distance) => ({ x: distance, y: 0, scale: 1 }),
  scale: () => ({ x: 0, y: 12, scale: 0.98 }),
};

const SHOWN = { opacity: 1, x: 0, y: 0, scale: 1 };

// One shared listener: 1 while the page scrolls down, -1 while it scrolls up.
let scrollDirection: 1 | -1 = 1;
let tracking = false;
function trackScrollDirection() {
  if (tracking) return;
  tracking = true;
  let last = window.scrollY;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y !== last) scrollDirection = y > last ? 1 : -1;
    last = y;
  }, { passive: true });
}

// Plays every time the element comes into view: the usual entrance when scrolling down,
// its mirror image (coming in from above) when scrolling up.
export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.5,
  distance = 16,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const shown = useRef(false);
  const offset = offsets[direction](Math.min(distance, 24));
  const hidden = (sign: 1 | -1) => ({ opacity: 0, x: offset.x * sign, y: offset.y * sign, scale: offset.scale });
  // Two thresholds, so the entrance offset can never push the element back out and loop:
  // play once 15% is in view, reset only once it has left the viewport entirely.
  const entering = useInView(ref, { amount: 0.15, margin: "0px 0px -60px 0px" });
  const visible = useInView(ref);

  useEffect(trackScrollDirection, []);

  useEffect(() => {
    if (reduceMotion) {
      controls.set(SHOWN);
      return;
    }
    if (entering && !shown.current) {
      shown.current = true;
      controls.set(hidden(scrollDirection));
      // Slightly slower than a plain entrance.
      controls.start({ ...SHOWN, transition: { duration: Math.min(duration, 0.6) * 1.35, delay: Math.min(delay, 0.2), ease: [0.22, 1, 0.36, 1] } });
    } else if (!visible && shown.current) {
      shown.current = false;
      controls.set(hidden(1));
    }
    // `hidden` only depends on direction and distance, which never change for a mounted element.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entering, visible, reduceMotion, controls, delay, duration]);

  return (
    <motion.div ref={ref} className={className} initial={reduceMotion ? false : hidden(1)} animate={controls}>
      {children}
    </motion.div>
  );
}
