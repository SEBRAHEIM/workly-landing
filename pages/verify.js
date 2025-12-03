import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import BackToWorklyLink from "@/components/BackToWorklyLink";

export default function VerifySignupCode() {
  const router = useRouter();
  const { email, role } = router.query;

  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // If there is no email in the URL, send them back to signup
    if (router.isReady && !email) {
      router.replace("/signup");
    }
  }, [router, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setErrorMsg("");

    const { error } = await supabase.auth.verifyOtp({
      email: String(email),
      token: code.trim(),
      type: "signup",
    });

    setSubmitting(false);

    if (error) {
      setErrorMsg(error.message || "Invalid or expired code. Please try again.");
      return;
    }

    // Verified + signed in successfully; now send them to the right detail page
    if (role === "student") {
      router.replace("/signup/student-details");
    } else if (role === "creator") {
      router.replace("/signup/creator-details");
    } else {
      // Fallback if role missing
      router.replace("/dashboard/student");
    }
  };

  return (
    <div className="auth-shell">
      <BackToWorklyLink />
      <div className="auth-card login-card">
        <h1>Check your email</h1>
        <p className="auth-subtitle">
          We sent a verification code to{" "}
          <span style={{ fontWeight: 600 }}>{email}</span>. Enter the code below to
          activate your Workly account.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Verification code</label>
            <input
              className="auth-input"
              type="text"
              inputMode="numeric"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="6-digit code"
            />
          </div>

          <button type="submit" className="auth-primary-btn" disabled={submitting || !code}>
            {submitting ? "Verifying…" : "Verify and continue"}
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

        <p
          style={{
            marginTop: 16,
            fontSize: 14,
            color: "rgba(15,23,42,0.7)",
          }}
        >
          Didn&apos;t get the email? Check your spam folder, or try signing up again with
          the same email.
        </p>
      </div>
    </div>
  );
}
