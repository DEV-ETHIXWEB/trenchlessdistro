# Trenchless Distribution — homepage

Design concept for client review, built as the real foundation of the site
rather than a throwaway mockup.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static prerender
```

---

## The two problems this page is built to solve

From Charlene Lundgren's brief:

1. **"We have no recognizable online presence."** Addressed structurally — the
   page is statically prerendered, semantically marked up, and ships
   `Organization` + `Wholesaler` + `FAQPage` JSON-LD so Google and AI answer
   engines can state what this company is.
2. **"Our site gives the impression that we perform installations."** Addressed
   editorially, in the three places a visitor cannot miss:
   - the utility bar above the logo: *Distributor only — we supply
     contractors, we never bid against them*
   - the H1: **"We supply the crews. We never bid the job."**
   - a do / never-do ledger that puts "Bid or perform installation work" in
     the struck-through column.

   The same claim is repeated machine-readably in the FAQ schema, so an AI
   search result repeats the correction rather than the old impression.

---

## Design direction

Colour and type are taken from trenchlessdistro.com, not invented. The full
mapping and contrast audit is in `docs/THEME.md`; the short version:

| Token | Value | Role |
|---|---|---|
| `cyan` | `#0da6d0` | their primary, for accents on dark and large text |
| `cyan-dark` | `#1e809d` | their own darker teal, for anything small or clickable on white |
| `purple` | `#b356c0` | their secondary, used only in the logo-gradient rule |
| `ink` | `#161616` | headings, the hero, the footer |
| `body` | `#4b4f58` | body copy |
| `light` / `line` | `#f5f5f5` / `#dddddd` | alternating sections, borders |

**Type.** Libre Franklin for headings and Source Sans 3 for body — two
descendants of Benton's ATF gothics, the lettering of American trade catalogs.
Base size is 17px at 1.65, because the audience skews 40+ and often reads on a
phone on a job site.

**The hero.** A looping distribution-warehouse shot under an ink scrim, with
the pipe-size picker lifted onto the only white card on the screen. The video
is atmosphere; the picker is the thing we want a reaction to.

**The signature element: the spec finder.** A contractor does not think in
product categories, they think *"4-inch lateral, 60 feet, two 45s."* So the
hero opens on the diameter, and the finder further down carries that answer
over. It proves the catalog depth and prototypes the product filtering the
live site needs.

No competitor in trenchless owns this combination — MaxLiner is red, Apex is
blue and orange, HammerHead is orange and black.

---

## Video

Three clips were supplied in `Vid/`. Two are used, transcoded with macOS
`avconvert` (no ffmpeg on the build machine) to 960x540 H.264:

| File | Where | Length | Size |
|---|---|---|---|
| `warehouse-aisle.mp4` | hero | 6.5s | 3.7 MB |
| `pallet-jack.mp4` | "stocked, picked, shipped" band | 6.0s | 3.6 MB |

Each has a JPEG poster pulled from its own first frame. **The poster is the
real content:** it is a plain `<Image>`, it is what paints first, and it is the
only thing fetched when any of these are true —

- viewport under 768px,
- `prefers-reduced-motion: reduce`,
- `navigator.connection.saveData`, or `effectiveType` of 3g or worse,
- "Stop animation" switched on in the accessibility panel.

Off-screen sections do not attach their file until they are within 400px of
the viewport, and a video that scrolls out of view is paused. Every loop has a
visible pause control, because WCAG 2.2.2 requires one for anything that moves
for more than five seconds.

Measured on the production build, first load, before scrolling:

| | Desktop 1440 | Mobile 390 |
|---|---|---|
| Total | 5.0 MB | 1.0 MB |
| of which video | 3.8 MB | none |

**Known limit.** `avconvert` only exposes fixed presets, so the bitrate is
higher than these clips need. With ffmpeg available, the same two files
re-encoded at ~1.2 Mbps CRF would land near 1 MB each at the same visible
quality, and a WebM/VP9 sibling would cut it again. That is a 20-minute job
once ffmpeg is installed, and nothing in the code changes.

---

## Motion and feel

One set of curves, declared once in `globals.css` and shared by CSS and JS, so
the page decelerates with a single hand:

