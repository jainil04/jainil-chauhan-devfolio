"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SpaceObject } from "@/types/types";
import { OBJECTS } from "@/data/objects";
import DetailPanel from "./DetailPanel";
import CanvasObject from "./CanvasObject";

/* ───────────────────── Main Space ───────────────────── */

export default function InternetSpace() {
  const [selected, setSelected] = useState<SpaceObject | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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
            onSelect={setSelected}
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
            transition={{ delay: 0.8, duration: 0.6 }}
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

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <DetailPanel obj={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
