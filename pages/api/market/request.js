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

    if (req.method === "POST") {
      const category_slug = String(req.body?.category_slug || "").trim();
      const creator_id = String(req.body?.creator_id || "").trim();
      const amount_cents = parseMoneyToCents(req.body?.amount);
      const currency = "AED";

      if (!category_slug) return res.status(400).json({ error: "category" });
      if (!creator_id) return res.status(400).json({ error: "creator" });
      if (!amount_cents) return res.status(400).json({ error: "amount" });

      const { data: pr } = await supa.from("profiles").select("role").eq("id", userId).maybeSingle();
      if (!pr || pr.role !== "student") return res.status(403).json({ error: "student_only" });

      const { data: cr } = await supa.from("profiles").select("role").eq("id", creator_id).maybeSingle();
      if (!cr || cr.role !== "creator") return res.status(400).json({ error: "creator_invalid" });

      const { data: r0, error: re } = await supa
        .from("requests")
        .insert({ student_id: userId, creator_id, category_slug, status: "negotiating" })
        .select("*")
        .single();

      if (re) return res.status(500).json({ error: "db_request" });

      const { data: o0, error: oe } = await supa
        .from("offers")
        .insert({ request_id: r0.id, actor_id: userId, amount_cents, currency, is_final: false })
        .select("*")
        .single();

      if (oe) return res.status(500).json({ error: "db_offer" });

      return res.status(200).json({ request: r0, offer: o0 });
    }

    if (req.method === "GET") {
      const { data: pr } = await supa.from("profiles").select("role").eq("id", userId).maybeSingle();
      if (!pr) return res.status(403).json({ error: "no_profile" });

      const { data, error } = await supa
        .from("requests")
        .select("*")
        .or(`student_id.eq.${userId},creator_id.eq.${userId}`)
        .order("created_at", { ascending: false });

      if (error) return res.status(500).json({ error: "db" });
      return res.status(200).json({ requests: data || [] });
    }

    return res.status(405).json({ error: "method" });
  } catch (e) {
    return res.status(500).json({ error: "server", detail: String(e?.message || e) });
  }
}
