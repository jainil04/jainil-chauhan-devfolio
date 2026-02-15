"use client";

import { motion } from "framer-motion";
import type { SpaceObject } from "@/types/types";

export default function DetailPanel({
  obj,
  onClose,
}: {
  obj: SpaceObject;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(245, 243, 239, 0.85)", backdropFilter: "blur(8px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl rounded-2xl p-8 md:p-12"
        style={{
          background: "#faf9f6",
          boxShadow: "0 25px 80px rgba(44,44,44,0.12), 0 8px 24px rgba(44,44,44,0.08)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer"
          style={{ background: "rgba(44,44,44,0.06)" }}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="#6b6b6b" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Accent bar */}
        <div className="w-10 h-1 rounded-full mb-6" style={{ background: obj.accent }} />

        {/* Label */}
        <h2
          className="text-sm tracking-widest uppercase mb-2"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-mono)", letterSpacing: "0.15em" }}
        >
          {obj.label}
        </h2>

        {/* Subtitle */}
        <h3
          className="text-2xl md:text-3xl mb-6"
          style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}
        >
          {obj.subtitle}
        </h3>

        {/* Description */}
        <div className="space-y-4 mb-8">
          {obj.description.map((p, i) => (
            <p
              key={i}
              className="text-base leading-relaxed"
              style={{ color: "var(--muted-foreground)", lineHeight: "1.75" }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {obj.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 rounded-full"
              style={{
                background: "rgba(74, 103, 65, 0.08)",
                color: "var(--accent)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
