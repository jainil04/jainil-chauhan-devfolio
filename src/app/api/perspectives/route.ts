import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";
const MAX_CLAIM_LENGTH = 500;

const SYSTEM_PROMPT = `You are a perspective engine. Given a claim, you must produce exactly 5 genuinely different perspectives on it.

You have a pool of 10 personas to draw from. Pick the 5 most relevant and interesting for the given claim:

1. Libertarian Economist — markets, individual freedom, deregulation
2. Social Justice Activist — equity, systemic oppression, collective action
3. Tech Optimist — innovation solves problems, accelerationism, Silicon Valley mindset
4. Religious Conservative — traditional values, moral absolutes, community of faith
5. Environmental Scientist — data-driven ecology, sustainability, planetary boundaries
6. Military Strategist — national security, power dynamics, realpolitik
7. Anarchist Philosopher — question all authority, mutual aid, radical autonomy
8. Pragmatic Centrist — trade-offs, incrementalism, evidence over ideology
9. Global South Advocate — post-colonial lens, development justice, local knowledge
10. Gen-Z Digital Native — internet culture, mental health awareness, skepticism of institutions

For each chosen persona, respond with a JSON array of exactly 5 objects. Each object must have:
- "persona": the persona name (e.g. "Libertarian Economist")
- "stance": exactly one of "for", "against", or "nuanced"
- "argument": 2-3 sentences making their core case (in first person, in character)
- "counterpoint": 1-2 sentences acknowledging the strongest objection to their own view

Respond with ONLY the JSON array. No markdown, no code fences, no explanation before or after. Just the raw JSON array starting with [ and ending with ].`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  let body: { claim: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { claim } = body;

  if (!claim || typeof claim !== "string" || claim.trim().length === 0) {
    return NextResponse.json(
      { error: "Claim is required" },
      { status: 400 }
    );
  }

  if (claim.length > MAX_CLAIM_LENGTH) {
    return NextResponse.json(
      { error: `Claim must be under ${MAX_CLAIM_LENGTH} characters` },
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
        messages: [{ role: "user", content: `Claim: "${claim.trim()}"` }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: "Anthropic API error", details: err },
        { status: response.status }
      );
    }

    // Stream the SSE response from Anthropic back to the client as plain text chunks
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
            // Parse SSE events from Anthropic's streaming response
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const event = JSON.parse(data);
                // Extract text deltas from content_block_delta events
                if (
                  event.type === "content_block_delta" &&
                  event.delta?.type === "text_delta"
                ) {
                  controller.enqueue(encoder.encode(event.delta.text));
                }
              } catch {
                // Skip malformed SSE events
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
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to reach Anthropic API" },
      { status: 502 }
    );
  }
}
