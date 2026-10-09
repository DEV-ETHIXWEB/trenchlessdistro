"use client";

import { useSyncExternalStore } from "react";

/*
 * The quote list: this site's cart.
 *
 * Trenchless Distribution quotes rather than checks out. Freight, cure
 * method and contractor pricing all change the number, so the honest version
 * of "Add to cart" is "Add to quote": the visitor builds the list, and the
 * quote form sends it. Same gesture a buyer already knows, without promising
 * a checkout that does not exist.
 *
 * A tiny external store rather than context, so the header badge, every
 * product card and the drawer subscribe to the same object without a
 * provider, and so the first read from localStorage happens outside React's
 * render and effect cycle entirely. Storage is a convenience: every access
 * is guarded and the list simply starts empty when it is unavailable.
 */

export type QuoteState = {
  /** Part code to quantity, in the order the visitor added them. */
  items: { code: string; qty: number }[];
  /** Part codes the visitor hearted. */
  saved: string[];
};

const KEY = "td-quote-list";
const EMPTY: QuoteState = { items: [], saved: [] };

export const OPEN_QUOTE_LIST = "td-open-quote-list";

let state: QuoteState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Partial<QuoteState>;
    state = {
      items: Array.isArray(parsed.items)
        ? parsed.items.filter(
            (i) => typeof i?.code === "string" && Number.isFinite(i?.qty) && i.qty > 0,
          )
        : [],
      saved: Array.isArray(parsed.saved)
        ? parsed.saved.filter((c) => typeof c === "string")
        : [],
    };
  } catch {
    state = EMPTY;
  }
}

function commit(next: QuoteState) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* Private mode or blocked storage: the list still works for this visit. */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  /* Another tab changed the list. */
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    loaded = false;
    load();
    l();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return state;
}

const getServerSnapshot = () => EMPTY;

export function useQuoteList() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const quoteList = {
  add(code: string, qty = 1) {
    load();
    const found = state.items.find((i) => i.code === code);
    commit({
      ...state,
      items: found
        ? state.items.map((i) => (i.code === code ? { ...i, qty: i.qty + qty } : i))
        : [...state.items, { code, qty }],
    });
  },
  setQty(code: string, qty: number) {
    load();
    commit({
      ...state,
      items:
        qty <= 0
          ? state.items.filter((i) => i.code !== code)
          : state.items.map((i) => (i.code === code ? { ...i, qty } : i)),
    });
  },
  remove(code: string) {
    load();
    commit({ ...state, items: state.items.filter((i) => i.code !== code) });
  },
  toggleSaved(code: string) {
    load();
    commit({
      ...state,
      saved: state.saved.includes(code)
        ? state.saved.filter((c) => c !== code)
        : [...state.saved, code],
    });
  },
  clear() {
    load();
    commit({ ...state, items: [] });
  },
  open() {
    window.dispatchEvent(new CustomEvent(OPEN_QUOTE_LIST));
  },
};

export const countOf = (s: QuoteState) => s.items.reduce((n, i) => n + i.qty, 0);
