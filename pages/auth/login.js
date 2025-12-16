import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanCode(v) {
  return (v || "").replace(/\D/g, "").slice(0, 6);
}

export default function LoginPage() {
  const router = useRouter();
  const {
    user,
    profile,
    loading,
    apiCheckEmailExists,
    signInWithPassword,
    signInWithOtp,
    verifyEmailOtp,
    updateUserPassword
  } = useAuth();

  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email");
  const [password, setPassword] = useState("");
  const [pendingPassword, setPendingPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [code, setCode] = useState("");

  const [busy, setBusy] = useState(false);
  const [pill, setPill] = useState("");
  const [err, setErr] = useState("");
  const [fieldErr, setFieldErr] = useState({ email: "", password: "", code: "" });

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    if (!profile?.role || !profile?.username) {
      router.replace("/onboarding");
      return;
    }

    if (profile.role === "creator") {
      router.replace("/creator");
      return;
    }

    router.replace("/");
  }, [loading, user, profile, router]);

  const title = useMemo(() => {
    if (step === "otp") return "Verify your email";
    return "Sign in";
  }, [step]);

  const subtitle = useMemo(() => {
    if (step === "otp") return "Enter the 6-digit code we sent to your email.";
    return "Enter your email and password. First time? We’ll verify your email once.";
  }, [step]);

  const primaryLabel = useMemo(() => {
    if (busy) return "Please wait…";
    if (step === "otp") return "Verify code";
    return "Continue";
  }, [busy, step]);

  const shouldDisablePrimary = useMemo(() => {
    const e = email.trim().toLowerCase();
    if (!e || !validEmail(e)) return true;
    if (busy) return true;
    if (step === "otp") return cleanCode(code).length !== 6;
    return !password;
  }, [email, password, busy, step, code]);

  const resetMsgs = () => {
    setErr("");
    setPill("");
    setFieldErr({ email: "", password: "", code: "" });
  };

  const validate = () => {
    const e = email.trim().toLowerCase();
    const next = { email: "", password: "", code: "" };
    let ok = true;

    if (!e) {
      next.email = "Email is required.";
      ok = false;
    } else if (!validEmail(e)) {
      next.email = "Enter a valid email.";
      ok = false;
    }

    if (step !== "otp" && !password) {
      next.password = "Password is required.";
      ok = false;
    }

    if (step === "otp" && cleanCode(code).length !== 6) {
      next.code = "Enter the 6-digit code.";
      ok = false;
    }

    setFieldErr(next);
    return ok;
  };

  const restart = () => {
    resetMsgs();
    setStep("email");
    setCode("");
    setPendingPassword("");
  };

  const onContinue = async () => {
    resetMsgs();
    if (!validate()) return;

    const e = email.trim().toLowerCase();

    try {
      setBusy(true);

      if (step === "email") {
        let exists = null;
        try {
          exists = await apiCheckEmailExists(e);
        } catch (_x) {
          exists = null;
        }

        if (exists === true) {
          await signInWithPassword({ email: e, password });
          router.replace("/onboarding");
          return;
        }

        setPendingPassword(password);
        await signInWithOtp({ email: e });
        setStep("otp");
        setCode("");
        setPill("Code sent. Check your email.");
        return;
      }

      await verifyEmailOtp({ email: e, token: cleanCode(code) });

      const pw = pendingPassword || password;
      if (pw) {
        await updateUserPassword({ password: pw });
      }

      router.replace("/onboarding");
    } catch (e2) {
      const msg = e2 && e2.message ? String(e2.message) : "Could not continue. Try again.";
      const low = msg.toLowerCase();

      if (step === "email") {
        if (low.includes("invalid login credentials")) {
          setErr("Incorrect email or password.");
          return;
        }
        setErr("Could not continue. Try again.");
        return;
      }

      setErr("Invalid code. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authTopRow">
          <div className="authBrand">WORKLY</div>
          <a className="authCloseLink" href="/auth">×</a>
        </div>

        <h1 className="authTitle">{title}</h1>
        <p className="authSubtitle">{subtitle}</p>

        {pill ? <div className="authPill">{pill}</div> : null}

        <div className="authField">
          <label className="authLabel">Email</label>
          <input
            className="authInput"
            type="email"
            value={email}
            onChange={(e3) => {
              setEmail(e3.target.value);
              restart();
            }}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          {fieldErr.email ? <div className="authError">{fieldErr.email}</div> : null}
        </div>

        {step !== "otp" ? (
          <div className="authField">
            <label className="authLabel">Password</label>
            <input
              className="authInput"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e4) => setPassword(e4.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
            />
            {fieldErr.password ? <div className="authError">{fieldErr.password}</div> : null}

            <button
              type="button"
              className="authInlineToggle"
              onClick={() => setShowPass((v) => !v)}
            >
              {showPass ? "Hide password" : "Show password"}
            </button>
          </div>
        ) : null}

        {step === "otp" ? (
          <div className="authField">
            <label className="authLabel">Verification code</label>
            <input
              className="authInput authCodeInput"
              inputMode="numeric"
              value={code}
              onChange={(e5) => setCode(cleanCode(e5.target.value))}
              placeholder="6-digit code"
              autoComplete="one-time-code"
            />
            {fieldErr.code ? <div className="authError">{fieldErr.code}</div> : null}

            <div className="authRow">
              <button type="button" className="authLinkBtn" onClick={restart}>
                Back
              </button>
              <button
                type="button"
                className="authLinkBtn"
                onClick={async () => {
                  resetMsgs();
                  const em = email.trim().toLowerCase();
                  if (!em || !validEmail(em)) return;
                  try {
                    setBusy(true);
                    await signInWithOtp({ email: em });
                    setPill("Code resent. Check your email.");
                  } catch (_e) {
                    setErr("Could not resend. Try again.");
                  } finally {
                    setBusy(false);
                  }
                }}
              >
                Resend code
              </button>
            </div>
          </div>
        ) : null}

        {err ? <div className="authErrorBar">{err}</div> : null}

        <button
          type="button"
          className="authPrimary"
          onClick={onContinue}
          disabled={shouldDisablePrimary}
        >
          {primaryLabel}
        </button>

        <div className="authRow">
          <a className="authLink" href="/auth/forgot-password">Forgot password?</a>
          <a className="authLink" href="/auth">Back to options</a>
        </div>

        <div className="authFinePrint">
          By continuing you agree to <a className="authLink" href="/terms">Terms</a> &{" "}
          <a className="authLink" href="/privacy">Privacy</a>
        </div>
      </div>
    </div>
  );
}
