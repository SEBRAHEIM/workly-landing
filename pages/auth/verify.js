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

  function openMail(app) {
    if (typeof window === "undefined") return;
    const map = { gmail: "googlegmail://", outlook: "ms-outlook://", apple: "mailto:" };
    window.location.href = map[app] || "mailto:";
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
    } catch (e) {
      setErr(e?.message || "Could not resend. Try again.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="authShell">
      <div className="authCard">
        <div className="authBrand">WORKLY</div>
        <h1 className="authTitle">Check your email</h1>

        <p className="authSub">
          We sent a secure sign-in link to <b>{email || "your email"}</b>.
          <br />
          Open the email and tap <b>Confirm Email</b> to sign in.
        </p>

        <div className="authRow">
          <button className="authBtnGhost" type="button" onClick={() => openMail("apple")}>Open Mail</button>
          <button className="authBtnGhost" type="button" onClick={() => openMail("gmail")}>Gmail</button>
          <button className="authBtnGhost" type="button" onClick={() => openMail("outlook")}>Outlook</button>
        </div>

        {err ? <div className="authError" style={{ marginTop: 12 }}>{err}</div> : null}
        {msg ? <div className="authOk" style={{ marginTop: 12 }}>{msg}</div> : null}

        <div className="authActions">
          <button className="authBtn" type="button" onClick={resend} disabled={resending}>
            {resending ? "Resending…" : "Resend email"}
          </button>

          <button
            className="authLinkBtn"
            type="button"
            onClick={() => router.replace({ pathname: "/auth/email", query: { intent, returnTo } })}
          >
            Use a different email
          </button>
        </div>
      </div>
    </div>
  );
}
