import { useState } from "react";
import { useRouter } from "next/router";
import BackToWorklyLink from "@/components/BackToWorklyLink";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // If the user came from the verification email, Supabase redirects to:
  // https://workly.day/login?verified=1
  const isVerified =
    router.query.verified === "1" || router.query.verified === "true";

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoadingEmail(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoadingEmail(false);

    if (error) {
      setErrorMsg(error.message || "Incorrect email or password.");
      return;
    }

      // Decide where to send them based on stored role
    const role = data.user?.user_metadata?.role || "student";
    router.replace(`/dashboard/${role}`);
  };

  const handleGoogleLogin = async () => {
    try {
      setErrorMsg("");
      setLoadingGoogle(true);

      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const redirectTo = origin ? `${origin}/auth/callback` : undefined;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });

      if (error) {
        setErrorMsg(error.message || "Something went wrong with Google login.");
        setLoadingGoogle(false);
      }
      // On success, Supabase will redirect away; we don't clear loading here.
    } catch (err) {
      setLoadingGoogle(false);
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-shell">
      <BackToWorklyLink />

      <div
        className="auth-card"
        style={{
          maxWidth: 520,
          margin: "72px auto 80px",
        }}
      >
        {isVerified && (
          <div
            style={{
              marginBottom: 16,
              padding: "10px 12px",
              borderRadius: 12,
              fontSize: 14,
              background: "rgba(34,197,94,0.1)",
              color: "#166534",
              border: "1px solid rgba(34,197,94,0.4)",
            }}
          >
            Email verified successfully. You can now log in to your Workly
            account.
          </div>
        )}

        <h1>Log in</h1>
        <p className="auth-sub">
          Enter your email and password, or continue with Google.
        </p>

        <form onSubmit={handleEmailLogin} className="auth-form">
          <label>Email</label>
          <input
            className="auth-input"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            className="auth-input"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="auth-primary-btn"
            disabled={loadingEmail}
          >
            {loadingEmail ? "Signing in…" : "Continue"}
          </button>

          {errorMsg && (
            <p
              style={{
                marginTop: 12,
                fontSize: 14,
                color: "#ef4444",
              }}
            >
              {errorMsg}
            </p>
          )}
        </form>

        <div
          style={{
            marginTop: 18,
            marginBottom: 6,
            fontSize: 13,
            color: "rgba(15,23,42,0.6)",
          }}
        >
          or continue with
        </div>

        <button
          type="button"
          className="auth-google-button"
          onClick={handleGoogleLogin}
          disabled={loadingGoogle}
        >
          <span className="google-icon">
            <span className="google-icon-inner" />
          </span>
          {loadingGoogle ? "Connecting to Google…" : "Continue with Google"}
        </button>

        <p
          style={{
            marginTop: 18,
            fontSize: 14,
            color: "rgba(15,23,42,0.7)",
          }}
        >
          Need an account?{" "}
          <a
            href="/signup"
            style={{ color: "#4f46e5", textDecoration: "underline" }}
          >
            Sign up as student or creator.
          </a>
        </p>
      </div>
    </div>
  );
}
