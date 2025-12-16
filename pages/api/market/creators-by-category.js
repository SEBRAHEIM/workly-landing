import { supabaseAdmin } from "../../../lib/supabaseServer";

export default async function handler(req, res) {
  try {
    const supa = supabaseAdmin();
    const category = String(req.query?.category || "").trim();
    if (!category) return res.status(400).json({ error: "category" });

    const { data, error } = await supa
      .from("creator_categories")
      .select("category_slug, creator_id, profiles:profiles(id,username,nationality,avatar_url,bio,creator_ready)")
      .eq("category_slug", category);

    if (error) return res.status(500).json({ error: "db" });

    const creators = (data || [])
      .map((x) => x.profiles)
      .filter(Boolean)
      .filter((p) => p.role === undefined || p.role === "creator");

    return res.status(200).json({ creators });
  } catch (e) {
    return res.status(500).json({ error: "server", detail: String(e?.message || e) });
  }
}
