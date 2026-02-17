"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { SpaceObject } from "@/types/types";
import { OBJECTS, SVG_MAP } from "@/data/objects";
import CanvasObject from "./CanvasObject";

/* ───────────────────── Main Space ───────────────────── */

export default function InternetSpace() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

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

      {/* ── Full-screen layout ── */}
      <div className="relative z-10 h-screen flex flex-col overflow-hidden">

        {/* ── DESKTOP: scattered objects (hidden on mobile) ── */}
        {!isMobile && OBJECTS.map((obj) => (
          <CanvasObject
            key={obj.id}
            obj={obj}
            onSelect={handleObjectSelect}
          />
        ))}

        {/* Centered hero text */}
        <motion.div
          className={`relative z-20 text-center px-6 pointer-events-none ${
            isMobile ? "mt-auto" : "my-auto"
          }`}
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
            {isMobile ? "swipe to explore" : "click any object to explore"}
          </motion.p>
        </motion.div>

        {/* ── MOBILE: horizontal scroll shelf ── */}
        {isMobile && (
          <motion.div
            className="relative z-20 mt-8 mb-24 shrink-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              className="flex gap-6 px-6 overflow-x-auto scrollbar-hide"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {OBJECTS.map((obj, i) => {
                const SVGComponent = SVG_MAP[obj.id];
                if (!SVGComponent) return null;
                return (
                  <motion.button
                    key={obj.id}
                    onClick={() => handleObjectSelect(obj)}
                    className="shrink-0 flex flex-col items-center gap-2 cursor-pointer focus:outline-none"
                    style={{ scrollSnapAlign: "center" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.8 + i * 0.08,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    whileTap={{ scale: 0.93 }}
                  >
                    {/* SVG with idle float */}
                    <div
                      className="w-17.5 h-17.5 flex items-center justify-center"
                      style={{
                        filter: "drop-shadow(0 6px 16px rgba(44,44,44,0.08))",
                        animation: `idle-float ${6 + obj.floatDelay}s ease-in-out ${obj.floatDelay}s infinite`,
                      }}
                    >
                      <SVGComponent className="w-full h-auto" />
                    </div>
                    {/* Label pill */}
                    <span
                      className="px-3 py-1 rounded-full whitespace-nowrap"
                      style={{
                        background: `${obj.accent}18`,
                        color: obj.accent,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        letterSpacing: "0.1em",
                        fontWeight: 500,
                      }}
                    >
                      {obj.label}
                    </span>
                  </motion.button>
                );
              })}
              {/* Spacer at end for scroll padding */}
              <div className="shrink-0 w-6" aria-hidden />
            </div>
          </motion.div>
        )}

        {/* Footer at bottom of viewport */}
        <motion.footer
          className={`z-20 text-center ${isMobile ? "mb-20 mt-auto" : "absolute bottom-6 left-0 right-0"}`}
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
    </div>
  );
}
