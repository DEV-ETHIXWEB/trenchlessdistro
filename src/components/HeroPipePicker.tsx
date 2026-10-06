"use client";

import { useMemo } from "react";
import { DIAMETERS, ITEMS } from "@/data/catalog";
import { ArrowRight, PipeDiameter } from "./icons";
import { usePipeSize } from "./PipeSize";

/*
 * The hero's interactive element. A contractor arrives knowing exactly one
 * thing: the size of the pipe. Asking for it first qualifies them in a single
 * tap and carries the answer down to the product finder.
 *
 * On the dark hero this is the only white object on the screen, which is
 * deliberate: it is what the client was asked to react to.
 */
export default function HeroPipePicker() {
  const { diameter, setDiameter } = usePipeSize();

  const count = useMemo(
    () => ITEMS.filter((i) => diameter >= i.minD && diameter <= i.maxD).length,
    [diameter],
  );

  return (
    <div className="w-full border border-line bg-white shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9)]">
      <div className="brand-rule h-[3px]" aria-hidden />

      <div className="p-5 sm:p-6">
        <p className="eyebrow flex items-center gap-2 text-cyan-dark">
          <PipeDiameter className="size-4" aria-hidden />
          Start here
        </p>
        <h2
          id="pipe-picker-label"
          className="mt-2.5 text-[length:var(--text-h3)] text-ink"
        >
          What size pipe are you lining?
        </h2>

        <div
          role="group"
          aria-labelledby="pipe-picker-label"
          className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7"
        >
          {DIAMETERS.map((d) => {
            const on = d === diameter;
            return (
              <button
                key={d}
                type="button"
                aria-pressed={on}
                onClick={() => setDiameter(d)}
                className={`datum justify-center border py-3 text-[1.0625rem] font-semibold transition-colors ${
                  on
                    ? "border-cyan-dark bg-cyan-dark text-white"
                    : "border-line bg-white text-ink hover:border-cyan-dark hover:text-cyan-dark"
                }`}
              >
                {d}
                <span className="align-super text-[0.7em]">&#8243;</span>
              </button>
            );
          })}
        </div>

        <p
          aria-live="polite"
          className="datum mt-5 border-t border-line pt-4 text-[1.0625rem]"
        >
          <span className="font-head text-2xl font-bold text-ink">{count}</span>{" "}
          <span className="text-body">
            products stocked for {diameter}
            <span className="align-super text-[0.7em]">&#8243;</span> pipe
          </span>
        </p>

        <a
          href="#spec-finder"
          className="group mt-4 w-full justify-center gap-2 bg-cyan-dark px-5 py-3.5 font-semibold text-white transition-colors hover:bg-cyan-deep"
        >
          Narrow by job
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </a>

        <p className="mt-3 text-center text-[0.8125rem] text-body">
          Or call and read us the spec: 253-368-5614
        </p>
      </div>
    </div>
  );
}
