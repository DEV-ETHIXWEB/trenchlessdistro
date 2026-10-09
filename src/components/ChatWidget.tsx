"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { match } from "@/lib/chat";
import { STARTERS, type Entry } from "@/data/knowledge";
import { Chat, Cross, Phone, Send } from "./icons";
import EthixwebCredit from "./EthixwebCredit";
import { OPEN_CHAT } from "@/lib/panels";

/*
 * An assistant with no model behind it. Every reply is written in
 * src/data/knowledge.ts and selected by keyword scoring in src/lib/chat.ts,
 * so it runs entirely in the browser, costs nothing per message and can never
 * invent a fact about the business.
 *
 * Built for people who do not enjoy chat widgets: large type, tappable
 * suggestions so nobody has to think of a question, and the phone number
 * always one tap away.
 */

type Msg = {
  id: number;
  from: "bot" | "you";
  text: string;
  actions?: { label: string; href: string }[];
  chips?: string[];
};

const PHONE = { label: "Call 253-368-5614", href: "tel:+12533685614" };

let seq = 0;
const nextId = () => ++seq;

/** Suggestion lists are merged from several entries, so they can repeat. */
const dedupe = (xs: string[]) => [...new Set(xs)];

function opening(): Msg {
  return {
    id: nextId(),
    from: "bot",
    text: "Hello. I can answer questions about our products, training, delivery and opening hours. What are you after?",
    chips: STARTERS,
  };
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([opening()]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  /*
   * The panel is a full sheet on a phone and an anchored card on a desktop,
   * and the two want different entrances: a card can scale up out of the
   * launcher it came from, a full sheet reads as rising from the bottom
   * edge. Starts false so the first paint matches the server; the panel only
   * ever renders after a click, so there is nothing to mismatch.
   */
  const [sheet, setSheet] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setSheet(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  /* The phone action bar carries this control now, and asks for the panel
     by event rather than by reaching into this component's state. */
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_CHAT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /*
   * A full sheet covers the page, so the page behind it must stop scrolling.
   * Only while it is actually a sheet: the desktop card leaves the page
   * visible and scrollable on purpose.
   *
   * overflow:hidden rather than the usual position:fixed on the body. Taking
   * the body out of flow discards the scroll offset, and putting it back
   * afterwards does not land where it started: Chromium drifts 20px,
   * WebKit 18px and Firefox a varying amount, measured on this page at
   * several scroll depths. Nothing in our code does that scrolling, the
   * browser does it as the document re-expands, so there is no call of ours
   * to correct. Clipping the scrollport instead leaves the offset untouched,
   * which means there is nothing to restore and nothing to drift.
   */
  useEffect(() => {
    if (!open || !sheet) return;
    const de = document.documentElement;
    const { body } = document;
    const prev = {
      html: de.style.overflow,
      body: body.style.overflow,
      overscroll: body.style.overscrollBehavior,
    };
    de.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    return () => {
      de.style.overflow = prev.html;
      body.style.overflow = prev.body;
      body.style.overscrollBehavior = prev.overscroll;
    };
  }, [open, sheet]);

  function reply(question: string) {
    const m = match(question);
    const out: Msg[] = [];

    const say = (text: string, actions?: Msg["actions"], chips?: string[]) =>
      out.push({ id: nextId(), from: "bot", text, actions, chips });

    if (m.kind === "greeting") {
      say(
        "Hello. Ask me anything about what we stock, training, delivery or opening hours.",
        undefined,
        STARTERS,
      );
    } else if (m.kind === "thanks") {
      say("You are welcome. Anything else I can help with?", [PHONE], STARTERS.slice(0, 4));
    } else if (m.kind === "bye") {
      say("Thanks for stopping by. Call 253-368-5614 any weekday if you need us.", [PHONE]);
    } else if (m.kind === "agent") {
      say(
        "Of course. Call 253-368-5614, Monday to Friday 7:00 to 4:30 Pacific, and you will reach someone who knows the catalog. You can also send a quote request and we will ring you back the same day.",
        [PHONE, { label: "Send a request", href: "#quote" }],
      );
    } else if (m.kind === "answer") {
      const e: Entry = m.entry;
      say(e.answer, [...(e.actions ?? []), PHONE], e.next);
      if (!m.confident) {
        say("If that was not what you meant, try one of these, or call and ask us directly.", undefined, STARTERS.slice(0, 4));
      }
    } else {
      say(
        "I did not quite catch that one. I can help with products, pipe sizes, pricing, training, delivery, opening hours and where to find us. Pick one below, or call 253-368-5614 and we will answer it properly.",
        [PHONE],
        dedupe([
          ...m.suggestions.flatMap((s) => s.next ?? []),
          ...STARTERS,
        ]).slice(0, 4),
      );
    }

    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMsgs((prev) => [...prev, ...out]);
    }, 420);
  }

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    setMsgs((prev) => [...prev, { id: nextId(), from: "you", text: q }]);
    setDraft("");
    reply(q);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        /*
         * Icon only on a phone, with the white border its sibling carries, so
         * the two launchers read as a pair and neither one covers the card
         * behind it. The label comes back from sm up, where there is room.
         */
        className={`hidden lg:inline-flex fixed right-4 bottom-4 z-70 gap-2.5 rounded-full bg-cyan-dark py-2.5 pr-5 pl-4 text-[0.9375rem] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(27,116,137,0.8)] ring-1 ring-white/20 transition-colors hover:bg-cyan-deep sm:right-6 sm:bottom-6 ${
          open ? "max-sm:hidden" : ""
        }`}
      >
        {open ? (
          <Cross className="size-6 shrink-0" aria-hidden />
        ) : (
          <Chat className="size-6 shrink-0" aria-hidden />
        )}
        <span className="sr-only sm:not-sr-only">{open ? "Close" : "Ask a question"}</span>
      </button>

      <AnimatePresence>
        {open && (
        <motion.div
          id="chat-panel"
          ref={panelRef}
          role="dialog"
          aria-label="Ask Trenchless Distribution a question"
          style={{ transformOrigin: "bottom right" }}
          initial={
            still ? false : sheet ? { opacity: 0, y: 24 } : { opacity: 0, y: 14, scale: 0.97 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            still ? { opacity: 0 } : sheet ? { opacity: 0, y: 24 } : { opacity: 0, y: 10, scale: 0.98 }
          }
          transition={{ duration: sheet ? 0.4 : 0.34, ease: [0.16, 1, 0.3, 1] }}
          /*
           * inset-0 rather than a height: it tracks the visual viewport as a
           * mobile browser grows and shrinks its URL bar, which a fixed svh
           * value does not. From sm up it goes back to a card parked above
           * the launcher.
           */
          className="fixed inset-0 z-70 flex flex-col overflow-hidden bg-white shadow-2xl sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[min(80svh,40rem)] sm:w-[25rem] sm:rounded-3xl sm:border sm:border-line"
        >
          <div className="flex items-center justify-between gap-3 bg-cyan-dark px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white sm:pt-3">
            <div>
              <p className="font-head font-bold">Ask us a question</p>
              <p className="text-[0.8125rem] text-white/90">
                Answers about products, training and delivery
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="shrink-0 text-white hover:text-white/80"
            >
              <Cross className="size-6" aria-hidden />
            </button>
          </div>
          <div className="brand-rule h-[3px]" aria-hidden />

          <div
            ref={logRef}
            className="flex-1 overflow-y-auto overscroll-contain bg-light px-4 py-4"
          >
            <ul className="space-y-4" aria-live="polite" aria-atomic="false">
              {msgs.map((m) => (
                <li key={m.id}>
                  <div
                    className={
                      m.from === "you"
                        ? "ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-cyan-dark px-3.5 py-2.5 text-white"
                        : "w-fit max-w-[92%] rounded-2xl rounded-bl-md border border-line bg-white px-3.5 py-2.5 text-ink"
                    }
                  >
                    <p className="text-[1rem] leading-relaxed">{m.text}</p>
                  </div>

                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.actions.map((a) => (
                        <a
                          key={a.label + a.href}
                          href={a.href}
                          onClick={() => {
                            if (a.href.startsWith("#")) setOpen(false);
                          }}
                          className="gap-1.5 border border-cyan-dark px-3 py-2 text-[0.9375rem] font-semibold text-cyan-dark hover:bg-cyan-dark hover:text-white"
                        >
                          {a.href.startsWith("tel:") && <Phone className="size-4" aria-hidden />}
                          {a.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {m.chips && m.chips.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.chips.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => send(c)}
                          className="rounded-full border border-line-strong bg-white px-3.5 py-2 text-[0.9375rem] text-ink hover:border-cyan-dark hover:text-cyan-dark"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              ))}

              {typing && (
                <li>
                  <div className="w-fit border border-line bg-white px-3.5 py-3">
                    <span className="sr-only">Typing</span>
                    <span className="flex gap-1.5" aria-hidden>
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="size-2 rounded-full bg-body/50"
                          style={{
                            animation: "chat-dot 1s ease-in-out infinite",
                            animationDelay: `${i * 0.15}s`,
                          }}
                        />
                      ))}
                    </span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="flex items-end gap-2 border-t border-line bg-white p-3"
          >
            <label htmlFor="chat-input" className="sr-only">
              Type your question
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your question"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-xl border border-line-strong px-3.5 py-3 text-ink placeholder:text-body/60 focus:border-cyan-dark focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send question"
              className="shrink-0 justify-center rounded-xl bg-cyan-dark px-4 text-white hover:bg-cyan-deep"
              style={{ minHeight: "48px" }}
            >
              <Send className="size-5" aria-hidden />
            </button>
          </form>

          <div className="flex justify-center border-t border-line bg-light py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pb-2">
            <EthixwebCredit />
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
