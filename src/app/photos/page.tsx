"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PHOTO_FOLDERS, type PhotoFolder } from "@/data/photoFolders";
import FolderCard from "@/components/FolderCard";
import FolderFlyout from "@/components/FolderFlyout";

/* ───────────────────── Page Component ───────────────────── */

export default function PhotosPage() {
  const [openFolder, setOpenFolder] = useState<PhotoFolder | null>(null);

  return (
    <div
      className="noise-overlay min-h-screen"
      style={{ background: "var(--background)" }}
    >
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: "color-mix(in oklch, var(--background) 85%, transparent)" }}>
        <div className="mx-auto py-5 flex items-center justify-between" style={{ paddingLeft: "3.13rem", paddingRight: "3.13rem" }}>
          <Link
            href="/"
            className="text-sm flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.05em",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <h1
            className="text-base md:text-lg"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--foreground)",
            }}
          >
            Jainil&rsquo;s Photography
          </h1>

          <div className="w-16" /> {/* spacer for centering */}
        </div>
      </header>

      {/* ── Hero ── */}
      <motion.section
        className="mx-auto"
        style={{ paddingTop: "5.63rem", paddingBottom: "3.13rem", paddingLeft: "3.13rem", paddingRight: "3.13rem" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        <h2
          className="text-3xl md:text-5xl mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--foreground)",
          }}
        >
          Visual Journal
        </h2>
        <p
          className="text-base md:text-lg max-w-xl"
          style={{
            color: "var(--muted-foreground)",
            lineHeight: "1.75",
          }}
        >
          A collection of places, moments, and compositions — captured through
          Canon RP. Click a folder to explore.
        </p>
      </motion.section>

      {/* ── Grid ── */}
      <section className="mx-auto" style={{ paddingBottom: "3.13rem", paddingLeft: "3.13rem", paddingRight: "3.13rem" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 md:gap-y-20">
          {PHOTO_FOLDERS.map((folder, i) => (
            <FolderCard key={folder.id} folder={folder} index={i} onOpen={setOpenFolder} />
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="pb-8 text-center">
        <p
          className="text-xs"
          style={{
            color: "var(--muted-foreground)",
            opacity: 0.4,
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
          }}
        >
          all photos shot by Jainil
        </p>
      </footer>

      {/* ── Folder Flyout ── */}
      <FolderFlyout folder={openFolder} onClose={() => setOpenFolder(null)} />
    </div>
  );
}
