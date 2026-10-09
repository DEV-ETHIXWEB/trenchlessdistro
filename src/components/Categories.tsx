"use client";

import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/catalog";
import * as Icons from "./icons";
import { ArrowRight, ChevronRight } from "./icons";
import Reveal from "./Reveal";
import { RailArrows, RailDots, useRail } from "./useRail";
import { usePipeSize } from "./PipeSize";

/*
 * Shop by category, as the photo rail in Yash's mobile frame and the
 * catalog page's category strip: a picture of the thing, its name, and how
 * much of it there is.
 *
 * Two categories have no photograph in their library yet (robotics and
 * cameras). Rather than borrow a picture of something else, those cards
 * draw the product glyph large on the same well, so the row stays even and
 * nothing is mislabelled.
 */
type GlyphName = keyof typeof Icons;

export default function Categories() {
  const [railRef, rail] = useRail();
  const { setCategory, setQuery } = usePipeSize();

  return (
    <section id="categories" aria-labelledby="categories-title" className="bg-white">
      <div className="mx-auto max-w-[88rem] px-4 pt-10 pb-12 sm:px-6 lg:px-8 lg:pt-20 lg:pb-16">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-2xl">
            <p className="eyebrow text-cyan-dark">Shop by category</p>
            <h2 id="categories-title" className="mt-2.5 text-[length:var(--text-h2)] text-ink">
              Everything you need for trenchless rehabilitation.
            </h2>
            <p className="mt-3 text-body lg:text-[1.0625rem]">
              Find your line the way you order it, not the way we file it.
            </p>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/#spec-finder"
              className="group gap-2 font-semibold text-cyan-dark hover:text-cyan-deep"
            >
              View all products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <RailArrows label="categories" {...rail} className="hidden md:flex" />
          </div>
        </Reveal>

        <ul
          ref={railRef}
          aria-label="Product categories"
          tabIndex={0}
          className="no-scrollbar -mx-4 mt-7 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:mt-9 lg:scroll-px-0 lg:gap-5 lg:px-0 focus-visible:outline-offset-4"
        >
          {CATEGORIES.map((c, i) => {
            const Glyph = Icons[c.glyph as GlyphName] as (p: React.SVGProps<SVGSVGElement>) => React.ReactElement;
            return (
              <li
                key={c.slug}
                className="w-[44%] shrink-0 snap-start sm:w-[30%] lg:w-[calc((100%-3.75rem)/4)] xl:w-[calc((100%-5rem)/5)]"
              >
                <Reveal delay={Math.min(i, 4) * 0.05} className="h-full">
                  <Link
                    href="/#spec-finder"
                    onClick={() => {
                      setCategory(c.slug);
                      setQuery("");
                    }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[box-shadow,transform,border-color] duration-500 ease-glide hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
                  >
                    <span className="relative block aspect-[5/4] overflow-hidden bg-gradient-to-br from-mist to-mist-2">
                      {c.img ? (
                        <Image
                          src={c.img}
                          alt=""
                          fill
                          sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 23vw, 44vw"
                          className="object-cover transition-transform duration-700 ease-glide group-hover:scale-[1.06]"
                        />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="absolute size-[62%] rounded-full border border-cyan-dark/15" />
                          <span className="absolute size-[40%] rounded-full border border-cyan-dark/20" />
                          <Glyph className="glyph relative size-[34%]" strokeWidth={1.2} />
                        </span>
                      )}
                    </span>
                    <span className="flex flex-1 items-center justify-between gap-2 px-3.5 py-3 lg:px-4 lg:py-3.5">
                      <span className="min-w-0">
                        <span className="block text-[0.9375rem] leading-snug font-semibold text-ink lg:text-base">
                          {c.name}
                        </span>
                        <span className="mt-0.5 block text-[0.8125rem] text-body">
                          {c.count} products
                        </span>
                      </span>
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-mist text-ink transition-colors duration-300 group-hover:bg-cyan-dark group-hover:text-white">
                        <ChevronRight className="size-4" aria-hidden />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <RailDots page={rail.page} pages={rail.pages} className="mt-4 md:hidden" />
      </div>
    </section>
  );
}
