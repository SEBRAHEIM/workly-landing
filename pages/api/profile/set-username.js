import { getServiceClient, requireUser, json } from "./_util"

function cleanUsername(v) {
  return String(v || "").toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 24)
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return json(res, 200, { ok: false, error: "method_not_allowed" })
    const supabase = getServiceClient()
    const u = await requireUser(req, supabase)
    if (!u.ok) return json(res, 200, { ok: false, error: u.error })

    const username = cleanUsername(req.body?.username || "")
    if (username.length < 3) return json(res, 200, { ok: false, error: "bad_username" })

    const { data: existing, error: exErr } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle()

    if (exErr) return json(res, 200, { ok: false, error: "db_error" })
    if (existing?.id && existing.id !== u.user.id) return json(res, 200, { ok: false, error: "username_taken" })

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: u.user.id, username }, { onConflict: "id" })

    if (error) {
      const m = String(error.message || error)
      if (m.toLowerCase().includes("duplicate")) return json(res, 200, { ok: false, error: "username_taken" })
      return json(res, 200, { ok: false, error: "db_error" })
    }

    return json(res, 200, { ok: true, username })
  } catch (e) {
    return json(res, 200, { ok: false, error: "server_error" })
  }
}
