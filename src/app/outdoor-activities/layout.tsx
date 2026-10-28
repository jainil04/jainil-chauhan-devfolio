import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Outdoor Activities",
  description:
    "Hiking and snowboarding: trail stats, achievements and seasons around Lake Tahoe.",
  path: "/outdoor-activities",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
