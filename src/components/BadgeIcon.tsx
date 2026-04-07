/**
 * BadgeIcon Component
 * AllTrails-inspired nature badge SVGs with organic shapes
 */

import React from "react";

export type BadgeVariant =
  | "boot"
  | "elevation"
  | "mountain-peak"
  | "tree"
  | "landscape"
  | "bar-chart"
  | "summit"
  | "climbing"
  | "leaf"
  | "flower"
  | "bird"
  | "tree-rings"
  | "signpost"
  | "sunrise"
  | "endurance"
  | "half-dome"
  | "topography"
  | "footprints"
  | "hiker"
  | "snowflake"
  | "ski-lift"
  | "snowboard"
  | "calendar"
  | "gps";

interface BadgeIconProps {
  variant: BadgeVariant;
  size?: number;
  className?: string;
  muted?: boolean;
}

const badgeFill = "#FAF5EE"; // warm cream badge background
const iconFill = "#2C2C2C"; // near-black icon color

export default function BadgeIcon({
  variant,
  size = 80,
  className = "",
  muted = false,
}: BadgeIconProps) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        opacity: muted ? 0.4 : 1,
        filter: muted ? "grayscale(100%)" : "none",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderBadge(variant)}
      </svg>
    </div>
  );
}

function renderBadge(variant: BadgeVariant) {
  switch (variant) {
    case "boot":
      return <BootBadge />;
    case "elevation":
      return <ElevationBadge />;
    case "mountain-peak":
      return <MountainPeakBadge />;
    case "tree":
      return <TreeBadge />;
    case "landscape":
      return <LandscapeBadge />;
    case "bar-chart":
      return <BarChartBadge />;
    case "summit":
      return <SummitBadge />;
    case "climbing":
      return <ClimbingBadge />;
    case "leaf":
      return <LeafBadge />;
    case "flower":
      return <FlowerBadge />;
    case "bird":
      return <BirdBadge />;
    case "tree-rings":
      return <TreeRingsBadge />;
    case "signpost":
      return <SignpostBadge />;
    case "sunrise":
      return <SunriseBadge />;
    case "endurance":
      return <EnduranceBadge />;
    case "half-dome":
      return <HalfDomeBadge />;
    case "topography":
      return <TopographyBadge />;
    case "footprints":
      return <FootprintsBadge />;
    case "hiker":
      return <HikerBadge />;
    case "snowflake":
      return <SnowflakeBadge />;
    case "ski-lift":
      return <SkiLiftBadge />;
    case "snowboard":
      return <SnowboardBadge />;
    case "calendar":
      return <CalendarBadge />;
    case "gps":
      return <GpsBadge />;
    default:
      return <TreeBadge />;
  }
}

/* ============================================
   BADGE SHAPES — organic, nature-inspired
   ============================================ */

/** Triangle/shield badge with pine tree — like AllTrails "Longest activity" */
function TreeBadge() {
  return (
    <>
      {/* Circle badge */}
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      {/* Pine tree */}
      <g transform="translate(50, 52)" fill={iconFill}>
        {/* 4-tier Tree layers */}
        <path d="M0,-25 L-7,-12 L-3,-12 L-11,-2 L-6,-2 L-14,7 L-8,7 L-18,16 L18,16 L8,7 L14,7 L6,-2 L11,-2 L3,-12 L7,-12 Z" />
        {/* Trunk (slightly tapered) */}
        <polygon points="-3,16 -4,23 4,23 3,16" />
      </g>
    </>
  );
}

/** Trail signpost badge for "Trails completed" */
function SignpostBadge() {
  return (
    <>
      {/* Circle badge */}
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      {/* Signpost */}
      <g transform="translate(50, 50)" fill={iconFill}>
        {/* Main post */}
        <rect x="-4" y="-24" width="8" height="48" rx="2" />
        {/* Top sign (pointing right) */}
        <path d="M-2,-18 L16,-18 L24,-12 L16,-6 L-2,-6 Z" />
        {/* Bottom sign (pointing left) */}
        <path d="M2,-2 L-16,-2 L-24,4 L-16,10 L2,10 Z" />
        {/* Nails */}
        <circle cx="0" cy="-12" r="1.5" fill={badgeFill} />
        <circle cx="0" cy="4" r="1.5" fill={badgeFill} />
      </g>
    </>
  );
}

