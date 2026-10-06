"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

/*
 * One piece of shared state: the host pipe diameter. The hero asks for it,
 * the product finder further down the page is already filtered to it by the
 * time the visitor arrives. Picking a size in one place should never mean
 * picking it twice.
 */
type Ctx = { diameter: number; setDiameter: (d: number) => void };

const PipeSizeContext = createContext<Ctx | null>(null);

export function PipeSizeProvider({ children }: { children: ReactNode }) {
  const [diameter, setDiameter] = useState(4);
  return (
    <PipeSizeContext.Provider value={{ diameter, setDiameter }}>
      {children}
    </PipeSizeContext.Provider>
  );
}

export function usePipeSize() {
  const ctx = useContext(PipeSizeContext);
  if (!ctx) throw new Error("usePipeSize must be used inside PipeSizeProvider");
  return ctx;
}
