import { supabaseFromEnv } from "./_sb"

function clean(u) {
  return (u || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 24)
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).json({ ok: false })
    const username = clean(req.body?.username || "")
    if (!username || username.length < 3) return res.status(400).json({ ok: false, error: "Invalid username" })

    const sb = supabaseFromEnv()
    const accessToken = req.cookies?.["sb-access-token"] || req.cookies?.["supabase-auth-token"]
    if (!accessToken) return res.status(401).json({ ok: false, error: "Not authenticated" })

    const { data, error } = await sb.auth.getUser(String(accessToken).trim())
    if (error || !data.user) return res.status(401).json({ ok: false, error: "Not authenticated" })

    const userId = data.user.id

    const { data: existing, error: exErr } = await sb
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle()

    if (exErr) return res.status(400).json({ ok: false, error: exErr.message })
    if (existing?.id && existing.id !== userId) return res.status(409).json({ ok: false, error: "Username already taken" })

    const { error: upErr } = await sb.from("profiles").update({ username }).eq("id", userId)
    if (upErr) return res.status(400).json({ ok: false, error: upErr.message })

    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(500).json({ ok: false, error: "Server error" })
  }
}
