"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  apply,
  DEFAULTS,
  getServerSnapshot,
  getSnapshot,
  save,
  subscribe,
  type Prefs,
} from "@/lib/a11y";
import { Accessibility, Check, Cross } from "./icons";
import EthixwebCredit from "./EthixwebCredit";
import { play, setSoundEnabled } from "@/lib/sound";

/*
 * The accessibility button.
 *
 * Deliberately not an overlay widget of the kind that bolts a synthetic
 * screen reader onto a page. Each control here changes a real CSS custom
 * property or data-attribute, so it composes with the visitor's own operating
 * system settings instead of fighting them. Everything persists per browser.
 *
 * It sits bottom-left; the question box sits bottom-right. Neither covers the
 * other, and on a phone neither covers the page's own content, because both
 * panels take the full width and the page's last section has bottom padding.
 */

type Toggle = {
  key: keyof Prefs;
  on: string;
  off: string;
  label: string;
  hint: string;
};

const TOGGLES: Toggle[] = [
  {
    key: "contrast",
    on: "high",
    off: "normal",
    label: "Higher contrast",
    hint: "Darkens text and strengthens borders",
  },
  {
    key: "font",
    on: "readable",
    off: "default",
    label: "Easier-to-read font",
    hint: "Atkinson Hyperlegible, with wider spacing",
  },
  {
    key: "links",
    on: "underline",
    off: "default",
    label: "Underline links",
    hint: "So colour is not the only signal",
  },
  {
    key: "motion",
    on: "off",
    off: "on",
    label: "Stop animation",
    hint: "Pauses video and page movement",
  },
  {
    key: "sound",
    on: "off",
    off: "on",
    label: "Mute click sounds",
    hint: "Silences the tick on buttons and links",
  },
];

const TEXT_SIZES: { value: Prefs["text"]; label: string; sr: string }[] = [
  { value: "normal", label: "A", sr: "Default text size" },
  { value: "large", label: "A", sr: "Large text, 112 percent" },
  { value: "larger", label: "A", sr: "Larger text, 125 percent" },
  { value: "largest", label: "A", sr: "Largest text, 145 percent" },
];

const SIZE_CLASS = [
  "text-[0.875rem]",
  "text-[1.0625rem]",
  "text-[1.25rem]",
  "text-[1.5rem]",
];

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  // Storage is the source of truth, not component state: the pre-paint script
  // has already written these to <html> before React runs.
  const prefs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const still = useReducedMotion();

  function update(next: Prefs, message: string) {
    // Save first: apply() dispatches the event that re-reads storage.
    save(next);
    apply(next);
    setNote(message);

    // Turning sound back on is the one change that cannot announce itself:
    // the press that did it happened while the page was still muted.
    if (next.sound === "on" && prefs.sound === "off") {
      setSoundEnabled(true);
      play("on");
    }
  }

  // Escape closes and returns focus to the button that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !buttonRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const anyChanged = (Object.keys(DEFAULTS) as (keyof Prefs)[]).some(
    (k) => prefs[k] !== DEFAULTS[k],
  );

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        className="group fixed bottom-4 left-4 z-70 gap-2.5 border-2 border-white bg-ink px-4 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-cyan-dark sm:bottom-6 sm:left-6"
      >
        <Accessibility className="size-6 shrink-0" aria-hidden />
        <span className="sr-only sm:not-sr-only">
          {open ? "Close" : "Accessibility"}
        </span>
        {anyChanged && !open && (
          <span
            className="absolute -top-1.5 -right-1.5 size-3.5 border-2 border-white bg-cyan"
            aria-hidden
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
        <motion.div
          id="a11y-panel"
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility settings"
          // Grows out of the button it belongs to, rather than appearing.
          style={{ transformOrigin: "bottom left" }}
          initial={still ? false : { opacity: 0, y: 14, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={still ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-70 max-h-[min(85svh,42rem)] overflow-y-auto overscroll-contain border border-line bg-white shadow-2xl sm:inset-x-auto sm:bottom-24 sm:left-6 sm:w-[24rem]"
        >
          <div className="flex items-start justify-between gap-3 bg-ink px-4 py-3 text-white">
            <div>
              <p className="font-head font-bold">Accessibility</p>
              <p className="text-[0.8125rem] text-white/70">
                Saved in this browser
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              aria-label="Close accessibility settings"
              className="shrink-0 text-white/80 hover:text-white"
            >
              <Cross className="size-6" aria-hidden />
            </button>
          </div>
          <div className="brand-rule h-[3px]" aria-hidden />

          {/* Extra bottom padding on phones so the question button, which is
              fixed to the same corner region, cannot cover the last line. */}
          <div className="p-4">
            <fieldset>
              <legend className="eyebrow text-ink">Text size</legend>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {TEXT_SIZES.map((size, i) => {
                  const on = prefs.text === size.value;
                  return (
                    <button
                      key={size.value}
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        update(
                          { ...prefs, text: size.value },
                          `${size.sr} applied`,
                        )
                      }
                      className={`justify-center border font-head font-bold transition-colors ${SIZE_CLASS[i]} ${
                        on
                          ? "border-cyan-dark bg-cyan-dark text-white"
                          : "border-line bg-white text-ink hover:border-cyan-dark"
                      }`}
                    >
                      <span aria-hidden>{size.label}</span>
                      <span className="sr-only">{size.sr}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <ul className="mt-5 border-t border-line">
              {TOGGLES.map((t) => {
                const on = prefs[t.key] === t.on;
                return (
                  <li key={t.key}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() =>
                        update(
                          { ...prefs, [t.key]: on ? t.off : t.on } as Prefs,
                          `${t.label} ${on ? "off" : "on"}`,
                        )
                      }
                      className="w-full justify-between gap-3 border-b border-line py-3 text-left hover:bg-light"
                    >
                      <span className="min-w-0">
                        <span className="block font-semibold text-ink">
                          {t.label}
                        </span>
                        <span className="block text-[0.8125rem] leading-snug text-body">
                          {t.hint}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`flex size-7 shrink-0 items-center justify-center border-2 transition-colors ${
                          on
                            ? "border-cyan-dark bg-cyan-dark text-white"
                            : "border-line bg-white"
                        }`}
                      >
                        {on && <Check className="size-4" />}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => update(DEFAULTS, "All settings reset")}
              disabled={!anyChanged}
              className="mt-4 w-full justify-center border border-line py-3 font-semibold text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:text-body/50 disabled:hover:border-line"
            >
              Reset all
            </button>

            <p className="mt-4 text-[0.8125rem] leading-relaxed text-body">
              This site also follows the text size, contrast and reduced-motion
              settings in your own device. Something still hard to use? Call{" "}
              <a
                href="tel:+12533685614"
                className="inline-link font-semibold text-cyan-dark underline"
              >
                253-368-5614
              </a>
              .
            </p>
          </div>

          {/* The panel scrolls once every control is listed, so the credit is
              pinned to the foot of the scroll area rather than parked below
              it. Extra bottom padding on phones keeps the question button,
              fixed to the same corner region, from covering it. */}
          <div className="sticky bottom-0 flex justify-center border-t border-line bg-light py-2.5 pb-16 sm:pb-2.5">
            <EthixwebCredit />
          </div>

          <p role="status" aria-live="polite" className="sr-only">
            {note}
          </p>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
