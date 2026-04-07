"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { type Project } from "@/types/types";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        className="group cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {/* Image container */}
        <div
          className="relative w-full aspect-4/3 rounded-lg overflow-hidden mb-5"
          style={{
            background: "var(--card)",
            boxShadow: "0 2px 20px rgba(44,44,44,0.06)",
          }}
        >
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{
                background:
                  "linear-gradient(135deg, var(--card) 0%, color-mix(in oklch, var(--accent) 20%, var(--card)) 100%)",
              }}
            >
              <span
                className="text-4xl opacity-30"
                style={{ color: "var(--foreground)" }}
              >
                &#123; &#125;
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h2
          className="text-sm md:text-base font-semibold uppercase tracking-wider"
          style={{
            color: "var(--foreground)",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.12em",
          }}
        >
          {project.title}
        </h2>
      </motion.div>
    </Link>
  );
}
