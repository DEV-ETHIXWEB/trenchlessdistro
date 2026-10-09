/*
 * Sample catalog data for the homepage design review.
 * Product families, manufacturers and categories are taken from
 * trenchlessdistro.com and the manufacturers Trenchless Distribution
 * distributes for. Part codes, stock states and counts are schematic
 * placeholders to be replaced by the real catalog export.
 */

export type Application =
  | "lateral"
  | "mainline"
  | "point-repair"
  | "vertical"
  | "prep"
  | "inspection";

export const APPLICATIONS: { id: Application; label: string; hint: string }[] = [
  { id: "lateral", label: "Lateral lining", hint: "House-to-main service lines" },
  { id: "mainline", label: "Mainline lining", hint: "Municipal and commercial mains" },
  { id: "point-repair", label: "Point repair", hint: "Spot fixes and sectional patches" },
  { id: "vertical", label: "Vertical stack", hint: "Risers and roof drains" },
  { id: "prep", label: "Cleaning & prep", hint: "Descaling, cutting, reinstatement" },
  { id: "inspection", label: "Inspection", hint: "Pre- and post-cure verification" },
];

export const DIAMETERS = [2, 3, 4, 6, 8, 10, 12] as const;

export type Cure = "Ambient" | "Steam" | "UV LED" | "Hot water" | "N/A";

export type Item = {
  code: string;
  name: string;
  maker: string;
  cure: Cure;
  minD: number;
  maxD: number;
  uom: string;
  apps: Application[];
  stock: "In stock" | "Low stock" | "Built to order";
  /*
   * Indicative list price in USD, per the item's unit of measure. Schematic
   * like every other number in this file, and the table says so in plain
   * words underneath. Contractors sort by price before they sort by
   * anything else, so the column has to exist for the layout to be
   * reviewable at all.
   */
  price: string;
  /** What it is, in the words on a packing slip: "CIPP liner", "UV resin". */
  kind: string;
  /** The CATEGORIES slug it is shelved under. */
  cat: string;
  /** Product photograph. Items without one get a drawn tile instead. */
  img?: string;
  /** Merchandising flag on the card. Sample, like the prices. */
  badge?: "Best seller" | "Popular" | "New" | "Crew favourite";
};

