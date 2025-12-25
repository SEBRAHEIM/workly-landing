import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function DashboardRouter() {
  const { user, profile, loading } = useAuth();
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    if (loading) {
      setStatus("Loading...");
      return;
    }

    if (!user) {
      window.location.replace("/auth");
      return;
    }

    const role = String(profile?.role || "");
    const username = String(profile?.username || "").trim();

    if (!(role === "student" || role === "creator") || username.length < 3) {
      window.location.replace("/auth/profile");
      return;
    }

    window.location.replace(role === "creator" ? "/creator/dashboard" : "/student/dashboard");
  }, [loading, user, profile]);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#ece9e2" }}>
      <div style={{ maxWidth: 520, width: "100%", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
        <div style={{ fontWeight: 1100 }}>{status}</div>
      </div>
    </div>
  );
}
