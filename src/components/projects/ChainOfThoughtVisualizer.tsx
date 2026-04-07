"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  type Node,
  type Edge,
  type ReactFlowInstance,
} from "reactflow";
// @ts-ignore — CSS side-effect import; TypeScript doesn't need type info here
import "reactflow/dist/style.css";
import dagre from "@dagrejs/dagre";

// ── Types ─────────────────────────────────────────────────────────────────────

type StepType = "observation" | "deduction" | "conclusion";

interface Step {
  id: string;
  number: number;
  type: StepType;
  dependsOn: number[];
  text: string;
  visible: boolean;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const NODE_WIDTH = 220;
const NODE_HEIGHT = 80;

const TYPE_COLORS: Record<
  StepType,
  { bg: string; text: string; border: string; label: string }
> = {
  observation: {
    bg: "color-mix(in oklch, #3b82f6 12%, var(--card))",
    text: "#3b82f6",
    border: "color-mix(in oklch, #3b82f6 30%, transparent)",
    label: "OBSERVATION",
  },
  deduction: {
    bg: "color-mix(in oklch, #f59e0b 12%, var(--card))",
    text: "#f59e0b",
    border: "color-mix(in oklch, #f59e0b 30%, transparent)",
    label: "DEDUCTION",
  },
  conclusion: {
    bg: "color-mix(in oklch, #22c55e 12%, var(--card))",
    text: "#22c55e",
    border: "color-mix(in oklch, #22c55e 30%, transparent)",
    label: "CONCLUSION",
  },
};

const SAMPLE_PROBLEMS = [
  "If all Bloops are Razzles, and all Razzles are Lazzles, are all Bloops Lazzles?",
  "A bat and ball cost $1.10. The bat costs $1 more than the ball. How much does the ball cost?",
  "What comes next in the sequence: 2, 6, 12, 20, 30?",
  "If it takes 5 machines 5 minutes to make 5 widgets, how long for 100 machines to make 100 widgets?",
];

// ── Parser ────────────────────────────────────────────────────────────────────

function parseStep(line: string): Omit<Step, "visible"> | null {
  const stepMatch = line.match(/\[STEP (\d+)\]/);
  const typeMatch = line.match(
    /\[TYPE:\s*(observation|deduction|conclusion)\]/i
  );
  const depsMatch = line.match(/\[DEPENDS_ON:\s*([^\]]+)\]/);

  if (!stepMatch || !typeMatch) return null;

  const number = parseInt(stepMatch[1], 10);
  const type = typeMatch[1].toLowerCase() as StepType;

  const dependsOn: number[] = depsMatch
    ? depsMatch[1]
        .split(",")
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n) && n > 0)
    : [];

  const text = line
    .replace(/\[STEP \d+\]/g, "")
    .replace(/\[TYPE:[^\]]+\]/gi, "")
    .replace(/\[DEPENDS_ON:[^\]]*\]/gi, "")
    .trim();

  if (!text) return null;

  return { id: String(number), number, type, dependsOn, text };
}

function parseFinalAnswer(line: string): string | null {
  const match = line.match(/\[FINAL ANSWER\]\s*(.+)/i);
  return match ? match[1].trim() : null;
}

// ── Dagre Layout ──────────────────────────────────────────────────────────────

function getLayoutedElements(nodes: Node[], edges: Edge[]) {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB", ranksep: 60, nodesep: 40 });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  });
  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const pos = g.node(node.id);
      return {
        ...node,
        position: {
          x: pos.x - NODE_WIDTH / 2,
          y: pos.y - NODE_HEIGHT / 2,
        },
      };
    }),
    edges,
  };
}

// ── Graph Panel ───────────────────────────────────────────────────────────────

