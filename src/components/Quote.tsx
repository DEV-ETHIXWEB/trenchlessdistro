"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Mail, Phone } from "./icons";
import { DIAMETERS } from "@/data/catalog";

const NEEDS = [
  "Liners & resin",
  "UV curing",
  "Robotics & milling",
  "Point repair",
  "Inspection cameras",
  "Training or demo",
  "Equipment repair",
];

export default function Quote() {
  const [needs, setNeeds] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const toggle = (n: string) =>
    setNeeds((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));

  return (
    <section id="quote" aria-labelledby="quote-title" className="relative isolate bg-ink">
      <Image
        src="/img/pipes-abstract.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-ink/85" aria-hidden />

      <div className="relative mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="eyebrow text-cyan">Request a quote</p>
            <h2 id="quote-title" className="mt-3 text-[length:var(--text-h2)] text-white">
              Tell us the pipe. We will tell you the price.
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Quotes go out the same business day. If you would rather talk it
              through, call. You will reach someone who knows the catalog.
            </p>

            <div className="mt-8 space-y-3 border-t border-white/20 pt-6">
              <a href="tel:+12533685614" className="flex items-center gap-3 text-white hover:text-cyan">
                <Phone className="size-5 shrink-0" aria-hidden />
                <span className="datum text-lg font-semibold">253-368-5614</span>
              </a>
              <a
                href="mailto:sales@trenchlessdistro.com"
                className="flex items-center gap-3 text-white/80 hover:text-cyan"
              >
                <Mail className="size-5 shrink-0" aria-hidden />
                <span>sales@trenchlessdistro.com</span>
              </a>
            </div>
          </div>

          {sent ? (
            <div role="status" className="flex flex-col items-start justify-center bg-white p-8 lg:p-10">
              <span className="flex size-12 items-center justify-center rounded-full bg-cyan-dark text-white">
                <Check className="size-7" aria-hidden />
              </span>
              <h3 className="mt-5 text-[length:var(--text-h2)] text-ink">Request received.</h3>
              <p className="mt-3 max-w-md text-body">
                We will send your quote today. For anything urgent, call
                253-368-5614 and give them your company name.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-7 border border-ink px-5 py-3 font-semibold text-ink hover:bg-ink hover:text-white"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="bg-white p-6 lg:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" required />
                <Field label="Company name" name="company" autoComplete="organization" required />
                <Field label="Phone number" name="phone" type="tel" autoComplete="tel" required />
                <Field label="Email" name="email" type="email" autoComplete="email" />
              </div>

              <fieldset className="mt-7">
                <legend className="eyebrow text-body">Host pipe diameter</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {DIAMETERS.map((d) => (
                    <label
                      key={d}
                      className="datum cursor-pointer border border-line px-3.5 py-2.5 text-[0.9375rem] font-semibold text-ink transition-colors has-checked:border-cyan-dark has-checked:bg-cyan-dark has-checked:text-white hover:border-cyan-dark"
                    >
                      <input type="checkbox" name="diameter" value={d} className="sr-only" />
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
                        className={`border px-3.5 py-2.5 text-[0.9375rem] font-semibold transition-colors ${
                          on
                            ? "border-ink bg-ink text-white"
                            : "border-line bg-white text-ink hover:border-cyan-dark"
                        }`}
                      >
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
                  className="mt-3 w-full border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-body/60 focus:border-cyan-dark focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 bg-cyan-dark px-7 py-4 font-semibold text-white transition-colors hover:bg-ink sm:w-auto"
              >
                Send request
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </button>
              <p className="mt-3 text-[0.8125rem] text-body">
                Demo form. The live site routes submissions to your inbox and CRM.
              </p>
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
        className="mt-3 w-full border border-line bg-white px-4 py-3 text-base text-ink focus:border-cyan-dark focus:outline-none"
      />
    </div>
  );
}
