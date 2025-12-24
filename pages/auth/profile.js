import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";

export default function ProfileSetupPage() {
  const router = useRouter();
  const { user, loading, profile } = useAuth();

  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      const t = data?.session?.access_token || "";
      if (!alive) return;
      setToken(t);
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    const pr = profile || {};
    const prRole = String(pr.role || "");
    const prUsername = String(pr.username || "");
    if (prRole === "student" || prRole === "creator") setRole(prRole);
    if (prUsername) setUsername(prUsername);
  }, [loading, user, profile]);

  const cleaned = useMemo(() => {
    const s = String(username || "").trim().toLowerCase();
    return s.replace(/[^a-z0-9_]/g, "").slice(0, 20);
  }, [username]);

  const profileComplete =
    (profile?.role === "student" || profile?.role === "creator") &&
    String(profile?.username || "").trim().length >= 3;

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if (profileComplete) {
      window.location.href = profile.role === "creator" ? "/creator/dashboard" : "/student/dashboard";
    }
  }, [loading, user, profileComplete, profile]);

  const canSubmit =
    !!token &&
    (role === "student" || role === "creator") &&
    cleaned.length >= 3 &&
    !busy;

  const chooseStyle = (active) => ({
    width: "100%",
    border: active ? "2px solid #1f5a3a" : "1px solid rgba(0,0,0,0.12)",
    background: active ? "rgba(31,90,58,0.12)" : "rgba(0,0,0,0.04)",
    color: "#1f5a3a",
    padding: "14px 14px",
    borderRadius: 16,
    fontWeight: 1200,
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  });

  const submit = async () => {
    setErr("");

    if (!token) {
      setErr("Session missing. Refresh the page and try again.");
      return;
    }

    if (role !== "student" && role !== "creator") {
      setErr("Choose Student or Creator");
      return;
    }

    if (!cleaned || cleaned.length < 3) {
      setErr("Username must be 3+ characters (letters/numbers/underscore).");
      return;
    }

    setBusy(true);
    try {
      const r = await fetch("/api/auth/set-profile", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role, username: cleaned })
      });

      const text = await r.text();
      let j = {};
      try { j = JSON.parse(text); } catch {}

      if (!r.ok) {
        if (j?.error === "username_taken") throw new Error("Username is taken. Try another one.");
        if (j?.error === "invalid_token") throw new Error("Session expired. Refresh and try again.");
        throw new Error(j?.error ? `${j.error}${j.detail ? " — " + j.detail : ""}` : (text || "could_not_save"));
      }

      window.location.href = role === "creator" ? "/creator/dashboard" : "/student/dashboard";
    } catch (e) {
      setErr(String(e?.message || e));
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#ece9e2", display: "grid", placeItems: "center", padding: 24 }}>
        <div style={{ maxWidth: 520, width: "100%", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)", fontWeight: 1100 }}>
          Loading your session...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "#ece9e2", padding: 24 }}>
        <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
          <div style={{ fontWeight: 1100, letterSpacing: 4, opacity: 0.75 }}>WORKLY</div>
          <div style={{ marginTop: 14, fontWeight: 1200, fontSize: 34, lineHeight: 1.05, color: "#3a332b" }}>Tell us who you are</div>
          <div style={{ marginTop: 10, opacity: 0.7, fontWeight: 900 }}>Please sign in first.</div>
          <div style={{ marginTop: 14 }}>
            <button
              type="button"
              onClick={() => router.replace("/auth")}
              style={{ border: 0, background: "#4b443b", color: "#fff", padding: "14px 18px", borderRadius: 999, fontWeight: 1100, cursor: "pointer", width: "100%" }}
            >
              Go to Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ece9e2", padding: 24 }}>
      <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ fontWeight: 1100, letterSpacing: 4, opacity: 0.75 }}>WORKLY</div>
          <Link href="/auth" style={{ textDecoration: "none", fontWeight: 1000 }}>✕</Link>
        </div>

        <div style={{ marginTop: 14, fontWeight: 1200, fontSize: 38, lineHeight: 1.05, color: "#3a332b" }}>Tell us who you are</div>
        <div style={{ marginTop: 10, opacity: 0.7, fontWeight: 900 }}>Choose account type and username.</div>

        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          <button type="button" onClick={() => setRole("student")} style={chooseStyle(role === "student")}>
            <div>
              <div style={{ fontWeight: 1200 }}>I’m a Student</div>
              <div style={{ marginTop: 4, fontWeight: 900, opacity: 0.85 }}>Browse and request help</div>
            </div>
            <div style={{ fontWeight: 1200 }}>{role === "student" ? "✓" : ""}</div>
          </button>

          <button type="button" onClick={() => setRole("creator")} style={chooseStyle(role === "creator")}>
            <div>
              <div style={{ fontWeight: 1200 }}>I’m a Creator</div>
              <div style={{ marginTop: 4, fontWeight: 900, opacity: 0.85 }}>Offer services to students</div>
            </div>
            <div style={{ fontWeight: 1200 }}>{role === "creator" ? "✓" : ""}</div>
          </button>
        </div>

        <div style={{ marginTop: 14, fontWeight: 1000, opacity: 0.7 }}>Username</div>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="yourname"
          style={{
            marginTop: 8,
            width: "100%",
            padding: "14px 14px",
            borderRadius: 14,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "#fff",
            fontWeight: 1100,
            fontSize: 18
          }}
        />
        <div style={{ marginTop: 8, opacity: 0.65, fontWeight: 900 }}>
          Will save as: <span style={{ fontWeight: 1200 }}>{cleaned || "-"}</span>
        </div>

        {err ? (
          <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", border: "1px solid rgba(220,0,0,0.20)", fontWeight: 1000 }}>
            {err}
          </div>
        ) : null}

        <button
          type="button"
          disabled={!canSubmit}
          onClick={submit}
          style={{
            marginTop: 14,
            width: "100%",
            border: 0,
            background: canSubmit ? "#1f5a3a" : "rgba(31,90,58,0.35)",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: 999,
            fontWeight: 1100,
            cursor: canSubmit ? "pointer" : "not-allowed"
          }}
        >
          {busy ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
}
