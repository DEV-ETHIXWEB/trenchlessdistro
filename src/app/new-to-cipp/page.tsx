import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import MobileActionBar from "@/components/MobileActionBar";
import { PipeSizeProvider } from "@/components/PipeSize";
import Reveal from "@/components/Reveal";
import { ArrowRight, Phone } from "@/components/icons";

export const metadata: Metadata = {
  /*
   * No site name here. The layout declares a title template that appends
   * "| Trenchless Distribution", so spelling it out produced it twice and
   * pushed the tag to 75 characters.
   */
  title: "New to CIPP? Start Here",
  description:
    "What cured-in-place pipe lining is, what it costs to start, and what a first job needs. A plain explainer for plumbing and drain companies.",
  alternates: { canonical: "/new-to-cipp" },
};

/*
 * The beginner's door.
 *
 * Everything on the homepage assumes you already know what a liner is. This
 * page assumes you do not, and says so in the first line, because the single
 * worst outcome is someone deciding the whole category is not for them
 * because nobody would explain it.
 *
 * It answers in the order the questions actually get asked, and every answer
 * ends somewhere concrete rather than in another paragraph.
 */

const STEPS = [
  {
    q: "What is CIPP, in one sentence?",
    a: "A resin-soaked liner is pulled or inverted into the old pipe and cured hard in place, which leaves a new pipe inside the old one without digging up the yard, the slab or the street.",
  },
  {
    q: "What kind of work does it win you?",
    a: "The jobs you currently walk away from or sub out. Failing laterals under a driveway, a cracked stack in an occupied building, a line under a finished basement floor. Excavation quotes lose to a lining quote on those.",
  },
  {
    q: "What does it take to start?",
    a: "A cure method, the gear that goes with it, and training. Ambient cure is the cheapest way in and patch repair is the cheapest ambient start, which is why most companies begin there rather than with a full mainline rig.",
  },
  {
    q: "How long until a crew is productive?",
    a: "A two-day certification covers wetout, inversion and cure. Most crews run their first paid job within a fortnight, usually a straight lateral, with a rep on the phone or on site.",
  },
  {
    q: "What do you need to buy, really?",
    a: "Liner by the foot, resin by the pail, a calibration tube, and one piece of equipment appropriate to the cure. Everything else is consumables you reorder. We spec the list against your first job rather than selling a package.",
  },
  {
    q: "Who installs it?",
    a: "You do. We are a distributor. We stock the materials, train your installers and fix the equipment, and we never bid against you on the work itself.",
  },
];

const PATHS = [
  {
    name: "Patch repair",
    spend: "Lowest cost to start",
    body: "Sectional repair of a specific defect. Ambient cure, least equipment, fastest to learn. The usual first step.",
    href: "/#patch",
  },
  {
    name: "Full lateral lining",
    spend: "Most common next step",
    body: "End-to-end relining of a service line. Needs an inversion drum or a wetout unit and a cure you can run on site.",
    href: "/#spec-finder",
  },
  {
    name: "UV and LED cure",
    spend: "Fastest cure, highest kit cost",
    body: "A light train cures the liner in minutes rather than hours. More throughput per day, more equipment to buy.",
    href: "/#spec-finder",
  },
];

export default function NewToCipp() {
  return (
    <PipeSizeProvider>
      <Header />
      <main id="main" className="flex-1">
        <section className="border-b border-line bg-light">
          <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-14">
              <div>
                <p className="eyebrow text-cyan-dark">New to CIPP</p>
                <h1 className="mt-3 text-[length:var(--text-h1)] text-ink">
                  No-dig pipe lining, explained without the jargon.
                </h1>
                <p className="mt-5 max-w-2xl text-lg text-body">
                  If you run a plumbing or drain company and you keep walking
                  away from jobs because the fix means digging, this page is
                  for you. It takes about ten minutes and assumes you know
                  nothing about lining.
                </p>
                <p className="mt-4 max-w-2xl border-l-2 border-cyan-dark pl-4 font-semibold text-ink">
                  Already lining pipe?{" "}
                  <Link href="/#spec-finder" className="inline-link text-cyan-dark">
                    Skip this and go to price and stock.
                  </Link>
                </p>
              </div>
              <figure className="border border-line bg-white">
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src="/img/uv-cure.webp"
                    alt="A liner being cured inside a host pipe by a UV LED train"
                    fill
                    sizes="(min-width: 1024px) 24rem, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <figcaption className="p-4 text-[0.8125rem] text-body">
                  A liner curing inside the old pipe. The old pipe stays in the
                  ground.
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-white">
          <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
            <h2 className="text-[length:var(--text-h2)] text-ink">
              The six questions everyone asks first.
            </h2>
            <dl className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2">
              {STEPS.map((s, i) => (
                <Reveal key={s.q} delay={(i % 2) * 0.06} className="h-full bg-white p-6">
                  <dt className="flex items-baseline gap-3">
                    <span className="datum font-head text-xl font-bold text-cyan-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[length:var(--text-h3)] font-bold text-ink">
                      {s.q}
                    </span>
                  </dt>
                  <dd className="mt-3 text-[0.9375rem] leading-relaxed text-body">
                    {s.a}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-b border-line bg-light">
          <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
            <h2 className="text-[length:var(--text-h2)] text-ink">
              Three ways in, cheapest first.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-body">
              You do not have to buy all of it. Most companies start with the
              first one and add the others when the work pays for them.
            </p>
            <ul className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
              {PATHS.map((p, i) => (
                <Reveal as="li" key={p.name} delay={i * 0.06} className="bg-white">
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col justify-between gap-5 p-6 transition-colors hover:bg-light"
                  >
                    <div>
                      <p className="eyebrow text-cyan-dark">{p.spend}</p>
                      <h3 className="mt-2.5 text-[length:var(--text-h3)] text-ink">
                        {p.name}
                      </h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-body">
                        {p.body}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 border-t border-line pt-4 font-semibold text-cyan-dark">
                      See what it needs
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-ink">
          <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
            <div className="max-w-2xl">
              <p className="eyebrow text-cyan">Next step</p>
              <h2 className="mt-3 text-[length:var(--text-h2)] text-white">
                Tell us the job you keep turning down.
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Describe one line you could not fix without digging. We will
                tell you what it would take to line it instead, and what that
                list costs. No obligation, and we will say so if lining is the
                wrong answer.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#quote"
                  className="group justify-center gap-2 bg-cyan-dark px-6 py-4 font-semibold text-white transition-colors hover:bg-cyan-deep"
                >
                  Ask about a job
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
                <a
                  href="tel:+12533685614"
                  className="justify-center gap-2 border border-white/40 px-6 py-4 font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
                >
                  <Phone className="size-4 shrink-0" aria-hidden />
                  253-368-5614
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AccessibilityWidget />
      <ChatWidget />
      <MobileActionBar />
    </PipeSizeProvider>
  );
}
