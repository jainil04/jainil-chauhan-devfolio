"use client";

import React from "react";

/* ── Snowboard ── */
export function SnowboardSVG({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Board body */}
      <path
        d="M40 8 C55 8, 68 20, 70 45 L72 215 C72 240, 55 255, 40 255 C25 255, 8 240, 10 215 L12 45 C12 20, 25 8, 40 8Z"
        fill="url(#snowboard-grad)"
        stroke="#3a3a3a"
        strokeWidth="1.5"
      />
      {/* Bindings */}
      <rect x="22" y="90" width="36" height="12" rx="3" fill="#3a3a3a" opacity="0.7" />
      <rect x="22" y="160" width="36" height="12" rx="3" fill="#3a3a3a" opacity="0.7" />
      {/* Edge detail */}
      <path d="M25 50 L25 210" stroke="#6b8f62" strokeWidth="0.8" opacity="0.5" />
      <path d="M55 50 L55 210" stroke="#6b8f62" strokeWidth="0.8" opacity="0.5" />
      {/* Top nose detail */}
      <ellipse cx="40" cy="22" rx="12" ry="4" fill="#6b8f62" opacity="0.3" />
      <defs>
        <linearGradient id="snowboard-grad" x1="10" y1="8" x2="72" y2="255" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5a7a52" />
          <stop offset="0.5" stopColor="#4a6741" />
          <stop offset="1" stopColor="#3d5636" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Pine Tree ── */
export function PineTreeSVG({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Trunk */}
      <rect x="52" y="155" width="16" height="40" rx="2" fill="#8B6F47" />
      {/* Tree layers */}
      <polygon points="60,10 95,75 25,75" fill="#4a6741" />
      <polygon points="60,40 100,110 20,110" fill="#3d5636" />
      <polygon points="60,70 105,145 15,145" fill="#2f4429" />
      {/* Snow tips */}
      <polygon points="60,10 70,30 50,30" fill="#e8e4dd" opacity="0.6" />
      <circle cx="45" cy="75" r="3" fill="#e8e4dd" opacity="0.4" />
      <circle cx="78" cy="110" r="2.5" fill="#e8e4dd" opacity="0.4" />
    </svg>
  );
}

/* ── Office Bag / Work ── */
export function OfficeBagSVG({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Handle */}
      <path
        d="M58 32 C58 18, 102 18, 102 32"
        stroke="#3a3a3a"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bag body */}
      <rect x="18" y="38" width="124" height="85" rx="8" fill="#3a3a3a" />
      <rect x="18" y="38" width="124" height="85" rx="8" stroke="#4a4a4a" strokeWidth="0.8" />

      {/* Front pocket panel */}
      <rect x="30" y="52" width="100" height="58" rx="5" fill="#333" />

      {/* Buckle / clasp */}
      <rect x="70" y="42" width="20" height="8" rx="3" fill="#555" />
      <rect x="74" y="44" width="12" height="4" rx="2" fill="#666" />

      {/* Pocket stitching lines */}
      <line x1="38" y1="60" x2="122" y2="60" stroke="#444" strokeWidth="0.5" />
      <line x1="38" y1="100" x2="122" y2="100" stroke="#444" strokeWidth="0.5" />

      {/* Document / paper hint peeking out */}
      <rect x="44" y="64" width="42" height="30" rx="2" fill="#f5f3ef" opacity="0.9" />
      <rect x="44" y="64" width="42" height="30" rx="2" stroke="#ccc" strokeWidth="0.5" />
      {/* Lines on paper */}
      <line x1="50" y1="72" x2="78" y2="72" stroke="#bbb" strokeWidth="0.8" />
      <line x1="50" y1="77" x2="72" y2="77" stroke="#bbb" strokeWidth="0.8" />
      <line x1="50" y1="82" x2="76" y2="82" stroke="#bbb" strokeWidth="0.8" />
      <line x1="50" y1="87" x2="68" y2="87" stroke="#bbb" strokeWidth="0.8" />

      {/* Code bracket hint on right side */}
      <text x="96" y="80" fill="#6b8f62" fontSize="14" fontFamily="monospace" opacity="0.6">{"{ }"}</text>

      {/* Side gusset / depth lines */}
      <line x1="18" y1="65" x2="18" y2="105" stroke="#4a4a4a" strokeWidth="0.5" />
      <line x1="142" y1="65" x2="142" y2="105" stroke="#4a4a4a" strokeWidth="0.5" />

      {/* Bottom edge shadow */}
      <ellipse cx="80" cy="126" rx="52" ry="3" fill="#2c2c2c" opacity="0.15" />

      {/* Tag / label */}
      <rect x="60" y="110" width="40" height="10" rx="2" fill="#4a6741" opacity="0.2" />
      <text x="80" y="117.5" fill="#4a6741" fontSize="5" fontFamily="monospace" textAnchor="middle" opacity="0.7">WORK</text>
    </svg>
  );
}

