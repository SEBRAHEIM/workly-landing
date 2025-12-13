import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/router"

function isValidEmail(v) {
  const x = String(v || "").trim()
  return x.includes("@") && x.includes(".") && x.length >= 6
}

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailExists, setEmailExists] = useState(null)
  const [checking, setChecking] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")
  const [err, setErr] = useState("")

  const canCheck = useMemo(() => isValidEmail(email), [email])

  async function checkEmailExists() {
    setErr("")
    setMsg("")
    if (!canCheck) {
      setEmailExists(null)
      return
    }
    setChecking(true)
    try {
      const r = await fetch(`/api/auth/check-email?email=${encodeURIComponent(email.trim())}`)
      const j = await r.json().catch(() => null)
      if (j && j.ok) {
        setEmailExists(!!j.exists)
      } else {
        setEmailExists(null)
      }
    } catch (e) {
      setEmailExists(null)
    } finally {
      setChecking(false)
    }
  }

  useEffect(() => {
    setEmailExists(null)
    setErr("")
    setMsg("")
  }, [email])

  async function onSubmit(e) {
    e.preventDefault()
    setErr("")
    setMsg("")

    const cleanEmail = email.trim().toLowerCase()

    if (!isValidEmail(cleanEmail)) {
      setErr("Enter a valid email.")
      return
    }

    if (emailExists === false) {
      router.push(`/auth/email?email=${encodeURIComponent(cleanEmail)}`)
      return
    }

    setLoading(true)
    try {
      const r = await fetch("/api/auth/login-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password })
      })

      const j = await r.json().catch(() => null)

      if (r.ok) {
        router.push("/dashboard")
        return
      }

      const message = j?.error || "Sign in failed."

      if (emailExists === null) {
        await checkEmailExists()
      }

      if (emailExists === false) {
        router.push(`/auth/email?email=${encodeURIComponent(cleanEmail)}`)
        return
      }

      setErr(message)
    } catch (e) {
      setErr("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="authWrap">
      <div className="authCard">
        <div className="authBrand">WORKLY</div>
        <h1 className="authTitle">Sign in</h1>
        <p className="authSubtitle">
          Existing users sign in with password. New users verify email once, then set a password.
        </p>

        <form onSubmit={onSubmit} className="authForm">
          <label className="authLabel">Email</label>
          <input
            className="authInput"
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={checkEmailExists}
            autoComplete="email"
          />

          {emailExists !== false && (
            <>
              <label className="authLabel">Password</label>
              <input
                className="authInput"
                type="password"
                value={password}
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </>
          )}

          {err ? <div className="authError">{err}</div> : null}
          {msg ? <div className="authMsg">{msg}</div> : null}

          <button
            type="submit"
            className="authPrimaryBtn"
            disabled={loading || checking}
          >
            {checking ? "Checking…" : emailExists === false ? "Verify email" : loading ? "Signing in…" : "Sign in"}
          </button>

          <div style={{ height: 10 }} />

          <button
            type="button"
            className="authSecondaryBtn"
            onClick={() => router.push(`/auth/email?email=${encodeURIComponent(email.trim().toLowerCase())}`)}
          >
            Use email code instead
          </button>
        </form>
      </div>
    </div>
  )
}