export const ITEMS: Item[] = [
  {
    code: "ML-FLX",
    cat: "cipp-lining-systems",
    name: "Max FlexLiner™",
    maker: "MaxLiner",
    cure: "Ambient",
    minD: 2,
    maxD: 8,
    uom: "per ft",
    apps: ["lateral", "vertical"],
    price: "12.40",
    stock: "In stock",
    kind: "CIPP liner",
    img: "/img/flexliner.webp",
    badge: "Best seller",
  },
  {
    code: "ML-SFX",
    cat: "cipp-lining-systems",
    name: "Max SuperFlex™",
    maker: "MaxLiner",
    cure: "Ambient",
    minD: 2,
    maxD: 6,
    uom: "per ft",
    apps: ["lateral", "vertical"],
    price: "14.90",
    stock: "In stock",
    kind: "Multi-bend liner",
    img: "/img/superflex.webp",
  },
  {
    code: "ML-SCR",
    cat: "cipp-materials",
    name: "LinerTube Reinforced™ (SCRIM)",
    maker: "MaxLiner",
    cure: "Steam",
    minD: 4,
    maxD: 12,
    uom: "per ft",
    apps: ["mainline", "lateral"],
    price: "18.60",
    stock: "In stock",
    kind: "Reinforced liner",
    img: "/img/scrim.webp",
    badge: "Popular",
  },
  {
    code: "ML-DRM",
    cat: "cipp-lining-systems",
    name: "Max LinerDrum™ inversion system",
    maker: "MaxLiner",
    cure: "N/A",
    minD: 2,
    maxD: 8,
    uom: "each",
    apps: ["lateral", "mainline"],
    price: "9,850",
    stock: "Low stock",
    kind: "Inversion drum",
    img: "/img/linerdrum.webp",
    badge: "Crew favourite",
  },
  {
    code: "ML-GUN",
    cat: "cipp-lining-systems",
    name: "Max LinerGun® wetout unit",
    maker: "MaxLiner",
    cure: "N/A",
    minD: 2,
    maxD: 12,
    uom: "each",
    apps: ["lateral", "mainline", "point-repair"],
    price: "4,320",
    stock: "In stock",
    kind: "Wetout unit",
  },
  {
    code: "BR-PCO",
    cat: "cipp-uv-lining-systems",
    name: "Brawo® Pico Extended UV system",
    maker: "Brawo Systems",
    cure: "UV LED",
    minD: 2,
    maxD: 6,
    uom: "system",
    apps: ["lateral", "vertical"],
    price: "38,500",
    stock: "Built to order",
    kind: "UV lateral system",
    img: "/img/brawo-pico.webp",
    badge: "New",
  },
  {
    code: "IMS-MXC",
    cat: "cipp-uv-lining-systems",
    name: "IMS MAXICure LED curing train",
    maker: "IMS",
    cure: "UV LED",
    minD: 4,
    maxD: 12,
    uom: "system",
    apps: ["mainline", "lateral"],
    price: "44,900",
    stock: "Built to order",
    kind: "LED cure train",
    img: "/img/maxicure.webp",
  },
  {
    code: "RS-UVP",
    cat: "cipp-uv-lining-systems",
    name: "UV Plus resin system",
    maker: "Trenchless Distribution",
    cure: "UV LED",
    minD: 2,
    maxD: 12,
    uom: "per pail",
    apps: ["lateral", "mainline", "vertical"],
    price: "418",
    stock: "In stock",
    kind: "UV resin",
    img: "/img/maxlight-uv.webp",
  },
  {
    code: "RS-EPX",
    cat: "cipp-materials",
    name: "Two-part CIPP epoxy resin",
    maker: "MaxLiner",
    cure: "Ambient",
    minD: 2,
    maxD: 12,
    uom: "per pail",
    apps: ["lateral", "mainline", "point-repair", "vertical"],
    price: "286",
    stock: "In stock",
    kind: "Two-part epoxy",
    img: "/img/maxpox.webp",
    badge: "Popular",
  },
  {
    code: "PR-KIT",
    cat: "cipp-patch-repair",
    name: "Point repair kit, ambient & UV",
    maker: "Apex CIPP",
    cure: "Ambient",
    minD: 2,
    maxD: 8,
    uom: "kit",
    apps: ["point-repair"],
    price: "1,290",
    stock: "In stock",
    kind: "Point repair kit",
    img: "/img/point-repair-kit.webp",
  },
  {
    code: "PR-PKR",
    cat: "cipp-patch-repair",
    name: "Sectional packer assembly",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 3,
    maxD: 12,
    uom: "each",
    apps: ["point-repair"],
    price: "2,140",
    stock: "In stock",
    kind: "Sectional packer",
    img: "/img/liner-detail.webp",
  },
  {
    code: "RB-DMB",
    cat: "robotics-milling",
    name: "Dancutter Mini Bike robotic cutter",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 2,
    maxD: 4,
    uom: "each",
    apps: ["prep"],
    price: "7,640",
    stock: "Low stock",
    kind: "Robotic cutter",
  },
  {
    code: "RB-DSF",
    cat: "robotics-milling",
    name: "Dancutter Super Flex robotic cutter",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 3,
    maxD: 8,
    uom: "each",
    apps: ["prep"],
    price: "5,980",
    stock: "In stock",
    kind: "Robotic cutter",
  },
  {
    code: "RB-DMX",
    cat: "robotics-milling",
    name: "Dancutter Maxi Flex robotic cutter",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 6,
    maxD: 12,
    uom: "each",
    apps: ["prep"],
    price: "11,400",
    stock: "Built to order",
    kind: "Robotic cutter",
  },
  {
    code: "PP-CHN",
    cat: "accessories-parts",
    name: "Chain knocker descaling head",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 2,
    maxD: 12,
    uom: "each",
    apps: ["prep"],
    price: "268",
    stock: "In stock",
    kind: "Descaling head",
  },
  {
    code: "CT-CAL",
    cat: "cipp-materials",
    name: "Calibration tube",
    maker: "MaxLiner",
    cure: "N/A",
    minD: 2,
    maxD: 12,
    uom: "per ft",
    apps: ["lateral", "mainline", "vertical"],
    price: "3.10",
    stock: "In stock",
    kind: "Calibration tube",
    img: "/img/liner-rolls.webp",
  },
  {
    code: "IN-PSH",
    cat: "inspection-cameras",
    name: "Push inspection camera",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 2,
    maxD: 8,
    uom: "each",
    apps: ["inspection"],
    price: "6,450",
    stock: "In stock",
    kind: "Push camera",
  },
  {
    code: "IN-REL",
    cat: "inspection-cameras",
    name: "Self-levelling reel camera",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 4,
    maxD: 12,
    uom: "each",
    apps: ["inspection"],
    price: "9,120",
    stock: "Low stock",
    kind: "Reel camera",
  },
];

