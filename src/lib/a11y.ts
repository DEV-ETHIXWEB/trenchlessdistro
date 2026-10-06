/*
 * Accessibility preferences.
 *
 * Each preference is a data-attribute on <html>; all of the actual work is
 * done by CSS in globals.css. This module is the single place that knows the
 * attribute names, so the widget, the pre-paint script and the stylesheet
 * cannot drift apart.
 *
 * No "use client" here: layout.tsx is a Server Component and needs
 * BOOT_SCRIPT at render time.
 */

export const STORAGE_KEY = "td-a11y";

export type Prefs = {
  /** Scales every rem on the page. */
  text: "normal" | "large" | "larger" | "largest";
  /** Swap to Atkinson Hyperlegible with opened-up spacing. */
  font: "default" | "readable";
  /** Raise every text pair and make hairline borders visible. */
  contrast: "normal" | "high";
  /** Underline links so colour is not the only signal. */
  links: "default" | "underline";
  /** Stop animation, transitions and autoplaying video. */
  motion: "on" | "off";
  /** Short click tick on buttons and links. */
  sound: "on" | "off";
};

export const DEFAULTS: Prefs = {
  text: "normal",
  font: "default",
  contrast: "normal",
  links: "default",
  motion: "on",
  sound: "on",
};

/** Preference key -> the data-attribute it is written to. */
export const ATTR: Record<keyof Prefs, string> = {
  text: "data-a11y-text",
  font: "data-a11y-font",
  contrast: "data-a11y-contrast",
  links: "data-a11y-links",
  motion: "data-a11y-motion",
  sound: "data-a11y-sound",
};

/** Fired on `document` whenever a preference changes, so components that
 *  cannot be driven by CSS alone (video elements) can react. */
export const CHANGE_EVENT = "td-a11y-change";

export function apply(prefs: Prefs) {
  const root = document.documentElement;
  (Object.keys(ATTR) as (keyof Prefs)[]).forEach((key) => {
    const value = prefs[key];
    if (value === DEFAULTS[key]) root.removeAttribute(ATTR[key]);
    else root.setAttribute(ATTR[key], value);
  });
  document.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: prefs }));
}

/*
 * useSyncExternalStore needs a snapshot that is referentially stable between
 * renders, so the parsed object is cached and only rebuilt when the raw
 * string in storage actually changes. Returning a fresh object every call
 * would spin React in a loop.
 */
let cachedRaw: string | null = null;
let cached: Prefs = DEFAULTS;

export function getSnapshot(): Prefs {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private browsing or storage disabled.
    return DEFAULTS;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cached = raw
        ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Prefs>) }
        : DEFAULTS;
    } catch {
      cached = DEFAULTS; // Corrupt JSON.
    }
  }
  return cached;
}

/** The server has no storage, so it always renders the defaults. React swaps
 *  to the real snapshot after hydration without a mismatch warning. */
export function getServerSnapshot(): Prefs {
  return DEFAULTS;
}

export function subscribe(onChange: () => void) {
  document.addEventListener(CHANGE_EVENT, onChange);
  // Keep two tabs of the same site in step.
  window.addEventListener("storage", onChange);
  return () => {
    document.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function save(prefs: Prefs) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Not being able to remember the choice is survivable; failing is not.
  }
}

/*
 * Runs synchronously while the browser parses <head>, before first paint, so a
 * returning visitor never sees one frame of the page at the wrong text size.
 * Kept to one statement per line and wrapped in try/catch: if this throws, the
 * page still renders, just at the defaults.
 */
export const BOOT_SCRIPT = `
(function(){try{
var p=JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)})||"{}");
var m=${JSON.stringify(ATTR)};
var d=${JSON.stringify(DEFAULTS)};
var r=document.documentElement;
for(var k in m){if(p[k]&&p[k]!==d[k]){r.setAttribute(m[k],p[k]);}}
}catch(e){}})();
`.trim();