/** Organic blob with tree rings/cross-section — like AllTrails "Longest streak" */
function TreeRingsBadge() {
  return (
    <>
      {/* Organic blob shape */}
      <path
        d="M75 18C88 28 92 48 85 65C78 82 60 90 43 86C26 82 14 68 12 52C10 36 18 20 33 13C48 6 62 8 75 18Z"
        fill={badgeFill}
      />
      {/* Tree rings */}
      <g transform="translate(50, 50)" fill="none" stroke={iconFill} strokeWidth="3">
        <circle cx="0" cy="0" r="4" fill={iconFill} />
        <circle cx="0" cy="0" r="10" />
        <circle cx="0" cy="0" r="16" />
        <circle cx="0" cy="0" r="22" />
      </g>
    </>
  );
}

/** Circular badge with flower/sun — like AllTrails "Most time outside" */
function FlowerBadge() {
  return (
    <>
      {/* Circle badge */}
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      {/* Flower petals */}
      <g transform="translate(50, 50)" fill={iconFill}>
        <circle cx="0" cy="0" r="6" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-16"
            rx="6"
            ry="10"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
    </>
  );
}

/** Organic blob with flag — like AllTrails "Highest point" */
function BirdBadge() {
  return (
    <>
      {/* Organic badge shape */}
      <path
        d="M68 12C82 18 92 34 90 52C88 70 76 84 60 88C44 92 28 84 18 70C8 56 8 38 18 24C28 10 48 4 68 12Z"
        fill={badgeFill}
      />
      {/* Flag on pole */}
      <g transform="translate(46, 50)" fill={iconFill}>
        {/* Pole */}
        <line x1="0" y1="-28" x2="0" y2="26" stroke={iconFill} strokeWidth="3.5" strokeLinecap="round" />
        {/* Flag - large triangular pennant */}
        <path d="M0,-28 C6,-26 18,-22 18,-18 C18,-14 6,-12 0,-10 Z" fill={iconFill} />
      </g>
    </>
  );
}

/** Organic shield with leaf — like AllTrails "Most elev. gain" */
function LeafBadge() {
  return (
    <>
      {/* Shield/organic shape */}
      <path
        d="M50 8C62 8 78 16 84 30C90 44 88 62 78 74C68 86 56 92 50 92C44 92 32 86 22 74C12 62 10 44 16 30C22 16 38 8 50 8Z"
        fill={badgeFill}
      />
      {/* Leaf */}
      <g transform="translate(50, 50)" fill={iconFill}>
        <path d="M0,-24C12,-20 20,-8 18,6C16,20 6,28 0,30C-6,28 -16,20 -18,6C-20,-8 -12,-20 0,-24Z" />
        {/* Leaf vein */}
        <line x1="0" y1="-20" x2="0" y2="28" stroke={badgeFill} strokeWidth="2" />
        <line x1="0" y1="-8" x2="-8" y2="-2" stroke={badgeFill} strokeWidth="1.5" />
        <line x1="0" y1="2" x2="8" y2="8" stroke={badgeFill} strokeWidth="1.5" />
        <line x1="0" y1="10" x2="-8" y2="16" stroke={badgeFill} strokeWidth="1.5" />
      </g>
    </>
  );
}

/** Hiking boot badge */
function BootBadge() {
  return (
    <>
      {/* Circle badge */}
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      {/* Boot silhouette */}
      <g transform="translate(50, 52)" fill={iconFill}>
        <path d="M-14,-16L-12,-8L-12,0L-8,4L-8,8L-18,8L-20,4L-18,-4L-16,-10Z" />
        <path d="M-12,-8C-8,-12 0,-14 6,-10C12,-6 14,0 14,6L14,8L-8,8L-8,4L-12,0Z" />
        {/* Sole */}
        <rect x="-20" y="8" width="34" height="5" rx="2" />
        {/* Laces */}
        <line x1="-8" y1="-6" x2="-2" y2="-8" stroke={badgeFill} strokeWidth="1.5" />
        <line x1="-6" y1="-2" x2="0" y2="-4" stroke={badgeFill} strokeWidth="1.5" />
        <line x1="-6" y1="2" x2="2" y2="0" stroke={badgeFill} strokeWidth="1.5" />
      </g>
    </>
  );
}

/** Mountain/elevation chart badge */
function ElevationBadge() {
  return (
    <>
      {/* Circle badge */}
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      {/* Elevation chart line */}
      <g transform="translate(50, 52)" fill="none" stroke={iconFill} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="-26,16 -16,4 -6,-14 4,-6 14,-20 24,8" />
        {/* Axis */}
        <line x1="-26" y1="20" x2="26" y2="20" />
      </g>
    </>
  );
}

