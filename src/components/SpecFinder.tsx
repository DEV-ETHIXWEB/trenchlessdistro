"use client";

import { useDeferredValue, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Search, StockDot } from "./icons";
import { APPLICATIONS, DIAMETERS, ITEMS } from "@/data/catalog";
import { usePipeSize } from "./PipeSize";

const STOCK_TONE: Record<string, string> = {
  "In stock": "text-cyan-dark",
  "Low stock": "text-gray",
  "Built to order": "text-body",
};

/* Part code, product name and manufacturer are the three things a contractor
   types. Matching all of them means "scrim", "ML-SCR" and "MaxLiner" all
   land on the same row. */
const matches = (
  item: (typeof ITEMS)[number],
  q: string,
) =>
  !q ||
  [item.name, item.code, item.maker, item.cure]
    .join(" ")
    .toLowerCase()
    .includes(q);

export default function SpecFinder() {
  /*
   * Both filters live in the shared job: the hero asks for the diameter,
   * this asks for the application, and the quote form at the bottom reads
   * whatever the visitor settled on without asking a third time.
   */
  const {
    diameter,
    setDiameter,
    application: app,
    setApplication: setApp,
    query,
    setQuery,
  } = usePipeSize();
  /* Typing re-renders up to 18 animated rows. Deferring keeps the input
     responsive on a phone while the list catches up a frame later. */
  const q = useDeferredValue(query).trim().toLowerCase();
  const still = useReducedMotion();

  /*
   * A search is a different intent from a filter. Someone typing "scrim"
   * wants that product whatever size they picked earlier, so a live query
   * searches the whole catalog and the size and job chips step aside.
   */
  const searching = q.length > 0;
  const results = useMemo(
    () =>
      searching
        ? ITEMS.filter((i) => matches(i, q))
        : ITEMS.filter(
            (i) => diameter >= i.minD && diameter <= i.maxD && i.apps.includes(app),
          ),
    [diameter, app, q, searching],
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
          <p className="eyebrow text-ink">Price &amp; stock</p>
          <h2 id="spec-finder-title" className="mt-3 text-[length:var(--text-h2)] text-ink">
            See what fits your pipe, what it costs, and whether it ships today.
          </h2>
          <p className="mt-4 text-lg text-body">
            Pick the size and the job, or search the catalog by name or part
            code. No login, no call first.
          </p>
        </div>

        <div className="mt-8 border border-line bg-white">
          {/* Search sits above the filters: it is the faster route for anyone
              who already knows the product they came for. */}
          <div className="border-b border-line p-5 lg:p-6">
            <label htmlFor="catalog-search" className="eyebrow text-body">
              Search the catalog
            </label>
            <div className="mt-3 flex items-center gap-3 border border-line bg-white px-3.5 focus-within:border-cyan-dark">
              <Search className="size-5 shrink-0 text-body" aria-hidden />
              <input
                id="catalog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try &quot;scrim&quot;, &quot;MaxLiner&quot;, &quot;UV&quot; or a part code"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent py-3 text-ink placeholder:text-body/60 focus:outline-none"
              />
              {searching && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="shrink-0 text-[0.9375rem] font-semibold text-cyan-dark hover:text-cyan-deep"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div
            className={`grid gap-px bg-line lg:grid-cols-2 ${searching ? "opacity-45" : ""}`}
            /* Chips stay operable while a search is running; dimming only
               says they are not what is driving the list right now. */
          >
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
                      onClick={() => {
                        setDiameter(d);
                        setQuery("");
                      }}
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
                      onClick={() => {
                        setApp(a.id);
                        setQuery("");
                      }}
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
              {results.length} {results.length === 1 ? "product" : "products"}{" "}
              {searching ? (
                <>matching &ldquo;{q}&rdquo;</>
              ) : (
                <>
                  for {diameter}&#8243; {activeApp.label.toLowerCase()}
                </>
              )}
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
          <div className="hidden grid-cols-[7rem_minmax(0,1fr)_8.5rem_6rem_7.5rem_8rem] gap-4 border-t border-line bg-white px-5 py-2.5 lg:grid lg:px-6">
            {["Item", "Product", "Manufacturer", "Cure", "Price", "Availability"].map((h) => (
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
                transition={{ duration: 0.22, delay: Math.min(i, 8) * 0.02 }}
                className="grid grid-cols-1 gap-x-4 gap-y-1 border-t border-line px-5 py-4 transition-colors hover:bg-light lg:grid-cols-[7rem_minmax(0,1fr)_8.5rem_6rem_7.5rem_8rem] lg:items-center lg:px-6"
              >
                <span className="datum text-[0.8125rem] font-semibold text-cyan-dark">
                  {item.code}-{String(searching ? item.minD : diameter).padStart(2, "0")}
                </span>
                <span className="font-semibold text-ink">
                  {item.name}
                  <span className="ml-2 text-[0.8125rem] font-normal text-body">{item.uom}</span>
                </span>
                <span className="text-[0.9375rem] text-body">{item.maker}</span>
                <span className="text-[0.9375rem] text-body">{item.cure}</span>
                <span className="datum font-semibold whitespace-nowrap text-ink">
                  ${item.price}
                  <span className="ml-1 text-[0.8125rem] font-normal text-body">{item.uom}</span>
                </span>
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
              {searching ? (
                <>
                  Nothing in the catalog matches &ldquo;{q}&rdquo;. Call
                  253-368-5614 and we will source it.
                </>
              ) : (
                <>
                  Nothing stocked for {diameter}&#8243;{" "}
                  {activeApp.label.toLowerCase()}. Call 253-368-5614 and we will
                  source it.
                </>
              )}
            </p>
          )}

          <p className="border-t border-line bg-light px-5 py-3 text-[0.8125rem] text-body lg:px-6">
            Sample catalog data and indicative pricing, for design review. The
            live site reads your product database, so stock, price and
            documents stay in one place.
          </p>
        </div>
      </div>
    </section>
  );
}
