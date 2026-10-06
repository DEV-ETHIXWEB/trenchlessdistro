"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, StockDot } from "./icons";
import { APPLICATIONS, DIAMETERS, ITEMS, type Application } from "@/data/catalog";
import { usePipeSize } from "./PipeSize";

const STOCK_TONE: Record<string, string> = {
  "In stock": "text-cyan-dark",
  "Low stock": "text-gray",
  "Built to order": "text-body",
};

export default function SpecFinder() {
  // Diameter is shared with the hero picker, so a visitor only chooses once.
  const { diameter, setDiameter } = usePipeSize();
  const [app, setApp] = useState<Application>("lateral");
  const still = useReducedMotion();

  const results = useMemo(
    () =>
      ITEMS.filter(
        (i) => diameter >= i.minD && diameter <= i.maxD && i.apps.includes(app),
      ),
    [diameter, app],
  );
  const activeApp = APPLICATIONS.find((a) => a.id === app)!;

  return (
    <section
      id="spec-finder"
      aria-labelledby="spec-finder-title"
      className="border-b border-line bg-light"
    >
      <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-ink">Product finder</p>
          <h2 id="spec-finder-title" className="mt-3 text-[length:var(--text-h2)] text-ink">
            Start with the pipe.
          </h2>
          <p className="mt-4 text-lg text-body">
            Tell us the host pipe size and the job. We will show what fits and
            what is on the shelf.
          </p>
        </div>

        <div className="mt-8 border border-line bg-white">
          <div className="grid gap-px bg-line lg:grid-cols-2">
            <fieldset className="bg-white p-5 lg:p-6">
              <legend className="eyebrow text-body">Host pipe diameter</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {DIAMETERS.map((d) => {
                  const on = d === diameter;
                  return (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setDiameter(d)}
                      className={`datum min-w-13 border px-3 py-3 text-[0.9375rem] font-semibold transition-colors ${
                        on
                          ? "border-cyan-dark bg-cyan-dark text-white"
                          : "border-line bg-white text-ink hover:border-cyan-dark"
                      }`}
                    >
                      {d}
                      <span className="align-super text-[0.7em]">&#8243;</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-[0.9375rem] text-body">
                Sized on the host pipe, the way a crew measures it on site.
              </p>
            </fieldset>

            <fieldset className="bg-white p-5 lg:p-6">
              <legend className="eyebrow text-body">Application</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {APPLICATIONS.map((a) => {
                  const on = a.id === app;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setApp(a.id)}
                      className={`border px-3.5 py-3 text-[0.9375rem] font-semibold transition-colors ${
                        on
                          ? "border-cyan-dark bg-cyan-dark text-white"
                          : "border-line bg-white text-ink hover:border-cyan-dark"
                      }`}
                    >
                      {a.label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-[0.9375rem] text-body">{activeApp.hint}</p>
            </fieldset>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-white px-5 py-3 lg:px-6">
            {/* The count is the answer to the filter. Without a live region a
                screen reader user changes diameter and hears nothing. */}
            <p
              aria-live="polite"
              aria-atomic="true"
              className="text-[0.9375rem] font-semibold text-ink"
            >
              {results.length} {results.length === 1 ? "product" : "products"} for{" "}
              {diameter}&#8243; {activeApp.label.toLowerCase()}
            </p>
            <a
              href="#quote"
              className="group inline-flex items-center gap-2 font-semibold text-cyan-dark hover:text-ink"
            >
              Quote this list
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          </div>

          {/* Table on desktop, stacked cards on phones. */}
          <div className="hidden grid-cols-[8rem_minmax(0,1fr)_10rem_7rem_9rem] gap-4 border-t border-line bg-white px-5 py-2.5 lg:grid lg:px-6">
            {["Item", "Product", "Manufacturer", "Cure", "Availability"].map((h) => (
              <span key={h} className="eyebrow text-body">
                {h}
              </span>
            ))}
          </div>

          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((item, i) => (
              <motion.div
                key={item.code}
                layout={!still}
                initial={still ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, delay: i * 0.02 }}
                className="grid grid-cols-1 gap-x-4 gap-y-1 border-t border-line px-5 py-4 transition-colors hover:bg-light lg:grid-cols-[8rem_minmax(0,1fr)_10rem_7rem_9rem] lg:items-center lg:px-6"
              >
                <span className="datum text-[0.8125rem] font-semibold text-cyan-dark">
                  {item.code}-{String(diameter).padStart(2, "0")}
                </span>
                <span className="font-semibold text-ink">
                  {item.name}
                  <span className="ml-2 text-[0.8125rem] font-normal text-body">{item.uom}</span>
                </span>
                <span className="text-[0.9375rem] text-body">{item.maker}</span>
                <span className="text-[0.9375rem] text-body">{item.cure}</span>
                <span
                  className={`flex items-center gap-1.5 text-[0.9375rem] font-semibold whitespace-nowrap ${STOCK_TONE[item.stock]}`}
                >
                  <StockDot className="size-4 shrink-0" aria-hidden />
                  {item.stock}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {results.length === 0 && (
            <p className="border-t border-line px-5 py-10 text-center text-body lg:px-6">
              Nothing stocked for {diameter}&#8243; {activeApp.label.toLowerCase()}.
              Call 253-368-5614 and we will source it.
            </p>
          )}

          <p className="border-t border-line bg-light px-5 py-3 text-[0.8125rem] text-body lg:px-6">
            Sample catalog data for review. The live site reads from your product
            database, so stock, pricing and documents stay in one place.
          </p>
        </div>
      </div>
    </section>
  );
}
