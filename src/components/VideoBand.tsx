import { Freight, Check } from "./icons";
import BackgroundVideo from "./BackgroundVideo";
import Reveal from "./Reveal";

/*
 * The distribution band: the one claim on this page that is about logistics
 * rather than product. Placed between the product finder and the collections,
 * where a visitor has just seen what we stock and the next question is
 * whether they can actually get it.
 *
 * Footage is stock warehouse material used as atmosphere. The copy is careful
 * never to describe it as Trenchless Distribution's own building.
 */

const POINTS = [
  "Will-call off the shelf in Puyallup, WA",
  "Nationwide freight on stocked lines",
  "Cut-to-length liner and calibration tube",
  "Consumables bundled to the job, not the pallet",
];

export default function VideoBand() {
  return (
    <section
      aria-labelledby="stocked-title"
      className="relative isolate overflow-hidden border-b border-line bg-ink"
    >
      <BackgroundVideo
        src="/video/pallet-jack.mp4"
        poster="/video/pallet-jack-poster.jpg"
        scrimClassName="band-scrim"
        controlClassName="absolute top-4 right-4 z-20 lg:right-6"
        sizes="100vw"
      />

      <div className="relative z-10 mx-auto max-w-[80rem] px-4 py-16 lg:px-6 lg:py-24">
        <Reveal className="max-w-xl">
          <p className="eyebrow flex items-center gap-2.5 text-cyan">
            <Freight className="size-5" aria-hidden />
            Stocked, picked, shipped
          </p>
          <h2
            id="stocked-title"
            className="mt-4 text-[length:var(--text-h2)] text-white"
          >
            A catalog is only worth the shelf behind it.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/80">
            Lining work does not wait for a back-order. We hold the liner,
            resin and consumables that move every week, so the common sizes go
            out the same day and the long-lead equipment is specced before you
            need it.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-white">
                <Check
                  className="mt-1 size-4 shrink-0 text-cyan"
                  aria-hidden
                />
                <span className="text-[0.9375rem] leading-snug">{p}</span>
              </li>
            ))}
          </ul>

          <a
            href="#quote"
            className="mt-9 gap-2 bg-white px-6 py-4 font-semibold text-ink transition-colors hover:bg-cyan-dark hover:text-white"
          >
            Check stock on your list
          </a>
        </Reveal>
      </div>
    </section>
  );
}