| Token | Curve | Used for |
|---|---|---|
| `--ease-glide` | `cubic-bezier(0.16, 1, 0.3, 1)` | the default: reveals, panels, the header |
| `--ease-swift` | `cubic-bezier(0.33, 1, 0.68, 1)` | short colour and border changes |
| `--ease-drawer` | `cubic-bezier(0.65, 0, 0.35, 1)` | things that open and close |
| `--ease-press` | `cubic-bezier(0.34, 1.4, 0.64, 1)` | the snap back off a button |

- **In-page links glide.** `scroll-behavior: smooth` is deliberately *not*
  used: the browser's curve is a short fixed ramp that reads as a yank on a
  page this tall. `Interactions.tsx` runs an eased scroll instead, 420–1100ms
  scaled to the distance, aborting the moment the visitor touches the wheel,
  and handing focus to wherever it landed so keyboard users travel too.
- **Every interactive surface shares one transition** on named properties
  only — never `all`, which is where hover jank comes from.
- **Buttons press.** 1.5% scale, 70ms in on `--ease-press`, eased back out.
- **Panels grow from the button that opened them** rather than appearing, and
  animate back out on close.
- **The header tightens and lifts** once the page has moved, read inside
  `requestAnimationFrame` so a fast scroll cannot queue a layout read per event.

### Click sounds

Buttons and links tick on `pointerdown`, so the sound lands with the finger
rather than after it. There is no audio file: the tick is synthesised in
`src/lib/sound.ts` from a bandpass-filtered noise transient plus a short sine
body, about 45ms at 0.05 gain. Pitch carries meaning — a toggle switching on
rises, switching off falls, and travelling to a section is softer than both.

It is on by default and **"Mute click sounds" is the fifth control in the
accessibility panel**. Muting suspends the audio context outright; unmuting
plays one tick to confirm itself, since the press that did it happened while
the page was still silent.

> **Recommendation.** Sound on by default is the riskier choice for a trade
> audience — someone opening this at 7am in a shared office will not thank us.
> It is built exactly as asked and the mute is one tap away, but flipping the
> default to off (one word in `DEFAULTS`, `src/lib/a11y.ts`) is worth
> considering before this goes in front of the client.

---

## Build credit

`EthixwebCredit` places *Powered by Ethixweb* at the foot of the assistant
panel, the accessibility panel and the site footer — the two things this
studio built, plus the one conventional place for a credit. It never appears
inside the client's own content areas.

The label is set at 11px, semibold, 0.13em tracked, in a colour that clears
AA on both surfaces; only the wordmark itself is held back on opacity, and it
lifts to full on hover. An earlier pass faded the whole credit to 55%, which
dropped the label to 4.39:1 on the footer and failed the contrast audit —
subtlety here comes from size and weight, not from fading text.

The wordmark ships once as black on transparent; the footer uses the same file
inverted, so there is no second asset to keep in step.

---

## Accessibility

Two things, both real rather than decorative.

**The floating panel** (bottom-left) writes `data-a11y-*` attributes on
`<html>`; everything after that is CSS. It offers text size at 100/112/125/145
percent, Atkinson Hyperlegible (drawn by the Braille Institute for low-vision
readers), higher contrast, underlined links, and stop-animation. Choices
persist per browser and are replayed by an inline script before first paint,
so a returning visitor never sees a frame at the wrong size. It composes with
the visitor's own OS settings instead of overriding them.

**The page underneath it** is built to not need the panel: 0 axe-core
violations at 1440px and 390px with both panels open, 44px touch targets,
`prefers-reduced-motion` honoured, a skip link, visible focus rings, and
status never carried by colour alone.

---

## SEO

- Static prerender; five routes, all prerendered at build.
- `sitemap.xml` and `robots.txt` generated from code.
- A generated `opengraph-image` (1200x630) built from the page's own tokens.
- One JSON-LD `@graph`: `Organization` + `Wholesaler`, `WebSite`, `WebPage`,
  an `ItemList` of the seven categories, and a five-question `FAQPage`.
  The claim that matters commercially — distributor, not installer — is stated
  in three machine-readable places so an AI answer engine repeats the
  correction rather than the old impression.
- Address, opening hours and telephone are marked up, which is what local and
  "near me" results read.

