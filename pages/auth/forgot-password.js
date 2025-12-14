import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setErr("");
    setMsg("");
    const e = email.trim().toLowerCase();
    if (!validEmail(e)) {
      setErr("Enter a valid email.");
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(e);
      if (error) throw error;
      setMsg("Check your email for reset instructions.");
    } catch (_e) {
      setErr("Could not send reset email. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authBrand">WORKLY</div>
        <h1 className="authTitle">Reset password</h1>
        <p className="authSubtitle">We’ll email you a reset link.</p>

        <div className="authField">
          <label className="authLabel">Email</label>
          <input
            className="authInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        {err ? <div className="authErrorBar">{err}</div> : null}
        {msg ? <div className="authSuccessBar">{msg}</div> : null}

        <button type="button" className="authPrimary" onClick={submit} disabled={busy}>
          {busy ? "Sending…" : "Send reset link"}
        </button>

        <div className="authRow">
          <a className="authLink" href="/auth/login">Back to sign in</a>
        </div>
      </div>
    </div>
  );
}
