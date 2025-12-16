import { supabaseAdmin } from "../../../lib/supabaseServer";

function parseMoneyToCents(v) {
  const n = Number(String(v || "").replace(/[^\d.]/g, ""));
  if (!isFinite(n) || n <= 0) return null;
  return Math.round(n * 100);
}

export default async function handler(req, res) {
  try {
    const supa = supabaseAdmin();

    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!token) return res.status(401).json({ error: "unauthorized" });

    const u = await supa.auth.getUser(token);
    if (u.error || !u.data?.user) return res.status(401).json({ error: "unauthorized" });
    const userId = u.data.user.id;

    if (req.method !== "POST") return res.status(405).json({ error: "method" });

    const request_id = String(req.body?.request_id || "").trim();
    const amount_cents = parseMoneyToCents(req.body?.amount);
    const is_final = !!req.body?.is_final;
    const currency = "AED";

    if (!request_id) return res.status(400).json({ error: "request" });
    if (!amount_cents) return res.status(400).json({ error: "amount" });

    const { data: r, error: re } = await supa.from("requests").select("*").eq("id", request_id).maybeSingle();
    if (re) return res.status(500).json({ error: "db" });
    if (!r) return res.status(404).json({ error: "not_found" });

    const participant = r.student_id === userId || r.creator_id === userId;
    if (!participant) return res.status(403).json({ error: "forbidden" });

    const { data: o, error: oe } = await supa
      .from("offers")
      .insert({ request_id, actor_id: userId, amount_cents, currency, is_final })
      .select("*")
      .single();

    if (oe) return res.status(500).json({ error: "db_offer" });

    const nextStatus = is_final ? "agreed" : "negotiating";
    const { error: ue } = await supa.from("requests").update({ status: nextStatus }).eq("id", request_id);
    if (ue) return res.status(500).json({ error: "db_request_update" });

    if (is_final) {
      const { data: order, error: orE } = await supa
        .from("orders")
        .insert({
          request_id,
          student_id: r.student_id,
          creator_id: r.creator_id,
          agreed_amount_cents: amount_cents,
          currency,
          status: "active"
        })
        .select("*")
        .single();

      if (orE) return res.status(500).json({ error: "db_order" });
      return res.status(200).json({ offer: o, order });
    }

    return res.status(200).json({ offer: o });
  } catch (e) {
    return res.status(500).json({ error: "server", detail: String(e?.message || e) });
  }
}
