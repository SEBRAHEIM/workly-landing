import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function EmailAuth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const returnTo = useMemo(() => {
    const rt = typeof router.query.returnTo === "string" ? router.query.returnTo : "/";
    return rt || "/";
  }, [router.query.returnTo]);

  const intent = useMemo(() => {
    const i = typeof router.query.intent === "string" ? router.query.intent : "";
    return i || "";
  }, [router.query.intent]);

  const sendCode = async (e) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) return setError("Enter your email.");

    setBusy(true);
    try {
      const base = typeof window !== "undefined" ? window.location.origin : "";
      const emailRedirectTo = `${base}/auth/callback?returnTo=${encodeURIComponent(returnTo)}${intent ? `&intent=${encodeURIComponent(intent)}` : ""}`;

      const { error: err } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          shouldCreateUser: true,
          emailRedirectTo,
        },
      });

      if (err) throw err;

      router.push(`/auth/verify?email=${encodeURIComponent(email.trim())}&returnTo=${encodeURIComponent(returnTo)}`);
    } catch (err) {
      setError(err?.message || "Could not send code.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Continue with email</title>
      </Head>

      <div className="auth-flow-page">
        <div className="auth-flow-card">
          <div className="auth-flow-top">
            <div className="auth-flow-brand">WORKLY</div>
            <h1 className="auth-flow-title">Continue with your email</h1>
            <p className="auth-flow-subtitle">We’ll email you a 6-digit verification code.</p>
          </div>

          <form className="auth-flow-form" onSubmit={sendCode}>
            <label className="auth-flow-label" htmlFor="email">Email</label>
            <input
              id="email"
              className="auth-flow-input"
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              inputMode="email"
            />

            {error ? <div className="auth-flow-error">{error}</div> : null}

            <button className="auth-flow-primary-btn" type="submit" disabled={busy}>
              {busy ? "Sending..." : "Continue"}
            </button>

            <button
              className="auth-flow-secondary-link"
              type="button"
              onClick={() => router.push(returnTo || "/")}
            >
              Go back
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
