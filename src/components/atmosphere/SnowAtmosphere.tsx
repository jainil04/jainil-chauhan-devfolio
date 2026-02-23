"use client";

/**
 * SnowAtmosphere — Winter Mountain Scene
 *
 * Mood: crisp, spacious, high-altitude, clean.
 *
 * Layers (back → front):
 *   1. Cool sky gradient (pale blue → near-white)
 *   2. Bright winter sun flare
 *   3. Snow-covered mountain ranges (SVG)
 *   4. Snow foreground slope
 *   5. Snow-dusted pine trees
 *   6. Snow particles (light, unhurried)
 *   7. Cold light shimmer on ridges
 *   8. Wind sweep effect (occasional)
 *   9. Faint ski track lines
 *  10. Content-readability overlay
 *
 * All animations: GPU-friendly transform + opacity only.
 * Respects prefers-reduced-motion.
 */

import React, { useState, useEffect, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ─── Constants ────────────────────────────────────────────────────────────────

const SNOW_COUNT_DESKTOP = 45;
const SNOW_COUNT_MOBILE = 20;

// ─── Static Winter Scene (Memoized SVG) ──────────────────────────────────────

const WinterSceneSVG = memo(function WinterSceneSVG() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        {/* Sky — crisp pale blue to near-white horizon */}
        <linearGradient id="winter-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8C8E0" />
          <stop offset="40%" stopColor="#C8E0F0" />
          <stop offset="100%" stopColor="#E8F4FF" />
        </linearGradient>

        {/* Winter sun — high-altitude bright white light */}
        <radialGradient id="winter-sun" cx="62%" cy="22%" r="28%">
          <stop offset="0%" stopColor="#FFFEF8" stopOpacity="1" />
          <stop offset="25%" stopColor="#F0F8FF" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#D8EEFF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#A8C8E0" stopOpacity="0" />
        </radialGradient>

        {/* Far mountain range */}
        <linearGradient id="far-mountain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8F2FF" />
          <stop offset="45%" stopColor="#C0D8F0" />
          <stop offset="100%" stopColor="#9EC0E0" />
        </linearGradient>

        {/* Mid mountain range */}
        <linearGradient id="mid-mountain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2F8FF" />
          <stop offset="35%" stopColor="#D0E5F8" />
          <stop offset="100%" stopColor="#B0CBE8" />
        </linearGradient>

        {/* Foreground snow slope */}
        <linearGradient id="snow-slope" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ECF6FF" />
          <stop offset="100%" stopColor="#D8EEF8" />
        </linearGradient>
      </defs>

      {/* ── Sky ── */}
      <rect width="1440" height="900" fill="url(#winter-sky)" />

      {/* ── Winter sun glow ── */}
      <ellipse cx="893" cy="198" rx="220" ry="175" fill="url(#winter-sun)" />
      <circle cx="893" cy="165" r="20" fill="#FFFDF0" opacity="0.97" />
      {/* Subtle sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={i}
          x1={893 + Math.cos((angle * Math.PI) / 180) * 24}
          y1={165 + Math.sin((angle * Math.PI) / 180) * 24}
          x2={893 + Math.cos((angle * Math.PI) / 180) * 42}
          y2={165 + Math.sin((angle * Math.PI) / 180) * 42}
          stroke="#FFFDF0"
          strokeWidth={angle % 90 === 0 ? 1.5 : 0.8}
          opacity={angle % 90 === 0 ? 0.5 : 0.25}
        />
      ))}

      {/* ── Far mountain range ── */}
      <path
        d="M-80 720 L180 350 L340 510 L490 380 L640 290 L780 440 L900 330 L1060 400 L1220 260 L1400 400 L1540 370 L1540 720 Z"
        fill="url(#far-mountain)"
        opacity="0.55"
      />

      {/* ── Mid mountain range (main peaks) ── */}
      <path
        d="M-80 760 L140 468 L280 570 L430 408 L580 498 L730 348 L890 470 L1040 372 L1180 462 L1340 370 L1500 450 L1500 760 Z"
        fill="url(#mid-mountain)"
        opacity="0.88"
      />

      {/* ── Snow caps on major peaks ── */}
      {/* Peak at ~730 / 348 */}
      <path
        d="M730 348 L800 395 L755 388 L730 360 L705 392 L662 398 Z"
        fill="white"
        opacity="0.93"
      />
      {/* Peak at ~1220 / 260 */}
      <path
        d="M1220 260 L1285 300 L1250 294 L1220 275 L1190 298 L1158 305 Z"
        fill="white"
        opacity="0.9"
      />
      {/* Peak at ~640 / 290 */}
      <path
        d="M640 290 L700 328 L665 323 L640 305 L615 326 L582 332 Z"
        fill="white"
        opacity="0.88"
      />
      {/* Peak at ~1040 / 372 */}
      <path
        d="M1040 372 L1092 405 L1066 400 L1040 385 L1014 403 L990 408 Z"
        fill="white"
        opacity="0.82"
      />
      {/* Peak at ~430 / 408 */}
      <path
        d="M430 408 L478 440 L455 436 L430 420 L408 439 L387 443 Z"
        fill="white"
        opacity="0.78"
      />
      {/* Ridge snow lines */}
      <path
        d="M140 468 Q210 445 280 470 Q360 448 430 440"
        stroke="white"
        strokeWidth="3"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M580 498 Q660 476 730 490 Q810 468 890 480"
        stroke="white"
        strokeWidth="3"
        fill="none"
        opacity="0.4"
      />
      <path
        d="M1040 400 Q1110 382 1180 395 Q1260 375 1340 385"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        opacity="0.38"
      />

      {/* ── Foreground snow slope ── */}
      <path
        d="M-80 835 Q360 795 720 812 Q1080 830 1540 808 L1540 900 L-80 900 Z"
        fill="url(#snow-slope)"
      />
      <path
        d="M-80 868 Q360 850 720 860 Q1080 870 1540 858 L1540 900 L-80 900 Z"
        fill="#EAF4FF"
        opacity="0.85"
      />

      {/* ── Snow surface texture highlight ── */}
      <path
        d="M-80 842 Q360 820 720 830 Q1080 842 1540 826"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M-80 858 Q360 840 720 850 Q1080 862 1540 845"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />

      {/* ── Snow-dusted pine trees — left ── */}
      {/* Pine 1 */}
      <rect x="20" y="840" width="12" height="32" fill="#2E3828" />
      <polygon points="-5,862 26,778 57,862" fill="#3A4E3A" />
      <polygon points="2,832 26,760 50,832" fill="#324432" />
      <polygon points="8,808 26,748 44,808" fill="#2C3E2C" />
      {/* Snow on branches */}
      <polygon points="0,862 26,782 52,862" fill="white" opacity="0.18" />
      <path
        d="M6,808 Q26,800 46,808"
        stroke="white"
        strokeWidth="3"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M10,830 Q26,823 42,830"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        opacity="0.5"
      />

      {/* Pine 2 */}
      <rect x="80" y="845" width="12" height="30" fill="#2E3828" />
      <polygon points="58,865 86,782 114,865" fill="#3A4E3A" />
      <polygon points="64,836 86,764 108,836" fill="#324432" />
      <polygon points="70,812 86,754 102,812" fill="#2C3E2C" />
      <path
        d="M66,812 Q86,805 106,812"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        opacity="0.52"
      />
      <path
        d="M70,834 Q86,828 102,834"
        stroke="white"
        strokeWidth="2"
        fill="none"
        opacity="0.45"
      />

      {/* Pine 3 (slightly further back) */}
      <rect x="148" y="848" width="10" height="26" fill="#2E3828" opacity="0.7" />
      <polygon points="128,868 153,796 178,868" fill="#3A4E3A" opacity="0.7" />
      <polygon points="133,844 153,778 173,844" fill="#324432" opacity="0.7" />
      <path
        d="M135,844 Q153,838 171,844"
        stroke="white"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />

      {/* ── Snow-dusted pine trees — right ── */}
      {/* Pine R1 */}
      <rect x="1408" y="840" width="12" height="32" fill="#2E3828" />
      <polygon points="1383,862 1414,778 1445,862" fill="#3A4E3A" />
      <polygon points="1390,832 1414,760 1438,832" fill="#324432" />
      <polygon points="1396,808 1414,748 1432,808" fill="#2C3E2C" />
      <path
        d="M1394,808 Q1414,800 1434,808"
        stroke="white"
        strokeWidth="3"
        fill="none"
        opacity="0.55"
      />
      <path
        d="M1398,830 Q1414,823 1430,830"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        opacity="0.5"
      />

      {/* Pine R2 */}
      <rect x="1348" y="845" width="12" height="30" fill="#2E3828" />
      <polygon points="1326,865 1354,782 1382,865" fill="#3A4E3A" />
      <polygon points="1332,836 1354,764 1376,836" fill="#324432" />
      <polygon points="1338,812 1354,754 1370,812" fill="#2C3E2C" />
      <path
        d="M1334,812 Q1354,805 1374,812"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        opacity="0.52"
      />
      <path
        d="M1338,834 Q1354,828 1370,834"
        stroke="white"
        strokeWidth="2"
        fill="none"
        opacity="0.45"
      />

      {/* Pine R3 (further back) */}
      <rect x="1282" y="848" width="10" height="26" fill="#2E3828" opacity="0.7" />
      <polygon points="1262,868 1287,796 1312,868" fill="#3A4E3A" opacity="0.7" />
      <polygon points="1267,844 1287,778 1307,844" fill="#324432" opacity="0.7" />
      <path
        d="M1269,844 Q1287,838 1305,844"
        stroke="white"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />

      {/* ── Faint ski track marks on slope ── */}
      <path
        d="M580 900 Q610 870 640 845 Q660 830 680 818"
        stroke="rgba(180,210,240,0.35)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="6 4"
      />
      <path
        d="M600 900 Q632 870 660 845 Q678 830 696 818"
        stroke="rgba(180,210,240,0.25)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="6 4"
      />
    </svg>
  );
});

