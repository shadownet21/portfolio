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
  onComplete?: () => void;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
  distance = 40,
  onComplete,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const getInitialAnimation = () => {
    if (reduceMotion) {
      return {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      };
    }

    switch (direction) {
      case "left":
        return {
          opacity: 0,
          x: -distance,
          y: 0,
          scale: 1,
          filter: "blur(4px)",
        };

      case "right":
        return {
          opacity: 0,
          x: distance,
          y: 0,
          scale: 1,
          filter: "blur(4px)",
        };

      case "down":
        return {
          opacity: 0,
          x: 0,
          y: -distance,
          scale: 1,
          filter: "blur(4px)",
        };

      case "scale":
        return {
          opacity: 0,
          x: 0,
          y: 25,
          scale: 0.96,
          filter: "blur(3px)",
        };

      case "up":
      default:
        return {
          opacity: 0,
          x: 0,
          y: distance,
          scale: 1,
          filter: "blur(4px)",
        };
    }
  };

  return (
    <motion.div
      className={className}
      onAnimationComplete={onComplete}
      initial={getInitialAnimation()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.15,
        margin: "0px 0px -60px 0px",
      }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
