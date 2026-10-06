import Image from "next/image";
import { WHY_US } from "@/data/catalog";
import { Check, Cross } from "./icons";
import Reveal from "./Reveal";

const DOES = [
  "Stock and ship materials, equipment and consumables",
  "Spec the right system for the host pipe and the job",
  "Train and certify your installers",
  "Run demos on site or at our facility",
  "Troubleshoot and repair your equipment",
];

const DOES_NOT = [
  "Bid or perform installation work",
  "Compete with our contractor customers",
  "Sell to homeowners or property managers",
];

export default function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-us-title" className="border-b border-line bg-light">
      <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
        <Reveal>
          <p className="eyebrow text-cyan-dark">Why choose us</p>
          <h2 id="why-us-title" className="mt-3 max-w-2xl text-[length:var(--text-h2)] text-ink">
            Why contractors buy from Trenchless Distribution.
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {WHY_US.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.05} className="bg-white">
              <div className="h-full p-5">
                <p className="datum font-head text-2xl font-bold text-cyan-dark">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-[length:var(--text-h3)] text-ink">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* The positioning correction, stated plainly. */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <Reveal className="grid gap-px border border-line bg-line sm:grid-cols-2">
            <div className="bg-white p-5">
              <p className="eyebrow flex items-center gap-2 text-cyan-dark">
                <Check className="size-4" aria-hidden />
                What we do
              </p>
              <ul className="mt-4 space-y-2.5">
                {DOES.map((d) => (
                  <li key={d} className="text-[0.9375rem] leading-snug text-ink">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-5">
              <p className="eyebrow flex items-center gap-2 text-gray">
                <Cross className="size-4" aria-hidden />
                What we never do
              </p>
              <ul className="mt-4 space-y-2.5">
                {DOES_NOT.map((d) => (
                  <li key={d} className="text-[0.9375rem] leading-snug text-body line-through decoration-line">
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-line pt-4 text-[0.8125rem] text-body">
                Every product we sell goes out to a contractor who installs it.
                That only works if we stay on our side of the line.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <figure className="h-full border border-line bg-white">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src="/img/warehouse.webp"
                  alt="Pallets of liner tube and calibration tube racked in the Trenchless Distribution warehouse"
                  fill
                  sizes="(min-width: 1024px) 22rem, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-4 text-[0.8125rem] text-body">
                Our floor in Puyallup, WA. Not a job site.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
