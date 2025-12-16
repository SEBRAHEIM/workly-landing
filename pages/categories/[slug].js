import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { WORKLY } from "../../lib/worklyConfig";
import { useAuth } from "../../context/AuthContext";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const { user, profile, loading } = useAuth();

  const cat = useMemo(() => WORKLY.categories.find((c) => c.slug === String(slug || "")), [slug]);

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    if (!slug) return;
    let stop = false;

    (async () => {
      setErr("");
      setBusy(true);
      try {
        const r = await fetch(`/api/market/creators-by-category?category=${encodeURIComponent(String(slug))}`);
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j.error || "failed");
        if (stop) return;
        setCreators(Array.isArray(j.creators) ? j.creators : []);
      } catch (_e) {
        if (stop) return;
        setErr("Could not load creators.");
      } finally {
        if (stop) return;
        setBusy(false);
      }
    })();

    return () => {
      stop = true;
    };
  }, [slug]);

  const isAuthed = !!user && !loading;
  const isStudent = isAuthed && profile?.role === "student";
  const isCreator = isAuthed && profile?.role === "creator";

  return (
    <div style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0 }}>{cat ? cat.name : "Category"}</h1>
          <div style={{ opacity: 0.75, marginTop: 8 }}>
            {isStudent ? "Browse creators and request work." : isCreator ? "Creators list (view only)." : "Sign in to request work."}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/" style={{ fontWeight: 900 }}>Home</Link>
          {isStudent ? <Link href="/student/requests" style={{ fontWeight: 900 }}>My requests</Link> : null}
          {isCreator ? <Link href="/creator/requests" style={{ fontWeight: 900 }}>Requests</Link> : null}
          {!isAuthed ? <Link href="/auth" style={{ fontWeight: 900 }}>Join</Link> : null}
        </div>
      </div>

      {err ? <div style={{ marginTop: 14, padding: 12, borderRadius: 14, background: "rgba(220,0,0,0.08)", fontWeight: 900 }}>{err}</div> : null}

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        {(busy ? Array.from({ length: 6 }).map((_, i) => ({ _s: i })) : creators).map((c, i) => {
          if (c && c._s !== undefined) {
            return (
              <div key={i} style={{ padding: 14, borderRadius: 16, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.02)" }}>
                <div style={{ height: 14, width: "55%", borderRadius: 8, background: "rgba(0,0,0,0.07)" }} />
                <div style={{ height: 12, width: "35%", borderRadius: 8, background: "rgba(0,0,0,0.05)", marginTop: 10 }} />
                <div style={{ height: 12, width: "70%", borderRadius: 8, background: "rgba(0,0,0,0.04)", marginTop: 10 }} />
              </div>
            );
          }

          const username = c?.username || "creator";
          const nat = c?.nationality || "";
          const bio = c?.bio || "";

          return (
            <div key={c?.id || i} style={{ padding: 14, borderRadius: 16, border: "1px solid rgba(0,0,0,0.10)", background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontWeight: 1000, fontSize: 16 }}>{username}</div>
                <div style={{ opacity: 0.65, fontWeight: 900 }}>{nat}</div>
              </div>

              <div style={{ marginTop: 10, opacity: 0.75, lineHeight: 1.5 }}>
                {bio ? bio.slice(0, 140) : "Creator profile."}
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href={`/creators/${encodeURIComponent(username)}`} style={{ fontWeight: 1000 }}>
                  View profile
                </Link>
                {!isAuthed ? (
                  <Link href="/auth" style={{ fontWeight: 1000 }}>
                    Join to request
                  </Link>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
