import { supabaseAdmin } from "../../../lib/supabaseServer";

export default async function handler(req, res) {
  try {
    const supa = supabaseAdmin();

    if (req.method === "GET") {
      const username = String(req.query?.username || "").trim();
      if (!username) return res.status(400).json({ error: "username" });

      const { data: p, error: pe } = await supa
        .from("profiles")
        .select("id,role,username,nationality,avatar_url,bio,creator_ready,created_at")
        .eq("username", username)
        .maybeSingle();

      if (pe) return res.status(500).json({ error: "db" });
      if (!p || p.role !== "creator") return res.status(404).json({ error: "not_found" });

      const { data: cats } = await supa.from("creator_categories").select("category_slug").eq("creator_id", p.id);
      const { data: samples } = await supa
        .from("creator_samples")
        .select("id,title,file_url,file_type,created_at")
        .eq("creator_id", p.id)
        .order("created_at", { ascending: false });

      return res.status(200).json({ creator: p, categories: cats || [], samples: samples || [] });
    }

    return res.status(405).json({ error: "method" });
  } catch (e) {
    return res.status(500).json({ error: "server", detail: String(e?.message || e) });
  }
}
