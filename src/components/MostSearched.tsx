import Image from "next/image";
import { FEATURED } from "@/data/catalog";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";

export default function MostSearched() {
  return (
    <section
      id="most-searched"
      aria-labelledby="most-searched-title"
      className="border-b border-line bg-light"
    >
      <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-cyan-dark">Most searched</p>
            <h2 id="most-searched-title" className="mt-3 text-[length:var(--text-h2)] text-ink">
              Tested and vetted to work as hard as you do.
            </h2>
          </div>
          <a
            href="#quote"
            className="group inline-flex items-center gap-2 font-semibold text-cyan-dark hover:text-ink"
          >
            Discover the collection
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {FEATURED.map((product, i) => (
            <Reveal as="li" key={product.name} delay={(i % 5) * 0.04}>
              <a
                href="#quote"
                className="group flex h-full flex-col border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan-dark hover:shadow-[0_14px_34px_-18px_rgba(14,26,34,0.4)]"
              >
                <div className="relative aspect-square overflow-hidden bg-white">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 20vw, 50vw"
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="flex flex-1 flex-col border-t border-line p-4">
                  <p className="eyebrow text-body">{product.maker}</p>
                  <h3 className="mt-2 text-[0.9375rem] leading-snug font-semibold text-ink group-hover:text-cyan-dark">
                    {product.name}
                  </h3>
                  <p className="datum mt-auto pt-3 text-[0.8125rem] text-body">{product.spec}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
