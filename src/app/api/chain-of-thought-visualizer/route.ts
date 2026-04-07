import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";
const MAX_PROBLEM_LENGTH = 2000;

const SYSTEM_PROMPT = `You are a step-by-step reasoning engine. When given a problem, reason through it in clearly separated steps.

Format EVERY step exactly like this — one step per line, no exceptions:
[STEP N] [TYPE: observation|deduction|conclusion] [DEPENDS_ON: X,Y] Your reasoning text here.

Rules:
- N starts at 1 and increments by 1
- TYPE must be exactly one of: observation, deduction, conclusion
- DEPENDS_ON lists comma-separated step numbers this step builds on. Use 0 if it depends on nothing (first observations).
- reasoning text is a single sentence or short phrase — no line breaks within a step
- After all steps, output exactly: [FINAL ANSWER] Your answer here.

Example output for "Is the sky blue?":
[STEP 1] [TYPE: observation] [DEPENDS_ON: 0] The sky appears blue to human eyes during daytime.
[STEP 2] [TYPE: observation] [DEPENDS_ON: 0] This is caused by Rayleigh scattering of sunlight.
[STEP 3] [TYPE: deduction] [DEPENDS_ON: 1,2] Short blue wavelengths scatter more than red ones, making the sky look blue.
[STEP 4] [TYPE: conclusion] [DEPENDS_ON: 3] Yes, the sky is blue, caused by the physics of light scattering.
[FINAL ANSWER] Yes, the sky is blue due to Rayleigh scattering of sunlight.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.CHAIN_OF_THOUGHT_VISUALIZER;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  let body: { problem: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { problem } = body;

  if (!problem || typeof problem !== "string" || problem.trim().length === 0) {
    return NextResponse.json(
      { error: "Problem is required" },
      { status: 400 }
    );
  }

  if (problem.length > MAX_PROBLEM_LENGTH) {
    return NextResponse.json(
      { error: `Problem must be under ${MAX_PROBLEM_LENGTH} characters` },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2048,
        stream: true,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: problem.trim() }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: "Anthropic API error", details: err },
        { status: response.status }
      );
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const event = JSON.parse(data);
                if (
                  event.type === "content_block_delta" &&
                  event.delta?.type === "text_delta"
                ) {
                  controller.enqueue(encoder.encode(event.delta.text));
                }
              } catch {
                // skip malformed SSE events
              }
            }
          }
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach Anthropic API" },
      { status: 502 }
    );
  }
}
