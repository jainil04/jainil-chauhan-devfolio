/**
 * Snowboarding Section Component
 * Displays snowboarding stats and resort information
 */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function SnowboardingSection({
  data,
  className = "",
}: SnowboardingSectionProps) {
  const [selectedSeason, setSelectedSeason] = useState(data.seasons.length - 1);
  const [openDayIndex, setOpenDayIndex] = useState<number | null>(null);

  const activeSeason = data.seasons[selectedSeason];

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

        {/* Season Selector Pills */}
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
            Season
          </h4>

          {/* Pills Row */}
          <div className="flex flex-wrap gap-2 mb-8">
            {data.seasons.map((season, index) => (
              <button
                key={season.season}
                onClick={() => {
                  setSelectedSeason(index);
                  setOpenDayIndex(null);
                }}
                className="px-5 py-2 rounded-full transition-all duration-300"
                style={{
                  background: selectedSeason === index ? "var(--foreground)" : "var(--card)",
                  color: selectedSeason === index ? "var(--background)" : "var(--muted-foreground)",
                  border: `1px solid ${selectedSeason === index ? "var(--foreground)" : "var(--border)"}`,
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                }}
              >
                {season.season}
              </button>
            ))}
          </div>

          {/* Selected Season Stats */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSeason.season}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                {[
                  { label: "Days", value: activeSeason.daysOnMountain.toString(), icon: "❄️" },
                  { label: "Vertical", value: `${activeSeason.verticalFt.toLocaleString()} ft`, icon: "📈" },
                  { label: "Lifts", value: activeSeason.liftsRidden.toString(), icon: "🚡" },
                  { label: "Mountain", value: activeSeason.favMountain, icon: "🏔️" },
                  ...(activeSeason.highestElevationFt
                    ? [{ label: "Max Elevation", value: `${activeSeason.highestElevationFt.toLocaleString()} ft`, icon: "⛰️" }]
                    : []),
                  ...(activeSeason.distanceMiles
                    ? [{ label: "Distance", value: `${activeSeason.distanceMiles} mi`, icon: "📏" }]
                    : []),
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
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

              {/* Day-by-Day Accordion */}
              {activeSeason.days && activeSeason.days.length > 0 && (
                <div>
                  <h4
                    className="text-lg mb-4 uppercase tracking-widest"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--muted-foreground)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.15em",
                    }}
                  >
                    Days
                  </h4>
                  <div className="space-y-3">
                    {activeSeason.days.map((day, dayIdx) => {
                      const isOpen = openDayIndex === dayIdx;
                      return (
                        <div
                          key={day.date}
                          className="rounded-lg overflow-hidden"
                          style={{
                            background: "var(--card)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          {/* Collapsed Header Row */}
                          <button
                            onClick={() => setOpenDayIndex(isOpen ? null : dayIdx)}
                            className="w-full flex items-center justify-between p-5 text-left transition-colors duration-200"
                            style={{ cursor: "pointer", background: "transparent" }}
                          >
                            <div>
                              <div
                                className="text-base md:text-lg font-medium"
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  color: "var(--foreground)",
                                }}
                              >
                                {formatDate(day.date)}
                              </div>
                              <div
                                className="mt-1"
                                style={{
                                  fontFamily: "var(--font-mono)",
                                  color: "var(--muted-foreground)",
                                  fontSize: "0.7rem",
                                  letterSpacing: "0.08em",
                                  textTransform: "uppercase",
                                }}
                              >
                                {day.resort}
                              </div>
                            </div>
                            <div className="flex items-center gap-6">
                              <div className="text-right">
                                <div
                                  className="text-base md:text-lg font-medium"
                                  style={{
                                    fontFamily: "var(--font-mono)",
                                    color: "var(--foreground)",
                                  }}
                                >
                                  {day.verticalFt ? `${day.verticalFt.toLocaleString()} ft` : "—"}
                                </div>
                                <div
                                  className="mt-1"
                                  style={{
                                    fontFamily: "var(--font-mono)",
                                    color: "var(--muted-foreground)",
                                    fontSize: "0.7rem",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {day.liftsRidden ?? 0} lifts
                                </div>
                              </div>
                              {/* Chevron */}
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                  color: "var(--muted-foreground)",
                                  transition: "transform 0.3s ease",
                                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                                }}
                              >
                                <path d="M6 9l6 6 6-6" />
                              </svg>
                            </div>
                          </button>

                          {/* Expanded Content */}
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                style={{ overflow: "hidden" }}
                              >
                                <div
                                  className="px-5 pb-5"
                                  style={{ borderTop: "1px solid var(--border)" }}
                                >
                                  {/* Day Stats Row */}
                                  {(day.gpsVerticalFt || day.highestElevationFt || day.distanceMiles) && (
                                    <div className="flex flex-wrap gap-6 pt-4 pb-4">
                                      {day.gpsVerticalFt && (
                                        <div>
                                          <div
                                            style={{
                                              fontFamily: "var(--font-mono)",
                                              color: "var(--foreground)",
                                              fontSize: "0.9rem",
                                            }}
                                          >
                                            {day.gpsVerticalFt.toLocaleString()} ft
                                          </div>
                                          <div
                                            style={{
                                              fontFamily: "var(--font-mono)",
                                              color: "var(--muted-foreground)",
                                              fontSize: "0.6rem",
                                              letterSpacing: "0.08em",
                                              textTransform: "uppercase",
                                              marginTop: "2px",
                                            }}
                                          >
                                            GPS Vertical
                                          </div>
                                        </div>
                                      )}
                                      {day.highestElevationFt && (
                                        <div>
                                          <div
                                            style={{
                                              fontFamily: "var(--font-mono)",
                                              color: "var(--foreground)",
                                              fontSize: "0.9rem",
                                            }}
                                          >
                                            {day.highestElevationFt.toLocaleString()} ft
                                          </div>
                                          <div
                                            style={{
                                              fontFamily: "var(--font-mono)",
                                              color: "var(--muted-foreground)",
                                              fontSize: "0.6rem",
                                              letterSpacing: "0.08em",
                                              textTransform: "uppercase",
                                              marginTop: "2px",
                                            }}
                                          >
                                            Highest Elevation
                                          </div>
                                        </div>
                                      )}
                                      {day.distanceMiles && (
                                        <div>
                                          <div
                                            style={{
                                              fontFamily: "var(--font-mono)",
                                              color: "var(--foreground)",
                                              fontSize: "0.9rem",
                                            }}
                                          >
                                            {day.distanceMiles} mi
                                          </div>
                                          <div
                                            style={{
                                              fontFamily: "var(--font-mono)",
                                              color: "var(--muted-foreground)",
                                              fontSize: "0.6rem",
                                              letterSpacing: "0.08em",
                                              textTransform: "uppercase",
                                              marginTop: "2px",
                                            }}
                                          >
                                            Distance
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Lifts List */}
                                  {day.lifts && day.lifts.length > 0 && (
                                    <div className="pt-2">
                                      <div
                                        className="mb-3"
                                        style={{
                                          fontFamily: "var(--font-mono)",
                                          color: "var(--muted-foreground)",
                                          fontSize: "0.6rem",
                                          letterSpacing: "0.12em",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        Lifts
                                      </div>
                                      <div className="space-y-2">
                                        {day.lifts.map((lift, liftIdx) => (
                                          <div
                                            key={liftIdx}
                                            className="flex items-center justify-between"
                                          >
                                            <div className="flex items-center gap-3">
                                              <span
                                                style={{
                                                  fontFamily: "var(--font-mono)",
                                                  color: "var(--foreground)",
                                                  fontSize: "0.8rem",
                                                }}
                                              >
                                                {lift.name}
                                              </span>
                                              {lift.area && (
                                                <span
                                                  className="px-2 py-0.5 rounded-full"
                                                  style={{
                                                    fontFamily: "var(--font-mono)",
                                                    fontSize: "0.55rem",
                                                    letterSpacing: "0.08em",
                                                    textTransform: "uppercase",
                                                    color: "var(--muted-foreground)",
                                                    background: "color-mix(in oklch, var(--border) 50%, transparent)",
                                                  }}
                                                >
                                                  {lift.area}
                                                </span>
                                              )}
                                            </div>
                                            <span
                                              style={{
                                                fontFamily: "var(--font-mono)",
                                                color: "var(--muted-foreground)",
                                                fontSize: "0.75rem",
                                              }}
                                            >
                                              {lift.time}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
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
