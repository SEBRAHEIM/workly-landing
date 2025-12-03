import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import BackToWorklyLink from "@/components/BackToWorklyLink";

export default function StudentEmailSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: "student" },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || "Something went wrong while creating your account.");
      return;
    }

    // Redirect to verification page where they will paste the code
    router.push(`/verify?role=student&email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="auth-shell">
      <BackToWorklyLink />
      <div className="auth-card signup-card">
        <h1>Create your student account</h1>
        <p className="auth-subtitle">
          Enter your details below to create a Workly student account. We&apos;ll send a
          verification code to your email.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Email</label>
            <input
              className="auth-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              className="auth-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>

          <button type="submit" className="auth-primary-btn" disabled={loading}>
            {loading ? "Sending code…" : "Create account"}
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