// ─── Snow Particle System ─────────────────────────────────────────────────────

interface SnowflakeDef {
  id: number;
  x: number;       // left%
  size: number;
  opacity: number;
  duration: number;
  delay: number;   // negative = start mid-cycle
  driftX: number;
}

function SnowParticles({ reduced }: { reduced: boolean }) {
  // Defer mobile detection to after hydration to avoid SSR mismatch
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  const isMobile = isClient && window.innerWidth < 768;
  const count = (!isClient || reduced) ? 0 : isMobile ? SNOW_COUNT_MOBILE : SNOW_COUNT_DESKTOP;

  const flakes = useMemo<SnowflakeDef[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: -2 + Math.random() * 104,
        size: 2 + Math.random() * 4,
        opacity: 0.35 + Math.random() * 0.5,
        duration: 12 + Math.random() * 16,
        delay: -(Math.random() * 20), // stagger start
        driftX: (Math.random() - 0.45) * 55,
      })),
    [count]
  );

  if (count === 0) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            width: flake.size,
            height: flake.size,
            left: `${flake.x}%`,
            top: 0,
            opacity: flake.opacity,
          }}
          animate={{
            y: ["−8px", "108vh"],
            x: [0, flake.driftX * 0.5, flake.driftX],
            opacity: [flake.opacity, flake.opacity, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 1.5,
            ease: "linear",
            opacity: { times: [0, 0.82, 1] },
          }}
        />
      ))}
    </div>
  );
}

