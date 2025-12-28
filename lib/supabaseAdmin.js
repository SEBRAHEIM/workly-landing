import { createClient } from "@supabase/supabase-js"

export function supabaseAdmin() {
  const url = String(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "")
  const service = String(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || "")
  if (!url || !service) throw new Error("missing_supabase_admin_env")
  return createClient(url, service, { auth: { persistSession: false, autoRefreshToken: false } })
}
