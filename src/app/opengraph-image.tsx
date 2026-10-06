import { ImageResponse } from "next/og";

export const alt =
  "Trenchless Distribution — no-dig pipe lining technology, stocked and supported";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
 * The share card. Built from the page's own tokens rather than a screenshot,
 * so it stays correct when the hero changes. ImageResponse supports flexbox
 * only, so this is laid out in columns and rows, never a grid.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#161616",
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            height: 10,
            width: "100%",
            backgroundImage: "linear-gradient(90deg, #b356c0 0%, #0da6d0 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "60px 72px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 24,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#0da6d0",
                fontWeight: 700,
              }}
            >
              Trenchless Distribution
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 76,
                lineHeight: 1.08,
                fontWeight: 700,
                maxWidth: 950,
              }}
            >
              No-dig pipe lining technology, stocked and supported.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderLeft: "4px solid #0da6d0",
              paddingLeft: 24,
            }}
          >
            <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
              We supply the contractors who do the work.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                color: "#b8bcc2",
                marginTop: 4,
              }}
            >
              We do not perform installations.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontSize: 26,
              color: "#b8bcc2",
            }}
          >
            <div style={{ display: "flex" }}>Puyallup, WA · 253-368-5614</div>
            <div style={{ display: "flex" }}>trenchlessdistro.com</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
