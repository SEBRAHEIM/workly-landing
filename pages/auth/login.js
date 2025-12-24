import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function EmailPasswordAuth() {
  const router = useRouter();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const cleanedEmail = useMemo(() => String(email || "").trim().toLowerCase(), [email]);

  const submit = async () => {
    setErr("");
    const e = cleanedEmail;
    const p = String(pass || "");
    if (!e.includes("@")) {
      setErr("Enter a valid email");
      return;
    }
    if (p.length < 8) {
      setErr("Password must be at least 8 characters");
      return;
    }

    setBusy(true);
    try {
      if (mode === "signup") {
        const emailRedirectTo = `${window.location.origin}/auth/callback`;
        const { data, error } = await supabase.auth.signUp({
          email: e,
          password: p,
          options: { emailRedirectTo }
        });
        if (error) throw error;

        const confirmed = !!data?.user?.email_confirmed_at;
        if (!confirmed) {
          window.location.href = `/auth/check-email?email=${encodeURIComponent(e)}`;
          return;
        }

        window.location.href = "/auth/profile";
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: e,
        password: p
      });
      if (error) throw error;

      const u = data?.user;
      const confirmed = !!u?.email_confirmed_at;

      if (!confirmed) {
        await supabase.auth.signOut();
        window.location.href = `/auth/check-email?email=${encodeURIComponent(e)}`;
        return;
      }

      window.location.href = "/auth/profile";
    } catch (x) {
      setErr(String(x?.message || x));
    } finally {
      setBusy(false);
    }
  };

  const tabStyle = (active) => ({
    flex: 1,
    padding: "12px 12px",
    borderRadius: 999,
    border: active ? "2px solid #4b443b" : "1px solid rgba(0,0,0,0.12)",
    background: active ? "rgba(75,68,59,0.08)" : "#fff",
    fontWeight: 1100,
    cursor: "pointer"
  });

  return (
    <div style={{ minHeight: "100vh", background: "#ece9e2", padding: 24 }}>
      <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ fontWeight: 1100, letterSpacing: 4, opacity: 0.75 }}>WORKLY</div>
          <Link href="/auth" style={{ textDecoration: "none", fontWeight: 1000 }}>✕</Link>
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
          <button type="button" onClick={() => setMode("signin")} style={tabStyle(mode === "signin")}>Sign in</button>
          <button type="button" onClick={() => setMode("signup")} style={tabStyle(mode === "signup")}>Sign up</button>
        </div>

        <div style={{ marginTop: 14, fontWeight: 1200, fontSize: 34, lineHeight: 1.05, color: "#3a332b" }}>
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </div>
        <div style={{ marginTop: 10, opacity: 0.7, fontWeight: 900 }}>
          {mode === "signup" ? "Verify your email before you can continue." : "Sign in to continue."}
        </div>

        <div style={{ marginTop: 14, fontWeight: 1000, opacity: 0.7 }}>Email</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          style={{
            marginTop: 8,
            width: "100%",
            padding: "14px 14px",
            borderRadius: 14,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "#fff",
            fontWeight: 1100,
            fontSize: 18
          }}
        />

        <div style={{ marginTop: 14, fontWeight: 1000, opacity: 0.7 }}>Password</div>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          placeholder="••••••••"
          style={{
            marginTop: 8,
            width: "100%",
            padding: "14px 14px",
            borderRadius: 14,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "#fff",
            fontWeight: 1100,
            fontSize: 18
          }}
        />

        {err ? (
          <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", border: "1px solid rgba(220,0,0,0.20)", fontWeight: 1000 }}>
            {err}
          </div>
        ) : null}

        <button
          type="button"
          disabled={busy}
          onClick={submit}
          style={{
            marginTop: 14,
            width: "100%",
            border: 0,
            background: busy ? "rgba(75,68,59,0.45)" : "#4b443b",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: 999,
            fontWeight: 1100,
            cursor: busy ? "not-allowed" : "pointer"
          }}
        >
          {busy ? "Please wait..." : (mode === "signup" ? "Sign up" : "Sign in")}
        </button>
      </div>
    </div>
  );
}
