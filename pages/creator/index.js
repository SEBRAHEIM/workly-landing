import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

export default function CreatorHome() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/auth");
      return;
    }
    if (profile?.role && profile.role !== "creator") {
      router.replace("/student");
      return;
    }
  }, [loading, user, profile, router]);

  if (loading) return null;
  if (!user) return null;
  if (profile?.role && profile.role !== "creator") return null;

  const Tile = ({ href, title, desc }) => (
    <Link
      href={href}
      style={{
        display: "block",
        padding: 16,
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.10)",
        background: "#fff",
        textDecoration: "none",
        color: "inherit"
      }}
    >
      <div style={{ fontWeight: 1100, fontSize: 16 }}>{title}</div>
      <div style={{ marginTop: 8, opacity: 0.75, fontWeight: 900, lineHeight: 1.45 }}>{desc}</div>
    </Link>
  );

  return (
    <div style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 1200 }}>Creator</h1>
      <div style={{ marginTop: 10, opacity: 0.75, fontWeight: 900 }}>
        Welcome, {profile?.username || "creator"}
      </div>

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        <Tile href="/creator/requests" title="Requests" desc="See new requests and negotiate with numbers only." />
        <Tile href="/creator/setup" title="Setup" desc="Categories, samples, and profile readiness." />
        <Tile href="/profile/edit" title="Edit profile" desc="Bio, nationality, avatar and more." />
      </div>

      <div style={{ marginTop: 18, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.02)" }}>
        <div style={{ fontWeight: 1000 }}>Tip</div>
        <div style={{ marginTop: 8, opacity: 0.75, fontWeight: 900 }}>
          Complete setup so students can request you directly from categories.
        </div>
        <div style={{ marginTop: 10 }}>
          <Link href="/creator/setup" style={{ fontWeight: 1100, textDecoration: "none" }}>Open setup</Link>
        </div>
      </div>
    </div>
  );
}
