"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Perspective {
  persona: string;
  stance: "for" | "against" | "nuanced";
  argument: string;
  counterpoint: string;
}

const STANCE_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  for: {
    bg: "color-mix(in oklch, #22c55e 15%, var(--card))",
    text: "#22c55e",
    label: "FOR",
  },
  against: {
    bg: "color-mix(in oklch, #ef4444 15%, var(--card))",
    text: "#ef4444",
    label: "AGAINST",
  },
  nuanced: {
    bg: "color-mix(in oklch, #eab308 15%, var(--card))",
    text: "#eab308",
    label: "NUANCED",
  },
};

/**
 * Attempts to extract complete JSON objects from a partial buffer.
 * Watches for },{ or }] patterns to detect completed perspective objects.
 */
function extractPerspectives(buffer: string): {
  perspectives: Perspective[];
  complete: boolean;
} {
  const trimmed = buffer.trim();

  // Try parsing the full buffer as complete JSON
  try {
    const parsed = JSON.parse(trimmed);
    if (Array.isArray(parsed)) {
      return { perspectives: parsed, complete: true };
    }
  } catch {
    // Not complete yet — try incremental extraction
  }

  // Try closing the array to parse partial results
  let working = trimmed;
  if (working.startsWith("[")) {
    // Remove trailing comma if present
    working = working.replace(/,\s*$/, "");
    // Try closing the array
    if (!working.endsWith("]")) {
      working += "]";
    }
    try {
      const parsed = JSON.parse(working);
      if (Array.isArray(parsed)) {
        return { perspectives: parsed, complete: false };
      }
    } catch {
      // Still not parseable — try more aggressive recovery
    }
  }

  // Try to find individual complete objects using regex
  const perspectives: Perspective[] = [];
  const objectRegex = /\{[^{}]*"persona"\s*:\s*"[^"]*"[^{}]*"counterpoint"\s*:\s*"[^"]*"[^{}]*\}/g;
  let match;
  while ((match = objectRegex.exec(buffer)) !== null) {
    try {
      const obj = JSON.parse(match[0]);
      if (obj.persona && obj.stance && obj.argument && obj.counterpoint) {
        perspectives.push(obj);
      }
    } catch {
      // Skip malformed objects
    }
  }

  return { perspectives, complete: false };
}

