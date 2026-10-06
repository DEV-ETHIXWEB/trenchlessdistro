import Image from "next/image";
import { SUPPORT } from "@/data/catalog";
import { ArrowRight, HardHat, PipeDiameter, Phone, Wrench } from "./icons";
import Reveal from "./Reveal";

const GLYPH = [HardHat, PipeDiameter, Phone, Wrench];

export default function Support() {
  return (
    <section id="support" aria-labelledby="support-title" className="border-b border-line bg-white">
      <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
          <Reveal>
            <p className="eyebrow text-cyan-dark">Training &amp; support</p>
            <h2 id="support-title" className="mt-3 text-[length:var(--text-h2)] text-ink">
              Service reps that help you expand your business beyond just a purchase.
            </h2>
            <p className="mt-4 text-lg text-body">
              Materials are the easy half. The training, the demo before the
              purchase, the call at 6am and the bench that gets a cutter running
              again are what keep crews with us.
            </p>
            <a
              href="#quote"
              className="group mt-6 inline-flex items-center gap-2 font-semibold text-cyan-dark hover:text-ink"
            >
              Book a demo or training
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>

            <figure className="mt-8 border border-line">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src="/img/training.webp"
                  alt="A Trenchless Distribution rep with a contractor at a product demonstration table"
                  fill
                  sizes="(min-width: 1024px) 22rem, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </Reveal>

          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {SUPPORT.map((pillar, i) => {
              const Glyph = GLYPH[i];
              return (
                <Reveal key={pillar.title} delay={i * 0.06} className="bg-white">
                  <div className="group h-full p-6">
                    <Glyph className="glyph size-9" aria-hidden />
                    <p className="eyebrow mt-5 text-body">{pillar.meta}</p>
                    <h3 className="mt-2 text-[length:var(--text-h3)] text-ink">{pillar.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">{pillar.body}</p>
                  </div>
                </Reveal>
              );
            })}
            <Reveal delay={0.24} className="bg-white sm:col-span-2">
              <figure className="relative aspect-21/9 w-full overflow-hidden">
                <Image
                  src="/img/equipment-lineup.webp"
                  alt="Trenchless Distribution equipment lineup: wetout unit, inversion drum, reels, liner and resin"
                  fill
                  sizes="(min-width: 1024px) 52rem, 100vw"
                  className="object-cover object-center"
                />
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
