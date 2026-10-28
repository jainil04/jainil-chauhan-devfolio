import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Raspberry Pi",
  description:
    "A self-hosted Home Assistant smart home on a Raspberry Pi 5: custom dashboards, Claude Code controlling devices over MCP, and a Mac charging automation.",
  path: "/raspberry-pi",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
