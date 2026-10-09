"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/*
 * A number that counts up the first time it is seen.
 *
 * The final value is what the server renders, so search engines, no-JS
 * visitors and anyone with reduced motion read the real figure and never a
 * zero. The count is written straight to the text node rather than through
 * state: sixty renders a second of a whole stats strip to move four digits
 * is the kind of cost nobody sees until a cheap phone stutters.
 */
export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-40px" });
  const still = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !seen || still) return;
    if (document.documentElement.dataset.a11yMotion === "off") return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${Math.round(v).toLocaleString("en-US")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [seen, still, to, prefix, suffix, duration]);

  return (
    <span ref={ref} className="datum">
      {prefix}
      {to.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
