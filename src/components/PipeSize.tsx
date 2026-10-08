"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Application } from "@/data/catalog";

/*
 * The visitor's job, held in one place for the whole page.
 *
 * Someone who tells the hero they are lining a 4" lateral has already
 * answered two of the quote form's questions. Asking again at the bottom is
 * how you lose a contractor halfway down a form, so the hero picker, the
 * product finder and the quote form all read and write this one object.
 *
 * `touched` records whether any of it came from the visitor rather than the
 * defaults. The quote form only advertises that it carried something over
 * when there was something to carry.
 */
type Job = {
  diameter: number;
  application: Application;
  touched: boolean;
  /* A catalog search typed anywhere on the page. The header owns one input
     and the product finder owns another; both read and write this, so a
     search started at the top arrives at the table already run. */
  query: string;
};

type Ctx = Job & {
  setDiameter: (d: number) => void;
  setApplication: (a: Application) => void;
  setQuery: (q: string) => void;
};

const PipeSizeContext = createContext<Ctx | null>(null);

export function PipeSizeProvider({ children }: { children: ReactNode }) {
  const [job, setJob] = useState<Job>({
    diameter: 4,
    application: "lateral",
    touched: false,
    query: "",
  });

  return (
    <PipeSizeContext.Provider
      value={{
        ...job,
        setDiameter: (diameter) => setJob((j) => ({ ...j, diameter, touched: true })),
        setApplication: (application) => setJob((j) => ({ ...j, application, touched: true })),
        setQuery: (query) => setJob((j) => ({ ...j, query })),
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
