"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Mail, Phone, QuoteBoard, Trash } from "./icons";
import { APPLICATIONS, DIAMETERS, ITEMS } from "@/data/catalog";
import { describeJob, usePipeSize } from "./PipeSize";
import { quoteList, useQuoteList } from "@/lib/quoteList";

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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
          <div>
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
              className="rounded-3xl bg-white p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-7 lg:p-9"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" required />
                <Field label="Company name" name="company" autoComplete="organization" required />
                <Field label="Phone number" name="phone" type="tel" autoComplete="tel" required />
                <Field label="Email" name="email" type="email" autoComplete="email" />
              </div>

              {lines.length > 0 && (
                <div className="mt-7 rounded-2xl border border-line bg-mist p-4">
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

              {touched && (
                <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl bg-cyan-dark/8 px-4 py-3 text-[0.9375rem] text-ink">
                  <Check className="size-4 shrink-0 text-cyan-dark" aria-hidden />
                  <span>
                    Carried over from your search:{" "}
                    <strong className="font-semibold">{describeJob(diameter, job?.label)}</strong>.
                    Change anything below if it is wrong.
                  </span>
                </p>
              )}

              <fieldset className="mt-7">
                <legend className="eyebrow text-body">Host pipe diameter</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {DIAMETERS.map((d) => (
                    <label
                      key={d}
                      className="datum flex min-h-11 cursor-pointer items-center rounded-full border border-line-strong px-4 text-[0.9375rem] font-semibold text-ink transition-colors has-checked:border-cyan-dark has-checked:bg-cyan-dark has-checked:text-white has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-cyan-dark hover:border-cyan-dark"
                    >
                      <input
                        type="checkbox"
                        name="diameter"
                        value={d}
                        checked={sizes.includes(d)}
                        onChange={() => toggleSize(d)}
                        className="sr-only"
                      />
                      {d}&#8243;
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="mt-7">
                <legend className="eyebrow text-body">What do you need?</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {NEEDS.map((n) => {
                    const on = needs.includes(n);
                    return (
                      <button
                        key={n}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(n)}
                        className={`gap-1.5 rounded-full border px-4 text-[0.9375rem] font-semibold transition-colors ${
                          on
                            ? "border-cyan-dark bg-cyan-dark text-white"
                            : "border-line-strong bg-white text-ink hover:border-cyan-dark"
                        }`}
                      >
                        {on && <Check className="size-4" aria-hidden />}
                        {n}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-7">
                <label htmlFor="message" className="eyebrow text-body">
                  Job details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Footage, bends, access, timeline, whatever you have."
                  className="mt-3 w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-base text-ink placeholder:text-body/75 focus:border-cyan-dark focus:outline-none"
                />
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <button
                  type="submit"
                  className="group justify-center gap-2 rounded-xl bg-cyan-dark px-7 py-3.5 font-semibold text-white shadow-[0_10px_24px_-12px_rgba(27,116,137,0.9)] hover:bg-cyan-deep"
                >
                  Send request
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </button>
                <p className="text-[0.8125rem] text-body">
                  Demo form. The live site routes submissions to your inbox and CRM.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow text-body">
        {label}
        {required && <span className="ml-1 text-gray">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        /* text-base keeps iOS Safari from zooming the viewport on focus */
        className="mt-2.5 w-full rounded-xl border border-line-strong bg-white px-4 py-3 text-base text-ink focus:border-cyan-dark focus:shadow-[0_0_0_3px_rgba(27,116,137,0.15)] focus:outline-none"
      />
    </div>
  );
}
