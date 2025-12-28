export default function AuthCard({ title, subtitle, topRight, children }) {
  return (
    <div style={{
      width: "min(560px, 92vw)",
      background: "rgba(255,255,255,0.62)",
      border: "1px solid rgba(0,0,0,0.10)",
      borderRadius: 22,
      padding: 22,
      boxSizing: "border-box",
      maxHeight: "86vh",
      overflow: "auto",
      WebkitOverflowScrolling: "touch"
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ letterSpacing: ".18em", fontWeight: 950, opacity: .82 }}>WORKLY</div>
        <div>{topRight || null}</div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 40, lineHeight: 1.06, fontWeight: 950, margin: 0 }}>
          {title}
        </div>
        {subtitle ? (
          <div style={{ marginTop: 10, fontWeight: 850, opacity: .72, fontSize: 14 }}>
            {subtitle}
          </div>
        ) : null}
      </div>

      {children}
    </div>
  )
}
