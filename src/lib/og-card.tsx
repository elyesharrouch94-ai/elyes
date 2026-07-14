import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#06070a",
          color: "#f2f3f5",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9aa0ac",
            marginBottom: 28,
          }}
        >
          Montréal · Canada &amp; Worldwide
        </div>
        <div style={{ display: "flex", fontSize: 116, fontWeight: 700, lineHeight: 1 }}>
          <span style={{ marginRight: 28 }}>Elyes</span>
          <span style={{ color: "#c7c7c7" }}>Harrouch</span>
        </div>
        <div style={{ fontSize: 32, color: "#9aa0ac", marginTop: 32 }}>
          Communications Specialist · Storytelling &amp; Brand Growth
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
