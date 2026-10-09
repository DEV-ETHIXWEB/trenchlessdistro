"use client";

/*
 * The error boundary. It never shows the error itself: a stack trace is
 * noise to a contractor and a gift to anyone probing the site. It offers a
 * retry, the homepage and the phone, which between them cover every way
 * out. `retry` is this Next version's recovery prop (see node_modules/next
 * docs, file-conventions/error).
 */
export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <main id="main" className="flex flex-1 items-center bg-mist px-4 py-24">
      <div className="mx-auto w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-[var(--shadow-card)] sm:p-12">
        <p className="eyebrow text-cyan-dark">Something went wrong</p>
        <h1 className="mt-4 text-[length:var(--text-h2)] text-ink">
          This page did not load properly.
        </h1>
        <p className="mt-3 text-body">
          Try again, or call 253-368-5614 and we will help straight away.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="justify-center rounded-xl bg-cyan-dark px-6 py-3.5 font-semibold text-white hover:bg-cyan-deep"
          >
            Try again
          </button>
          {/* A full navigation, not a client transition: if the client
              state is what broke, this throws it away. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="justify-center rounded-xl border border-line-strong px-6 py-3.5 font-semibold text-ink hover:border-cyan-dark hover:text-cyan-dark"
          >
            Back to the homepage
          </a>
        </div>
      </div>
    </main>
  );
}
