import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function Onboarding() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error: insertError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          username: username.trim(),
          role
        });

      if (insertError) throw insertError;

      router.replace("/");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="authShell">
      <div className="authCard">
        <div className="authBrand">WORKLY</div>
        <h1 className="authTitle">Get your profile started</h1>
        <p className="authSub">Choose a username and your role.</p>

        <form onSubmit={submit} className="authForm">
          <label className="authLabel">Username</label>
          <input
            className="authInput"
            placeholder="john_smith"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <button type="button"
            className={`authBtnGhost ${role === "student" ? "active" : ""}`}
            onClick={() => setRole("student")}>
            I'm a student
          </button>

          <button type="button"
            className={`authBtnGhost ${role === "creator" ? "active" : ""}`}
            onClick={() => setRole("creator")}>
            I'm a creator
          </button>

          {error && <div className="authError">{error}</div>}

          <button className="authBtn" disabled={loading || !username || !role}>
            {loading ? "Saving…" : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
