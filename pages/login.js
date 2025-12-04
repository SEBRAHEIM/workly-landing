import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BackToWorklyLink from "@/components/BackToWorklyLink";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [verifiedBanner, setVerifiedBanner] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const v = router.query.verified;
    if (v === "1" || v === "true") {
      setVerifiedBanner(true);
    }
  }, [router.isReady, router.query.verified]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || "Something went wrong. Try again.");
      return;
    }

    const user = data?.user;
    const role =
      user?.user_metadata?.role === "creator" ? "creator" : "student";

    router.replace(`/dashboard/${role}`);
  };

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback`
          : undefined,
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="auth-shell">
      <BackToWorklyLink />

      {verifiedBanner && (
        <div className="auth-banner auth-banner-success">
          <span>Your email is verified. You can log in now.</span>
        </div>
      )}

      <div className="auth-card login-card">
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
            disabled={loading}
          >
            {loading ? "Signing in…" : "Continue"}
          </button>
        </form>

        <button
          type="button"
          className="auth-google-button"
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{ marginTop: 16 }}
        >
          Continue with Google
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

        <p
          style={{
            marginTop: 16,
            fontSize: 14,
            color: "rgba(15,23,42,0.7)",
          }}
        >
          Need an account?{" "}
          <a href="/signup" style={{ textDecoration: "underline" }}>
            Sign up as student or creator
          </a>
          .
        </p>
      </div>
    </div>
  );
}
