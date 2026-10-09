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

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Cross, Menu, Phone, QuoteBoard, Search } from "./icons";
import HeaderSearch from "./HeaderSearch";
import { CATEGORIES } from "@/data/catalog";
import { countOf, quoteList, useQuoteList } from "@/lib/quoteList";
import { usePipeSize } from "./PipeSize";

const NAV = [
  { href: "/#spec-finder", label: "Products" },
  { href: "/new-to-cipp", label: "New to CIPP" },
  { href: "/#collections", label: "Collections", wide: true },
  { href: "/#support", label: "Training" },
  { href: "/#why-us", label: "About", wide: true },
  { href: "/#quote", label: "Contact" },
];

/** The quote list button with its count. Used in both header rows. */
function QuoteButton() {
  const list = useQuoteList();
  const n = countOf(list);
  return (
    <button
      type="button"
      onClick={() => quoteList.open()}
      aria-label={n ? `Quote list, ${n} ${n === 1 ? "item" : "items"}` : "Quote list, empty"}
      className="relative shrink-0 justify-center rounded-full px-2.5 text-ink hover:bg-mist hover:text-cyan-dark"
    >
      <QuoteBoard className="size-6" aria-hidden />
      <span
        aria-hidden
        className={`datum absolute top-1 right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[0.6875rem] leading-none font-bold transition-transform duration-300 ease-press ${
          n ? "scale-100 bg-cyan-dark text-white" : "scale-90 bg-ink text-white"
        }`}
      >
        {n}
      </span>
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  /* Phone only: the search row folds away once the page moves, and the
     search icon brings it back on demand. */
  const [searchOpen, setSearchOpen] = useState(false);
  const still = useReducedMotion();
  const { setCategory, setQuery } = usePipeSize();
  const pickCategory = (slug: string | null) => {
    setCategory(slug);
    setQuery("");
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Escape closes whichever layer is up: the menu, the search drop-down or
     the shop panel. */
  useEffect(() => {
    if (!open && !searchOpen && !shopOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setSearchOpen(false);
      setShopOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, searchOpen, shopOpen]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setStuck(window.scrollY > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b bg-white/92 backdrop-blur-xl transition-[box-shadow,border-color] duration-500 ease-glide ${
        stuck
          ? "border-line shadow-[0_10px_30px_-18px_rgba(19,33,42,0.35)]"
          : "border-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[88rem] items-center gap-1 px-2 min-[360px]:gap-2 transition-[padding] duration-500 ease-glide sm:px-6 lg:gap-6 lg:px-8 ${
          stuck ? "py-1.5 lg:py-2" : "py-2 lg:py-3.5"
        }`}
      >
        {/* Phone: menu on the left, logo centred, tools on the right. */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="-ml-1 shrink-0 justify-center rounded-full px-2 text-ink hover:bg-mist lg:hidden"
        >
          <Menu className="size-6.5" />
        </button>

        <Link
          href="/#main"
          aria-label="Trenchless Distribution home"
          className="mx-auto min-w-0 shrink lg:mx-0 lg:shrink-0"
        >
          <Image
            src="/brand/td-logo.webp"
            alt="Trenchless Distribution"
            width={300}
            height={86}
            priority
            className={`w-auto max-w-full object-contain transition-[height] duration-500 ease-glide ${
              stuck ? "h-9 lg:h-11" : "h-10 lg:h-13"
            }`}
          />
        </Link>

        {/* Desktop: search pill, then the nav, then the actions. */}
        <div className="hidden min-w-0 flex-1 xl:block xl:max-w-[22rem] 2xl:max-w-[26rem]">
          <HeaderSearch variant="pill" />
        </div>

        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              type="button"
              aria-expanded={shopOpen}
              onClick={() => setShopOpen((v) => !v)}
              className="gap-1 rounded-lg px-2.5 text-[0.9375rem] font-medium whitespace-nowrap text-ink hover:bg-mist hover:text-cyan-dark"
            >
              Shop
              <ChevronDown
                className={`size-4 transition-transform duration-300 ${shopOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <AnimatePresence>
              {shopOpen && (
                <motion.div
                  style={{ transformOrigin: "top left" }}
                  initial={still ? false : { opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 z-10 w-[34rem] pt-2"
                >
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-line bg-white p-2 shadow-[var(--shadow-lift)]">
                    {CATEGORIES.map((c) => (
                      <Link
                        key={c.slug}
                        href="/#spec-finder"
                        onClick={() => {
                          setShopOpen(false);
                          pickCategory(c.slug);
                        }}
                        className="flex-col items-start rounded-xl px-3.5 py-2.5 hover:bg-mist"
                      >
                        <span className="text-[0.9375rem] font-semibold text-ink">{c.name}</span>
                        <span className="text-[0.8125rem] text-body">
                          {c.count} products &middot; {c.span}
                        </span>
                      </Link>
                    ))}
                    <Link
                      href="/#spec-finder"
                      onClick={() => {
                        setShopOpen(false);
                        pickCategory(null);
                      }}
                      className="group justify-between gap-2 rounded-xl bg-cyan-dark px-3.5 py-2.5 font-semibold text-white hover:bg-cyan-deep"
                    >
                      Browse the full catalog
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-lg px-2.5 text-[0.9375rem] font-medium whitespace-nowrap text-ink hover:bg-mist hover:text-cyan-dark ${
                item.wide ? "hidden 2xl:inline-flex" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-0.5 min-[360px]:gap-1 lg:gap-3">
          <a
            href="tel:+12533685614"
            className="hidden items-center gap-2 rounded-lg px-2 font-semibold whitespace-nowrap text-cyan-dark hover:text-cyan-deep 2xl:inline-flex"
          >
            <Phone className="size-4.5" aria-hidden />
            <span className="datum">253-368-5614</span>
          </a>
          {/* Phone tools. */}
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
            className="shrink-0 justify-center rounded-full px-2 text-ink hover:bg-mist lg:hidden"
          >
            <Search className="size-6" aria-hidden />
          </button>
          <a
            href="tel:+12533685614"
            aria-label="Call 253-368-5614"
            className="hidden shrink-0 justify-center rounded-full px-2 text-cyan-dark hover:bg-mist min-[360px]:inline-flex lg:hidden"
          >
            <Phone className="size-6" aria-hidden />
          </a>
          <Link
            href="/#quote"
            className="hidden rounded-xl bg-cyan-dark px-5 text-[0.9375rem] font-semibold whitespace-nowrap text-white shadow-[0_8px_20px_-12px_rgba(27,116,137,0.9)] hover:bg-cyan-deep lg:inline-flex"
          >
            Request a quote
          </Link>
          <QuoteButton />
        </div>
      </div>

      {/* The search icon's drop-down, once the in-page search row below
          has scrolled away. */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={still ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full border-b border-line bg-white px-3 py-2.5 shadow-[0_14px_30px_-20px_rgba(19,33,42,0.5)] sm:px-6 lg:hidden"
          >
            <HeaderSearch variant="pill" autoFocus onPick={() => setSearchOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={still ? false : { opacity: 0, x: "-6%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-4%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-60 flex h-dvh flex-col overflow-y-auto bg-white px-4 pt-3 pb-8 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Image
                src="/brand/td-logo.webp"
                alt="Trenchless Distribution"
                width={300}
                height={86}
                className="h-10 w-auto"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="justify-center rounded-full px-2 hover:bg-mist"
              >
                <Cross className="size-6.5 text-ink" />
              </button>
            </div>
            <div className="mt-5">
              <HeaderSearch variant="pill" onPick={() => setOpen(false)} />
            </div>

            <nav aria-label="Main" className="mt-6">
              <p className="eyebrow text-cyan-dark">Shop by category</p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href="/#spec-finder"
                      onClick={() => {
                        setOpen(false);
                        pickCategory(c.slug);
                      }}
                      className="flex h-full flex-col items-start justify-between rounded-xl bg-mist px-3.5 py-3"
                    >
                      <span className="text-[0.9375rem] leading-snug font-semibold text-ink">
                        {c.name}
                      </span>
                      <span className="mt-1 text-[0.8125rem] text-body">{c.count} products</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 border-t border-line">
                {NAV.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="w-full justify-between border-b border-line py-3.5 font-head text-lg font-semibold text-ink"
                    >
                      {item.label}
                      <ArrowRight className="size-4.5 text-body" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 grid gap-3">
              <Link
                href="/#quote"
                onClick={() => setOpen(false)}
                className="justify-center rounded-xl bg-cyan-dark px-5 py-3.5 font-semibold text-white"
              >
                Request a quote
              </Link>
              <a
                href="tel:+12533685614"
                className="justify-center gap-2 rounded-xl border border-line-strong px-5 py-3.5 font-semibold text-ink"
              >
                <Phone className="size-4.5 text-cyan-dark" aria-hidden />
                253-368-5614
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    {/* The search row the team asked for at the top of the phone view, and
        the desktop pill's home between lg and xl where the bar has no room
        for it. In the page flow rather than the sticky bar, so it scrolls
        away with the hero instead of resizing the header mid-scroll. */}
    <div className="border-b border-line bg-white px-3 pt-1 pb-3 sm:px-6 lg:px-8 lg:pt-0 xl:hidden">
      <div className="mx-auto max-w-[88rem]">
        <HeaderSearch variant="pill" />
      </div>
    </div>
    </>
  );
}
