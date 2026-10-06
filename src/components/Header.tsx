"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Cross, Menu, Phone } from "./icons";

const SHOP = [
  { href: "#categories", label: "CIPP lining systems" },
  { href: "#categories", label: "CIPP UV lining systems" },
  { href: "#categories", label: "Robotics & milling" },
  { href: "#categories", label: "CIPP materials" },
  { href: "#categories", label: "CIPP patch repair" },
  { href: "#categories", label: "Inspection cameras" },
  { href: "#categories", label: "Accessories & parts" },
];

const NAV = [
  { href: "#most-searched", label: "Products" },
  { href: "#collections", label: "Collections" },
  { href: "#support", label: "Training & support" },
  { href: "#why-us", label: "About us" },
  { href: "#quote", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const still = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /*
   * Once the page has moved, the header tightens and lifts off the content.
   * Read inside rAF so a fast scroll cannot queue a layout read per event.
   */
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
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-500 ease-glide ${
        stuck ? "shadow-[0_6px_24px_-14px_rgba(0,0,0,0.5)]" : "shadow-none"
      }`}
    >
      {/* Utility bar. The distributor correction lives above the logo. */}
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-[80rem] items-center justify-between gap-4 px-4 py-2 lg:px-6">
          <p className="flex min-w-0 items-center text-[0.8125rem]">
            <span className="eyebrow shrink-0 text-cyan">Distributor</span>
            <span className="mx-2 hidden text-white/30 sm:inline">|</span>
            <span className="hidden truncate text-white/80 sm:inline">
              We supply contractors. We do not perform installations.
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-5 text-[0.8125rem]">
            <span className="hidden text-white/70 lg:inline">
              Mon&ndash;Fri 7:00&ndash;4:30 PT
            </span>
            <a
              href="tel:+12533685614"
              className="flex items-center gap-1.5 font-semibold hover:text-cyan"
            >
              <Phone className="size-4" aria-hidden />
              253-368-5614
            </a>
          </div>
        </div>
      </div>
      <div className="brand-rule h-[3px]" aria-hidden />

      <div className="border-b border-line">
        <div
          className={`mx-auto flex max-w-[80rem] items-center gap-6 px-4 transition-[padding] duration-500 ease-glide lg:px-6 ${
            stuck ? "py-1.5" : "py-3"
          }`}
        >
          <a href="#main" aria-label="Trenchless Distribution home" className="shrink-0">
            <Image
              src="/brand/td-logo.webp"
              alt="Trenchless Distribution"
              width={300}
              height={86}
              priority
              className={`w-auto transition-[height] duration-500 ease-glide ${
                stuck ? "h-11 lg:h-12" : "h-13 lg:h-15"
              }`}
            />
          </a>

          <nav aria-label="Main" className="ml-auto hidden items-center gap-6 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              <button
                type="button"
                aria-expanded={shopOpen}
                onClick={() => setShopOpen((v) => !v)}
                className="flex items-center gap-1.5 py-2 text-[0.9375rem] font-semibold text-ink hover:text-cyan-dark"
              >
                Shop
                <svg viewBox="0 0 10 6" className="size-2.5" aria-hidden>
                  <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
              <AnimatePresence>
                {shopOpen && (
                <motion.div
                  style={{ transformOrigin: "top left" }}
                  initial={still ? false : { opacity: 0, y: -6, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 w-72 border border-line bg-white py-2 shadow-lg"
                >
                  {SHOP.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setShopOpen(false)}
                      className="block px-4 py-2.5 text-[0.9375rem] text-body hover:bg-light hover:text-cyan-dark"
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="py-2 text-[0.9375rem] font-semibold text-ink hover:text-cyan-dark"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#quote"
              className="bg-cyan-dark px-5 py-2.5 text-[0.9375rem] font-semibold text-white transition-colors hover:bg-ink"
            >
              Request a quote
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="ml-auto text-ink lg:hidden"
          >
            <Menu className="size-7" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
        <motion.div
          initial={still ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-60 flex flex-col overflow-y-auto bg-white px-4 py-3 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <Image
              src="/brand/td-logo.webp"
              alt="Trenchless Distribution"
              width={300}
              height={86}
              className="h-13 w-auto lg:h-15"
            />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <Cross className="size-7 text-ink" />
            </button>
          </div>
          <nav aria-label="Main" className="mt-6 flex flex-col">
            <p className="eyebrow border-b border-line py-3 text-body">Shop</p>
            {SHOP.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 pl-3 text-body"
              >
                {item.label}
              </a>
            ))}
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 font-head text-lg font-semibold text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#quote"
            onClick={() => setOpen(false)}
            className="mt-6 bg-cyan-dark px-5 py-4 text-center font-semibold text-white"
          >
            Request a quote
          </a>
        </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
