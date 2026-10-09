"use client";

import { useState, type ReactNode, type SVGProps } from "react";
import Image from "next/image";
import { ArrowRight, Badge, Check, HardHat, Mail, Phone, QuoteBoard, Trash } from "./icons";
import { APPLICATIONS, DIAMETERS, ITEMS } from "@/data/catalog";
import { describeJob, usePipeSize } from "./PipeSize";
import { quoteList, useQuoteList } from "@/lib/quoteList";

const NEXT = [
  { title: "A person reads it", body: "Someone on the counter, usually within the hour." },
  { title: "Your quote by email", body: "Itemised, the same business day." },
  { title: "Ships or will call", body: "Freight nationwide, or pick up in Puyallup." },
];

const NEEDS = [
  "Liners & resin",
  "UV curing",
  "Robotics & milling",
  "Point repair",
  "Inspection cameras",
  "Training or demo",
  "Equipment repair",
];

/*
 * Which need each application in the catalog implies. Someone who filtered
 * to point repair upstairs has already said what they are after; ticking it
 * for them is the difference between a form that remembers and a form that
 * makes you repeat yourself.
 */
const NEED_FOR_APP: Record<string, string> = {
  lateral: "Liners & resin",
  mainline: "Liners & resin",
  "point-repair": "Point repair",
  vertical: "Liners & resin",
  prep: "Robotics & milling",
  inspection: "Inspection cameras",
};