/*
 * `glyph` names an export from components/icons. `img` is a photograph from
 * their own library; the two categories without one (robotics, cameras) are
 * drawn rather than illustrated with a stand-in from another line.
 */
export const CATEGORIES: {
  slug: string;
  name: string;
  blurb: string;
  count: number;
  span: string;
  glyph: string;
  img?: string;
  feature?: boolean;
}[] = [
  {
    slug: "cipp-lining-systems",
    glyph: "InversionDrum",
    img: "/img/linerdrum.webp",
    name: "CIPP lining systems",
    blurb: "Flexible and reinforced liners, drums, guns and wetout gear.",
    count: 48,
    span: "2″–12″",
  },
  {
    slug: "cipp-uv-lining-systems",
    glyph: "UvCure",
    img: "/img/cat-uv.webp",
    name: "CIPP UV lining systems",
    blurb: "LED cure trains, UV liners and controllers for fast turnarounds.",
    count: 21,
    span: "2″–12″",
    feature: true,
  },
  {
    slug: "robotics-milling",
    glyph: "RoboticCutter",
    name: "Robotics & milling",
    blurb: "Reinstatement cutters, milling heads and control reels.",
    count: 34,
    span: "2″–12″",
  },
  {
    slug: "cipp-materials",
    glyph: "ResinPail",
    img: "/img/cat-resins.webp",
    name: "CIPP materials",
    blurb: "Resins, liner tube, SCRIM and calibration tube by the foot.",
    count: 76,
    span: "All sizes",
  },
  {
    slug: "cipp-patch-repair",
    glyph: "PatchRepair",
    img: "/img/point-repair-kit.webp",
    name: "CIPP patch repair",
    blurb: "Point repair kits, packers and fitting liners.",
    count: 29,
    span: "2″–12″",
  },
  {
    slug: "inspection-cameras",
    glyph: "PushCamera",
    name: "Inspection cameras",
    blurb: "Push and reel systems, locators, monitors and spares.",
    count: 23,
    span: "2″–12″",
  },
  {
    slug: "accessories-parts",
    glyph: "LinerRoll",
    img: "/img/cat-liners.webp",
    name: "Accessories & parts",
    blurb: "Fittings, hose, consumables and replacement wear parts.",
    count: 180,
    span: "All sizes",
  },
];

export const MANUFACTURERS = [
  { name: "MaxLiner", role: "Lining systems, resins, equipment" },
  { name: "Apex CIPP", role: "Robotics, cameras, point repair" },
  { name: "Brawo Systems", role: "UV lateral lining" },
  { name: "IMS", role: "LED curing systems" },
  { name: "Dancutter", role: "Robotic reinstatement cutters" },
  { name: "Picote", role: "Milling and coating" },
];

