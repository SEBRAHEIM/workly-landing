import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AuthCallback() {
  const [msg, setMsg] = useState("Finishing sign-in...");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
        if (error) throw error;
        if (!alive) return;
        window.location.href = "/auth/profile";
      } catch (e) {
        if (!alive) return;
        setMsg(String(e?.message || e));
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#ece9e2" }}>
      <div style={{ maxWidth: 520, width: "100%", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)", fontWeight: 1100 }}>
        {msg}
      </div>
    </div>
  );
}
