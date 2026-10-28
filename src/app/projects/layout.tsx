import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Jainil Chauhan: Lighthouse Monitor, AI Prompt Autopsy, Prism and a Chain-of-Thought Visualizer.",
  path: "/projects",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
