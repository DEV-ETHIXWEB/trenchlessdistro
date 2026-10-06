import Image from "next/image";
import { ArrowRight } from "./icons";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

/*
 * The client's own photography, shown plainly.
 *
 * Every frame here is from trenchlessdistro.com at the largest size their
 * media library holds. Nothing is tinted, cropped to a shape, or run through
 * a gradient: per docs/THEME.md, the photographs are the client's and they
 * are shown as taken. The one effect on the page is the cursor tilt on the
 * lead frame, and it is disabled for touch and reduced motion.
 */

const LEAD = {
  src: "/img/uv-cure.webp",
  alt: "A liner curing inside a clay pipe section, lit blue by a UV light running through the bore",
  cap: "UV LED curing",
  note: "The newest line we carry, and the one that changes a crew's day rate most.",
};

const GRID = [
  {
    src: "/img/warehouse.webp",
    alt: "Rolls of liner and calibration tube on pallets, with resin and consumables racked behind",
    cap: "Liner, racked by size",
  },
  {
    src: "/img/liner-rolls.webp",
    alt: "Coils of calibration tube and pull tape in assorted colours",
    cap: "Calibration tube and pull tape",
  },
  {
    src: "/img/liner-detail.webp",
    alt: "A point repair packer with a stainless nose cone, wrapped and strapped ready to run",
    cap: "Point repair, made up",
  },
  {
    src: "/img/pouring-resin.webp",
    alt: "Resin being poured from a mixing pail during a wetout",
    cap: "Wetout, resin poured",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="border-b border-line bg-white"
    >
      <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-cyan-dark">The work we supply</p>
          <h2
            id="gallery-title"
            className="mt-3 text-[length:var(--text-h2)] text-ink"
          >
            Ambient, steam and UV, all off one shelf.
          </h2>
          <p className="mt-4 text-lg text-body">
            Three cure methods, seven product lines and the consumables that go
            with them. Every photograph here is Trenchless Distribution’s own.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <Reveal>
            <TiltCard>
              <figure className="h-full border border-line bg-light p-2">
                <div className="relative aspect-4/3 w-full overflow-hidden lg:aspect-auto lg:h-[26rem]">
                  <Image
                    src={LEAD.src}
                    alt={LEAD.alt}
                    fill
                    sizes="(min-width: 1024px) 44rem, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex flex-wrap items-baseline gap-x-3 px-2 py-3">
                  <span className="font-head font-bold text-ink">
                    {LEAD.cap}
                  </span>
                  <span className="text-[0.8125rem] text-body">
                    {LEAD.note}
                  </span>
                </figcaption>
              </figure>
            </TiltCard>
          </Reveal>

          <ul className="grid grid-cols-2 gap-5">
            {GRID.map((shot, i) => (
              <Reveal as="li" key={shot.src} delay={0.06 * (i + 1)}>
                <figure className="group h-full border border-line bg-white">
                  <div className="relative aspect-4/3 w-full overflow-hidden">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      fill
                      sizes="(min-width: 1024px) 18rem, 45vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  </div>
                  <figcaption className="px-3 py-2.5 text-[0.8125rem] font-semibold text-ink">
                    {shot.cap}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="max-w-xl text-[0.9375rem] text-body">
            Not sure which cure method the job calls for? Tell us the host pipe,
            the length and the bends, and we will spec it.
          </p>
          <a
            href="#quote"
            className="group gap-2 font-semibold text-cyan-dark hover:text-ink"
          >
            Ask for a spec
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
