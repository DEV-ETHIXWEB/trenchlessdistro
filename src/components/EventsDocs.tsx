import Image from "next/image";
import { EVENTS, RESOURCES } from "@/data/catalog";
import { ArrowRight, Download, Pin } from "./icons";
import Reveal from "./Reveal";

export default function EventsDocs() {
  return (
    <section id="events" aria-labelledby="events-title" className="border-b border-line bg-light">
      <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:gap-14">
          <div>
            <Reveal>
              <p className="eyebrow text-cyan-dark">Demos, training &amp; events</p>
              <h2 id="events-title" className="mt-3 text-[length:var(--text-h2)] text-ink">
                Coming up at Trenchless Distribution.
              </h2>
            </Reveal>

            <ul className="mt-8 border-t border-line">
              {EVENTS.map((event, i) => (
                <Reveal as="li" key={event.date} delay={i * 0.06}>
                  <a
                    href="#quote"
                    className="group grid grid-cols-[4rem_minmax(0,1fr)] items-start gap-x-5 gap-y-2 border-b border-line py-5 transition-colors hover:bg-white sm:grid-cols-[4.5rem_minmax(0,1fr)_11rem] sm:items-center"
                  >
                    <time
                      dateTime={event.date}
                      className="flex flex-col items-center border border-line bg-white py-2 transition-colors group-hover:border-cyan-dark group-hover:bg-cyan-dark group-hover:text-white"
                    >
                      <span className="datum font-head text-xl leading-none font-bold">{event.day}</span>
                      <span className="eyebrow mt-1 text-[0.625rem]">{event.month}</span>
                    </time>
                    <div>
                      <p className="eyebrow text-cyan-dark">{event.kind}</p>
                      <h3 className="mt-1.5 text-[length:var(--text-h3)] text-ink">{event.title}</h3>
                      <p className="mt-1.5 flex items-center gap-1.5 text-[0.9375rem] text-body">
                        <Pin className="size-4 shrink-0" aria-hidden />
                        {event.where}
                      </p>
                    </div>
                    <p className="col-start-2 text-[0.9375rem] font-semibold text-body sm:col-start-auto sm:text-right">
                      {event.seats}
                    </p>
                  </a>
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-10">
              <p className="eyebrow text-cyan-dark">Technical library</p>
              <h3 className="mt-3 text-[length:var(--text-h3)] text-ink">
                Every document, attached to its product.
              </h3>
              <p className="mt-2 max-w-xl text-[0.9375rem] text-body">
                Spec sheets, SDS and TDS, manuals and install videos sit on the
                product page they belong to, so a crew in a crawlspace can find
                the cure schedule on a phone.
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
                {RESOURCES.map((res) => (
                  <li key={res.label}>
                    <a
                      href="#quote"
                      className="group flex h-full flex-col justify-between gap-4 bg-white p-4 transition-colors hover:bg-ink"
                    >
                      <Download className="size-5 text-body transition-colors group-hover:text-cyan" aria-hidden />
                      <span>
                        <span className="datum block font-head text-xl font-bold text-ink transition-colors group-hover:text-cyan">
                          {res.count}
                        </span>
                        <span className="mt-0.5 block text-[0.9375rem] font-semibold text-ink transition-colors group-hover:text-white">
                          {res.label}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border border-line bg-white">
              <div className="relative aspect-16/9 w-full overflow-hidden">
                <Image
                  src="/img/video-cover.webp"
                  alt="Trenchless Distribution brand plate set against a wall of pipe fittings"
                  fill
                  sizes="(min-width: 1024px) 21rem, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-[length:var(--text-h3)] text-ink">
                  Bringing a crew? Tell us first.
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                  Training runs on real pipe and seats are limited. Tell us your
                  headcount and what you run, and we will set the bench up for it.
                </p>
                <a
                  href="#quote"
                  className="group mt-4 inline-flex items-center gap-2 font-semibold text-cyan-dark hover:text-ink"
                >
                  Reserve seats
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </a>
              </div>
            </div>
            <figure className="mt-6 border border-line bg-white">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src="/img/liner-detail.webp"
                  alt="A point repair packer with a stainless nose cone, wrapped and strapped ready to run"
                  fill
                  sizes="(min-width: 1024px) 21rem, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-4 text-[0.8125rem] text-body">
                Point repair packer, made up and ready for the truck.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
