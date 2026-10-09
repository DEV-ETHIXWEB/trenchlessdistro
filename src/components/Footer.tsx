import Image from "next/image";
import { CATEGORIES, MANUFACTURERS } from "@/data/catalog";
import EthixwebCredit from "./EthixwebCredit";
import Link from "next/link";

const COMPANY = [
  { href: "/#why-us", label: "About us" },
  { href: "/#support", label: "Training & demos" },
  { href: "/#support", label: "Technical support" },
  { href: "/#support", label: "Equipment repair" },
  { href: "/#events", label: "Events" },
  { href: "/#quote", label: "Contact" },
];

const ACCOUNT = [
  { href: "/#quote", label: "Request a quote" },
  { href: "/#quote", label: "Become a dealer" },
  { href: "/#quote", label: "Financing" },
  { href: "/#events", label: "Spec sheets & SDS" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* On desktop, lg:pb clears the round accessibility and assistant
          launchers in the bottom corners. On phones the dock's own rule in
          globals.css adds the clearance, so the padding here stays plain. */}
      <div className="mx-auto max-w-[88rem] px-4 pt-14 pb-6 sm:px-6 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="grid gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Image
              src="/brand/td-logo.webp"
              alt="Trenchless Distribution"
              width={300}
              height={86}
              className="h-12 w-auto"
            />
            <p className="mt-5 max-w-xs [overflow-wrap:anywhere] text-[0.9375rem] leading-relaxed text-white/70">
              A distributor of trenchless and CIPP materials, equipment and
              training. We supply the contractors who do the work. We do not
              perform installations.
            </p>
            <div className="mt-6 space-y-1.5 [overflow-wrap:anywhere]">
              <a
                href="tel:+12533685614"
                className="datum block text-lg font-semibold hover:text-cyan"
              >
                253-368-5614
              </a>
              <a
                href="mailto:sales@trenchlessdistro.com"
                className="block text-[0.9375rem] text-white/70 hover:text-cyan"
              >
                sales@trenchlessdistro.com
              </a>
              <a
                href="mailto:operations@trenchlessdistro.com"
                className="block text-[0.9375rem] text-white/70 hover:text-cyan"
              >
                operations@trenchlessdistro.com
                <span className="ml-2 text-[0.8125rem] text-white/70">Dealers</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-5 gap-y-8 [&>*]:min-w-0 md:grid-cols-4">
            <nav aria-label="Shop">
              <p className="eyebrow text-cyan">Shop</p>
              <ul className="mt-3">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link href="/#categories" className="text-[0.9375rem] text-white/70 hover:text-white">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Company">
              <p className="eyebrow text-cyan">Company</p>
              <ul className="mt-3">
                {COMPANY.map((c) => (
                  <li key={c.label}>
                    <a href={c.href} className="text-[0.9375rem] text-white/70 hover:text-white">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Customer">
              <p className="eyebrow text-cyan">Customer</p>
              <ul className="mt-3">
                {ACCOUNT.map((c) => (
                  <li key={c.label}>
                    <a href={c.href} className="text-[0.9375rem] text-white/70 hover:text-white">
                      {c.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="eyebrow text-cyan">Brands</p>
              <ul className="mt-3">
                {MANUFACTURERS.map((m) => (
                  <li key={m.name} className="flex min-h-11 items-center text-[0.9375rem] text-white/70">
                    {m.name}
                  </li>
                ))}
              </ul>
              <p className="eyebrow mt-7 text-cyan">Hours</p>
              <p className="mt-3 text-[0.9375rem] text-white/70">
                Mon&ndash;Fri 7:00&ndash;4:30 PT
                <br />
                Will call &amp; nationwide freight
                <br />
                Puyallup, WA
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-[0.8125rem] text-white/55 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Trenchless Distribution. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>Homepage design concept, for review</p>
            <EthixwebCredit tone="dark" />
          </div>
        </div>
      </div>
    </footer>
  );
}
