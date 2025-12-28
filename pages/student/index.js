import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { supabase } from "../../lib/supabaseBrowser"

export default function StudentHome() {
  const r = useRouter()
  const [email, setEmail] = useState("")

  useEffect(() => {
    let alive = true
    ;(async () => {
      const { data } = await supabase.auth.getSession()
      const token = data?.session?.access_token || ""
      if (!token) {
        if (!alive) return
        r.replace("/auth/login")
        return
      }

      const resp = await fetch("/api/auth/profile-health", {
        method: "GET",
        headers: { Authorization: "Bearer " + token }
      })
      const j = await resp.json()
      const next = j?.next || "/auth/login"
      if (next !== "/student") {
        if (!alive) return
        r.replace(next)
        return
      }

      const u = await supabase.auth.getUser()
      if (!alive) return
      setEmail(u?.data?.user?.email || "")
    })()
    return () => { alive = false }
  }, [r])

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>Student</h1>
      <p style={{ opacity: 0.8 }}>Signed in as {email}</p>
    </div>
  )
}
