import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function PostAuth() {
  const [msg, setMsg] = useState("Preparing your account...");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const u = data?.user;
        if (!u) {
          window.location.href = "/auth";
          return;
        }

        const confirmed = !!u.email_confirmed_at;

        if (!confirmed && u.app_metadata?.provider === "email") {
          await supabase.auth.signOut();
          window.location.href = `/auth/check-email?email=${encodeURIComponent(u.email || "")}`;
          return;
        }

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
