"use client";

import { motion, useReducedMotion } from "framer-motion";

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

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.5,
  distance = 16,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, ...offsets[direction](Math.min(distance, 24)) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      transition={{ duration: reduceMotion ? 0 : Math.min(duration, 0.6), delay: reduceMotion ? 0 : Math.min(delay, 0.2), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
