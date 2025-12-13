import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

function getSiteUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  return process.env.NEXT_PUBLIC_SITE_URL || "https://workly.day";
}

export default function EmailAuthPage() {
  const router = useRouter();
  const intent = (router.query.intent || "student").toString();
  const returnTo = (router.query.returnTo || "/").toString();

  const [email, setEmail] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingOAuth, setLoadingOAuth] = useState("");
  const [error, setError] = useState("");

  const callbackUrl = useMemo(() => {
    const base = getSiteUrl();
    const u = new URL("/auth/callback", base);
    u.searchParams.set("intent", intent);
    u.searchParams.set("returnTo", returnTo);
    return u.toString();
  }, [intent, returnTo]);

  useEffect(() => setError(""), [email]);

  async function startOAuth(provider) {
    setError("");
    setLoadingOAuth(provider);
    try {
      if (!supabase) throw new Error("Supabase not configured.");
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: callbackUrl },
      });
      if (err) throw err;
    } catch (e) {
      setError(e?.message || "OAuth failed. Try again.");
      setLoadingOAuth("");
    }
  }

  async function sendLink(e) {
    e.preventDefault();
    setError("");
    setLoadingEmail(true);
    try {
      if (!supabase) throw new Error("Supabase not configured.");
      const cleaned = email.trim().toLowerCase();
      if (!cleaned || !cleaned.includes("@")) throw new Error("Enter a valid email.");

      const { error: err } = await supabase.auth.signInWithOtp({
        email: cleaned,
        options: { shouldCreateUser: true, emailRedirectTo: callbackUrl },
      });
      if (err) throw err;

      router.replace({
        pathname: "/auth/verify",
        query: { email: cleaned, intent, returnTo },
      });
    } catch (e2) {
      setError(e2?.message || "Could not send email. Try again.");
    } finally {
      setLoadingEmail(false);
    }
  }

  return (
    <div className="authShell">
      <div className="authCard">
        <div className="authBrand">WORKLY</div>
        <h1 className="authTitle">Welcome back</h1>
        <p className="authSub">Sign in to continue.</p>

        <div className="authActions">
          <button
            className="authBtn authBtnWide"
            type="button"
            onClick={() => startOAuth("google")}
            disabled={!!loadingOAuth}
          >
            {loadingOAuth === "google" ? "Connecting…" : "Continue with Google"}
          </button>

          <button
            className="authBtnGhost authBtnWide"
            type="button"
            onClick={() => startOAuth("apple")}
            disabled={!!loadingOAuth}
          >
            {loadingOAuth === "apple" ? "Connecting…" : "Continue with Apple"}
          </button>
        </div>

        <div className="authDivider"><span>or</span></div>

        <form onSubmit={sendLink} className="authForm">
          <label className="authLabel">Email</label>
          <input
            className="authInput"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error ? <div className="authError">{error}</div> : null}

          <button className="authBtn" type="submit" disabled={loadingEmail || !email.trim()}>
            {loadingEmail ? "Sending…" : "Email me a sign-in link"}
          </button>

          <div className="authFoot">We use secure magic links (no passwords).</div>
        </form>
      </div>
    </div>
  );
}
