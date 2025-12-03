import { useState } from "react";
import { useRouter } from "next/router";
import BackToWorklyLink from "@/components/BackToWorklyLink";
import { supabase } from "@/lib/supabaseClient";

export default function CreatorEmailSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const origin =
      typeof window !== "undefined" ? window.location.origin : "";

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: "creator" },
        emailRedirectTo: origin ? `${origin}/auth/callback` : undefined,
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || "Something went wrong. Try again.");
      return;
    }

    if (data.session) {
      router.replace("/dashboard/creator");
      return;
    }

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
            this device, tap the button, and you will be taken straight into
            your dashboard.
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
