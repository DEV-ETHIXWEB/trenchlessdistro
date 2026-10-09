import Image from "next/image";

/*
 * Build credit.
 *
 * Quiet, but not illegible. An earlier pass faded the whole thing to 55%,
 * which dropped the label to 4.39:1 on the footer and failed AA. Subtlety is
 * carried by size, weight and letterspacing instead; only the wordmark itself
 * -- a brand mark, which contrast rules exempt -- is held back on opacity.
 *
 * It appears at the foot of the two panels this studio actually built, the
 * assistant and the accessibility controls, and once in the site footer. It
 * never appears inside the client's own content.
 *
 * The wordmark ships as black on transparent, so the dark-surface variant is
 * the same file inverted rather than a second asset to keep in step.
 */
export default function EthixwebCredit({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <a
      href="https://ethixweb.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-link group inline-flex items-center gap-2 ${className}`}
    >
      <span
        className={`text-[0.75rem] leading-none font-semibold tracking-[0.13em] uppercase ${
          dark ? "text-white/75" : "text-body"
        }`}
      >
        Powered by
      </span>
      <Image
        src="/brand/ethixweb-wordmark.png"
        alt="Ethixweb"
        width={420}
        height={62}
        sizes="64px"
        className={`h-auto w-16 opacity-65 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${
          dark ? "invert" : ""
        }`}
      />
    </a>
  );
}
