"use client";

import React, { useEffect, useRef, useState } from "react";

const FORMATS = [
  { label: "PDF", hint: "Best for viewing & printing", href: "/resume/Jainil_Chauhan_Resume.pdf" },
  { label: "Word (.docx)", hint: "Editable", href: "/resume/Jainil_Chauhan_Resume.docx" },
  { label: "Pages (.pages)", hint: "For Apple Pages", href: "/resume/Jainil_Chauhan_Resume.pages" },
];

export default function ResumeDownload() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
        style={{
          background: "var(--accent)",
          color: "var(--accent-foreground)",
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.05em",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
        Download Resume
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transform: open ? "rotate(180deg)" : undefined, transition: "transform 0.2s" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 mt-2 w-64 rounded-xl overflow-hidden z-50"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
          }}
        >
          {FORMATS.map((f, i) => (
            <a
              key={f.label}
              role="menuitem"
              href={f.href}
              download
              onClick={() => setOpen(false)}
              className="block px-4 py-3 transition-colors hover:bg-black/5"
              style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}
            >
              <span className="block text-sm" style={{ color: "var(--foreground)", fontWeight: 600 }}>
                {f.label}
              </span>
              <span className="block text-xs" style={{ color: "var(--muted-foreground)" }}>
                {f.hint}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
