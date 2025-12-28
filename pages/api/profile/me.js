import { getServiceClient, requireUser, json } from "./_util"

export default async function handler(req, res) {
  try {
    const supabase = getServiceClient()
    const u = await requireUser(req, supabase)
    if (!u.ok) return json(res, 200, { ok: false, error: u.error })

    const { data, error } = await supabase
      .from("profiles")
      .select("id, role, username")
      .eq("id", u.user.id)
      .maybeSingle()

    if (error) return json(res, 200, { ok: false, error: "db_error" })
    return json(res, 200, { ok: true, profile: data || { id: u.user.id, role: null, username: null } })
  } catch (e) {
    return json(res, 200, { ok: false, error: "server_error" })
  }
}
