import { useMemo, useState } from "react";
import { WORKLY } from "../../../lib/worklyConfig";
import { useAuth } from "../../../context/AuthContext";

export default function CreatorSetup() {
  const { session } = useAuth();
  const [username, setUsername] = useState("");
  const [nationality, setNationality] = useState("AE");
  const [bio, setBio] = useState("");
  const [cats, setCats] = useState([]);
  const [pill, setPill] = useState("");
  const [err, setErr] = useState("");

  const token = session?.access_token || "";

  const flags = WORKLY.flags;
  const categories = WORKLY.categories;

  const canSave = useMemo(() => {
    return !!token && !!username && cats.length > 0;
  }, [token, username, cats.length]);

  const toggle = (slug) => {
    setCats((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]));
  };

  const save = async () => {
    setErr("");
    setPill("");
    try {
      const r = await fetch("/api/market/profile", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: "creator", username, nationality, bio })
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setErr(j.error || "Could not save profile");
        return;
      }
      setPill("Saved. You can continue later anytime.");
    } catch (e) {
      setErr("Could not save profile");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 720 }}>
      <h1 style={{ margin: 0 }}>Creator setup</h1>
      <p style={{ opacity: 0.75, marginTop: 8 }}>
        You can do a bit now and finish later.
      </p>

      {pill ? <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: "rgba(31,77,44,0.08)" }}>{pill}</div> : null}
      {err ? <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: "rgba(220,0,0,0.08)" }}>{err}</div> : null}

      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 900, marginBottom: 6 }}>Username</div>
        <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }} />
      </div>

      <div style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 900, marginBottom: 6 }}>Nationality</div>
        <select value={nationality} onChange={(e) => setNationality(e.target.value)} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }}>
          {flags.map((f) => (
            <option key={f.code} value={f.code}>{f.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 900, marginBottom: 6 }}>Bio</div>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)" }} />
        <div style={{ opacity: 0.65, marginTop: 6 }}>
          No phone, no email, no social usernames.
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 900, marginBottom: 10 }}>Categories</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => toggle(c.slug)}
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                border: "1px solid rgba(0,0,0,0.12)",
                background: cats.includes(c.slug) ? "rgba(31,77,44,0.10)" : "rgba(0,0,0,0.03)",
                fontWeight: 900,
                cursor: "pointer"
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={!canSave}
        onClick={save}
        style={{
          marginTop: 18,
          width: "100%",
          padding: 14,
          borderRadius: 999,
          border: "1px solid rgba(0,0,0,0.12)",
          background: canSave ? "#fff" : "rgba(0,0,0,0.03)",
          fontWeight: 1000,
          cursor: canSave ? "pointer" : "not-allowed"
        }}
      >
        Save
      </button>
    </div>
  );
}
