"use client";

/**
 * TrailAtmosphere — Autumn Forest Scene
 *
 * Mood: warm, reflective, quietly alive.
 *
 * Layers (back → front):
 *   1. Sky gradient (warm beige → pale blue)
 *   2. Breathing sun glow
 *   3. Distant + midground pine trees (SVG)
 *   4. Trail path + ground
 *   5. Falling leaves (particle system)
 *   6. Birds (secondary motion)
 *   7. Dust particles near ground
 *   8. Content-readability neutral overlay
 *
 * All animations use GPU-friendly transform + opacity only.
 * Mouse parallax shifts tree layers subtly.
 * Respects prefers-reduced-motion.
 */

import React, { useState, useMemo, useRef, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ─── Constants ────────────────────────────────────────────────────────────────

const LEAF_COLORS = [
  "#C0392B", // crimson
  "#E67E22", // burnt orange
  "#DAA520", // golden
  "#B5651D", // saddlebrown
  "#CD853F", // peru
  "#8B4513", // sienna
  "#D4A017", // harvest gold
];

const LEAF_COUNT_DESKTOP = 16;
const LEAF_COUNT_MOBILE = 7;
const BIRD_COUNT = 2;
const DUST_COUNT = 10;

// Deterministic pseudo-random using a seed — avoids SSR/client hydration mismatch.
// Same seed always produces the same value in [0, 1).
function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ─── Static Scene (Memoized SVG) ──────────────────────────────────────────────

const TrailSceneSVG = memo(function TrailSceneSVG() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        {/* Sky — warm beige to soft dusty blue */}
        <linearGradient id="trail-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E3CCAE" />
          <stop offset="45%" stopColor="#D4BFA0" />
          <stop offset="100%" stopColor="#C4AF8E" />
        </linearGradient>

        {/* Sun halo */}
        <radialGradient id="trail-sun-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF4C2" stopOpacity="1" />
          <stop offset="35%" stopColor="#FFD870" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFD870" stopOpacity="0" />
        </radialGradient>

        {/* Ground */}
        <linearGradient id="trail-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9A7B58" />
          <stop offset="100%" stopColor="#7A5C3A" />
        </linearGradient>

        {/* Trail dirt */}
        <linearGradient id="trail-dirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B09070" />
          <stop offset="100%" stopColor="#8A7050" />
        </linearGradient>

        {/* Distant hill mist */}
        <linearGradient id="trail-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BDB09A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#A89A7A" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* ── Sky ── */}
      <rect width="1440" height="900" fill="url(#trail-sky)" />

      {/* ── Distant hills silhouette ── */}
      <path
        d="M0 640 Q200 540 420 600 Q580 530 720 580 Q860 510 1030 560 Q1220 500 1440 550 L1440 900 L0 900 Z"
        fill="url(#trail-hill)"
      />
      <path
        d="M0 680 Q200 610 380 650 Q540 580 680 630 Q830 570 1000 620 Q1200 560 1440 610 L1440 900 L0 900 Z"
        fill="#B8A888"
        opacity="0.45"
      />

      {/* ── Distant pine trees — far left ── */}
      <g opacity="0.28" fill="#6E7F5C">
        <polygon points="30,660 55,595 80,660" />
        <polygon points="55,668 85,590 115,668" />
        <polygon points="95,672 125,592 155,672" />
        <polygon points="5,655 28,600 51,655" />
        <rect x="51" y="660" width="8" height="18" fill="#5A4830" />
        <rect x="82" y="668" width="8" height="18" fill="#5A4830" />
      </g>

      {/* ── Distant pine trees — far right ── */}
      <g opacity="0.28" fill="#6E7F5C">
        <polygon points="1295,658 1320,590 1345,658" />
        <polygon points="1330,665 1360,585 1390,665" />
        <polygon points="1365,668 1395,587 1425,668" />
        <polygon points="1400,660 1425,598 1450,660" />
        <rect x="1318" y="658" width="8" height="18" fill="#5A4830" />
        <rect x="1358" y="665" width="8" height="18" fill="#5A4830" />
      </g>

      {/* ── Midground trees — left framing ── */}
      <g opacity="0.75">
        {/* Trunk */}
        <rect x="30" y="830" width="16" height="80" fill="#4A3822" />
        <rect x="90" y="820" width="16" height="90" fill="#4A3822" />
        <rect x="150" y="810" width="16" height="100" fill="#4A3822" />
        {/* Canopy layers */}
        <polygon points="-30,880 38,735 106,880" fill="#586A44" />
        <polygon points="-30,820 38,700 106,820" fill="#4E6040" />
        <polygon points="-30,770 38,670 106,770" fill="#475A3B" />
        <polygon points="50,870 98,740 146,870" fill="#586A44" />
        <polygon points="50,815 98,705 146,815" fill="#4E6040" />
        <polygon points="50,770 98,680 146,770" fill="#475A3B" />
        <polygon points="115,880 155,760 195,880" fill="#516344" />
        <polygon points="115,835 155,725 195,835" fill="#4A5C3D" />
      </g>

      {/* ── Midground trees — right framing ── */}
      <g opacity="0.75">
        <rect x="1394" y="830" width="16" height="80" fill="#4A3822" />
        <rect x="1334" y="820" width="16" height="90" fill="#4A3822" />
        <rect x="1274" y="810" width="16" height="100" fill="#4A3822" />
        <polygon points="1334,880 1402,735 1470,880" fill="#586A44" />
        <polygon points="1334,820 1402,700 1470,820" fill="#4E6040" />
        <polygon points="1334,770 1402,670 1470,770" fill="#475A3B" />
        <polygon points="1294,870 1342,740 1390,870" fill="#586A44" />
        <polygon points="1294,815 1342,705 1390,815" fill="#4E6040" />
        <polygon points="1294,770 1342,680 1390,770" fill="#475A3B" />
        <polygon points="1245,880 1285,760 1325,880" fill="#516344" />
        <polygon points="1245,835 1285,725 1325,835" fill="#4A5C3D" />
      </g>

      {/* ── Ground base ── */}
      <path
        d="M0 825 Q360 798 720 812 Q1080 828 1440 812 L1440 900 L0 900 Z"
        fill="#9A7B58"
      />
      <path
        d="M0 858 Q360 840 720 850 Q1080 862 1440 850 L1440 900 L0 900 Z"
        fill="#7A5C3A"
      />

      {/* ── Trail path (center foreground) ── */}
      <path
        d="M555 900 Q580 855 615 810 Q650 760 672 720 Q695 678 707 640 Q718 605 720 560"
        stroke="#B09878"
        strokeWidth="72"
        fill="none"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M555 900 Q580 855 615 810 Q650 760 672 720 Q695 678 707 640 Q718 605 720 560"
        stroke="#C8AC88"
        strokeWidth="48"
        fill="none"
        strokeLinecap="round"
        opacity="0.45"
      />
      {/* Trail center highlight */}
      <path
        d="M570 900 Q593 855 625 810 Q660 760 680 720 Q702 678 712 640 Q722 605 722 560"
        stroke="#D4BA98"
        strokeWidth="16"
        fill="none"
        strokeLinecap="round"
        opacity="0.25"
      />

      {/* ── Rocks & debris ── */}
      <ellipse cx="615" cy="868" rx="9" ry="6" fill="#8A7B6B" opacity="0.65" />
      <ellipse cx="648" cy="848" rx="6" ry="4" fill="#7A6B5B" opacity="0.55" />
      <ellipse cx="682" cy="820" rx="7" ry="5" fill="#8A7B6B" opacity="0.62" />
      <ellipse cx="695" cy="798" rx="5" ry="3" fill="#7A6B5B" opacity="0.5" />
      <ellipse cx="705" cy="775" rx="6" ry="4" fill="#8A7B6B" opacity="0.55" />

      {/* ── Fallen branches ── */}
      <path
        d="M530 862 Q555 857 590 865"
        stroke="#6B5235"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M760 850 Q785 845 812 852"
        stroke="#6B5235"
        strokeWidth="2"
        fill="none"
        opacity="0.42"
      />
      <path
        d="M490 875 Q510 875 520 870"
        stroke="#7A6040"
        strokeWidth="2"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
});

