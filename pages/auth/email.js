import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function EmailSignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const isValidPassword = (value) =>
    value.length >= 8 &&
    /[A-Z]/.test(value) &&
    /[a-z]/.test(value) &&
    /\d/.test(value);

  const canSubmit = isValidEmail(email) && isValidPassword(password) && !submitting;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!supabase) {
      setErrorMessage("Supabase is not configured yet. Please add your keys in .env.local.");
      return;
    }
    if (!canSubmit) return;

    setSubmitting(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message || "Could not sign you up. Please try again.");
      setSubmitting(false);
      return;
    }

    // Next step: username
    router.push(`/auth/username?email=${encodeURIComponent(email)}`);
  };

  return (
    <>
      <Head>
        <title>Continue with email · Workly</title>
      </Head>
      <main className="auth-flow-page">
        <div className="auth-flow-card">
          <h1 className="auth-flow-title">Continue with your email</h1>
          <p className="auth-flow-subtitle">
            Create your Workly account with an email and password.
          </p>

          <form onSubmit={handleSubmit} className="auth-flow-form">
            <label className="auth-flow-label">
              Email
              <input
                type="email"
                autoComplete="email"
                className="auth-flow-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            {!isValidEmail(email) && email.length > 0 && (
              <p className="auth-flow-error-small">Enter a valid email address.</p>
            )}

            <label className="auth-flow-label">
              Password
              <input
                type="password"
                autoComplete="new-password"
                className="auth-flow-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a strong password"
                required
              />
            </label>
            <p className="auth-flow-hint">
              At least 8 characters, with 1 uppercase, 1 lowercase, and 1 number.
            </p>
            {!isValidPassword(password) && password.length > 0 && (
              <p className="auth-flow-error-small">
                Password doesn&apos;t meet the requirements yet.
              </p>
            )}

            {errorMessage && <p className="auth-flow-error">{errorMessage}</p>}

            <button
              type="submit"
              className="auth-flow-primary-btn"
              disabled={!canSubmit}
            >
              {submitting ? "Creating account..." : "Continue"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
