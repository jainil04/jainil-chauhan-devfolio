import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Eight years of frontend engineering at Williams-Sonoma and Levi Strauss & Co.: micro-frontends, Core Web Vitals, accessibility, and measurable performance and cost wins.",
  path: "/work",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
