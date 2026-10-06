# Theme: "Trade Counter"

The visual system for trenchlessdistro.com. American industrial supply:
the look of a trade counter and a parts catalog, not a design studio.

## Who this is for

A trenchless contractor, typically 40–60, often on a phone in a truck, who
wants to know three things fast: do you have it, does it fit my pipe, and are
you going to compete with me for the install. Also Charlene in account
management, who needs the site to look like the company she works for.

**This rules out** the current web-design defaults: gradient headline text,
oversized expanded display type, mono labels used as decoration. Those read as
a startup, not a 35-year-old distributor.

**Amended, October 2026.** This section previously ruled out dark cinematic
heroes as well. The client asked for a video hero, so there is now exactly one:
a distribution-warehouse loop behind the headline, under an ink scrim. It is
scoped deliberately — the hero and one mid-page band are the only dark, moving
surfaces; every other section stays white-dominant with borders and no motion
beyond the settle-in reveal. The rule it replaces is weaker but still real:
*dark is punctuation, and there are two marks on the page.*

## Reference points

- **trenchlessdistro.com**, their own site. Structure, section order, product
  grouping and copy come from here. This is the 80%.
- **hammerheadtrenchless.com**, the competitor they named. White-dominant,
  dark text, accent blue, sans throughout, product-image-led, direct tone.

## Typography

| Role | Face | Why |
|---|---|---|
| Headings | **Libre Franklin** 600/700 | An open revival of Franklin Gothic (ATF, Morris Fuller Benton, 1902), the typeface of American trade catalogs, hardware signage and industrial price lists for a century. Established, not fashionable. |
| Body & UI | **Source Sans 3** 400/600 | Adobe's workhorse, drawn directly from Benton's ATF gothics (News Gothic, Franklin Gothic). Same family tree as the headings, built for screen legibility at small sizes. |

Two variable families from Google Fonts, subset to latin. No display face, no
monospace-as-decoration. Mono is used only where a value is genuinely tabular
(part codes, diameters, counts), via the stack's default mono.

Headings are set at realistic sizes. No `clamp()` running to 6rem.

## Colour

**Taken verbatim from trenchlessdistro.com.** Their site runs the Astra
WordPress theme, which declares its palette as CSS custom properties on
`:root`. These were read off the live site, not guessed from the logo.

| Our token | Hex | Their variable | Use | Contrast on white |
|---|---|---|---|---|
| `cyan` | `#0da6d0` | `--ast-global-color-0` | Brand accent on dark, large text, icons | 2.84 |
| `cyan-dark` | `#1b7489` | their own darker teal, one shade down | Links, buttons, small text | 5.38 |
| `purple` | `#b356c0` | `--ast-global-color-1` | Secondary accent, gradient rule | 4.19 |
| `ink` | `#161616` | `--ast-global-color-2` | Headings, dark bands, footer | 18.10 |
| `body` | `#4b4f58` | `--ast-global-color-3` | Body copy | 8.21 |
| `gray` | `#424242` | `--ast-global-color-7` | Tertiary text | 10.05 |
| `light` | `#f5f5f5` | `--ast-global-color-4` | Alternating sections | n/a |
| `light-alt` | `#f2f5f7` | `--ast-global-color-6` | n/a | n/a |
| `line` | `#dddddd` | `--ast-border-color` | Borders and rules | n/a |

**Nothing here is invented.** Where a brand colour could not carry small text
accessibly, the surface moved to white rather than the colour being altered:

- `#0da6d0` at 2.84:1 fails AA for body text, so it is never used for small
  text on white. `#1e809d`, which their own site already uses, carries that job.
- `#1e809d`, the value on their live site, clears 4.5:1 on white but only
  reaches **4.16:1 on `#f5f5f5`**. The original plan was to keep every use of
  it on white. That rule did not hold: the QA pass found eyebrows and links in
  `MostSearched`, `WhyUs`, `Gallery` and `EventsDocs` sitting on the grey
  sections and failing AA. Rather than police the rule across eight
  components, the token itself moved one shade down to **`#1b7489`** —
  5.38:1 on white, 4.93:1 on `#f5f5f5`, 4.91:1 on `#f2f5f7`. It is visually
  indistinguishable at these sizes and now has headroom on every surface.
- `#b356c0` at 4.19:1 is restricted to large text, icons and the gradient rule.

Stock status never relies on colour alone: the words "In stock", "Low stock"
and "Built to order" carry the meaning, with colour as reinforcement.

The logo gradient (`#b356c0` to `#0da6d0`) appears twice: a 3px rule under the
utility bar, and the same rule under the assistant's header. Never on text.

## Rules

1. White is the default background. Dark bands are punctuation, not the theme:
   the hero and the "stocked, picked, shipped" band, and nothing else.
2. Brand cyan never sits on white, `cyan-700` does.
3. Photography is the client's own, shown plainly, never tinted or overlaid
   with gradients beyond what legibility requires. Captions describe only what
   is visible in the frame. The warehouse *video* is licensed stock and is
   never captioned as their building.
4. Borders over shadows. A catalog has rules and gutters.
5. Every section states what it is in the first three words.

## Legibility

The audience skews 40 and older, often reading on a phone on a job site.

- Base type is **17px** at 1.65 line height, not the usual 16px.
- Every link, button and control clears a **44px** touch target.
- Form controls are 16px minimum so iOS Safari does not zoom on focus.
- Colour is never the only carrier of meaning.
- The assistant offers tappable suggested questions, so nobody has to think of
  a question or type one.
