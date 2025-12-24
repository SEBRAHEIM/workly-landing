import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DashboardRouter() {
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data: u1 } = await supabase.auth.getUser();
        if (!u1?.user) {
          window.location.href = "/auth";
          return;
        }
        window.location.replace("/auth/profile");
      } catch {
        if (!alive) return;
        window.location.href = "/auth";
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#ece9e2" }}>
      <div style={{ maxWidth: 520, width: "100%", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)", fontWeight: 1100 }}>
        Loading...
      </div>
    </div>
  );
}
