"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "./icons";
import Reveal from "./Reveal";
import { usePipeSize } from "./PipeSize";

/*
 * Collections, as the bento row under the second desktop frame: one large
 * dark card that makes the claim, two photograph tiles that make it
 * concrete. Each tile filters the catalog to its shelf on the way down.
 */

const TILES = [
  {
    title: "MaxLiner® systems",
    note: "Drums, guns and wetout gear",
    img: "/img/drum-hero.webp",
    alt: "MAX LinerDrum inversion system on its wheeled cart",
    cat: "cipp-lining-systems",
  },
  {
    title: "Resins & accessories",
    note: "Epoxy, UV and the consumables",
    img: "/img/pouring-resin.webp",
    alt: "Resin being poured from a mixing pail during a wetout",
    cat: "cipp-materials",
  },
];

export default function Collections() {
  const { setCategory, setQuery } = usePipeSize();
  const pick = (cat: string | null) => {
    setCategory(cat);
    setQuery("");
  };

  return (
    <section id="collections" aria-labelledby="collections-title" className="bg-white">
      <div className="mx-auto max-w-[88rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-cyan-dark">Collections</p>
          <h2 id="collections-title" className="mt-2.5 text-[length:var(--text-h2)] text-ink">
            Everything one job needs, from one order.
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:gap-4 lg:mt-10 lg:grid-cols-[1.55fr_1fr_1fr] lg:gap-5">
          <Reveal>
            <Link
              href="/#spec-finder"
              onClick={() => pick(null)}
              className="group relative isolate flex min-h-[17rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-6 text-white sm:min-h-[19rem] lg:h-full lg:min-h-[22rem] lg:p-9"
            >
              <Image
                src="/img/liner-warehouse.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="-z-10 object-cover object-right transition-transform duration-[1.2s] ease-glide group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/10" aria-hidden />
              <span className="eyebrow text-cyan">Featured products</span>
              <span className="mt-3 block max-w-sm font-head text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.1] font-extrabold tracking-tight">
                Professional-grade materials for lasting results.
              </span>
              <span className="mt-3 block max-w-sm text-[0.9375rem] text-white/80">
                Liner, resin and the equipment to put them in, specced to work
                together and shipped as one order.
              </span>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold">
                Shop all products
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:contents">
            {TILES.map((t, i) => (
              <Reveal key={t.title} delay={0.06 * (i + 1)}>
                <Link
                  href="/#spec-finder"
                  onClick={() => pick(t.cat)}
                  className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-4 text-white sm:aspect-[4/3] sm:p-5 lg:aspect-auto lg:h-full lg:min-h-[22rem]"
                >
                  <Image
                    src={t.img}
                    alt={t.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 90vw"
                    className="-z-10 object-cover transition-transform duration-[1.2s] ease-glide group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" aria-hidden />
                  <span className="flex items-end justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block font-head text-[1rem] leading-tight font-bold [overflow-wrap:normal] sm:text-lg">
                        {t.title}
                      </span>
                      <span className="mt-1 hidden text-[0.8125rem] text-white/80 sm:block">{t.note}</span>
                    </span>
                    <span className="absolute top-3 right-3 flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors duration-300 group-hover:bg-white group-hover:text-ink sm:static sm:size-10">
                      <ArrowUpRight className="size-4.5" aria-hidden />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