/** Mountain peak badge */
function MountainPeakBadge() {
  return (
    <>
      {/* Circle badge */}
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      {/* Mountain peaks */}
      <g transform="translate(50, 54)" fill={iconFill}>
        <polygon points="-24,16 -8,-16 8,16" />
        <polygon points="-2,16 14,-22 30,16" />
        {/* Snow cap */}
        <polygon points="14,-22 8,-12 20,-12" fill={badgeFill} />
      </g>
    </>
  );
}

/** Landscape/parks badge */
function LandscapeBadge() {
  return (
    <>
      {/* Rounded square */}
      <rect x="10" y="10" width="80" height="80" rx="16" fill={badgeFill} />
      {/* Landscape scene */}
      <g transform="translate(50, 52)" fill={iconFill}>
        {/* Mountains */}
        <polygon points="-24,16 -10,-12 4,16" />
        <polygon points="-4,16 10,-18 24,16" />
        {/* Sun */}
        <circle cx="-16" cy="-14" r="6" />
        {/* Ground */}
        <rect x="-28" y="16" width="56" height="4" rx="2" />
      </g>
    </>
  );
}

/** Bar chart badge */
function BarChartBadge() {
  return (
    <>
      {/* Circle badge */}
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      {/* Bar chart */}
      <g transform="translate(50, 50)" fill={iconFill}>
        <rect x="-20" y="-4" width="8" height="24" rx="2" />
        <rect x="-6" y="-16" width="8" height="36" rx="2" />
        <rect x="8" y="-10" width="8" height="30" rx="2" />
      </g>
    </>
  );
}

/** Summit/climbing badge (for 5000ft gain) */
function ClimbingBadge() {
  return (
    <>
      {/* Shield shape */}
      <path
        d="M50 8C62 8 78 16 84 30C90 44 88 62 78 74C68 86 56 92 50 92C44 92 32 86 22 74C12 62 10 44 16 30C22 16 38 8 50 8Z"
        fill={badgeFill}
      />
      {/* Mountain with flag */}
      <g transform="translate(50, 52)" fill={iconFill}>
        <polygon points="-22,20 0,-24 22,20" />
        {/* Flag pole */}
        <line x1="0" y1="-24" x2="0" y2="-32" stroke={iconFill} strokeWidth="2" />
        {/* Flag */}
        <polygon points="0,-32 12,-28 0,-24" />
        {/* Snow line */}
        <polygon points="0,-24 -8,-12 8,-12" fill={badgeFill} />
      </g>
    </>
  );
}

/** Summit badge (for 20+ mile club) */
function SummitBadge() {
  return (
    <>
      {/* Rounded triangle shape */}
      <path
        d="M50 8C52 8 54 9.5 55.5 12L86 63C90 70 86 80 78 80H22C14 80 10 70 14 63L44.5 12C46 9.5 48 8 50 8Z"
        fill={badgeFill}
      />
      {/* Mountain range */}
      <g transform="translate(50, 48)" fill={iconFill}>
        <polygon points="-20,18 -4,-18 12,18" />
        <polygon points="0,18 12,-12 24,18" />
        {/* Snow cap */}
        <polygon points="-4,-18 -10,-6 2,-6" fill={badgeFill} />
      </g>
    </>
  );
}

/** Sunrise/park explorer badge */
function SunriseBadge() {
  return (
    <>
      {/* Organic blob */}
      <path
        d="M75 18C88 28 92 48 85 65C78 82 60 90 43 86C26 82 14 68 12 52C10 36 18 20 33 13C48 6 62 8 75 18Z"
        fill={badgeFill}
      />
      {/* Sunrise */}
      <g transform="translate(50, 50)" fill={iconFill}>
        {/* Sun half */}
        <path d="M-14,4A14,14 0 0,1 14,4Z" />
        {/* Rays */}
        {[-60, -30, 0, 30, 60].map((angle) => (
          <line
            key={angle}
            x1="0"
            y1="-8"
            x2="0"
            y2="-18"
            stroke={iconFill}
            strokeWidth="2.5"
            strokeLinecap="round"
            transform={`rotate(${angle})`}
          />
        ))}
        {/* Horizon line */}
        <line x1="-22" y1="4" x2="22" y2="4" stroke={iconFill} strokeWidth="3" strokeLinecap="round" />
      </g>
    </>
  );
}

/** Endurance/muscle badge */
function EnduranceBadge() {
  return (
    <>
      {/* Circle badge */}
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      {/* Lightning bolt */}
      <g transform="translate(50, 50)" fill={iconFill}>
        <polygon points="-4,-24 6,-4 -2,-4 4,24 -6,4 2,4" />
      </g>
    </>
  );
}

