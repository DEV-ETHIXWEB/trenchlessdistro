import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "./icons";
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

const STATS: { to: number; prefix?: string; suffix?: string; label: string }[] = [
  { to: 35, suffix: "+", label: "Years in trenchless" },
  { to: 400, suffix: "+", label: "Lines on the shelf" },
  { to: 7, label: "Pipe sizes, 2″ to 12″" },
  { to: 6, label: "Manufacturers carried" },
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
        <div className="hero-pan absolute inset-0">
          <Image
            src="/img/hero-yard.webp"
            alt="Lined pipe sections and a roll of liner tube in a supply yard, with a Trenchless Distribution crew member behind them"
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-[70%_center] lg:object-center"
          />
        </div>
        <div className="hero-scrim absolute inset-0 lg:hidden" aria-hidden />
        <div
          className="absolute inset-y-0 left-0 hidden w-[42%] bg-gradient-to-r from-mist via-mist/80 to-transparent lg:block"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-t from-mist/70 to-transparent lg:block"
          aria-hidden
        />
      </div>

      {/* Handwritten line over the sky. Desktop only: on a phone it would sit
          on the busiest part of the frame. */}
      <p
        aria-hidden
        className="hero-script pointer-events-none absolute top-[11%] right-[27%] hidden -rotate-6 font-script text-[1.9rem] leading-[1.05] text-ink/85 lg:block xl:text-[2.15rem]"
      >
        Quality materials.
        <br />
        <span className="pl-3">Trusted brands.</span>
        <br />
        <span className="pl-6">Real support.</span>
        <svg viewBox="0 0 120 10" className="mt-2 ml-8 h-2.5 w-24 text-cyan-dark" aria-hidden>
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

      <div className="mx-auto grid max-w-[88rem] px-4 pt-12 pb-20 sm:px-6 lg:min-h-[34rem] lg:grid-cols-[minmax(0,34rem)_1fr] lg:items-center lg:px-8 lg:pt-16 lg:pb-16 xl:min-h-[38rem]">
        <div className="hero-copy">
          <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-white ring-1 ring-white/20 backdrop-blur-md lg:bg-cyan-dark/8 lg:text-cyan-dark lg:ring-0">
            <span className="size-1.5 shrink-0 rounded-full bg-cyan lg:bg-current" aria-hidden />
            Trenchless materials &amp; equipment distributor
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

      {/* The stats strip. On a phone this is the white sheet that rises over
          the bottom of the photograph. */}
      <div className="relative -mt-8 rounded-t-[1.75rem] bg-white lg:mt-0 lg:rounded-none lg:border-t lg:border-line">
        <dl className="mx-auto grid max-w-[88rem] grid-cols-2 px-2 pt-3 sm:px-4 lg:grid-cols-4 lg:px-8 lg:pt-0">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col-reverse px-3 py-4 lg:px-6 lg:py-7 ${
                i % 2 === 1 ? "border-l border-line" : ""
              } ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="mt-1 text-[0.8125rem] font-medium text-body lg:text-[0.9375rem]">
                {s.label}
              </dt>
              <dd className="font-head text-[1.75rem] leading-none font-extrabold tracking-tight text-ink lg:text-[2.4rem]">
                <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