// ─── Wind Sweep Effect ────────────────────────────────────────────────────────

function WindSweep({ reduced }: { reduced: boolean }) {
  // Must call useMemo before any early return (Rules of Hooks)
  const sweeps = useMemo(
    () =>
      [
        { yPct: 74, delay: 3, repeatDelay: 12 },
        { yPct: 82, delay: 9, repeatDelay: 16 },
        { yPct: 78, delay: 16, repeatDelay: 20 },
      ],
    []
  );

  if (reduced) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {sweeps.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${s.yPct}%`,
            left: "-15%",
            width: "130%",
            height: "35px",
            background:
              "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.16) 55%, rgba(255,255,255,0.07) 80%, transparent 100%)",
          }}
          animate={{
            x: ["-100%", "100%"],
            opacity: [0, 0.7, 0.9, 0.5, 0],
          }}
          transition={{
            duration: 3.2,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
            ease: "easeInOut",
            opacity: { times: [0, 0.2, 0.5, 0.8, 1] },
          }}
        />
      ))}
    </div>
  );
}

// ─── Cold Light Shimmer ───────────────────────────────────────────────────────

function ColdLightShimmer({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at 62% 22%, rgba(255,253,240,0.14) 0%, rgba(200,228,248,0.06) 40%, transparent 65%)",
      }}
      animate={
        reduced
          ? {}
          : {
              opacity: [0.65, 0.95, 0.65],
              scale: [1, 1.03, 1],
            }
      }
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ─── Ski Track Animation ──────────────────────────────────────────────────────

function SkiTracks({ reduced }: { reduced: boolean }) {
  if (reduced) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 900"
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
        aria-hidden="true"
      >
        {/* Animated ski track line that draws itself */}
        <motion.path
          d="M580 900 Q610 870 640 845 Q660 830 680 818"
          stroke="rgba(200,230,255,0.5)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 0.5, 0.4, 0],
          }}
          transition={{
            duration: 5,
            delay: 2,
            repeat: Infinity,
            repeatDelay: 14,
            ease: "easeInOut",
            times: [0, 0.4, 0.7, 1],
          }}
        />
        <motion.path
          d="M600 900 Q632 870 660 845 Q678 830 696 818"
          stroke="rgba(200,230,255,0.38)"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 0.38, 0.3, 0],
          }}
          transition={{
            duration: 5,
            delay: 2.3,
            repeat: Infinity,
            repeatDelay: 14,
            ease: "easeInOut",
            times: [0, 0.4, 0.7, 1],
          }}
        />
      </svg>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function SnowAtmosphere() {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ── Static winter scene ── */}
      <WinterSceneSVG />

      {/* ── Cold light shimmer on ridges ── */}
      <ColdLightShimmer reduced={reduced} />

      {/* ── Snow particles ── */}
      <SnowParticles reduced={reduced} />

      {/* ── Wind sweep ── */}
      <WindSweep reduced={reduced} />

      {/* ── Ski track draw-in ── */}
      <SkiTracks reduced={reduced} />

      {/* ── Content readability overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(168,200,224,0.06) 0%, rgba(235,248,255,0.22) 60%, rgba(215,238,255,0.42) 100%)",
        }}
      />
    </div>
  );
}
