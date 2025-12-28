import { authedUserFromBearer, requireAdminEnv } from "./_guard"

export default async function handler(req, res) {
  try {
    const au = await authedUserFromBearer(req)
    if (!au.ok) return res.status(200).json({ ok: false, authed: false, error: au.error })

    const adm = requireAdminEnv()
    if (!adm.ok) return res.status(200).json({ ok: false, authed: true, error: adm.error, detail: adm.detail || null })

    const userId = au.user.id

    const { data: prof, error: perr } = await adm.admin
      .from("profiles")
      .select("id, role, username")
      .eq("id", userId)
      .maybeSingle()

    if (perr) return res.status(200).json({ ok: false, authed: true, error: "profiles_read_error", detail: String(perr.message || perr) })

    const role = prof?.role || null
    const username = prof?.username || null

    let next = "/dashboard"
    if (!role) next = "/onboarding/role"
    else if (!username) next = "/onboarding/username"
    else next = role === "creator" ? "/creator" : "/student"

    return res.status(200).json({ ok: true, authed: true, userId, role, username, next })
  } catch (e) {
    return res.status(200).json({ ok: false, error: "server_error", detail: String(e?.message || e) })
  }
}
