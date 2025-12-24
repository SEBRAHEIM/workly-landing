import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";

export default function StudentDashboard() {
  const { user, loading, profile } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      window.location.href = "/auth";
      return;
    }
    const r = String(profile?.role || "");
    const u = String(profile?.username || "");
    if (!r || !u) window.location.href = "/auth/profile";
    else if (r !== "student") window.location.href = "/creator/dashboard";
  }, [loading, user, profile]);

  const signOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#ece9e2", display: "grid", placeItems: "center", padding: 24 }}>
        <div style={{ maxWidth: 520, width: "100%", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)", fontWeight: 1100 }}>
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ece9e2", padding: 24 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 1200, fontSize: 28, color: "#3a332b" }}>Student dashboard</div>
            <div style={{ marginTop: 8, opacity: 0.75, fontWeight: 900 }}>
              Welcome{profile?.username ? `, ${profile.username}` : ""}.
            </div>
          </div>
          <button
            type="button"
            disabled={signingOut}
            onClick={signOut}
            style={{ border: 0, background: "#4b443b", color: "#fff", padding: "12px 14px", borderRadius: 999, fontWeight: 1100, cursor: signingOut ? "not-allowed" : "pointer" }}
          >
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>

        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          <div style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.03)", fontWeight: 900, opacity: 0.9 }}>
            Student actions
          </div>
          <div style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.03)", fontWeight: 900, opacity: 0.85 }}>
            Browse creators, create requests, manage messages.
          </div>
        </div>
      </div>
    </div>
  );
}
