import {
  AGENT_WORDS,
  BYES,
  ENTRIES,
  GREETINGS,
  THANKS,
  type Entry,
} from "@/data/knowledge";

/*
 * A retrieval matcher. No model and no network: the reply is always one of the
 * answers written in src/data/knowledge.ts, chosen by scoring the question
 * against each entry's keywords.
 *
 * Scoring, in order of weight:
 *   1. a known phrase appears in the question          (strongest)
 *   2. a keyword matches exactly
 *   3. a keyword matches after light stemming          (liners -> liner)
 *   4. a keyword is one typo away                      (lenght -> length)
 * Rare keywords score higher than common ones, so "dancutter" beats "the".
 */

const STOP = new Set([
  "a","an","the","is","are","was","were","be","been","am","i","me","my","we",
  "our","you","your","it","its","this","that","these","those","of","to","in",
  "on","at","for","with","and","or","but","if","so","as","can","could","would",
  "will","shall","should","do","does","did","have","has","had","get","got",
  "there","here","please","hi","hello","hey","just","any","some","about","from",
  "need","want","looking","tell","know","like","guys","u","ur","pls","plz",
  "what","whats","which","who","when","where","why","how","whos","wheres","hows",
  "much","many","long","big","small","good","best","new","old","yes","no","ok",
]);

function normalise(s: string) {
  return s
    .toLowerCase()
    .replace(/[''`]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stem(w: string) {
  if (w.length <= 3) return w;
  return w
    .replace(/(ings|ing)$/, "")
    .replace(/(ies)$/, "y")
    .replace(/(es)$/, "")
    .replace(/s$/, "");
}

function tokens(s: string) {
  return normalise(s).split(" ").filter((w) => w && !STOP.has(w));
}

/** Damerau-style edit distance, capped at 2 for speed. */
function within1(a: string, b: string) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (a.length < b.length) j++;
    else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

/* How many entries use each keyword. Rare words are worth more. */
const DOC_FREQ = (() => {
  const f = new Map<string, number>();
  for (const e of ENTRIES) {
    for (const k of new Set(e.keys.map(stem))) f.set(k, (f.get(k) ?? 0) + 1);
  }
  return f;
})();

function weight(key: string) {
  const df = DOC_FREQ.get(stem(key)) ?? 1;
  return 1 / df; // a word in one entry is worth 1, in four entries 0.25
}

export type Match =
  | { kind: "greeting" }
  | { kind: "thanks" }
  | { kind: "bye" }
  | { kind: "agent" }
  | { kind: "answer"; entry: Entry; confident: boolean }
  | { kind: "unknown"; suggestions: Entry[] };

function listHit(text: string, list: string[]) {
  const n = normalise(text);
  return list.some((g) => n === g || n.startsWith(g + " ") || n.endsWith(" " + g));
}

export function match(input: string): Match {
  const raw = normalise(input);
  if (!raw) return { kind: "unknown", suggestions: pick(["what-you-do", "quote-price", "contact"]) };

  // Short social openers only. "hi, do you ship?" should answer the question.
  const words = raw.split(" ");
  if (words.length <= 3) {
    if (listHit(raw, GREETINGS)) return { kind: "greeting" };
    if (listHit(raw, THANKS)) return { kind: "thanks" };
    if (listHit(raw, BYES)) return { kind: "bye" };
  }
  // Word boundaries matter: "rep" must not fire inside "repair".
  if (AGENT_WORDS.some((w) => new RegExp(`\\b${w}\\b`).test(raw)))
    return { kind: "agent" };

  const qTokens = tokens(raw);
  const qStems = qTokens.map(stem);

  const scored = ENTRIES.map((entry) => {
    let score = 0;

    for (const phrase of entry.phrases ?? []) {
      if (raw.includes(phrase)) score += 6;
    }

    const seen = new Set<string>();
    for (const key of entry.keys) {
      const ks = stem(key);
      if (seen.has(ks)) continue;
      const w = weight(key);

      if (qTokens.includes(key)) { score += 3 * w; seen.add(ks); continue; }
      if (qStems.includes(ks)) { score += 2.2 * w; seen.add(ks); continue; }
      if (key.length > 4 && qStems.some((t) => within1(t, ks))) {
        score += 1.4 * w; seen.add(ks);
      }
    }

    // Short, specific questions shouldn't be swamped by long entries.
    return { entry, score };
  }).sort((a, b) => b.score - a.score);

  // A one-word question carries less evidence, so it needs a lower bar.
  const floor = qTokens.length <= 1 ? 0.6 : 1.2;
  const best = scored[0];
  if (!best || best.score < floor) {
    return { kind: "unknown", suggestions: scored.slice(0, 3).map((s) => s.entry) };
  }
  return { kind: "answer", entry: best.entry, confident: best.score >= 2.4 };
}

function pick(ids: string[]) {
  return ids
    .map((id) => ENTRIES.find((e) => e.id === id))
    .filter((e): e is Entry => Boolean(e));
}

export function entryByLabel(label: string): Entry | undefined {
  const m = match(label);
  return m.kind === "answer" ? m.entry : undefined;
}
