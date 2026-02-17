"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TRAILS } from "@/data/trails";
import { SNOWBOARDING_DATA } from "@/data/snowboarding";
import {
  calculateAggregatedStats,
  generateAchievements,
} from "@/utils/metricsEngine";
import StatsPanel from "@/components/StatsPanel";
import Achievements from "@/components/Achievements";
import SnowboardingSection from "@/components/SnowboardingSection";

type ViewMode = "trails" | "snowboarding";

/* ───────────────────── Page Component ───────────────────── */

export default function OutdoorActivitiesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("trails");

  // Calculate stats from trails data
  const stats = useMemo(() => calculateAggregatedStats(TRAILS), []);
  const achievements = useMemo(() => generateAchievements(TRAILS, stats), [stats]);

  return (
    <div
      className="noise-overlay min-h-screen"
      style={{ background: "var(--background)" }}
    >
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md"
        style={{
          background: "color-mix(in oklch, var(--background) 85%, transparent)",
        }}
      >
        <div
          className="mx-auto py-5 flex items-center justify-between"
          style={{ paddingLeft: "3.13rem", paddingRight: "3.13rem" }}
        >
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

          <div style={{ width: "100px" }} />
        </div>
      </header>

      {/* ── Hero Section (Same for both views) ── */}
      <motion.section
        className="mx-auto"
        style={{
          paddingTop: "5.63rem",
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
          Mountains & Nature
        </h2>
        <p
          className="text-base md:text-lg max-w-2xl mb-8"
          style={{
            color: "var(--muted-foreground)",
            lineHeight: "1.75",
          }}
        >
          I spend my best thinking time between trees. The Pacific
          Northwest isn&rsquo;t just where I live — it&rsquo;s how I
          recharge.
        </p>
      </motion.section>

      {/* ── Mode Toggle Pills (Centered) ── */}
      <div className="flex justify-center mb-12" style={{ paddingLeft: "3.13rem", paddingRight: "3.13rem" }}>
        <div
          className="flex items-center gap-2 rounded-full p-1"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <button
            onClick={() => setViewMode("trails")}
            className="px-6 py-2 rounded-full transition-all duration-300"
            style={{
              background:
                viewMode === "trails" ? "var(--foreground)" : "transparent",
              color:
                viewMode === "trails"
                  ? "var(--background)"
                  : "var(--muted-foreground)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              letterSpacing: "0.05em",
              minWidth: "140px",
            }}
          >
            Trails
          </button>
          <button
            onClick={() => setViewMode("snowboarding")}
            className="px-6 py-2 rounded-full transition-all duration-300"
            style={{
              background:
                viewMode === "snowboarding" ? "var(--foreground)" : "transparent",
              color:
                viewMode === "snowboarding"
                  ? "var(--background)"
                  : "var(--muted-foreground)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.875rem",
              letterSpacing: "0.05em",
              minWidth: "140px",
            }}
          >
            Snowboarding
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "trails" ? (
          <motion.div
            key="trails-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* ── Hiking Description ── */}
            <motion.section
              className="mx-auto max-w-4xl mb-12"
              style={{
                paddingLeft: "3.13rem",
                paddingRight: "3.13rem",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* <div className="space-y-4">
                <p
                  className="text-base md:text-lg"
                  style={{
                    color: "var(--muted-foreground)",
                    lineHeight: "1.75",
                  }}
                >
                  Hiking 15+ miles on a weekend resets the problem-solving
                  part of my brain. The best architectural decisions
                  I&rsquo;ve made started on a trail.
                </p>
                <p
                  className="text-base md:text-lg"
                  style={{
                    color: "var(--muted-foreground)",
                    lineHeight: "1.75",
                  }}
                >
                  There&rsquo;s a system design lesson in every forest:
                  distributed, resilient, no single point of failure.
                </p>
              </div> */}
            </motion.section>

            {/* ── Stats Panel ── */}
            <section
              className="mx-auto max-w-7xl mb-16"
              style={{
                paddingLeft: "3.13rem",
                paddingRight: "3.13rem",
              }}
            >
              <StatsPanel stats={stats} />
            </section>

            {/* ── Achievements ── */}
            <section
              className="mx-auto max-w-7xl mb-16"
              style={{
                paddingLeft: "3.13rem",
                paddingRight: "3.13rem",
              }}
            >
              <Achievements achievements={achievements} />
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="snowboarding-mode"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* ── Snowboarding Description ── */}
            <motion.section
              className="mx-auto max-w-4xl mb-12"
              style={{
                paddingLeft: "3.13rem",
                paddingRight: "3.13rem",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* <div className="space-y-4">
                <p
                  className="text-base md:text-lg"
                  style={{
                    color: "var(--muted-foreground)",
                    lineHeight: "1.75",
                  }}
                >
                  I snowboard to reset. Lake Tahoe is my winter playground —
                  Heavenly, Northstar, Kirkwood. Each resort feels different:
                  wide cruisers, icy mornings, surprise powder days.
                </p>
                <p
                  className="text-base md:text-lg"
                  style={{
                    color: "var(--muted-foreground)",
                    lineHeight: "1.75",
                  }}
                >
                  Level: Intermediate snowboarder. Comfortable carving blues,
                  working toward cleaner turns and more control. Every season
                  feels slightly better than the last.
                </p>
              </div> */}
            </motion.section>

            {/* ── Snowboarding Section ── */}
            <section
              className="mx-auto max-w-7xl mb-16"
              style={{
                paddingLeft: "3.13rem",
                paddingRight: "3.13rem",
              }}
            >
              <SnowboardingSection data={SNOWBOARDING_DATA} />
            </section>
          </motion.div>
        )}
      </AnimatePresence>

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
