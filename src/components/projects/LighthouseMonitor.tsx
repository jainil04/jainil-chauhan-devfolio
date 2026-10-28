"use client";

import React from "react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Live audit streaming",
    body: "Enter a URL, pick desktop or mobile, and choose 1–10 runs to average. Progress streams back over SSE while headless Chrome runs Lighthouse.",
  },
  {
    title: "Full Lighthouse report",
    body: "Performance, Accessibility, Best Practices and SEO scores, Core Web Vitals, opportunities and per-audit diagnostics.",
  },
  {
    title: "AI summary",
    body: "An optional GPT-4.1 summary turns the raw report into a plain-language list of what to fix and why.",
  },
  {
    title: "History and trends",
    body: "Signed-in users get every run persisted to Postgres, with a history view and trend charts of scores and Core Web Vitals over time.",
  },
  {
    title: "Scheduled audits",
    body: "Daily, weekly or monthly cron-style audits run through a BullMQ queue on Redis, with regression detection between runs.",
  },
  {
    title: "Threshold alerts",
    body: "Set a threshold on any score or metric; a breach on a scheduled audit sends an email through Resend.",
  },
];

const PIPELINE = [
  { step: "01", title: "Request", body: "The Vue 3 SPA POSTs the URL, device, run count and view. The JWT is optional, so guests can audit without an account." },
  { step: "02", title: "Launch", body: "A Vercel serverless function starts a stripped Chromium (@sparticuz/chromium) through Puppeteer. Locally, the Express server uses system Chrome." },
  { step: "03", title: "Warm up", body: "One silent warmup run absorbs cold DNS, TLS and V8 costs and is discarded, so the real runs reflect what a returning visitor sees." },
  { step: "04", title: "Audit", body: "Lighthouse 12 connects over the Chrome DevTools Protocol. Each run emits a run-complete event; scores and metrics are averaged across runs." },
  { step: "05", title: "Stream", body: "Progress, per-run results and the final payload go to the browser as Server-Sent Events, so a 5–30 second audit never looks frozen." },
  { step: "06", title: "Persist", body: "For signed-in users, the run, its metrics and the full report are written to Neon Postgres. Scheduled jobs reuse the same persistence path." },
];

const DECISIONS = [
  {
    title: "SSE over WebSockets",
    body: "The audit is fire-and-forget, so the stream only needs to flow one way. SSE rides plain HTTP, works in serverless, and is easier to debug. The client uses fetch + ReadableStream because EventSource can't send a POST body.",
  },
  {
    title: "Two backends, one event schema",
    body: "Vercel serverless is the primary deploy. An Express server handles the alternative case and hosts the BullMQ worker, because queue workers are long-lived processes that serverless functions can't be. Both emit the same SSE events, so the frontend can't tell them apart.",
  },
  {
    title: "Warmup run discarding",
    body: "The first Lighthouse run after launch is a systematic outlier. Running N+1 audits and dropping the first removes that bias, which matters most in single-run mode.",
  },
  {
    title: "Optional auth",
    body: "Anyone can run an audit. Signing in unlocks history, schedules and alerts. JWT verification sets a user id or null, and persistence only happens when there is a user.",
  },
  {
    title: "Serverless-safe database access",
    body: "Neon's HTTP driver avoids connection-pool exhaustion across cold starts, so there's no pgBouncer to run.",
  },
  {
    title: "Every decision written down",
    body: "Nine ADRs, an architecture doc with Mermaid diagrams and a phased roadmap, including what's deliberately out of scope.",
  },
];

const STACK = [
  { layer: "Frontend", items: "Vue 3 (Composition API), Vite, PrimeVue 4, Tailwind CSS 4, GSAP, Chart.js" },
  { layer: "API", items: "Vercel serverless functions, Express (alternate)" },
  { layer: "Audit engine", items: "Lighthouse 12, Puppeteer Core, @sparticuz/chromium" },
  { layer: "Data", items: "Neon Postgres, node-pg-migrate, Redis + BullMQ" },
  { layer: "Auth & services", items: "JWT, bcrypt, OpenAI GPT-4.1, Resend" },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-xl md:text-2xl mb-6"
      style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
    >
      {children}
    </h3>
  );
}

function Card({ title, body, eyebrow }: { title: string; body: string; eyebrow?: string }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      {eyebrow && (
        <span
          className="text-xs block mb-2"
          style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}
        >
          {eyebrow}
        </span>
      )}
      <h4
        className="text-base mb-2"
        style={{ color: "var(--foreground)", fontFamily: "var(--font-body)", fontWeight: 600 }}
      >
        {title}
      </h4>
      <p className="text-sm" style={{ color: "var(--muted-foreground)", lineHeight: "1.7" }}>
        {body}
      </p>
    </div>
  );
}

export default function LighthouseMonitor() {
  return (
    <motion.div
      className="space-y-14"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      <div>
        <SectionHeading>What it does</SectionHeading>
        <p className="text-base md:text-lg max-w-3xl" style={{ color: "var(--muted-foreground)", lineHeight: "1.75" }}>
          A web performance monitor. Point it at a URL and it runs real Lighthouse audits in headless
          Chrome, streams the results back as they happen, and, once you sign in, tracks Core Web
          Vitals over time, re-audits on a schedule and emails you when a metric crosses a threshold.
        </p>
      </div>

      <div>
        <SectionHeading>Features</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <Card key={f.title} {...f} />
          ))}
        </div>
      </div>

      <div>
        <SectionHeading>How an audit works</SectionHeading>
        <p className="text-sm md:text-base max-w-3xl mb-6" style={{ color: "var(--muted-foreground)", lineHeight: "1.75" }}>
          Lighthouse is CPU-heavy and takes 5–30 seconds per run, so it can't be a fast JSON
          endpoint. The architecture is built to make that wait feel like progress.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PIPELINE.map((p) => (
            <Card key={p.step} title={p.title} body={p.body} eyebrow={p.step} />
          ))}
        </div>
      </div>

      <div>
        <SectionHeading>Key decisions</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DECISIONS.map((d) => (
            <Card key={d.title} {...d} />
          ))}
        </div>
      </div>

      <div>
        <SectionHeading>Stack</SectionHeading>
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          {STACK.map((s, i) => (
            <div
              key={s.layer}
              className="flex flex-col md:flex-row gap-1 md:gap-6 px-5 py-4"
              style={{
                background: "var(--card)",
                borderTop: i === 0 ? "none" : "1px solid var(--border)",
              }}
            >
              <span
                className="text-xs md:w-40 shrink-0 uppercase"
                style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}
              >
                {s.layer}
              </span>
              <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                {s.items}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
