/**
 * Snowboarding Section Component
 * Displays snowboarding stats and resort information
 */

"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { SnowboardingData } from "@/types/types";

interface SnowboardingSectionProps {
  data: SnowboardingData;
  className?: string;
}

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  drift: number;
  driftSpeed: number;
  driftAngle: number;
}

function SnowfallCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const COUNT = 120;
    const flakes: Snowflake[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.8,
      speed: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.55 + 0.2,
      drift: 0,
      driftSpeed: Math.random() * 0.008 + 0.003,
      driftAngle: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const flake of flakes) {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`;
        ctx.fill();

        flake.driftAngle += flake.driftSpeed;
        flake.x += Math.sin(flake.driftAngle) * 0.5;
        flake.y += flake.speed;

        if (flake.y > height + flake.radius) {
          flake.y = -flake.radius;
          flake.x = Math.random() * width;
        }
        if (flake.x < -flake.radius) flake.x = width + flake.radius;
        if (flake.x > width + flake.radius) flake.x = -flake.radius;
      }
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export default function SnowboardingSection({
  data,
  className = "",
}: SnowboardingSectionProps) {
  const lifetimeStats = [
    { label: "Days on Mountain", value: data.lifetime.daysOnMountain.toString(), icon: "❄️" },
    { label: "Vertical Feet", value: `${(data.lifetime.verticalFt / 1000).toFixed(1)}k ft`, icon: "📈" },
    { label: "Lifts Ridden", value: data.lifetime.liftsRidden.toString(), icon: "🚡" },
    { label: "Fav Mountain", value: data.lifetime.favMountain, icon: "🏔️" },
    { label: "GPS Vertical", value: `${(data.lifetime.gpsVerticalFt / 1000).toFixed(1)}k ft`, icon: "📡" },
    { label: "Highest Elevation", value: `${data.lifetime.highestElevationFt.toLocaleString()} ft`, icon: "⛰️" },
    { label: "Distance", value: `${data.lifetime.distanceMiles} mi`, icon: "📏" },
    { label: "Total Seasons", value: data.totalSeasons.toString(), icon: "🗓️" },
  ];

  return (
    <div className={className} style={{ position: "relative", overflow: "hidden" }}>
      <SnowfallCanvas />
      <div style={{ position: "relative", zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
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

        {/* Lifetime Stats Grid */}
        <div className="mb-2">
          <h4
            className="text-lg mb-4 uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--muted-foreground)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
            }}
          >
            Lifetime
          </h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {lifetimeStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.07,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="text-xl mb-2 block" role="img" aria-label={stat.label}>
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
                  {stat.value}
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

        {/* Season Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="mb-10"
        >
          <h4
            className="text-lg mb-4 uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--muted-foreground)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
            }}
          >
            By Season
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.seasons.map((season, index) => (
              <motion.div
                key={season.season}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.45 + index * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <div
                  className="p-5 rounded-lg h-full"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    className="text-base font-semibold mb-4"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--foreground)",
                    }}
                  >
                    {season.season}
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Days", value: season.daysOnMountain.toString() },
                      { label: "Vertical", value: `${season.verticalFt.toLocaleString()} ft` },
                      { label: "Lifts", value: season.liftsRidden.toString() },
                      { label: "Mountain", value: season.favMountain },
                      ...(season.highestElevationFt
                        ? [{ label: "Max Elevation", value: `${season.highestElevationFt.toLocaleString()} ft` }]
                        : []),
                      ...(season.distanceMiles
                        ? [{ label: "Distance", value: `${season.distanceMiles} mi` }]
                        : []),
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-baseline">
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: "var(--muted-foreground)",
                            fontSize: "0.7rem",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                          }}
                        >
                          {row.label}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: "var(--foreground)",
                            fontSize: "0.85rem",
                          }}
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.23, 1, 0.32, 1] }}
        >
          <p
            className="text-base md:text-lg mb-4"
            style={{
              color: "var(--muted-foreground)",
              lineHeight: "1.75",
            }}
          >
            I snowboard to reset. Lake Tahoe is my winter playground — each resort feels different: wide cruisers, icy mornings, surprise powder days.
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
        </motion.div>
      </motion.div>
      </div>
    </div>
  );
}