export const EVENTS = [
  {
    date: "2026-10-22",
    day: "22",
    month: "OCT",
    kind: "Hands-on demo",
    title: "UV lateral lining with Brawo Pico",
    where: "Trenchless Distribution, Puyallup, WA",
    seats: "6 of 12 seats left",
  },
  {
    date: "2026-11-05",
    day: "05",
    month: "NOV",
    kind: "Installer training",
    title: "MaxLiner two-day certification",
    where: "Trenchless Distribution, Puyallup, WA",
    seats: "Enrolling now",
  },
  {
    date: "2026-11-19",
    day: "19",
    month: "NOV",
    kind: "Open house",
    title: "Robotics & milling day with Dancutter",
    where: "Trenchless Distribution, Puyallup, WA",
    seats: "Free to attend",
  },
];

export const SUPPORT = [
  {
    title: "Installer training",
    body: "Manufacturer-backed certification plus crew refreshers, run on real pipe at our facility or yours.",
    meta: "1–2 day formats",
  },
  {
    title: "Product demos",
    body: "Try a system before you buy it. We bring the equipment, the liner and the resin, and we run it with your crew.",
    meta: "On-site or in-shop",
  },
  {
    title: "Technical support",
    body: "Call the people who stock the part. Spec help, cure schedules, troubleshooting and manufacturer escalation.",
    meta: "Phone & on-site",
  },
  {
    title: "Equipment repair",
    body: "Minor repair, service and diagnostics on cutters, reels, pumps and cure gear so the truck gets back out.",
    meta: "In-house bench",
  },
];

export const RESOURCES = [
  { label: "Spec sheets", count: 214, note: "Per product and diameter" },
  { label: "SDS & TDS", count: 96, note: "Current revisions" },
  { label: "Manuals", count: 58, note: "Equipment and controllers" },
  { label: "Install videos", count: 41, note: "Short, job-site format" },
];

/*
 * Featured products, using Trenchless Distribution's own product photography.
 * Names and manufacturers are taken from their current site.
 */
/*
 * The shelf, in display order. `code` joins each photograph to its catalog
 * item so price and stock have exactly one home. Typed rather than inferred:
 * a missing code should be a build error, not a card that quietly renders
 * without a price.
 */
export const FEATURED: {
  img: string;
  name: string;
  code: string;
  maker: string;
  spec: string;
}[] = [
  {
    img: "/img/flexliner.webp",
    name: "Max FlexLiner™",
    code: "ML-FLX",
    maker: "MaxLiner",
    spec: "2″–8″ · per ft · ambient cure",
  },
  {
    img: "/img/superflex.webp",
    name: "Max SuperFlex™",
    code: "ML-SFX",
    maker: "MaxLiner",
    spec: "2″–6″ · per ft · multi-bend",
  },
  {
    img: "/img/scrim.webp",
    name: "LinerTube Reinforced™ (SCRIM)",
    code: "ML-SCR",
    maker: "MaxLiner",
    spec: "4″–12″ · per ft · steam cure",
  },
  {
    img: "/img/linerdrum.webp",
    name: "MAX LinerDrum™ inversion system",
    code: "ML-DRM",
    maker: "MaxLiner",
    spec: "2″–8″ · each · cart mounted",
  },
  {
    img: "/img/maxpox.webp",
    name: "MaxPox™ resin A + B",
    code: "RS-EPX",
    maker: "MaxLiner",
    spec: "All sizes · per pail · two-part epoxy",
  },
  {
    img: "/img/maxlight-plus.webp",
    name: "MaxLight™ Plus resin",
    code: "RS-UVP",
    maker: "MaxLiner",
    spec: "All sizes · per pail · UV cure",
  },
  {
    img: "/img/maxlight-uv.webp",
    name: "MaxLight UV resin systems",
    code: "RS-UVP",
    maker: "MaxLiner",
    spec: "2″–12″ · system · UV LED",
  },
  {
    img: "/img/maxicure.webp",
    name: "IMS MAXICure LED package",
    code: "IMS-MXC",
    maker: "IMS",
    spec: "4″–12″ · system · LED cure train",
  },
  {
    img: "/img/brawo-pico.webp",
    name: "BRAWO® Pico SX",
    code: "BR-PCO",
    maker: "Brawo Systems",
    spec: "2″–6″ · system · UV lateral",
  },
  {
    img: "/img/point-repair-kit.webp",
    name: "Point repair & pipe patch kit",
    code: "PR-KIT",
    maker: "Apex CIPP",
    spec: "2″–8″ · kit · ambient & UV",
  },
];


