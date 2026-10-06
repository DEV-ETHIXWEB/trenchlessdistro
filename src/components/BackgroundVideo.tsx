"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CHANGE_EVENT } from "@/lib/a11y";
import { Pause, Play } from "./icons";

/*
 * A looping background video that is allowed not to load.
 *
 * The poster image is the real content: it is a plain <Image>, it is what
 * paints first, and on a phone, a metered connection, or with reduced motion
 * requested it is the only thing that is ever fetched. The video file is only
 * attached to the DOM once we know all of those are false, so a contractor on
 * LTE in a truck never pays five megabytes for decoration.
 *
 * WCAG 2.2.2 requires a pause control for anything that moves for more than
 * five seconds, so the control is always rendered when the video is playing,
 * not hidden behind a hover.
 */

type Props = {
  src: string;
  poster: string;
  /** Describes the poster for screen readers; "" marks it decorative. */
  alt?: string;
  /** Poster is above the fold and should not be lazy-loaded. Also fetches
   *  the video immediately instead of waiting for the section to approach. */
  priority?: boolean;
  /** Minimum viewport width, in px, at which the video is worth fetching. */
  minWidth?: number;
  /** Tailwind classes for the scrim laid over the media. */
  scrimClassName: string;
  /** Position of the play/pause control. Kept clear of the bottom corners,
   *  where the accessibility and question buttons are fixed. */
  controlClassName?: string;
  sizes?: string;
};

export default function BackgroundVideo({
  src,
  poster,
  alt = "",
  priority = false,
  minWidth = 768,
  scrimClassName,
  controlClassName = "absolute top-3 right-3 z-20",
  sizes = "100vw",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [allowed, setAllowed] = useState(false);
  // Off-screen sections do not fetch megabytes before anyone scrolls to them.
  const [near, setNear] = useState(priority);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const load = allowed && near;
  // A visitor who presses pause stays paused, even after scrolling away.
  const pausedByUser = useRef(false);

  /* Decide, once, whether this visit gets the video at all. */
  useEffect(() => {
    const decide = () => {
      const motionOff =
        document.documentElement.getAttribute("data-a11y-motion") === "off";
      const prefersStill = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const narrow = window.innerWidth < minWidth;
      const conn = (
        navigator as Navigator & {
          connection?: { saveData?: boolean; effectiveType?: string };
        }
      ).connection;
      const metered =
        conn?.saveData === true ||
        (conn?.effectiveType != null &&
          ["slow-2g", "2g", "3g"].includes(conn.effectiveType));

      setAllowed(!motionOff && !prefersStill && !narrow && !metered);
    };

    decide();
    document.addEventListener(CHANGE_EVENT, decide);
    return () => document.removeEventListener(CHANGE_EVENT, decide);
  }, [minWidth]);

  /* Attach the file only once the section is within a screen of the viewport.
     Without this, a band near the footer costs its full weight on first load. */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (near || !wrap) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [near]);

  /* Stop paying to decode a video that is off screen. */
  useEffect(() => {
    const el = videoRef.current;
    const wrap = wrapRef.current;
    if (!load || !el || !wrap) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByUser.current) {
          void el.play().catch(() => {
            /* Autoplay refused. The poster is already correct. */
          });
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [load]);

  function toggle() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      pausedByUser.current = false;
      void el.play().catch(() => undefined);
    } else {
      pausedByUser.current = true;
      el.pause();
    }
  }

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden bg-ink">
      <Image
        src={poster}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover transition-opacity duration-700 ${
          ready && playing ? "opacity-0" : "opacity-100"
        }`}
      />

      {load && (
        <video
          ref={videoRef}
          // No controls, no audio track in use, nothing to announce.
          aria-hidden
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onCanPlay={() => setReady(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      <div className={`absolute inset-0 ${scrimClassName}`} aria-hidden />

      {load && ready && (
        <div className={controlClassName}>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={!playing}
            className="justify-center gap-2 border border-white/35 bg-ink/70 px-3 py-2 text-[0.8125rem] font-semibold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-ink"
          >
            {playing ? (
              <Pause className="size-4" aria-hidden />
            ) : (
              <Play className="size-4" aria-hidden />
            )}
            <span className="sr-only sm:not-sr-only">
              {playing ? "Pause background video" : "Play background video"}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
