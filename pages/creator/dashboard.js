import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function CreatorDashboard() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data: u1 } = await supabase.auth.getUser();
        const user = u1?.user;
        if (!user) { window.location.href = "/auth"; return; }

        const { data: s1 } = await supabase.auth.getSession();
        const token = s1?.session?.access_token || "";
        if (!token) { window.location.href = "/auth"; return; }

        const r = await fetch("/api/auth/profile-health", { headers: { authorization: `Bearer ${token}` } });
        const j = await r.json().catch(() => ({}));
        const pr = j?.profile || {};
        const role = String(pr.role || "");
        const username = String(pr.username || "");
        if (!role || !username) { window.location.href = "/auth/profile"; return; }
        if (role !== "creator") { window.location.href = "/student/dashboard"; return; }

        if (!alive) return;
        setProfile(pr);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const signOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#ece9e2", display: "grid", placeItems: "center", padding: 24 }}>
        <div style={{ maxWidth: 520, width: "100%", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)", fontWeight: 1100 }}>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ece9e2", padding: 24 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", background: "#fff", borderRadius: 18, padding: 18, border: "1px solid rgba(0,0,0,0.10)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 1200, fontSize: 28, color: "#3a332b" }}>Creator dashboard</div>
            <div style={{ marginTop: 8, opacity: 0.75, fontWeight: 900 }}>Welcome{profile?.username ? `, ${profile.username}` : ""}.</div>
          </div>
          <button type="button" disabled={signingOut} onClick={signOut} style={{ border: 0, background: "#4b443b", color: "#fff", padding: "12px 14px", borderRadius: 999, fontWeight: 1100, cursor: signingOut ? "not-allowed" : "pointer" }}>
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>

        <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
          <Link href="/creator/requests" style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.03)", fontWeight: 1000, color: "#3a332b", textDecoration: "none" }}>
            View requests
          </Link>
          <Link href="/" style={{ padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.03)", fontWeight: 1000, color: "#3a332b", textDecoration: "none" }}>
            Go to homepage (signed in)
          </Link>
        </div>
      </div>
    </div>
  );
}
