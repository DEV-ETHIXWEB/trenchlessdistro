import { EVENTS, RESOURCES } from "@/data/catalog";
import { ArrowRight, Download, Pin } from "./icons";
import Reveal from "./Reveal";

/*
 * Training dates and the document library, in one short band. Three dated
 * cards a crew lead can act on, and four counts that prove the paperwork
 * exists, with nothing in between to scroll past.
 */
export default function EventsDocs() {
  return (
    <section id="events" aria-labelledby="events-title" className="bg-mist">
      <div className="mx-auto max-w-[88rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div className="max-w-2xl">
            <p className="eyebrow text-cyan-dark">Demos, training &amp; events</p>
            <h2 id="events-title" className="mt-2.5 text-[length:var(--text-h2)] text-ink">
              Get your crew certified before the next job lands.
            </h2>
          </div>
          <a href="#quote" className="group gap-2 font-semibold text-cyan-dark hover:text-cyan-deep">
            Reserve seats
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </Reveal>

        <ul className="mt-8 grid gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5">
          {EVENTS.map((event, i) => (
            <Reveal as="li" key={event.date} delay={i * 0.06}>
              <a
                href="#quote"
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition-[box-shadow,border-color] duration-300 ease-glide hover:border-line-strong hover:shadow-[var(--shadow-hover)] lg:p-6"
              >
                <span className="flex flex-wrap items-start justify-between gap-3">
                  <time
                    dateTime={event.date}
                    className="flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-mist transition-colors duration-300 group-hover:bg-cyan-dark group-hover:text-white"
                  >
                    <span className="datum font-head text-2xl leading-none font-extrabold">{event.day}</span>
                    <span className="eyebrow mt-1 text-[0.75rem]">{event.month}</span>
                  </time>
                  <span className="rounded-full bg-cyan-dark/10 px-2.5 py-1 text-[0.75rem] font-semibold whitespace-nowrap text-cyan-dark">
                    {event.seats}
                  </span>
                </span>
                <span className="mt-5 block text-[0.8125rem] font-semibold tracking-wide text-body uppercase">
                  {event.kind}
                </span>
                <span className="mt-1.5 block font-head text-[1.0625rem] leading-snug font-bold text-ink">
                  {event.title}
                </span>
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-[0.8125rem] text-body">
                  <Pin className="size-4 shrink-0" aria-hidden />
                  {event.where}
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-4 grid gap-4 rounded-2xl border border-line bg-white p-4 sm:mt-5 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:items-center lg:gap-8 lg:p-6">
          <div>
            <h3 className="text-[length:var(--text-h3)] text-ink">Technical library</h3>
            <p className="mt-1.5 text-[0.9375rem] text-body">
              Spec sheets, SDS, manuals and install videos, on the product page
              they belong to.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {RESOURCES.map((res) => (
              <li key={res.label}>
                <a
                  href="#quote"
                  className="group h-full w-full justify-between gap-3 rounded-xl bg-mist px-4 py-3 transition-colors hover:bg-cyan-dark"
                >
                  <span className="flex flex-col">
                    <span className="datum font-head text-xl font-extrabold text-ink transition-colors group-hover:text-white">
                      {res.count}
                    </span>
                    <span className="text-[0.8125rem] font-semibold text-body transition-colors group-hover:text-white">
                      {res.label}
                    </span>
                  </span>
                  <Download className="size-5 shrink-0 text-body transition-colors group-hover:text-white" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
