import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const email = typeof router.query.email === "string" ? router.query.email : "";
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...code];
    next[index] = value;
    setCode(next);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = code.join("").trim();
    if (token.length !== 6) return;

    setSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Verification failed.");
      }

      router.push("/auth/role");
    } catch (error) {
      setErrorMessage(error.message || "Could not verify the code.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Confirm your email · Workly</title>
      </Head>
      <main className="auth-flow-page">
        <div className="auth-flow-card">
          <h1 className="auth-flow-title">Confirm your email</h1>
          <p className="auth-flow-subtitle">
            Enter the 6-digit code we emailed to:{" "}
            <span className="auth-flow-highlight">{email || "your email"}</span>
          </p>

          <form onSubmit={handleSubmit} className="auth-flow-form">
            <div className="auth-flow-otp-row">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="auth-flow-otp-input"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              ))}
            </div>

            {errorMessage && <p className="auth-flow-error">{errorMessage}</p>}

            <button
              type="submit"
              className="auth-flow-primary-btn"
              disabled={submitting || code.join("").length !== 6}
            >
              {submitting ? "Verifying..." : "Submit"}
            </button>

            <button
              type="button"
              className="auth-flow-secondary-link"
              onClick={() => alert("Resend code placeholder — connect via API later.")}
            >
              Resend code
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
