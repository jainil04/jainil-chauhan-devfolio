/**
 * Elevation Profile Component
 * Renders an elegant elevation chart with animated draw-in effect
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

interface ElevationProfileProps {
  data: Array<{ distance: number; elevation: number }>;
  height?: number;
  showTooltip?: boolean;
}

export default function ElevationProfile({
  data,
  height = 200,
  showTooltip = true,
}: ElevationProfileProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!data || data.length === 0) {
    return null;
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { distance: number; elevation: number }; value: number }> }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="px-3 py-2 rounded"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
          }}
        >
          <p style={{ color: "var(--foreground)", marginBottom: "0.25rem" }}>
            Distance: {payload[0].payload.distance.toFixed(1)} mi
          </p>
          <p style={{ color: "var(--muted-foreground)" }}>
            Elevation: {Math.round(payload[0].value).toLocaleString()} ft
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height: `${height}px`,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="elevationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--foreground)"
                stopOpacity={0.1}
              />
              <stop
                offset="95%"
                stopColor="var(--foreground)"
                stopOpacity={0.01}
              />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="distance"
            stroke="var(--muted-foreground)"
            strokeOpacity={0.3}
            tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
            tickFormatter={(value) => `${value.toFixed(0)}`}
            label={{
              value: "Distance (miles)",
              position: "insideBottom",
              offset: -5,
              style: {
                fontSize: "0.65rem",
                fill: "var(--muted-foreground)",
                fontFamily: "var(--font-mono)",
              },
            }}
          />

          <YAxis
            stroke="var(--muted-foreground)"
            strokeOpacity={0.3}
            tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            label={{
              value: "Elevation (ft)",
              angle: -90,
              position: "insideLeft",
              style: {
                fontSize: "0.65rem",
                fill: "var(--muted-foreground)",
                fontFamily: "var(--font-mono)",
              },
            }}
          />

          {showTooltip && (
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--muted-foreground)", strokeWidth: 1, strokeDasharray: "3 3" }} />
          )}

          <Area
            type="monotone"
            dataKey="elevation"
            stroke="var(--foreground)"
            strokeWidth={isHovered ? 2 : 1.5}
            fill="url(#elevationGradient)"
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
