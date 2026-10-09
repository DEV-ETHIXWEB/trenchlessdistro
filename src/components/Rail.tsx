"use client";

import { useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "./icons";

/*
 * A horizontal rail, for phones.
 *
 * Ten products stacked vertically is three thousand pixels of scrolling and
 * reads like a spreadsheet. The same ten on a snap rail is one screen that
 * invites a thumb, which is how every shop anyone actually uses presents a
 * shelf. Above the breakpoint it unwraps back into the grid the desktop
 * already had, so this costs the large layout nothing.
 *
 * `peek` leaves part of the next card showing. That sliver is the entire
 * affordance: without it people do not know the rail scrolls.
 */
export default function Rail({
  children,
  label,
  className = "",
  desktop = "lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible",
}: {
  children: ReactNode;
  label: string;
  className?: string;
  desktop?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [atEnd, setAtEnd] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <ul
        ref={ref}
        aria-label={label}
        onScroll={(e) => {
          const el = e.currentTarget;
          setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 24);
        }}
        className={`-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-1 [scrollbar-width:none] [&>li]:snap-start [&::-webkit-scrollbar]:hidden lg:mx-0 lg:px-0 lg:pb-0 ${desktop}`}
      >
        {children}
      </ul>

      {/* Swipe hint, phones only, and only until they have swiped. */}
      <p
        aria-hidden
        className={`mt-3 flex items-center gap-1.5 text-[0.8125rem] font-semibold text-body transition-opacity duration-500 lg:hidden ${
          atEnd ? "opacity-0" : "opacity-100"
        }`}
      >
        Swipe for more
        <ArrowRight className="size-3.5" aria-hidden />
      </p>
    </div>
  );
}