/** Half Dome specific badge */
function HalfDomeBadge() {
  return (
    <>
      {/* Circle badge */}
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      {/* Half Dome silhouette */}
      <g transform="translate(50, 52)" fill={iconFill}>
        <path d="M-18,16L-18,-4C-18,-18 -8,-26 2,-26C12,-26 16,-18 16,-8L16,16Z" />
        {/* Vertical line detail */}
        <line x1="16" y1="-8" x2="16" y2="16" stroke={badgeFill} strokeWidth="2" />
      </g>
    </>
  );
}

/** Topographic contour lines badge for "Highest point" */
function TopographyBadge() {
  return (
    <>
      {/* Circle badge */}
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      {/* Topographic Lines */}
      <g transform="translate(50, 50)" fill="none" stroke={iconFill} strokeWidth="2.5" strokeLinejoin="round">
        <path d="M 0,-28 C 15,-28 25,-20 28,-5 C 31,10 20,25 0,28 C -20,31 -28,15 -28,-5 C -28,-20 -15,-28 0,-28 Z" />
        <path d="M 2,-18 C 12,-20 18,-12 20,-2 C 22,8 12,18 -2,18 C -14,18 -20,8 -18,-2 C -16,-12 -8,-16 2,-18 Z" />
        <path d="M 0,-9 C 6,-9 11,-7 11,-1 C 11,5 8,9 2,9 C -4,9 -8,9 -8,3 C -8,-3 -6,-9 0,-9 Z" />
        {/* Center Peak marking (triangle) */}
        <polygon points="-2,1 2,1 0,-3" fill={iconFill} stroke="none" />
      </g>
    </>
  );
}

/** Alternating boot footprints for "Total miles" */
function FootprintsBadge() {
  return (
    <>
      {/* Circle badge */}
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      {/* Footprints pair rotated and scaled to fit inside the circle */}
      <g transform="translate(50, 50) rotate(20) scale(0.85)">
        
        {/* Left Footprint (shifted left and down) */}
        <g transform="translate(-14, 16)">
          <path d="M 0,-16 C -8,-16 -12,-6 -10,2 C -8,10 -2,10 2,8 C 6,6 8,-2 6,-10 C 5,-15 3,-16 0,-16 Z" fill={iconFill} />
          <path d="M -2,12 C 4,11 7,14 6,22 C 4,28 -3,28 -8,22 C -10,18 -8,13 -2,12 Z" fill={iconFill} />
          {/* Tread lines cutting through fill */}
          <g stroke={badgeFill} strokeWidth="2.5" strokeLinecap="round">
            <line x1="-7" y1="-10" x2="4" y2="-10" />
            <line x1="-8" y1="-4" x2="5" y2="-4" />
            <line x1="-7" y1="2" x2="3" y2="2" />
            <line x1="-5" y1="16" x2="4" y2="16" />
            <line x1="-5" y1="22" x2="3" y2="22" />
          </g>
        </g>

        {/* Right Footprint (shifted right and up, mirrored horizontally) */}
        <g transform="translate(14, -16) scale(-1, 1)">
          <path d="M 0,-16 C -8,-16 -12,-6 -10,2 C -8,10 -2,10 2,8 C 6,6 8,-2 6,-10 C 5,-15 3,-16 0,-16 Z" fill={iconFill} />
          <path d="M -2,12 C 4,11 7,14 6,22 C 4,28 -3,28 -8,22 C -10,18 -8,13 -2,12 Z" fill={iconFill} />
          {/* Tread lines cutting through fill */}
          <g stroke={badgeFill} strokeWidth="2.5" strokeLinecap="round">
            <line x1="-7" y1="-10" x2="4" y2="-10" />
            <line x1="-8" y1="-4" x2="5" y2="-4" />
            <line x1="-7" y1="2" x2="3" y2="2" />
            <line x1="-5" y1="16" x2="4" y2="16" />
            <line x1="-5" y1="22" x2="3" y2="22" />
          </g>
        </g>

      </g>
    </>
  );
}