// ─── Leaf Particle System ─────────────────────────────────────────────────────

interface LeafDef {
  id: number;
  x: number;         // left % across viewport
  size: number;
  color: string;
  duration: number;  // fall duration (s)
  delay: number;     // negative = start mid-cycle
  driftX: number;    // horizontal drift (px)
  rotateStart: number;
  rotateEnd: number;
  shape: "ellipse" | "maple" | "round";
  opacity: number;
}

function LeafShape({ color, shape }: { color: string; shape: LeafDef["shape"] }) {
  if (shape === "maple") {
    return (
      <path
        d="M12 2 L14 8 L20 6 L16 11 L22 14 L16 14 L18 20 L12 16 L6 20 L8 14 L2 14 L8 11 L4 6 L10 8 Z"
        fill={color}
      />
    );
  }
  if (shape === "round") {
    return <circle cx="12" cy="12" r="9" fill={color} />;
  }
  // ellipse (default)
  return (
    <>
      <ellipse cx="12" cy="12" rx="9" ry="5" fill={color} />
      <path
        d="M12 7 Q14 12 12 17 Q10 12 12 7"
        fill={color}
        opacity="0.6"
      />
    </>
  );
}

const LEAF_SHAPES: LeafDef["shape"][] = ["ellipse", "maple", "round"];

