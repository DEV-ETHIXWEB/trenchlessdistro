import { APPLICATIONS, CATEGORIES, DIAMETERS, ITEMS, type Item } from "./catalog";

/*
 * What a product page says beyond the card: a plain overview and the four
 * things a buyer checks first. Written the way a counter rep would describe
 * the product on the phone, and deliberately free of numbers we cannot
 * stand behind -- wet-out ratios, cure times and pressure ratings belong to
 * the manufacturer's data sheet, and the page sends people there for them.
 *
 * Sample copy for the design review, like the rest of the catalog; the real
 * descriptions come over with the catalog export.
 */
const DETAILS: Record<string, { summary: string; features: string[] }> = {
  "ML-FLX": {
    summary:
      "A flexible felt liner for laterals and vertical stacks, built to turn through bends and transitions that stop a stiffer tube. Wet it out with ambient-cure epoxy and invert it with the drum or gun you already run.",
    features: [
      "Negotiates 45° and 90° bends in small-diameter lines",
      "Ambient cure, so no boiler or UV train on the truck",
      "Cut to the length you order, by the foot",
      "Pairs with MaxLiner epoxy and calibration tube",
    ],
  },
  "ML-SFX": {
    summary:
      "MaxLiner's most flexible tube, for the multi-bend laterals and stacks where an ordinary liner wrinkles. It holds its shape through tight changes of direction and transitions between pipe sizes.",
    features: [
      "Made for lines with several bends in a row",
      "Handles size transitions inside one run",
      "Ambient cure with two-part epoxy",
      "Sold by the foot, cut to order",
    ],
  },
  "ML-SCR": {
    summary:
      "A reinforced liner tube with a SCRIM layer for strength across larger diameters and mainline work. The reinforcement keeps the tube stable during inversion and cure on longer runs.",
    features: [
      "SCRIM reinforcement for structural mainline and lateral work",
      "Steam cure for longer, larger-diameter runs",
      "Covers 4″ to 12″ host pipe",
      "Sold by the foot",
    ],
  },
  "ML-DRM": {
    summary:
      "An air-inversion drum that stores the wetted-out liner and drives it into the host pipe under controlled pressure. One operator can run a lateral shot from the cleanout.",
    features: [
      "Air inversion with pressure control at the drum",
      "Stores the wetted-out liner until the shot",
      "Wheeled frame for one-person moves on site",
      "Covers 2″ to 8″ lateral and small mainline work",
    ],
  },
  "ML-GUN": {
    summary:
      "A compact wetout and inversion unit for short laterals, stacks and point repairs, where a full drum is more machine than the job needs.",
    features: [
      "Wets out and inverts in one compact unit",
      "Suited to short shots and tight access",
      "Works across 2″ to 12″",
      "Ships with fittings for common launch setups",
    ],
  },
  "BR-PCO": {
    summary:
      "Brawo's UV lateral system for fast turnaround: the liner is cured with UV light rather than heat, so a lateral can be lined and back in service the same visit.",
    features: [
      "UV LED cure for same-visit turnaround",
      "Built for lateral connections and small mains",
      "Extended reach for longer laterals",
      "Training on the system available in Puyallup",
    ],
  },
  "IMS-MXC": {
    summary:
      "An LED curing train that travels through the liner and cures it with UV light. Fewer moving parts than a heat cure and a cure you can watch on the monitor.",
    features: [
      "LED light train for UV-cured liners",
      "Cure progress visible on the operator's monitor",
      "Fits 2″ to 12″ lines with the matching heads",
      "Serviced and repaired in-house",
    ],
  },
  "RS-UVP": {
    summary:
      "A UV-curing resin system for use with UV liners and LED cure trains. It stays workable until it meets the light, which gives the crew time to position the liner without racing a pot life.",
    features: [
      "Cures on UV exposure, not on the clock",
      "Matched to LED cure trains",
      "Long working window for positioning",
      "Sold by the kit",
    ],
  },
  "RS-EPX": {
    summary:
      "A two-part epoxy for ambient-cure lining. Mix, wet out and invert; it cures in place at ground temperature without a boiler or UV train.",
    features: [
      "Ambient cure, no heat source needed",
      "For felt liners and point repair",
      "Two-part, measured kits",
      "Winter and summer formulations available on request",
    ],
  },
  "PR-KIT": {
    summary:
      "Everything for a sectional point repair in one box: the patch material, resin and the bits a crew forgets. Fix a crack, an offset joint or a root intrusion without lining the whole run.",
    features: [
      "Complete kit for one sectional repair",
      "Ambient and UV versions",
      "Fixes cracks, offset joints and root intrusions",
      "Pairs with the sectional packer",
    ],
  },
  "PR-PKR": {
    summary:
      "An inflatable packer that carries the wetted-out patch to the defect and holds it against the pipe wall while it cures, then deflates and comes back out.",
    features: [
      "Carries the patch to the defect and holds it in place",
      "Inflates against the host pipe for an even repair",
      "Reusable job after job",
      "Sized for 2″ to 12″ lines",
    ],
  },
  "RB-DMB": {
    summary:
      "Dancutter's smallest robotic cutter, for reinstating laterals and removing obstructions in small-diameter lines after lining.",
    features: [
      "Reinstates service connections after lining",
      "Small enough for 2″ to 4″ lines",
      "Removes roots, scale and protruding taps",
      "Supported and repaired in-house",
    ],
  },
  "RB-DSF": {
    summary:
      "A flexible robotic cutter for mid-size lines with bends. It follows the pipe through changes of direction to reinstate connections and clear obstructions.",
    features: [
      "Flexible body for lines with bends",
      "Reinstatement and obstruction removal",
      "Covers mid-size lateral and mainline work",
      "Supported and repaired in-house",
    ],
  },
  "RB-DMX": {
    summary:
      "Dancutter's large-diameter flexible cutter, for reinstatement and milling in bigger lines where reach and cutting power matter.",
    features: [
      "Built for larger-diameter lines",
      "Reinstatement, milling and obstruction removal",
      "Flexible drive for bends",
      "Supported and repaired in-house",
    ],
  },
  "PP-CHN": {
    summary:
      "A chain knocker head for descaling and cleaning the host pipe before lining. A clean, round pipe is what lets a liner bond and cure properly.",
    features: [
      "Clears scale, roots and debris before lining",
      "Fits standard cable and flexshaft machines",
      "Wear part, stocked for quick reorder",
      "All common sizes",
    ],
  },
  "CT-CAL": {
    summary:
      "A calibration tube that sits inside the wetted-out liner during inversion and cure, pressing it evenly against the host pipe. It comes out once the cure is done.",
    features: [
      "Presses the liner evenly against the pipe wall",
      "Used with felt liners and ambient or steam cure",
      "Sold by the foot, cut to order",
      "Matched to MaxLiner tube sizes",
    ],
  },
  "IN-PSH": {
    summary:
      "A push camera for pre- and post-lining inspection of laterals and small lines: see the defect before you quote and show the finished liner after.",
    features: [
      "Pre-job inspection and post-cure verification",
      "Push rod sized for laterals and small mains",
      "Records for the customer report",
      "Repaired and serviced in-house",
    ],
  },
  "IN-REL": {
    summary:
      "A reel camera with a self-levelling head, so the picture stays upright as it travels. Built for longer lateral and mainline inspection runs.",
    features: [
      "Self-levelling head keeps the image upright",
      "Longer reel for mainline inspection",
      "Records for the customer report",
      "Repaired and serviced in-house",
    ],
  },
};

export const slugOf = (i: Item) =>
  i.name
    .toLowerCase()
    .replace(/[™®]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const productHref = (i: Item) => `/products/${slugOf(i)}`;

export const itemBySlug = (slug: string) => ITEMS.find((i) => slugOf(i) === slug);

export function detailsOf(i: Item) {
  return (
    DETAILS[i.code] ?? {
      summary: `${i.name} from ${i.maker}. Call the counter for the data sheet and a quote.`,
      features: [],
    }
  );
}

export const categoryOf = (i: Item) => CATEGORIES.find((c) => c.slug === i.cat);

export const appsOf = (i: Item) => APPLICATIONS.filter((a) => i.apps.includes(a.id));

export const sizesOf = (i: Item) => DIAMETERS.filter((d) => d >= i.minD && d <= i.maxD);

/*
 * Products for the same jobs or from the same shelf, the same rule the
 * quote list uses for "Often quoted together", so the two never disagree.
 */
export const relatedTo = (i: Item, n = 4) =>
  ITEMS.filter(
    (o) => o.code !== i.code && (o.cat === i.cat || o.apps.some((a) => i.apps.includes(a))),
  ).slice(0, n);
