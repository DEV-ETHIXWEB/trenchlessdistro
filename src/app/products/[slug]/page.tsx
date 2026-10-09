import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import QuoteDrawer from "@/components/QuoteDrawer";
import { PipeSizeProvider } from "@/components/PipeSize";
import ProductCard, { ProductArt } from "@/components/ProductCard";
import ProductBuy from "@/components/ProductBuy";
import {
  Check,
  ChevronRight,
  Freight,
  HardHat,
  Phone,
  ShieldCheck,
  SpecSheet,
  Wrench,
} from "@/components/icons";
import { ITEMS } from "@/data/catalog";
import {
  appsOf,
  categoryOf,
  detailsOf,
  itemBySlug,
  productHref,
  relatedTo,
  sizesOf,
  slugOf,
} from "@/data/details";

/*
 * One page per product, prerendered at build time. Every product the
 * catalog knows gets a page; any other slug is a 404 rather than an empty
 * template, so a mistyped or retired link lands on the branded not-found.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return ITEMS.map((i) => ({ slug: slugOf(i) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = itemBySlug(slug);
  if (!item) return {};
  const d = detailsOf(item);
  return {
    title: `${item.name.replace(/[™®]/g, "")} | ${item.maker}`,
    description: d.summary.slice(0, 158),
    alternates: { canonical: productHref(item) },
    openGraph: {
      title: item.name,
      description: d.summary,
      ...(item.img ? { images: [{ url: item.img }] } : {}),
    },
  };
}

const range = (min: number, max: number) => (min === max ? `${min}″` : `${min}″ to ${max}″`);

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = itemBySlug(slug);
  if (!item) notFound();

  const d = detailsOf(item);
  const cat = categoryOf(item);
  const apps = appsOf(item);
  const sizes = sizesOf(item);
  const related = relatedTo(item, 4);

  const specs: [string, string][] = [
    ["Part code", item.code],
    ["Manufacturer", item.maker],
    ["Product type", item.kind],
    ["Host pipe diameter", range(item.minD, item.maxD)],
    ["Cure method", item.cure === "N/A" ? "Not applicable" : item.cure],
    ["Applications", apps.map((a) => a.label).join(", ")],
    ["Sold", item.uom === "per ft" ? "By the foot" : "Each"],
    ["Availability", item.stock],
    ["Category", cat?.name ?? ""],
  ];

  /* Structured data for search. Prices are sample figures in this build,
     so no Offer is published: a rich result must not quote a price the
     counter would not honour. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    sku: item.code,
    brand: { "@type": "Brand", name: item.maker },
    category: cat?.name,
    description: d.summary,
    ...(item.img ? { image: `https://trenchlessdistro.com${item.img}` } : {}),
  };

  return (
    <PipeSizeProvider>
      <Header />
      <main id="main" className="flex-1 bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />

        <div className="mx-auto max-w-[88rem] px-4 pt-5 pb-14 sm:px-6 lg:px-8 lg:pt-8 lg:pb-24">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.875rem] text-body">
              <li>
                <Link href="/" className="rounded hover:text-cyan-dark">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li>
                <Link href="/#spec-finder" className="rounded hover:text-cyan-dark">
                  {cat?.name ?? "Catalog"}
                </Link>
              </li>
              {/* On a phone the page title sits right below, so the last
                  crumb would only repeat it on a line of its own. */}
              <li aria-hidden className="hidden sm:block">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="hidden min-w-0 truncate font-medium text-ink sm:block">
                {item.name}
              </li>
            </ol>
          </nav>

          <div className="mt-5 grid gap-8 lg:mt-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
            {/* The picture, on the soft well every card uses, with the
                three facts that decide most orders printed underneath. */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="group relative mx-auto aspect-[4/3] w-full max-w-[34rem] overflow-hidden rounded-3xl bg-mist ring-1 ring-line lg:max-w-none lg:aspect-square">
                <ProductArt
                  item={item}
                  sizes="(min-width: 1024px) 50vw, (min-width: 576px) 544px, 100vw"
                />
                {item.badge && (
                  <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[0.8125rem] font-semibold text-cyan-dark shadow-[var(--shadow-card)]">
                    {item.badge}
                  </span>
                )}
              </div>
              <dl className="mx-auto mt-3 grid max-w-[34rem] grid-cols-3 gap-2 lg:max-w-none">
                {[
                  ["Diameter", range(item.minD, item.maxD)],
                  ["Cure", item.cure === "N/A" ? "—" : item.cure],
                  ["Sold", item.uom === "per ft" ? "By the foot" : "Each"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-2xl bg-mist px-3 py-3 text-center sm:px-4">
                    <dt className="text-[0.75rem] font-medium text-body">{k}</dt>
                    <dd className="datum mt-0.5 font-head text-[0.9375rem] font-bold text-ink sm:text-base">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="min-w-0">
              <p className="eyebrow text-cyan-dark">{item.maker}</p>
              <h1 className="mt-2 text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.1] font-extrabold tracking-[-0.02em] text-ink">
                {item.name}
              </h1>
              <p className="mt-2 text-[0.9375rem] text-body">
                {item.kind} &middot; <span className="datum">Part {item.code}</span>
              </p>

              <div className="mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-y border-line py-5">
                <div>
                  <p className="flex items-baseline gap-2">
                    <span className="datum font-head text-[2rem] leading-none font-extrabold text-ink">
                      ${item.price}
                    </span>
                    <span className="text-[0.9375rem] text-body">{item.uom}</span>
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] text-body">
                    List price. Your quote reflects contractor pricing and freight.
                  </p>
                </div>
                <p className="flex items-center gap-2 text-[0.9375rem] font-semibold text-ink">
                  <span
                    className={`size-2.5 rounded-full ${
                      item.stock === "In stock" ? "bg-ok" : item.stock === "Low stock" ? "bg-amber-500" : "bg-line-strong"
                    }`}
                    aria-hidden
                  />
                  {item.stock}
                  <span className="font-normal text-body">&middot; Puyallup, WA</span>
                </p>
              </div>

              <p className="mt-6 text-[1.0625rem] leading-relaxed text-body">{d.summary}</p>

              <ProductBuy item={item} sizes={[...sizes]} />

              <ul className="mt-6 grid gap-2.5 rounded-2xl bg-mist p-4 text-[0.9375rem] sm:grid-cols-2 sm:p-5">
                {[
                  [ShieldCheck, "Quoted the same business day"],
                  [Freight, "Freight nationwide or will call"],
                  [HardHat, "Training on the gear we sell"],
                  [Wrench, "Repairs and service in-house"],
                ].map(([Icon, label]) => {
                  const I = Icon as typeof ShieldCheck;
                  return (
                    <li key={label as string} className="flex items-center gap-2.5 text-ink">
                      <I className="size-5 shrink-0 text-cyan-dark" aria-hidden />
                      {label as string}
                    </li>
                  );
                })}
              </ul>

              <a
                href="tel:+12533685614"
                className="group mt-4 w-full gap-4 rounded-2xl border border-line p-4 hover:border-cyan-dark"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cyan-dark text-white">
                  <Phone className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 leading-snug">
                  <span className="block font-semibold text-ink">Not sure it fits the job?</span>
                  <span className="block text-[0.875rem] text-body">
                    Call <span className="datum font-semibold text-cyan-dark">253-368-5614</span>, Mon&ndash;Fri 7:00&ndash;4:30 PT
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* The detail, in the order a buyer reads it: what it does, the
              numbers, where it is used. */}
          <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 lg:pt-14 xl:gap-20">
            <section aria-labelledby="pdp-features">
              <h2 id="pdp-features" className="text-[length:var(--text-h3)] font-bold text-ink">
                Key features
              </h2>
              <ul className="mt-5 space-y-3.5">
                {d.features.map((f) => (
                  <li key={f} className="flex gap-3 text-[1rem] text-ink">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-cyan-dark/10 text-cyan-dark">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 text-[length:var(--text-h3)] font-bold text-ink">Used for</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {apps.map((a) => (
                  <li key={a.id} className="rounded-xl border border-line px-4 py-3">
                    <span className="block font-semibold text-ink">{a.label}</span>
                    <span className="block text-[0.8125rem] text-body">{a.hint}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="pdp-specs">
              <h2 id="pdp-specs" className="text-[length:var(--text-h3)] font-bold text-ink">
                Specifications
              </h2>
              <dl className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line">
                {specs.map(([k, v], i) => (
                  <div
                    key={k}
                    className={`grid grid-cols-[minmax(0,10rem)_minmax(0,1fr)] gap-4 px-4 py-3 text-[0.9375rem] sm:px-5 ${
                      i % 2 ? "bg-white" : "bg-mist/60"
                    }`}
                  >
                    <dt className="text-body">{k}</dt>
                    <dd className={`font-medium text-ink ${k === "Part code" ? "datum" : ""}`}>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 flex gap-2.5 text-[0.875rem] text-body">
                <SpecSheet className="mt-0.5 size-4.5 shrink-0 text-cyan-dark" aria-hidden />
                <span>
                  Cure times, wet-out ratios and ratings are on the manufacturer&rsquo;s data
                  sheet. Ask for it with your quote and we will send the current revision.
                </span>
              </p>
            </section>
          </div>

          {related.length > 0 && (
            <section aria-labelledby="pdp-related" className="mt-14 lg:mt-20">
              <div className="flex items-end justify-between gap-4">
                <h2 id="pdp-related" className="text-[length:var(--text-h2)] text-ink">
                  Often quoted together
                </h2>
                <Link href="/#spec-finder" className="hidden shrink-0 font-semibold text-cyan-dark hover:text-cyan-deep sm:inline-flex">
                  Full catalog
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {related.map((r) => (
                  <ProductCard key={r.code} item={r} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
      <QuoteDrawer />
      <ChatWidget />
      <AccessibilityWidget />
    </PipeSizeProvider>
  );
}
