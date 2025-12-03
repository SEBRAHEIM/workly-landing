import { useState } from "react";
import BackToWorklyLink from "@/components/BackToWorklyLink";
import { supabase } from "@/lib/supabaseClient";

export default function StudentEmailSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: "student" },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || "Something went wrong. Try again.");
      return;
    }

    // With confirm email = REQUIRED, Supabase will NOT return a session.
    // It will send a confirmation email instead.
    setDone(true);
  };

  if (done) {
    return (
      <div className="auth-shell">
        <BackToWorklyLink />
        <div className="auth-card">
          <h1>Check your email</h1>
          <p className="auth-sub">
            We&apos;ve sent a confirmation link to <strong>{email}</strong>.
          </p>
          <p
            style={{
              marginTop: 16,
              fontSize: 14,
              color: "rgba(15,23,42,0.8)",
            }}
          >
            Open the email on this device and confirm your account. After that,
            come back and log in from the login page to access your student
            dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-shell">
      <BackToWorklyLink />
      <div className="auth-card">
        <h1>Create your student account</h1>
        <p className="auth-sub">
          Enter your details below to create a password account with Workly.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
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
            {loading ? "Creating account…" : "Create account"}
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
      </div>
    </div>
  );
}
