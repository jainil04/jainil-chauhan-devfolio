"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/* ───────────────────── Page Component ───────────────────── */

export default function OutdoorActivitiesPage() {
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
            Outdoor Activities
          </h1>

          <div className="w-16" /> {/* spacer for centering */}
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
          Mountains & Nature
        </h2>
        <p
          className="text-base md:text-lg max-w-2xl mb-8"
          style={{
            color: "var(--muted-foreground)",
            lineHeight: "1.75",
          }}
        >
          I spend my best thinking time between trees. The Pacific Northwest isn&rsquo;t just where I live — it&rsquo;s how I recharge.
        </p>
      </motion.section>

      {/* ── Content Sections ── */}
      <section className="mx-auto max-w-4xl" style={{ paddingBottom: "3.13rem", paddingLeft: "3.13rem", paddingRight: "3.13rem" }}>

        {/* Hiking Section */}
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
              Hiking
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {["PNW", "Nature", "Thinking Space", "15+ Miles"].map((tag) => (
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
              Hiking 15+ miles on a weekend resets the problem-solving part of my brain. The best architectural decisions I&rsquo;ve made started on a trail.
            </p>
            <p
              className="text-base md:text-lg"
              style={{
                color: "var(--muted-foreground)",
                lineHeight: "1.75",
              }}
            >
              There&rsquo;s a system design lesson in every forest: distributed, resilient, no single point of failure.
            </p>
          </div>
        </motion.div>

        {/* Snowboarding Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="mb-6">
            <h3
              className="text-2xl md:text-3xl mb-2"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--foreground)",
              }}
            >
              Snowboarding
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Lake Tahoe", "Intermediate", "Momentum", "Reset"].map((tag) => (
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
              I snowboard to reset. Lake Tahoe is my winter playground — Heavenly, Northstar, Kirkwood. Each resort feels different: wide cruisers, icy mornings, surprise powder days.
            </p>
            <p
              className="text-base md:text-lg"
              style={{
                color: "var(--muted-foreground)",
                lineHeight: "1.75",
              }}
            >
              Level: Intermediate snowboarder. Comfortable carving blues, working toward cleaner turns and more control. Every season feels slightly better than the last.
            </p>
          </div>
        </motion.div>

        {/* Resorts List */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <h4
            className="text-xl md:text-2xl mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--foreground)",
            }}
          >
            Resorts I&rsquo;ve Explored
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Heavenly", note: "Wide cruisers, lake views" },
              { name: "Northstar", note: "Well-groomed, family-friendly" },
              { name: "Kirkwood", note: "Powder days, more challenging terrain" },
            ].map((resort) => (
              <div
                key={resort.name}
                className="p-6 rounded-lg"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <h5
                  className="text-lg font-semibold mb-2"
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {resort.name}
                </h5>
                <p
                  className="text-sm"
                  style={{
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {resort.note}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </section>

      {/* ── Footer ── */}
      <footer className="pb-8 text-center">
        <p
          className="text-xs"
          style={{
            color: "var(--muted-foreground)",
            opacity: 0.4,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
          }}
        >
          where I recharge
        </p>
      </footer>
    </div>
  );
}
