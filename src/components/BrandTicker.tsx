import { MANUFACTURERS } from "@/data/catalog";

/*
 * The lines they carry, as a slow ticker.
 *
 * Set as type, not logos: using a manufacturer's mark needs written brand
 * permission, and this page goes to the client before any of that exists.
 * The list is duplicated once and the track moves exactly -50%, so the loop
 * has no visible seam. aria-hidden on the copy keeps it out of the a11y tree.
 */
export default function BrandTicker() {
  const run = [...MANUFACTURERS, ...MANUFACTURERS];

  return (
    <section
      aria-label="Manufacturers we distribute"
      className="border-b border-line bg-white py-5 lg:py-6"
    >
      <div className="mx-auto flex max-w-[88rem] flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8">
        <p className="eyebrow shrink-0 text-body">Authorized distributor for</p>

        <div
          className="relative min-w-0 flex-1 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, #000 4rem, #000 calc(100% - 4rem), transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 4rem, #000 calc(100% - 4rem), transparent)",
          }}
        >
          <ul
            className="flex w-max items-center gap-10 motion-safe:[animation:marquee_38s_linear_infinite] hover:[animation-play-state:paused]"
            aria-hidden
          >
            {run.map((m, i) => (
              <li
                key={`${m.name}-${i}`}
                className="font-head text-lg font-bold whitespace-nowrap text-ink"
              >
                {m.name}
                <span className="ml-3 text-[0.8125rem] font-normal text-body">
                  {m.role}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* The same list, readable, for assistive technology and no-JS. */}
        <ul className="sr-only">
          {MANUFACTURERS.map((m) => (
            <li key={m.name}>
              {m.name} &mdash; {m.role}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
