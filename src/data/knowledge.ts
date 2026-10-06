/*
 * The assistant's knowledge base. No model, no API, no network call.
 * Every answer is written here and matched by keyword scoring (src/lib/chat.ts).
 *
 * To add an answer: add an entry. `keys` are the words a customer might type.
 * Keep answers short and plain. Readers are contractors, often on a phone.
 */

export type Entry = {
  id: string;
  /** Words and phrases that should pull up this answer. */
  keys: string[];
  /** Multi-word phrases score higher than single words. */
  phrases?: string[];
  answer: string;
  /** Buttons shown under the answer. */
  actions?: { label: string; href: string }[];
  /** Follow-up questions offered after this answer. */
  next?: string[];
};

export const GREETINGS = [
  "hi", "hii", "hiii", "hey", "heyy", "hello", "helo", "hallo", "yo", "yoo",
  "sup", "wassup", "whatsup", "howdy", "hiya", "greetings", "good morning",
  "good afternoon", "good evening", "morning", "afternoon", "evening",
  "hey there", "hi there", "hello there", "anyone there", "you there",
  "start", "menu", "help", "hola", "namaste", "g day", "gday",
];

export const THANKS = [
  "thanks", "thank you", "thankyou", "thx", "ty", "cheers", "appreciate it",
  "much appreciated", "perfect", "great", "awesome", "nice", "cool", "ok thanks",
];

export const BYES = [
  "bye", "goodbye", "see ya", "see you", "later", "cya", "that's all",
  "thats all", "nothing else", "im done", "i'm done", "no thanks", "nope",
];

export const AGENT_WORDS = [
  "human", "person", "agent", "representative", "rep", "someone", "real person",
  "talk to someone", "speak to someone", "call me", "sales rep",
];

/** Shown as tappable buttons so nobody has to think of a question. */
export const STARTERS = [
  "What do you sell?",
  "Do you install pipe?",
  "What pipe sizes?",
  "Get a quote",
  "Training and demos",
  "Where are you?",
];

