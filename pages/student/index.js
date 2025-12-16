import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";

export default function StudentHome() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/auth");
      return;
    }
    if (profile?.role && profile.role !== "student") {
      router.replace("/creator");
      return;
    }
  }, [loading, user, profile, router]);

  if (loading) return null;
  if (!user) return null;
  if (profile?.role && profile.role !== "student") return null;

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
      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 1200 }}>Menu</h1>
      <div style={{ marginTop: 10, opacity: 0.75, fontWeight: 900 }}>
        Welcome, {profile?.username || "student"}
      </div>

      <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
        <Tile href="/student/requests" title="My requests" desc="Track negotiation and your offers." />
        <Tile href="/student/orders" title="My orders" desc="Active and completed orders." />
        <Tile href="/student/wallet" title="Wallet" desc="Balance, payouts, and history." />
        <Tile href="/student/saved" title="Saved" desc="Creators and items you saved." />
        <Tile href="/student/messages" title="Messages" desc="Chat and updates." />
        <Tile href="/profile/edit" title="Edit profile" desc="Username, bio, nationality, avatar." />
      </div>

      <div style={{ marginTop: 18, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.10)", background: "rgba(0,0,0,0.02)" }}>
        <div style={{ fontWeight: 1000 }}>Browse creators</div>
        <div style={{ marginTop: 8, opacity: 0.75, fontWeight: 900 }}>
          Go to Home then pick a category to view creators.
        </div>
        <div style={{ marginTop: 10 }}>
          <Link href="/" style={{ fontWeight: 1100, textDecoration: "none" }}>Go Home</Link>
        </div>
      </div>
    </div>
  );
}
