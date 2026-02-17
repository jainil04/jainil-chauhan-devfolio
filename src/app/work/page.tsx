"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const workExperience = [
  {
    title: "Senior Front-End Engineer",
    company: "NTT Data Americas",
    date: "Feb 2021 – Present",
    client: "Williams Sonoma, Inc.",
    content: [
      "When I joined, the frontend ecosystem was already large — multiple micro-frontends, shared dependencies, separate deployment streams. It worked, but it wasn't aging gracefully.",
      "Bundle sizes were growing.\nPerformance was drifting.\nMemory usage spiked under real customer interactions.\nAnd every new feature risked adding more weight.",
      "I stepped into ownership of the architecture layer.",
      "Instead of treating performance as an afterthought, I treated it as a product requirement.",
      "I restructured our Vue 3 micro-frontend setup using Module Federation with stricter dependency boundaries. I introduced dynamic imports strategically — not everywhere, but where it actually reduced critical path blocking. I reconfigured Webpack to enforce tree-shaking discipline and implemented Brotli compression in the delivery pipeline.",
      "Then I measured everything.",
      "Using Chrome DevTools heap snapshots and Vue DevTools profiling, I traced memory leaks to reactive misuse and component lifecycle inefficiencies. Some components were rewritten entirely using the Composition API to reduce unnecessary reactivity and CPU churn.",
      "The impact was structural, not cosmetic.",
    ],
    metrics: [
      "Client bundle size reduced by 60%",
      "Peak heap usage dropped by 50%",
      "Time-to-Interactive significantly improved",
      "Lighthouse scores moved from the 60s to the high 90s"
    ],
    closing: [
      "Beyond architecture, I handled high-priority production issues — tracing bugs across micro-frontends and API contracts, shipping same-day hotfixes that met SLA requirements.",
      "At this scale, frontend isn't just UI.\nIt's systems engineering with a user interface.",
      "I build for performance, maintainability, and measurable impact."
    ]
  },
  {
    title: "Front-End Engineer",
    company: "Info Way Solutions LLC",
    date: "July 2018 – Jan 2021",
    client: "Levi Strauss & Co.",
    content: [
      "This was where I transitioned from building features to understanding systems.",
      "I worked in a Vue 2 micro-frontend environment, building responsive UI components backed by Vuex state management. The focus wasn't just shipping features — it was ensuring those features could evolve without breaking everything else.",
      "I integrated GraphQL through Apollo Client, creating clean bridges between frontend components and middleware services. Instead of tightly coupling UI to backend responses, I structured data layers intentionally — separating query logic from presentation logic.",
      "But what truly shaped my engineering mindset was experimentation at scale.",
      "I developed and executed over 40 A/B and multivariate experiments using Adobe Target. Each experiment required custom JavaScript and CSS to dynamically alter user experiences without degrading performance or breaking the control group.",
      "That meant thinking about:"
    ],
    considerations: [
      "Script execution timing",
      "DOM mutation safety",
      "Analytics tracking accuracy",
      "Statistical integrity of results"
    ],
    closing: [
      "Experiments weren't just UI tweaks — they were measurable business decisions.",
      "To ensure stability, I wrote Jest unit tests that maintained branch coverage above 90%, reinforcing confidence in deployments and refactors.",
      "This phase taught me discipline:\nMeasure.\nValidate.\nShip with confidence.",
      "It laid the foundation for how I approach architecture today."
    ]
  },
  {
    title: "Server Test Operator",
    company: "Staffmark LLC",
    date: "Dec 2016 - Jun 2018",
    responsibilities: [],
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
          I&rsquo;m a Front-End Engineer focused on building production UI systems that stay fast at scale — clean architecture, measurable performance, and developer-friendly patterns.
        </p>
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
                Client: {job.client}
              </h4>
            )}

            {/* Narrative content */}
            {job.content && (
              <div className="space-y-4 mb-6">
                {job.content.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg whitespace-pre-line"
                    style={{
                      color: "var(--muted-foreground)",
                      lineHeight: "1.75",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {/* Metrics */}
            {job.metrics && (
              <div className="my-6 pl-6 border-l-2" style={{ borderColor: "var(--accent)" }}>
                {job.metrics.map((metric, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg mb-2"
                    style={{
                      color: "var(--foreground)",
                      lineHeight: "1.75",
                      fontWeight: 500,
                    }}
                  >
                    {metric}
                  </p>
                ))}
              </div>
            )}

            {/* Considerations */}
            {job.considerations && (
              <ul className="space-y-2 mb-6 ml-6">
                {job.considerations.map((item, i) => (
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
                    <span className="text-base md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Closing paragraphs */}
            {job.closing && (
              <div className="space-y-4 mt-6">
                {job.closing.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-base md:text-lg whitespace-pre-line"
                    style={{
                      color: "var(--muted-foreground)",
                      lineHeight: "1.75",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
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
                    <span className="text-base md:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}

      </section>
    </div>
  );
}
