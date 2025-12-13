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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const callbackUrl = useMemo(() => {
    const base = getSiteUrl();
    const u = new URL("/auth/callback", base);
    u.searchParams.set("intent", intent);
    u.searchParams.set("returnTo", returnTo);
    return u.toString();
  }, [intent, returnTo]);

  useEffect(() => setError(""), [email]);

  async function sendLink(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

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
      setLoading(false);
    }
  }

  return (
    <div className="authShell">
      <div className="authCard">
        <div className="authBrand">WORKLY</div>
        <h1 className="authTitle">Sign in with email</h1>
        <p className="authSub">
          We’ll email you a secure sign-in link.
          <br />
          No password, no code.
        </p>

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

          <button className="authBtn" type="submit" disabled={loading || !email.trim()}>
            {loading ? "Sending…" : "Continue"}
          </button>

          <div className="authFoot">
            By continuing, you agree to our terms and privacy policy.
          </div>
        </form>
      </div>
    </div>
  );
}
