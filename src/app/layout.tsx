import type { Metadata, Viewport } from "next";
import {
  Atkinson_Hyperlegible,
  Caveat,
  Inter,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { BOOT_SCRIPT } from "@/lib/a11y";
import Interactions from "@/components/Interactions";

/*
 * Plus Jakarta Sans for headings and Inter for running text, the pairing
 * the design references are set in: a geometric display face with open
 * counters, over a workhorse grotesk that holds up at 15px on a phone.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

/* The one handwritten line in the hero. A single weight, so it costs one
   small file. */
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-caveat",
  display: "swap",
});

/*
 * Atkinson Hyperlegible, from the Braille Institute, is drawn so that
 * characters that usually collapse into each other at low vision stay
 * distinct. It is only applied when a visitor turns on "easier-to-read font"
 * in the accessibility panel, so it is deliberately not preloaded: the file is
 * fetched the first time a rule actually matches it.
 */
const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
  preload: false,
});

const SITE = "https://trenchlessdistro.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    // Kept under 70 characters so it is not truncated in search results.
    default: "Trenchless Distribution | CIPP & No-Dig Pipe Lining Supplier",
    template: "%s | Trenchless Distribution",
  },
  /*
   * Kept to roughly 155 characters. Google cuts a description near 160 and
   * the old one ran to 275, so the sentence that mattered most, that we
   * supply contractors rather than compete with them, was the part being
   * truncated away.
   */
  description:
    "CIPP and no-dig pipe lining supplies: liners, resin, UV curing, robotics and cameras, with training and repair. We supply contractors, we do not install.",
  applicationName: "Trenchless Distribution",
  authors: [{ name: "Trenchless Distribution", url: SITE }],
  creator: "Trenchless Distribution",
  publisher: "Trenchless Distribution",
  category: "Industrial supply",
  keywords: [
    "CIPP distributor",
    "trenchless supply",
    "no-dig pipe lining supplies",
    "CIPP liner supplier",
    "UV CIPP curing system",
    "MaxLiner distributor",
    "CIPP resin supplier",
    "trenchless equipment repair",
    "CIPP installer training",
    "pipe lining supplier Washington",
    "sectional point repair kits",
    "robotic reinstatement cutter supplier",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Trenchless Distribution",
    locale: "en_US",
    title: "No-dig pipe lining technology, stocked and supported.",
    description:
      "A full-service distributor of CIPP materials, equipment and training. We supply the contractors who do the work.",
  },
  twitter: {
    card: "summary_large_image",
    title: "No-dig pipe lining technology, stocked and supported.",
    description:
      "A full-service distributor of CIPP materials, equipment and training. We supply the contractors who do the work.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#13212a",
  colorScheme: "light",
  // Never trap a visitor at one zoom level.
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

const PHONE = "+1-253-368-5614";

/*
 * One @graph so every node can cross-reference by @id rather than repeating
 * itself. The claim that matters commercially - that this is a wholesaler and
 * not an installer - is stated in three machine-readable places: the
 * Organization type, its description, and the FAQ.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "Wholesaler"],
      "@id": `${SITE}/#org`,
      name: "Trenchless Distribution",
      url: SITE,
      logo: `${SITE}/brand/td-logo.webp`,
      image: `${SITE}/img/equipment-lineup.webp`,
      description:
        "Distributor of trenchless and CIPP pipe rehabilitation materials, equipment and training. Trenchless Distribution supplies contractors and does not perform pipe installation or rehabilitation work.",
      telephone: PHONE,
      email: "sales@trenchlessdistro.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Puyallup",
        addressRegion: "WA",
        addressCountry: "US",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "07:00",
          closes: "16:30",
        },
      ],
      areaServed: { "@type": "Country", name: "United States" },
      slogan: "If it doesn't work with us, it doesn't work.",
      knowsAbout: [
        "Cured-in-place pipe (CIPP)",
        "UV CIPP curing",
        "Trenchless pipe rehabilitation",
        "Robotic reinstatement cutting",
        "Sewer inspection equipment",
        "Sectional point repair",
      ],
      makesOffer: {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "CIPP installer training and product demonstrations",
        },
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Trenchless Distribution",
      inLanguage: "en-US",
      publisher: { "@id": `${SITE}/#org` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE}/#webpage`,
      url: SITE,
      name: "CIPP & No-Dig Pipe Lining Supplier and Distributor",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#org` },
      primaryImageOfPage: `${SITE}/img/equipment-lineup.webp`,
    },
    {
      "@type": "ItemList",
      "@id": `${SITE}/#categories`,
      name: "Product categories",
      itemListElement: [
        "CIPP lining systems",
        "CIPP UV lining systems",
        "Robotics & milling",
        "CIPP materials",
        "CIPP patch repair",
        "Inspection cameras",
        "Accessories & parts",
      ].map((name, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Does Trenchless Distribution install pipe lining?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Trenchless Distribution is a distributor. We supply materials, equipment, training and support to the contractors who perform the work, and we do not bid or perform installations.",
          },
        },
        {
          "@type": "Question",
          name: "What does Trenchless Distribution supply?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CIPP lining systems, UV lining systems, resins and liners, point repair kits, robotic cutters and milling equipment, inspection cameras, and accessories and replacement parts.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer training, demos and equipment repair?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We run installer training and product demonstrations, provide technical and product support, perform minor equipment repair and troubleshooting, and coordinate manufacturer support.",
          },
        },
        {
          "@type": "Question",
          name: "What pipe diameters do you carry liner and resin for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We stock lining systems, liner tube, calibration tube and resin for 2-inch through 12-inch host pipe, across ambient, steam and UV LED cure methods.",
          },
        },
        {
          "@type": "Question",
          name: "Where is Trenchless Distribution located and what are the hours?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Puyallup, Washington, open Monday to Friday 7:00 to 4:30 Pacific, with will-call pickup and nationwide freight on stocked lines. Call 253-368-5614.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${inter.variable} ${caveat.variable} ${atkinson.variable} h-full antialiased`}
      // The boot script sets data-a11y-* on this element before React
      // hydrates, which is the whole point of it.
      suppressHydrationWarning
    >
      <head>
        {/* Runs while <head> is parsed, before first paint, so a returning
            visitor never sees one frame at the wrong text size. */}
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          // '<' is escaped so no future string value can close this script tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main"
          className="eyebrow sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
        >
          Skip to content
        </a>
        {/* Eased in-page scrolling and the click tick, delegated globally. */}
        <Interactions />
        {children}
      </body>
    </html>
  );
}
