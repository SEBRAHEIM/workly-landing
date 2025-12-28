import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { supabase } from "../../lib/supabaseBrowser"
import AuthLayout from "../../components/auth/AuthLayout"
import AuthCard from "../../components/auth/AuthCard"

export default function AuthEmail() {
  const r = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState("")
  const [mode, setMode] = useState("unknown")

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("workly_email") : ""
    if (saved) setEmail(String(saved))
  }, [])

  async function checkEmailExists(e) {
    const resp = await fetch("/api/auth/check-email?email=" + encodeURIComponent(e))
    const j = await resp.json()
    return !!j?.exists
  }

  function isInvalidCreds(err) {
    const m = String(err?.message || err || "").toLowerCase()
    return m.includes("invalid login credentials") || m.includes("invalid") || m.includes("credentials")
  }

  async function routeAfterLogin() {
    const { data } = await supabase.auth.getSession()
    const sess = data?.session || null
    if (!sess) return r.replace("/")
    const u = sess.user
    const { data: row } = await supabase.from("profiles").select("role").eq("id", u.id).maybeSingle()
    const role = String(row?.role || "")
    if (role === "student") return r.replace("/")
    return r.replace("/dashboard")
  }

  async function onContinue() {
    setMsg("")
    const e = String(email || "").trim().toLowerCase()
    if (!e) return setMsg("Enter your email.")
    if (typeof window !== "undefined") localStorage.setItem("workly_email", e)

    setBusy(true)
    try {
      const exists = await checkEmailExists(e)

      if (!exists && mode !== "new") {
        setBusy(false)
        setMode("new")
        setMsg("Confirm your password.")
        return
      }

      if (exists && mode !== "needs_code") {
        setMode("existing")

        if (!password) {
          setBusy(false)
          setMsg("Enter your password.")
          return
        }

        const { error } = await supabase.auth.signInWithPassword({ email: e, password })

        if (!error) {
          setBusy(false)
          await routeAfterLogin()
          return
        }

        if (isInvalidCreds(error)) {
          setBusy(false)
          setMode("needs_code")
          setMsg("This account needs a one-time email code to set a password. Confirm your password, then Continue.")
          return
        }

        setBusy(false)
        setMsg(String(error.message || error))
        return
      }

      if (!password) {
        setBusy(false)
        setMsg(mode === "new" ? "Create a password." : "Enter your password.")
        return
      }

      if (password.length < 8) {
        setBusy(false)
        setMsg("Password must be at least 8 characters.")
        return
      }

      if (!confirm) {
        setBusy(false)
        setMsg("Confirm your password.")
        return
      }

      if (password !== confirm) {
        setBusy(false)
        setMsg("Passwords do not match.")
        return
      }

      if (typeof window !== "undefined") sessionStorage.setItem("workly_pending_pw", password)

      const { error } = await supabase.auth.signInWithOtp({
        email: e,
        options: { shouldCreateUser: true }
      })

      if (error) {
        if (typeof window !== "undefined") sessionStorage.removeItem("workly_pending_pw")
        setBusy(false)
        setMsg(String(error.message || error))
        return
      }

      setBusy(false)
      r.push("/auth/verify?email=" + encodeURIComponent(e))
    } catch (e2) {
      setBusy(false)
      setMsg(String(e2?.message || e2))
    }
  }

  const showConfirm = mode === "new" || mode === "needs_code"

  return (
    <AuthLayout>
      <AuthCard
        title={<>Continue with<br/>email</>}
        subtitle="If you’re new, we’ll send a 6-digit code to verify your email first."
        topRight={<Link href="/" style={{ fontSize: 18, opacity: .7 }}>×</Link>}
      >
        <div style={{ fontWeight: 950, marginBottom: 8 }}>Email</div>
        <input
          value={email}
          onChange={(e) => { setEmail(e.target.value); setMode("unknown"); setMsg(""); setConfirm("") }}
          placeholder="you@email.com"
          style={{ width: "100%", height: 52, borderRadius: 14, border: "1px solid rgba(0,0,0,.15)", padding: "0 14px", fontSize: 16, background: "rgba(234, 246, 200, .55)", outline: "none" }}
        />

        <div style={{ height: 14 }} />

        <div style={{ fontWeight: 950, marginBottom: 8 }}>Password</div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          type="password"
          autoComplete="current-password"
          style={{ width: "100%", height: 52, borderRadius: 14, border: "1px solid rgba(0,0,0,.15)", padding: "0 14px", fontSize: 16, background: "rgba(234, 246, 200, .55)", outline: "none" }}
        />

        {showConfirm ? (
          <>
            <div style={{ height: 14 }} />
            <div style={{ fontWeight: 950, marginBottom: 8 }}>Confirm password</div>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
              style={{ width: "100%", height: 52, borderRadius: 14, border: "1px solid rgba(0,0,0,.15)", padding: "0 14px", fontSize: 16, background: "rgba(234, 246, 200, .55)", outline: "none" }}
            />
          </>
        ) : null}

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
