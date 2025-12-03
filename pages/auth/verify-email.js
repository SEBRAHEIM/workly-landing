import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BackToWorklyLink from "@/components/BackToWorklyLink";
import { supabase } from "@/lib/supabaseClient";

export default function VerifyEmail() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const queryEmail = router.query.email;
    const queryRole = router.query.role;

    if (typeof queryEmail === "string") {
      setEmail(queryEmail);
    }
    if (typeof queryRole === "string") {
      setRole(queryRole);
    }
  }, [router.isReady, router.query.email, router.query.role]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !code) {
      setError("Enter your email and the code you received.");
      return;
    }

    setLoading(true);

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });

      if (verifyError) {
        setError(verifyError.message || "Invalid or expired code.");
        setLoading(false);
        return;
      }

      if (role === "student") {
        router.replace("/signup/student-details");
      } else if (role === "creator") {
        router.replace("/signup/creator-details");
      } else {
        router.replace("/");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <BackToWorklyLink />
      <div className="auth-card login-card">
        <h1 className="auth-title">Enter your verification code</h1>
        <p className="auth-subtitle">
          We sent a 6-digit code to your email. Enter it below to confirm your account.
        </p>

        <form className="auth-form" onSubmit={handleVerify}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Verification code</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              className="auth-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="auth-primary-btn"
            disabled={loading}
          >
            {loading ? "Verifying…" : "Verify and continue"}
          </button>

          <p className="auth-secondary-text">
            Already verified?{" "}
            <a href="/login" className="auth-link">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
