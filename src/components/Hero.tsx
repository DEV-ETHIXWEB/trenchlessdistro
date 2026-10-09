import BackgroundVideo from "./BackgroundVideo";
import Link from "next/link";
import { ArrowRight, Check, Phone, PipeMark } from "./icons";
import { MANUFACTURERS } from "@/data/catalog";
import CountUp from "./CountUp";

/*
 * The hero, after Yash's references.
 *
 * Desktop is the split layout from the "Get it fast" frame: copy on a cool
 * off-white left, the yard photograph bleeding in from the right behind a
 * soft fade, and the one handwritten line set as real type over the sky so
 * it stays sharp, selectable and translatable. Two proof chips float on the
 * photograph the way the reference's stat cards do.
 *
 * A phone gets the mobile frame instead: the same photograph full-bleed
 * behind a deep scrim with the copy reversed out in white, and the section
 * below rising over its bottom edge on a rounded sheet. One element serves
 * both, so a phone downloads one image, not two.
 *
 * The headline is the problem-first line from the team review. The
 * distributor correction stays in the hero, where nobody can scroll past it.
 */

/*
 * The figures, set like a spec plate: what it is, the number, and one line
 * of substance. No icons and no ornament. The brands themselves are named
 * in the ticker directly below, so the band does not repeat them.
 */
