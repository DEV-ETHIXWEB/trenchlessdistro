import BackgroundVideo from "./BackgroundVideo";
import Link from "next/link";
import { ArrowRight, Cog, Freight, Headset, ShieldCheck } from "./icons";
import Reveal from "./Reveal";

/*
 * Why buy here, as the "Built for contractors" row in Yash's first desktop
 * frame: a dark photograph card that says it in one line, beside four
 * reasons that each fit on a glance. Every reason is a fact about how this
 * business works, not an adjective about it.
 */

const REASONS = [
  {
    Icon: Freight,
    title: "Fast shipping",
    body: "Stocked lines leave Puyallup the day you order them.",
  },
  {
    Icon: ShieldCheck,
    title: "Trusted brands",
    body: "MaxLiner, Brawo, IMS and Apex, each run on real pipe first.",
  },
  {
    Icon: Headset,
    title: "Expert support",
    body: "Your rep has pulled liner. Ask a cure question, get an answer.",
  },
  {
    Icon: Cog,
    title: "Contractor focused",
    body: "We sell to contractors only, so we never bid your work.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-us-title" className="bg-white">
      <div className="mx-auto max-w-[88rem] px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-5">
          <Reveal className="h-full">
            <div className="relative isolate flex h-full min-h-[14rem] flex-col justify-center overflow-hidden rounded-3xl bg-ink p-6 pr-16 sm:p-8 sm:pr-16 lg:min-h-[15rem] lg:p-10 lg:pr-16">
              <div className="absolute inset-0 -z-10">
                <BackgroundVideo
                  src="/video/pallet-jack.mp4"
                  poster="/video/pallet-jack-poster.jpg"
                  scrimClassName="bg-gradient-to-r from-ink via-ink/85 to-ink/20"
                  controlClassName="absolute top-4 right-4 z-20"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
              <p className="eyebrow text-cyan">Built for contractors</p>
              <h2
                id="why-us-title"
                className="mt-3 max-w-xs font-head text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.1] font-extrabold text-white"
              >
                The right products. When you need them.
              </h2>
              <Link
                href="/#support"
                className="group mt-6 w-fit gap-2 rounded-full border border-white/50 px-5 text-[0.9375rem] font-semibold text-white hover:border-white hover:bg-white hover:text-ink"
              >
                How we work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <ul className="grid h-full grid-cols-2 rounded-3xl bg-mist p-2 sm:p-3 lg:grid-cols-4 lg:p-4">
              {REASONS.map(({ Icon, title, body }, i) => (
                <li
                  key={title}
                  className={`group flex flex-col gap-3 p-4 lg:px-5 lg:py-6 ${
                    i % 2 === 1 ? "border-l border-line" : ""
                  } ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
                >
                  <Icon className="glyph size-8" strokeWidth={1.4} aria-hidden />
                  <div>
                    <h3 className="text-[0.9375rem] font-bold tracking-normal text-ink lg:text-base">{title}</h3>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-body lg:text-[0.875rem]">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
