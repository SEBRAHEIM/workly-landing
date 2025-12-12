import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { getNextOnboardingPath } from "../../lib/onboarding";

export default function OnboardingRole() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const returnTo = useMemo(() => (typeof router.query.returnTo === "string" ? router.query.returnTo : "/"), [router.query.returnTo]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data?.user;
      const role = (u?.user_metadata?.role || "").trim();
      if (role) router.replace(getNextOnboardingPath(u, returnTo || "/"));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = async (role) => {
    setError("");
    setBusy(true);
    try {
      const { data: u1 } = await supabase.auth.getUser();
      const user = u1?.user;
      if (!user) throw new Error("Not signed in.");

      const meta = { ...(user.user_metadata || {}), role };
      const { data, error: err } = await supabase.auth.updateUser({ data: meta });
      if (err) throw err;

      router.replace(getNextOnboardingPath(data?.user, returnTo || "/"));
    } catch (err) {
      setError(err?.message || "Could not save role.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head><title>Choose your path</title></Head>

      <div className="auth-flow-page">
        <div className="auth-flow-card">
          <div className="auth-flow-top">
            <div className="auth-flow-brand">WORKLY</div>
            <h1 className="auth-flow-title">What brings you to Workly?</h1>
            <p className="auth-flow-subtitle">We’ll tailor your experience based on your choice.</p>
          </div>

          <div className="auth-flow-role-grid">
            <button type="button" className="auth-flow-role-card" onClick={() => choose("student")} disabled={busy}>
              <h2>I’m a student</h2>
              <p>I want to order services and get help with tasks.</p>
            </button>

            <button type="button" className="auth-flow-role-card" onClick={() => choose("creator")} disabled={busy}>
              <h2>I’m a creator</h2>
              <p>I want to offer my services and work with students.</p>
            </button>
          </div>

          {error ? <div className="auth-flow-error">{error}</div> : null}
        </div>
      </div>
    </>
  );
}
