import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { supabase } from "../../lib/supabaseBrowser"
import AuthLayout from "../../components/auth/AuthLayout"
import AuthCard from "../../components/auth/AuthCard"

function cleanUsername(v) {
  return String(v || "").toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 24)
}

export default function Username() {
  const r = useRouter()
  const [u, setU] = useState("")
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState("")

  async function onContinue() {
    if (busy) return
    setMsg("")
    const username = cleanUsername(u)

    if (username.length < 3) {
      setMsg("Username must be 3-24 characters.")
      return
    }

    setBusy(true)

    const { data } = await supabase.auth.getSession()
    const sess = data?.session || null
    const user = sess?.user || null

    if (!user) {
      setBusy(false)
      setMsg("Please sign in again.")
      return
    }

    const { error } = await supabase.from("profiles").upsert({ id: user.id, username }, { onConflict: "id" })

    if (error) {
      const m = String(error.message || "")
      setBusy(false)
      if (m.toLowerCase().includes("unique") || m.toLowerCase().includes("duplicate")) {
        setMsg("Username is taken. Try another one.")
        return
      }
      setMsg("Could not save username.")
      return
    }

    const { data: row } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
    const role = String(row?.role || "")

    setBusy(false)

    if (role === "student") return r.replace("/")
    return r.replace("/dashboard")
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Pick a username"
        subtitle="3-24 characters. a-z, 0-9, underscore."
        topRight={<Link href="/" style={{ fontSize: 18, opacity: .7 }}>×</Link>}
      >
        <div style={{ fontWeight: 950, marginBottom: 8 }}>Username</div>
        <input
          value={u}
          onChange={(e) => setU(cleanUsername(e.target.value))}
          placeholder="e.g. salem_eb"
          style={{ width: "100%", height: 52, borderRadius: 14, border: "1px solid rgba(0,0,0,.15)", padding: "0 14px", fontSize: 16, background: "rgba(255,255,255,.65)", outline: "none" }}
        />

        {msg ? (
          <div style={{ marginTop: 14, padding: 12, borderRadius: 14, border: "1px solid rgba(180,0,0,.20)", background: "rgba(255, 170, 170, .22)", fontWeight: 950 }}>
            {msg}
          </div>
        ) : null}

        <div style={{ height: 16 }} />

        <button
          onClick={onContinue}
          disabled={busy}
          style={{ width: "100%", height: 54, borderRadius: 999, border: "1px solid rgba(0,0,0,.12)", background: "#3b3a35", color: "#f4f0ea", fontWeight: 980, fontSize: 16, opacity: busy ? .6 : 1, cursor: busy ? "default" : "pointer" }}
        >
          {busy ? "Please wait..." : "Continue"}
        </button>
      </AuthCard>
    </AuthLayout>
  )
}
