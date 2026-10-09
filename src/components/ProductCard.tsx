"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { productHref } from "@/data/details";
import { CATEGORIES, type Item } from "@/data/catalog";
import * as Icons from "./icons";
import { Check, Heart, Minus, Plus, Trash } from "./icons";
import { quoteList, useQuoteList } from "@/lib/quoteList";

/*
 * One product, as the cards in Yash's references: a picture on a soft well,
 * the maker, the name, the size range and type, the price and the stock
 * state, and one obvious action.
 *
 * The action is "Add to quote", not "Add to cart". This catalog quotes; it
 * does not check out, and a cart button that ends in a phone call is the
 * kind of small lie contractors remember. The list it builds goes out with
 * the quote form.
 */

type GlyphName = keyof typeof Icons;
type GlyphCmp = (p: React.SVGProps<SVGSVGElement>) => React.ReactElement;

const range = (i: Item) => (i.minD === i.maxD ? `${i.minD}″` : `${i.minD}″–${i.maxD}″`);

const STOCK_DOT: Record<Item["stock"], string> = {
  "In stock": "bg-ok",
  "Low stock": "bg-amber-500",
  "Built to order": "bg-line-strong",
};

export function ProductArt({
  item,
  sizes,
  decorative,
}: {
  item: Item;
  sizes: string;
  /** Beside the product's own name, where alt text would only repeat it. */
  decorative?: boolean;
}) {
  /* A photo that fails to load (offline, a server hiccup) falls back to the
     drawn mark below, never to the browser's broken-image icon. */
  const [failed, setFailed] = useState(false);
  if (item.img && !failed) {
    return (
      <Image
        src={item.img}
        alt={decorative ? "" : item.name}
        fill
        sizes={sizes}
        onError={() => setFailed(true)}
        className="object-cover transition-transform duration-700 ease-glide group-hover:scale-[1.05]"
      />
    );
  }
  const glyph = CATEGORIES.find((c) => c.slug === item.cat)?.glyph ?? "PipeMark";
  const Glyph = Icons[glyph as GlyphName] as GlyphCmp;
  return (
    <span
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : `${item.name}, photograph coming soon`}
      aria-hidden={decorative || undefined}
      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-mist to-mist-2"
    >
      {/* Sized off the height alone, so the rings stay circles in any
          frame: square on a product page, 4:3 on a phone, 4:3.4 on a card. */}
      <span className="absolute aspect-square h-[70%] rounded-full border border-cyan-dark/10" />
      <span className="absolute aspect-square h-[46%] rounded-full border border-cyan-dark/15" />
      <Glyph className="glyph relative aspect-square h-[30%] w-auto" strokeWidth={1.1} />
      <span className="datum absolute bottom-2.5 text-[0.75rem] font-semibold tracking-wider text-body">
        {item.code}
      </span>
    </span>
  );
}

