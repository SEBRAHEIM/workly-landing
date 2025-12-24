import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function VerifyPage() {
  const router = useRouter();
  const email = useMemo(() => String(router.query.email || "").trim(), [router.query.email]);

  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const submit = async () => {
    setErr("");
    const token = String(code || "").replace(/\s+/g, "");
    if (!email) {
      setErr("missing_email");
      return;
    }
    if (token.length !== 6) {
      setErr("code_must_be_6_digits");
      return;
    }
    setBusy(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email"
      });
      if (error) throw error;
      if (!data?.session) {
        const { data: s2 } = await supabase.auth.getSession();
        if (!s2?.session) throw new Error("no_session_after_verify");
      }
      window.location.href = "/auth/profile";
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
          Enter the 6-digit code we sent to your email.
        </div>

        <div style={{ marginTop: 18, fontWeight: 1000, opacity: 0.7 }}>Email</div>
        <div style={{ marginTop: 8, padding: 12, borderRadius: 14, background: "rgba(200,200,0,0.15)", border: "1px solid rgba(0,0,0,0.10)", fontWeight: 1000 }}>
          {email || "missing email"}
        </div>

        <div style={{ marginTop: 16, fontWeight: 1000, opacity: 0.7 }}>Verification code</div>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="123456"
          style={{
            marginTop: 8,
            width: "100%",
            padding: "14px 14px",
            borderRadius: 14,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "#fff",
            fontWeight: 1100,
            fontSize: 20,
            letterSpacing: 6,
            textAlign: "center"
          }}
        />

        {err ? (
          <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", border: "1px solid rgba(220,0,0,0.20)", fontWeight: 1000 }}>
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
            border: "0",
            background: busy ? "rgba(75,68,59,0.45)" : "#4b443b",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: 999,
            fontWeight: 1100,
            cursor: busy ? "not-allowed" : "pointer"
          }}
        >
          {busy ? "Please wait..." : "Verify"}
        </button>

        <div style={{ marginTop: 14, opacity: 0.75, fontWeight: 900 }}>
          After verification you will choose role + username.
        </div>
      </div>
    </div>
  );
}
