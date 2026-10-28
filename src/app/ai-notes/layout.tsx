import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "AI Notes",
  description:
    "Ideas and sketches on AI, architecture and building software. More details coming soon.",
  path: "/ai-notes",
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