/* ── Camera ── */
export function CameraSVG({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="15" y="35" width="150" height="90" rx="10" fill="#3a3a3a" />
      <rect x="15" y="35" width="150" height="90" rx="10" stroke="#555" strokeWidth="1" />
      {/* Viewfinder bump */}
      <rect x="60" y="20" width="45" height="20" rx="4" fill="#444" />
      {/* Lens mount */}
      <circle cx="85" cy="80" r="32" fill="#2a2a2a" stroke="#555" strokeWidth="1.5" />
      <circle cx="85" cy="80" r="24" fill="#1a1a1a" />
      <circle cx="85" cy="80" r="16" fill="#0f1520" />
      {/* Lens reflection */}
      <ellipse cx="80" cy="74" rx="8" ry="6" fill="#4a6741" opacity="0.15" />
      {/* Grip texture */}
      <rect x="140" y="42" width="18" height="75" rx="4" fill="#2e2e2e" />
      <line x1="145" y1="50" x2="145" y2="110" stroke="#444" strokeWidth="0.5" />
      <line x1="149" y1="50" x2="149" y2="110" stroke="#444" strokeWidth="0.5" />
      <line x1="153" y1="50" x2="153" y2="110" stroke="#444" strokeWidth="0.5" />
      {/* Shutter button */}
      <circle cx="130" cy="30" r="6" fill="#555" />
      <circle cx="130" cy="30" r="4" fill="#666" />
      {/* Mode dial */}
      <rect x="25" y="25" width="20" height="12" rx="3" fill="#555" />
    </svg>
  );
}

/* ── Laptop ── */
export function LaptopSVG({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Screen lid */}
      <rect x="25" y="10" width="170" height="110" rx="8" fill="#2a2a2a" />
      {/* Screen */}
      <rect x="32" y="17" width="156" height="96" rx="4" fill="#1a1f2e" />
      {/* Code lines */}
      <rect x="42" y="30" width="45" height="3" rx="1" fill="#6b8f62" opacity="0.8" />
      <rect x="42" y="38" width="70" height="3" rx="1" fill="#7a8fa0" opacity="0.6" />
      <rect x="52" y="46" width="55" height="3" rx="1" fill="#b8956a" opacity="0.7" />
      <rect x="52" y="54" width="40" height="3" rx="1" fill="#7a8fa0" opacity="0.5" />
      <rect x="52" y="62" width="65" height="3" rx="1" fill="#6b8f62" opacity="0.6" />
      <rect x="42" y="70" width="30" height="3" rx="1" fill="#b8956a" opacity="0.5" />
      <rect x="42" y="78" width="50" height="3" rx="1" fill="#7a8fa0" opacity="0.7" />
      <rect x="52" y="86" width="35" height="3" rx="1" fill="#6b8f62" opacity="0.4" />
      <rect x="42" y="94" width="60" height="3" rx="1" fill="#b8956a" opacity="0.6" />
      {/* Cursor */}
      <rect x="105" y="94" width="2" height="8" fill="#6b8f62" style={{ animation: "blink-cursor 1s ease-in-out infinite" }} />
      {/* Base */}
      <path d="M15 120 L25 120 L25 120 L195 120 L205 120 L215 140 C215 145, 212 148, 207 148 L13 148 C8 148, 5 145, 5 140 Z" fill="#3a3a3a" />
      <ellipse cx="110" cy="134" rx="20" ry="3" fill="#555" opacity="0.4" />
      {/* Hinge */}
      <rect x="25" y="118" width="170" height="4" rx="1" fill="#444" />
    </svg>
  );
}

/* ── Raspberry Pi ── */
export function RaspberryPiSVG({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 180 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* PCB Board */}
      <rect x="10" y="15" width="160" height="100" rx="6" fill="#1a6b3c" />
      {/* Board texture dots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={`dot-${i}`} cx={30 + (i % 4) * 35} cy={35 + Math.floor(i / 4) * 25} r="1" fill="#0d4d2a" />
      ))}
      {/* Mounting holes */}
      <circle cx="22" cy="27" r="4" fill="none" stroke="#c0c0c0" strokeWidth="1.5" />
      <circle cx="158" cy="27" r="4" fill="none" stroke="#c0c0c0" strokeWidth="1.5" />
      <circle cx="22" cy="103" r="4" fill="none" stroke="#c0c0c0" strokeWidth="1.5" />
      <circle cx="158" cy="103" r="4" fill="none" stroke="#c0c0c0" strokeWidth="1.5" />
      {/* CPU */}
      <rect x="70" y="45" width="35" height="35" rx="2" fill="#2a2a2a" />
      <rect x="73" y="48" width="29" height="29" rx="1" fill="#333" />
      {/* GPIO pins */}
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={`pin-${i}`} x={25 + i * 7} y="15" width="2" height="8" fill="#c0a030" />
      ))}
      {/* USB ports */}
      <rect x="145" y="35" width="25" height="14" rx="2" fill="#c0c0c0" />
      <rect x="145" y="55" width="25" height="14" rx="2" fill="#c0c0c0" />
      {/* Ethernet */}
      <rect x="145" y="78" width="25" height="18" rx="2" fill="#c0c0c0" />
      {/* Power LED */}
      <circle cx="35" cy="95" r="3" fill="#4caf50" className="led-glow" />
      {/* Status LED */}
      <circle cx="48" cy="95" r="3" fill="#f44336" opacity="0.3" />
      {/* SD card slot */}
      <rect x="10" y="80" width="8" height="20" rx="1" fill="#555" />
      {/* micro USB */}
      <rect x="55" y="107" width="16" height="8" rx="2" fill="#555" />
      {/* HDMI */}
      <rect x="85" y="107" width="20" height="8" rx="2" fill="#555" />
      {/* Raspberry Pi text */}
      <text x="75" y="92" fill="#45a049" fontSize="6" fontFamily="monospace" opacity="0.7">RPi</text>
    </svg>
  );
}

