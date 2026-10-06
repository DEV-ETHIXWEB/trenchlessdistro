/*
 * UI click sounds.
 *
 * Synthesised with the Web Audio API rather than shipped as files: a tick is
 * a filtered noise transient plus a short sine body, which is a few lines of
 * maths and nothing to download. It also means the pitch can carry meaning --
 * a toggle going on rises, a toggle going off falls -- without three more
 * network requests.
 *
 * Kept deliberately quiet and short (~45ms, gain 0.05). A UI sound a person
 * notices is a UI sound they will want to switch off.
 */

type Variant = "tap" | "on" | "off" | "nav";

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;
let enabled = false;

/** The panel owns the preference; this module is told, it does not read. */
export function setSoundEnabled(on: boolean) {
  enabled = on;
  if (!on && ctx && ctx.state === "running") void ctx.suspend();
}

export function isSoundEnabled() {
  return enabled;
}

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null; // No Web Audio: the UI is silent, nothing breaks.
    try {
      ctx = new Ctor();
    } catch {
      return null;
    }
  }
  // Browsers start the context suspended until a gesture; a click is one.
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** One second of white noise, generated once and reused for every tick. */
function noiseBuffer(ac: AudioContext): AudioBuffer {
  if (!noise) {
    const len = Math.floor(ac.sampleRate * 0.12);
    noise = ac.createBuffer(1, len, ac.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  }
  return noise;
}

const SPEC: Record<Variant, { hz: number; body: number; len: number; gain: number }> = {
  // A soft, woody tap. The default for every button and link.
  tap: { hz: 1750, body: 320, len: 0.045, gain: 0.05 },
  // Switched on: same tap, brighter, with a higher body note.
  on: { hz: 2300, body: 640, len: 0.055, gain: 0.05 },
  // Switched off: duller and lower, so the pair reads as a direction.
  off: { hz: 1200, body: 380, len: 0.055, gain: 0.05 },
  // Travelling somewhere on the page: softest of the set.
  nav: { hz: 1500, body: 420, len: 0.07, gain: 0.04 },
};

export function play(variant: Variant = "tap") {
  if (!enabled) return;
  const ac = audio();
  if (!ac) return;

  if (ac.state === "running") {
    emit(ac, variant);
    return;
  }

  /*
   * The context is suspended -- either it has never been started, or sound
   * was muted and we suspended it to stop burning CPU. resume() is a promise,
   * so emitting now would be dropped on the floor; emit when it is live
   * instead. This is what makes the tick that confirms un-muting audible.
   */
  void ac
    .resume()
    .then(() => {
      if (enabled && ac.state === "running") emit(ac, variant);
    })
    .catch(() => {
      /* Still no gesture. Silence is the correct outcome. */
    });
}

function emit(ac: AudioContext, variant: Variant) {
  const { hz, body, len, gain } = SPEC[variant];
  const t = ac.currentTime;

  const out = ac.createGain();
  out.gain.value = gain;
  out.connect(ac.destination);

  // The transient: a noise burst through a tight bandpass.
  const src = ac.createBufferSource();
  src.buffer = noiseBuffer(ac);
  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = hz;
  bp.Q.value = 1.4;
  const ng = ac.createGain();
  ng.gain.setValueAtTime(1, t);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + len);
  src.connect(bp).connect(ng).connect(out);

  // The body: a sine that gives the tick weight instead of a hiss.
  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(body, t);
  osc.frequency.exponentialRampToValueAtTime(body * 0.72, t + len);
  const og = ac.createGain();
  og.gain.setValueAtTime(0.9, t);
  og.gain.exponentialRampToValueAtTime(0.0001, t + len * 1.1);
  osc.connect(og).connect(out);

  src.start(t);
  src.stop(t + len + 0.02);
  osc.start(t);
  osc.stop(t + len * 1.1 + 0.02);

  // Release the nodes once they have rung out.
  window.setTimeout(() => out.disconnect(), (len + 0.1) * 1000);
}