/** Silhouette of a hiker with trekking poles climbing for "Elevation gained" */
function HikerBadge() {
  return (
    <>
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      <g transform="translate(50, 52)" fill="none" stroke={iconFill} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        {/* The Ground Hill */}
        <line x1="-28" y1="26" x2="28" y2="-2" strokeWidth="4" />
        
        {/* Back Pole (drawn behind) */}
        <line x1="-6.5" y1="-6" x2="-14" y2="19" strokeWidth="2" />
        
        {/* Back Arm */}
        <polyline points="3,-9 -2,-4 -8,-1" />

        {/* Back Leg */}
        <polyline points="0,0 -3,7 -6,15" />
        
        {/* Backpack */}
        <path d="M 3.5,-10.5 C -4,-10 -6,-2 0,0" strokeWidth="3" />
        
        {/* Torso */}
        <line x1="0" y1="0" x2="4" y2="-12" />
        
        {/* Head */}
        <circle cx="6" cy="-16" r="3.5" fill={iconFill} stroke="none" />
        
        {/* Front Leg */}
        <polyline points="0,0 8,1 10,7" /> 
        
        {/* Front Arm */}
        <polyline points="3,-9 6,-3 12,-5" />
        
        {/* Right/Front Pole */}
        <line x1="10" y1="-9.5" x2="16" y2="4" strokeWidth="2" />
      </g>
    </>
  );
}

/** Six-pointed snowflake */
function SnowflakeBadge() {
  return (
    <>
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      <g transform="translate(50, 50)" stroke={iconFill} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="0" y1="-18" x2="0" y2="18" />
        <line x1="-15.6" y1="-9" x2="15.6" y2="9" />
        <line x1="-15.6" y1="9" x2="15.6" y2="-9" />
        <polygon points="0,-12 10.4,-6 10.4,6 0,12 -10.4,6 -10.4,-6" fill="none" strokeWidth="2" />
      </g>
    </>
  );
}

/** Cable car for lifts ridden */
function SkiLiftBadge() {
  return (
    <>
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      <g transform="translate(50, 50)" fill="none" stroke={iconFill} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="-24" y1="-10" x2="24" y2="14" strokeWidth="2" />
        <line x1="0" y1="2" x2="0" y2="10" />
        <line x1="-8" y1="10" x2="8" y2="10" />
        <rect x="-8" y="10" width="16" height="14" rx="2" fill={iconFill} />
        <rect x="-5" y="12" width="4" height="6" fill={badgeFill} stroke="none" />
        <rect x="1" y="12" width="4" height="6" fill={badgeFill} stroke="none" />
      </g>
    </>
  );
}

/** Snowboard for distance */
function SnowboardBadge() {
  return (
    <>
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      <g transform="translate(50, 50) rotate(-30)" fill="none" stroke={iconFill} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M -22,4 L 22,4 C 28,4 30,-2 28,-4 L -28,-4 C -30,-2 -28,4 -22,4 Z" fill={iconFill} />
        <path d="M -12,-4 L -12,-12 M 12,-4 L 12,-12" strokeWidth="4" />
        <path d="M -16,-8 L -8,-8 M 8,-8 L 16,-8" strokeWidth="2.5" />
      </g>
    </>
  );
}

/** Calendar pad for seasons */
function CalendarBadge() {
  return (
    <>
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      <g transform="translate(50, 52)" fill="none" stroke={iconFill} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-14" y="-12" width="28" height="26" rx="3" />
        <line x1="-14" y1="-2" x2="14" y2="-2" />
        <path d="M -8,-16 L -8,-8 M 0,-16 L 0,-8 M 8,-16 L 8,-8" strokeWidth="3" />
        <circle cx="-6" cy="6" r="1.5" fill={iconFill} />
        <circle cx="0" cy="6" r="1.5" fill={iconFill} />
        <circle cx="6" cy="6" r="1.5" fill={iconFill} />
        <line x1="-6" y1="14" x2="6" y2="14" strokeWidth="2" />
      </g>
    </>
  );
}

/** GPS satellite dish for tracking */
function GpsBadge() {
  return (
    <>
      <circle cx="50" cy="50" r="40" fill={badgeFill} />
      <g transform="translate(50, 50)" fill="none" stroke={iconFill} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="-6" y="-6" width="12" height="12" rx="2" fill={iconFill} />
        <rect x="-22" y="-4" width="12" height="8" rx="1.5" />
        <rect x="10" y="-4" width="12" height="8" rx="1.5" />
        <polyline points="-4,6 0,12 4,6" strokeWidth="2.5" />
        <line x1="0" y1="12" x2="0" y2="16" strokeWidth="2.5" />
        <path d="M -6,22 Q 0,26 6,22" strokeWidth="2" />
        <path d="M -10,26 Q 0,32 10,26" strokeWidth="2" />
      </g>
    </>
  );
}