export default function Quote() {
  /*
   * The catalog asked for the pipe size and the job. This form starts with
   * both answers already filled in, and says so, so nobody wonders whether
   * it took. `touched` keeps that promise honest: if the visitor never
   * picked anything, there is nothing to carry and we do not claim
   * otherwise.
   */
  const { diameter, application, touched } = usePipeSize();
  const list = useQuoteList();
  const carried = application ? NEED_FOR_APP[application] : null;
  const [needs, setNeeds] = useState<string[]>(carried ? [carried] : []);
  const [sizes, setSizes] = useState<number[]>(diameter !== null ? [diameter] : []);
  const [sent, setSent] = useState(false);
  const job = APPLICATIONS.find((a) => a.id === application);

  /*
   * This form is mounted from the first paint, long before the visitor
   * touches the catalog upstairs, so seeding the selections at mount is the
   * one thing that cannot work. React's documented way to follow a value
   * that changes during the life of a component is to compare it against the
   * last one during render and adjust: one extra render pass, no effect.
   */
  const [lastJob, setLastJob] = useState({ diameter, application });
  if (lastJob.diameter !== diameter || lastJob.application !== application) {
    setLastJob({ diameter, application });
    setSizes(diameter !== null ? [diameter] : []);
    setNeeds(carried ? [carried] : []);
  }

  const toggle = (n: string) =>
    setNeeds((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  const toggleSize = (d: number) =>
    setSizes((p) => (p.includes(d) ? p.filter((x) => x !== d) : [...p, d]));

  const lines = list.items
    .map((l) => ({ ...l, item: ITEMS.find((i) => i.code === l.code) }))
    .filter((l): l is typeof l & { item: (typeof ITEMS)[number] } => Boolean(l.item));

  return (
    <section id="quote" aria-labelledby="quote-title" className="relative isolate overflow-hidden bg-ink">
      <Image
        src="/img/pipes-abstract.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-ink/95 to-ink/80" aria-hidden />

      <div className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-cyan">Request a quote</p>
            <h2 id="quote-title" className="mt-3 text-[length:var(--text-h2)] text-white">
              Tell us the pipe. We quote it the same business day.
            </h2>
            <p className="mt-4 text-[1.0625rem] text-white/75">
              If you would rather talk it through, call. You will reach someone
              who knows the catalog, not a call centre.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href="tel:+12533685614"
                className="w-full gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 text-white hover:border-cyan hover:bg-white/10"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cyan-dark">
                  <Phone className="size-5" aria-hidden />
                </span>
                <span className="flex flex-col items-start leading-tight">
                  <span className="datum font-head text-lg font-bold">253-368-5614</span>
                  <span className="text-[0.8125rem] text-white/70">Mon&ndash;Fri 7:00&ndash;4:30 PT</span>
                </span>
              </a>
              <a
                href="mailto:sales@trenchlessdistro.com"
                className="w-full gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 text-white hover:border-cyan hover:bg-white/10"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Mail className="size-5" aria-hidden />
                </span>
                <span className="flex min-w-0 flex-col items-start leading-tight">
                  <span className="font-semibold [overflow-wrap:anywhere]">sales@trenchlessdistro.com</span>
                  <span className="text-[0.8125rem] text-white/70">Replies the same business day</span>
                </span>
              </a>
            </div>

            {/* What happens after Send, told as the run of a pipe: three
                stations on one line, so nobody wonders where the request
                goes. Desktop only, where the column has the room. */}
            <div className="mt-10 hidden lg:block">
              <p className="eyebrow text-white/60">What happens next</p>
              <ol className="relative mt-5 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[0.9375rem] before:w-px before:bg-gradient-to-b before:from-cyan before:to-white/10">
                {NEXT.map((n, i) => (
                  <li key={n.title} className="relative flex gap-4">
                    <span className="datum relative z-10 grid size-8 shrink-0 place-items-center rounded-full bg-ink text-[0.8125rem] font-bold text-cyan ring-1 ring-cyan/60">
                      {i + 1}
                    </span>
                    <span className="pt-1 leading-snug">
                      <span className="block font-semibold text-white">{n.title}</span>
                      <span className="mt-0.5 block text-[0.875rem] text-white/65">{n.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {sent ? (
            <div role="status" className="flex flex-col items-start justify-center rounded-3xl bg-white p-8 lg:p-12">
              <span className="flex size-14 items-center justify-center rounded-full bg-cyan-dark text-white">
                <Check className="size-8" aria-hidden />
              </span>
              <h3 className="mt-6 text-[length:var(--text-h2)] text-ink">Request received.</h3>
              <p className="mt-3 max-w-md text-body">
                We will send your quote today. For anything urgent, call
                253-368-5614 and give them your company name.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 rounded-xl border border-cyan-dark px-5 font-semibold text-cyan-dark hover:bg-cyan-dark hover:text-white"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                quoteList.clear();
              }}
              className="overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]"
            >
              {/* The form's own masthead: what it costs the visitor, said
                  before they start. */}
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line bg-mist px-5 py-4 sm:px-8 lg:px-10">
                <p className="font-head text-[1.0625rem] font-bold text-ink">Quote request</p>
                <p className="flex items-center gap-2 text-[0.8125rem] font-medium text-body">
                  <span className="size-2 rounded-full bg-cyan-dark" aria-hidden />
                  About a minute &middot; No account needed
                </p>
              </div>

              <div className="divide-y divide-line px-5 sm:px-8 lg:px-10">
                <Step n="01" title="Who is asking" hint="So we know who to send the quote to.">
                  <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                    <Field label="Name" name="name" autoComplete="name" icon={HardHat} required />
                    <Field label="Company" name="company" autoComplete="organization" icon={Badge} required />
                    <Field label="Phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" icon={Phone} required />
                    <Field label="Email" name="email" type="email" autoComplete="email" icon={Mail} />
                  </div>
                </Step>

                <Step n="02" title="The pipe" hint="Pick every size on the job.">
                  {touched && (
                    <p className="mb-4 flex items-start gap-2 rounded-xl bg-cyan-dark/8 px-4 py-3 text-[0.9375rem] text-ink">
                      <Check className="mt-0.5 size-4 shrink-0 text-cyan-dark" aria-hidden />
                      <span>
                        Carried over from your search:{" "}
                        <strong className="font-semibold">{describeJob(diameter, job?.label)}</strong>.
                        Change anything below if it is wrong.
                      </span>
                    </p>
                  )}
                  <fieldset>
                    <legend className="sr-only">Host pipe diameter</legend>
                    {/* An even row of gauge tiles rather than loose pills:
                        sizes read left to right like a sizing chart. */}
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                      {DIAMETERS.map((d) => (
                        <label
                          key={d}
                          className="datum relative flex h-14 cursor-pointer flex-col items-center justify-center rounded-xl border border-line-strong bg-white leading-none text-ink transition-colors has-checked:border-cyan-dark has-checked:bg-cyan-dark has-checked:text-white has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-cyan-dark hover:border-cyan-dark"
                        >
                          <input
                            type="checkbox"
                            name="diameter"
                            value={d}
                            checked={sizes.includes(d)}
                            onChange={() => toggleSize(d)}
                            /* Invisible but full-size over the tile, so a
                               tap lands on the real checkbox itself. */
                            className="absolute inset-0 z-10 cursor-pointer appearance-none rounded-xl opacity-0"
                          />
                          <span className="font-head text-[1.0625rem] font-bold">{d}&#8243;</span>
                          <span className="mt-1 text-[0.75rem] font-medium opacity-75">dia.</span>
                        </label>
                      ))}
                      {/* Not every job is a stock size, and plenty of
                          callers have not measured yet. */}
                      <label className="relative flex h-14 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-line-strong bg-white text-center leading-none text-ink transition-colors has-checked:border-solid has-checked:border-cyan-dark has-checked:bg-cyan-dark has-checked:text-white has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-cyan-dark hover:border-cyan-dark">
                        <input type="checkbox" name="diameter-other" value="other" className="absolute inset-0 z-10 cursor-pointer appearance-none rounded-xl opacity-0" />
                        <span className="text-[0.875rem] font-bold">Other</span>
                        <span className="mt-1 text-[0.75rem] font-medium opacity-75">not sure</span>
                      </label>
                    </div>
                  </fieldset>
                </Step>

                <Step n="03" title="The job" hint="Tick all that apply, then add what you know.">
                  <fieldset>
                    <legend className="sr-only">What do you need?</legend>
                    <div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-3">
                      {NEEDS.map((n) => {
                        const on = needs.includes(n);
                        return (
                          <button
                            key={n}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggle(n)}
                            className={`min-h-12 justify-start gap-3 rounded-xl border px-3.5 text-left text-[0.9375rem] font-semibold transition-colors ${
                              on
                                ? "border-cyan-dark bg-cyan-dark/8 text-ink"
                                : "border-line-strong bg-white text-ink hover:border-cyan-dark"
                            }`}
                          >
                            <span
                              aria-hidden
                              className={`grid size-5 shrink-0 place-items-center rounded-md border transition-colors ${
                                on ? "border-cyan-dark bg-cyan-dark text-white" : "border-line-strong bg-white"
                              }`}
                            >
                              {on && <Check className="size-3.5" />}
                            </span>
                            {n}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {lines.length > 0 && (
                    <div className="mt-5 rounded-2xl border border-line bg-mist p-4">
                      <p className="flex items-center gap-2 font-semibold text-ink">
                        <QuoteBoard className="size-5 text-cyan-dark" aria-hidden />
                        Your quote list
                      </p>
                      <ul className="mt-3 divide-y divide-line">
                        {lines.map((l) => (
                          <li key={l.code} className="flex items-center justify-between gap-3 py-2">
                            <span className="min-w-0 text-[0.9375rem] text-ink">
                              <span className="datum font-semibold">{l.qty} &times;</span> {l.item.name}
                              <span className="ml-2 text-[0.8125rem] text-body">${l.item.price} {l.item.uom}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => quoteList.remove(l.code)}
                              aria-label={`Remove ${l.item.name} from the quote`}
                              className="shrink-0 justify-center rounded-full px-2 text-body hover:text-ink"
                            >
                              <Trash className="size-4.5" aria-hidden />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <input
                        type="hidden"
                        name="items"
                        value={lines.map((l) => `${l.qty} x ${l.code}`).join(", ")}
                      />
                    </div>
                  )}

                  <div className="mt-5">
                    <label htmlFor="message" className="text-[0.875rem] font-semibold text-ink">
                      Job details <span className="font-normal text-body">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Footage, bends, access, timeline, whatever you have."
                      className="mt-2 w-full resize-y rounded-xl border border-line-strong bg-mist/60 px-4 py-3 text-base text-ink transition-[background-color,border-color,box-shadow] placeholder:text-body/75 hover:border-cyan-dark/60 focus:border-cyan-dark focus:bg-white focus:shadow-[0_0_0_3px_rgba(27,116,137,0.15)]"
                    />
                  </div>
                </Step>
              </div>

              <div className="flex flex-col gap-4 border-t border-line bg-mist px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
                <p className="text-[0.8125rem] text-body sm:max-w-xs">
                  Demo form. The live site routes submissions to your inbox and CRM.
                </p>
                <button
                  type="submit"
                  className="group w-full justify-center gap-2 rounded-xl bg-cyan-dark px-7 py-3.5 font-semibold text-white shadow-[0_10px_24px_-12px_rgba(27,116,137,0.9)] hover:bg-cyan-deep sm:w-auto"
                >
                  Send request
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/*
 * One step of the form. On wide screens the number and title sit in a gutter on
 * the left, so the eye runs down three clear stations instead of one long
 * sheet of boxes; on phones they stack above the fields.
 */
function Step({
  n,
  title,
  hint,
  children,
}: {
  n: string;
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-4 py-7 lg:py-8 xl:grid-cols-[11rem_minmax(0,1fr)] xl:gap-8">
      <div className="flex items-start gap-3 xl:block">
        <span className="datum font-head text-[0.8125rem] font-bold tracking-[0.12em] text-cyan-dark">{n}</span>
        <div className="xl:mt-1.5">
          <h3 className="font-head text-[1.0625rem] leading-tight font-bold text-ink">{title}</h3>
          <p className="mt-1 text-[0.8125rem] leading-snug text-body">{hint}</p>
        </div>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  inputMode,
  icon: Icon,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
  icon: (props: SVGProps<SVGSVGElement>) => ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="flex items-baseline justify-between gap-2 text-[0.875rem] font-semibold text-ink">
        {label}
        <span className="text-[0.75rem] font-normal text-body">{required ? "Required" : "Optional"}</span>
      </label>
      <div className="relative mt-2">
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          /* text-base keeps iOS Safari from zooming the viewport on focus */
          className="peer h-12 w-full rounded-xl border border-line-strong bg-mist/60 pr-4 pl-11 text-base text-ink transition-[background-color,border-color,box-shadow] hover:border-cyan-dark/60 focus:border-cyan-dark focus:bg-white focus:shadow-[0_0_0_3px_rgba(27,116,137,0.15)]"
        />
        {/* After the input so it can follow the input's focus (peer). */}
        <Icon
          className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-gray transition-colors peer-focus:text-cyan-dark"
          aria-hidden
        />
      </div>
    </div>
  );
}
