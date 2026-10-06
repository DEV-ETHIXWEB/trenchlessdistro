"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/*
 * The page's one motion primitive. Content settles into place on first view:
 * 18px, 0.7s, a single decelerating curve shared with the CSS transitions.
 * Used everywhere so the whole page moves with one hand. Disabled outright
 * under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const still = useReducedMotion();
  const M = motion[as];

  return (
    <M
      className={className}
      initial={still ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      // --ease-glide from globals.css, so JS motion and CSS motion decelerate
      // on the same curve. 0.7s reads as settling; 0.5s read as arriving.
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}
