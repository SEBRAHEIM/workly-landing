import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { supabase } from "../../lib/supabaseBrowser"
import AuthLayout from "../../components/auth/AuthLayout"
import AuthCard from "../../components/auth/AuthCard"
import { Field, Input, PrimaryButton, SecondaryButton, Message, Hint } from "../../components/auth/AuthUI"

function cleanCode(v) {
  return String(v || "").replace(/[^0-9]/g, "").slice(0, 6)
}

async function postJsonWithTimeout(url, body, ms) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), ms)
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal
    })
    const text = await resp.text()
    let j = null
    try { j = JSON.parse(text) } catch { j = null }
    return { ok: resp.ok, status: resp.status, json: j, raw: text }
  } finally {
    clearTimeout(t)
  }
}

export default function Verify() {
  const r = useRouter()
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState("")
  const [ok, setOk] = useState(false)

  const emailFromQuery = useMemo(() => {
    try {
      if (typeof window === "undefined") return ""
      return String(new URLSearchParams(window.location.search).get("email") || "")
    } catch {
      return ""
    }
  }, [])

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("workly_email") : ""
    const e = (emailFromQuery || saved || "").trim().toLowerCase()
    if (e) setEmail(e)
  }, [emailFromQuery])

  async function routeNext() {
    try {
      const { data } = await supabase.auth.getSession()
      const token = data?.session?.access_token || ""
      if (!token) return r.replace("/dashboard")

      const resp = await fetch("/api/profile/me", { headers: { Authorization: "Bearer " + token } })
      const j = await resp.json()
      const p = j?.profile || null

      const role = String(p?.role || "")
      const username = String(p?.username || "")

      if (!role) return r.replace("/auth/role")
      if (!username) return r.replace("/auth/username")
      return r.replace("/dashboard")
    } catch {
      return r.replace("/dashboard")
    }
  }

  async function onVerify() {
    if (busy) return
    setMsg("")
    setOk(false)

    const e = String(email || "").trim().toLowerCase()
    const c = cleanCode(code)

    if (!e) return setMsg("Missing email.")
    if (c.length !== 6) return setMsg("Enter the 6-digit code.")

    setBusy(true)

    try {
      const out = await postJsonWithTimeout("/api/auth/verify-otp", { email: e, code: c }, 15000)
      const j = out.json

      if (!j || !j.ok) {
        const reason = String(j?.error || "verify_failed")
        setBusy(false)
        if (reason === "timeout") return setMsg("Server timeout. Tap Verify again.")
        if (reason === "verify_failed") return setMsg(String(j?.detail || "Code is invalid/expired. Use the latest email."))
        return setMsg("Verification failed: " + reason)
      }

      const s = j?.session || null
      const access_token = s?.access_token || ""
      const refresh_token = s?.refresh_token || ""

      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({ access_token, refresh_token })
        if (error) {
          setBusy(false)
          return setMsg("Session error.")
        }
      } else {
        setBusy(false)
        return setMsg("No session returned.")
      }

      const pending = typeof window !== "undefined" ? sessionStorage.getItem("workly_pending_pw") : ""
      if (pending) {
        const { error } = await supabase.auth.updateUser({ password: pending })
        if (typeof window !== "undefined") sessionStorage.removeItem("workly_pending_pw")
        if (error) {
          setBusy(false)
          return setMsg("Password save failed.")
        }
      }

      setOk(true)
      setBusy(false)
      await routeNext()
    } catch (e2) {
      setBusy(false)
      const m = String(e2?.message || e2)
      if (m.toLowerCase().includes("aborted")) return setMsg("Network timeout. Tap Verify again.")
      setMsg("Verification failed. Try again.")
    }
  }

  async function onResend() {
    if (busy) return
    setMsg("")
    setBusy(true)

    try {
      const e = String(email || "").trim().toLowerCase()
      if (!e) {
        setBusy(false)
        return setMsg("Missing email.")
      }

      if (typeof window !== "undefined") localStorage.setItem("workly_email", e)

      const { error } = await supabase.auth.signInWithOtp({
        email: e,
        options: { shouldCreateUser: true }
      })

      if (error) {
        setBusy(false)
        return setMsg(String(error.message || error))
      }

      setBusy(false)
      setMsg("New code sent. Check your email.")
    } catch {
      setBusy(false)
      setMsg("Failed to resend code.")
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Verify your email"
        subtitle="Paste the 6-digit code we sent to your email."
        topRight={<Link href="/" style={{ fontSize: 18, textDecoration: "none", opacity: .7 }}>×</Link>}
      >
        <Field label="Email">
          <Input value={email} readOnly />
        </Field>

        <Field label="Verification code">
          <Input
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="123456"
            inputMode="numeric"
            style={{ height: 56, fontSize: 22, textAlign: "center", letterSpacing: ".35em", background: "rgba(255,255,255,.65)" }}
          />
        </Field>

        <Message text={msg} />

        <div style={{ height: 16 }} />

        <PrimaryButton onClick={onVerify} disabled={busy}>
          {busy ? "Verifying..." : ok ? "Verified" : "Verify"}
        </PrimaryButton>

        <Hint text={busy ? "Checking code..." : ""} />

        <div style={{ height: 12 }} />

        <SecondaryButton onClick={onResend} disabled={busy}>
          {busy ? "Please wait..." : "Resend code"}
        </SecondaryButton>
      </AuthCard>
    </AuthLayout>
  )
}
