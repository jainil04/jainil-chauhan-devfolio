"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MarketsPage() {
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
            Markets
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
          Finance & Data
        </h2>
        <p
          className="text-base md:text-lg max-w-2xl mb-8"
          style={{
            color: "var(--muted-foreground)",
            lineHeight: "1.75",
          }}
        >
          I track markets not for day trading, but because financial systems are the most complex real-time data processing challenges humans have built.
        </p>
      </motion.section>

      {/* ── Content Sections ── */}
      <section className="mx-auto max-w-4xl" style={{ paddingBottom: "3.13rem", paddingLeft: "3.13rem", paddingRight: "3.13rem" }}>

        {/* Markets */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="mb-6">
            <h3
              className="text-2xl md:text-3xl mb-2"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--foreground)",
              }}
            >
              Market Systems
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Investing", "Data Viz", "Real-time Systems"].map((tag) => (
                <span
                  key={tag}
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
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p
              className="text-base md:text-lg"
              style={{
                color: "var(--muted-foreground)",
                lineHeight: "1.75",
              }}
            >
              Understanding market microstructure made me better at designing real-time dashboards and data pipelines.
            </p>
            <p
              className="text-base md:text-lg"
              style={{
                color: "var(--muted-foreground)",
                lineHeight: "1.75",
              }}
            >
              Also, compound interest is the most powerful force in the universe. Einstein probably didn&rsquo;t say that, but he should have.
            </p>
          </div>
        </motion.div>

      </section>
    </div>
  );
}