/* ── Stock Chart ── */
export function StockChartSVG({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect x="5" y="5" width="190" height="110" rx="10" fill="#faf9f6" stroke="#e0ddd5" strokeWidth="1" />
      {/* Grid lines */}
      {[30, 50, 70, 90].map((y) => (
        <line key={y} x1="25" y1={y} x2="185" y2={y} stroke="#e8e5dd" strokeWidth="0.5" />
      ))}
      {/* Chart line */}
      <polyline
        points="30,85 50,78 65,82 80,65 95,70 110,50 125,55 140,35 155,40 170,28 185,32"
        stroke="#4a6741"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="300"
        strokeDashoffset="300"
        style={{ animation: "draw-line 3s ease-out forwards" }}
      />
      {/* Area fill */}
      <path
        d="M30,85 L50,78 L65,82 L80,65 L95,70 L110,50 L125,55 L140,35 L155,40 L170,28 L185,32 L185,100 L30,100 Z"
        fill="url(#chart-area)"
        opacity="0.3"
      />
      {/* Y-axis labels */}
      <text x="12" y="33" fill="#6b6b6b" fontSize="6" fontFamily="monospace">$</text>
      <text x="12" y="93" fill="#6b6b6b" fontSize="6" fontFamily="monospace">0</text>
      {/* Current value dot */}
      <circle cx="185" cy="32" r="4" fill="#4a6741" />
      <circle cx="185" cy="32" r="6" fill="#4a6741" opacity="0.2" />
      <defs>
        <linearGradient id="chart-area" x1="100" y1="28" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4a6741" stopOpacity="0.4" />
          <stop offset="1" stopColor="#4a6741" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Desk Lamp ── */
export function DeskLampSVG({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Light cone */}
      <path d="M30 55 L70 25 L110 55 L105 60 L35 60 Z" fill="#fff8e7" opacity="0.15" />
      {/* Shade */}
      <path d="M35 55 L70 30 L105 55 Z" fill="#3a3a3a" stroke="#555" strokeWidth="1" />
      {/* Inner shade glow */}
      <path d="M45 55 L70 37 L95 55 Z" fill="#b8956a" opacity="0.15" />
      {/* Arm upper */}
      <line x1="70" y1="55" x2="55" y2="110" stroke="#555" strokeWidth="3" strokeLinecap="round" />
      {/* Joint */}
      <circle cx="55" cy="110" r="4" fill="#666" />
      {/* Arm lower */}
      <line x1="55" y1="110" x2="70" y2="165" stroke="#555" strokeWidth="3" strokeLinecap="round" />
      {/* Base */}
      <ellipse cx="70" cy="175" rx="35" ry="8" fill="#3a3a3a" />
      <ellipse cx="70" cy="173" rx="30" ry="6" fill="#444" />
      {/* Bulb hint */}
      <circle cx="70" cy="48" r="5" fill="#f5e6c8" opacity="0.5" />
    </svg>
  );
}

/* ── Field Notes Notebook ── */
export function FieldNotesSVG({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Notebook body */}
      <rect x="15" y="10" width="110" height="160" rx="4" fill="#b8956a" />
      <rect x="15" y="10" width="110" height="160" rx="4" stroke="#8a6d4a" strokeWidth="1" />
      {/* Cover texture lines */}
      <line x1="25" y1="10" x2="25" y2="170" stroke="#a07d55" strokeWidth="0.5" />
      {/* Elastic band */}
      <line x1="95" y1="10" x2="95" y2="170" stroke="#6b4c30" strokeWidth="1.5" />
      {/* Title area */}
      <rect x="30" y="35" width="70" height="30" rx="2" fill="#a07d55" opacity="0.4" />
      <text x="42" y="48" fill="#3a3a3a" fontSize="7" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">Jainil</text>
      <text x="40" y="58" fill="#3a3a3a" fontSize="7" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">Chauhan</text>
      {/* Page lines visible */}
      {[90, 100, 110, 120, 130, 140].map((y) => (
        <line key={y} x1="30" y1={y} x2="88" y2={y} stroke="#a07d55" strokeWidth="0.3" opacity="0.5" />
      ))}
      {/* Corner dog-ear */}
      <path d="M125 10 L125 25 L110 10 Z" fill="#a07d55" />
      {/* Pen shadow */}
      <line x1="100" y1="80" x2="120" y2="150" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}
