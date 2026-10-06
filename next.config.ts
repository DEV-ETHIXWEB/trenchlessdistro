import type { NextConfig } from "next";

/*
 * Security headers.
 *
 * The page is statically prerendered and has no backend, so the usual
 * injection surface is small -- but it still ships an inline boot script and
 * inline JSON-LD, embeds video, and loads two Google font stylesheets. The
 * policy below is written tightly around exactly that and nothing more.
 *
 * 'unsafe-inline' on script-src is required by two things we deliberately
 * want: the pre-paint accessibility script (it must run before first paint,
 * so it cannot be an external file) and Next's own inline bootstrap. Moving
 * to a nonce needs a per-request header, which means giving up the fully
 * static render -- not a trade worth making for a brochure page. Revisit when
 * the cart and accounts arrive, since by then the page is dynamic anyway.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  /*
   * Deliberately NOT upgrade-insecure-requests. Every subresource here is
   * same-origin and relative, so it would upgrade nothing in production --
   * but it makes WebKit rewrite http://localhost to https://localhost, where
   * the TLS handshake fails, every chunk 404s and the page never hydrates.
   * It cost us a working Safari test run. HSTS already forces HTTPS.
   */
].join("; ");

const nextConfig: NextConfig = {
  // Do not advertise the framework and version to scanners.
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            // Nothing on this page needs any of these.
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            // Served over HTTPS in production; harmless over http on localhost.
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        // Fingerprinted build output never changes under the same name.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/video/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/img/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000" },
        ],
      },
    ];
  },
};

export default nextConfig;
