import { CATEGORIES } from "@/data/catalog";
import {
  ArrowRight,
  LinerRoll,
  PatchRepair,
  PushCamera,
  ResinPail,
  RoboticCutter,
  UvCure,
  Wrench,
} from "./icons";
import Reveal from "./Reveal";

const GLYPH: Record<string, typeof LinerRoll> = {
  "cipp-lining-systems": LinerRoll,
  "cipp-uv-lining-systems": UvCure,
  "robotics-milling": RoboticCutter,
  "cipp-materials": ResinPail,
  "cipp-patch-repair": PatchRepair,
  "inspection-cameras": PushCamera,
  "accessories-parts": Wrench,
};

export default function Categories() {
  return (
    <section id="categories" aria-labelledby="categories-title" className="border-b border-line bg-white">
      <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-cyan-dark">Shop by category</p>
            <h2 id="categories-title" className="mt-3 text-[length:var(--text-h2)] text-ink">
              Seven lines, organized the way you order.
            </h2>
          </div>
          <a
            href="#quote"
            className="group inline-flex items-center gap-2 font-semibold text-cyan-dark hover:text-ink"
          >
            View all products
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => {
            const Glyph = GLYPH[cat.slug];
            return (
              <Reveal as="li" key={cat.slug} delay={i * 0.04}>
                <a
                  href="#quote"
                  className="group flex h-full flex-col border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-dark hover:shadow-[0_14px_34px_-18px_rgba(14,26,34,0.4)]"
                >
                  <Glyph className="glyph size-9" aria-hidden />
                  <h3 className="mt-5 text-[length:var(--text-h3)] text-ink">{cat.name}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-snug text-body">{cat.blurb}</p>
                  <p className="datum mt-4 flex items-center gap-2 border-t border-line pt-3 text-[0.8125rem] text-body">
                    <span className="font-semibold text-ink">{cat.count}</span> products
                    <span className="text-line">|</span>
                    <span>{cat.span}</span>
                  </p>
                </a>
              </Reveal>
            );
          })}

          <Reveal as="li" delay={0.28}>
            <a
              href="tel:+12533685614"
              className="group flex h-full flex-col justify-between bg-cyan-dark p-5 text-white transition-colors hover:bg-cyan-deep"
            >
              <h3 className="text-[length:var(--text-h3)] text-white">
                Need something not listed?
              </h3>
              <div>
                <p className="mt-3 text-[0.9375rem] leading-snug text-white/90">
                  We source across the trenchless supply chain. Send us the spec.
                </p>
                <span className="mt-4 inline-flex items-center gap-2 border-t border-white/30 pt-3 font-semibold text-white">
                  Call 253-368-5614
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
