import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";

export default function ProfileSetupPage() {
  const router = useRouter();
  const { user, loading, profile } = useAuth();

  const [token, setToken] = useState("");
  const [role, setRole] = useState(profile?.role || "");
  const [username, setUsername] = useState(profile?.username || "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      const t = data?.session?.access_token || "";
      if (alive) setToken(t);
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if (profile?.role) setRole(profile.role);
    if (profile?.username) setUsername(profile.username);
  }, [loading, user, profile]);

  const cleaned = useMemo(() => {
    const s = String(username || "").trim().toLowerCase();
    return s.replace(/[^a-z0-9_]/g, "").slice(0, 20);
  }, [username]);

  const canSubmit = !!token && (role === "student" || role === "creator") && cleaned.length >= 3 && !busy;

  const chooseStyle = (active) => ({
    width: "100%",
    border: active ? "2px solid #1f5a3a" : "1px solid rgba(0,0,0,0.12)",
    background: active ? "rgba(31,90,58,0.12)" : "rgba(0,0,0,0.04)",
    color: "#1f5a3a",
    padding: "12px 14px",
    borderRadius: 16,
    fontWeight: 1200,
    cursor: "pointer",
    textAlign: "center"
  });

  const submit = async () => {
    setErr("");
    if (!token) {
      setErr("missing_access_token");
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

      if (!r.ok) throw new Error(j.error || text || "could_not_save");

      window.location.href = role === "creator" ? "/creator" : "/student";
    } catch (e) {
      setErr(String(e?.message || e));
    } finally {
      setBusy(false);
    }
  };

  if (loading) return null;

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", background: "#ece9e2", padding: 24 }}>
        <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
          <div style={{ fontWeight: 1100, letterSpacing: 4, opacity: 0.75 }}>WORKLY</div>
          <div style={{ marginTop: 14, fontWeight: 1200, fontSize: 34, lineHeight: 1.05, color: "#3a332b" }}>Tell us who you are</div>
          <div style={{ marginTop: 10, opacity: 0.7, fontWeight: 900 }}>Please sign in first.</div>
          <div style={{ marginTop: 14 }}>
            <button type="button" onClick={() => router.replace("/auth")} style={{ border: 0, background: "#4b443b", color: "#fff", padding: "14px 18px", borderRadius: 999, fontWeight: 1100, cursor: "pointer", width: "100%" }}>
              Go to Auth
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (profile?.role === "student") {
    if (typeof window !== "undefined") window.location.href = "/student";
    return null;
  }

  if (profile?.role === "creator") {
    if (typeof window !== "undefined") window.location.href = "/creator";
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ece9e2", padding: 24 }}>
      <div style={{ maxWidth: 520, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ fontWeight: 1100, letterSpacing: 4, opacity: 0.75 }}>WORKLY</div>
          <Link href="/student" style={{ textDecoration: "none", fontWeight: 1000 }}>✕</Link>
        </div>

        <div style={{ marginTop: 14, fontWeight: 1200, fontSize: 38, lineHeight: 1.05, color: "#3a332b" }}>Tell us who you are</div>
        <div style={{ marginTop: 10, opacity: 0.7, fontWeight: 900 }}>Choose a role and a username to continue.</div>

        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          <button type="button" onClick={() => setRole("creator")} style={chooseStyle(role === "creator")}>
            Creator
            <div style={{ marginTop: 4, fontWeight: 950, opacity: 0.9 }}>Offer services to students</div>
          </button>

          <button type="button" onClick={() => setRole("student")} style={chooseStyle(role === "student")}>
            Student
            <div style={{ marginTop: 4, fontWeight: 950, opacity: 0.9 }}>Browse and request help</div>
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
          Saved as: <span style={{ fontWeight: 1200 }}>{cleaned || "-"}</span>
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
