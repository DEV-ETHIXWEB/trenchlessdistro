"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "./icons";
import Reveal from "./Reveal";
import { RailArrows, RailDots, useRail } from "./useRail";
import { usePipeSize } from "./PipeSize";
import type { Application } from "@/data/catalog";

/*
 * Who it is for, after the "Built for every way of flying" rail in the
 * references: a short claim on the left, a rail of photograph cards on the
 * right, each tagged with what that kind of crew actually buys.
 *
 * The first card is still the door the team asked for: anyone new to CIPP
 * goes to the explainer page rather than being dropped into a catalog of
 * part codes. The rest set the catalog's application filter on the way
 * down, so a mainline crew lands on mainline lines.
 */

const DOORS: {
  title: string;
  img: string;
  alt: string;
  tags: string[];
  href: string;
  app?: Application;
}[] = [
  {
    title: "New to CIPP",
    img: "/img/training.webp",
    alt: "A Trenchless Distribution rep shaking hands with a contractor at a training day",
    tags: ["Training", "Starter kits", "Financing"],
    href: "/new-to-cipp",
  },
  {
    title: "Lateral crews",
    img: "/img/flexliner.webp",
    alt: "The cuff of a flexible felt liner tube",
    tags: ["2″–8″", "Ambient & UV", "Multi-bend"],
    href: "/#spec-finder",
    app: "lateral",
  },
  {
    title: "Mainline & municipal",
    img: "/img/uv-cure.webp",
    alt: "A UV LED cure train glowing blue inside a section of host pipe",
    tags: ["6″–12″", "UV LED", "Steam"],
    href: "/#spec-finder",
    app: "mainline",
  },
  {
    title: "Point repair",
    img: "/img/point-repair-bg.webp",
    alt: "A reinforced sectional liner laid out flat before wetout",
    tags: ["Sectional", "Packers", "Same-day kits"],
    href: "/#spec-finder",
    app: "point-repair",
  },
  {
    title: "Cutting & reinstatement",
    img: "/img/equipment-lineup.webp",
    alt: "Lining, curing and robotic equipment lined up in front of the Trenchless Distribution sign",
    tags: ["Robotic cutters", "Descaling", "Repair bench"],
    href: "/#spec-finder",
    app: "prep",
  },
];

export default function TwoDoors() {
  const [railRef, rail] = useRail();
  const { setApplication, setQuery, setCategory } = usePipeSize();

  return (
    <section id="two-doors" aria-labelledby="two-doors-title" className="overflow-hidden bg-mist">
      <div className="mx-auto grid max-w-[88rem] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-12 lg:px-8 lg:py-20">
        <Reveal className="flex flex-col">
          <p className="eyebrow text-cyan-dark">
            Who it&rsquo;s for
          </p>
          <h2 id="two-doors-title" className="mt-2.5 text-[clamp(1.9rem,3.2vw,2.9rem)] leading-[1.05] font-bold text-ink">
            Built for every way of lining.
          </h2>
          <p className="mt-4 text-body">
            Whether you are <strong className="font-semibold text-ink">pricing your first lateral</strong>,
            running a <strong className="font-semibold text-ink">municipal mainline crew</strong> or
            keeping cutters turning, start with the shelf that fits the work.
          </p>
          <RailArrows label="crews" {...rail} className="mt-8 hidden lg:flex" />
        </Reveal>

        <div className="min-w-0">
          <ul
            ref={railRef}
            aria-label="Who we supply"
            tabIndex={0}
            className="no-scrollbar -mx-4 -mt-6 -mb-12 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overflow-y-hidden px-4 pt-6 pb-12 sm:-mx-6 sm:scroll-px-6 sm:gap-4 sm:px-6 lg:-mx-6 lg:scroll-px-6 lg:px-6"
          >
            {DOORS.map((d, i) => (
              <li key={d.title} className="w-[76%] shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-2rem)/2.4)] xl:w-[calc((100%-2rem)/3)]">
                <Reveal delay={Math.min(i, 3) * 0.06} className="h-full">
                  <Link
                    href={d.href}
                    onClick={() => {
                      if (!d.app) return;
                      setApplication(d.app);
                      setCategory(null);
                      setQuery("");
                    }}
                    className="group flex h-full flex-col rounded-3xl bg-white p-2 transition-shadow duration-300 hover:shadow-[var(--shadow-hover)]"
                  >
                    <span className="relative block aspect-[5/4] overflow-hidden rounded-2xl bg-ink">
                      <Image
                        src={d.img}
                        alt={d.alt}
                        fill
                        sizes="(min-width: 1280px) 28vw, (min-width: 640px) 50vw, 90vw"
                        className="object-cover transition-transform duration-[1.2s] ease-glide group-hover:scale-[1.06]"
                      />
                      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" aria-hidden />
                      <span className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5">
                        {d.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/45 bg-white/10 px-2.5 py-1 text-[0.75rem] font-medium text-white backdrop-blur-md"
                          >
                            {t}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span className="flex items-center justify-between gap-3 px-3 py-3.5">
                      <span className="font-head text-[1.0625rem] font-bold text-ink">{d.title}</span>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 group-hover:border-cyan-dark group-hover:bg-cyan-dark group-hover:text-white">
                        <ArrowUpRight className="size-4.5" aria-hidden />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
          <RailDots page={rail.page} pages={rail.pages} className="relative mt-4 lg:hidden" />
        </div>
      </div>
    </section>
  );
}
