import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

function cleanUsername(v) {
  return v.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 20);
}

export default function Onboarding() {
  const router = useRouter();
  const { user, profile, loading, saveOnboarding } = useAuth();

  const [role, setRole] = useState("student");
  const [username, setUsername] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/auth");
  }, [loading, user, router]);

  useEffect(() => {
    if (profile?.role) setRole(profile.role);
    if (profile?.username) setUsername(profile.username);
  }, [profile]);

  const canSave = useMemo(() => {
    const u = cleanUsername(username || "");
    return u.length >= 3 && (role === "student" || role === "creator");
  }, [username, role]);

  const submit = async () => {
    setErr("");
    const u = cleanUsername(username || "");
    if (u.length < 3) {
      setErr("Username is required.");
      return;
    }
    setBusy(true);
    try {
      const p = await saveOnboarding({ role, username: u });
      if (p?.role === "creator") router.replace("/creator");
      else router.replace("/");
    } catch (e) {
      const msg = e && e.message ? String(e.message) : "";
      if (msg.toLowerCase().includes("duplicate") || msg.toLowerCase().includes("unique")) {
        setErr("Username is taken.");
      } else {
        setErr("Could not save. Try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <div className="authBrand">WORKLY</div>
        <h1 className="authTitle">Tell us who you are</h1>
        <p className="authSubtitle">Choose a role and a username to continue.</p>

        <div className="roleGrid">
          <button
            type="button"
            className={role === "creator" ? "roleCard active" : "roleCard"}
            onClick={() => setRole("creator")}
          >
            <div className="roleTitle">Creator</div>
            <div className="roleDesc">Offer services to students</div>
          </button>

          <button
            type="button"
            className={role === "student" ? "roleCard active" : "roleCard"}
            onClick={() => setRole("student")}
          >
            <div className="roleTitle">Student</div>
            <div className="roleDesc">Browse and request help</div>
          </button>
        </div>

        <div className="authField">
          <label className="authLabel">Username</label>
          <input
            className="authInput"
            value={username}
            onChange={(e) => setUsername(cleanUsername(e.target.value))}
            placeholder="username"
            autoComplete="username"
          />
        </div>

        {err ? <div className="authErrorBar">{err}</div> : null}

        <button type="button" className="authPrimary" onClick={submit} disabled={!canSave || busy}>
          {busy ? "Saving…" : "Continue"}
        </button>
      </div>
    </div>
  );
}
