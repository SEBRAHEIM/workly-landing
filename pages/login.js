import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import BackToWorklyLink from "@/components/BackToWorklyLink";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAfterLoginRedirect = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
      router.replace("/");
      return;
    }

    const role =
      data.user.user_metadata?.role ||
      data.user.app_metadata?.role ||
      "student";

    if (role === "creator") {
      router.replace("/dashboard/creator");
    } else {
      router.replace("/dashboard/student");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || "Something went wrong. Try again.");
      return;
    }

    await handleAfterLoginRedirect();
  };

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setLoading(false);
      setErrorMsg(error.message || "Google login failed. Try again.");
    }
  };

  return (
    <div className="auth-shell">
      <BackToWorklyLink />
      <div className="auth-card">
        <h1>Log in</h1>
        <p className="auth-sub">
          Enter your email and password, or continue with Google.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input
            className="auth-input"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            className="auth-input"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="auth-primary-btn"
            disabled={loading}
          >
            {loading ? "Logging in…" : "Continue"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <button
          type="button"
          className="auth-google-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
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

        <p className="auth-footer-text">
          Need an account?{" "}
          <a href="/signup" className="auth-footer-link">
            Sign up as student or creator.
          </a>
        </p>
      </div>
    </div>
  );
}
