import Link from "next/link"

export default function NavDrawer({ open, onClose, variant, profile, onSignOut }) {
  const isStudent = variant === "student"
  const isGuest = variant === "guest"

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.22)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 160ms ease",
          zIndex: 50
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "85vw",
          maxWidth: 420,
          background: "#f3efe7",
          borderRight: "1px solid rgba(0,0,0,0.10)",
          transform: open ? "translateX(0)" : "translateX(-102%)",
          transition: "transform 180ms ease",
          zIndex: 60,
          padding: 16,
          boxSizing: "border-box",
          overflowY: "auto"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ letterSpacing: ".22em", fontWeight: 900, opacity: 0.85 }}>WORKLY</div>
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.10)",
              background: "rgba(255,255,255,0.65)",
              fontSize: 18,
              fontWeight: 900,
              cursor: "pointer"
            }}
          >
            ×
          </button>
        </div>

        {isStudent ? (
          <div style={{ padding: 14, borderRadius: 18, background: "rgba(255,255,255,0.62)", border: "1px solid rgba(0,0,0,0.08)", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 999,
                  background: "rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.08)"
                }}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 950, fontSize: 16, lineHeight: 1.1, color: "#2d2a24" }}>
                  {profile?.username || "Student"}
                </div>
                <div style={{ fontWeight: 850, opacity: 0.7, marginTop: 4, fontSize: 13 }}>
                  Student account
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div style={{ display: "grid", gap: 10 }}>
          {isGuest ? (
            <>
              <Link href="/auth/email" onClick={onClose} style={itemStyle({ strong: true })}>Join Workly</Link>
              <Link href="/auth/email" onClick={onClose} style={itemStyle({})}>Sign in</Link>
              <div style={sectionStyle()}>General</div>
              <div style={rowStyle()}>
                <div style={{ fontWeight: 900, opacity: 0.82 }}>Currency</div>
                <div style={{ fontWeight: 950, color: "#2d2a24" }}>AED</div>
              </div>
              <Link href="/" onClick={onClose} style={itemStyle({})}>Home</Link>
            </>
          ) : null}

          {isStudent ? (
            <>
              <Link href="/" onClick={onClose} style={itemStyle({})}>Home</Link>
              <Link href="/inbox" onClick={onClose} style={itemStyle({})}>Inbox</Link>
              <Link href="/payments" onClick={onClose} style={itemStyle({})}>Payments</Link>
              <Link href="/#categories" onClick={onClose} style={itemStyle({})}>Browse categories</Link>
              <button
                onClick={() => { onClose(); onSignOut && onSignOut() }}
                style={{
                  ...itemStyle({ button: true }),
                  background: "rgba(255,255,255,0.62)",
                  border: "1px solid rgba(0,0,0,0.10)"
                }}
              >
                Sign out
              </button>
            </>
          ) : null}
        </div>

        <div style={{ height: 18 }} />
        <div style={{ fontWeight: 850, opacity: 0.6, fontSize: 12, lineHeight: 1.4 }}>
          workly.day
        </div>
      </div>
    </>
  )
}

function itemStyle({ strong, button }) {
  return {
    display: "block",
    width: "100%",
    textDecoration: "none",
    padding: "14px 14px",
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.62)",
    color: "#2d2a24",
    fontWeight: strong ? 950 : 900,
    cursor: button ? "pointer" : "pointer",
    textAlign: "left"
  }
}

function sectionStyle() {
  return {
    marginTop: 6,
    padding: "6px 4px 0 4px",
    fontWeight: 950,
    letterSpacing: ".06em",
    opacity: 0.6,
    fontSize: 12
  }
}

function rowStyle() {
  return {
    padding: "12px 14px",
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.08)",
    background: "rgba(255,255,255,0.45)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
}
