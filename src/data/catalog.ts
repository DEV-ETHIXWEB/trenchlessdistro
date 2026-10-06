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
};

export const ITEMS: Item[] = [
  {
    code: "ML-FLX",
    name: "Max FlexLiner™",
    maker: "MaxLiner",
    cure: "Ambient",
    minD: 2,
    maxD: 8,
    uom: "per ft",
    apps: ["lateral", "vertical"],
    stock: "In stock",
  },
  {
    code: "ML-SFX",
    name: "Max SuperFlex™",
    maker: "MaxLiner",
    cure: "Ambient",
    minD: 2,
    maxD: 6,
    uom: "per ft",
    apps: ["lateral", "vertical"],
    stock: "In stock",
  },
  {
    code: "ML-SCR",
    name: "LinerTube Reinforced™ (SCRIM)",
    maker: "MaxLiner",
    cure: "Steam",
    minD: 4,
    maxD: 12,
    uom: "per ft",
    apps: ["mainline", "lateral"],
    stock: "In stock",
  },
  {
    code: "ML-DRM",
    name: "Max LinerDrum™ inversion system",
    maker: "MaxLiner",
    cure: "N/A",
    minD: 2,
    maxD: 8,
    uom: "each",
    apps: ["lateral", "mainline"],
    stock: "Low stock",
  },
  {
    code: "ML-GUN",
    name: "Max LinerGun® wetout unit",
    maker: "MaxLiner",
    cure: "N/A",
    minD: 2,
    maxD: 12,
    uom: "each",
    apps: ["lateral", "mainline", "point-repair"],
    stock: "In stock",
  },
  {
    code: "BR-PCO",
    name: "Brawo® Pico Extended UV system",
    maker: "Brawo Systems",
    cure: "UV LED",
    minD: 2,
    maxD: 6,
    uom: "system",
    apps: ["lateral", "vertical"],
    stock: "Built to order",
  },
  {
    code: "IMS-MXC",
    name: "IMS MAXICure LED curing train",
    maker: "IMS",
    cure: "UV LED",
    minD: 4,
    maxD: 12,
    uom: "system",
    apps: ["mainline", "lateral"],
    stock: "Built to order",
  },
  {
    code: "RS-UVP",
    name: "UV Plus resin system",
    maker: "Trenchless Distribution",
    cure: "UV LED",
    minD: 2,
    maxD: 12,
    uom: "per pail",
    apps: ["lateral", "mainline", "vertical"],
    stock: "In stock",
  },
  {
    code: "RS-EPX",
    name: "Two-part CIPP epoxy resin",
    maker: "MaxLiner",
    cure: "Ambient",
    minD: 2,
    maxD: 12,
    uom: "per pail",
    apps: ["lateral", "mainline", "point-repair", "vertical"],
    stock: "In stock",
  },
  {
    code: "PR-KIT",
    name: "Point repair kit, ambient & UV",
    maker: "Apex CIPP",
    cure: "Ambient",
    minD: 2,
    maxD: 8,
    uom: "kit",
    apps: ["point-repair"],
    stock: "In stock",
  },
  {
    code: "PR-PKR",
    name: "Sectional packer assembly",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 3,
    maxD: 12,
    uom: "each",
    apps: ["point-repair"],
    stock: "In stock",
  },
  {
    code: "RB-DMB",
    name: "Dancutter Mini Bike robotic cutter",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 2,
    maxD: 4,
    uom: "each",
    apps: ["prep"],
    stock: "Low stock",
  },
  {
    code: "RB-DSF",
    name: "Dancutter Super Flex robotic cutter",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 3,
    maxD: 8,
    uom: "each",
    apps: ["prep"],
    stock: "In stock",
  },
  {
    code: "RB-DMX",
    name: "Dancutter Maxi Flex robotic cutter",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 6,
    maxD: 12,
    uom: "each",
    apps: ["prep"],
    stock: "Built to order",
  },
  {
    code: "PP-CHN",
    name: "Chain knocker descaling head",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 2,
    maxD: 12,
    uom: "each",
    apps: ["prep"],
    stock: "In stock",
  },
  {
    code: "CT-CAL",
    name: "Calibration tube",
    maker: "MaxLiner",
    cure: "N/A",
    minD: 2,
    maxD: 12,
    uom: "per ft",
    apps: ["lateral", "mainline", "vertical"],
    stock: "In stock",
  },
  {
    code: "IN-PSH",
    name: "Push inspection camera",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 2,
    maxD: 8,
    uom: "each",
    apps: ["inspection"],
    stock: "In stock",
  },
  {
    code: "IN-REL",
    name: "Self-levelling reel camera",
    maker: "Apex CIPP",
    cure: "N/A",
    minD: 4,
    maxD: 12,
    uom: "each",
    apps: ["inspection"],
    stock: "Low stock",
  },
];

