/**
 * Stats Panel Component
 * Displays aggregated hiking statistics with elegant typography
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import type { AggregatedStats } from "@/types/types";

interface StatsPanelProps {
  stats: AggregatedStats;
  className?: string;
}

export default function StatsPanel({ stats, className = "" }: StatsPanelProps) {
  const statItems = [
    {
      label: "Total Miles",
      value: stats.totalMiles.toFixed(1),
      unit: "mi",
      icon: "🥾",
    },
    {
      label: "Elevation Gained",
      value: stats.totalElevationGain.toLocaleString(),
      unit: "ft",
      icon: "📈",
    },
    {
      label: "Highest Peak",
      value: stats.highestElevation.toLocaleString(),
      unit: "ft",
      icon: "⛰️",
    },
    {
      label: "Trails Completed",
      value: stats.totalTrails.toString(),
      unit: "trails",
      icon: "🌲",
    },
    {
      label: "Parks Explored",
      value: stats.parks.length.toString(),
      unit: "parks",
      icon: "🏞️",
    },
    {
      label: "Average Distance",
      value: stats.averageDistance.toFixed(1),
      unit: "mi",
      icon: "📊",
    },
  ];

  return (
    <div className={className}>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.05,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="relative"
          >
            <div
              className="flex flex-col p-4 rounded-lg"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                className="text-xl mb-2 block"
                role="img"
                aria-label={stat.label}
              >
                {stat.icon}
              </span>
              <div
                className="text-xl md:text-2xl font-light mb-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--foreground)",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value} <span
                  style={{
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                  }}
                >{stat.unit}</span>
              </div>
              <p
                className="text-xs uppercase tracking-wider"
                style={{
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.08em",
                  fontSize: "0.6rem",
                }}
              >
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Hikes */}
      {(stats.longestHike || stats.hardestHike) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {stats.longestHike && (
            <div
              className="p-6 rounded-lg"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <h4
                className="text-sm uppercase tracking-wider mb-3"
                style={{
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                }}
              >
                Longest Hike
              </h4>
              <h3
                className="text-xl mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--foreground)",
                }}
              >
                {stats.longestHike.trail}
              </h3>
              <p
                className="text-sm mb-3"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {stats.longestHike.park}
              </p>
              <div className="flex gap-4">
                <div>
                  <span
                    className="text-2xl font-light"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--foreground)",
                    }}
                  >
                    {stats.longestHike.length.toFixed(1)}
                  </span>
                  <span
                    className="text-xs ml-1"
                    style={{
                      color: "var(--muted-foreground)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    mi
                  </span>
                </div>
                <div>
                  <span
                    className="text-2xl font-light"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--foreground)",
                    }}
                  >
                    {stats.longestHike.elevationGain.toLocaleString()}
                  </span>
                  <span
                    className="text-xs ml-1"
                    style={{
                      color: "var(--muted-foreground)",
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
              className="p-6 rounded-lg"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <h4
                className="text-sm uppercase tracking-wider mb-3"
                style={{
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.1em",
                }}
              >
                Hardest Hike
              </h4>
              <h3
                className="text-xl mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--foreground)",
                }}
              >
                {stats.hardestHike.trail}
              </h3>
              <p
                className="text-sm mb-3"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                {stats.hardestHike.park}
              </p>
              <div className="flex gap-4">
                <div>
                  <span
                    className="text-2xl font-light"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--foreground)",
                    }}
                  >
                    {Math.round(
                      stats.hardestHike.elevationGain / stats.hardestHike.length
                    ).toLocaleString()}
                  </span>
                  <span
                    className="text-xs ml-1"
                    style={{
                      color: "var(--muted-foreground)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ft/mi
                  </span>
                </div>
                <div>
                  <span
                    className="text-2xl font-light"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--foreground)",
                    }}
                  >
                    {stats.hardestHike.elevationGain.toLocaleString()}
                  </span>
                  <span
                    className="text-xs ml-1"
                    style={{
                      color: "var(--muted-foreground)",
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
