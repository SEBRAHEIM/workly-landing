import { createClient } from "@supabase/supabase-js"

function json(res, obj) {
  res.status(200).json(obj)
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))
  ])
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return json(res, { ok: false, error: "method_not_allowed" })

    const email = String(req.body?.email || "").trim().toLowerCase()
    const code = String(req.body?.code || "").trim()

    if (!email) return json(res, { ok: false, error: "missing_email" })
    if (!code) return json(res, { ok: false, error: "missing_code" })

    const url = String(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "")
    const anon = String(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "")

    if (!url || !anon) return json(res, { ok: false, error: "missing_supabase_env" })

    const supabase = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } })

    const out = await withTimeout(
      supabase.auth.verifyOtp({ email, token: code, type: "email" }),
      12000
    )

    const { data, error } = out || {}
    if (error) return json(res, { ok: false, error: "verify_failed", detail: String(error.message || error) })

    const session = data?.session || null
    if (!session) return json(res, { ok: false, error: "no_session_returned" })

    return json(res, { ok: true, session })
  } catch (e) {
    const m = String(e?.message || e)
    if (m === "timeout") return json(res, { ok: false, error: "timeout" })
    return json(res, { ok: false, error: "server_error", detail: m })
  }
}
