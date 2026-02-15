"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type PhotoFolder } from "@/data/photoFolders";

export default function FolderFlyout({ folder, onClose }: { folder: PhotoFolder | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {folder && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.4)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 overflow-y-auto rounded-t-2xl"
            style={{
              height: "93vh",
              background: "var(--background)",
              boxShadow: "0 -4px 40px rgba(0,0,0,0.12)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Close button — bottom right */}
            <button
              onClick={onClose}
              className="fixed bottom-6 right-6 z-60 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-transform hover:scale-110 active:scale-95"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              }}
              aria-label="Close"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
