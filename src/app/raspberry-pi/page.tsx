"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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

        {/* Home Lab */}
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
              Adding more details soon...
            </h3>
          </div>
        </motion.div>

      </section>
    </div>
  );
}