function LeafParticles({ reduced }: { reduced: boolean }) {
  // Defer mobile detection to after hydration to avoid SSR mismatch
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  const isMobile = isClient && window.innerWidth < 768;
  const count = (!isClient || reduced) ? 0 : isMobile ? LEAF_COUNT_MOBILE : LEAF_COUNT_DESKTOP;

  const leaves = useMemo<LeafDef[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: 5 + seededRand(i * 11 + 1) * 90,
        size: 10 + seededRand(i * 11 + 2) * 14,
        color: LEAF_COLORS[Math.floor(seededRand(i * 11 + 3) * LEAF_COLORS.length)],
        duration: 7 + seededRand(i * 11 + 4) * 9,
        // Spread start times across the full cycle so leaves are always falling
        delay: -(seededRand(i * 11 + 5) * (7 + seededRand(i * 11 + 4) * 9)),
        driftX: (seededRand(i * 11 + 6) - 0.5) * 140,
        rotateStart: seededRand(i * 11 + 7) * 360,
        rotateEnd: seededRand(i * 11 + 8) * 360 + 180,
        shape: LEAF_SHAPES[Math.floor(seededRand(i * 11 + 9) * LEAF_SHAPES.length)],
        opacity: 0.7 + seededRand(i * 11 + 10) * 0.3,
      })),
    [count]
  );

  if (count === 0) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {leaves.map((leaf) => (
        <motion.svg
          key={leaf.id}
          width={leaf.size}
          height={leaf.size}
          viewBox="0 0 24 24"
          style={{
            position: "absolute",
            top: 0,
            left: `${leaf.x}%`,
            opacity: leaf.opacity,
          }}
          initial={{ y: "-3vh", x: 0, rotate: leaf.rotateStart }}
          animate={{
            y: "110vh",
            x: [0, leaf.driftX * 0.4, leaf.driftX * 0.8, leaf.driftX],
            rotate: leaf.rotateEnd,
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            repeatDelay: 0,
            ease: "linear",
          }}
        >
          <LeafShape color={leaf.color} shape={leaf.shape} />
        </motion.svg>
      ))}
    </div>
  );
}

// ─── Bird System ──────────────────────────────────────────────────────────────

