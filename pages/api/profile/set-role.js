import { getServiceClient, requireUser, json } from "./_util"

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return json(res, 200, { ok: false, error: "method_not_allowed" })
    const supabase = getServiceClient()
    const u = await requireUser(req, supabase)
    if (!u.ok) return json(res, 200, { ok: false, error: u.error })

    const role = String(req.body?.role || "").trim()
    if (role !== "student" && role !== "creator") return json(res, 200, { ok: false, error: "bad_role" })

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: u.user.id, role }, { onConflict: "id" })

    if (error) return json(res, 200, { ok: false, error: "db_error" })
    return json(res, 200, { ok: true })
  } catch (e) {
    return json(res, 200, { ok: false, error: "server_error" })
  }
}
