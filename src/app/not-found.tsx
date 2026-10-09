import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDrawer from "@/components/QuoteDrawer";
import { PipeSizeProvider } from "@/components/PipeSize";
import { ArrowRight, Phone, PipeMark } from "@/components/icons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/*
 * The 404. A dead link should still land somewhere that looks like this
 * company and offers the three ways forward a contractor actually wants:
 * the catalog, a search, or a person on the phone.
 */
export default function NotFound() {
  return (
    <PipeSizeProvider>
      <Header />
      <main id="main" className="flex-1 bg-mist">
        <section className="relative mx-auto grid max-w-[88rem] items-center gap-12 overflow-hidden px-4 py-20 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:px-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="eyebrow flex items-center gap-2.5 text-[0.8125rem] tracking-[0.16em] text-ink">
              <PipeMark className="size-6 text-cyan-dark" strokeWidth={1.5} aria-hidden />
              Error 404
            </p>
            <h1 className="mt-5 text-[length:var(--text-h1)] leading-[1.05] font-extrabold tracking-[-0.03em] text-ink">
              This line runs to a dead end.
            </h1>
            <p className="mt-5 text-[1.0625rem] text-body">
              The page you were after has moved or never existed. The catalog,
              the search above and the people on the phone are all still here.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/#spec-finder"
                className="group justify-center gap-2 rounded-xl bg-cyan-dark px-6 py-3.5 font-semibold text-white hover:bg-cyan-deep"
              >
                Browse the catalog
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
              <Link
                href="/"
                className="justify-center rounded-xl border border-line-strong bg-white px-6 py-3.5 font-semibold text-ink hover:border-cyan-dark hover:text-cyan-dark"
              >
                Back to the homepage
              </Link>
              <a
                href="tel:+12533685614"
                className="justify-center gap-2 px-2 font-semibold text-cyan-dark hover:text-cyan-deep"
              >
                <Phone className="size-4.5" aria-hidden />
                253-368-5614
              </a>
            </div>
          </div>
          {/* The house mark at scale: a pipe in section, with no way through. */}
          <div aria-hidden className="relative mx-auto hidden aspect-square w-full max-w-[22rem] lg:block">
            <span className="absolute inset-0 rounded-full border-[1.5rem] border-white shadow-[var(--shadow-lift)]" />
            <span className="absolute inset-[18%] rounded-full border border-dashed border-line-strong" />
            <span className="absolute inset-[36%] flex items-center justify-center rounded-full bg-white font-head text-5xl font-extrabold tracking-tight text-cyan-dark shadow-[var(--shadow-card)]">
              404
            </span>
          </div>
        </section>
      </main>
      <Footer />
      <QuoteDrawer />
    </PipeSizeProvider>
  );
}
