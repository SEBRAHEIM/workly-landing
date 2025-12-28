import Link from "next/link"
import { useRouter } from "next/router"
import { supabase } from "../../lib/supabaseBrowser"
import AuthLayout from "../../components/auth/AuthLayout"
import AuthCard from "../../components/auth/AuthCard"
import { useState } from "react"

export default function Role() {
  const r = useRouter()
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState("")

  async function setRole(role) {
    if (busy) return
    setMsg("")
    setBusy(true)

    const { data } = await supabase.auth.getSession()
    const sess = data?.session || null
    const u = sess?.user || null

    if (!u) {
      setBusy(false)
      setMsg("Please sign in again.")
      return
    }

    const { error } = await supabase.from("profiles").upsert({ id: u.id, role }, { onConflict: "id" })

    if (error) {
      setBusy(false)
      setMsg("Could not save role.")
      return
    }

    setBusy(false)
    r.push("/auth/username")
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Choose your role"
        subtitle="This is saved and used everywhere later."
        topRight={<Link href="/" style={{ fontSize: 18, opacity: .7 }}>×</Link>}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <button
            onClick={() => setRole("student")}
            disabled={busy}
            style={{
              width: "100%",
              height: 54,
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,.12)",
              background: "rgba(255,255,255,.55)",
              fontWeight: 980,
              cursor: busy ? "default" : "pointer",
              opacity: busy ? .6 : 1
            }}
          >
            I am a Student
          </button>

          <button
            onClick={() => setRole("creator")}
            disabled={busy}
            style={{
              width: "100%",
              height: 54,
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,.12)",
              background: "rgba(255,255,255,.55)",
              fontWeight: 980,
              cursor: busy ? "default" : "pointer",
              opacity: busy ? .6 : 1
            }}
          >
            I am a Creator
          </button>
        </div>

        {msg ? (
          <div style={{ marginTop: 14, padding: 12, borderRadius: 14, border: "1px solid rgba(180,0,0,.20)", background: "rgba(255, 170, 170, .22)", fontWeight: 950 }}>
            {msg}
          </div>
        ) : null}
      </AuthCard>
    </AuthLayout>
  )
}