export const CATEGORIES = [
  {
    slug: "cipp-lining-systems",
    name: "CIPP lining systems",
    blurb: "Flexible and reinforced liners, drums, guns and wetout gear.",
    count: 48,
    span: "2″–12″",
  },
  {
    slug: "cipp-uv-lining-systems",
    name: "CIPP UV lining systems",
    blurb: "LED cure trains, UV liners and controllers for fast turnarounds.",
    count: 21,
    span: "2″–12″",
    feature: true,
  },
  {
    slug: "robotics-milling",
    name: "Robotics & milling",
    blurb: "Reinstatement cutters, milling heads and control reels.",
    count: 34,
    span: "2″–12″",
  },
  {
    slug: "cipp-materials",
    name: "CIPP materials",
    blurb: "Resins, liner tube, SCRIM and calibration tube by the foot.",
    count: 76,
    span: "All sizes",
  },
  {
    slug: "cipp-patch-repair",
    name: "CIPP patch repair",
    blurb: "Point repair kits, packers and fitting liners.",
    count: 29,
    span: "2″–12″",
  },
  {
    slug: "inspection-cameras",
    name: "Inspection cameras",
    blurb: "Push and reel systems, locators, monitors and spares.",
    count: 23,
    span: "2″–12″",
  },
  {
    slug: "accessories-parts",
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
export const FEATURED = [
  {
    img: "/img/flexliner.webp",
    name: "Max FlexLiner™",
    maker: "MaxLiner",
    spec: "2″–8″ · per ft · ambient cure",
  },
  {
    img: "/img/superflex.webp",
    name: "Max SuperFlex™",
    maker: "MaxLiner",
    spec: "2″–6″ · per ft · multi-bend",
  },
  {
    img: "/img/scrim.webp",
    name: "LinerTube Reinforced™ (SCRIM)",
    maker: "MaxLiner",
    spec: "4″–12″ · per ft · steam cure",
  },
  {
    img: "/img/linerdrum.webp",
    name: "MAX LinerDrum™ inversion system",
    maker: "MaxLiner",
    spec: "2″–8″ · each · cart mounted",
  },
  {
    img: "/img/maxpox.webp",
    name: "MaxPox™ resin A + B",
    maker: "MaxLiner",
    spec: "All sizes · per pail · two-part epoxy",
  },
  {
    img: "/img/maxlight-plus.webp",
    name: "MaxLight™ Plus resin",
    maker: "MaxLiner",
    spec: "All sizes · per pail · UV cure",
  },
  {
    img: "/img/maxlight-uv.webp",
    name: "MaxLight UV resin systems",
    maker: "MaxLiner",
    spec: "2″–12″ · system · UV LED",
  },
  {
    img: "/img/maxicure.webp",
    name: "IMS MAXICure LED package",
    maker: "IMS",
    spec: "4″–12″ · system · LED cure train",
  },
  {
    img: "/img/brawo-pico.webp",
    name: "BRAWO® Pico SX",
    maker: "Brawo Systems",
    spec: "2″–6″ · system · UV lateral",
  },
  {
    img: "/img/point-repair-kit.webp",
    name: "Point repair & pipe patch kit",
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

/** Their "Why Choose Trenchless Distribution" block. */
export const WHY_US = [
  {
    title: "Proven technology",
    body: "Tested and vetted to work as hard as you do. These principles have driven us to gain long-standing trust among industry veterans.",
  },
  {
    title: "Premium installers",
    body: "Service reps that will help you expand your business beyond just a purchase.",
  },
  {
    title: "Quality and value",
    body: "Equipment and materials specced to run together, priced for contractors who buy them every month, not once.",
  },
  {
    title: "Next generation industry",
    body: "UV curing, LED trains and robotics, brought in and supported as the work moves on from ambient cure alone.",
  },
  {
    title: "Customer service",
    body: "Our staff has years of experience. We can help you build your CIPP division and help you create the most profitable position for your company.",
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
