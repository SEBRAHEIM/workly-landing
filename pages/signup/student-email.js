import { useState } from "react";
import { useRouter } from "next/router";
import BackToWorklyLink from "@/components/BackToWorklyLink";
import { supabase } from "@/lib/supabaseClient";

export default function StudentEmailSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: "student", primary_role: "student" }
      }
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (!data?.session) {
      setMessage("Check your email to confirm your account.");
      return;
    }

    router.push("/signup/student-details");
  }

  return (
    <div className="auth-shell">
      <BackToWorklyLink />
      <div className="auth-card login-card">
        <h1>Create your student account</h1>
        <p className="auth-intro">
          Enter your details below or head back to choose a different signup
          option.
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
          {message && (
            <div className="auth-hint" style={{ color: "#059669" }}>
              {message}
            </div>
          )}
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className="auth-switch" style={{ marginTop: 10 }}>
          <span>Already have an account?</span>
          <button type="button" onClick={() => router.push("/login")}>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
