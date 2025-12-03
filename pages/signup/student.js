import { useState } from "react";
import { useRouter } from "next/router";
import BackToWorklyLink from "@/components/BackToWorklyLink";
import { supabase } from "@/lib/supabaseClient";

export default function StudentEmailSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [checking, setChecking] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

    // No session is created until email is confirmed.
    // Show the "check your email" screen.
    setDone(true);
  };

  const handleContinueAfterVerify = async () => {
    setErrorMsg("");
    setChecking(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setChecking(false);

    if (error || !data.session) {
      setErrorMsg(
        "We couldn't log you in yet. Make sure you clicked the confirmation link in your email, then try again."
      );
      return;
    }

    router.replace("/dashboard/student");
  };

  if (done) {
    return (
      <div className="auth-shell">
        <BackToWorklyLink />
        <div className="auth-card">
          <h1>Check your email</h1>
          <p className="auth-sub">
            We sent a confirmation link to <strong>{email}</strong>.
          </p>
          <p
            style={{
              marginTop: 10,
              fontSize: 14,
              color: "rgba(15,23,42,0.8)",
            }}
          >
            You can open the email on any device. After you confirm, come back
            here and continue.
          </p>

          <button
            type="button"
            className="auth-primary-btn"
            style={{ marginTop: 18 }}
            onClick={handleContinueAfterVerify}
            disabled={checking}
          >
            {checking ? "Checking…" : "I confirmed my email – continue"}
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
