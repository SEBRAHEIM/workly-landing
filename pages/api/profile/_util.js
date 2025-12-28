import { createClient } from "@supabase/supabase-js"

export function getServiceClient() {
  const url = String(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "")
  const service = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "")
  if (!url || !service) throw new Error("missing_supabase_env")
  return createClient(url, service, { auth: { persistSession: false, autoRefreshToken: false } })
}

export async function requireUser(req, supabase) {
  const h = String(req.headers.authorization || "")
  const token = h.toLowerCase().startsWith("bearer ") ? h.slice(7) : ""
  if (!token) return { ok: false, error: "missing_token" }
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data?.user) return { ok: false, error: "invalid_token" }
  return { ok: true, user: data.user }
}

export function json(res, code, obj) {
  res.status(code).json(obj)
}