/* ---------------------------------------------------------------------------
 * Content below is taken from trenchlessdistro.com, close to verbatim.
 * This is the 80%: their structure, their claims, their words.
 * ------------------------------------------------------------------------ */

/** The three trust signals their current hero carries. */
export const TRUST = [
  { k: "35+ years", v: "Industry experience" },
  { k: "Products & training", v: "That last a lifetime" },
  { k: "Financing", v: "Available for qualified customers" },
];

/** Their "Collection" showcase: three ways people shop this catalog. */
export const COLLECTIONS = [
  {
    name: "MaxLiner®",
    img: "/img/drum-hero.webp",
    alt: "MAX LinerDrum inversion system on its wheeled cart",
    body: "The industry’s most comprehensive solution for rehabilitating lateral and vertical pipelines, with portable, commercial-strength equipment.",
    cta: "Shop MaxLiner",
  },
  {
    name: "CIPP liners",
    img: "/img/liner-rolls.webp",
    alt: "Rolls of calibration tube and pull tape in assorted colours",
    body: "Varieties of sizes, materials, capabilities and use cases. We can help you make the most out of your liner purchase with expert application assistance.",
    cta: "Shop liners",
  },
  {
    name: "Resin",
    img: "/img/pouring-resin.webp",
    alt: "Resin being poured from a mixing pail during a wetout",
    body: "With dozens of options and application specific features. We source the resin you need to get the job done quickly and efficiently.",
    cta: "Shop resin",
  },
];

/*
 * Their "Why Choose Trenchless Distribution" block, cut to the bone. The
 * first pass was five paragraphs of prose, which read as a template nobody
 * finishes. Each one is now a claim and a single line of evidence, carried
 * by an icon, so the row can be scanned in the time someone actually gives
 * it. `icon` names an export from components/icons.
 */
export const WHY_US = [
  {
    icon: "Badge",
    title: "Proven on real pipe",
    body: "Every line we carry is run on real pipe before it reaches your truck.",
  },
  {
    icon: "HardHat",
    title: "Installers, not order takers",
    body: "Your rep has pulled liner. Ask them a cure question and get an answer.",
  },
  {
    icon: "Tag",
    title: "Priced for monthly buyers",
    body: "Specced to run together and priced for crews who reorder, not once.",
  },
  {
    icon: "UvCure",
    title: "UV and robotics, supported",
    body: "The new gear, with the training and the bench that keep it running.",
  },
  {
    icon: "Handshake",
    title: "We never bid your work",
    body: "We sell to contractors only, so we are never across the table.",
  },
];

/** Their patch repair section. */
export const PATCH = {
  eyebrow: "CIPP patch repair",
  title: "The simplest way into the trenchless market.",
  body: "A simple, user-friendly approach for entering the trenchless CIPP market. Sectional patch repair offers a quick, proven method for rehabilitating failing pipelines without lining the entire pipe or excavating.",
  cta: "Explore patch repair",
  img: "/img/point-repair-bg.webp",
  alt: "A reinforced sectional liner laid out flat before wetout",
};
