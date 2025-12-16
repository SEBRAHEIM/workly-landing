import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { WORKLY } from "../../lib/worklyConfig";
import { useAuth } from "../../context/AuthContext";
import { moneyToCents, centsToMoney } from "../../lib/money";

export default function CreatorProfilePage() {
  const router = useRouter();
  const { username } = router.query;

  const { session, user, profile, loading } = useAuth();
  const token = session?.access_token || "";

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [creator, setCreator] = useState(null);
  const [categories, setCategories] = useState([]);
  const [samples, setSamples] = useState([]);

  const [amount, setAmount] = useState("");
  const [pill, setPill] = useState("");

  const isAuthed = !!user && !loading;
  const isStudent = isAuthed && profile?.role === "student";

  useEffect(() => {
    if (!username) return;
    let stop = false;

    (async () => {
      setErr("");
      setBusy(true);
      try {
        const r = await fetch(`/api/market/creator?username=${encodeURIComponent(String(username))}`);
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j.error || "failed");
        if (stop) return;
        setCreator(j.creator || null);
        setCategories(Array.isArray(j.categories) ? j.categories : []);
        setSamples(Array.isArray(j.samples) ? j.samples : []);
      } catch (_e) {
        if (stop) return;
        setErr("Creator not found.");
      } finally {
        if (stop) return;
        setBusy(false);
      }
    })();

    return () => {
      stop = true;
    };
  }, [username]);

  const catNames = useMemo(() => {
    const set = new Set((categories || []).map((x) => String(x.category_slug || "")));
    return WORKLY.categories.filter((c) => set.has(c.slug)).map((c) => c.name);
  }, [categories]);

  const requestWork = async () => {
    setErr("");
    setPill("");
    const cents = moneyToCents(amount);
    if (!cents) {
      setErr("Enter a valid amount.");
      return;
    }
    if (!token) {
      router.push("/auth");
      return;
    }
    if (!isStudent) {
      setErr("Only students can request work.");
      return;
    }
    const category_slug = (categories && categories[0] && categories[0].category_slug) ? String(categories[0].category_slug) : "";
    if (!category_slug) {
      setErr("Creator has no category yet.");
      return;
    }

    try {
      setBusy(true);
      const r = await fetch("/api/market/request", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ category_slug, creator_id: creator.id, amount })
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setErr(j.error || "Could not create request.");
        return;
      }
      setPill(`Request sent. Your offer: AED ${centsToMoney(cents)}`);
      router.push("/student/requests");
    } catch (_e) {
      setErr("Could not create request.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0 }}>{busy && !creator ? "Loading…" : creator?.username || "Creator"}</h1>
          <div style={{ opacity: 0.75, marginTop: 8 }}>
            {creator?.nationality ? `Nationality: ${creator.nationality}` : "Nationality not set"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/" style={{ fontWeight: 900 }}>Home</Link>
          <Link href="/auth" data-join style={{ fontWeight: 900 }}>Auth</Link>
          {isStudent ? <Link href="/student/requests" style={{ fontWeight: 900 }}>My requests</Link> : null}
        </div>
      </div>

      {err ? <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", fontWeight: 900 }}>{err}</div> : null}
      {pill ? <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: "rgba(31,77,44,0.08)", fontWeight: 900 }}>{pill}</div> : null}

      {creator ? (
        <>
          <div style={{ marginTop: 18, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.10)", background: "#fff" }}>
            <div style={{ fontWeight: 1000 }}>About</div>
            <div style={{ marginTop: 10, opacity: 0.78, lineHeight: 1.6 }}>
              {creator.bio ? creator.bio : "No bio yet."}
            </div>

            <div style={{ marginTop: 14, fontWeight: 1000 }}>Categories</div>
            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
              {(catNames.length ? catNames : ["Not set"]).map((n) => (
                <div key={n} style={{ padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.02)", fontWeight: 900 }}>
                  {n}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 14, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.10)", background: "#fff" }}>
            <div style={{ fontWeight: 1000 }}>Work samples</div>
            <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
              {(samples || []).length ? samples.map((s) => (
                <a
                  key={s.id}
                  href={s.file_url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ padding: 12, borderRadius: 14, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.02)", fontWeight: 900 }}
                >
                  <div style={{ fontWeight: 1000 }}>{s.title}</div>
                  <div style={{ marginTop: 8, opacity: 0.7, fontWeight: 900 }}>{s.file_type || "file"}</div>
                </a>
              )) : (
                <div style={{ opacity: 0.7, fontWeight: 900 }}>No samples yet.</div>
              )}
            </div>
          </div>

          <div style={{ marginTop: 14, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.10)", background: "#fff" }}>
            <div style={{ fontWeight: 1000 }}>Request work</div>
            <div style={{ marginTop: 10, opacity: 0.75 }}>
              Numbers only. Currency: AED.
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Example: 150"
                inputMode="decimal"
                style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)", minWidth: 220, fontWeight: 900 }}
              />
              <button
                type="button"
                disabled={busy}
                onClick={requestWork}
                style={{ padding: "12px 16px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.12)", background: "#fff", fontWeight: 1000, cursor: "pointer" }}
              >
                Send offer
              </button>
              {!isAuthed ? <Link href="/auth" data-join style={{ fontWeight: 1000 }}>Join to request</Link> : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
