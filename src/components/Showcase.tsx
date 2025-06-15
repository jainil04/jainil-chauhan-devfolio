import React from "react";

import ProjectShowcase from "@/components/ProjectShowcase";
import { Project } from "@/types/types";

const projects: Project[] = [
  {
    title: "React Project",
    description: "Details coming soon.",
    imageUrl: "/images/subscription-platform.png",
    engagement: "12 min",
    satisfaction: "4.5★",
    githubUrl: "https://github.com/jainil04",
  },
  {
    title: "React Project",
    description: "Details coming soon.",
    imageUrl: "/images/ecommerce.png",
    engagement: "8 min",
    satisfaction: "4.7★",
    githubUrl: "https://github.com/jainil04",
  },
];

export default function Showcase() {
  return (
    <section className="min-h-screen">
      <div className="unbounded-headline-title flex justify-center">This is my showcase</div>
      <ProjectShowcase projects={projects} />
    </section>
  );
}
