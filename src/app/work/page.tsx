"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ResumeDownload from "@/components/ResumeDownload";

type Bullet = { lead?: string; text: string };

const workExperience: {
  title: string;
  company: string;
  date: string;
  client?: string;
  tech?: string;
  responsibilities: Bullet[];
}[] = [
  {
    title: "Senior Software Engineer, Frontend",
    company: "Williams-Sonoma Inc.",
    date: "Feb 2021 – Present",
    client: "Product MFE serving 8 brands · via Info Way Solutions, then NTT Data / Nexient",
    responsibilities: [
      {
        lead: "Cut product page payload and boosted speed:",
        text: "co-designed a Product BFF redesign with one other engineer and wrote most of the code; it defers SKU-level data (prices, images, flags) until user interaction, cutting payload from about 20MB and improving time to interactive by about 80%.",
      },
      {
        lead: "Owned Core Web Vitals",
        text: "(FCP, LCP, TTFB, TBT) across Global, Shop, and Product MFEs via code-splitting, deferred execution, and state reuse; presented before/after results to senior leadership.",
      },
      {
        lead: "Led a cross-repo investigation",
        text: "into runaway Bing Maps API usage across six repositories: standardized caching, fixed a Canadian postal-code cache bypass, and flagged exposed API keys, cutting monthly transactions from 139M to about 80M (42%) and avoiding a higher enterprise contract tier.",
      },
      {
        lead: "Sustained the savings:",
        text: "shipped a Mar 2026 follow-on fix cutting daily requests 18% (3.21M to 2.51M); usage has stayed under target six months running (about 70M a month vs. a 144M peak).",
      },
      {
        lead: "Built accessibility into every release:",
        text: "validated Product MFE features with VoiceOver, keyboard-only navigation, and Lighthouse accessibility audits, and fixed the issues found for inclusive shopping across brands.",
      },
      {
        lead: "Built reusable, shared frontend architecture:",
        text: "shared Quick Look and AI sales-nudge components across MFEs via Webpack Module Federation; centralized shared dependencies in the Global shell to shrink bundles.",
      },
      {
        lead: "Debugged production browser issues:",
        text: "traced an iOS Safari crash in the 3D Bedding Visualizer to off-screen geometry recomputation via device CPU profiling; shipped a visibility-gated fix.",
      },
      {
        lead: "Delivered across teams:",
        text: "shipped Figma-driven features across all 8 brands ahead of deadline with zero defects, backed by Jest tests (standard on every feature and bug fix); took over a teammate's Outward third-party integration mid-flight and released it to production with zero issues.",
      },
      {
        lead: "On-call and tooling:",
        text: "part of peak-season triage with QE (ELK, Grafana); reviewed PRs daily; built agentic PR and Jira tooling.",
      },
    ],
    tech: "JavaScript (ES6+), Vue 3, Vuex, Node.js (BFF), Webpack Module Federation, Tailwind, SCSS, Jest, Playwright, Docker, Git",
  },
  {
    title: "Software Engineer, Frontend",
    company: "Levi Strauss & Co.",
    date: "Jul 2018 – Feb 2021",
    client: "via Info Way Solutions",
    responsibilities: [
      { text: "Built the Order History page, Loyalty enrollment/dashboard, and checkout form for Levi's new Vue.js commerce platform." },
      { text: "Built debounced typeahead search (Elasticsearch) and GraphQL schema/resolvers for the BFF, with JWT auth for REST calls." },
      { text: "Drove an 18% mobile performance improvement via SCSS and asset-loading optimizations; built to WCAG 2.0 with Jest tests." },
      { text: "As an Adobe Target A/B test developer, shipped redesigned navigation, carousel, and modal; several tests won." },
    ],
  },
];

export default function WorkPage() {
  return (
    <div
      className="noise-overlay min-h-screen"
      style={{ background: "var(--background)" }}
    >
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: "color-mix(in oklch, var(--background) 85%, transparent)" }}>
        <div className="mx-auto py-5 flex items-center justify-between" style={{ paddingLeft: "3.13rem", paddingRight: "3.13rem" }}>
          <Link
            href="/"
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
            Back
          </Link>

          <h1
            className="text-base md:text-lg"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--foreground)",
            }}
          >
            Work
          </h1>

          <div className="w-16" />
        </div>
      </header>

      {/* ── Hero ── */}
      <motion.section
        className="mx-auto"
        style={{ paddingTop: "5.63rem", paddingBottom: "3.13rem", paddingLeft: "3.13rem", paddingRight: "3.13rem" }}
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
          Where I&rsquo;ve Worked
        </h2>
        <p
          className="text-base md:text-lg max-w-2xl mb-8"
          style={{
            color: "var(--muted-foreground)",
            lineHeight: "1.75",
          }}
        >
          Senior frontend engineer with 8 years building high-traffic e-commerce applications for Williams-Sonoma Inc. (Pottery Barn, West Elm, Williams Sonoma) and Levi Strauss &amp; Co. — micro-frontend architecture, Core Web Vitals, and accessible, responsive UI, with measurable performance and cost wins.
        </p>
        <ResumeDownload />
      </motion.section>

      {/* ── Content Sections ── */}
      <section className="mx-auto max-w-4xl" style={{ paddingBottom: "3.13rem", paddingLeft: "3.13rem", paddingRight: "3.13rem" }}>

        {/* Work Experience Timeline */}
        {workExperience.map((job, index) => (
          <motion.div
            key={index}
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="mb-6">
              <h3
                className="text-2xl md:text-3xl mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--foreground)",
                }}
              >
                {job.title}
              </h3>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                <span
                  className="text-base md:text-lg"
                  style={{
                    color: "var(--primary)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                  }}
                >
                  {job.company}
                </span>
                <span
                  className="text-sm md:text-base"
                  style={{
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                  }}
                >
                  {job.date}
                </span>
              </div>
            </div>

            {/* Client heading */}
            {job.client && (
              <h4
                className="text-xl md:text-2xl mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--foreground)",
                  opacity: 0.9,
                  fontStyle: "italic"
                }}
              >
                {job.client}
              </h4>
            )}

            {/* Old bullet-point format (for backwards compatibility) */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <ul className="space-y-3">
                {job.responsibilities.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3"
                    style={{
                      color: "var(--muted-foreground)",
                      lineHeight: "1.75",
                    }}
                  >
                    <span
                      className="mt-2 shrink-0"
                      style={{
                        color: "var(--accent)",
                        fontSize: "0.5rem",
                      }}
                    >
                      ●
                    </span>
                    <span className="text-base md:text-lg">
                      {item.lead && (
                        <strong style={{ color: "var(--foreground)", fontWeight: 600 }}>{item.lead} </strong>
                      )}
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {job.tech && (
              <p
                className="mt-6 text-sm"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)", lineHeight: "1.75" }}
              >
                <span style={{ color: "var(--foreground)" }}>Tech: </span>
                {job.tech}
              </p>
            )}
          </motion.div>
        ))}

      </section>
    </div>
  );
}
