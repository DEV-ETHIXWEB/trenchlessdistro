"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "./icons";

/*
 * One horizontal rail, three ways to move it.
 *
 * Native scroll does the work (snap points, momentum, trackpads, keyboard),
 * so nothing here fights the browser. The hook only reads where the rail is
 * and offers prev/next for the arrow buttons and a page count for the dots.
 * Measurements arrive through scroll and resize callbacks, never in an
 * effect body, so a rail costs no render until somebody moves it.
 */
export function useRail<T extends HTMLElement = HTMLUListElement>() {
  const ref = useRef<T>(null);
  const [pos, setPos] = useState({ canPrev: false, canNext: true, page: 0, pages: 1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = el.scrollWidth - el.clientWidth;
      const pages = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
      const page = max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (pages - 1));
      setPos((p) => {
        const next = {
          canPrev: el.scrollLeft > 4,
          canNext: el.scrollLeft < max - 4,
          page,
          pages,
        };
        return p.canPrev === next.canPrev &&
          p.canNext === next.canNext &&
          p.page === next.page &&
          p.pages === next.pages
          ? p
          : next;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    el.addEventListener("scroll", schedule, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.a11yMotion === "off";
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const goTo = useCallback((page: number, pages: number) => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: pages <= 1 ? 0 : (max * page) / (pages - 1), behavior: "smooth" });
  }, []);

  /* The ref travels separately from the state: reading render values off
     an object that also carries a ref is what the refs lint rule forbids. */
  return [ref, { ...pos, prev: () => step(-1), next: () => step(1), goTo }] as const;
}

/** Round arrow buttons, as in the references. */
export function RailArrows({
  label,
  canPrev,
  canNext,
  prev,
  next,
  tone = "light",
  className = "",
}: {
  label: string;
  canPrev: boolean;
  canNext: boolean;
  prev: () => void;
  next: () => void;
  tone?: "light" | "dark";
  className?: string;
}) {
  const base =
    tone === "dark"
      ? "border-white/25 text-white hover:bg-white hover:text-ink disabled:hover:bg-transparent disabled:hover:text-white"
      : "border-line-strong bg-white text-ink hover:border-cyan-dark hover:bg-cyan-dark hover:text-white disabled:hover:border-line-strong disabled:hover:bg-white disabled:hover:text-ink";
  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        type="button"
        onClick={prev}
        disabled={!canPrev}
        aria-label={`Previous ${label}`}
        className={`size-11 justify-center rounded-full border disabled:opacity-35 ${base}`}
      >
        <ChevronLeft className="size-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={next}
        disabled={!canNext}
        aria-label={`Next ${label}`}
        className={`size-11 justify-center rounded-full border disabled:opacity-35 ${base}`}
      >
        <ChevronRight className="size-5" aria-hidden />
      </button>
    </div>
  );
}

/** Page dots. Decorative position marker; the arrows and swipe are the controls. */
export function RailDots({ page, pages, className = "" }: { page: number; pages: number; className?: string }) {
  if (pages <= 1) return null;
  return (
    <div className={`flex justify-center gap-1.5 ${className}`} aria-hidden>
      {Array.from({ length: pages }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-[width,background-color] duration-500 ease-glide ${
            i === page ? "w-6 bg-cyan-dark" : "w-1.5 bg-line-strong"
          }`}
        />
      ))}
    </div>
  );
}