export default function ProductCard({
  item,
  view = "grid",
}: {
  item: Item;
  view?: "grid" | "list";
}) {
  const list = useQuoteList();
  const inList = list.items.find((i) => i.code === item.code)?.qty ?? 0;
  const saved = list.saved.includes(item.code);
  const [flash, setFlash] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const add = () => {
    quoteList.add(item.code);
    setFlash(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlash(false), 1600);
  };

  const saveBtn = (
    <button
      type="button"
      onClick={() => quoteList.toggleSaved(item.code)}
      aria-pressed={saved}
      aria-label={`Save ${item.name}`}
      className={`size-10 justify-center rounded-full bg-white/95 shadow-[var(--shadow-card)] backdrop-blur transition-[color,transform] duration-300 hover:scale-110 ${
        saved ? "text-purple" : "text-ink hover:text-purple"
      }`}
    >
      <Heart className={`size-[1.15rem] ${saved ? "fill-current" : ""}`} aria-hidden />
    </button>
  );

  /*
   * Before the product is on the list: one button. After: a stepper in the
   * same footprint, so the card never jumps. At a quantity of one the minus
   * becomes a bin, which is the remove a buyer reaches for, and the count
   * in the middle is a live region so a screen reader hears every change.
   */
  const addBtn = inList ? (
    <div className="@container flex h-11 w-full items-stretch overflow-hidden rounded-lg border border-cyan-dark bg-white">
      <button
        type="button"
        onClick={() => quoteList.setQty(item.code, inList - 1)}
        aria-label={inList === 1 ? `Remove ${item.name} from the quote` : `One fewer ${item.name}`}
        className="w-11 shrink-0 justify-center text-cyan-dark transition-colors hover:bg-cyan-dark/10"
      >
        {inList === 1 ? <Trash className="size-4.5" aria-hidden /> : <Minus className="size-4.5" aria-hidden />}
      </button>
      <span
        aria-live="polite"
        className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 overflow-hidden border-x border-cyan-dark/25 text-[0.875rem] font-semibold whitespace-nowrap text-cyan-dark transition-colors ${
          flash ? "bg-cyan-dark/10" : ""
        }`}
      >
        {/* The words give way on a narrow card (two-up on a phone, the list
            view): the number always stays, and screen readers always get
            the full phrase. */}
        <Check className="hidden size-4 shrink-0 @[9.5rem]:block" aria-hidden />
        <span className="datum">{inList}</span>
        <span className="sr-only @[12.5rem]:not-sr-only">{" "}in quote</span>
      </span>
      <button
        type="button"
        onClick={add}
        aria-label={`Add one more ${item.name}`}
        className="w-11 shrink-0 justify-center bg-cyan-dark text-white transition-colors hover:bg-cyan-deep"
      >
        <Plus className="size-4.5" aria-hidden />
      </button>
    </div>
  ) : (
    <button
      type="button"
      onClick={add}
      className="h-11 w-full justify-center gap-2 rounded-lg bg-cyan-dark px-3 text-[0.9375rem] font-semibold text-white transition-colors duration-300 hover:bg-cyan-deep"
    >
      <Plus className="size-4.5" aria-hidden />
      Add to quote
    </button>
  );

  const meta = (
    <>
      <p className="eyebrow text-[0.75rem] text-cyan-dark">{item.maker}</p>
      <h3 className="mt-1 text-[0.9375rem] leading-snug font-semibold tracking-normal [overflow-wrap:anywhere] text-ink lg:text-base">
        <Link href={productHref(item)} className="block rounded-sm hover:text-cyan-dark">
          {item.name}
        </Link>
      </h3>
      <p className="mt-1 text-[0.8125rem] text-body">
        <span className="datum">{range(item)}</span> &middot; {item.kind}
      </p>
    </>
  );

  const price = (
    <p className="flex flex-wrap items-baseline gap-x-1.5">
      <span className="datum font-head text-lg font-bold text-ink">${item.price}</span>
      <span className="text-[0.8125rem] text-body">{item.uom}</span>
    </p>
  );

  const stock = (
    <p className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-body">
      <span className={`size-2 rounded-full ${STOCK_DOT[item.stock]}`} aria-hidden />
      {item.stock}
    </p>
  );

  if (view === "list") {
    return (
      <article
        data-product-row
        className="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-line bg-white p-2.5 transition-shadow duration-500 hover:shadow-[var(--shadow-card)] sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:pr-4"
      >
        <div className="relative aspect-square overflow-hidden rounded-xl bg-mist">
          <ProductArt item={item} sizes="104px" />
          <Link href={productHref(item)} tabIndex={-1} aria-hidden className="absolute inset-0" />
        </div>
        <div className="min-w-0">
          {meta}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
            {price}
            {stock}
          </div>
        </div>
        <div className="col-span-2 flex items-center gap-2 sm:col-span-1 sm:w-48">
          {addBtn}
          {saveBtn}
        </div>
      </article>
    );
  }

  return (
    <article
      data-product-row
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-2 transition-[box-shadow,border-color] duration-300 ease-glide hover:border-line-strong hover:shadow-[var(--shadow-hover)] sm:p-2.5"
    >
      <div className="relative aspect-[4/3.4] overflow-hidden rounded-xl bg-mist">
        <ProductArt
          item={item}
          sizes="(min-width: 1536px) 20vw, (min-width: 1024px) 28vw, (min-width: 768px) 34vw, 60vw"
        />
        {/* The whole picture opens the product too; one tab stop per card
            is enough, so the keyboard goes to the name instead. */}
        <Link href={productHref(item)} tabIndex={-1} aria-hidden className="absolute inset-0" />
        {item.badge && (
          <span className="absolute top-2 left-2 max-w-[calc(100%-3.5rem)] truncate rounded-full bg-white/95 px-2 py-0.5 text-[0.6875rem] font-semibold sm:top-2.5 sm:left-2.5 sm:px-2.5 sm:py-1 sm:text-[0.75rem] text-cyan-dark shadow-[var(--shadow-card)] backdrop-blur">
            {item.badge}
          </span>
        )}
        <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2">{saveBtn}</span>
      </div>
      <div className="flex flex-1 flex-col px-1.5 pt-3 pb-1 sm:px-2">
        {meta}
        <div className="mt-auto pt-3">
          {price}
          <div className="mt-1">{stock}</div>
          <div className="mt-3">{addBtn}</div>
        </div>
      </div>
    </article>
  );
}
