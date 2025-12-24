import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function SetPassword() {
  const router = useRouter();
  const email = useMemo(() => String(router.query.email || "").trim().toLowerCase(), [router.query.email]);

  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    try {
      const p = sessionStorage.getItem(`workly_pending_password:${email}`) || "";
      if (p && p.length >= 8) setPass(p);
    } catch {}
  }, [email]);

  const clearPending = () => {
    try { sessionStorage.removeItem(`workly_pending_password:${email}`); } catch {}
  };

  const submit = async () => {
    setErr("");
    const p = String(pass || "");
    if (p.length < 8) {
      setErr("Password must be at least 8 characters");
      return;
    }

    setBusy(true);
    try {
      for (let i = 0; i < 20; i++) {
        const { data: s } = await supabase.auth.getSession();
        if (s?.session?.access_token) break;
        await new Promise((r) => setTimeout(r, 150));
      }

      const { data: s2 } = await supabase.auth.getSession();
      if (!s2?.session?.access_token) {
        setErr("Session missing. Refresh and verify again.");
        return;
      }

      const ctrl = new AbortController();
      const to = setTimeout(() => ctrl.abort(), 8000);
      try {
        const { error } = await supabase.auth.updateUser({ password: p });
        if (error) throw error;
      } finally {
        clearTimeout(to);
      }

      clearPending();
      router.replace("/dashboard");
    } catch (e) {
      const msg = String(e?.message || e || "");
      if (msg.toLowerCase().includes("abort") || msg.toLowerCase().includes("timeout")) {
        setErr("Saving password is taking too long. Refresh and try again.");
      } else {
        setErr("Could not save password. Refresh and try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ece9e2", padding: 24 }}>
      <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ fontWeight: 1100, letterSpacing: 4, opacity: 0.75 }}>WORKLY</div>
          <Link href="/auth/login" style={{ textDecoration: "none", fontWeight: 1000 }}>✕</Link>
        </div>

        <div style={{ marginTop: 14, fontWeight: 1200, fontSize: 34, lineHeight: 1.05, color: "#3a332b" }}>Set your password</div>
        <div style={{ marginTop: 10, opacity: 0.7, fontWeight: 900 }}>You’ll use this password to sign in next time.</div>

        <div style={{ marginTop: 18, fontWeight: 1000, opacity: 0.7 }}>Password</div>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          style={{ marginTop: 8, width: "100%", padding: "14px 14px", borderRadius: 14, border: "1px solid rgba(0,0,0,0.15)", background: "#fff", fontWeight: 1100, fontSize: 18 }}
        />

        {err ? <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", border: "1px solid rgba(220,0,0,0.20)", fontWeight: 1000 }}>{err}</div> : null}

        <button
          type="button"
          disabled={busy}
          onClick={submit}
          style={{ marginTop: 14, width: "100%", border: 0, background: busy ? "rgba(75,68,59,0.45)" : "#4b443b", color: "#fff", padding: "14px 18px", borderRadius: 999, fontWeight: 1100, cursor: busy ? "not-allowed" : "pointer" }}
        >
          {busy ? "Please wait..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
