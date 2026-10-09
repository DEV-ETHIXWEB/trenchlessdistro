import Image from "next/image";
import { COLLECTIONS } from "@/data/catalog";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";
import Rail from "./Rail";
import SectionHead from "./SectionHead";

export default function Collections() {
  return (
    <section
      id="collections"
      aria-labelledby="collections-title"
      className="border-b border-line bg-white"
    >
      <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
        <Reveal>
          <SectionHead
            index="07"
            eyebrow="Collections"
            titleId="collections-title"
            title="Everything one job needs, from one order."
          />
          <p className="mt-4 max-w-2xl text-lg text-body">
            Our staff has years of experience. We can help you build your CIPP
            division and create the most profitable position for your company.
          </p>
        </Reveal>

        {/* A rail on a phone. Three of these stacked ran to eight hundred
            pixels of identical bordered card; side by side they read as a
            shelf you can push. */}
        <Rail label="Collections" className="mt-10" desktop="md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {COLLECTIONS.map((c, i) => (
            <Reveal as="li" key={c.name} delay={i * 0.08} className="w-[82%] shrink-0 sm:w-[56%] md:w-auto">
              <a
                href="#quote"
                className="group flex h-full flex-col border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-22px_rgba(14,26,34,0.45)]"
              >
                <div className="relative aspect-4/3 overflow-hidden sm:aspect-16/10">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 82vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[length:var(--text-h3)] text-ink">{c.name}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">{c.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 border-t border-line pt-4 font-semibold text-cyan-dark">
                    {c.cta}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </Rail>
      </div>
    </section>
  );
}