function Birds({ reduced }: { reduced: boolean }) {
  const birds = useMemo(
    () =>
      Array.from({ length: BIRD_COUNT }, (_, i) => ({
        id: i,
        yPct: 12 + i * 7,
        duration: 28 + i * 10,
        initialDelay: 4 + i * 9,
        repeatDelay: 18 + i * 8,
        fromLeft: i % 2 === 0,
        scale: 0.7 + seededRand(i * 13 + 100) * 0.4,
      })),
    []
  );

  if (reduced) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {birds.map((bird) => (
        <motion.svg
          key={bird.id}
          width="28"
          height="14"
          viewBox="0 0 28 14"
          style={{
            position: "absolute",
            top: `${bird.yPct}%`,
            scale: bird.scale,
          }}
          initial={{ x: bird.fromLeft ? "-8vw" : "108vw" }}
          animate={{ x: bird.fromLeft ? "108vw" : "-8vw" }}
          transition={{
            duration: bird.duration,
            delay: bird.initialDelay,
            repeat: Infinity,
            repeatDelay: bird.repeatDelay,
            ease: "linear",
          }}
        >
          {/* Simple gull silhouette */}
          <path
            d="M14 7 Q7 3 0 5 M14 7 Q21 3 28 5"
            stroke="#8A7860"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </motion.svg>
      ))}
    </div>
  );
}

// ─── Dust Particles ───────────────────────────────────────────────────────────

function DustParticles({ reduced }: { reduced: boolean }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: DUST_COUNT }, (_, i) => ({
        id: i,
        left: 8 + seededRand(i * 7 + 1) * 84,
        bottom: 4 + seededRand(i * 7 + 2) * 18,
        size: 2 + seededRand(i * 7 + 3) * 2,
        duration: 3.5 + seededRand(i * 7 + 4) * 4,
        delay: seededRand(i * 7 + 5) * 6,
      })),
    []
  );

  if (reduced || !isClient) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: "#C0A880",
            left: `${p.left}%`,
            bottom: `${p.bottom}%`,
          }}
          animate={{
            y: [0, -14, 5, -8, 0],
            x: [0, 6, -4, 5, 0],
            opacity: [0.25, 0.55, 0.2, 0.45, 0.25],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Parallax Container ───────────────────────────────────────────────────────

function useParallax(reduced: boolean) {
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // –1 to 1
      const dy = (e.clientY - cy) / cy;

      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${dx * 4}px, ${dy * 2.5}px)`;
      }
      if (fgRef.current) {
        fgRef.current.style.transform = `translate(${dx * 7}px, ${dy * 4}px)`;
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reduced]);

  return { bgRef, fgRef };
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function TrailAtmosphere() {
  const reduced = useReducedMotion();
  const { bgRef, fgRef } = useParallax(reduced);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ── Background scene (parallax: slow layer) ── */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{ willChange: "transform", transition: "transform 0.18s ease-out" }}
      >
        <TrailSceneSVG />
      </div>

      {/* ── Foreground ground strip (parallax: fast layer) ── */}
      <div
        ref={fgRef}
        className="absolute inset-0"
        style={{ willChange: "transform", transition: "transform 0.12s ease-out" }}
      >
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
          style={{ pointerEvents: "none" }}
        >
          {/* Grass tufts near camera */}
          <path
            d="M0 882 Q360 874 720 878 Q1080 882 1440 876 L1440 900 L0 900 Z"
            fill="#6B5235"
            opacity="0.55"
          />
          {/* Fallen petals on ground */}
          <ellipse cx="420" cy="886" rx="5" ry="3" fill="#C0392B" opacity="0.35" />
          <ellipse cx="880" cy="890" rx="4" ry="2" fill="#DAA520" opacity="0.3" />
          <ellipse cx="1080" cy="883" rx="6" ry="3" fill="#E67E22" opacity="0.28" />
        </svg>
      </div>

      {/* ── Breathing sun glow ── */}
      {!reduced && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            top: "15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 220,
            height: 220,
          }}
          animate={{ scale: [1, 1.07, 1], opacity: [0.45, 0.62, 0.45] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,244,194,0.45) 0%, rgba(255,216,112,0.22) 45%, transparent 72%)",
            }}
          />
        </motion.div>
      )}

      {/* ── Tree sway (very subtle, right-side tree canopy) ── */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ transformOrigin: "bottom center" }}
          animate={{ skewX: [0, 0.3, 0, -0.25, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* ── Particles ── */}
      <LeafParticles reduced={reduced} />
      <Birds reduced={reduced} />
      <DustParticles reduced={reduced} />

      {/* ── Neutral content-readability overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(227,204,174,0.08) 0%, rgba(197,175,142,0.28) 60%, rgba(160,130,90,0.45) 100%)",
        }}
      />
    </div>
  );
}
