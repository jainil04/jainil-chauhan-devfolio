"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { type PhotoFolder } from "@/data/photoFolders";

export default function FolderCard({ folder, index, onOpen }: { folder: PhotoFolder; index: number; onOpen: (folder: PhotoFolder) => void }) {
  return (
    <motion.div
      className="group cursor-pointer"
      onClick={() => onOpen(folder)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      {/* Image */}
      <div
        className="relative w-full aspect-4/3 rounded-lg overflow-hidden mb-5"
        style={{
          background: "var(--card)",
          boxShadow: "0 2px 20px rgba(44,44,44,0.06)",
        }}
      >
        <Image
          src={folder.coverImage}
          alt={folder.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Title */}
      <h2
        className="text-sm md:text-base font-semibold uppercase tracking-wider mb-3"
        style={{
          color: "var(--foreground)",
          fontFamily: "var(--font-body)",
          letterSpacing: "0.12em",
        }}
      >
        {folder.title}
      </h2>

      {/* Description */}
      <p
        className="text-sm md:text-base leading-relaxed mb-4"
        style={{
          color: "var(--muted-foreground)",
          fontFamily: "var(--font-body)",
          maxWidth: "420px",
        }}
      >
        {folder.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {folder.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs uppercase tracking-wider px-3 py-1 rounded-full"
            style={{
              background: "var(--card)",
              color: "var(--foreground)",
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              border: "1px solid var(--border)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
