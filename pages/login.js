import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import BackToWorklyLink from "@/components/BackToWorklyLink";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    const user = data.user;
    if (!user) {
      setError("Unable to load user after login.");
      return;
    }

    const role = user.user_metadata?.role || "student";

    if (role === "creator") {
      router.push("/dashboard/creator");
    } else {
      router.push("/dashboard/student");
    }
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);
    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo }
      });
      if (error) {
        setError(error.message);
        setGoogleLoading(false);
      }
    } catch (e) {
      setError("Could not start Google login.");
      setGoogleLoading(false);
    }
  }

  return (
    <div className="auth-shell">
      <BackToWorklyLink />
      <div className="auth-card login-card">
        <h1>Log in</h1>
        <p className="auth-intro">
          Enter your email and password, or continue with Google.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="auth-input"
              type="email"
              placeholder="you@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="auth-input"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="auth-hint" style={{ color: "#b91c1c" }}>
              {error}
            </div>
          )}
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

        <div className="login-or">or continue with</div>

        <button
          type="button"
          className="auth-button auth-google-button"
          onClick={handleGoogle}
          disabled={googleLoading}
        >
          <span className="google-pill">
            <span className="google-icon">
              <span className="google-icon-inner" />
            </span>
            <span>
              {googleLoading ? "Connecting to Google…" : "Continue with Google"}
            </span>
          </span>
        </button>

        <div className="auth-switch" style={{ marginTop: 10 }}>
          <span>Need an account?</span>
          <button type="button" onClick={() => router.push("/signup")}>
            Sign up as student or creator
          </button>
        </div>
      </div>
    </div>
  );
}
