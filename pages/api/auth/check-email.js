import { supabaseAdminFromEnv } from "./_sb"

export default async function handler(req, res) {
  try {
    const email = String((req.query?.email || req.body?.email || "")).trim().toLowerCase()
    if (!email) return res.status(200).json({ ok: false, error: "missing_email" })

    const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "")
    if (!serviceKey) return res.status(200).json({ ok: false, error: "missing_service_role_key" })

    const admin = supabaseAdminFromEnv()

    let page = 1
    const perPage = 200
    let found = false

    for (let i = 0; i < 20; i++) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage })
      if (error) return res.status(200).json({ ok: false, error: "list_users_error", detail: String(error.message || error) })
      const users = data?.users || []
      found = users.some(u => String(u.email || "").toLowerCase() === email)
      if (found) break
      if (users.length < perPage) break
      page += 1
    }

    return res.status(200).json({ ok: true, exists: found })
  } catch (e) {
    return res.status(200).json({ ok: false, error: "server_error", detail: String(e?.message || e) })
  }
}