---

## Stack, and why each piece survives the next five years

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router, React 19) | Static today, dynamic per-route when the catalog and cart arrive. No rebuild to add e-commerce. |
| Language | **TypeScript** | The product schema (UOM, diameter, cure) is typed once and shared by site, CMS and inventory sync. |
| Styling | **Tailwind CSS v4** | Tokens live in CSS custom properties, so a brand refresh is a token edit, not a refactor. |
| Motion | **Motion** (`motion/react`) | Layout animation in the spec finder; respects `prefers-reduced-motion`. |
| Icons | **lucide-react** | Tree-shaken, no icon-font payload. |

**Future-proofing, concretely:**

- **E-commerce without a rebuild.** Products already flow from one typed source
  (`src/data/catalog.ts`). Swapping that module for a commerce API changes the
  data layer, not a single component. This is the "built from the beginning
  with future e-commerce capabilities" requirement, satisfied structurally.
- **Ownership.** Plain Next.js on open-source dependencies. It deploys to
  Vercel, AWS, or the client's own server. Nothing here is locked to our
  hosting — which directly answers their stated concern about being blocked
  from their own site if they change agencies.
- **SEO / GEO / AEO.** Static prerender, real heading hierarchy, canonical and
  OpenGraph metadata, and JSON-LD that names the company a wholesaler.
- **One product database.** The same typed catalog feeds the website, the
  future store, and the inventory system's sync — not three separate lists.

---

## Quality floor (verified, not asserted)

- **axe-core: 0 violations** at 1440px and 390px.
- Keyboard navigable throughout; focus rings legible on both light and dark
  surfaces; skip link to `#main`.
- `prefers-reduced-motion` disables the cure-train sweep, the ticker and the
  row transitions.
- Responsive to 390px, no horizontal scroll.
- Static prerender, no client-side data fetching on first paint.

---

## What is placeholder, and flagged as such on the page

- Part codes, SKU counts, stock states, document counts and event dates are
  schematic sample data. The spec finder says so in its own footer.
- Product family names and manufacturers are real (taken from
  trenchlessdistro.com, MaxLiner and Apex CIPP).
- Manufacturer logos are set as type; real logos need written brand permission.
- The quote form is a front-end demo — no backend is wired.
- The Puyallup address and hours are assumed from the 253 area code and need
  confirming.
- **The warehouse video is licensed stock footage, not their building.** It is
  used as atmosphere and is never captioned as their floor. If they want their
  own warehouse on the hero, we need roughly 20 seconds of footage from them;
  until then this is a placeholder like the part numbers are.
- Photographs are theirs, pulled from their media library at the largest size
  it holds. Two pairs in that library turned out to be duplicate encodings of
  the same shot, and one image used as a "warehouse" background is a CGI
  render, not a photograph — it is now named `pipes-abstract.webp` and used
  only as a dim backdrop behind the quote form. Captions were rewritten to
  describe what is actually in each frame.

---

## Build scope after sign-off

**Phase 1 — Website (the 6–8 week build already quoted)**
Catalog browse and category pages · individual product pages with specs,
brochures, SDS/TDS, manuals and video · manufacturer pages · training, demos
and technical-support pages · events and news · quote and info request
routing · a CMS so the client adds products, documents and events themselves ·
GA4 and Search Console · sitemap and robots.

**Phase 2 — Google and online presence**
Google Business Profile claimed and corrected to *distributor* · categories,
services, products and photos · Search Console and Analytics connected ·
local and industry citations · Google Ads if they want paid lead flow.

**Phase 3 — Social and ongoing content**
Facebook and Instagram on a real calendar, fed by their photos and videos:
promotions, demos, training, new lines, product education, technical tips,
equipment repair, company news — cross-posted to site, email and Google.

**Phase 4 — Inventory and barcode**
Barcode generation and scanning for receiving, picking, movement, counts and
adjustments · multiple units of measure (foot, pound, pail, roll, unit) ·
purchase orders · reorder points · cost history and landed cost ·
customer-specific pricing · valuation and margin reporting · QuickBooks Online
sync · and a product feed shared with the website so there is one database.

**Phase 5 — E-commerce**
Online ordering switched on over the catalog and inventory already in place.
