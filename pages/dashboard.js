import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DashboardRouter() {
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data: u1 } = await supabase.auth.getUser();
        const user = u1?.user;
        if (!user) {
          window.location.href = "/auth";
          return;
        }

        const { data: s1 } = await supabase.auth.getSession();
        const token = s1?.session?.access_token || "";
        if (!token) {
          window.location.href = "/auth";
          return;
        }

        const r = await fetch("/api/auth/profile-health", { headers: { authorization: `Bearer ${token}` } });
        const j = await r.json().catch(() => ({}));
        const role = String(j?.profile?.role || "");
        const username = String(j?.profile?.username || "");

        if (!role || !username) {
          window.location.href = "/auth/profile";
          return;
        }

        window.location.href = role === "creator" ? "/creator/dashboard" : "/student/dashboard";
      } catch (e) {
        if (!alive) return;
        setMsg(String(e?.message || e));
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#ece9e2" }}>
      <div style={{ maxWidth: 520, width: "100%", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)", fontWeight: 1100 }}>
        {msg}
      </div>
    </div>
  );
}
