import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../../lib/supabaseBrowser"

function parseHash(hash) {
  const h = String(hash || "").replace(/^#/, "")
  const out = {}
  for (const part of h.split("&")) {
    if (!part) continue
    const [k, v] = part.split("=")
    if (!k) continue
    out[decodeURIComponent(k)] = decodeURIComponent(v || "")
  }
  return out
}

export default function AuthCallback() {
  const r = useRouter()
  const [msg, setMsg] = useState("Finishing sign-in...")

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const code = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("code") : null
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) throw error
        } else {
          const h = parseHash(typeof window !== "undefined" ? window.location.hash : "")
          const access_token = h.access_token || ""
          const refresh_token = h.refresh_token || ""
          if (access_token && refresh_token) {
            const { error } = await supabase.auth.setSession({ access_token, refresh_token })
            if (error) throw error
          }
        }

        const { data } = await supabase.auth.getSession()
        const token = data?.session?.access_token || ""
        if (!token) {
          if (!alive) return
          setMsg("No session. Please try again.")
          return
        }

        if (!alive) return
        r.replace("/dashboard")
      } catch (e) {
        if (!alive) return
        setMsg("Callback error: " + String(e?.message || e))
      }
    })()
    return () => { alive = false }
  }, [r])

  return (
    <div style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: 20, marginBottom: 10 }}>Workly</h1>
        <p style={{ opacity: 0.8 }}>{msg}</p>
      </div>
    </div>
  )
}
