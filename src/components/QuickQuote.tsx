"use client";

import { useState } from "react";
import Image from "next/image";
import { APPLICATIONS } from "@/data/catalog";
import { ArrowRight, Check, Phone } from "./icons";
import { describeJob, usePipeSize } from "./PipeSize";
import Reveal from "./Reveal";

/*
 * The short form, as the dark call-to-action band in the shop reference.
 *
 * The full quote form at the bottom asks for eight things. That is the right
 * form for someone who has decided; it is the wrong form for someone who
 * has just seen a price in the catalog and wants a person to confirm it.
 * This asks for two, and sends whatever size and job the catalog already
 * knows along with them.
 */
export default function QuickQuote() {
  const { diameter, application } = usePipeSize();
  const [sent, setSent] = useState(false);
  const label = APPLICATIONS.find((a) => a.id === application)?.label;
  const job = describeJob(diameter, label);

  return (
    <section aria-labelledby="quick-quote-title" className="bg-mist">
      <div className="mx-auto max-w-[88rem] px-4 pb-12 sm:px-6 lg:px-8 lg:pb-20">
        <Reveal className="relative isolate overflow-hidden rounded-3xl bg-ink px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-[55%]" aria-hidden>
            <Image
              src="/img/warehouse.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-45 lg:opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
          </div>
          <div className="pointer-events-none absolute -top-24 -left-24 -z-10 size-72 rounded-full bg-cyan-dark/30 blur-3xl" aria-hidden />

          <div className="grid items-center gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-12">
            <div>
              <p className="eyebrow text-cyan">Two fields, same day</p>
              <h2
                id="quick-quote-title"
                className="mt-3 text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.08] font-extrabold text-white"
              >
                Need a price today?
                <br />
                <span className="text-white/70">
                  {job ? <>Get one on your {job} job.</> : <>Skip the long form.</>}
                </span>
              </h2>
              <p className="mt-3 max-w-md text-white/75">
                Leave a name and a number. Someone who knows the catalog calls
                you back the same business day.
              </p>
            </div>

            {sent ? (
              <div role="status" className="flex items-start gap-3.5 rounded-2xl bg-white p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cyan-dark text-white">
                  <Check className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-head font-bold text-ink">Got it. We will call you today.</p>
                  <p className="mt-1 text-[0.9375rem] text-body">
                    {job ? <>We have your {job} job on the request. </> : null}
                    Need it faster? Call{" "}
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
                className="rounded-2xl bg-white/8 p-2 ring-1 ring-white/15 backdrop-blur-md"
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <label htmlFor="qq-name" className="sr-only">
                      Your name
                    </label>
                    <input
                      id="qq-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full rounded-xl bg-white px-4 py-3 text-ink placeholder:text-body focus:shadow-[0_0_0_3px_var(--color-cyan)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="qq-phone" className="sr-only">
                      Phone number
                    </label>
                    <input
                      id="qq-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="Phone number"
                      className="w-full rounded-xl bg-white px-4 py-3 text-ink placeholder:text-body focus:shadow-[0_0_0_3px_var(--color-cyan)] focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="group mt-2 w-full justify-center gap-2 rounded-xl bg-cyan-dark px-6 py-3.5 font-semibold text-white hover:bg-cyan"
                >
                  Get my price
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </button>
                <p className="flex flex-wrap items-center justify-center gap-x-6 px-2 pt-1 text-[0.8125rem] text-white/75">
                  <a href="#quote" className="inline-link font-semibold text-white underline-offset-4 hover:underline">
                    Add job details instead
                  </a>
                  <a href="tel:+12533685614" className="inline-link inline-flex items-center gap-1.5 font-semibold text-white hover:text-cyan">
                    <Phone className="size-3.5" aria-hidden />
                    253-368-5614
                  </a>
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
