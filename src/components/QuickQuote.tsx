"use client";

import { useState } from "react";
import { APPLICATIONS } from "@/data/catalog";
import { ArrowRight, Check, Phone } from "./icons";
import { usePipeSize } from "./PipeSize";
import Reveal from "./Reveal";

/*
 * The short form, at the top.
 *
 * The full quote form at the bottom of the page asks for eight things. That
 * is the right form for someone who has decided; it is the wrong form for
 * someone who landed thirty seconds ago and wants to know whether these
 * people can help. This asks for two, because the size and the job have
 * already been answered by the hero picker right above it.
 *
 * Anyone who wants to say more gets a link to the long form rather than a
 * second set of fields.
 */
export default function QuickQuote() {
  const { diameter, application } = usePipeSize();
  const [sent, setSent] = useState(false);
  const job = APPLICATIONS.find((a) => a.id === application)!;

  return (
    <section
      aria-labelledby="quick-quote-title"
      className="border-b border-line bg-light-alt"
    >
      <div className="mx-auto max-w-[80rem] px-4 py-10 lg:px-6 lg:py-12">
        <Reveal className="grid items-center gap-7 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="eyebrow text-cyan-dark">Two fields, same day</p>
            <h2
              id="quick-quote-title"
              className="mt-2.5 text-[length:var(--text-h3)] text-ink"
            >
              Get a price on a {diameter}&#8243; {job.label.toLowerCase()} job
              without filling in a form.
            </h2>
            <p className="mt-2.5 text-[0.9375rem] text-body">
              Leave a name and a number. Someone who knows the catalog calls
              you back the same business day.
            </p>
          </div>

          {sent ? (
            <div
              role="status"
              className="flex items-start gap-3.5 border border-cyan-dark bg-white p-5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-cyan-dark text-white">
                <Check className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-head font-bold text-ink">
                  Got it. We will call you today.
                </p>
                <p className="mt-1 text-[0.9375rem] text-body">
                  We have your {diameter}&#8243; {job.label.toLowerCase()} job
                  on the request. Need it faster? Call{" "}
                  <a href="tel:+12533685614" className="inline-link font-semibold text-cyan-dark">
                    253-368-5614
                  </a>
                  .
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="border border-line bg-white p-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="qq-name" className="eyebrow text-body">
                    Your name
                  </label>
                  <input
                    id="qq-name"
                    name="name"
                    required
                    autoComplete="name"
                    className="mt-2 w-full border border-line bg-white px-3.5 py-3 text-ink placeholder:text-body/60 focus:border-cyan-dark focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="qq-phone" className="eyebrow text-body">
                    Phone number
                  </label>
                  <input
                    id="qq-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    className="mt-2 w-full border border-line bg-white px-3.5 py-3 text-ink placeholder:text-body/60 focus:border-cyan-dark focus:outline-none"
                  />
                </div>
              </div>

              {/* The two answers we already have, shown rather than asked. */}
              <p className="mt-3.5 text-[0.8125rem] text-body">
                Sending your {diameter}&#8243; {job.label.toLowerCase()} job
                with it.{" "}
                <a href="#quote" className="inline-link font-semibold text-cyan-dark">
                  Add job details instead
                </a>
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="group gap-2 bg-cyan-dark px-6 py-3.5 font-semibold text-white transition-colors hover:bg-cyan-deep"
                >
                  Get my price
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </button>
                <a
                  href="tel:+12533685614"
                  className="gap-2 font-semibold text-cyan-dark hover:text-cyan-deep"
                >
                  <Phone className="size-4 shrink-0" aria-hidden />
                  253-368-5614
                </a>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
