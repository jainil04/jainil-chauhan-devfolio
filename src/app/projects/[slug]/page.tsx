"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import AIAutopsy from "@/components/projects/AIAutopsy";
import Prism from "@/components/projects/Prism";
import ChainOfThoughtVisualizer from "@/components/projects/ChainOfThoughtVisualizer";

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) return notFound();

  return (
    <div
      className="noise-overlay min-h-screen"
      style={{ background: "var(--background)" }}
    >
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md"
        style={{
          background:
            "color-mix(in oklch, var(--background) 85%, transparent)",
        }}
      >
        <div
          className="mx-auto py-5 flex items-center justify-between"
          style={{ paddingLeft: "3.13rem", paddingRight: "3.13rem" }}
        >
          <Link
            href="/projects"
            className="text-sm flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.05em",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Projects
          </Link>

          <h1
            className="text-base md:text-lg"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--foreground)",
            }}
          >
            {project.title}
          </h1>

          <div className="w-16" />
        </div>
      </header>

      {/* ── Project Header ── */}
      <motion.section
        className="mx-auto max-w-5xl"
        style={{
          paddingTop: "4rem",
          paddingBottom: "2rem",
          paddingLeft: "3.13rem",
          paddingRight: "3.13rem",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <h2
          className="text-3xl md:text-5xl mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--foreground)",
          }}
        >
          {project.title}
        </h2>
        <p
          className="text-base md:text-lg max-w-2xl mb-6"
          style={{
            color: "var(--muted-foreground)",
            lineHeight: "1.75",
          }}
        >
          {project.description}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs uppercase tracking-wider px-3 py-1 rounded-full"
              style={{
                background: "var(--card)",
                color: "var(--foreground)",
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                border: "1px solid var(--border)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
              }}
            >
              GitHub &rarr;
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
              }}
            >
              Live Demo &rarr;
            </a>
          )}
        </div>
      </motion.section>

      {/* ── Project Content ── */}
      <section
        className="mx-auto max-w-5xl"
        style={{
          paddingBottom: "5rem",
          paddingLeft: "3.13rem",
          paddingRight: "3.13rem",
        }}
      >
        {project.slug === "ai-autopsy" && <AIAutopsy />}
        {project.slug === "prism" && <Prism />}
        {project.slug === "chain-of-thought-visualizer" && <ChainOfThoughtVisualizer />}
      </section>
    </div>
  );
}
