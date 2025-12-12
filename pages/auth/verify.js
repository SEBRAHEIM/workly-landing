import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { getNextOnboardingPath } from "../../lib/onboarding";

function clampDigits(s) {
  return (s || "").replace(/\D/g, "").slice(0, 6);
}

export default function VerifyEmail() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  const email = useMemo(() => (typeof router.query.email === "string" ? router.query.email : ""), [router.query.email]);
  const returnTo = useMemo(() => (typeof router.query.returnTo === "string" ? router.query.returnTo : "/"), [router.query.returnTo]);

  useEffect(() => {
    if (!code) return;
    const digits = clampDigits(code);
    if (digits.length === 6) {
      // auto-submit
      verify(digits);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const setDigit = (idx, val) => {
    const digits = clampDigits((val || "").slice(-1));
    const arr = code.padEnd(6, " ").split("");
    arr[idx] = digits ? digits : " ";
    const next = arr.join("").replace(/\s/g, "");
    setCode(next);

    if (digits && inputsRef.current[idx + 1]) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const onKeyDown = (idx, e) => {
    if (e.key === "Backspace" && (!code[idx] || code.length <= idx)) {
      if (inputsRef.current[idx - 1]) inputsRef.current[idx - 1].focus();
    }
  };

  const resend = async () => {
    setError("");
    if (!email) return setError("Missing email.");
    setBusy(true);
    try {
      const base = typeof window !== "undefined" ? window.location.origin : "";
      const emailRedirectTo = `${base}/auth/callback?returnTo=${encodeURIComponent(returnTo || "/")}`;

      const { error: err } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          shouldCreateUser: true,
          emailRedirectTo,
        },
      });

      if (err) throw err;
    } catch (err) {
      setError(err?.message || "Could not resend code.");
    } finally {
      setBusy(false);
    }
  };

  const verify = async (digits = code) => {
    setError("");
    if (!email) return setError("Missing email.");
    if (clampDigits(digits).length !== 6) return setError("Enter the 6-digit code.");
    setBusy(true);

    try {
      const { data, error: err } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: clampDigits(digits),
        type: "email",
      });

      if (err) throw err;

      const user = data?.user;
      const next = getNextOnboardingPath(user, returnTo || "/");
      router.replace(next);
    } catch (err) {
      setError(err?.message || "Invalid code.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Confirm your email</title>
      </Head>

      <div className="auth-flow-page">
        <div className="auth-flow-card">
          <div className="auth-flow-top">
            <div className="auth-flow-brand">WORKLY</div>
            <h1 className="auth-flow-title">Confirm your email</h1>
            <p className="auth-flow-subtitle">
              Enter the verification code we emailed to: <b>{email || "your email"}</b>
            </p>
          </div>

          <div className="auth-flow-otp-row" aria-label="Verification code">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                className="auth-flow-otp-input"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={code[i] || ""}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => onKeyDown(i, e)}
                disabled={busy}
              />
            ))}
          </div>

          {error ? <div className="auth-flow-error">{error}</div> : null}

          <button className="auth-flow-primary-btn" type="button" onClick={() => verify(code)} disabled={busy}>
            {busy ? "Submitting..." : "Submit"}
          </button>

          <button className="auth-flow-secondary-link" type="button" onClick={resend} disabled={busy}>
            Resend code
          </button>

          <button className="auth-flow-secondary-link" type="button" onClick={() => router.push(`/auth/email?returnTo=${encodeURIComponent(returnTo || "/")}`)} disabled={busy}>
            Use a different email
          </button>
        </div>
      </div>
    </>
  );
}
