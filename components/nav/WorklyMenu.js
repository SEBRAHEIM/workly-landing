import Link from "next/link"

function Row({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "14px 14px",
        borderRadius: 14,
        border: "1px solid rgba(0,0,0,.10)",
        background: "rgba(255,255,255,.55)",
        fontWeight: 900,
        fontSize: 16,
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  )
}

function SectionTitle({ children }) {
  return (
    <div style={{ marginTop: 14, marginBottom: 8, fontWeight: 900, opacity: .7 }}>
      {children}
    </div>
  )
}

export function WorklyMenuGuest({ open, onClose, onJoin, onSignIn }) {
  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.25)",
        zIndex: 50,
        display: "grid",
        placeItems: "start",
        padding: 14
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(520px, 92vw)",
          background: "rgba(255,255,255,.78)",
          border: "1px solid rgba(0,0,0,.10)",
          borderRadius: 20,
          padding: 14
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontWeight: 900, letterSpacing: ".18em", opacity: .82 }}>WORKLY</div>
          <button onClick={onClose} style={{ border: "none", background: "transparent", fontSize: 22, opacity: .7, cursor: "pointer" }}>×</button>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <Row onClick={onJoin}><span style={{ fontWeight: 1000 }}>Join Workly</span></Row>
          <Row onClick={onSignIn}>Sign in</Row>
        </div>

        <SectionTitle>General</SectionTitle>

        <div style={{ display: "grid", gap: 10 }}>
          <Row onClick={() => {}}>Currency ⬇️</Row>
          <Row onClick={() => {}}>AED</Row>
        </div>

        <SectionTitle></SectionTitle>

        <div style={{ display: "grid", gap: 10 }}>
          <Link href="/" onClick={onClose} style={{ textDecoration: "none", color: "inherit" }}>
            <Row onClick={() => {}}>Home</Row>
          </Link>
        </div>
      </div>
    </div>
  )
}

export function WorklyMenuStudent({ open, onClose, username, avatarUrl, onHome, onInbox, onPayments, onBrowse }) {
  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.25)",
        zIndex: 50,
        display: "flex",
        justifyContent: "flex-start"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "85vw",
          maxWidth: 520,
          height: "100%",
          background: "rgba(255,255,255,.88)",
          borderRight: "1px solid rgba(0,0,0,.10)",
          padding: 16,
          boxSizing: "border-box"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontWeight: 900, letterSpacing: ".18em", opacity: .82 }}>WORKLY</div>
          <button onClick={onClose} style={{ border: "none", background: "transparent", fontSize: 22, opacity: .7, cursor: "pointer" }}>×</button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 18, border: "1px solid rgba(0,0,0,.10)", background: "rgba(255,255,255,.55)" }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            border: "1px solid rgba(0,0,0,.12)",
            background: "rgba(234, 246, 200, .55)",
            display: "grid",
            placeItems: "center",
            fontWeight: 900
          }}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="" style={{ width: "100%", height: "100%", borderRadius: 999, objectFit: "cover" }} />
            ) : (
              <span>{String(username || "U").slice(0,1).toUpperCase()}</span>
            )}
          </div>

          <div style={{ fontWeight: 1000, fontSize: 18 }}>
            {username || "Student"}
          </div>
        </div>

        <div style={{ height: 14 }} />

        <div style={{ display: "grid", gap: 10 }}>
          <Row onClick={onHome}>Home</Row>
          <Row onClick={onInbox}>Inbox</Row>
          <Row onClick={onPayments}>Payments</Row>
          <Row onClick={onBrowse}>Browse categories</Row>
        </div>
      </div>
    </div>
  )
}
