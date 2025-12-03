import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import BackToWorklyLink from "@/components/BackToWorklyLink";

export default function VerifyEmail() {
  const router = useRouter();
  const { email, role } = router.query;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // If we somehow land here without an email, go back to signup
    if (router.isReady && !email) {
      router.replace("/signup");
    }
  }, [router, email]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setErrorMsg("");
    setLoading(true);

    const { data, error } = await supabase.auth.verifyOtp({
      email: String(email),
      token: code.trim(),
      type: "signup",
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message || "Invalid or expired code.");
      return;
    }

    // After verification, user is signed in. Go straight to dashboard.
    const targetRole =
      role === "creator" ? "creator" : "student";

    router.replace(`/dashboard/${targetRole}`);
  }

  return (
    <div className="auth-shell">
      <BackToWorklyLink />
      <div className="auth-card">
        <h1>Enter your code</h1>
        <p>
          We sent a 6-digit verification code to{" "}
          <strong>{email}</strong>. Enter it below to finish creating your
          account.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label" htmlFor="code">
              Verification code
            </label>
            <input
              id="code"
              className="auth-input"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="auth-primary-btn"
            disabled={loading}
          >
            {loading ? "Verifying…" : "Verify and continue"}
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
          Didn&apos;t get the email? Check your spam folder, or try signing up
          again with the same email.
        </p>
      </div>
    </div>
  );
}
