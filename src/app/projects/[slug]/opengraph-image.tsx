import { ImageResponse } from "next/og";
import { PROJECTS } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project by Jainil Chauhan";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  const title = project?.title ?? "Project";
  const tech = (project?.techStack ?? []).slice(0, 5).join(" · ");

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
        <div style={{ fontSize: 28, color: "#4a6741", display: "flex", marginBottom: 16 }}>PROJECT</div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, display: "flex" }}>{title}</div>
        <div style={{ fontSize: 30, marginTop: 36, color: "#6b6b6b", display: "flex" }}>{tech}</div>
        <div style={{ fontSize: 26, marginTop: "auto", color: "#6b6b6b", display: "flex" }}>
          Jainil Chauhan · jainilchauhan.com
        </div>
      </div>
    ),
    size,
  );
}
