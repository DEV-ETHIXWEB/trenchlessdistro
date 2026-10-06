import Image from "next/image";
import { PATCH } from "@/data/catalog";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";

export default function PatchBand() {
  return (
    <section aria-labelledby="patch-title" className="border-b border-line bg-white">
      <div className="mx-auto grid max-w-[80rem] items-stretch gap-0 lg:grid-cols-2">
        <Reveal className="order-2 flex items-center px-4 py-12 lg:order-1 lg:px-6 lg:py-20">
          <div className="max-w-lg">
            <p className="eyebrow text-cyan-dark">{PATCH.eyebrow}</p>
            <h2 id="patch-title" className="mt-3 text-[length:var(--text-h2)] text-ink">
              {PATCH.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-body">{PATCH.body}</p>
            <a
              href="#quote"
              className="group mt-7 inline-flex items-center gap-2 bg-cyan-dark px-6 py-3.5 font-semibold text-white transition-colors hover:bg-cyan-deep"
            >
              {PATCH.cta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="order-1 lg:order-2">
          <div className="relative h-64 w-full lg:h-full lg:min-h-[26rem]">
            <Image
              src={PATCH.img}
              alt={PATCH.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
