import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function CheckEmail() {
  const router = useRouter();
  const email = useMemo(() => String(router.query.email || "").trim().toLowerCase(), [router.query.email]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const resend = async () => {
    setErr("");
    setMsg("");
    if (!email.includes("@")) {
      setErr("Missing email");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.resend({ type: "signup", email });
      if (error) throw error;
      setMsg("Verification email re-sent. Check your inbox/spam.");
    } catch (e) {
      setErr(String(e?.message || e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#ece9e2", padding: 24 }}>
      <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ fontWeight: 1100, letterSpacing: 4, opacity: 0.75 }}>WORKLY</div>
          <Link href="/auth" style={{ textDecoration: "none", fontWeight: 1000 }}>✕</Link>
        </div>

        <div style={{ marginTop: 14, fontWeight: 1200, fontSize: 34, lineHeight: 1.05, color: "#3a332b" }}>
          Verify your email
        </div>
        <div style={{ marginTop: 10, opacity: 0.7, fontWeight: 900 }}>
          We sent a verification link to your email. You must verify before continuing.
        </div>

        <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: "rgba(200,200,0,0.15)", border: "1px solid rgba(0,0,0,0.10)", fontWeight: 1000 }}>
          {email || "missing email"}
        </div>

        {msg ? (
          <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(0,160,0,0.10)", border: "1px solid rgba(0,160,0,0.25)", fontWeight: 1000 }}>
            {msg}
          </div>
        ) : null}

        {err ? (
          <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", border: "1px solid rgba(220,0,0,0.20)", fontWeight: 1000 }}>
            {err}
          </div>
        ) : null}

        <button
          type="button"
          disabled={busy}
          onClick={resend}
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
          {busy ? "Sending..." : "Resend verification email"}
        </button>

        <button
          type="button"
          onClick={() => window.location.href = "/auth/login"}
          style={{
            marginTop: 10,
            width: "100%",
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#fff",
            color: "#4b443b",
            padding: "12px 14px",
            borderRadius: 999,
            fontWeight: 1100,
            cursor: "pointer"
          }}
        >
          I verified, let me sign in
        </button>
      </div>
    </div>
  );
}
