"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactFlyout({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
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

          {/* Flyout Panel from Right */}
          <motion.div
            className="fixed top-0 right-0 z-50 h-full overflow-y-auto"
            style={{
              width: "20%",
              minWidth: "320px",
              background: "var(--background)",
              boxShadow: "-4px 0 40px rgba(0,0,0,0.12)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 h-full flex flex-col">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer"
                style={{ background: "rgba(44,44,44,0.06)" }}
                aria-label="Close"
              >
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1L13 13M13 1L1 13"
                    stroke="#6b6b6b"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="flex-1 pt-16">
                {/* Accent bar */}
                <div
                  className="w-10 h-1 rounded-full mb-6"
                  style={{ background: "var(--primary)" }}
                />

                <h2
                  className="text-2xl mb-2"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--foreground)",
                  }}
                >
                  Say Hello
                </h2>
                <p
                  className="text-sm mb-8"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Drop me a message and I&apos;ll get back to you.
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ background: "var(--primary)" }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M4 10L8 14L16 6"
                          stroke="var(--primary-foreground)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p
                      className="text-lg"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--foreground)",
                      }}
                    >
                      Message sent!
                    </p>
                    <p
                      className="text-sm mt-1"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      Thanks for reaching out.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs uppercase tracking-wider mb-1.5"
                        style={{
                          color: "var(--muted-foreground)",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.15em",
                        }}
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-shadow"
                        style={{
                          background: "rgba(44,44,44,0.04)",
                          border: "1px solid var(--border)",
                          color: "var(--foreground)",
                          fontFamily: "var(--font-body)",
                        }}
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs uppercase tracking-wider mb-1.5"
                        style={{
                          color: "var(--muted-foreground)",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.15em",
                        }}
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-shadow"
                        style={{
                          background: "rgba(44,44,44,0.04)",
                          border: "1px solid var(--border)",
                          color: "var(--foreground)",
                          fontFamily: "var(--font-body)",
                        }}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs uppercase tracking-wider mb-1.5"
                        style={{
                          color: "var(--muted-foreground)",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.15em",
                        }}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none transition-shadow"
                        style={{
                          background: "rgba(44,44,44,0.04)",
                          border: "1px solid var(--border)",
                          color: "var(--foreground)",
                          fontFamily: "var(--font-body)",
                        }}
                        placeholder="What's on your mind?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: "var(--primary)",
                        color: "var(--primary-foreground)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
