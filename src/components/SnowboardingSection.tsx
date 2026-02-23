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
  const statCards = [
    {
      label: "Days on Mountain",
      value: data.daysOnMountain.toString(),
      icon: "❄️",
    },
    {
      label: "Resorts Visited",
      value: data.resortsVisited.length.toString(),
      icon: "🏔️",
    },
    {
      label: "Vertical Feet",
      value: `${(data.estimatedVerticalFeet / 1000).toFixed(0)}k`,
      icon: "📈",
    },
  ];

  const tahoeResorts = [
    { name: "Heavenly", note: "Wide cruisers, lake views", visited: true },
    { name: "Northstar", note: "Well-groomed, family-friendly", visited: true },
    { name: "Kirkwood", note: "Powder days, more challenging terrain", visited: true },
    { name: "Palisades Tahoe", note: "Olympic legacy, expert terrain", visited: false },
    { name: "Sierra-at-Tahoe", note: "Tree runs, relaxed vibe", visited: false },
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <div
                className="p-6 rounded-lg"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="text-2xl mb-2 block" role="img" aria-label={stat.label}>
                  {stat.icon}
                </span>
                <div
                  className="text-3xl md:text-4xl font-light mb-2"
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
                    letterSpacing: "0.1em",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8"
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

        {/* Lake Tahoe Resorts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <h4
            className="text-xl md:text-2xl mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--foreground)",
            }}
          >
            Lake Tahoe Coverage
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tahoeResorts.map((resort, index) => (
              <motion.div
                key={resort.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + index * 0.05,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <div
                  className="p-5 rounded-lg h-full"
                  style={{
                    background: "var(--card)",
                    border: resort.visited
                      ? "2px solid var(--foreground)"
                      : "1px solid var(--border)",
                    opacity: resort.visited ? 1 : 0.6,
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5
                      className="text-lg font-semibold"
                      style={{
                        color: "var(--foreground)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {resort.name}
                    </h5>
                    {resort.visited && (
                      <span className="text-sm">✓</span>
                    )}
                  </div>
                  <p
                    className="text-sm"
                    style={{
                      color: "var(--muted-foreground)",
                      fontFamily: "var(--font-body)",
                      lineHeight: "1.5",
                    }}
                  >
                    {resort.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Season Progression Timeline */}
        {data.seasonProgression && data.seasonProgression.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mt-8"
          >
            <h4
              className="text-xl md:text-2xl mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--foreground)",
              }}
            >
              Season Progression
            </h4>
            <div className="space-y-3">
              {data.seasonProgression.map((session, index) => (
                <motion.div
                  key={`${session.date}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.6 + index * 0.05,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="flex items-center gap-4 p-4 rounded"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    className="text-sm"
                    style={{
                      color: "var(--muted-foreground)",
                      fontFamily: "var(--font-mono)",
                      minWidth: "80px",
                    }}
                  >
                    {session.date}
                  </div>
                  <div className="flex-1">
                    <span style={{ color: "var(--foreground)" }}>
                      {session.resort}
                    </span>
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      color: "var(--muted-foreground)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {session.runs} runs
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
      </div>
    </div>
  );
}
