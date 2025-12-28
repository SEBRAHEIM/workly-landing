import { supabaseFromEnv, supabaseAdminFromEnv } from "./_sb"

export function bearer(req) {
  const h = req.headers?.authorization || ""
  const m = String(h).match(/^Bearer\s+(.+)$/i)
  return m ? m[1].trim() : ""
}

export async function authedUserFromBearer(req) {
  const token = bearer(req)
  if (!token) return { ok: false, error: "missing_bearer" }

  const sb = supabaseFromEnv()
  const { data: u, error: uerr } = await sb.auth.getUser(token)
  if (uerr || !u?.user?.id) return { ok: false, error: "invalid_token" }

  return { ok: true, token, user: u.user }
}

export function requireAdminEnv() {
  const k = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "")
  if (!k) return { ok: false, error: "missing_service_role_key" }
  try {
    const admin = supabaseAdminFromEnv()
    return { ok: true, admin }
  } catch (e) {
    return { ok: false, error: "admin_client_error", detail: String(e?.message || e) }
  }
}
