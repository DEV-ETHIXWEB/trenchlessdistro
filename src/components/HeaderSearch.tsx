"use client";

/*
 * Hashes here are root relative ("/#quote", not "#quote"). The header, the
 * footer and the search box render on every route, and a bare hash on
 * /new-to-cipp pointed at an element that only exists on the homepage, so
 * those links did nothing at all.
 *
 * It costs the homepage nothing: Interactions.tsx compares pathname before
 * it takes over a click, so "/#quote" still gets the eased scroll there and
 * becomes a real navigation back to the homepage anywhere else.
 */

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ITEMS } from "@/data/catalog";
import { Search, StockDot } from "./icons";
import { usePipeSize } from "./PipeSize";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { productHref } from "@/data/details";
import Image from "next/image";

/*
 * Catalog search at the top of the page.
 *
 * A contractor who already knows the part should not have to scroll past
 * four sections of positioning to find it. Typing here shows the matching
 * products with their price and stock straight away. Choosing one opens
 * that product's page; pressing Enter on the text itself, or "See all",
 * drops them on the catalog with the search already run.
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

export default function HeaderSearch({
  onPick,
  autoFocus,
}: {
  onPick?: () => void;
  /** Kept for call sites; every instance renders as the pill now. */
  variant?: "pill";
  autoFocus?: boolean;
}) {
  const { setQuery } = usePipeSize();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  /* -1: nothing highlighted, so Enter searches the text as typed. */
  const [active, setActive] = useState(-1);
  const router = useRouter();
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

  function open_(item: (typeof ITEMS)[number]) {
    setOpen(false);
    setText("");
    onPick?.();
    router.push(productHref(item));
  }

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
      setActive((i) => (i <= 0 ? hits.length - 1 : i - 1));
    } else if (e.key === "Enter" && active >= 0 && hits[active]) {
      e.preventDefault();
      open_(hits[active]);
    }
  }

  return (
    <div ref={wrapRef} className="relative">
      <Link ref={jumpRef} href="/#spec-finder" className="sr-only" tabIndex={-1} aria-hidden>
        Go to the catalog
      </Link>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim()) go(text);
        }}
        className="flex items-center gap-2.5 rounded-full border border-line bg-mist px-4 transition-[background-color,border-color,box-shadow] duration-300 focus-within:border-cyan-dark focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(27,116,137,0.12)] hover:border-line-strong"
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
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search products or brands"
          autoFocus={autoFocus}
          aria-label="Search products"
          aria-expanded={show}
          aria-controls={show ? listId : undefined}
          aria-activedescendant={
            show && active >= 0 && hits[active] ? `${listId}-${active}` : undefined
          }
          aria-autocomplete="list"
          role="combobox"
          autoComplete="off"
          className="min-h-11 min-w-0 flex-1 bg-transparent py-2 text-[0.9375rem] text-ink placeholder:text-body/75 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
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
            className="absolute top-full left-0 z-50 mt-2 w-full min-w-[20rem] max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-lift)]"
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
                    onClick={() => open_(item)}
                    className={`flex cursor-pointer items-center gap-3 border-b border-line px-3 py-2.5 last:border-b-0 ${
                      i === active ? "bg-mist" : "bg-white"
                    }`}
                  >
                    <span className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-mist">
                      {item.img && (
                        <Image src={item.img} alt="" fill sizes="44px" className="object-cover" />
                      )}
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
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
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => go(text)}
              className="w-full justify-between gap-2 border-t border-line bg-mist/60 px-4 py-3 text-left text-[0.875rem] font-semibold text-cyan-dark hover:bg-mist"
            >
              <span className="min-w-0 truncate">
                {hits.length ? "See all results" : "Search the catalog"} for &ldquo;{text.trim()}&rdquo;
              </span>
              <span aria-hidden>&rarr;</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
