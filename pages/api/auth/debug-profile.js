import { supabaseFromEnv, supabaseAdminFromEnv } from "./_sb"

function bearer(req) {
  const h = req.headers?.authorization || ""
  const m = String(h).match(/^Bearer\s+(.+)$/i)
  return m ? m[1].trim() : ""
}

export default async function handler(req, res) {
  try {
    const token = bearer(req)
    if (!token) return res.status(200).json({ ok: false, error: "missing_bearer" })

    const sb = supabaseFromEnv()
    const { data: u, error: uerr } = await sb.auth.getUser(token)
    if (uerr || !u?.user?.id) return res.status(200).json({ ok: false, error: "invalid_token" })

    const userId = u.user.id
    const admin = supabaseAdminFromEnv()

    const { data: prof, error: perr } = await admin
      .from("profiles")
      .select("id, role, username, created_at")
      .eq("id", userId)
      .maybeSingle()

    if (perr) return res.status(200).json({ ok: false, error: "profiles_read_error", detail: String(perr.message || perr) })

    return res.status(200).json({
      ok: true,
      userId,
      email: u.user.email || null,
      profile: prof || null
    })
  } catch (e) {
    return res.status(200).json({ ok: false, error: "server_error", detail: String(e?.message || e) })
  }
}
