import { useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function AuthHome() {
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState("");

  const oauth = async (provider) => {
    setErr("");
    setBusy(provider);
    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
      if (error) throw error;
    } catch (e) {
      setErr(String(e?.message || e));
      setBusy("");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ece9e2", padding: 24 }}>
      <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
        <div style={{ fontWeight: 1100, letterSpacing: 4, opacity: 0.75 }}>WORKLY</div>
        <div style={{ marginTop: 14, fontWeight: 1200, fontSize: 38, lineHeight: 1.05, color: "#3a332b" }}>Sign in / Sign up</div>
        <div style={{ marginTop: 10, opacity: 0.7, fontWeight: 900 }}>Choose a method to continue.</div>

        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          <button type="button" disabled={!!busy} onClick={() => oauth("google")} style={{ width: "100%", border: "1px solid rgba(0,0,0,0.12)", background: "#fff", borderRadius: 14, padding: "14px 14px", fontWeight: 1100, cursor: busy ? "not-allowed" : "pointer" }}>
            {busy === "google" ? "Opening Google..." : "Continue with Google"}
          </button>

          <button type="button" disabled={!!busy} onClick={() => oauth("apple")} style={{ width: "100%", border: "1px solid rgba(0,0,0,0.12)", background: "#fff", borderRadius: 14, padding: "14px 14px", fontWeight: 1100, cursor: busy ? "not-allowed" : "pointer" }}>
            {busy === "apple" ? "Opening Apple..." : "Continue with Apple"}
          </button>

          <Link href="/auth/login" style={{ display: "block", textAlign: "center", width: "100%", border: 0, background: "#4b443b", color: "#fff", borderRadius: 999, padding: "14px 14px", fontWeight: 1100, textDecoration: "none" }}>
            Continue with Email
          </Link>
        </div>

        {err ? <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", border: "1px solid rgba(220,0,0,0.20)", fontWeight: 1000 }}>{err}</div> : null}
        <div style={{ marginTop: 14, opacity: 0.75, fontWeight: 900 }}>By continuing you agree to Terms &amp; Privacy</div>
      </div>
    </div>
  );
}
