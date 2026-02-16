"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { SpaceObject } from "@/types/types";
import { OBJECTS } from "@/data/objects";
import CanvasObject from "./CanvasObject";
import ContactDialog from "./ContactDialog";

/* ───────────────────── Main Space ───────────────────── */

export default function InternetSpace() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const handleObjectSelect = useCallback((obj: SpaceObject) => {
    router.push(obj.href);
  }, [router]);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="noise-overlay" style={{ background: "var(--background)" }}>
      {/* ── Ambient background dots ── */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
        {[
          { x: "15%", y: "20%", size: 180, opacity: 0.03 },
          { x: "75%", y: "15%", size: 240, opacity: 0.025 },
          { x: "50%", y: "70%", size: 300, opacity: 0.02 },
          { x: "85%", y: "80%", size: 160, opacity: 0.03 },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
              background: "var(--accent)",
              opacity: dot.opacity,
              filter: "blur(60px)",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {/* ── Full-screen: centered text + surrounding objects ── */}
      <div className="relative z-10 h-screen flex items-center justify-center overflow-hidden">
        {/* Objects scattered around text */}
        {OBJECTS.map((obj) => (
          <CanvasObject
            key={obj.id}
            obj={obj}
            onSelect={handleObjectSelect}
            isMobile={isMobile}
          />
        ))}

        {/* Centered hero text */}
        <motion.div
          className="relative z-20 text-center px-6 pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1
            className="text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
          >
            Hi, I&apos;m <span style={{ color: "var(--primary)" }}>Jainil</span>.
          </h1>
          <div
            className="max-w-lg mx-auto space-y-3 mb-4"
            style={{ color: "var(--muted-foreground)", lineHeight: "1.75" }}
          >
            <p className="text-base md:text-lg">
              I build things for the web and for myself.
            </p>
            <p className="text-sm md:text-base" style={{ opacity: 0.75 }}>
              Some live in browsers.<br />
              Some live on Raspberry Pis.<br />
              Some only exist in the mountains.
            </p>
            <p className="text-sm md:text-base" style={{ opacity: 0.65 }}>
              I care about performance, systems, and the quiet details<br className="hidden md:inline" />
              {" "}that make interfaces feel effortless.
            </p>
          </div>
          <motion.p
            className="mt-4 text-xs tracking-widest uppercase"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.2em",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            click any object to explore
          </motion.p>
        </motion.div>

        {/* Footer at bottom of viewport */}
        <motion.footer
          className="absolute bottom-6 left-0 right-0 z-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p
            className="text-xs"
            style={{
              color: "var(--muted-foreground)",
              opacity: 0.4,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
            }}
          >
            built with curiosity
          </p>
        </motion.footer>
      </div>

      {/* ── Bottom-right social buttons ── */}
      <motion.div
        className="fixed bottom-6 right-6 z-30 flex items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {/* GitHub */}
        <a
          href="https://github.com/jainil04"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-xl transition-transform hover:scale-105 active:scale-95"
          style={{
            background: "var(--card)",
            boxShadow: "0 2px 8px rgba(44,44,44,0.06)",
          }}
          aria-label="GitHub"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--foreground)">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>

        {/* Say Hello */}
        <button
          onClick={() => setContactOpen(true)}
          className="px-8 py-3 rounded-xl text-base font-semibold cursor-pointer transition-transform hover:scale-105 active:scale-95"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            fontFamily: "var(--font-body)",
            boxShadow: "0 2px 12px rgba(74,103,65,0.15)",
          }}
        >
          Say Hello
        </button>
      </motion.div>

      {/* ── Contact Dialog ── */}
      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
