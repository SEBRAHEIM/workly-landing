import { supabaseAdmin } from "../../../lib/supabaseServer";

function cleanText(s) {
  return String(s || "").trim();
}

function hasContactInfo(text) {
  const t = String(text || "").toLowerCase();
  if (!t) return false;
  const email = /[^\s@]+@[^\s@]+\.[^\s@]+/.test(t);
  const phone = /(\+?\d[\d\s\-().]{7,}\d)/.test(t);
  const social = /(instagram|snap|whatsapp|telegram|tiktok|discord|gmail|icloud|outlook)/.test(t);
  return email || phone || social;
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

    if (req.method === "GET") {
      const { data, error } = await supa.from("profiles").select("*").eq("id", userId).maybeSingle();
      if (error) return res.status(500).json({ error: "db" });
      return res.status(200).json({ profile: data || null });
    }

    if (req.method === "POST") {
      const role = cleanText(req.body?.role);
      const username = cleanText(req.body?.username);
      const nationality = cleanText(req.body?.nationality);
      const avatar_url = cleanText(req.body?.avatar_url);
      const bio = cleanText(req.body?.bio);

      if (bio && hasContactInfo(bio)) return res.status(400).json({ error: "bio_contact_not_allowed" });
      if (role && !["student", "creator"].includes(role)) return res.status(400).json({ error: "role" });

      const patch = { id: userId };
      if (role) patch.role = role;
      if (username) patch.username = username;
      if (nationality) patch.nationality = nationality;
      if (avatar_url) patch.avatar_url = avatar_url;
      if (bio) patch.bio = bio;

      const { data, error } = await supa.from("profiles").upsert(patch).select("*").single();
      if (error) return res.status(500).json({ error: "db", detail: String(error.message || "") });
      return res.status(200).json({ profile: data });
    }

    return res.status(405).json({ error: "method" });
  } catch (e) {
    return res.status(500).json({ error: "server", detail: String(e?.message || e) });
  }
}
