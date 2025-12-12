import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

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

  const origin = useMemo(() => (typeof window !== "undefined" ? window.location.origin : ""), []);
  const callbackUrl = useMemo(() => {
    const u = new URL(`${origin}/auth/callback`);
    u.searchParams.set("intent", intent);
    u.searchParams.set("returnTo", returnTo);
    return u.toString();
  }, [origin, intent, returnTo]);

  function openMail(app) {
    if (typeof window === "undefined") return;
    const map = {
      gmail: "googlegmail://",
      outlook: "ms-outlook://",
      apple: "message://",
    };
    window.location.href = map[app] || "mailto:";
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
        <h1 className="authTitle">Confirm your email</h1>

        <p className="authSub">
          We sent you a secure login link to <b>{email || "your email"}</b>.
          <br />
          Tap the link in your email to sign in.
        </p>

        <div className="authRow">
          <button className="authBtnGhost" type="button" onClick={() => openMail("apple")}>Open Mail</button>
          <button className="authBtnGhost" type="button" onClick={() => openMail("gmail")}>Gmail</button>
          <button className="authBtnGhost" type="button" onClick={() => openMail("outlook")}>Outlook</button>
        </div>

        <div className="authDivider"><span>or enter 6-digit code</span></div>

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
              {resending ? "Resending…" : "Resend email"}
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
