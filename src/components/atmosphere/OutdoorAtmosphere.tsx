"use client";

/**
 * OutdoorAtmosphere — Background Controller
 *
 * Receives `activeView` and crossfades between:
 *   - <TrailAtmosphere />  ("trails")
 *   - <SnowAtmosphere />   ("snowboarding")
 *
 * Both atmospheres render as fixed full-viewport layers behind all content.
 * Transitions use Framer Motion with a simultaneous crossfade (≈800ms).
 * Pointer events are disabled on the entire background.
 */

import React, { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TrailAtmosphere from "./TrailAtmosphere";
import SnowAtmosphere from "./SnowAtmosphere";

interface OutdoorAtmosphereProps {
  /** The currently active tab */
  activeView: "trails" | "snowboarding";
}

/** Shared enter/exit transition for both atmosphere layers */
const TRANSITION = {
  duration: 0.85,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
};

export default memo(function OutdoorAtmosphere({
  activeView,
}: OutdoorAtmosphereProps) {
  return (
    /**
     * Fixed, full-viewport container.
     * z-index: 0 — sits behind the sticky header (z-40) and all content.
     * pointer-events: none — never intercepts clicks.
     */
    <div
      className="fixed inset-0 pointer-events-none select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/*
       * AnimatePresence with default mode (sync):
       * Both exit and enter animations run simultaneously → true crossfade.
       */}
      <AnimatePresence>
        {activeView === "trails" ? (
          <motion.div
            key="trail-atmosphere"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.988 }}
            transition={TRANSITION}
            style={{ willChange: "opacity, transform" }}
          >
            <TrailAtmosphere />
          </motion.div>
        ) : (
          <motion.div
            key="snow-atmosphere"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.988 }}
            transition={TRANSITION}
            style={{ willChange: "opacity, transform" }}
          >
            <SnowAtmosphere />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
