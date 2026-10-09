"use client";

import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Accessibility, ArrowRight, Chat, Phone } from "./icons";
import { OPEN_A11Y, OPEN_CHAT } from "@/lib/panels";
import { usePipeSize } from "./PipeSize";
import Link from "next/link";

/*
 * One piece of furniture at the bottom of a phone, instead of three.
 *
 * Before this there were two floating launchers and nothing else: an
 * accessibility button bottom left, a chat button bottom right, both sitting
 * on top of whatever happened to scroll under them. On the hero they landed
 * squarely across "What size pipe are you lining?". Two round widgets
 * bolted onto opposite corners is the single most template-looking thing a
 * site can do, and it was covering the content besides.
 *
 * So they are one bar. The two utilities sit left at icon size, the two
 * things a contractor actually came to do sit right at full size, and the
 * price button names the job they picked upstairs, which is the site showing
 * it was paying attention.
 *
 * It does not hide. A bar that comes and goes is one more thing moving on a
 * page that already moves, and the accessibility control in particular has
 * to be reachable at every scroll position, not most of them.
 */
export default function MobileActionBar() {
  const { diameter, touched } = usePipeSize();
  const still = useReducedMotion();

  /* Tells the page it is there, so the layout can leave room; see the
     [data-actionbar] rule in globals.css. */
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.actionbar = "on";
    return () => {
      delete root.dataset.actionbar;
    };
  }, []);

  const fire = (name: string) => window.dispatchEvent(new CustomEvent(name));

  return (
    /* A landmark, not a bare div: these are the page's primary actions and a
       screen reader user navigating by region should find them as a group
       rather than meeting two stray links outside everything. */
    <motion.nav
      aria-label="Quick actions"
      /* Rises once on mount. motion animates initial -> animate by itself,
         so this needs no state and therefore no render pass to trigger it. */
      initial={still ? false : { y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="fixed inset-x-0 bottom-0 z-60 border-t border-white/15 bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      {/* min-w-0 throughout: flex children refuse to shrink below their
          content by default, so at 280px, or at 145% text, the price label
          pushed the whole bar past the viewport and took the document with
          it. Labels truncate instead. */}
      <div className="flex items-stretch gap-1.5 px-2 py-2 sm:px-2.5">
        <button
          type="button"
          onClick={() => fire(OPEN_A11Y)}
          aria-label="Accessibility settings"
          className="shrink-0 justify-center border border-white/30 px-3 text-white transition-colors active:bg-white/10"
        >
          <Accessibility className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => fire(OPEN_CHAT)}
          aria-label="Ask a question"
          className="shrink-0 justify-center border border-white/30 px-3 text-white transition-colors active:bg-white/10"
        >
          <Chat className="size-5" aria-hidden />
        </button>

        <a
          href="tel:+12533685614"
          className="min-w-0 flex-1 justify-center gap-1.5 border border-white/30 px-2 font-semibold text-white transition-colors active:bg-white/10"
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          <span className="truncate max-[339px]:sr-only">Call</span>
        </a>
        <Link
          href="/#quote"
          className="group flex-[1.5] justify-center gap-1.5 bg-cyan-dark px-2 py-3 text-[0.9375rem] font-semibold whitespace-nowrap text-white transition-colors active:bg-cyan-deep"
        >
          {touched ? `Price for ${diameter}″` : "Get a price"}
          <ArrowRight
            className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </Link>
      </div>
    </motion.nav>
  );
}
