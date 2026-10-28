import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Photography",
  description:
    "Photography by Jainil Chauhan, shot on a Canon RP: places, moments and compositions.",
  path: "/photos",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
