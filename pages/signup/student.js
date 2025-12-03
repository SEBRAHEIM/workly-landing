import { useState } from "react";
import { useRouter } from "next/router";
import BackToWorklyLink from "@/components/BackToWorklyLink";
import { supabase } from "@/lib/supabaseClient";

export default function StudentEmailSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (typeof window !== "undefined" ? window.location.origin : "");

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role: "student" },
          emailRedirectTo: siteUrl
            ? `${siteUrl}/auth/verify-email?role=student`
            : undefined,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      router.push(
        `/auth/verify-email?role=student&email=${encodeURIComponent(email)}`
      );
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <BackToWorklyLink />
      <div className="auth-card signup-card">
        <h1 className="auth-title">Create your student account</h1>
        <p className="auth-subtitle">
          Enter your details below or choose a different signup option.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              className="auth-input"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              className="auth-input"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Confirm password</label>
            <input
              type="password"
              className="auth-input"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="auth-primary-btn"
            disabled={loading}
          >
            {loading ? "Sending code…" : "Create account"}
          </button>

          <p className="auth-secondary-text">
            Already have an account?{" "}
            <a href="/login" className="auth-link">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
