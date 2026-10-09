"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/*
 * Keeps keyboard focus inside a modal while it is open (the menu, the quote
 * list, the filter sheet). On open, focus moves to the first control unless
 * something inside already has it; Tab and Shift+Tab wrap at the ends; on
 * close, focus goes back to whatever opened it, so a keyboard user is never
 * dropped at the top of the page.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const root = ref.current;
    if (!root) return;
    const opener = document.activeElement as HTMLElement | null;

    const items = () =>
      [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (e) => e.getClientRects().length > 0,
      );

    if (!root.contains(document.activeElement)) items()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = items();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      const now = document.activeElement;
      if (!root.contains(now)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && now === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && now === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (opener && document.contains(opener)) opener.focus();
    };
  }, [active, ref]);
}
