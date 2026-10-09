"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import type { Application } from "@/data/catalog";

/*
 * The visitor's job, held in one place for the whole page.
 *
 * Someone who filters the catalog to a 4" lateral has already answered two
 * of the quote form's questions. Asking again at the bottom is how you lose
 * a contractor halfway down a form, so the catalog filters, the header
 * search and the quote form all read and write this one object.
 *
 * Size and application start unset. A catalog that opens pre-filtered to a
 * job nobody chose hides most of the shelf from the first glance, so `null`
 * means "any" and the full range shows until the visitor narrows it.
 * `touched` is true once either has been chosen, and the quote form only
 * advertises that it carried something over when there was something to
 * carry.
 */
type Job = {
  diameter: number | null;
  application: Application | null;
  /* A catalog search typed anywhere on the page. The header owns one input
     and the catalog owns another; both read and write this, so a search
     started at the top arrives at the catalog already run. */
  query: string;
  /** A category picked from the category rail; null shows every shelf. */
  category: string | null;
};

type Ctx = Job & {
  touched: boolean;
  setDiameter: (d: number | null) => void;
  setApplication: (a: Application | null) => void;
  setQuery: (q: string) => void;
  setCategory: (c: string | null) => void;
};

const PipeSizeContext = createContext<Ctx | null>(null);

/*
 * Size and application outlive the page: a size picked on a product page
 * has to be there when the buyer reaches the quote form on the homepage.
 * They live in a small store backed by sessionStorage (this visit only),
 * read through useSyncExternalStore so the server render and hydration see
 * "nothing chosen" and the stored job arrives straight after, with no
 * mismatch. The category rail stays per page on purpose.
 */
type Kept = { diameter: number | null; application: Application | null };
const KEPT_KEY = "td-job";
const NONE: Kept = { diameter: null, application: null };
let kept: Kept = NONE;
let keptLoaded = false;
const keptListeners = new Set<() => void>();

function readKept() {
  if (!keptLoaded && typeof window !== "undefined") {
    keptLoaded = true;
    try {
      const raw = window.sessionStorage.getItem(KEPT_KEY);
      if (raw) {
        const v = JSON.parse(raw) as Partial<Kept>;
        kept = {
          diameter: typeof v.diameter === "number" ? v.diameter : null,
          application: typeof v.application === "string" ? (v.application as Application) : null,
        };
      }
    } catch {
      kept = NONE;
    }
  }
  return kept;
}

function writeKept(next: Kept) {
  kept = next;
  try {
    window.sessionStorage.setItem(KEPT_KEY, JSON.stringify(next));
  } catch {
    /* Storage blocked: the job still holds for this page. */
  }
  keptListeners.forEach((l) => l());
}

const subscribeKept = (l: () => void) => {
  keptListeners.add(l);
  return () => keptListeners.delete(l);
};

/*
 * The search text rides along in memory between pages (a search typed on a
 * product page has to arrive at the catalog on the homepage), but is not
 * written to storage: a reload starts with the full shelf.
 */
let liveQuery = "";
const queryListeners = new Set<() => void>();
const subscribeQuery = (l: () => void) => {
  queryListeners.add(l);
  return () => queryListeners.delete(l);
};
function writeQuery(q: string) {
  liveQuery = q;
  queryListeners.forEach((l) => l());
}

export function PipeSizeProvider({ children }: { children: ReactNode }) {
  const job = useSyncExternalStore(subscribeKept, readKept, () => NONE);
  const query = useSyncExternalStore(subscribeQuery, () => liveQuery, () => "");
  const [local, setLocal] = useState<{ category: string | null }>({ category: null });

  return (
    <PipeSizeContext.Provider
      value={{
        ...job,
        ...local,
        query,
        touched: job.diameter !== null || job.application !== null,
        setDiameter: (diameter) => writeKept({ ...readKept(), diameter }),
        setApplication: (application) => writeKept({ ...readKept(), application }),
        setQuery: writeQuery,
        setCategory: (category) => setLocal((j) => ({ ...j, category })),
      }}
    >
      {children}
    </PipeSizeContext.Provider>
  );
}

export function usePipeSize() {
  const ctx = useContext(PipeSizeContext);
  if (!ctx) throw new Error("usePipeSize must be used inside PipeSizeProvider");
  return ctx;
}

/** "8″ point repair", "8″ pipe", "point repair", or "" when nothing is set. */
export function describeJob(
  diameter: number | null,
  appLabel: string | undefined,
): string {
  const size = diameter !== null ? `${diameter}″` : "";
  const app = appLabel?.toLowerCase() ?? "";
  if (size && app) return `${size} ${app}`;
  if (size) return `${size} pipe`;
  return app;
}
