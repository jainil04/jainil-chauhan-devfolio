"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";

const AUTOPSY_SYSTEM_PROMPT = `You are an expert prompt analyst. You will be given a user's original prompt and the AI's response to it.

Your job is to perform a "prompt autopsy" — analyze why the AI responded the way it did.

Return your analysis in exactly this structure:

1. **What drove this response** — which specific words or phrases in the prompt most influenced the output
2. **What was ignored** — parts of the prompt the AI didn't fully address or glossed over
3. **Hidden assumptions** — things the AI assumed that the user never actually said
4. **Prompt quality score** — rate the prompt 1–10 and explain why
5. **Rewritten prompt** — show a better version of the original prompt that would get a stronger response

Be direct, specific, and educational. Reference the actual words from the prompt and response.`;

async function callChat(prompt: string, systemPrompt?: string) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, systemPrompt }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Request failed");
  }

  const data = await res.json();
  return data.text as string;
}

export default function AIAutopsy() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [autopsy, setAutopsy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError("");
    setResponse("");
    setAutopsy("");

    try {
      // Call 1: Get Claude's normal response
      const aiResponse = await callChat(prompt);
      setResponse(aiResponse);

      // Call 2: Autopsy — Claude analyzes its own response
      const autopsyPrompt = `Original user prompt:\n"${prompt}"\n\nAI's response:\n"${aiResponse}"\n\nNow analyze this response.`;
      const aiAutopsy = await callChat(autopsyPrompt, AUTOPSY_SYSTEM_PROMPT);
      setAutopsy(aiAutopsy);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* ── Input ── */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div
          className="flex gap-3 rounded-xl p-2"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything..."
            maxLength={4000}
            className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-body)",
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="px-6 py-3 rounded-lg text-sm font-medium transition-opacity disabled:opacity-40"
            style={{
              background: "var(--accent)",
              color: "var(--accent-foreground)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.05em",
            }}
          >
            {isLoading ? "Thinking..." : "Send"}
          </button>
        </div>
      </form>

      {error && (
        <div
          className="mb-6 rounded-lg px-4 py-3 text-sm"
          style={{
            background: "color-mix(in oklch, var(--destructive) 15%, var(--card))",
            color: "var(--destructive)",
            border: "1px solid color-mix(in oklch, var(--destructive) 30%, transparent)",
          }}
        >
          {error}
        </div>
      )}

      {/* ── Panels ── */}
      {(response || isLoading) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Response Panel */}
          <Panel
            title="Response"
            subtitle="Claude's answer"
            content={response}
            isLoading={isLoading && !response}
          />

          {/* Autopsy Panel */}
          <Panel
            title="Autopsy"
            subtitle="Why it responded that way"
            content={autopsy}
            isLoading={isLoading && !autopsy}
          />
        </div>
      )}

      {/* ── Empty State ── */}
      {!response && !isLoading && (
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
            Type a prompt to begin
          </p>
          <p
            className="text-sm"
            style={{
              color: "var(--muted-foreground)",
              opacity: 0.6,
              fontFamily: "var(--font-body)",
            }}
          >
            See the answer and the autopsy side by side
          </p>
        </div>
      )}
    </motion.div>
  );
}

function Panel({
  title,
  subtitle,
  content,
  isLoading,
}: {
  title: string;
  subtitle: string;
  content: string;
  isLoading: boolean;
}) {
  return (
    <motion.div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        minHeight: "300px",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Panel header */}
      <div
        className="px-5 py-4 flex items-baseline gap-3"
        style={{
          borderBottom: "1px solid var(--border)",
        }}
      >
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{
            color: "var(--foreground)",
            fontFamily: "var(--font-body)",
            letterSpacing: "0.1em",
          }}
        >
          {title}
        </h3>
        <span
          className="text-xs"
          style={{
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {subtitle}
        </span>
      </div>

      {/* Panel body */}
      <div className="px-5 py-5 flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--accent)" }}
            />
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                background: "var(--accent)",
                animationDelay: "0.2s",
              }}
            />
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                background: "var(--accent)",
                animationDelay: "0.4s",
              }}
            />
          </div>
        ) : (
          <div
            className="prose prose-sm max-w-none text-sm leading-relaxed"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-body)",
            }}
          >
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}
