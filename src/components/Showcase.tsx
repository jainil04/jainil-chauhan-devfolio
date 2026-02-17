import React from "react";

import ProjectShowcase from "@/components/ProjectShowcase";
import TechnologyStack from "@/components/TechnologyStack";
import { Project } from "@/types/types";

const projects: Project[] = [
  {
    title: "React Project",
    description: "Details coming soon.",
    imageUrl: "",
    engagement: "12 min",
    satisfaction: "4.5★",
    githubUrl: "https://github.com/jainil04",
  },
  {
    title: "React Project",
    description: "Details coming soon.",
    imageUrl: "",
    engagement: "8 min",
    satisfaction: "4.7★",
    githubUrl: "https://github.com/jainil04",
  },
];

export default function Showcase() {
  return (
    <section className="min-h-screen">
      <div className="unbounded-headline-title flex justify-center">A Peek Into My Work</div>
      <div className="flex flex-col lg:flex-row justify-between items-center rounded-3xl p-10 max-w-6xl mx-auto transition-all duration-300">
        <div className="absolute top-0 left-0 h-full w-24 z-10 pointer-events-none bg-transparent backdrop-blur-sm rounded-l-3xl" style={{
          maskImage: "linear-gradient(to right, black, transparent)",
          WebkitMaskImage: "linear-gradient(to right, black, transparent)"
        }} />
        <TechnologyStack />
        {/* Right blur */}
        <div className="absolute top-0 right-0 h-full w-24 z-10 pointer-events-none bg-transparent backdrop-blur-sm rounded-r-3xl" style={{
          maskImage: "linear-gradient(to left, black, transparent)",
          WebkitMaskImage: "linear-gradient(to left, black, transparent)"
        }} />
      </div>
      <ProjectShowcase projects={projects} />
    </section>
  );
}
