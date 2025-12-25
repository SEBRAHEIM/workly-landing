import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

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
        for (let i = 0; i < 30; i++) {
          const { data: s } = await supabase.auth.getSession();
          if (s?.session?.access_token) break;
          await new Promise((r) => setTimeout(r, 120));
        }

        const { data: u1 } = await supabase.auth.getUser();
        if (!u1?.user) {
          window.location.replace("/auth");
          return;
        }

        const meta = u1.user.user_metadata || {};
        const role = String(meta.role || "");
        const username = String(meta.username || "");

        if (roleOk(role) && usernameOk(username)) {
          window.location.replace(role === "creator" ? "/creator/dashboard" : "/student/dashboard");
          return;
        }

        window.location.replace("/auth/profile");
      } catch {
        if (!alive) return;
        setStatus("Router failed. Tap Auth and sign in again.");
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
