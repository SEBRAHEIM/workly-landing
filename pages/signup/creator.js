import { useState } from "react";
import BackToWorklyLink from "@/components/BackToWorklyLink";
import { supabase } from "@/lib/supabaseClient";

export default function CreatorEmailSignup() {
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
        data: { role: "creator" },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || "Something went wrong. Try again.");
      return;
    }

    // Same behaviour: user must confirm email before they can log in.
    setDone(true);
  };

  if (done) {
    return (
      <div className="auth-shell">
        <BackToWorklyLink />
        <div className="auth-card">
          <h1>Create your creator account</h1>
          <p className="auth-sub">
            Check your email to confirm your account before you can log in.
          </p>
          <p
            style={{
              marginTop: 16,
              fontSize: 14,
              color: "rgba(15,23,42,0.8)",
            }}
          >
            We sent a confirmation link to <strong>{email}</strong>. Open it on
            this device, confirm, then come back and log in from the login page
            to access your creator dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-shell">
      <BackToWorklyLink />
      <div className="auth-card">
        <h1>Create your creator account</h1>
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
