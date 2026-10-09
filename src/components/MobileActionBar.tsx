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
  const { diameter } = usePipeSize();
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
      initial={still ? false : { y: "140%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-60 rounded-2xl bg-ink/92 p-1.5 shadow-[0_18px_40px_-14px_rgba(19,33,42,0.7)] ring-1 ring-white/10 backdrop-blur-xl lg:hidden"
    >
      {/* min-w-0 throughout: flex children refuse to shrink below their
          content by default, so at 280px, or at 145% text, the price label
          pushed the whole bar past the viewport and took the document with
          it. Labels truncate instead. */}
      <div className="flex items-stretch gap-1.5">
        <button
          type="button"
          onClick={() => fire(OPEN_A11Y)}
          aria-label="Accessibility settings"
          className="shrink-0 justify-center rounded-xl px-3.5 text-white transition-colors active:bg-white/15"
        >
          <Accessibility className="size-5.5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => fire(OPEN_CHAT)}
          aria-label="Ask a question"
          className="shrink-0 justify-center rounded-xl px-3.5 text-white transition-colors active:bg-white/15"
        >
          <Chat className="size-5.5" aria-hidden />
        </button>
        <a
          href="tel:+12533685614"
          className="min-w-0 flex-1 justify-center gap-1.5 rounded-xl bg-white/10 px-2 font-semibold text-white transition-colors active:bg-white/20"
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          <span className="truncate max-[339px]:sr-only">Call</span>
        </a>
        <Link
          href="/#quote"
          className="group min-w-0 flex-[1.6] justify-center gap-1.5 rounded-xl bg-cyan-dark px-2 py-3 text-[0.9375rem] font-semibold whitespace-nowrap text-white transition-colors active:bg-cyan-deep"
        >
          <span className="truncate max-[339px]:hidden">
            {diameter !== null ? `Price for ${diameter}″` : "Get a price"}
          </span>
          <span className="min-[340px]:hidden">Quote</span>
          <ArrowRight
            className="hidden size-4 shrink-0 transition-transform group-hover:translate-x-0.5 min-[340px]:block"
            aria-hidden
          />
        </Link>
      </div>
    </motion.nav>
  );
}
