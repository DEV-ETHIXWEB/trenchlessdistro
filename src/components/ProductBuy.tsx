"use client";

import { useEffect, useRef, useState } from "react";
import type { Item } from "@/data/catalog";
import { Accessibility, Chat, Check, Heart, Minus, Plus, QuoteBoard } from "./icons";
import { OPEN_A11Y, OPEN_CHAT } from "@/lib/panels";
import { usePipeSize } from "./PipeSize";
import { quoteList, useQuoteList } from "@/lib/quoteList";

/*
 * The buying half of a product page: pick the size, set the quantity, add
 * it to the quote. Everything a buyer does here lands in the same places as
 * on the homepage -- the size carries into the quote form, the quantity into
 * the quote list -- so the two never tell different stories.
 *
 * On a phone the same action also lives in a bar fixed to the bottom of the
 * screen, because the panel scrolls away long before the specs end and
 * nobody should have to scroll back up to buy.
 */
export default function ProductBuy({ item, sizes }: { item: Item; sizes: number[] }) {
  const { diameter, setDiameter } = usePipeSize();
  const list = useQuoteList();
  const inList = list.items.find((i) => i.code === item.code)?.qty ?? 0;
  const saved = list.saved.includes(item.code);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [shared, setShared] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  /* The bar replaces the homepage dock here; tell the layout it is there. */
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.actionbar = "on";
    return () => {
      delete root.dataset.actionbar;
    };
  }, []);

  const size = diameter !== null && sizes.includes(diameter) ? diameter : null;
  const unit = item.uom === "per ft" ? "ft" : item.uom === "each" ? "unit" : "";
  const unitLabel = unit === "ft" ? "ft" : qty === 1 ? "unit" : "units";

  const add = () => {
    quoteList.add(item.code, qty);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 2200);
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: item.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared("Link copied");
    } catch {
      /* Share sheet dismissed, or clipboard blocked: say nothing went wrong
         only when something actually did. */
      if (!navigator.share) setShared("Copy the address bar to share");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShared(""), 2200);
  };

  const setQ = (n: number) => setQty(Math.max(1, Math.min(9999, Math.round(n) || 1)));

  return (
    <>
      {sizes.length > 1 && (
        <fieldset className="mt-7">
          <legend className="flex w-full items-baseline justify-between text-[0.875rem] font-semibold text-ink">
            Host pipe size
            <span className="text-[0.8125rem] font-normal text-body">
              {size ? `${size}″ selected` : "Optional, helps us quote"}
            </span>
          </legend>
          <div className="mt-2.5 grid grid-cols-4 gap-1.5 sm:grid-cols-7">
            {sizes.map((d) => {
              const on = d === size;
              return (
                <button
                  key={d}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setDiameter(on ? null : d)}
                  className={`datum h-11 justify-center rounded-xl border font-head text-[0.9375rem] font-bold transition-colors ${
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
      )}

      <div className="mt-6 flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="pdp-qty" className="text-[0.875rem] font-semibold text-ink">
            Quantity{unit === "ft" ? " (feet)" : ""}
          </label>
          <div className="mt-2 flex h-12 items-stretch overflow-hidden rounded-xl border border-line-strong bg-white">
            <button
              type="button"
              onClick={() => setQ(qty - 1)}
              disabled={qty <= 1}
              aria-label="One fewer"
              className="w-12 justify-center text-ink hover:bg-mist disabled:text-line-strong disabled:hover:bg-white"
            >
              <Minus className="size-4.5" aria-hidden />
            </button>
            <input
              id="pdp-qty"
              type="number"
              inputMode="numeric"
              min={1}
              max={9999}
              value={qty}
              onChange={(e) => setQ(Number(e.target.value))}
              className="datum w-16 border-x border-line text-center text-base font-semibold text-ink [appearance:textfield] focus:bg-mist [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => setQ(qty + 1)}
              aria-label="One more"
              className="w-12 justify-center text-ink hover:bg-mist"
            >
              <Plus className="size-4.5" aria-hidden />
            </button>
          </div>
        </div>
        {unit && (
          <p className="pb-3 text-[0.875rem] text-body">
            <span className="datum font-semibold text-ink">{qty}</span> {unitLabel}
            {item.uom === "per ft" && (
              <>
                {" "}&middot; about{" "}
                <span className="datum font-semibold text-ink">
                  ${(qty * Number(item.price.replace(/,/g, ""))).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>{" "}
                list
              </>
            )}
          </p>
        )}
      </div>

      <div className="mt-5 flex gap-2.5">
        <button
          type="button"
          onClick={add}
          className={`h-13 flex-1 justify-center gap-2 rounded-xl px-5 text-[1.0625rem] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(27,116,137,0.9)] transition-colors ${
            added ? "bg-cyan-deep" : "bg-cyan-dark hover:bg-cyan-deep"
          }`}
        >
          {added ? <Check className="size-5" aria-hidden /> : <Plus className="size-5" aria-hidden />}
          {added ? "Added to quote" : "Add to quote"}
        </button>
        <button
          type="button"
          onClick={() => quoteList.toggleSaved(item.code)}
          aria-pressed={saved}
          aria-label={`Save ${item.name}`}
          className={`size-13 shrink-0 justify-center rounded-xl border transition-colors ${
            saved ? "border-purple/40 bg-purple/5 text-purple" : "border-line-strong text-ink hover:text-purple"
          }`}
        >
          <Heart className={`size-5 ${saved ? "fill-current" : ""}`} aria-hidden />
        </button>
        <button
          type="button"
          onClick={share}
          aria-label={`Share ${item.name}`}
          className="size-13 shrink-0 justify-center rounded-xl border border-line-strong text-ink hover:text-cyan-dark"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="18" cy="5" r="2.5" />
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="19" r="2.5" />
            <path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" />
          </svg>
        </button>
      </div>

      <p role="status" aria-live="polite" className="mt-3 min-h-6 text-[0.875rem]">
        {shared ? (
          <span className="text-body">{shared}</span>
        ) : inList > 0 ? (
          <span className="flex flex-wrap items-center gap-x-2 text-ink">
            <QuoteBoard className="size-4.5 text-cyan-dark" aria-hidden />
            <span>
              <span className="datum font-semibold">{inList}</span> {unit === "ft" ? "ft" : inList === 1 ? "unit" : "units"} on your quote list.
            </span>
            <button
              type="button"
              onClick={() => quoteList.open()}
              className="font-semibold text-cyan-dark underline underline-offset-4 hover:text-cyan-deep"
            >
              View list
            </button>
          </span>
        ) : null}
      </p>

      {/* Phone: the same action, always in reach. It stands in for the
          homepage dock on this page, so it carries the dock's two
          utilities as well: accessibility must be reachable everywhere. */}
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-60 flex items-center gap-1 rounded-2xl bg-ink/94 p-1.5 shadow-[0_18px_40px_-14px_rgba(19,33,42,0.7)] ring-1 ring-white/10 backdrop-blur-xl lg:hidden"
      >
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent(OPEN_A11Y))}
          aria-label="Accessibility settings"
          className="w-11 shrink-0 justify-center rounded-xl text-white active:bg-white/15"
        >
          <Accessibility className="size-5.5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent(OPEN_CHAT))}
          aria-label="Ask a question"
          className="w-11 shrink-0 justify-center rounded-xl text-white active:bg-white/15"
        >
          <Chat className="size-5.5" aria-hidden />
        </button>
        <p className="min-w-0 flex-1 pl-1.5 leading-tight text-white">
          <span className="datum block truncate font-head text-[1rem] font-bold">${item.price}</span>
          <span className="block truncate text-[0.75rem] text-white/70">
            {inList > 0 ? `${inList} on list` : item.uom}
          </span>
        </p>
        <button
          type="button"
          onClick={add}
          className="h-12 shrink-0 justify-center gap-1.5 rounded-xl bg-cyan-dark px-3.5 font-semibold whitespace-nowrap text-white hover:bg-cyan-deep"
        >
          {added ? <Check className="size-4.5" aria-hidden /> : <Plus className="size-4.5" aria-hidden />}
          {added ? "Added" : <>Add<span className="max-[359px]:hidden">{qty > 1 ? ` ${qty}` : " to quote"}</span></>}
        </button>
      </nav>
    </>
  );
}
