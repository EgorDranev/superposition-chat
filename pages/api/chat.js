import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(500).json({ error: { message: "Missing ANTHROPIC_API_KEY" } });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
        "x-api-key": key,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    // ── Log conversation to KV ──────────────────────────────────────────────
    if (data.content?.[0]?.text) {
      try {
        const { messages, system } = req.body;
        const convId = req.headers["x-conv-id"] || `conv_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;
        const now    = Date.now();

        // Build full thread: all user messages + this assistant reply
        const thread = [
          ...(messages || []),
          { role: "assistant", content: data.content[0].text },
        ];

        const record = {
          id:           convId,
          startedAt:    messages?.length <= 1 ? now : undefined, // only set on first message
          lastActivity: now,
          messages:     thread,
          ua:           req.headers["user-agent"]?.slice(0, 80) || "",
        };

        // Store / merge with existing record
        const existing = await kv.get(convId);
        const merged = {
          ...record,
          startedAt: existing?.startedAt || now,
          messages:  thread,
        };

        await kv.set(convId, merged, { ex: 60 * 60 * 24 * 30 }); // 30-day TTL

        // Keep a sorted index of conversation IDs by timestamp
        await kv.zadd("conv:index", { score: now, member: convId });

        res.setHeader("x-conv-id", convId);
      } catch (kvErr) {
        console.warn("KV logging failed:", kvErr.message);
        // Don't block the chat response if logging fails
      }
    }

    return res.status(response.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: { message: e.message } });
  }
}
