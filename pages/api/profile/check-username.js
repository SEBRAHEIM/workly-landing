import { getServiceClient, json } from "./_util"

function cleanUsername(v) {
  return String(v || "").toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 24)
}

export default async function handler(req, res) {
  try {
    const supabase = getServiceClient()
    const username = cleanUsername(req.query?.username || "")
    if (username.length < 3) return json(res, 200, { ok: false, error: "bad_username" })

    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .maybeSingle()

    if (error) return json(res, 200, { ok: false, error: "db_error" })
    return json(res, 200, { ok: true, exists: !!data })
  } catch (e) {
    return json(res, 200, { ok: false, error: "server_error" })
  }
}
