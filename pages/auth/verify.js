import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

function getSiteUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  return process.env.NEXT_PUBLIC_SITE_URL || "https://workly.day";
}

export default function VerifyEmailPage() {
  const router = useRouter();
  const email = (router.query.email || "").toString();
  const intent = (router.query.intent || "student").toString();
  const returnTo = (router.query.returnTo || "/").toString();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const callbackUrl = useMemo(() => {
    const base = getSiteUrl();
    const u = new URL("/auth/callback", base);
    u.searchParams.set("intent", intent);
    u.searchParams.set("returnTo", returnTo);
    return u.toString();
  }, [intent, returnTo]);

  async function verify(e) {
    e.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);

    try {
      const token = code.trim();
      if (!email) throw new Error("Missing email.");
      if (!/^[0-9]{6}$/.test(token)) throw new Error("Enter the 6-digit code.");

      const attempt = async (type) => {
        const { data, error } = await supabase.auth.verifyOtp({
          email,
          token,
          type,
        });
        if (error) throw error;
        return data;
      };

      try {
        await attempt("signup");
      } catch {
        await attempt("email");
      }

      router.replace(returnTo || "/");
    } catch (e2) {
      setErr(e2?.message || "Invalid code. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    setErr("");
    setMsg("");
    setResending(true);
    try {
      if (!email) throw new Error("Missing email.");
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true, emailRedirectTo: callbackUrl },
      });
      if (error) throw error;
      setMsg("Sent! Check your inbox (and spam).");
    } catch (e2) {
      setErr(e2?.message || "Could not resend. Try again.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="authShell">
      <div className="authCard">
        <div className="authBrand">WORKLY</div>
        <h1 className="authTitle">Enter the code</h1>
        <p className="authSub">
          We sent a 6-digit code to <b>{email || "your email"}</b>.
        </p>

        <form onSubmit={verify} className="authForm">
          <label className="authLabel">6-digit code</label>
          <input
            className="authInput"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="123456"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          {err ? <div className="authError">{err}</div> : null}
          {msg ? <div className="authOk">{msg}</div> : null}

          <button className="authBtn" type="submit" disabled={loading}>
            {loading ? "Verifying…" : "Verify"}
          </button>

          <button className="authBtnGhost" type="button" onClick={resend} disabled={resending}>
            {resending ? "Resending…" : "Resend code"}
          </button>

          <button
            className="authLinkBtn"
            type="button"
            onClick={() => router.replace({ pathname: "/auth/email", query: { intent, returnTo } })}
          >
            Use a different email
          </button>
        </form>
      </div>
    </div>
  );
}
