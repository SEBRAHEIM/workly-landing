import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function StudentDashboard() {
  const { user, loading, profile } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      window.location.href = "/auth";
      return;
    }
    const r = profile?.role || "";
    if (!r) window.location.href = "/auth/profile";
    else if (r !== "student") window.location.href = "/creator/dashboard";
  }, [loading, user, profile]);

  if (loading) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#ece9e2", padding: 24 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
        <div style={{ fontWeight: 1200, fontSize: 28, color: "#3a332b" }}>Student dashboard</div>
        <div style={{ marginTop: 10, opacity: 0.75, fontWeight: 900 }}>
          Welcome{profile?.username ? `, ${profile.username}` : ""}.
        </div>
      </div>
    </div>
  );
}
