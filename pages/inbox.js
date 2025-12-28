import Link from "next/link"

export default function Inbox() {
  return (
    <div style={{ minHeight: "100vh", background: "#f3efe7", padding: 16, boxSizing: "border-box" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <Link href="/" style={{ textDecoration: "none", fontWeight: 950, color: "#2d2a24" }}>← Home</Link>
          <div style={{ letterSpacing: ".34em", fontWeight: 950, opacity: 0.72 }}>WORKLY</div>
          <div style={{ width: 70 }} />
        </div>

        <div style={{
          background: "rgba(255,255,255,0.60)",
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 24,
          padding: 18
        }}>
          <div style={{ fontWeight: 950, fontSize: 34, lineHeight: 1.06, color: "#2d2a24" }}>Inbox</div>
          <div style={{ marginTop: 10, fontWeight: 900, opacity: 0.72 }}>
            Placeholder page. Next: messages/requests between student and creators.
          </div>
        </div>
      </div>
    </div>
  )
}
