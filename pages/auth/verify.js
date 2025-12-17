import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function VerifyPage() {
  const router = useRouter();

  const qEmail = useMemo(() => {
    const v = router.query?.email;
    return v ? String(v) : "";
  }, [router.query]);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.sessionStorage.getItem("workly_email") || "";
    const finalEmail = qEmail || stored;
    if (finalEmail) {
      setEmail(finalEmail);
      window.sessionStorage.setItem("workly_email", finalEmail);
    }
  }, [qEmail]);

  const canSubmit = email && code.replace(/\D/g, "").length === 6 && !busy;

  const goNext = async () => {
    const { data: sData } = await supabase.auth.getSession();
    const token = sData?.session?.access_token || "";

    if (!token) {
      router.replace("/auth");
      return;
    }

    const r = await fetch("/api/market/profile", {
      headers: { authorization: `Bearer ${token}` }
    });
    const j = await r.json().catch(() => ({}));

    const role = j?.profile?.role || "";
    if (role === "student") {
      window.location.href = "/student";
      return;
    }
    if (role === "creator") {
      window.location.href = "/creator";
      return;
    }
    window.location.href = "/auth/role";
  };

  const verify = async () => {
    setErr("");
    const clean = code.replace(/\D/g, "");
    if (!email) {
      setErr("Missing email.");
      return;
    }
    if (clean.length !== 6) {
      setErr("Enter the 6-digit code.");
      return;
    }

    setBusy(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: clean,
        type: "email"
      });

      if (error) {
        setErr(error.message || "Verification failed.");
        return;
      }

      await goNext();
    } catch (e) {
      setErr(String(e?.message || e || "Verification failed."));
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    setErr("");
    if (!email) {
      setErr("Missing email.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        setErr(error.message || "Could not resend code.");
        return;
      }
    } catch (e) {
      setErr(String(e?.message || e || "Could not resend code."));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <div style={{ fontWeight: 1100, letterSpacing: 6, opacity: 0.7 }}>WORKLY</div>
      <h1 style={{ marginTop: 14, marginBottom: 8, fontSize: 44, fontWeight: 1200 }}>Verify your email</h1>
      <div style={{ opacity: 0.75, fontWeight: 900 }}>
        Enter the 6-digit code we sent to your email.
      </div>

      {err ? (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", fontWeight: 900 }}>
          {err}
        </div>
      ) : null}

      <div style={{ marginTop: 18 }}>
        <div style={{ opacity: 0.7, fontWeight: 900, marginBottom: 8 }}>Email</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputMode="email"
          placeholder="you@example.com"
          style={{ width: "100%", padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.14)", background: "rgba(255,240,120,0.35)", fontWeight: 950 }}
        />
      </div>

      <div style={{ marginTop: 14 }}>
        <div style={{ opacity: 0.7, fontWeight: 900, marginBottom: 8 }}>Verification code</div>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          inputMode="numeric"
          placeholder="123456"
          style={{ width: "100%", padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.14)", background: "#fff", fontWeight: 1100, letterSpacing: 8, textAlign: "center" }}
        />
      </div>

      <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={() => router.back()}
          style={{ border: "none", background: "transparent", fontWeight: 1100, cursor: "pointer", textDecoration: "underline" }}
        >
          Back
        </button>

        <button
          type="button"
          onClick={resend}
          disabled={busy || !email}
          style={{ border: "none", background: "transparent", fontWeight: 1100, cursor: "pointer", textDecoration: "underline", opacity: busy || !email ? 0.5 : 1 }}
        >
          Resend code
        </button>
      </div>

      <button
        type="button"
        disabled={!canSubmit}
        onClick={verify}
        style={{
          marginTop: 12,
          width: "100%",
          padding: "16px 18px",
          borderRadius: 999,
          border: "1px solid rgba(0,0,0,0.12)",
          background: "#6f8f7d",
          color: "#fff",
          fontWeight: 1200,
          cursor: canSubmit ? "pointer" : "not-allowed",
          opacity: canSubmit ? 1 : 0.7
        }}
      >
        {busy ? "Please wait..." : "Continue"}
      </button>

      <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <Link href="/auth/forgot-password" style={{ fontWeight: 1000, textDecoration: "none" }}>Forgot password?</Link>
        <Link href="/auth" style={{ fontWeight: 1000, textDecoration: "none" }}>Back to options</Link>
      </div>

      <div style={{ marginTop: 10, opacity: 0.65, fontWeight: 900 }}>
        By continuing you agree to Terms & Privacy
      </div>
    </div>
  );
}
