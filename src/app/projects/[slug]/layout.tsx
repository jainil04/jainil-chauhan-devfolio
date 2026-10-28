import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  return { title: `${project?.title ?? "Project"} — Jainil Chauhan` };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
