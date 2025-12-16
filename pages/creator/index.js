import Link from "next/link";

export default function CreatorDashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ margin: 0 }}>Creator</h1>
      <p style={{ opacity: 0.75, marginTop: 8 }}>
        Manage your profile, categories, samples, and pricing negotiations.
      </p>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 18 }}>
        <Link href="/creator/setup">Setup</Link>
        <Link href="/creator/orders">Orders</Link>
        <Link href="/creator/profile">Profile</Link>
      </div>
    </div>
  );
}