export default function Prism() {
  const [claim, setClaim] = useState("");
  const [perspectives, setPerspectives] = useState<Perspective[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!claim.trim() || isStreaming) return;

      // Abort any in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsStreaming(true);
      setIsComplete(false);
      setError("");
      setPerspectives([]);

      try {
        const res = await fetch("/api/perspectives", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ claim: claim.trim() }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || "Request failed");
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const { perspectives: parsed, complete } =
            extractPerspectives(buffer);
          if (parsed.length > 0) {
            setPerspectives(parsed);
          }
          if (complete) break;
        }

        // Final parse of the complete buffer
        const { perspectives: final } = extractPerspectives(buffer);
        if (final.length > 0) {
          setPerspectives(final);
        }
        setIsComplete(true);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsStreaming(false);
      }
    },
    [claim, isStreaming]
  );

  // Clean up on unmount
  React.useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const showCards = perspectives.length > 0 || isStreaming;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* ── Input ── */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div
          className="rounded-xl p-2"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <textarea
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            placeholder="Enter a claim to analyze — e.g. &quot;Social media is bad for democracy&quot;"
            maxLength={500}
            rows={2}
            className="w-full bg-transparent px-4 py-3 text-sm outline-none resize-none"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-body)",
            }}
          />
          <div className="flex items-center justify-between px-2 pb-1">
            <span
              className="text-xs"
              style={{
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-mono)",
                opacity: 0.5,
              }}
            >
              {claim.length}/500
            </span>
            <button
              type="submit"
              disabled={isStreaming || !claim.trim()}
              className="px-6 py-2.5 rounded-lg text-sm font-medium transition-opacity disabled:opacity-40"
              style={{
                background: "var(--accent)",
                color: "var(--accent-foreground)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
              }}
            >
              {isStreaming ? "Streaming..." : "Analyze"}
            </button>
          </div>
        </div>
      </form>

      {/* ── Error ── */}
      {error && (
        <div
          className="mb-6 rounded-lg px-4 py-3 text-sm"
          style={{
            background:
              "color-mix(in oklch, var(--destructive) 15%, var(--card))",
            color: "var(--destructive)",
            border:
              "1px solid color-mix(in oklch, var(--destructive) 30%, transparent)",
          }}
        >
          {error}
        </div>
      )}

      {/* ── Perspective Cards ── */}
      {showCards && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {perspectives.map((p, i) => (
              <PerspectiveCard key={p.persona} perspective={p} index={i} />
            ))}
          </AnimatePresence>

          {/* Skeleton placeholders for cards not yet streamed */}
          {isStreaming &&
            Array.from({ length: 5 - perspectives.length }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
        </div>
      )}

      {/* ── Complete indicator ── */}
      {isComplete && perspectives.length > 0 && (
        <motion.p
          className="text-center mt-6 text-xs uppercase tracking-wider"
          style={{
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.3 }}
        >
          {perspectives.length} perspectives generated
        </motion.p>
      )}

      {/* ── Empty State ── */}
      {!showCards && !error && (
        <div
          className="text-center py-20 rounded-xl"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-lg mb-2"
            style={{
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Enter a claim to see five perspectives
          </p>
          <p
            className="text-sm"
            style={{
              color: "var(--muted-foreground)",
              opacity: 0.6,
              fontFamily: "var(--font-body)",
            }}
          >
            Each persona argues from a genuinely different worldview
          </p>
        </div>
      )}
    </motion.div>
  );
}

/* ── Perspective Card ── */
function PerspectiveCard({
  perspective,
  index,
}: {
  perspective: Perspective;
  index: number;
}) {
  const stance = STANCE_COLORS[perspective.stance] || STANCE_COLORS.nuanced;

  return (
    <motion.div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
      }}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
      layout
    >
      {/* Card header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{
            color: "var(--foreground)",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.1em",
          }}
        >
          {perspective.persona}
        </h3>
        <span
          className="text-[0.6rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
          style={{
            background: stance.bg,
            color: stance.text,
            fontFamily: "var(--font-mono)",
          }}
        >
          {stance.label}
        </span>
      </div>

      {/* Card body */}
      <div className="px-5 py-4 flex-1 flex flex-col gap-4">
        <p
          className="text-sm leading-relaxed"
          style={{
            color: "var(--foreground)",
            fontFamily: "var(--font-body)",
          }}
        >
          {perspective.argument}
        </p>

        {/* Counterpoint */}
        <div
          className="rounded-lg px-4 py-3"
          style={{
            background:
              "color-mix(in oklch, var(--muted-foreground) 8%, var(--card))",
            borderLeft: `3px solid ${stance.text}`,
          }}
        >
          <p
            className="text-[0.65rem] uppercase tracking-wider mb-1.5 font-semibold"
            style={{
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
            }}
          >
            Strongest objection
          </p>
          <p
            className="text-xs leading-relaxed"
            style={{
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-body)",
            }}
          >
            {perspective.counterpoint}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Skeleton Card ── */
function SkeletonCard() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        minHeight: "220px",
      }}
    >
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="h-3 w-32 rounded animate-pulse"
          style={{ background: "var(--border)" }}
        />
        <div
          className="h-5 w-16 rounded-full animate-pulse"
          style={{ background: "var(--border)" }}
        />
      </div>
      <div className="px-5 py-4 space-y-3">
        <div
          className="h-2.5 w-full rounded animate-pulse"
          style={{ background: "var(--border)" }}
        />
        <div
          className="h-2.5 w-5/6 rounded animate-pulse"
          style={{ background: "var(--border)" }}
        />
        <div
          className="h-2.5 w-4/6 rounded animate-pulse"
          style={{ background: "var(--border)" }}
        />
        <div className="mt-4">
          <div
            className="h-16 w-full rounded-lg animate-pulse"
            style={{ background: "var(--border)", opacity: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}
