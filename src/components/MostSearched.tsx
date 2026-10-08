import Image from "next/image";
import { FEATURED, ITEMS } from "@/data/catalog";
import { ArrowRight, StockDot } from "./icons";
import Reveal from "./Reveal";

const STOCK_TONE: Record<string, string> = {
  "In stock": "text-cyan-dark",
  "Low stock": "text-gray",
  "Built to order": "text-body",
};

/* Price and stock live on the catalog item, the photograph lives on the
   featured entry. Joining them here keeps one source for each. */
const detail = (code: string) => ITEMS.find((i) => i.code === code);

/*
 * The shelf.
 *
 * This was a five-across grid of thumbnails, which is how you show a
 * catalogue to someone who already knows it. The first three now run at
 * roughly double the size with the price and the stock state on the card,
 * because the product photograph is the thing that sells here and a
 * contractor sorts by availability before anything else.
 */
export default function MostSearched() {
  const [first, second, third, ...rest] = FEATURED;
  const big = [first, second, third];

  return (
    <section
      id="most-searched"
      aria-labelledby="most-searched-title"
      className="border-b border-line bg-light"
    >
      <div className="mx-auto max-w-[80rem] px-4 py-14 lg:px-6 lg:py-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="eyebrow text-cyan-dark">On the shelf</p>
            <h2 id="most-searched-title" className="mt-3 text-[length:var(--text-h2)] text-ink">
              The lines that move every week, in stock in Puyallup.
            </h2>
          </div>
          <a
            href="#spec-finder"
            className="group inline-flex items-center gap-2 font-semibold text-cyan-dark hover:text-ink"
          >
            See all products and prices
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </a>
        </Reveal>

        {/* Three hero products, photographed large. */}
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {big.map((product, i) => {
            const d = detail(product.code);
            return (
              <Reveal as="li" key={product.name} delay={i * 0.06}>
                <a
                  href="#spec-finder"
                  className="group flex h-full flex-col border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan-dark hover:shadow-[0_18px_42px_-20px_rgba(14,26,34,0.45)]"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-white">
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 26rem, (min-width: 640px) 50vw, 100vw"
                      className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-line p-5">
                    <p className="eyebrow text-body">{product.maker}</p>
                    <h3 className="mt-2 text-[length:var(--text-h3)] text-ink group-hover:text-cyan-dark">
                      {product.name}
                    </h3>
                    <p className="datum mt-2 text-[0.875rem] text-body">{product.spec}</p>
                    {d && (
                      <p className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                        <span className="datum text-lg font-bold text-ink">
                          ${d.price}
                          <span className="ml-1.5 text-[0.8125rem] font-normal text-body">
                            {d.uom}
                          </span>
                        </span>
                        <span
                          className={`flex items-center gap-1.5 text-[0.875rem] font-semibold whitespace-nowrap ${STOCK_TONE[d.stock]}`}
                        >
                          <StockDot className="size-4 shrink-0" aria-hidden />
                          {d.stock}
                        </span>
                      </p>
                    )}
                  </div>
                </a>
              </Reveal>
            );
          })}
        </ul>

        {/* The rest of the shelf, still large enough to read the label. */}
        <ul className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {rest.map((product, i) => {
            const d = detail(product.code);
            return (
              <Reveal as="li" key={product.name} delay={(i % 4) * 0.04}>
                <a
                  href="#spec-finder"
                  className="group flex h-full flex-col border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan-dark hover:shadow-[0_14px_34px_-18px_rgba(14,26,34,0.4)]"
                >
                  <div className="relative aspect-square overflow-hidden bg-white">
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 19rem, 50vw"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-line p-4">
                    <p className="eyebrow text-body">{product.maker}</p>
                    <h3 className="mt-2 text-[0.9375rem] leading-snug font-semibold text-ink group-hover:text-cyan-dark">
                      {product.name}
                    </h3>
                    {d && (
                      <p className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                        <span className="datum font-bold text-ink">${d.price}</span>
                        <span
                          className={`flex items-center gap-1 text-[0.8125rem] font-semibold whitespace-nowrap ${STOCK_TONE[d.stock]}`}
                        >
                          <StockDot className="size-3.5 shrink-0" aria-hidden />
                          {d.stock}
                        </span>
                      </p>
                    )}
                  </div>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
