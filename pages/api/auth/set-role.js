import { authedUserFromBearer, requireAdminEnv } from "./_guard"

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method_not_allowed" })

    const au = await authedUserFromBearer(req)
    if (!au.ok) return res.status(200).json({ ok: false, error: au.error })

    const adm = requireAdminEnv()
    if (!adm.ok) return res.status(200).json({ ok: false, error: adm.error, detail: adm.detail || null })

    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {})
    const roleRaw = String(body.role || "").trim().toLowerCase()
    const role = roleRaw === "student" || roleRaw === "creator" ? roleRaw : ""

    if (!role) return res.status(200).json({ ok: false, error: "invalid_role" })

    const userId = au.user.id

    const { data: prof, error: rerr } = await adm.admin
      .from("profiles")
      .select("id, role, username")
      .eq("id", userId)
      .maybeSingle()

    if (rerr) return res.status(200).json({ ok: false, error: "profiles_read_error", detail: String(rerr.message || rerr) })

    const username = prof?.username || null

    const payload = { id: userId, role }
    if (username !== null) payload.username = username

    const { error: uerr } = await adm.admin
      .from("profiles")
      .upsert(payload, { onConflict: "id" })

    if (uerr) return res.status(200).json({ ok: false, error: "profiles_upsert_error", detail: String(uerr.message || uerr) })

    return res.status(200).json({ ok: true, role, next: "/onboarding/username" })
  } catch (e) {
    return res.status(200).json({ ok: false, error: "server_error", detail: String(e?.message || e) })
  }
}
