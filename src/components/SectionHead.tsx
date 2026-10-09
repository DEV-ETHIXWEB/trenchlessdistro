import type { ReactNode } from "react";
import { PipeMark } from "./icons";

/*
 * The page's one piece of signature furniture.
 *
 * Before this, every section opened the same way: a small teal eyebrow, a
 * bold heading, a grey paragraph. Fifteen times. That repetition is exactly
 * what makes a page read as assembled from a kit, and on a phone, where
 * every section collapses into the same single column, it was the whole
 * experience.
 *
 * So the sections are numbered and marked. The index tells you where you are
 * in a long scroll, the pipe mark is the one shape that belongs to this
 * business, and the rule that runs off the end gives the eye a horizontal to
 * follow. Costs one line of layout and is the difference between a stack of
 * cards and something that looks drawn on purpose.
 */
export default function SectionHead({
  index,
  eyebrow,
  title,
  titleId,
  children,
  tone = "light",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  titleId?: string;
  children?: ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-2.5">
        <PipeMark
          className={`size-4 shrink-0 ${dark ? "text-cyan" : "text-cyan-dark"}`}
          aria-hidden
        />
        <span
          className={`datum text-[0.8125rem] font-bold ${dark ? "text-cyan" : "text-cyan-dark"}`}
        >
          {index}
        </span>
        <span
          className={`eyebrow ${dark ? "text-white/80" : "text-body"}`}
        >
          {eyebrow}
        </span>
        <span
          aria-hidden
          className={`h-px flex-1 ${dark ? "bg-white/20" : "bg-line"}`}
        />
      </p>
      <h2
        id={titleId}
        className={`mt-4 text-[length:var(--text-h2)] ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
