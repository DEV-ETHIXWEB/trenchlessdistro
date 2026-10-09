"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  APPLICATIONS,
  CATEGORIES,
  DIAMETERS,
  ITEMS,
  MANUFACTURERS,
  type Item,
} from "@/data/catalog";
import { ArrowRight, Check, ChevronDown, Cross, Grid, Rows, Search, Sliders } from "./icons";
import { describeJob, usePipeSize } from "./PipeSize";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

/*
 * The catalog, laid out like the catalog frame Yash drew: filters down the
 * left, a toolbar with the count, sort and view over a grid of product
 * cards. On a phone the filters fold into a sheet behind one button and the
 * grid runs two-up, which is how every shop app people already use works.
 *
 * Size, application and category live in the shared job, so a category
 * card upstairs filters this grid and whatever the visitor settles on here
 * is already filled in on the quote form at the bottom. Manufacturer,
 * stock, sort and view are this section's own business.
 *
 * A typed search is a different intent from a filter. Someone typing
 * "scrim" wants that product whatever size they clicked earlier, so a live
 * query searches the whole catalog and the filters step aside until it is
 * cleared.
 */

type Sort = "featured" | "price-asc" | "price-desc" | "name";
const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
  { id: "name", label: "Name, A to Z" },
];

const num = (p: string) => Number(p.replace(/,/g, ""));
/* Photographed, badged lines first: the order a shop window is dressed in. */
const featuredScore = (i: Item) => (i.img ? 2 : 0) + (i.badge ? 1 : 0);

const matches = (item: Item, q: string) =>
  [item.name, item.code, item.maker, item.cure, item.kind].join(" ").toLowerCase().includes(q);

/** How many cards show before "Show all": two rows either way. */
const FIRST_PHONE = 4;
const FIRST_DESKTOP = 6;

