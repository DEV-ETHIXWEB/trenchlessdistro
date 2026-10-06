"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/*
 * Depth, used once: the hero image reacts to the cursor on a real 3D
 * transform. Amplitude is deliberately low (5 degrees) and spring-damped:
 * enough to feel considered on a large screen, never enough to read as a toy.
 * Pointer-coarse devices and reduced-motion users get a flat image.
 */
export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const still = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spring = { stiffness: 140, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [4.5, -4.5]), spring);
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);

  if (still) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      style={{ perspective: 1200 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {children}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay"
          style={{
            background: `radial-gradient(40rem circle at ${glareX} 30%, rgba(255,255,255,0.30), transparent 55%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
