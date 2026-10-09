"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ITEMS } from "@/data/catalog";
import { ArrowRight, Cross, Heart, Minus, Plus, QuoteBoard, Trash } from "./icons";
import { ProductArt } from "./ProductCard";
import { OPEN_QUOTE_LIST, countOf, quoteList, useQuoteList } from "@/lib/quoteList";

/*
 * The quote list, as a drawer from the right: what the visitor has added,
 * quantities they can change, what they hearted, and one way out, which is
 * the quote form with the list already attached.
 */
export default function QuoteDrawer() {
  const [open, setOpen] = useState(false);
  const list = useQuoteList();
  const still = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onOpen = () => {
      returnTo.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    };
    window.addEventListener(OPEN_QUOTE_LIST, onOpen);
    return () => window.removeEventListener(OPEN_QUOTE_LIST, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      returnTo.current?.focus?.();
    };
  }, [open]);

  const lines = list.items
    .map((l) => ({ ...l, item: ITEMS.find((i) => i.code === l.code) }))
    .filter((l): l is typeof l & { item: (typeof ITEMS)[number] } => Boolean(l.item));
  const saved = list.saved
    .map((c) => ITEMS.find((i) => i.code === c))
    .filter((i): i is (typeof ITEMS)[number] => Boolean(i));
  const n = countOf(list);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close quote list"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full bg-ink/45 backdrop-blur-[2px]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-list-title"
            initial={still ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl sm:rounded-l-3xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 id="quote-list-title" className="flex items-center gap-2.5 text-xl text-ink">
                <QuoteBoard className="size-6 text-cyan-dark" aria-hidden />
                Quote list
                <span className="datum rounded-full bg-mist px-2 py-0.5 text-[0.8125rem] font-semibold text-body">
                  {n}
                </span>
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close quote list"
                className="justify-center rounded-full px-2 hover:bg-mist"
              >
                <Cross className="size-6 text-ink" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {lines.length === 0 ? (
                <div className="rounded-2xl bg-mist px-5 py-10 text-center">
                  <QuoteBoard className="mx-auto size-10 text-cyan-dark" aria-hidden />
                  <p className="mt-4 font-head text-lg font-bold text-ink">Your list is empty.</p>
                  <p className="mt-1.5 text-[0.9375rem] text-body">
                    Add products from the catalog and we will price the lot in one
                    quote, the same business day.
                  </p>
                  <Link
                    href="/#spec-finder"
                    onClick={() => setOpen(false)}
                    className="group mt-5 gap-2 rounded-xl bg-cyan-dark px-5 font-semibold text-white hover:bg-cyan-deep"
                  >
                    Browse the catalog
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-3">
                  {lines.map(({ item, qty }) => (
                    <li key={item.code} className="flex gap-3 rounded-2xl border border-line p-2.5">
                      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-mist">
                        <ProductArt item={item} sizes="80px" decorative />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <p className="eyebrow text-[0.6875rem] text-cyan-dark">{item.maker}</p>
                        <p className="text-[0.9375rem] leading-snug font-semibold text-ink">{item.name}</p>
                        <p className="datum mt-0.5 text-[0.8125rem] text-body">
                          ${item.price} {item.uom}
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center rounded-full border border-line-strong">
                            <button
                              type="button"
                              onClick={() => quoteList.setQty(item.code, qty - 1)}
                              aria-label={`One fewer ${item.name}`}
                              className="size-11 justify-center rounded-full text-ink hover:text-cyan-dark"
                            >
                              <Minus className="size-4" aria-hidden />
                            </button>
                            <span className="datum w-7 text-center font-semibold text-ink" aria-live="polite">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => quoteList.setQty(item.code, qty + 1)}
                              aria-label={`One more ${item.name}`}
                              className="size-11 justify-center rounded-full text-ink hover:text-cyan-dark"
                            >
                              <Plus className="size-4" aria-hidden />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => quoteList.remove(item.code)}
                            aria-label={`Remove ${item.name}`}
                            className="justify-center rounded-full px-2.5 text-body hover:text-ink"
                          >
                            <Trash className="size-4.5" aria-hidden />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {saved.length > 0 && (
                <div className="mt-7">
                  <p className="eyebrow flex items-center gap-2 text-body">
                    <Heart className="size-4 fill-current text-purple" aria-hidden />
                    Saved for later
                  </p>
                  <ul className="mt-3 flex flex-col gap-2">
                    {saved.map((item) => (
                      <li key={item.code} className="flex items-center gap-3 rounded-xl bg-mist p-2">
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-white">
                          <ProductArt item={item} sizes="48px" decorative />
                        </div>
                        <p className="min-w-0 flex-1 text-[0.875rem] leading-snug font-semibold text-ink">
                          {item.name}
                        </p>
                        <button
                          type="button"
                          onClick={() => quoteList.add(item.code)}
                          aria-label={`Add ${item.name} to the quote`}
                          className="size-11 shrink-0 justify-center rounded-full bg-white text-cyan-dark shadow-[var(--shadow-card)] hover:bg-cyan-dark hover:text-white"
                        >
                          <Plus className="size-4.5" aria-hidden />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-line p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <Link
                  href="/#quote"
                  onClick={() => setOpen(false)}
                  className="group w-full justify-center gap-2 rounded-xl bg-cyan-dark px-5 py-3.5 font-semibold text-white hover:bg-cyan-deep"
                >
                  Request a quote for {n} {n === 1 ? "item" : "items"}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
                <p className="mt-2.5 text-center text-[0.8125rem] text-body">
                  Priced the same business day. No payment taken here.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
