import Link from "next/link";
import { ArrowRight, ArrowUpRight, HardHat, LinerRoll } from "./icons";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

/*
 * Two doors, because two very different people land here.
 *
 * A contractor who has pulled liner for ten years wants the catalog and
 * nothing else. Someone whose plumbing company is deciding whether to get
 * into CIPP at all needs the thing explained before any of the catalog means
 * anything. Serving only the first loses the second quietly; serving only
 * the second patronises the first. So: say which is which, and let people
 * pick.
 */
export default function TwoDoors() {
  return (
    <section
      id="two-doors"
      aria-labelledby="two-doors-title"
      className="border-b border-line bg-ink"
    >
      <div className="mx-auto max-w-[80rem] px-4 py-12 lg:px-6 lg:py-16">
        <SectionHead
          index="04"
          eyebrow="Where to start"
          titleId="two-doors-title"
          tone="dark"
          title="Two ways in. Pick the one that sounds like you."
        />
        <div className="mt-8 grid gap-px border border-white/15 bg-white/15 md:grid-cols-2">
          <Reveal className="bg-ink">
            <Link
              href="/new-to-cipp"
              className="group flex h-full flex-col justify-between gap-6 bg-ink p-6 transition-colors hover:bg-gray lg:p-8"
            >
              <div>
                <HardHat className="size-9 text-cyan transition-colors group-hover:text-purple" aria-hidden />
                <p className="eyebrow mt-5 text-white/75">New to CIPP</p>
                <h3 className="mt-2 text-[length:var(--text-h3)] text-white">
                  Thinking about adding lining to what you already do?
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/80">
                  What the work is, what it costs to start, and what a first
                  job needs. Ten minutes, no jargon.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 border-t border-white/20 pt-4 font-semibold text-cyan">
                Start here
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="bg-ink">
            <a
              href="#spec-finder"
              className="group flex h-full flex-col justify-between gap-6 bg-ink p-6 transition-colors hover:bg-gray lg:p-8"
            >
              <div>
                <LinerRoll className="size-9 text-cyan transition-colors group-hover:text-purple" aria-hidden />
                <p className="eyebrow mt-5 text-white/75">Already lining</p>
                <h3 className="mt-2 text-[length:var(--text-h3)] text-white">
                  Know the size and the job? Go straight to price and stock.
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/80">
                  Every line we carry, what it costs, and whether it is on the
                  shelf in Puyallup today.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 border-t border-white/20 pt-4 font-semibold text-cyan">
                Shop the catalog
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
