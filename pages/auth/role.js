import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

export default function RolePage() {
  const router = useRouter();
  const { session, user, loading, profile } = useAuth();

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const token = session?.access_token || "";

  const choose = async (role) => {
    setErr("");
    if (!token) {
      router.replace("/auth");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/auth/set-role", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "set_role_failed");
      window.location.href = role === "creator" ? "/creator" : "/student";
    } catch (e) {
      setErr(String(e?.message || e));
    } finally {
      setBusy(false);
    }
  };

  if (loading) return null;

  if (!user) {
    return (
      <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ margin: 0, fontWeight: 1200 }}>Choose your role</h1>
        <div style={{ marginTop: 10, opacity: 0.75, fontWeight: 900 }}>
          Please sign in first.
        </div>
        <div style={{ marginTop: 12 }}>
          <button
            type="button"
            onClick={() => router.replace("/auth")}
            style={{ padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)", background: "#fff", fontWeight: 1100, cursor: "pointer" }}
          >
            Go to Auth
          </button>
        </div>
      </div>
    );
  }

  if (profile?.role === "student") {
    if (typeof window !== "undefined") window.location.href = "/student";
    return null;
  }

  if (profile?.role === "creator") {
    if (typeof window !== "undefined") window.location.href = "/creator";
    return null;
  }

  return (
    <div style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ margin: 0, fontWeight: 1200 }}>Choose your role</h1>
      <div style={{ marginTop: 10, opacity: 0.75, fontWeight: 900 }}>
        This choice is saved to your account for future logins.
      </div>

      {err ? (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", fontWeight: 900 }}>
          {err}
        </div>
      ) : null}

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
        <button
          type="button"
          disabled={busy}
          onClick={() => choose("student")}
          style={{ padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.12)", background: "#fff", fontWeight: 1100, cursor: "pointer", textAlign: "left" }}
        >
          Student
          <div style={{ marginTop: 8, opacity: 0.75, fontWeight: 900 }}>
            Browse creators and request work.
          </div>
        </button>

        <button
          type="button"
          disabled={busy}
          onClick={() => choose("creator")}
          style={{ padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.12)", background: "#fff", fontWeight: 1100, cursor: "pointer", textAlign: "left" }}
        >
          Creator
          <div style={{ marginTop: 8, opacity: 0.75, fontWeight: 900 }}>
            Receive requests and negotiate with numbers.
          </div>
        </button>
      </div>
    </div>
  );
}
