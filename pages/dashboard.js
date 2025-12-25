import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

async function getProfile(token) {
  const ctrl = new AbortController();
  const to = setTimeout(() => ctrl.abort(), 6000);
  try {
    const r = await fetch("/api/auth/profile-health", {
      headers: { authorization: `Bearer ${token}` },
      signal: ctrl.signal
    });
    const j = await r.json().catch(() => ({}));
    return j?.profile || null;
  } finally {
    clearTimeout(to);
  }
}

function roleOk(role) {
  return role === "student" || role === "creator";
}

function usernameOk(username) {
  return String(username || "").trim().length >= 3;
}

export default function DashboardRouter() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const { data: u1 } = await supabase.auth.getUser();
        if (!u1?.user) {
          window.location.replace("/auth");
          return;
        }

        let token = "";
        for (let i = 0; i < 20; i++) {
          const { data: s1 } = await supabase.auth.getSession();
          token = s1?.session?.access_token || "";
          if (token) break;
          await new Promise((r) => setTimeout(r, 150));
        }

        if (!token) {
          if (!alive) return;
          setStatus("Session not ready. Tap Refresh once.");
          return;
        }

        const p = await getProfile(token);
        if (!p) {
          if (!alive) return;
          setStatus("Profile not reachable. Tap Refresh. If it repeats, sign out then sign in.");
          return;
        }

        const role = String(p.role || "");
        const username = String(p.username || "");

        if (!roleOk(role) || !usernameOk(username)) {
          window.location.replace("/auth/profile");
          return;
        }

        window.location.replace(role === "creator" ? "/creator/dashboard" : "/student/dashboard");
      } catch {
        if (!alive) return;
        setStatus("Router blocked. Tap Refresh.");
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#ece9e2" }}>
      <div style={{ maxWidth: 520, width: "100%", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
        <div style={{ fontWeight: 1100 }}>{status}</div>
        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="/dashboard" style={{ padding: "10px 14px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.12)", textDecoration: "none", fontWeight: 1000, color: "#4b443b" }}>Refresh</a>
          <Link href="/auth/profile" style={{ padding: "10px 14px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.12)", textDecoration: "none", fontWeight: 1000, color: "#4b443b" }}>Role picker</Link>
          <Link href="/auth" style={{ padding: "10px 14px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.12)", textDecoration: "none", fontWeight: 1000, color: "#4b443b" }}>Auth</Link>
        </div>
      </div>
    </div>
  );
}
