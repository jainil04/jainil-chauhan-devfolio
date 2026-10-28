import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Jainil Chauhan — Senior Frontend Engineer";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f5f3ef",
          color: "#2c2c2c",
        }}
      >
        <div style={{ display: "flex", width: 80, height: 8, borderRadius: 4, background: "#4a6741", marginBottom: 40 }} />
        <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 1.05, display: "flex" }}>Jainil Chauhan</div>
        <div style={{ fontSize: 44, marginTop: 24, color: "#4a6741", display: "flex" }}>Senior Frontend Engineer</div>
        <div style={{ fontSize: 30, marginTop: 40, color: "#6b6b6b", display: "flex" }}>
          Performance · Accessibility · Micro-frontends
        </div>
        <div style={{ fontSize: 26, marginTop: "auto", color: "#6b6b6b", display: "flex" }}>jainilchauhan.com</div>
      </div>
    ),
    size,
  );
}
