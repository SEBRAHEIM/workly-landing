import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  const router = useRouter();
  const { user, profile, loading, apiCheckEmailExists, signInWithPassword, signUpWithPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [mode, setMode] = useState("unknown");
  const [busy, setBusy] = useState(false);

  const [errEmail, setErrEmail] = useState("");
  const [errPass, setErrPass] = useState("");
  const [errGeneral, setErrGeneral] = useState("");

  useEffect(() => {
    if (loading) return;
    if (user) {
      if (!profile?.role || !profile?.username) router.replace("/onboarding");
      else if (profile.role === "creator") router.replace("/creator");
      else router.replace("/");
    }
  }, [loading, user, profile, router]);

  const primaryLabel = useMemo(() => {
    if (busy) {
      if (mode === "existing") return "Signing in…";
      if (mode === "new") return "Creating account…";
      return "Checking…";
    }
    if (mode === "existing") return "Sign in";
    if (mode === "new") return "Verify email";
    return "Continue";
  }, [busy, mode]);

  const subtitle = useMemo(() => {
    if (mode === "existing") return "Welcome back. Sign in with your password.";
    if (mode === "new") return "New here? We’ll create your account and continue to onboarding.";
    return "Existing users sign in with password. New users verify email once, then set a password.";
  }, [mode]);

  const validate = () => {
    let ok = true;
    setErrGeneral("");

    if (!email.trim()) {
      setErrEmail("Email is required.");
      ok = false;
    } else if (!validEmail(email.trim())) {
      setErrEmail("Enter a valid email.");
      ok = false;
    } else {
      setErrEmail("");
    }

    if (!password) {
      setErrPass("Password is required.");
      ok = false;
    } else {
      setErrPass("");
    }

    return ok;
  };

  const detectMode = async () => {
    const e = email.trim().toLowerCase();
    if (!e || !validEmail(e)) return;
    setErrGeneral("");
    try {
      setBusy(true);
      const exists = await apiCheckEmailExists(e);
      setMode(exists ? "existing" : "new");
    } catch (e2) {
      setMode("unknown");
      setErrGeneral("Email check is unavailable. Add SUPABASE_SERVICE_ROLE_KEY in Vercel env then redeploy.");
    } finally {
      setBusy(false);
    }
  };

  const goNext = async () => {
    if (!validate()) return;

    const e = email.trim().toLowerCase();
    setErrGeneral("");
    setBusy(true);

    try {
      let currentMode = mode;

      if (currentMode === "unknown") {
        const exists = await apiCheckEmailExists(e);
        currentMode = exists ? "existing" : "new";
        setMode(currentMode);
      }

      if (currentMode === "existing") {
        await signInWithPassword({ email: e, password });
        router.replace("/onboarding");
        return;
      }

      if (currentMode === "new") {
        await signUpWithPassword({ email: e, password });
        router.replace("/onboarding");
        return;
      }

      setErrGeneral("Something went wrong. Try again.");
    } catch (e2) {
      const msg = e2 && e2.message ? String(e2.message) : "Authentication failed.";
      const low = msg.toLowerCase();

      if (low.includes("invalid login credentials")) {
        setMode("existing");
        setErrGeneral("Incorrect email or password.");
      } else if (low.includes("user already registered")) {
        setMode("existing");
        setErrGeneral("This email already exists. Please sign in.");
      } else if (low.includes("server_missing_keys")) {
        setErrGeneral("Server missing keys. Add SUPABASE_SERVICE_ROLE_KEY in Vercel env then redeploy.");
      } else {
        setErrGeneral("Could not continue. Try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authBrand">WORKLY</div>
        <h1 className="authTitle">Sign in</h1>
        <p className="authSubtitle">{subtitle}</p>

        <div className="authField">
          <label className="authLabel">Email</label>
          <input
            className="authInput"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setMode("unknown"); }}
            onBlur={detectMode}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          {errEmail ? <div className="authError">{errEmail}</div> : null}
        </div>

        <div className="authField">
          <label className="authLabel">Password</label>
          <input
            className="authInput"
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            autoComplete={mode === "new" ? "new-password" : "current-password"}
            required
          />
          {errPass ? <div className="authError">{errPass}</div> : null}

          <button
            type="button"
            className="authInlineToggle"
            onClick={() => setShowPass((v) => !v)}
          >
            {showPass ? "Hide password" : "Show password"}
          </button>
        </div>

        {errGeneral ? <div className="authErrorBar">{errGeneral}</div> : null}

        <button
          type="button"
          className="authPrimary"
          onClick={goNext}
          disabled={busy || !email.trim() || !validEmail(email.trim()) || !password}
        >
          {primaryLabel}
        </button>

        <div className="authRow">
          <a className="authLink" href="/auth/forgot-password">Forgot password?</a>
          <a className="authLink" href="/api/auth/env-check" target="_blank" rel="noreferrer">Env check</a>
        </div>

        <div className="authFinePrint">
          By continuing you agree to <a className="authLink" href="/terms">Terms</a> &{" "}
          <a className="authLink" href="/privacy">Privacy</a>
        </div>
      </div>
    </div>
  );
}
