import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const returnTo = (router.query.returnTo || "/").toString();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const cleanEmail = useMemo(() => email.trim().toLowerCase(), [email]);

  async function afterAuthRedirect() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.replace("/");

    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!profile) return router.replace("/onboarding");
    return router.replace(returnTo || "/");
  }

  async function signIn(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!cleanEmail || !cleanEmail.includes("@")) throw new Error("Enter a valid email.");
      if (!password) throw new Error("Enter your password.");

      const { error: err } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (err) throw err;
      await afterAuthRedirect();
    } catch (e2) {
      setError("Couldn’t sign in. If you’re new, use the email code option below.");
    } finally {
      setLoading(false);
    }
  }

  async function continueWithCode() {
    setError("");
    setSending(true);
    try {
      if (!cleanEmail || !cleanEmail.includes("@")) throw new Error("Enter a valid email.");

      const { error: err } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          shouldCreateUser: true,
        },
      });

      if (err) throw err;

      router.replace({
        pathname: "/auth/verify",
        query: { email: cleanEmail, returnTo },
      });
    } catch (e2) {
      setError(e2?.message || "Could not send code. Try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="authShell">
      <div className="authCard">
        <div className="authBrand">WORKLY</div>
        <h1 className="authTitle">Sign in</h1>
        <p className="authSub">Existing users sign in with password. New users use an email code once, then set a password.</p>

        <form onSubmit={signIn} className="authForm">
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

          <label className="authLabel">Password</label>
          <input
            className="authInput"
            type="password"
            autoComplete="current-password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <div className="authError">{error}</div> : null}

          <button className="authBtn" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <button className="authBtnGhost" type="button" onClick={continueWithCode} disabled={sending}>
            {sending ? "Sending code…" : "New here? Continue with email code"}
          </button>
        </form>
      </div>
    </div>
  );
}
