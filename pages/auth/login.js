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
    verifyEmailOtp
  } = useAuth();

  const [email, setEmail] = useState("");
  const [mode, setMode] = useState("unknown");
  const [step, setStep] = useState("email");
  const [password, setPassword] = useState("");
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
    if (step === "password") return "Welcome back. Enter your password to continue.";
    return "Continue with email. We’ll guide you based on your account.";
  }, [step]);

  const primaryLabel = useMemo(() => {
    if (busy) return "Please wait…";
    if (step === "email") return "Continue";
    if (step === "password") return "Sign in";
    return "Verify code";
  }, [busy, step]);

  const shouldDisablePrimary = useMemo(() => {
    const e = email.trim().toLowerCase();
    if (!e || !validEmail(e)) return true;
    if (busy) return true;
    if (step === "password") return !password;
    if (step === "otp") return cleanCode(code).length !== 6;
    return false;
  }, [email, password, busy, step, code]);

  const setAllClean = () => {
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

    if (step === "password") {
      if (!password) {
        next.password = "Password is required.";
        ok = false;
      }
    }

    if (step === "otp") {
      if (cleanCode(code).length !== 6) {
        next.code = "Enter the 6-digit code.";
        ok = false;
      }
    }

    setFieldErr(next);
    return ok;
  };

  const detectMode = async () => {
    const e = email.trim().toLowerCase();
    if (!e || !validEmail(e)) return;

    setAllClean();

    try {
      setBusy(true);
      const exists = await apiCheckEmailExists(e);
      if (exists === true) {
        setMode("existing");
        setStep("password");
        setPill("");
        return;
      }
      if (exists === false) {
        setMode("new");
        setStep("email");
        setPill("New email detected. We’ll verify your email to continue.");
        return;
      }
      setMode("unknown");
      setStep("email");
      setPill("");
    } catch (_e2) {
      setMode("unknown");
      setStep("email");
      setPill("");
    } finally {
      setBusy(false);
    }
  };

  const go = async () => {
    setAllClean();
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
          setMode("existing");
          setStep("password");
          setPill("");
          return;
        }

        setMode("new");
        await signInWithOtp({ email: e });
        setStep("otp");
        setCode("");
        setPill("Code sent. Check your email.");
        return;
      }

      if (step === "password") {
        await signInWithPassword({ email: e, password });
        router.replace("/onboarding");
        return;
      }

      await verifyEmailOtp({ email: e, token: cleanCode(code) });
      router.replace("/onboarding");
    } catch (e2) {
      const msg = e2 && e2.message ? String(e2.message) : "Could not continue. Try again.";
      const low = msg.toLowerCase();

      if (step === "password") {
        if (low.includes("invalid login credentials")) {
          setErr("Incorrect email or password.");
          return;
        }
        setErr("Could not sign in. Try again.");
        return;
      }

      if (step === "otp") {
        setErr("Invalid code. Try again.");
        return;
      }

      setErr("Could not continue. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const backToEmail = () => {
    setAllClean();
    setStep("email");
    setPassword("");
    setShowPass(false);
    setCode("");
    setPill(mode === "new" ? "New email detected. We’ll verify your email to continue." : "");
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
            onChange={(e) => {
              setEmail(e.target.value);
              setMode("unknown");
              setStep("email");
              setPassword("");
              setShowPass(false);
              setCode("");
              setAllClean();
            }}
            onBlur={detectMode}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          {fieldErr.email ? <div className="authError">{fieldErr.email}</div> : null}
        </div>

        {step === "password" ? (
          <div className="authField">
            <label className="authLabel">Password</label>
            <input
              className="authInput"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setCode(cleanCode(e.target.value))}
              placeholder="6-digit code"
              autoComplete="one-time-code"
            />
            {fieldErr.code ? <div className="authError">{fieldErr.code}</div> : null}

            <div className="authRow">
              <button type="button" className="authLinkBtn" onClick={backToEmail}>
                Back
              </button>
              <button
                type="button"
                className="authLinkBtn"
                onClick={async () => {
                  setAllClean();
                  const e = email.trim().toLowerCase();
                  if (!e || !validEmail(e)) return;
                  try {
                    setBusy(true);
                    await signInWithOtp({ email: e });
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
          onClick={go}
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