export default function SpecFinder() {
  const {
    diameter,
    setDiameter,
    application: app,
    setApplication: setApp,
    category,
    setCategory,
    query,
    setQuery,
  } = usePipeSize();
  const q = useDeferredValue(query).trim().toLowerCase();
  const still = useReducedMotion();

  const [maker, setMaker] = useState<string>("");
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState<Sort>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showAll, setShowAll] = useState(false);
  const [sheet, setSheet] = useState(false);

  const searching = q.length > 0;

  const results = useMemo(() => {
    const base = searching
      ? ITEMS.filter((i) => matches(i, q))
      : ITEMS.filter(
          (i) =>
            (category === null || i.cat === category) &&
            (diameter === null || (diameter >= i.minD && diameter <= i.maxD)) &&
            (app === null || i.apps.includes(app)) &&
            (!maker || i.maker === maker) &&
            (!inStock || i.stock === "In stock"),
        );
    const sorted = [...base];
    if (sort === "featured") sorted.sort((a, b) => featuredScore(b) - featuredScore(a));
    if (sort === "price-asc") sorted.sort((a, b) => num(a.price) - num(b.price));
    if (sort === "price-desc") sorted.sort((a, b) => num(b.price) - num(a.price));
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [searching, q, category, diameter, app, maker, inStock, sort]);

  const activeApp = APPLICATIONS.find((a) => a.id === app);
  const activeCat = CATEGORIES.find((c) => c.slug === category);
  const filterCount =
    (category ? 1 : 0) + (diameter !== null ? 1 : 0) + (app ? 1 : 0) + (maker ? 1 : 0) + (inStock ? 1 : 0);

  const clearAll = () => {
    setCategory(null);
    setDiameter(null);
    setApp(null);
    setMaker("");
    setInStock(false);
  };

  /* The sheet is a modal on a phone: hold the page still behind it and let
     Escape close it. */
  useEffect(() => {
    if (!sheet) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [sheet]);

  const job = describeJob(diameter, activeApp?.label);
  const summary = searching ? (
    <>
      {results.length} {results.length === 1 ? "product" : "products"} matching &ldquo;{q}&rdquo;
    </>
  ) : (
    <>
      {results.length} {results.length === 1 ? "product" : "products"}
      {activeCat ? <> in {activeCat.name}</> : null}
      {job ? <> for {job}</> : null}
    </>
  );

  const renderFilters = (id: string) => (
    <div className={`space-y-7 transition-opacity duration-300 ${searching ? "opacity-50" : ""}`}>
      <fieldset>
        <legend className="eyebrow text-ink">Category</legend>
        <div className="mt-3 flex flex-col gap-0.5">
          {[{ slug: null as string | null, name: "All products" }, ...CATEGORIES].map((c) => {
            const on = category === c.slug;
            const n = c.slug ? ITEMS.filter((i) => i.cat === c.slug).length : ITEMS.length;
            return (
              <button
                key={c.slug ?? "all"}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setCategory(c.slug);
                  setQuery("");
                }}
                className={`w-full justify-between rounded-lg px-3 text-left text-[0.9375rem] ${
                  on ? "bg-cyan-dark/10 font-semibold text-cyan-dark" : "text-ink hover:bg-mist"
                }`}
              >
                <span>{c.name}</span>
                <span className={`datum text-[0.8125rem] ${on ? "text-cyan-dark" : "text-body"}`}>{n}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow text-ink">Host pipe diameter</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {DIAMETERS.map((d) => {
            const on = d === diameter;
            return (
              <button
                key={d}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setDiameter(on ? null : d);
                  setQuery("");
                }}
                className={`datum min-w-12 justify-center rounded-full border px-3 text-[0.9375rem] font-semibold ${
                  on
                    ? "border-cyan-dark bg-cyan-dark text-white"
                    : "border-line-strong bg-white text-ink hover:border-cyan-dark hover:text-cyan-dark"
                }`}
              >
                {d}&#8243;
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow text-ink">Application</legend>
        <div className="mt-3 flex flex-col gap-0.5">
          {APPLICATIONS.map((a) => {
            const on = a.id === app;
            return (
              <button
                key={a.id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setApp(on ? null : a.id);
                  setQuery("");
                }}
                className="group/opt w-full gap-3 rounded-lg px-2 text-left text-[0.9375rem] text-ink hover:bg-mist"
              >
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                    on ? "border-cyan-dark bg-cyan-dark text-white" : "border-line-strong bg-white"
                  }`}
                  aria-hidden
                >
                  {on && <Check className="size-3.5" strokeWidth={2.4} />}
                </span>
                <span className={on ? "font-semibold" : ""}>{a.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${id}-maker`} className="eyebrow text-ink">
          Manufacturer
        </label>
        <div className="relative mt-3">
          <select
            id={`${id}-maker`}
            value={maker}
            onChange={(e) => setMaker(e.target.value)}
            className="w-full appearance-none rounded-lg border border-line-strong bg-white py-2.5 pr-10 pl-3 text-[0.9375rem] text-ink focus:border-cyan-dark focus:outline-none"
          >
            <option value="">All manufacturers</option>
            {MANUFACTURERS.filter((m) => ITEMS.some((i) => i.maker === m.name)).map((m) => (
              <option key={m.name} value={m.name}>
                {m.name}
              </option>
            ))}
            <option value="Trenchless Distribution">Trenchless Distribution</option>
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-body" aria-hidden />
        </div>
      </div>

      <div>
        <p className="eyebrow text-ink" id={`${id}-avail`}>
          Availability
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={inStock}
          aria-labelledby={`${id}-avail ${id}-avail-text`}
          onClick={() => setInStock((v) => !v)}
          className="mt-3 w-full gap-3 rounded-lg px-2 text-[0.9375rem] text-ink hover:bg-mist"
        >
          <span
            className={`relative h-6 w-10 shrink-0 rounded-full transition-colors duration-300 ${
              inStock ? "bg-cyan-dark" : "bg-line-strong"
            }`}
            aria-hidden
          >
            <span
              className={`absolute top-1 left-1 size-4 rounded-full bg-white shadow transition-transform duration-300 ease-glide ${
                inStock ? "translate-x-4" : ""
              }`}
            />
          </span>
          <span id={`${id}-avail-text`}>In stock only</span>
        </button>
      </div>
    </div>
  );

  const limit = FIRST_DESKTOP;
  const capped = !showAll && !searching;

  return (
    <section id="spec-finder" aria-labelledby="spec-finder-title" className="bg-mist">
      <div className="mx-auto max-w-[88rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="max-w-3xl">
            <p className="eyebrow text-cyan-dark">Product catalog &middot; Price &amp; stock</p>
            <h2 id="spec-finder-title" className="mt-2.5 text-[length:var(--text-h2)] text-ink">
              See what fits your pipe, what it costs, and whether it ships today.
            </h2>
          </div>
          <p className="max-w-sm text-body">
            Filter by size and job or search by name or part code. No login, no
            call first.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[15.5rem_minmax(0,1fr)] xl:grid-cols-[17rem_minmax(0,1fr)]">
          {/* Desktop filter rail. */}
          <div role="group" aria-label="Filters" className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-line bg-white p-5">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-head text-lg font-bold text-ink">Filter by</p>
                {filterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-[0.875rem] font-semibold text-cyan-dark hover:text-cyan-deep"
                  >
                    Clear all
                  </button>
                )}
              </div>
              {renderFilters("rail")}
            </div>
          </div>

          <div className="min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-2.5 sm:flex-row sm:items-center sm:p-3">
              <label htmlFor="catalog-search" className="sr-only">
                Search the catalog
              </label>
              <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl bg-mist px-3.5 transition-shadow focus-within:shadow-[0_0_0_2px_var(--color-cyan-dark)]">
                <Search className="size-4.5 shrink-0 text-body" aria-hidden />
                <input
                  id="catalog-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name, maker or part code"
                  autoComplete="off"
                  className="min-h-11 min-w-0 flex-1 bg-transparent text-[0.9375rem] text-ink placeholder:text-body/75 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
                />
                {searching && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="-mr-1.5 shrink-0 justify-center rounded-full px-2 text-body hover:text-ink"
                  >
                    <Cross className="size-4.5" aria-hidden />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSheet(true)}
                  className="flex-1 justify-center gap-2 rounded-xl border border-line-strong px-4 text-[0.9375rem] font-semibold text-ink lg:hidden"
                >
                  <Sliders className="size-4.5" aria-hidden />
                  Filters
                  {filterCount > 0 && (
                    <span className="datum flex size-5 items-center justify-center rounded-full bg-cyan-dark text-[0.75rem] text-white">
                      {filterCount}
                    </span>
                  )}
                </button>
                <div className="relative flex-1 sm:flex-none">
                  <label htmlFor="catalog-sort" className="sr-only">
                    Sort by
                  </label>
                  <select
                    id="catalog-sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as Sort)}
                    className="w-full appearance-none rounded-xl border border-line-strong bg-white py-2.5 pr-9 pl-3.5 text-[0.9375rem] font-medium text-ink focus:border-cyan-dark focus:outline-none sm:w-52"
                  >
                    {SORTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-body" aria-hidden />
                </div>
                <div className="hidden items-center rounded-xl border border-line-strong p-0.5 sm:flex" role="group" aria-label="Layout">
                  {(
                    [
                      ["grid", Grid, "Grid view"],
                      ["list", Rows, "List view"],
                    ] as const
                  ).map(([v, I, label]) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={view === v}
                      aria-label={label}
                      onClick={() => setView(v)}
                      className={`size-10 justify-center rounded-lg ${
                        view === v ? "bg-cyan-dark text-white" : "text-body hover:text-ink"
                      }`}
                    >
                      <I className="size-4.5" aria-hidden />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Count and the filters in force, each removable. */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <p aria-live="polite" aria-atomic="true" className="mr-2 text-[0.9375rem] font-semibold text-ink">
                {summary}
              </p>
              {!searching &&
                [
                  activeCat && { k: "cat", label: activeCat.name, clear: () => setCategory(null) },
                  diameter !== null && { k: "d", label: `${diameter}″`, clear: () => setDiameter(null) },
                  activeApp && { k: "app", label: activeApp.label, clear: () => setApp(null) },
                  maker && { k: "m", label: maker, clear: () => setMaker("") },
                  inStock && { k: "s", label: "In stock", clear: () => setInStock(false) },
                ]
                  .filter(Boolean)
                  .map((f) => {
                    const chip = f as { k: string; label: string; clear: () => void };
                    return (
                      <button
                        key={chip.k}
                        type="button"
                        onClick={chip.clear}
                        aria-label={`Remove filter ${chip.label}`}
                        className="min-h-8 gap-1.5 rounded-full bg-white py-1 pr-2 pl-3 text-[0.8125rem] font-semibold text-ink shadow-[var(--shadow-card)] hover:text-cyan-dark"
                      >
                        {chip.label}
                        <Cross className="size-3.5" aria-hidden />
                      </button>
                    );
                  })}
            </div>

            <ul
              className={
                view === "grid"
                  ? "mt-5 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5 2xl:grid-cols-4"
                  : "mt-5 grid gap-3"
              }
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {results.map((item, i) => (
                  <motion.li
                    key={item.code}
                    layout={!still}
                    initial={still ? false : { opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.025, ease: [0.16, 1, 0.3, 1] }}
                    className={
                      capped && i >= FIRST_PHONE
                        ? i >= limit
                          ? "hidden"
                          : "hidden md:block"
                        : ""
                    }
                  >
                    <ProductCard item={item} view={view} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {results.length === 0 && (
              <div className="mt-5 rounded-2xl border border-dashed border-line-strong bg-white px-6 py-12 text-center">
                <p className="font-head text-lg font-bold text-ink">Nothing on the shelf matches that.</p>
                <p className="mt-2 text-body">
                  We source across the trenchless supply chain. Call{" "}
                  <a href="tel:+12533685614" className="inline-link font-semibold text-cyan-dark">
                    253-368-5614
                  </a>{" "}
                  and read us the spec.
                </p>
                {filterCount > 0 && !searching && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="mt-5 rounded-xl border border-line-strong px-5 font-semibold text-ink hover:border-cyan-dark hover:text-cyan-dark"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}

            {capped && results.length > FIRST_PHONE && (
              <div className={`mt-6 flex justify-center ${results.length > limit ? "" : "md:hidden"}`}>
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="group gap-2 rounded-xl border border-line-strong bg-white px-6 font-semibold text-ink shadow-[var(--shadow-card)] hover:border-cyan-dark hover:text-cyan-dark"
                >
                  Show all {results.length} products
                  <ChevronDown className="size-4.5 transition-transform group-hover:translate-y-0.5" aria-hidden />
                </button>
              </div>
            )}

            <p className="mt-6 text-[0.8125rem] text-body">
              Sample catalog data and indicative pricing, for design review. The
              live site reads your product database, so stock, price and
              documents stay in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Phone filter sheet. */}
      <AnimatePresence>
        {sheet && (
          <motion.div
            className="fixed inset-0 z-[65] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label="Close filters"
              onClick={() => setSheet(false)}
              className="absolute inset-0 h-full w-full bg-ink/50"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              initial={still ? false : { y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-3xl bg-white"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <p className="font-head text-lg font-bold text-ink">Filter by</p>
                <div className="flex items-center gap-2">
                  {filterCount > 0 && (
                    <button type="button" onClick={clearAll} className="px-2 text-[0.875rem] font-semibold text-cyan-dark">
                      Clear all
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setSheet(false)}
                    aria-label="Close filters"
                    autoFocus
                    className="justify-center rounded-full px-2 hover:bg-mist"
                  >
                    <Cross className="size-6 text-ink" aria-hidden />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto px-5 py-5">{renderFilters("sheet")}</div>
              <div className="border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <button
                  type="button"
                  onClick={() => setSheet(false)}
                  className="group w-full justify-center gap-2 rounded-xl bg-cyan-dark px-5 py-3.5 font-semibold text-white"
                >
                  Show {results.length} {results.length === 1 ? "product" : "products"}
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
