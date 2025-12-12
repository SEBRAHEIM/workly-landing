import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function OnboardingChecklist() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [role, setRole] = useState("student");

  const returnTo = useMemo(() => (typeof router.query.returnTo === "string" ? router.query.returnTo : "/"), [router.query.returnTo]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data?.user;
      const r = (u?.user_metadata?.role || "student").trim();
      setRole(r || "student");
    });
  }, []);

  const finish = async () => {
    setBusy(true);
    try {
      const { data: u1 } = await supabase.auth.getUser();
      const user = u1?.user;
      if (!user) throw new Error("Not signed in.");

      const meta = { ...(user.user_metadata || {}), onboarding_complete: true };
      const { error } = await supabase.auth.updateUser({ data: meta });
      if (error) throw error;

      router.replace(returnTo || "/");
    } catch {
      router.replace(returnTo || "/");
    } finally {
      setBusy(false);
    }
  };

  const steps =
    role === "creator"
      ? [
          "Complete your creator profile",
          "Add your first service",
          "Publish and start earning",
        ]
      : [
          "Complete your profile",
          "Pick a category",
          "Post your first request",
        ];

  return (
    <>
      <Head><title>What’s next</title></Head>

      <div className="auth-flow-page">
        <div className="auth-flow-card">
          <div className="auth-flow-top">
            <div className="auth-flow-brand">WORKLY</div>
            <h1 className="auth-flow-title">Great, you’re almost there.</h1>
            <p className="auth-flow-subtitle">Here’s what’s next:</p>
          </div>

          <ol style={{ margin: "0 0 18px", paddingLeft: 18, lineHeight: 1.8 }}>
            {steps.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>

          <button className="auth-flow-primary-btn" type="button" onClick={finish} disabled={busy}>
            {busy ? "Loading..." : "Start exploring"}
          </button>

          <button className="auth-flow-secondary-link" type="button" onClick={() => router.push("/profile/edit")} disabled={busy}>
            Continue setup
          </button>
        </div>
      </div>
    </>
  );
}
