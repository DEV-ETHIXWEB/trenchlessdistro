import { TRUST } from "@/data/catalog";
import { ArrowRight, Phone } from "./icons";
import BackgroundVideo from "./BackgroundVideo";
import HeroPipePicker from "./HeroPipePicker";

/*
 * The hero.
 *
 * One full-bleed distribution-warehouse loop, an ink scrim heavy enough that
 * white body copy clears AA over every frame of it, and the pipe-size picker
 * lifted onto a white card so the one interactive thing on the screen is also
 * the brightest thing on the screen.
 *
 * The footage is stock, not Trenchless Distribution's own floor, so nothing
 * here captions it as their building. See README.
 */
export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink"
    >
      <BackgroundVideo
        src="/video/warehouse-aisle.mp4"
        poster="/video/warehouse-aisle-poster.jpg"
        priority
        scrimClassName="hero-scrim"
        controlClassName="absolute top-4 right-4 z-20 lg:right-6"
        sizes="100vw"
      />

      <div className="relative z-10 mx-auto grid max-w-[80rem] items-center gap-10 px-4 py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:px-6 lg:py-24">
        <div>
          <p className="eyebrow flex items-center gap-2.5 text-cyan">
            <span className="h-px w-8 bg-cyan" aria-hidden />
            Trenchless materials &amp; equipment distributor
          </p>

          <h1
            id="hero-title"
            className="mt-5 text-[clamp(2.25rem,5vw,3.9rem)] leading-[1.06] text-white"
          >
            No-dig pipe lining technology,{" "}
            <span className="text-cyan">stocked</span> and{" "}
            <span className="text-cyan">supported</span>.
          </h1>

          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/80 lg:text-lg">
            Liners, resins, UV curing, robotics and cameras, plus the training,
            demos and equipment service that keep them running.
          </p>

          {/* The correction, in the place a visitor cannot scroll past. */}
          <p className="mt-5 max-w-xl border-l-2 border-cyan pl-4 font-semibold text-white">
            We supply the contractors who do the work.{" "}
            <span className="text-white/80">
              We do not perform installations.
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#categories"
              className="group justify-center gap-2 bg-cyan-dark px-6 py-4 font-semibold text-white transition-colors hover:bg-white hover:text-ink"
            >
              Shop the catalog
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </a>
            <a
              href="tel:+12533685614"
              className="justify-center gap-2 border border-white/40 px-6 py-4 font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <Phone className="size-4" aria-hidden />
              253-368-5614
            </a>
          </div>
        </div>

        {/* The picker is the one thing the client was asked to react to, so it
            is the brightest object in the hero rather than a footnote. */}
        <div className="lg:justify-self-end lg:pl-6">
          <HeroPipePicker />
        </div>
      </div>

      {/* Their own three trust signals, carried over onto the dark band. */}
      <div className="relative z-10 border-t border-white/15 bg-ink/75 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-[80rem] divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-6">
          {TRUST.map((t) => (
            <div key={t.k} className="px-4 py-5 lg:px-6">
              <dt className="font-head text-lg font-bold text-white">{t.k}</dt>
              <dd className="mt-0.5 text-[0.9375rem] text-white/70">{t.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
