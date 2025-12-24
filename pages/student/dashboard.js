import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfileOrNull, isCompleteProfile } from "../../lib/routeGuards";

export default function StudentDashboard() {
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const p = await getProfileOrNull();
        if (!p) {
          window.location.replace("/auth");
          return;
        }

        if (!isCompleteProfile(p)) {
          window.location.replace("/auth/profile");
          return;
        }

        if (String(p.role) !== "student") {
          window.location.replace("/dashboard");
          return;
        }

        if (!alive) return;
        setMsg("");
      } catch {
        window.location.replace("/dashboard");
      }
    })();
    return () => { alive = false; };
  }, []);

  if (msg) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, background: "#ece9e2" }}>
        <div style={{ maxWidth: 520, width: "100%", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)", fontWeight: 1100 }}>
          {msg}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ece9e2", padding: 24 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ fontWeight: 1100, letterSpacing: 4, opacity: 0.75 }}>WORKLY</div>
          <Link href="/" style={{ textDecoration: "none", fontWeight: 1000 }}>Home</Link>
        </div>
        <div style={{ marginTop: 14, fontWeight: 1200, fontSize: 30, color: "#3a332b" }}>Student dashboard</div>
        <div style={{ marginTop: 8, opacity: 0.75, fontWeight: 900 }}>You’re signed in as a Student.</div>
        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/student/requests" style={{ padding: "10px 14px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.12)", textDecoration: "none", fontWeight: 1000, color: "#4b443b" }}>Requests</Link>
          <Link href="/student/messages" style={{ padding: "10px 14px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.12)", textDecoration: "none", fontWeight: 1000, color: "#4b443b" }}>Messages</Link>
          <Link href="/student/orders" style={{ padding: "10px 14px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.12)", textDecoration: "none", fontWeight: 1000, color: "#4b443b" }}>Orders</Link>
        </div>
      </div>
    </div>
  );
}
