"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";


type PiProject = {
  title: string;
  subtitle?: string;
  details: string[];
  funFacts: string[];
  tech: string[];
};

const projects: PiProject[] = [
  {
    title: "Smart Home Hub",
    subtitle: "Home Assistant on Raspberry Pi 5",
    details: [
      "Self-hosted Home Assistant Container (Docker) on a Pi 5 with host networking, reachable locally and publicly via my own domain.",
      "Integrates Govee, Tuya, KASA, and Zigbee (ZHA) devices; n8n installed for workflow automation.",
      "Dashboard shows when the last backup ran.",
    ],
    funFacts: [
      "Runs locally on a Pi instead of a cloud hub.",
      "Mixes Wi-Fi, cloud, and Zigbee devices in one place.",
    ],
    tech: ["Raspberry Pi 5", "Docker", "Home Assistant", "Zigbee/ZHA", "n8n"],
  },
  {
    title: "Custom Home Assistant Dashboards",
    details: [
      "Three dashboards used across phone, wall tablet, and desktop.",
      "Automatically switch between dark and light theme based on phone settings.",
      "Custom square icon tiles for lights instead of toggle switches, with a neutral blue-gray look.",
      "Planned one-tap scene dashboard (master bedroom, living room).",
    ],
    funFacts: ["Where my frontend engineering meets physical hardware."],
    tech: ["Home Assistant Lovelace", "Custom CSS/SVG", "Responsive design"],
  },
  {
    title: "AI-Controlled Home",
    subtitle: "Home Assistant MCP + Claude Code",
    details: [
      "ha-mcp custom component so an MCP client (Claude Code) can control almost everything in Home Assistant.",
      "Claude Code runs on my Mac and reaches the Pi over SSH.",
      "Keeps tracking notes (greetings, devices with entity IDs) so future sessions have context.",
    ],
    funFacts: ["Agentic AI driving real hardware."],
    tech: ["MCP", "Claude Code", "Home Assistant", "SSH"],
  },
  {
    title: "Smart Mac Charging Automation",
    details: [
      "When the MacBook battery drops to 15% or below, a KASA smart plug turns on via a Home Assistant webhook; it turns off when the battery recovers.",
      "Triggered automatically by a macOS Shortcuts personal automation.",
    ],
    funFacts: [
      "Connects a laptop OS to home automation with no extra app.",
      "Shortcuts can be flaky while the Mac sleeps.",
    ],
    tech: ["macOS Shortcuts", "Home Assistant webhooks", "KASA smart plug"],
  },
];

const bulletList = (items: string[]) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3" style={{ color: "var(--muted-foreground)", lineHeight: "1.75" }}>
        <span className="mt-2 shrink-0" style={{ color: "var(--accent)", fontSize: "0.5rem" }}>●</span>
        <span className="text-base md:text-lg">{item}</span>
      </li>
    ))}
  </ul>
);

export default function RaspberryPiPage() {
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
              aria-hidden="true"
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
            Raspberry Pi
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
          Hardware & Tinkering
        </h2>
        <p
          className="text-base md:text-lg max-w-2xl mb-8"
          style={{
            color: "var(--muted-foreground)",
            lineHeight: "1.75",
          }}
        >
          A stack of Raspberry Pis runs my home lab — ad blocking, weather stations, a custom dashboard, and a media server.
        </p>
      </motion.section>

      {/* ── Content Sections ── */}
      <section className="mx-auto max-w-4xl" style={{ paddingBottom: "3.13rem", paddingLeft: "3.13rem", paddingRight: "3.13rem" }}>

        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="mb-6">
              <div className="mb-2">
                <h3
                  className="text-2xl md:text-3xl"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
                >
                  {project.title}
                </h3>
              </div>
              {project.subtitle && (
                <p
                  className="text-base md:text-lg"
                  style={{ color: "var(--primary-text)", fontFamily: "var(--font-body)", fontWeight: 600 }}
                >
                  {project.subtitle}
                </p>
              )}
            </div>

            <div className="mb-6">{bulletList(project.details)}</div>

            <div className="my-6 pl-6 border-l-2" style={{ borderColor: "var(--accent)" }}>
              <h4
                className="text-xs uppercase mb-2"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", fontWeight: 400 }}
              >
                Fun facts
              </h4>
              {project.funFacts.map((fact, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg mb-1"
                  style={{ color: "var(--foreground)", lineHeight: "1.75", fontWeight: 500 }}
                >
                  {fact}
                </p>
              ))}
            </div>

            <ul aria-label="Tech" className="flex flex-wrap gap-2 list-none p-0">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="text-xs uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    background: "var(--card)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

      </section>
    </div>
  );
}