const STATS: { kicker: string; to?: number; value?: string; suffix?: string; note: string }[] = [
  { kicker: "Experience", to: 35, suffix: "+", note: "years in trenchless" },
  { kicker: "On the shelf", to: 400, suffix: "+", note: "product lines stocked in Puyallup" },
  { kicker: "Pipe range", value: "2″–12″", note: "laterals, stacks and mains" },
  { kicker: "Manufacturers", to: MANUFACTURERS.length, note: "authorized lines, parts and repair in-house" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink lg:bg-mist"
    >
      {/* The photograph. Full bleed under a scrim on a phone; the right
          58% with a fade into the page on desktop. */}
      <div className="absolute inset-0 -z-10 lg:left-[40%]">
        {/* The warehouse loop. The poster paints first; the file is only
            fetched when motion is allowed and the connection is not
            metered, and it pauses when scrolled away. */}
        <BackgroundVideo
          src="/video/warehouse-aisle.mp4"
          poster="/video/warehouse-aisle-poster.jpg"
          priority
          scrimClassName="hero-video-scrim"
          controlClassName="absolute top-2.5 right-3 z-20 lg:top-5 lg:right-6"
          sizes="(min-width: 1024px) 60vw, 200vw"
        />
        <div
          className="absolute inset-y-0 left-0 hidden w-[42%] bg-gradient-to-r from-mist via-mist/80 to-transparent lg:block"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-t from-mist/70 to-transparent lg:block"
          aria-hidden
        />
      </div>

      {/* Handwritten line straight on the footage, no card: a layered soft
          shadow carries it over the bright roof lights. Desktop only: on a
          phone it would sit on the busiest part of the frame. */}
      <p
        aria-hidden
        className="hero-script pointer-events-none absolute top-[13%] right-[22%] hidden -rotate-3 font-script text-[1.9rem] leading-[1.05] text-white [text-shadow:0_1px_2px_rgba(10,20,26,0.7),0_2px_14px_rgba(10,20,26,0.75),0_0_32px_rgba(10,20,26,0.55)] lg:block xl:text-[2.15rem]"
      >
        Quality materials.
        <br />
        <span className="pl-3">Trusted brands.</span>
        <br />
        <span className="pl-6">Real support.</span>
        <svg viewBox="0 0 120 10" className="mt-2 ml-8 h-2.5 w-24 text-cyan" aria-hidden>
          <path
            d="M2 7c30-5 70-6 116-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            className="hero-underline"
          />
        </svg>
      </p>

      {/* The chips are positioned against this box, not the section, so the
          stats band below can change height without moving them. */}
      <div className="relative">
      <div className="pointer-events-none mx-auto grid max-w-[88rem] px-4 pt-[4.25rem] pb-20 sm:px-6 lg:min-h-[34rem] lg:grid-cols-[minmax(0,34rem)_1fr] lg:items-center lg:px-8 lg:pt-16 lg:pb-16 xl:min-h-[38rem]">
        <div className="hero-copy pointer-events-auto">
          {/* The house mark, not a badge: the pipe in cross section that
              runs through their identity, a stencilled trade name, and
              where the stock actually sits. */}
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="eyebrow flex items-center gap-2.5 text-[0.8125rem] tracking-[0.16em] text-white lg:text-ink">
              <PipeMark className="hero-mark size-6 shrink-0 text-cyan lg:text-cyan-dark" strokeWidth={1.5} aria-hidden />
              Trenchless distributor
            </span>
            <span className="hero-rule hidden h-px w-12 bg-cyan sm:block lg:bg-cyan-dark" aria-hidden />
            <span className="hidden text-[0.875rem] font-medium text-white/80 sm:inline lg:text-body">Puyallup, WA</span>
          </p>

          <h1
            id="hero-title"
            className="mt-5 text-[length:var(--text-h1)] leading-[1.04] font-extrabold tracking-[-0.035em] text-white lg:text-ink"
          >
            Fix the pipe without{" "}
            <span className="text-cyan lg:text-cyan-dark">digging up</span> the
            job.
          </h1>

          <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-white/85 lg:text-body">
            Liners, resin, UV curing, robotics and cameras, on the shelf in
            Puyallup with the training and the repair bench behind them. Quote
            the same day, shipped nationwide.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href="/#spec-finder"
              className="group justify-center gap-2.5 rounded-xl bg-cyan-dark px-6 py-3.5 font-semibold text-white shadow-[0_10px_24px_-12px_rgba(27,116,137,0.9)] hover:bg-cyan-deep"
            >
              Shop the catalog
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <a
              href="tel:+12533685614"
              className="group justify-center gap-3 rounded-xl border border-white/40 px-5 py-3 text-white hover:border-white hover:bg-white/10 sm:justify-start lg:border-transparent lg:px-1 lg:text-ink lg:hover:border-transparent lg:hover:bg-transparent"
            >
              <span className="flex size-10 items-center justify-center rounded-full lg:bg-white lg:shadow-[var(--shadow-card)]">
                <Phone className="size-4.5 text-cyan lg:text-cyan-dark" aria-hidden />
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span className="datum font-head text-lg font-bold">253-368-5614</span>
                <span className="text-[0.8125rem] text-white/75 lg:text-body">
                  Speak with our team
                </span>
              </span>
            </a>
          </div>

          <p className="mt-7 flex max-w-lg items-start gap-2.5 text-[0.9375rem] text-white/85 lg:text-body">
            <Check className="mt-0.5 size-4.5 shrink-0 text-cyan lg:text-cyan-dark" aria-hidden />
            <span>
              <strong className="font-semibold text-white lg:text-ink">
                We supply the contractors who do the work.
              </strong>{" "}
              We do not perform installations.
            </span>
          </p>
        </div>

      </div>

        {/* Proof chips on the photograph, desktop only. */}
        <div className="pointer-events-none absolute inset-0 mx-auto hidden max-w-[88rem] lg:block" aria-hidden>
          <div className="hero-chip absolute bottom-[19%] left-[50%] flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[var(--shadow-lift)] backdrop-blur">
            <span className="flex size-9 items-center justify-center rounded-full bg-ok/12 text-ok">
              <span className="size-2.5 rounded-full bg-ok" />
            </span>
            <span className="leading-tight">
              <span className="block font-head text-[0.9375rem] font-bold text-ink">In stock today</span>
              <span className="text-[0.8125rem] text-body">Will call or freight</span>
            </span>
          </div>
          <div className="hero-chip hero-chip-late absolute top-[46%] right-[4%] flex items-center gap-3 rounded-2xl bg-cyan-dark px-4 py-3 text-white shadow-[var(--shadow-lift)]">
            <span className="font-head text-2xl font-extrabold">Same day</span>
            <span className="text-[0.8125rem] leading-tight font-medium text-white">
              quotes,
              <br />
              every weekday
            </span>
          </div>
        </div>

      </div>

      {/* The figures. On a phone, the white sheet that rises over the
          bottom of the photograph; on desktop, a white band under a fine
          rule, the same paper as the sections that follow. */}
      <div className="relative -mt-8 rounded-t-[1.75rem] bg-white lg:mt-0 lg:rounded-none lg:border-t lg:border-line">
        <dl className="mx-auto grid max-w-[88rem] grid-cols-2 px-2 pt-3 sm:px-4 lg:grid-cols-[1fr_1fr_1fr_1.35fr] lg:px-8 lg:pt-0">
          {STATS.map((s, i) => (
            <div
              key={s.kicker}
              className={`flex flex-col px-3 py-4 lg:px-7 lg:py-9 ${i === 0 ? "lg:pl-0" : ""} ${
                i % 2 === 1 ? "border-l border-line" : ""
              } ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="order-1 text-[0.75rem] font-semibold tracking-[0.16em] text-cyan-dark uppercase">
                {s.kicker}
              </dt>
              <dd className="order-2 mt-2 font-head text-[1.75rem] leading-none font-extrabold tracking-tight text-ink lg:mt-3 lg:text-[2.75rem]">
                {s.to !== undefined ? <CountUp to={s.to} /> : <span className="datum">{s.value}</span>}
                {s.suffix && <span className="text-cyan-dark">{s.suffix}</span>}
              </dd>
              <dd className="order-3 mt-2 text-[0.8125rem] leading-snug text-body lg:mt-2.5 lg:text-[0.9375rem]">
                {s.note}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
