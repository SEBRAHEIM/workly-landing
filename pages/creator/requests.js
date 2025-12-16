import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { moneyToCents, centsToMoney } from "../../lib/money";

export default function CreatorRequests() {
  const { session, profile, loading } = useAuth();
  const token = session?.access_token || "";

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [requests, setRequests] = useState([]);

  const [selected, setSelected] = useState("");
  const [amount, setAmount] = useState("");

  const isCreator = !loading && profile?.role === "creator";

  const load = async () => {
    setErr("");
    if (!token) return;
    try {
      setBusy(true);
      const r = await fetch("/api/market/request", { headers: { authorization: `Bearer ${token}` } });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "failed");
      setRequests(Array.isArray(j.requests) ? j.requests : []);
    } catch (_e) {
      setErr("Could not load requests.");
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    load();
  }, [token]);

  const send = async (is_final) => {
    setErr("");
    const cents = moneyToCents(amount);
    if (!cents) {
      setErr("Enter a valid amount.");
      return;
    }
    try {
      setBusy(true);
      const r = await fetch("/api/market/offer", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ request_id: selected, amount, is_final })
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setErr(j.error || "Could not send offer.");
        return;
      }
      setAmount("");
      await load();
    } catch (_e) {
      setErr("Could not send offer.");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return null;

  return (
    <div style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0 }}>Requests</h1>
          <div style={{ opacity: 0.75, marginTop: 8 }}>Reply with numbers only (AED).</div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/" style={{ fontWeight: 900 }}>Home</Link>
          <Link href="/creator" style={{ fontWeight: 900 }}>Creator</Link>
          <Link href="/creator/setup" style={{ fontWeight: 900 }}>Setup</Link>
        </div>
      </div>

      {!token ? (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: "rgba(0,0,0,0.04)", fontWeight: 900 }}>
          Please sign in to view requests.
        </div>
      ) : null}

      {!isCreator && token ? (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", fontWeight: 900 }}>
          Creators only.
        </div>
      ) : null}

      {err ? <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", fontWeight: 900 }}>{err}</div> : null}

      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        {(requests || []).map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setSelected(r.id)}
            style={{
              textAlign: "left",
              padding: 14,
              borderRadius: 16,
              border: selected === r.id ? "2px solid rgba(31,77,44,0.35)" : "1px solid rgba(0,0,0,0.10)",
              background: "#fff",
              cursor: "pointer"
            }}
          >
            <div style={{ fontWeight: 1000 }}>Request</div>
            <div style={{ marginTop: 8, opacity: 0.75, fontWeight: 900 }}>Status: {r.status}</div>
            <div style={{ marginTop: 8, opacity: 0.75, fontWeight: 900 }}>Category: {r.category_slug}</div>
          </button>
        ))}
      </div>

      {token && isCreator ? (
        <div style={{ marginTop: 14, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.10)", background: "#fff" }}>
          <div style={{ fontWeight: 1000 }}>Send a number</div>
          <div style={{ marginTop: 8, opacity: 0.75 }}>Select a request then enter amount (AED).</div>

          <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Example: 200"
              inputMode="decimal"
              style={{ padding: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)", minWidth: 220, fontWeight: 900 }}
            />
            <button
              type="button"
              disabled={!selected || !moneyToCents(amount) || busy}
              onClick={() => send(false)}
              style={{ padding: "12px 16px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.12)", background: "#fff", fontWeight: 1000, cursor: "pointer" }}
            >
              Counter
            </button>
            <button
              type="button"
              disabled={!selected || !moneyToCents(amount) || busy}
              onClick={() => send(true)}
              style={{ padding: "12px 16px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.12)", background: "#fff", fontWeight: 1000, cursor: "pointer" }}
            >
              Finalize
            </button>
            {moneyToCents(amount) ? (
              <div style={{ opacity: 0.75, fontWeight: 1000 }}>AED {centsToMoney(moneyToCents(amount))}</div>
            ) : null}
          </div>
        </div>
      ) : null}

      {busy ? <div style={{ marginTop: 10, opacity: 0.7, fontWeight: 900 }}>Loading…</div> : null}
    </div>
  );
}
