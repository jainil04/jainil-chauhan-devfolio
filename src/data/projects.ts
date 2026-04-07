import { Project } from "@/types/types";

export const PROJECTS: Project[] = [
  {
    slug: "ai-autopsy",
    title: "AI Autopsy",
    description:
      "Type any prompt, get an AI response, and immediately see a second AI analysis that dissects why the AI responded that way. Two API calls, two panels, one powerful learning experience.",
    coverImage: "",
    category: "AI",
    tags: ["React", "Claude API", "Learning Tool"],
    techStack: ["React", "Next.js", "Anthropic Claude API", "TypeScript"],
    githubUrl: "https://github.com/jainil04",
  },
  {
    slug: "prism",
    title: "Prism",
    description:
      "Paste any claim and watch five AI personas — each with a genuinely different worldview — debate it in real time. A single Claude call, streamed as progressive JSON, produces structured opposing perspectives.",
    coverImage: "",
    category: "AI",
    tags: ["React", "Claude API", "Streaming", "Perspectives"],
    techStack: [
      "React",
      "Next.js",
      "Anthropic Claude API",
      "TypeScript",
      "Streaming JSON",
    ],
    githubUrl: "https://github.com/jainil04",
  },
  {
    slug: "chain-of-thought-visualizer",
    title: "Chain-of-Thought Visualizer",
    description:
      "Type any problem and watch Claude reason through it step by step — in real time. Each step streams in as a node in a live DAG, color-coded by reasoning type, with dependency edges drawn automatically as the model thinks.",
    coverImage: "",
    category: "AI",
    tags: ["React Flow", "Claude API", "Streaming", "DAG", "Reasoning"],
    techStack: [
      "React",
      "Next.js",
      "Anthropic Claude API",
      "TypeScript",
      "React Flow",
      "Dagre",
      "Streaming SSE",
    ],
    githubUrl: "https://github.com/jainil04",
  },
];
