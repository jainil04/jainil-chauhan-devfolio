/**
 * Stats Panel Component
 * AllTrails-inspired badge card grid with divider lines
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import type { AggregatedStats } from "@/types/types";
import BadgeIcon, { type BadgeVariant } from "@/components/BadgeIcon";

interface StatsPanelProps {
  stats: AggregatedStats;
  className?: string;
}

export default function StatsPanel({ stats, className = "" }: StatsPanelProps) {
  const statItems: {
    label: string;
    value: string;
    badge: BadgeVariant;
  }[] = [
    {
      label: "Longest activity",
      value: `${stats.longestHike ? stats.longestHike.length.toFixed(1) : stats.totalMiles.toFixed(1)} mi`,
      badge: "tree",
    },
    {
      label: "Trails completed",
      value: `${stats.totalTrails} trails`,
      badge: "signpost",
    },
    {
      label: "Parks explored",
      value: `${stats.parks.length} parks`,
      badge: "flower",
    },
    {
      label: "Highest point",
      value: `${stats.highestElevation.toLocaleString()} ft`,
      badge: "topography",
    },
    {
      label: "Total miles",
      value: `${stats.totalMiles.toFixed(1)} mi`,
      badge: "footprints",
    },
    {
      label: "Elevation gained",
      value: `${stats.totalElevationGain.toLocaleString()} ft`,
      badge: "hiker",
    },
  ];

  return (
    <div className={className}>
      {/* Badge Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="rounded-2xl overflow-hidden mb-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {statItems.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="flex flex-col items-center justify-center py-8 md:py-10 px-4"
              >
                {/* Badge Icon */}
                <div className="mb-4 drop-shadow-md">
                  <BadgeIcon variant={stat.badge} size={100} />
                </div>

                {/* Label */}
                <p
                  className="text-sm md:text-base mb-1"
                  style={{
                    color: "oklch(0.30 0.02 70)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </p>

                {/* Value */}
                <p
                  className="text-2xl md:text-3xl font-bold"
                  style={{
                    color: "oklch(0.22 0.02 70)",
                    fontFamily: "var(--font-heading)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {stat.value}
                </p>
              </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Hikes */}
      {(stats.longestHike || stats.hardestHike) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {stats.longestHike && (
            <div
              className="p-6 rounded-xl"
            >
              <h4
                className="text-xs uppercase tracking-wider mb-3"
                style={{
                  color: "oklch(0.42 0.03 70)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                }}
              >
                Longest Hike
              </h4>
              <h3
                className="text-lg md:text-xl mb-1"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "oklch(0.22 0.02 70)",
                }}
              >
                {stats.longestHike.trail}
              </h3>
              <p
                className="text-sm mb-3"
                style={{ color: "oklch(0.42 0.03 70)" }}
              >
                {stats.longestHike.park}
              </p>
              <div className="flex gap-5">
                <div>
                  <span
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "oklch(0.22 0.02 70)",
                    }}
                  >
                    {stats.longestHike.length.toFixed(1)}
                  </span>
                  <span
                    className="text-xs ml-1"
                    style={{
                      color: "oklch(0.42 0.03 70)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    mi
                  </span>
                </div>
                <div>
                  <span
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "oklch(0.22 0.02 70)",
                    }}
                  >
                    {stats.longestHike.elevationGain.toLocaleString()}
                  </span>
                  <span
                    className="text-xs ml-1"
                    style={{
                      color: "oklch(0.42 0.03 70)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ft
                  </span>
                </div>
              </div>
            </div>
          )}

          {stats.hardestHike && (
            <div
              className="p-6 rounded-xl"
            >
              <h4
                className="text-xs uppercase tracking-wider mb-3"
                style={{
                  color: "oklch(0.42 0.03 70)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                }}
              >
                Hardest Hike
              </h4>
              <h3
                className="text-lg md:text-xl mb-1"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "oklch(0.22 0.02 70)",
                }}
              >
                {stats.hardestHike.trail}
              </h3>
              <p
                className="text-sm mb-3"
                style={{ color: "oklch(0.42 0.03 70)" }}
              >
                {stats.hardestHike.park}
              </p>
              <div className="flex gap-5">
                <div>
                  <span
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "oklch(0.22 0.02 70)",
                    }}
                  >
                    {Math.round(
                      stats.hardestHike.elevationGain / stats.hardestHike.length
                    ).toLocaleString()}
                  </span>
                  <span
                    className="text-xs ml-1"
                    style={{
                      color: "oklch(0.42 0.03 70)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ft/mi
                  </span>
                </div>
                <div>
                  <span
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: "oklch(0.22 0.02 70)",
                    }}
                  >
                    {stats.hardestHike.elevationGain.toLocaleString()}
                  </span>
                  <span
                    className="text-xs ml-1"
                    style={{
                      color: "oklch(0.42 0.03 70)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ft
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
