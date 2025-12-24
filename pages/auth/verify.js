import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function VerifyPage() {
  const router = useRouter();
  const email = useMemo(() => String(router.query.email || "").trim().toLowerCase(), [router.query.email]);

  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [resendBusy, setResendBusy] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const getPendingPassword = () => {
    try { return sessionStorage.getItem(`workly_pending_password:${email}`) || ""; } catch { return ""; }
  };

  const clearPendingPassword = () => {
    try { sessionStorage.removeItem(`workly_pending_password:${email}`); } catch {}
  };

  const resend = async () => {
    setErr("");
    setOk("");
    if (!email.includes("@")) {
      setErr("Missing email");
      return;
    }
    setResendBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
      if (error) throw error;
      setOk("New code sent. Check your email.");
    } catch (e) {
      setErr(String(e?.message || e));
    } finally {
      setResendBusy(false);
    }
  };

  const submit = async () => {
    setErr("");
    setOk("");
    const token = String(code || "").replace(/\s+/g, "");
    if (!email.includes("@")) {
      setErr("Missing email");
      return;
    }
    const pendingPass = getPendingPassword();
    if (!pendingPass || pendingPass.length < 8) {
      setErr("Missing password. Go back and try again.");
      return;
    }
    if (token.length !== 6) {
      setErr("Code must be 6 digits.");
      return;
    }

    setBusy(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
      if (error) throw error;

      const access_token = data?.session?.access_token || "";
      const refresh_token = data?.session?.refresh_token || "";
      if (access_token && refresh_token) {
        const { error: setErr2 } = await supabase.auth.setSession({ access_token, refresh_token });
        if (setErr2) throw setErr2;
      }

      const { data: s2 } = await supabase.auth.getSession();
      if (!s2?.session?.access_token) throw new Error("no_session_after_verify");

      const { error: upErr } = await supabase.auth.updateUser({ password: pendingPass });
      if (upErr) throw upErr;

      clearPendingPassword();
      window.location.href = "/auth/profile";
    } catch (e3) {
      const msg = String(e3?.message || e3);
      if (msg.toLowerCase().includes("expired") || msg.toLowerCase().includes("invalid")) {
        setErr("Code is invalid/expired. Tap Resend code and try again.");
      } else {
        setErr(msg);
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

        <div style={{ marginTop: 14, fontWeight: 1200, fontSize: 34, lineHeight: 1.05, color: "#3a332b" }}>Verify your email</div>
        <div style={{ marginTop: 10, opacity: 0.7, fontWeight: 900 }}>Paste the 6-digit code we sent to your email.</div>

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

        {ok ? <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(0,160,0,0.10)", border: "1px solid rgba(0,160,0,0.25)", fontWeight: 1000 }}>{ok}</div> : null}
        {err ? <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", border: "1px solid rgba(220,0,0,0.20)", fontWeight: 1000 }}>{err}</div> : null}

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
          {busy ? "Please wait..." : "Verify"}
        </button>

        <button
          type="button"
          disabled={resendBusy}
          onClick={resend}
          style={{
            marginTop: 10,
            width: "100%",
            border: "1px solid rgba(0,0,0,0.12)",
            background: "#fff",
            color: "#4b443b",
            padding: "12px 14px",
            borderRadius: 999,
            fontWeight: 1100,
            cursor: resendBusy ? "not-allowed" : "pointer"
          }}
        >
          {resendBusy ? "Sending..." : "Resend code"}
        </button>
      </div>
    </div>
  );
}