export const ENTRIES: Entry[] = [
  {
    id: "what-you-do",
    keys: ["sell", "offer", "supply", "provide", "products", "catalog", "business", "company"],
    phrases: ["what do you sell", "what do you do", "what do you offer", "about you", "who are you", "what is this", "what you got"],
    answer:
      "We are Trenchless Distribution, a supplier of no-dig and CIPP pipe lining materials and equipment. We stock liners, resins, UV curing systems, robotic cutters, inspection cameras, point repair kits and spare parts, and we back them with training, demos, technical support and equipment repair.",
    actions: [{ label: "See the catalog", href: "#categories" }],
    next: ["Do you install pipe?", "What pipe sizes?", "Which brands do you carry?"],
  },
  {
    id: "do-you-install",
    keys: ["install", "installs", "installation", "installer", "installers", "fit", "fitting", "bid", "contractor"],
    phrases: ["do you install", "can you install", "do you do installs", "will you fix my pipe", "can you fix", "do you bid", "do you do the work", "my sewer"],
    answer:
      "No, and this matters. We are a distributor only. We supply the contractors who do the installing, and we never bid against them. If you need a job done, we can point you toward a contractor who buys from us. If you are a contractor, we supply you.",
    actions: [{ label: "Request a quote", href: "#quote" }],
    next: ["What do you sell?", "Do you train installers?"],
  },
  {
    id: "pipe-sizes",
    keys: ["size", "sizes", "diameter", "inch", "inches", "range"],
    phrases: ["what sizes", "pipe size", "what diameter", "how big", "do you have 4 inch", "size range"],
    answer:
      "We stock for host pipe from 2 inch up to 12 inch. Tell us your size on the home page and it will show you what fits, or pick a size in the product finder and we will narrow it by the type of job.",
    actions: [{ label: "Open the product finder", href: "#spec-finder" }],
    next: ["What do you sell?", "Get a quote"],
  },
  {
    id: "liners",
    keys: ["liner", "liners", "lining", "cipp", "flexliner", "superflex", "scrim", "tube", "felt", "calibration"],
    phrases: ["cipp liner", "liner tube", "max flexliner", "max superflex", "calibration tube", "reinforced liner"],
    answer:
      "We carry Max FlexLiner for 2 to 8 inch laterals, Max SuperFlex for 2 to 6 inch runs with multiple bends, and LinerTube Reinforced (SCRIM) for 4 to 12 inch mains. Calibration tube and pull tape are sold by the foot.",
    actions: [{ label: "See liners", href: "#collections" }],
    next: ["What resin do you have?", "What pipe sizes?"],
  },
  {
    id: "resin",
    keys: ["resin", "epoxy", "maxpox", "maxlight", "pail", "mix", "wetout", "wet", "out", "cure", "curing", "hardener"],
    phrases: ["what resin", "epoxy resin", "resin options", "uv resin", "two part"],
    answer:
      "We stock MaxPox two part epoxy, MaxLight Plus for UV cure, and MaxLight UV resin systems. Resin is sold by the pail. If you tell us the pipe size and the cure method you run, we will tell you how much you need.",
    actions: [{ label: "See resin", href: "#collections" }],
    next: ["What cure methods?", "Get a quote"],
  },
  {
    id: "uv",
    keys: ["uv", "led", "brawo", "pico", "maxicure"],
    phrases: ["uv curing", "uv system", "led cure", "brawo pico", "maxicure led", "uv lining"],
    answer:
      "UV is our newest line. We carry the BRAWO Pico SX for 2 to 6 inch laterals and the IMS MAXICure LED package for 4 to 12 inch work, plus UV resins. UV cures far faster than ambient, so crews turn more jobs in a day.",
    actions: [{ label: "See UV systems", href: "#categories" }],
    next: ["Can I see a demo?", "Get a quote"],
  },
  {
    id: "robotics",
    keys: ["robot", "robotic", "cutter", "cutting", "mill", "milling", "dancutter", "reinstate", "reinstatement", "lateral", "grind"],
    phrases: ["robotic cutter", "reinstatement cutter", "milling head", "cutting robot"],
    answer:
      "We carry Dancutter robotic cutters, the Mini Bike for 2 to 4 inch, Super Flex for 3 to 8 inch and Maxi Flex for 6 to 12 inch, plus milling heads, chain knockers and control reels for prep and reinstatement.",
    actions: [{ label: "See robotics", href: "#categories" }],
    next: ["Do you repair equipment?", "Get a quote"],
  },
  {
    id: "cameras",
    keys: ["camera", "cameras", "inspect", "inspection", "scope", "cctv", "locator"],
    phrases: ["inspection camera", "push camera", "sewer camera", "pipe camera"],
    answer:
      "We stock push cameras and self levelling reel cameras for 2 to 12 inch pipe, with locators, monitors and spare parts.",
    actions: [{ label: "See cameras", href: "#categories" }],
    next: ["What pipe sizes?", "Get a quote"],
  },
  {
    id: "patch",
    keys: ["patch", "sectional", "packer"],
    phrases: ["point repair", "patch repair", "spot repair", "sectional repair", "patch kit", "point repairs"],
    answer:
      "Point repair is the simplest way into trenchless work. We stock ambient and UV patch kits for 2 to 8 inch pipe, sectional packers and fitting liners. You fix the bad section without lining the whole pipe or digging.",
    actions: [{ label: "See patch repair", href: "#categories" }],
    next: ["Do you train installers?", "Get a quote"],
  },
  {
    id: "cure-methods",
    keys: ["cure", "curing", "ambient", "steam", "method"],
    phrases: ["cure method", "how long to cure", "cure time", "ambient cure", "steam cure"],
    answer:
      "We supply systems for ambient cure, steam cure and UV LED cure. Which one suits you depends on the pipe size, the length of the run and how fast you need to turn the job. Call us and we will talk it through.",
    actions: [{ label: "Call 253-368-5614", href: "tel:+12533685614" }],
    next: ["What resin do you have?", "Can I see a demo?"],
  },
  {
    id: "brands",
    keys: ["brand", "brands", "manufacturer", "manufacturers", "maxliner", "apex", "picote", "dancutter", "ims", "brawo", "authorized"],
    phrases: ["which brands", "what brands", "who do you carry", "are you authorized", "authorized dealer"],
    answer:
      "We are an authorized distributor for MaxLiner, Apex CIPP, Brawo Systems, IMS, Dancutter and Picote. If you run something we do not list, we can usually source it.",
    actions: [{ label: "See the brands", href: "#manufacturers" }],
    next: ["What do you sell?", "Get a quote"],
  },
  {
    id: "training",
    keys: ["train", "training", "teach", "learn", "course", "class", "certify", "certification", "certified", "crew"],
    phrases: ["do you train", "installer training", "training course", "get certified", "teach my crew", "how do i start"],
    answer:
      "Yes. We run manufacturer backed installer certification and crew refresher training, one to two days, on real pipe. It runs at our facility in Puyallup or at yours. Seats are limited, so tell us your headcount and what you run.",
    actions: [{ label: "See upcoming training", href: "#events" }, { label: "Reserve seats", href: "#quote" }],
    next: ["Can I see a demo?", "Where are you?"],
  },
  {
    id: "demos",
    keys: ["demo", "demos", "demonstration", "try", "trial", "hands"],
    phrases: ["can i see a demo", "product demo", "try before i buy", "test the equipment", "open house"],
    answer:
      "Yes. We will bring the equipment, the liner and the resin and run it with your crew, either on your site or at our shop. Most people want to try a system before they commit to it, and we would rather you did.",
    actions: [{ label: "Book a demo", href: "#quote" }, { label: "See the schedule", href: "#events" }],
    next: ["Do you train installers?", "Get a quote"],
  },
  {
    id: "support",
    keys: ["support", "technical", "tech", "advice", "troubleshoot", "problem", "issue", "stuck"],
    phrases: ["technical support", "tech support", "need help", "something went wrong", "having trouble"],
    answer:
      "Call us. You will reach someone who knows the catalog and has run the equipment. We help with product selection, cure schedules, troubleshooting on the job, and we escalate to the manufacturer when it needs that.",
    actions: [{ label: "Call 253-368-5614", href: "tel:+12533685614" }],
    next: ["Do you repair equipment?", "Where are you?"],
  },
  {
    id: "repair",
    keys: ["repair", "repairs", "broke", "broken", "fix", "service", "servicing", "maintenance", "spare", "bench", "faulty"],
    phrases: ["equipment repair", "my cutter broke", "repair service", "fix my equipment", "spare parts"],
    answer:
      "We do minor repair, service and diagnostics in house on cutters, reels, pumps and cure gear, so your truck gets back out. We also stock replacement wear parts.",
    actions: [{ label: "Request repair", href: "#quote" }, { label: "Call 253-368-5614", href: "tel:+12533685614" }],
    next: ["Do you have parts in stock?", "Where are you?"],
  },
  {
    id: "quote-price",
    keys: ["quote", "price", "pricing", "cost", "costs", "expensive", "cheap", "budget", "estimate", "discount"],
    phrases: ["how much", "get a quote", "what does it cost", "price list", "send me a price", "give me a quote"],
    answer:
      "Send us a quote request and we will come back the same business day. We will need your name, company and phone number, plus the pipe size and what the job involves.",
    actions: [{ label: "Request a quote", href: "#quote" }, { label: "Call 253-368-5614", href: "tel:+12533685614" }],
    next: ["Do you offer financing?", "Do you ship?"],
  },
  {
    id: "financing",
    keys: ["finance", "financing", "payment", "pay", "credit", "terms", "lease", "instalment", "installment", "monthly", "afford"],
    phrases: ["do you finance", "payment plan", "financing available", "can i pay monthly"],
    answer:
      "Yes, financing is available for qualified customers. Ask us when you request your quote and we will set it up alongside the pricing.",
    actions: [{ label: "Ask about financing", href: "#quote" }],
    next: ["Get a quote", "What do you sell?"],
  },
  {
    id: "shipping",
    keys: ["ship", "shipping", "deliver", "delivery", "freight", "arrive", "pickup", "collect", "nationwide"],
    phrases: ["do you ship", "how fast", "shipping cost", "can i pick up", "will call", "nationwide"],
    answer:
      "We ship nationwide by freight from Puyallup, Washington, and will call pickup is available if you are local. Order early in the day and we will do our best to get it moving the same day.",
    actions: [{ label: "Request a quote", href: "#quote" }],
    next: ["Where are you?", "What are your hours?"],
  },
  {
    id: "stock",
    keys: ["stock", "stocked", "available", "availability", "inventory", "backorder", "lead", "ready"],
    phrases: ["do you have", "in stock", "is it available", "lead time", "how soon"],
    answer:
      "Most of our catalog is stocked and ready to ship. Some systems are built to order. Tell us the pipe size and the product and we will confirm what is on the shelf right now.",
    actions: [{ label: "Check the product finder", href: "#spec-finder" }, { label: "Call 253-368-5614", href: "tel:+12533685614" }],
    next: ["Do you ship?", "Get a quote"],
  },
  {
    id: "location",
    keys: ["location", "address", "based", "located", "near", "visit", "warehouse", "washington", "puyallup", "seattle"],
    phrases: ["where are you", "your address", "can i visit", "are you local", "where is your shop"],
    answer:
      "We are in Puyallup, Washington, and we ship nationwide. You are welcome to come by during opening hours, and will call pickup is available.",
    actions: [{ label: "Get directions", href: "#quote" }],
    next: ["What are your hours?", "Do you ship?"],
  },
  {
    id: "hours",
    keys: ["hours", "open", "opening", "close", "closed", "today", "weekend", "saturday", "sunday", "monday"],
    phrases: ["what are your hours", "are you open", "opening hours", "open today", "open on saturday"],
    answer:
      "Monday to Friday, 7:00 to 4:30 Pacific. Saturday by appointment. If you need something outside those hours, call and leave a message.",
    actions: [{ label: "Call 253-368-5614", href: "tel:+12533685614" }],
    next: ["Where are you?", "Do you ship?"],
  },
  {
    id: "contact",
    keys: ["contact", "phone", "number", "call", "email", "reach", "touch", "speak", "talk", "message"],
    phrases: ["contact you", "phone number", "your email", "how do i reach you", "get in touch"],
    answer:
      "Phone is 253-368-5614, Monday to Friday 7:00 to 4:30 Pacific. Sales email is sales@trenchlessdistro.com. Dealer enquiries go to operations@trenchlessdistro.com.",
    actions: [
      { label: "Call 253-368-5614", href: "tel:+12533685614" },
      { label: "Email sales", href: "mailto:sales@trenchlessdistro.com" },
    ],
    next: ["What are your hours?", "Get a quote"],
  },
  {
    id: "dealer",
    keys: ["dealer", "dealership", "reseller", "partner", "wholesale", "account", "trade"],
    phrases: ["become a dealer", "dealer enquiry", "trade account", "wholesale pricing", "open an account"],
    answer:
      "Email operations@trenchlessdistro.com for dealer and distribution enquiries, or send a request through the form and say you are asking about a dealership.",
    actions: [{ label: "Email operations", href: "mailto:operations@trenchlessdistro.com" }],
    next: ["Get a quote", "What do you sell?"],
  },
  {
    id: "documents",
    keys: ["spec", "specs", "sheet", "sheets", "sds", "tds", "manual", "manuals", "document", "documents", "datasheet", "safety", "instructions", "video", "videos", "pdf"],
    phrases: ["spec sheet", "safety data sheet", "where are the manuals", "product documents", "install video"],
    answer:
      "Every product page carries its spec sheet, SDS and TDS, manual and install videos, so you can pull the cure schedule up on a phone on site.",
    actions: [{ label: "Open the library", href: "#events" }],
    next: ["What do you sell?", "Technical support"],
  },
  {
    id: "events",
    keys: ["event", "events", "schedule", "calendar", "upcoming", "coming"],
    phrases: ["upcoming events", "what is coming up", "open house", "event schedule", "next training"],
    answer:
      "We run demos, installer training and open house days through the year at our Puyallup facility. The next few are listed on the page, and seats are limited.",
    actions: [{ label: "See what is coming up", href: "#events" }],
    next: ["Do you train installers?", "Can I see a demo?"],
  },
  {
    id: "experience",
    keys: ["experience", "years", "established", "history", "trust", "reputation", "reliable"],
    phrases: ["how long have you", "how many years", "why should i buy", "are you reliable", "why choose you"],
    answer:
      "Over 35 years in the industry. Our staff has built CIPP divisions from scratch, and we help customers do the same. The reason people stay with us is the support after the sale, not just the price on the box.",
    actions: [{ label: "Why choose us", href: "#why-us" }],
    next: ["Do you train installers?", "What do you sell?"],
  },
  {
    id: "returns",
    keys: ["return", "returns", "refund", "warranty", "guarantee", "damaged", "exchange"],
    phrases: ["can i return", "return policy", "warranty claim", "arrived damaged", "wrong item"],
    answer:
      "Call us on 253-368-5614 and we will sort it out directly. Returns and warranty claims depend on the manufacturer, and we handle that side for you.",
    actions: [{ label: "Call 253-368-5614", href: "tel:+12533685614" }],
    next: ["Technical support", "Contact"],
  },
];
