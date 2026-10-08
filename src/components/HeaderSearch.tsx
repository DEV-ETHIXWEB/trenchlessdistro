"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ITEMS } from "@/data/catalog";
import { Search, StockDot } from "./icons";
import { usePipeSize } from "./PipeSize";

/*
 * Catalog search at the top of the page.
 *
 * A contractor who already knows the part should not have to scroll past
 * four sections of positioning to find it. Typing here shows the matching
 * products with their price and stock straight away, and choosing one drops
 * them on the finder with that search already run.
 *
 * It is a combobox, so it is operable from the keyboard: arrows move through
 * the list, Enter takes the highlighted row, Escape closes it.
 */

const STOCK_TONE: Record<string, string> = {
  "In stock": "text-cyan-dark",
  "Low stock": "text-gray",
  "Built to order": "text-body",
};

const LIMIT = 6;

function search(q: string) {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  return ITEMS.filter((i) =>
    [i.name, i.code, i.maker, i.cure].join(" ").toLowerCase().includes(needle),
  ).slice(0, LIMIT);
}

export default function HeaderSearch({ onPick }: { onPick?: () => void }) {
  const { setQuery } = usePipeSize();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const jumpRef = useRef<HTMLAnchorElement>(null);
  const still = useReducedMotion();
  const listId = useId();

  const hits = search(text);
  const show = open && text.trim().length > 0;

  /* A dropdown that outlives a click elsewhere on the page is a bug people
     notice immediately. */
  useEffect(() => {
    if (!show) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [show]);

  function go(term: string) {
    setQuery(term);
    setOpen(false);
    setText("");
    onPick?.();
    /* Interactions.tsx owns the eased scroll for every in-page jump, so this
       goes through a real anchor rather than standing up a second scroller
       that would have to duplicate the easing, the focus move and the
       reduced-motion handling. */
    jumpRef.current?.click();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") return setOpen(false);
    if (!show || hits.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % hits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + hits.length) % hits.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(hits[active]?.name ?? text);
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <a ref={jumpRef} href="#spec-finder" className="sr-only" tabIndex={-1} aria-hidden>
        Go to the catalog
      </a>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim()) go(text);
        }}
        className="flex items-center gap-2 border border-line bg-white px-3 focus-within:border-cyan-dark"
      >
        <Search className="size-4.5 shrink-0 text-body" aria-hidden />
        <input
          type="search"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setOpen(true);
            /* New query, new list: the highlight goes back to the top here
               rather than in an effect, which would be a second render for
               something we already know at the moment of the keystroke. */
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search products"
          aria-label="Search products"
          aria-expanded={show}
          aria-controls={show ? listId : undefined}
          aria-activedescendant={
            show && hits.length > 0 ? `${listId}-${active}` : undefined
          }
          aria-autocomplete="list"
          role="combobox"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent py-2 text-[0.9375rem] text-ink placeholder:text-body/60 focus:outline-none"
        />
      </form>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={still ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            /*
             * No max-height and no scroll. A scrollable box whose children are
             * deliberately not focusable (an option must not be, inside a
             * listbox) is a region a keyboard cannot reach. Six results is
             * few enough to render whole, so the problem does not arise and
             * arrow keys remain the only navigation anyone needs.
             */
            className="absolute top-full left-0 z-50 mt-1 w-80 max-w-[calc(100vw-2rem)] border border-line bg-white shadow-lg"
          >
            {hits.length === 0 ? (
              <p className="px-4 py-4 text-[0.9375rem] text-body">
                Nothing matches that. Call 253-368-5614 and we will source it.
              </p>
            ) : (
              <ul id={listId} role="listbox" aria-label="Product results">
                {hits.map((item, i) => (
                  <li
                    key={item.code}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    /* Pointer down would blur the input and close the list
                       before the click ever lands. */
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => go(item.name)}
                    className={`flex cursor-pointer flex-col items-start gap-0.5 border-b border-line px-4 py-3 last:border-b-0 ${
                      i === active ? "bg-light" : "bg-white"
                    }`}
                  >
                    <span className="text-[0.9375rem] font-semibold text-ink">
                      {item.name}
                    </span>
                    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.8125rem] text-body">
                      <span>{item.maker}</span>
                      <span className="datum font-semibold text-ink">
                        ${item.price} {item.uom}
                      </span>
                      <span className={`flex items-center gap-1 font-semibold ${STOCK_TONE[item.stock]}`}>
                        <StockDot className="size-3.5 shrink-0" aria-hidden />
                        {item.stock}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
