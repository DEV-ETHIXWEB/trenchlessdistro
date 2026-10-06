import Image from "next/image";
import { COLLECTIONS } from "@/data/catalog";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";

export default function Collections() {
  return (
    <section
      id="collections"
      aria-labelledby="collections-title"
      className="border-b border-line bg-white"
    >
      <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
        <Reveal>
          <p className="eyebrow text-cyan-dark">Collections</p>
          <h2 id="collections-title" className="mt-3 max-w-2xl text-[length:var(--text-h2)] text-ink">
            We are a full service supplier.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-body">
            Our staff has years of experience. We can help you build your CIPP
            division and create the most profitable position for your company.
          </p>
        </Reveal>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {COLLECTIONS.map((c, i) => (
            <Reveal as="li" key={c.name} delay={i * 0.08}>
              <a
                href="#quote"
                className="group flex h-full flex-col border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_-22px_rgba(14,26,34,0.45)]"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
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
        </ul>
      </div>
    </section>
  );
}
