import { createClient } from "@supabase/supabase-js"

function pickUrl(v) {
  const s = String(v || "")
  const m = s.match(/https:\/\/[a-z0-9]+\.supabase\.co/i)
  return m ? m[0] : ""
}

function pickJwt(v) {
  const s = String(v || "")
  const m = s.match(/[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+/)
  return m ? m[0] : ""
}

export function envInfo() {
  const url = pickUrl(process.env.NEXT_PUBLIC_SUPABASE_URL || "")
  const anon = pickJwt(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")
  const service = pickJwt(process.env.SUPABASE_SERVICE_ROLE_KEY || "")
  return {
    url,
    hasUrl: !!url,
    hasAnon: !!anon,
    hasService: !!service,
    urlLen: url.length,
    anonLen: anon.length,
    serviceLen: service.length
  }
}

export function supabaseFromEnv() {
  const i = envInfo()
  if (!i.url || !i.hasAnon) throw new Error("Missing anon env")
  return createClient(i.url, pickJwt(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""), { auth: { persistSession: false } })
}

export function supabaseAdminFromEnv() {
  const i = envInfo()
  if (!i.url || !i.hasService) throw new Error("Missing service env")
  return createClient(i.url, pickJwt(process.env.SUPABASE_SERVICE_ROLE_KEY || ""), { auth: { persistSession: false } })
}
