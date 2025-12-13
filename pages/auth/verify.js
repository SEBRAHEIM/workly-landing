import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

function getSiteUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  return process.env.NEXT_PUBLIC_SITE_URL || "https://workly.day";
}

export default function VerifyEmailPage() {
  const router = useRouter();
  const email = (router.query.email || "").toString();
  const intent = (router.query.intent || "student").toString();
  const returnTo = (router.query.returnTo || "/").toString();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const callbackUrl = useMemo(() => {
    const base = getSiteUrl();
    const u = new URL("/auth/callback", base);
    u.searchParams.set("intent", intent);
    u.searchParams.set("returnTo", returnTo);
    return u.toString();
  }, [intent, returnTo]);

  function handleDigit(i, v) {
    const d = (v || "").replace(/\D/g, "").slice(0, 1);
    const next = [...code];
    next[i] = d;
    setCode(next);
    setErr("");
    setMsg("");
    if (d && i < 5) {
      const el = document.querySelector(`[data-otp="${i + 1}"]`);
      el?.focus?.();
    }
  }

  async function resend() {
    setErr("");
    setMsg("");
    setResending(true);
    try {
      if (!email) throw new Error("Missing email.");
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true, emailRedirectTo: callbackUrl },
      });
      if (error) throw error;
      setMsg("Sent! Check your inbox (and spam).");
    } catch (e) {
      setErr(e?.message || "Could not resend. Try again.");
    } finally {
      setResending(false);
    }
  }

  async function submitCode(e) {
    e.preventDefault();
    setErr("");
    setMsg("");
    setSubmitting(true);

    try {
      const token = code.join("");
      if (token.length !== 6) throw new Error("Enter the 6-digit code.");
      if (!email) throw new Error("Missing email.");

      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      });

      if (error) throw error;

      setMsg("Verified. Redirecting…");
      router.replace(returnTo || "/");
    } catch (e2) {
      setErr(e2?.message || "Verification failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="authShell">
      <div className="authCard">
        <div className="authBrand">WORKLY</div>
        <h1 className="authTitle">Enter code</h1>

        <p className="authSub">
          We sent a 6-digit code to <b>{email || "your email"}</b>.
        </p>

        <form onSubmit={submitCode} className="authForm">
          <div className="otpGrid" aria-label="6 digit code">
            {code.map((v, i) => (
              <input
                key={i}
                data-otp={i}
                className="otpBox"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={v}
                onChange={(e) => handleDigit(i, e.target.value)}
              />
            ))}
          </div>

          {err ? <div className="authError">{err}</div> : null}
          {msg ? <div className="authOk">{msg}</div> : null}

          <div className="authRow authRowTight">
            <button className="authBtn" type="submit" disabled={submitting}>
              {submitting ? "Verifying…" : "Submit"}
            </button>
            <button className="authLinkBtn" type="button" onClick={resend} disabled={resending}>
              {resending ? "Resending…" : "Resend code"}
            </button>
          </div>

          <button
            className="authLinkBtn"
            type="button"
            onClick={() => router.replace({ pathname: "/auth/email", query: { intent, returnTo } })}
          >
            Use a different email
          </button>
        </form>
      </div>
    </div>
  );
}
