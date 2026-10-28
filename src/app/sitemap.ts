import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { SITE_URL } from "@/lib/seo";

// /ai-notes is a placeholder (noindex), so it is left out for now.
const STATIC_ROUTES = ["", "/work", "/projects", "/raspberry-pi", "/photos", "/outdoor-activities"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map((path) => ({
      url: `${SITE_URL}${path}`,
      priority: path === "" ? 1 : 0.8,
    })),
    ...PROJECTS.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      priority: 0.7,
    })),
  ];
}
