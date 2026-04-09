import { kv } from "@vercel/kv";

const DASH_PASS = process.env.DASHBOARD_PASSWORD || "superposition2025";

export default async function handler(req, res) {
  // Simple password auth via query param or header
  const pass = req.query.pass || req.headers["x-dashboard-pass"];
  if (pass !== DASH_PASS) return res.status(401).json({ error: "Unauthorized" });

  try {
    const limit  = Math.min(parseInt(req.query.limit || "50"), 100);
    const offset = parseInt(req.query.offset || "0");

    // Get IDs sorted by recency (highest score = most recent)
    const ids = await kv.zrange("conv:index", offset, offset + limit - 1, { rev: true });

    if (!ids || ids.length === 0) return res.json({ conversations: [], total: 0 });

    const total = await kv.zcard("conv:index");
    const conversations = await Promise.all(ids.map(id => kv.get(id)));

    return res.json({
      conversations: conversations.filter(Boolean),
      total,
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