function GraphPanel({ steps }: { steps: Step[] }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const rfInstance = useRef<ReactFlowInstance | null>(null);

  useEffect(() => {
    if (steps.length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const rawNodes: Node[] = steps.map((step) => {
      const colors = TYPE_COLORS[step.type];
      const truncated =
        step.text.length > 60 ? step.text.slice(0, 57) + "…" : step.text;
      return {
        id: step.id,
        type: "default",
        data: {
          label: (
            <div style={{ fontFamily: "var(--font-body)", fontSize: "11px" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.08em",
                  color: colors.text,
                  marginBottom: "3px",
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                }}
              >
                <span>#{step.number}</span>
                <span style={{ opacity: 0.7 }}>{colors.label}</span>
              </div>
              <div style={{ color: "var(--foreground)", lineHeight: "1.4" }}>
                {truncated}
              </div>
            </div>
          ),
        },
        position: { x: 0, y: 0 },
        style: {
          background: colors.bg,
          border: `1px solid ${colors.border}`,
          borderRadius: "10px",
          padding: "10px 12px",
          width: NODE_WIDTH,
          boxShadow: "none",
          fontSize: "11px",
        },
      };
    });

    const rawEdges: Edge[] = [];
    steps.forEach((step) => {
      step.dependsOn.forEach((depNum) => {
        rawEdges.push({
          id: `e${depNum}-${step.number}`,
          source: String(depNum),
          target: step.id,
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "var(--muted-foreground)",
          },
          style: { stroke: "var(--muted-foreground)", strokeWidth: 1.5 },
        });
      });
    });

    const { nodes: layouted, edges: layoutedEdges } = getLayoutedElements(
      rawNodes,
      rawEdges
    );
    setNodes(layouted);
    setEdges(layoutedEdges);

    setTimeout(() => {
      rfInstance.current?.fitView({ padding: 0.15, duration: 300 });
    }, 50);
  }, [steps, setNodes, setEdges]);

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        minHeight: "420px",
      }}
    >
      <div
        className="px-5 py-4 flex items-baseline gap-3"
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
          Reasoning Graph
        </h3>
        <span
          className="text-xs"
          style={{
            color: "var(--muted-foreground)",
            fontFamily: "var(--font-mono)",
          }}
        >
          dependency DAG
        </span>
      </div>
      <div style={{ flex: 1, minHeight: "380px" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onInit={(instance) => {
            rfInstance.current = instance;
          }}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.2}
          attributionPosition="bottom-right"
          style={{ background: "transparent" }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <Background color="var(--border)" gap={20} size={1} />
          <Controls
            showInteractive={false}
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ChainOfThoughtVisualizer() {
  const [problem, setProblem] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [finalAnswer, setFinalAnswer] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!problem.trim() || isStreaming) return;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsStreaming(true);
      setError(null);
      setSteps([]);
      setFinalAnswer("");

      try {
        const res = await fetch("/api/chain-of-thought-visualizer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ problem: problem.trim() }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(
            (err as { error?: string }).error || "Request failed"
          );
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            const finalAns = parseFinalAnswer(trimmed);
            if (finalAns) {
              setFinalAnswer(finalAns);
              continue;
            }

            const parsed = parseStep(trimmed);
            if (parsed) {
              setSteps((prev) => {
                if (prev.some((s) => s.id === parsed.id)) return prev;
                return [...prev, { ...parsed, visible: true }];
              });
            }
          }
        }

        // flush remaining buffer
        if (buffer.trim()) {
          const finalAns = parseFinalAnswer(buffer.trim());
          if (finalAns) {
            setFinalAnswer(finalAns);
          } else {
            const parsed = parseStep(buffer.trim());
            if (parsed) {
              setSteps((prev) => {
                if (prev.some((s) => s.id === parsed.id)) return prev;
                return [...prev, { ...parsed, visible: true }];
              });
            }
          }
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsStreaming(false);
      }
    },
    [problem, isStreaming]
  );

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const hasContent = steps.length > 0 || isStreaming;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* ── Input ── */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div
          className="rounded-xl p-2"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Enter a problem to reason through…"
            maxLength={2000}
            rows={3}
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
              {problem.length}/2000
            </span>
            <button
              type="submit"
              disabled={isStreaming || !problem.trim()}
              className="px-6 py-2.5 rounded-lg text-sm font-medium transition-opacity disabled:opacity-40"
              style={{
                background: "var(--accent)",
                color: "var(--accent-foreground)",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.05em",
              }}
            >
              {isStreaming ? "Reasoning…" : "Visualize"}
            </button>
          </div>
        </div>
      </form>

      {/* ── Sample Problems ── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {SAMPLE_PROBLEMS.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setProblem(p)}
            disabled={isStreaming}
            className="text-xs px-3 py-1.5 rounded-full transition-opacity hover:opacity-70 disabled:opacity-30"
            style={{
              background: "var(--card)",
              color: "var(--muted-foreground)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-body)",
              cursor: "pointer",
            }}
          >
            {p.length > 52 ? p.slice(0, 49) + "…" : p}
          </button>
        ))}
      </div>

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

      {/* ── Two-panel Visualization ── */}
      {hasContent && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Animated step list */}
          <div
            className="rounded-xl overflow-hidden flex flex-col"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              minHeight: "420px",
            }}
          >
            {/* Panel header */}
            <div
              className="px-5 py-4 flex items-center gap-3"
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
                Reasoning Steps
              </h3>
              {isStreaming && (
                <div className="flex items-center gap-1.5 ml-auto">
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{
                        background: "var(--accent)",
                        animationDelay: `${delay}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Steps */}
            <div className="px-5 py-5 flex-1 overflow-auto space-y-3">
              <AnimatePresence initial={false}>
                {steps.map((step) => {
                  const colors = TYPE_COLORS[step.type];
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="rounded-lg px-4 py-3"
                      style={{
                        background: colors.bg,
                        border: `1px solid ${colors.border}`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span
                          className="text-xs font-semibold"
                          style={{
                            color: colors.text,
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.05em",
                          }}
                        >
                          #{step.number}
                        </span>
                        <span
                          className="text-xs uppercase tracking-wider"
                          style={{
                            color: colors.text,
                            fontFamily: "var(--font-mono)",
                            letterSpacing: "0.1em",
                            opacity: 0.8,
                          }}
                        >
                          {colors.label}
                        </span>
                        {step.dependsOn.length > 0 && (
                          <span
                            className="text-xs ml-auto"
                            style={{
                              color: "var(--muted-foreground)",
                              fontFamily: "var(--font-mono)",
                              opacity: 0.55,
                            }}
                          >
                            ← {step.dependsOn.map((d) => `#${d}`).join(", ")}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          color: "var(--foreground)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {step.text}
                      </p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {isStreaming && steps.length === 0 && (
                <p
                  className="text-sm"
                  style={{
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Waiting for first step…
                </p>
              )}
            </div>
          </div>

          {/* Right: React Flow graph */}
          <GraphPanel steps={steps} />
        </div>
      )}

      {/* ── Final Answer ── */}
      {finalAnswer && !isStreaming && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 rounded-xl px-6 py-5"
          style={{
            background: "color-mix(in oklch, var(--accent) 12%, var(--card))",
            border:
              "1px solid color-mix(in oklch, var(--accent) 35%, transparent)",
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{
              color: "var(--accent-foreground)",
              fontFamily: "var(--font-mono)",
              opacity: 0.7,
            }}
          >
            Final Answer
          </p>
          <p
            className="text-base leading-relaxed"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-body)",
            }}
          >
            {finalAnswer}
          </p>
        </motion.div>
      )}

      {/* ── Empty State ── */}
      {!hasContent && !error && (
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
            Enter a problem to begin
          </p>
          <p
            className="text-sm"
            style={{
              color: "var(--muted-foreground)",
              opacity: 0.6,
              fontFamily: "var(--font-body)",
            }}
          >
            Watch Claude reason step by step — rendered as a live dependency
            graph
          </p>
        </div>
      )}
    </motion.div>
  );
}
