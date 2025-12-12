import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { getNextOnboardingPath } from "../../lib/onboarding";

export default function OnboardingUsername() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const returnTo = useMemo(() => (typeof router.query.returnTo === "string" ? router.query.returnTo : "/"), [router.query.returnTo]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data?.user;
      const existing = (u?.user_metadata?.username || "").trim();
      if (existing) {
        router.replace(getNextOnboardingPath(u, returnTo || "/"));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setError("");

    const value = (username || "").trim();
    if (!value) return setError("Choose a username.");
    if (!/^[a-zA-Z0-9_]{3,24}$/.test(value)) {
      return setError("Use 3–24 chars: letters, numbers, underscore.");
    }

    setBusy(true);
    try {
      const { data: u1 } = await supabase.auth.getUser();
      const user = u1?.user;
      if (!user) throw new Error("Not signed in.");

      const meta = { ...(user.user_metadata || {}), username: value };
      const { data, error: err } = await supabase.auth.updateUser({ data: meta });
      if (err) throw err;

      router.replace(getNextOnboardingPath(data?.user, returnTo || "/"));
    } catch (err) {
      setError(err?.message || "Could not save username.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Head><title>Get your profile started</title></Head>

      <div className="auth-flow-page">
        <div className="auth-flow-card">
          <div className="auth-flow-top">
            <div className="auth-flow-brand">WORKLY</div>
            <h1 className="auth-flow-title">Get your profile started</h1>
            <p className="auth-flow-subtitle">Choose a username. You can’t change it later.</p>
          </div>

          <form className="auth-flow-form" onSubmit={save}>
            <label className="auth-flow-label" htmlFor="username">Choose a username</label>
            <input
              id="username"
              className="auth-flow-input"
              placeholder="john_smith"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />

            {error ? <div className="auth-flow-error">{error}</div> : null}

            <button className="auth-flow-primary-btn" type="submit" disabled={busy}>
              {busy ? "Saving..." : "Create my account"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
