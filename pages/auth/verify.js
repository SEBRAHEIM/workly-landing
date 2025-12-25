import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

const withTimeout = (p, ms) => {
  let t;
  return Promise.race([
    p,
    new Promise((_, rej) => {
      t = setTimeout(() => rej(new Error("timeout")), ms);
    })
  ]).finally(() => clearTimeout(t));
};

export default function VerifyPage() {
  const router = useRouter();
  const ready = router.isReady;

  const email = useMemo(() => {
    if (!ready) return "";
    return String(router.query.email || "").trim().toLowerCase();
  }, [ready, router.query.email]);

  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [resendBusy, setResendBusy] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    setErr("");
    setOk("");
  }, [email]);

  const resend = async () => {
    if (resendBusy) return;
    setErr("");
    setOk("");
    if (!ready || !email.includes("@")) {
      setErr("Email not ready. Go back and try again.");
      return;
    }
    setResendBusy(true);
    try {
      const r = await withTimeout(
        supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } }),
        10000
      );
      if (r?.error) throw r.error;
      setOk("New code sent. Use the latest email.");
    } catch (e) {
      const m = String(e?.message || e || "");
      setErr(m.toLowerCase().includes("timeout") ? "Resend timed out. Try again." : "Resend failed. Try again.");
    } finally {
      setResendBusy(false);
    }
  };

  const submit = async () => {
    if (busy) return;
    setErr("");
    setOk("");

    if (!ready || !email.includes("@")) {
      setErr("Email not ready. Go back and try again.");
      return;
    }

    const token = String(code || "").replace(/\D/g, "").slice(0, 6);
    if (token.length !== 6) {
      setErr("Code must be 6 digits.");
      return;
    }

    setBusy(true);
    try {
      const tryVerify = async (type) => {
        const r = await withTimeout(
          supabase.auth.verifyOtp({ email, token, type }),
          10000
        );
        if (r?.error) throw r.error;
        return r?.data;
      };

      let data;
      try {
        data = await tryVerify("email");
      } catch (e1) {
        const m1 = String(e1?.message || e1 || "").toLowerCase();
        if (m1.includes("invalid") || m1.includes("expired") || m1.includes("token")) throw e1;
        data = await tryVerify("signup");
      }

      const access_token = data?.session?.access_token || "";
      const refresh_token = data?.session?.refresh_token || "";

      if (access_token && refresh_token) {
        const r2 = await withTimeout(
          supabase.auth.setSession({ access_token, refresh_token }),
          8000
        );
        if (r2?.error) throw r2.error;
      }

      for (let i = 0; i < 20; i++) {
        const { data: s } = await supabase.auth.getSession();
        if (s?.session?.access_token) break;
        await new Promise((r) => setTimeout(r, 150));
      }

      router.replace(`/auth/set-password?email=${encodeURIComponent(email)}`);
    } catch (e) {
      const m = String(e?.message || e || "");
      const ml = m.toLowerCase();
      if (ml.includes("timeout")) setErr("Verification timed out. Try again.");
      else if (ml.includes("expired") || ml.includes("invalid")) setErr("Code is invalid/expired. Tap Resend code and use the latest email.");
      else setErr("Verification failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const onCode = (v) => {
    const digits = String(v || "").replace(/\D/g, "").slice(0, 6);
    setCode(digits);
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
          {ready ? (email || "missing email") : "loading..."}
        </div>

        <div style={{ marginTop: 16, fontWeight: 1000, opacity: 0.7 }}>Verification code</div>
        <input
          value={code.split("").join(" ")}
          onChange={(e) => onCode(e.target.value)}
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="123456"
          disabled={!ready || !email.includes("@")}
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
            textAlign: "center",
            opacity: (!ready || !email.includes("@")) ? 0.6 : 1
          }}
        />

        {ok ? <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(0,160,0,0.10)", border: "1px solid rgba(0,160,0,0.25)", fontWeight: 1000 }}>{ok}</div> : null}
        {err ? <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", border: "1px solid rgba(220,0,0,0.20)", fontWeight: 1000 }}>{err}</div> : null}

        <button
          type="button"
          disabled={busy || !ready || !email.includes("@")}
          onClick={submit}
          style={{
            marginTop: 14,
            width: "100%",
            border: 0,
            background: (busy || !ready || !email.includes("@")) ? "rgba(75,68,59,0.45)" : "#4b443b",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: 999,
            fontWeight: 1100,
            cursor: (busy || !ready || !email.includes("@")) ? "not-allowed" : "pointer"
          }}
        >
          {busy ? "Please wait..." : "Verify"}
        </button>

        <button
          type="button"
          disabled={resendBusy || !ready || !email.includes("@")}
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
            cursor: (resendBusy || !ready || !email.includes("@")) ? "not-allowed" : "pointer",
            opacity: (resendBusy || !ready || !email.includes("@")) ? 0.7 : 1
          }}
        >
          {resendBusy ? "Sending..." : "Resend code"}
        </button>
      </div>
    </div>
  );
}
