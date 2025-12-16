import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ margin: 0 }}>Student</h1>
      <p style={{ opacity: 0.75, marginTop: 8 }}>
        Browse categories, view creators, request work, track orders, wallet and history.
      </p>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 18 }}>
        <Link href="/student/orders">Orders</Link>
        <Link href="/student/wallet">Wallet</Link>
      </div>
    </div>
  );
}
