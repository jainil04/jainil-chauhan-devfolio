"use client";

import { motion } from "framer-motion";
import type { SpaceObject } from "@/types/types";
import { SVG_MAP } from "@/data/objects";

export default function CanvasObject({
  obj,
  onSelect,
  isMobile,
}: {
  obj: SpaceObject;
  onSelect: (obj: SpaceObject) => void;
  isMobile: boolean;
}) {
  const SVGComponent = SVG_MAP[obj.id];
  if (!SVGComponent) return null;

  return (
    <motion.button
      onClick={() => onSelect(obj)}
      className="group absolute cursor-pointer focus:outline-none"
      style={{
        left: `${obj.x}%`,
        top: `${obj.y}%`,
        width: isMobile ? obj.width * 0.45 : obj.width,
        transform: `rotate(${obj.rotation}deg)`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: obj.floatDelay * 0.4,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        scale: 1.06,
        rotate: obj.rotation + (obj.rotation > 0 ? -2 : 2),
        y: -8,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.97 }}
      aria-label={`Explore: ${obj.label} — ${obj.subtitle}`}
    >
      {/* Glow ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl -z-10"
        style={{
          background: `radial-gradient(circle, ${obj.accent}15, transparent 70%)`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1.3 }}
        transition={{ duration: 0.4 }}
      />

      {/* SVG */}
      <div
        className="transition-all duration-500"
        style={{
          filter: `drop-shadow(0 8px 24px rgba(44,44,44,0.1))`,
          animation: `idle-float ${6 + obj.floatDelay}s ease-in-out ${obj.floatDelay}s infinite`,
        }}
      >
        <SVGComponent className="w-full h-auto" />
      </div>

      {/* Label on hover */}
      <div
        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200"
        style={{ bottom: -32 }}
      >
        <span
          className="text-xs font-bold uppercase px-4 py-1.5 rounded-full tracking-widest"
          style={{
            background: obj.accent,
            color: "#fff",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            boxShadow: `0 4px 12px ${obj.accent}40`,
          }}
        >
          {obj.label}
        </span>
      </div>
    </motion.button>
  );
}
