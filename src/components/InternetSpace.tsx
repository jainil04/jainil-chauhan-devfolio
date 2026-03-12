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

  /* ── MOBILE: normal scrollable page ── */
  if (isMobile) {
    return (
      <div className="noise-overlay h-screen overflow-y-auto" style={{ background: "var(--background)" }}>
        {/* Ambient dots */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
          {[
            { x: "15%", y: "20%", size: 180, opacity: 0.03 },
            { x: "80%", y: "10%", size: 220, opacity: 0.025 },
            { x: "50%", y: "60%", size: 280, opacity: 0.02 },
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

        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-5 py-16">
          {/* Hero */}
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          >
            <h1
              className="text-4xl mb-5 leading-tight"
              style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
            >
              Hi, I&apos;m <span style={{ color: "var(--primary)" }}>Jainil</span>.
            </h1>
            <div
              className="space-y-3"
              style={{ color: "var(--muted-foreground)", lineHeight: "1.75" }}
            >
              <p className="text-base">I build things for the web and for myself.</p>
              <p className="text-sm" style={{ opacity: 0.75 }}>
                Some live in browsers.<br />
                Some live on Raspberry Pis.<br />
                Some only exist in the mountains.
              </p>
              <p className="text-sm" style={{ opacity: 0.65 }}>
                I care about performance, systems, and the quiet details
                that make interfaces feel effortless.
              </p>
            </div>
          </motion.div>

          {/* 2-col card grid */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {OBJECTS.map((obj, i) => {
              const SVGComponent = SVG_MAP[obj.id];
              if (!SVGComponent) return null;
              return (
                <motion.button
                  key={obj.id}
                  onClick={() => handleObjectSelect(obj)}
                  className="flex flex-col items-center rounded-2xl cursor-pointer focus:outline-none text-center"
                  style={{
                    padding: "16px",
                    minHeight: "120px",
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                  whileTap={{ scale: 0.96 }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      flexShrink: 0,
                      filter: "drop-shadow(0 3px 8px rgba(44,44,44,0.1))",
                      animation: `idle-float ${6 + obj.floatDelay}s ease-in-out ${obj.floatDelay}s infinite`,
                    }}
                  >
                    <SVGComponent className="w-full h-auto" />
                  </div>
                  <div className="pt-3 text-center">
                    <div
                      style={{
                        color: obj.accent,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.06em",
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      {obj.label}
                    </div>
                    <div
                      style={{
                        color: "var(--muted-foreground)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.55rem",
                        letterSpacing: "0.04em",
                        opacity: 0.55,
                        marginTop: "3px",
                      }}
                    >
                      {obj.subtitle}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Footer */}
          <motion.p
            className="text-center mt-10 text-xs"
            style={{
              color: "var(--muted-foreground)",
              opacity: 0.4,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            built with curiosity
          </motion.p>
        </div>
      </div>
    );
  }

  /* ── DESKTOP: full-screen scattered layout ── */
  return (
    <div className="noise-overlay" style={{ background: "var(--background)" }}>
      {/* Ambient dots */}
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

      <div className="relative z-10 h-screen flex flex-col overflow-hidden">
        {OBJECTS.map((obj) => (
          <CanvasObject key={obj.id} obj={obj} onSelect={handleObjectSelect} />
        ))}

        {/* Centered hero text */}
        <motion.div
          className="relative z-20 text-center px-6 pointer-events-none my-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1
            className="text-5xl lg:text-6xl mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
          >
            Hi, I&apos;m <span style={{ color: "var(--primary)" }}>Jainil</span>.
          </h1>
          <div
            className="max-w-lg mx-auto space-y-3 mb-4"
            style={{ color: "var(--muted-foreground)", lineHeight: "1.75" }}
          >
            <p className="text-lg">I build things for the web and for myself.</p>
            <p className="text-base" style={{ opacity: 0.75 }}>
              Some live in browsers.<br />
              Some live on Raspberry Pis.<br />
              Some only exist in the mountains.
            </p>
            <p className="text-base" style={{ opacity: 0.65 }}>
              I care about performance, systems, and the quiet details<br />
              that make interfaces feel effortless.
            </p>
          </div>
          <motion.p
            className="mt-4 text-xs tracking-widest uppercase"
            style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", letterSpacing: "0.2em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            click any object to explore
          </motion.p>
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="z-20 text-center absolute bottom-6 left-0 right-0"
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
