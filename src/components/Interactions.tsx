"use client";

import { useEffect } from "react";
import {
  CHANGE_EVENT,
  getSnapshot,
  type Prefs,
} from "@/lib/a11y";
import { play, setSoundEnabled } from "@/lib/sound";

/*
 * One mounted component that gives the whole page its manners:
 *
 *   1. In-page links scroll with an eased curve instead of the browser's
 *      fixed, abrupt one, and hand focus to wherever they landed.
 *   2. Buttons and links tick when pressed.
 *
 * Both are delegated from `document`, so no component has to opt in and
 * nothing has to be threaded through props. Both are switched off by the
 * accessibility panel: reduced motion jumps instead of gliding, sound off is
 * silent.
 */

/** Slow at both ends, quickest in the middle. The curve a drawer closes on. */
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** What a fixed header is covering at the top of the viewport. */
function headerOffset() {
  const header = document.querySelector("header");
  if (!header) return 16;
  const { position } = getComputedStyle(header);
  if (position !== "sticky" && position !== "fixed") return 16;
  return header.getBoundingClientRect().height + 16;
}

function prefersStill(prefs: Prefs) {
  return (
    prefs.motion === "off" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function Interactions() {
  useEffect(() => {
    const syncSound = () => {
      const prefs = getSnapshot();
      setSoundEnabled(prefs.sound === "on");
    };
    syncSound();
    document.addEventListener(CHANGE_EVENT, syncSound);

    let frame = 0;
    /** Set while our scroller owns the viewport, so we can bail out of it. */
    let running = false;

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    function scrollToTarget(el: HTMLElement) {
      const prefs = getSnapshot();
      const from = window.scrollY;
      const to = Math.max(
        0,
        Math.min(
          el.getBoundingClientRect().top + from - headerOffset(),
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );
      const delta = to - from;

      const land = () => {
        // Whoever we scrolled to should now hold focus, or a keyboard user is
        // still parked at the link they just pressed.
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      };

      if (prefersStill(prefs) || Math.abs(delta) < 2) {
        window.scrollTo(0, to);
        land();
        return;
      }

      // Long jumps take longer, but never so long that it feels like a ride.
      const duration = Math.min(1100, Math.max(420, Math.abs(delta) * 0.42));
      const start = performance.now();
      stop();
      running = true;

      const step = (now: number) => {
        if (!running) return;
        const t = Math.min(1, (now - start) / duration);
        window.scrollTo(0, Math.round(from + delta * easeInOutCubic(t)));
        if (t < 1) {
          frame = requestAnimationFrame(step);
        } else {
          running = false;
          land();
        }
      };
      frame = requestAnimationFrame(step);
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>(
        "a[href]",
      );
      if (!link || link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      const url = new URL(link.href, window.location.href);
      const here = window.location;
      if (
        url.origin !== here.origin ||
        url.pathname !== here.pathname ||
        !url.hash
      ) {
        return;
      }

      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;

      e.preventDefault();
      play("nav");
      // Keep the address bar and the back button honest.
      history.pushState(null, "", url.hash);
      scrollToTarget(el);
    };

    /* Pressing, not clicking: the tick should land with the finger. */
    const onPointerDown = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(
        'button, a[href], summary, [role="button"]',
      );
      if (!el) return;
      if (el instanceof HTMLButtonElement && el.disabled) return;

      // A control that reports its own state tells us which way it is going,
      // so the tick can rise for on and fall for off.
      const pressed = el.getAttribute("aria-pressed");
      if (pressed === "true") play("off");
      else if (pressed === "false") play("on");
      else play("tap");
    };

    /* Never fight someone who has taken the scrollbar back. */
    const onUserScroll = () => {
      if (running) stop();
    };

    document.addEventListener("click", onClick);
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchstart", onUserScroll, { passive: true });

    return () => {
      stop();
      document.removeEventListener(CHANGE_EVENT, syncSound);
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchstart", onUserScroll);
    };
  }, []);

  return null;
}
