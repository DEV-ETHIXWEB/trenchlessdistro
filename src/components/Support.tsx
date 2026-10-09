"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check } from "./icons";
import Reveal from "./Reveal";

/*
 * Support, told as the four problems it solves, after the numbered list in
 * the references ("Choosing the right drone shouldn't be complicated").
 *
 * Each row is a worry a contractor actually has, in their words, and opens
 * to what this business does about it. The headlines are the problem-first
 * lines from the team review. One open at a time, so the section is short
 * at rest and never longer than one answer.
 */

const PROBLEMS = [
  {
    title: "Too many liners, too little clarity.",
    answer:
      "Tell us the host pipe, the bends and the access. We spec the liner, the resin and the cure from what is on the shelf, and tell you what to leave out.",
    tag: "Spec help",
  },
  {
    title: "Your crew is booked Monday.",
    answer:
      "The liner leaves here today. Lining work does not wait for a back-order, so stocked lines ship the same day from Puyallup, by will call or nationwide freight.",
    tag: "Same-day dispatch",
  },
  {
    title: "When a cutter dies at 6am, you call someone who has pulled liner.",
    answer:
      "Phone support from the people who stock the part, manufacturer escalation when it needs it, and an in-house bench that gets cutters, reels, pumps and cure gear back on the truck.",
    tag: "Support & repair",
  },
  {
    title: "Afraid of buying the wrong system.",
    answer:
      "Try it before you buy it. We bring the equipment, the liner and the resin and run it with your crew, then certify your installers on real pipe at our facility or yours.",
    tag: "Demos & training",
  },
];

export default function Support() {
  const [open, setOpen] = useState(0);
  const still = useReducedMotion();
  const base = useId();

  return (
    <section id="support" aria-labelledby="support-title" className="bg-white">
      <div className="mx-auto max-w-[88rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="max-w-2xl">
            <p className="w-fit rounded-full bg-mist px-3 py-1.5 text-[0.8125rem] font-semibold text-body">
              Problems &amp; solutions
            </p>
            <h2 id="support-title" className="mt-4 text-[clamp(1.9rem,3.2vw,2.9rem)] leading-[1.05] font-bold text-ink">
              Choosing the right liner shouldn&rsquo;t be complicated.
            </h2>
          </div>
          <p className="max-w-xs text-[0.9375rem] text-body">
            From comparing <strong className="font-semibold text-ink">cure methods</strong> to
            keeping a crew running, we help you make{" "}
            <strong className="font-semibold text-ink">confident decisions</strong> every step
            of the way.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-6">
          <ol className="flex flex-col gap-2.5">
            {PROBLEMS.map((p, i) => {
              const on = open === i;
              const id = `${base}-${i}`;
              return (
                <Reveal as="li" key={p.title} delay={i * 0.05}>
                  <div
                    className={`overflow-hidden rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500 ${
                      on ? "border-transparent bg-white shadow-[var(--shadow-lift)]" : "border-line bg-mist hover:bg-white"
                    }`}
                  >
                    <h3 className="tracking-normal">
                      <button
                        type="button"
                        aria-expanded={on}
                        aria-controls={id}
                        onClick={() => setOpen(on ? -1 : i)}
                        className="grid w-full grid-cols-[3.6rem_minmax(0,1fr)] items-center gap-3 px-4 py-3 text-left sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:px-6 sm:py-4"
                      >
                        <span
                          aria-hidden
                          className={`datum font-head text-[2.6rem] leading-none font-extrabold tracking-tighter transition-colors duration-500 sm:text-[3.6rem] ${
                            on
                              ? "text-cyan-dark"
                              : "text-transparent [-webkit-text-stroke:1.5px_#76858f]"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[1rem] leading-snug font-semibold text-ink sm:text-[1.0625rem]">
                          {p.title}
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          id={id}
                          role="region"
                          aria-label={p.title}
                          initial={still ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-4 pb-5 sm:pr-6 sm:pl-[7rem]">
                            <p className="text-[0.9375rem] leading-relaxed text-body">{p.answer}</p>
                            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-cyan-dark/10 px-3 py-1 text-[0.8125rem] font-semibold text-cyan-dark">
                              <Check className="size-3.5" aria-hidden />
                              {p.tag}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </ol>

          <Reveal delay={0.1} className="h-full">
            <div className="relative isolate flex h-full min-h-[22rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-6 sm:p-8">
              <Image
                src="/img/video-cover.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="-z-10 object-cover"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/10" aria-hidden />
              <div className="absolute top-5 right-5 rounded-2xl bg-white px-4 py-3 shadow-[var(--shadow-lift)] sm:top-6 sm:right-6">
                <p className="font-head text-xl font-extrabold text-ink">Same day</p>
                <p className="flex items-center gap-1.5 text-[0.8125rem] text-body">
                  Expert response
                  <span className="flex size-4 items-center justify-center rounded-full bg-ok text-white">
                    <Check className="size-3" strokeWidth={2.6} aria-hidden />
                  </span>
                </p>
              </div>
              <p className="max-w-sm font-head text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[1.08] font-bold text-white">
                Expert guidance before you buy.
              </p>
              <Link
                href="/#quote"
                className="group mt-5 w-fit gap-2 rounded-xl bg-white px-5 font-semibold text-ink hover:bg-cyan hover:text-white"
              >
                Book a demo or training
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
