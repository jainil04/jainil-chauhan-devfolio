"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ContactFlyout from "./ContactFlyout";

export default function GlobalContact() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      {/* ── Fixed Contact Buttons ── */}
      <motion.div
        className="fixed bottom-6 right-6 z-30 flex items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {/* GitHub */}
        <a
          href="https://github.com/jainil04"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-xl transition-transform hover:scale-105 active:scale-95"
          style={{
            background: "var(--card)",
            boxShadow: "0 2px 8px rgba(44,44,44,0.06)",
          }}
          aria-label="GitHub"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--foreground)">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>

        {/* Say Hello */}
        <button
          onClick={() => setContactOpen(true)}
          className="px-8 py-3 rounded-xl text-base font-semibold cursor-pointer transition-transform hover:scale-105 active:scale-95"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            fontFamily: "var(--font-body)",
            boxShadow: "0 2px 12px rgba(74,103,65,0.15)",
          }}
        >
          Say Hello
        </button>
      </motion.div>

      {/* ── Contact Flyout ── */}
      <ContactFlyout open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
