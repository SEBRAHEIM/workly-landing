import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function SetPassword() {
  const router = useRouter();
  const returnTo = (router.query.returnTo || "/").toString();

  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function afterAuthRedirect() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.replace("/");

    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!profile) return router.replace("/onboarding");
    return router.replace(returnTo || "/");
  }

  async function save(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      if (!p1 || p1.length < 6) throw new Error("Password must be at least 6 characters.");
      if (p1 !== p2) throw new Error("Passwords do not match.");

      const { error } = await supabase.auth.updateUser({ password: p1 });
      if (error) throw error;

      await afterAuthRedirect();
    } catch (e2) {
      setErr(e2?.message || "Could not set password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="authShell">
      <div className="authCard">
        <div className="authBrand">WORKLY</div>
        <h1 className="authTitle">Create a password</h1>
        <p className="authSub">You’ll use this password next time to sign in instantly.</p>

        <form onSubmit={save} className="authForm">
          <label className="authLabel">Password</label>
          <input className="authInput" type="password" autoComplete="new-password" placeholder="Create a password" value={p1} onChange={(e) => setP1(e.target.value)} />

          <label className="authLabel">Confirm password</label>
          <input className="authInput" type="password" autoComplete="new-password" placeholder="Repeat password" value={p2} onChange={(e) => setP2(e.target.value)} />

          {err ? <div className="authError">{err}</div> : null}

          <button className="authBtn" type="submit" disabled={loading}>
            {loading ? "Saving…" : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
