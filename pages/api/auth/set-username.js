import { authedUserFromBearer, requireAdminEnv } from "./_guard"

function normalize(u) {
  return String(u || "").trim().toLowerCase()
}

function valid(u) {
  if (u.length < 3 || u.length > 24) return false
  return /^[a-z0-9_]+$/.test(u)
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method_not_allowed" })

    const au = await authedUserFromBearer(req)
    if (!au.ok) return res.status(200).json({ ok: false, error: au.error })

    const adm = requireAdminEnv()
    if (!adm.ok) return res.status(200).json({ ok: false, error: adm.error, detail: adm.detail || null })

    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {})
    const username = normalize(body.username)

    if (!valid(username)) {
      return res.status(200).json({ ok: false, error: "invalid_username", detail: "Use 3-24 chars: a-z, 0-9, underscore. Lowercase only." })
    }

    const userId = au.user.id

    const { data: prof, error: rerr } = await adm.admin
      .from("profiles")
      .select("id, role, username")
      .eq("id", userId)
      .maybeSingle()

    if (rerr) return res.status(200).json({ ok: false, error: "profiles_read_error", detail: String(rerr.message || rerr) })

    const role = prof?.role || null
    if (!role) return res.status(200).json({ ok: false, error: "missing_role", detail: "Pick a role first." })

    const { error: uerr } = await adm.admin
      .from("profiles")
      .upsert({ id: userId, role, username }, { onConflict: "id" })

    if (uerr) {
      const msg = String(uerr.message || uerr)
      const lower = msg.toLowerCase()
      if (lower.includes("duplicate") || lower.includes("unique")) {
        return res.status(200).json({ ok: false, error: "username_taken", detail: "This username is already taken." })
      }
      return res.status(200).json({ ok: false, error: "profiles_upsert_error", detail: msg })
    }

    const next = role === "creator" ? "/creator" : "/student"
    return res.status(200).json({ ok: true, username, role, next })
  } catch (e) {
    return res.status(200).json({ ok: false, error: "server_error", detail: String(e?.message || e) })
  }
}
