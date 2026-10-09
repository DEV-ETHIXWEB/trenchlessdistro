"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
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

export function PipeSizeProvider({ children }: { children: ReactNode }) {
  const [job, setJob] = useState<Job>({
    diameter: null,
    application: null,
    query: "",
    category: null,
  });

  return (
    <PipeSizeContext.Provider
      value={{
        ...job,
        touched: job.diameter !== null || job.application !== null,
        setDiameter: (diameter) => setJob((j) => ({ ...j, diameter })),
        setApplication: (application) => setJob((j) => ({ ...j, application })),
        setQuery: (query) => setJob((j) => ({ ...j, query })),
        setCategory: (category) => setJob((j) => ({ ...j, category })),
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
