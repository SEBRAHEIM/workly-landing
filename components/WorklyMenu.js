import Link from "next/link"

export default function WorklyMenu({ open, onClose, mode, username }) {
  if (!open) return null

  return (
    <>
      <div className="worklyDrawerOverlay" onClick={onClose} />
      <aside className="worklyDrawer" role="dialog" aria-modal="true">
        <div className="worklyDrawerHeader">
          <div className="worklyDrawerLogo">WORKLY</div>
          <button className="worklyCloseBtn" onClick={onClose} aria-label="Close menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {mode === "guest" ? (
          <>
            <Link className="worklyDrawerItem" href="/auth" onClick={onClose}>
              <span>Join Workly</span>
              <span />
            </Link>

            <Link className="worklyDrawerItem" href="/auth?mode=signin" onClick={onClose}>
              <span>Sign in</span>
              <span />
            </Link>

            <div className="worklyDrawerSectionLabel">General</div>

            <div className="worklyDrawerItem" role="button" tabIndex={0}>
              <span>Currency</span>
              <span style={{ fontWeight: 950 }}>AED</span>
            </div>

            <Link className="worklyDrawerItem" href="/" onClick={onClose}>
              <span>Home</span>
              <span />
            </Link>

            <div style={{ marginTop: "auto", padding: "12px 6px", color: "rgba(0,0,0,.50)", fontWeight: 900 }}>
              workly.day
            </div>
          </>
        ) : (
          <>
            <div style={{ padding: "8px 6px 2px", fontWeight: 950 }}>
              {username || "Student"}
            </div>

            <Link className="worklyDrawerItem" href="/" onClick={onClose}>
              <span>Home</span>
              <span />
            </Link>

            <Link className="worklyDrawerItem" href="/dashboard" onClick={onClose}>
              <span>Dashboard</span>
              <span />
            </Link>

            <Link className="worklyDrawerItem" href="/#categories" onClick={onClose}>
              <span>Browse categories</span>
              <span />
            </Link>

            <div style={{ marginTop: "auto", padding: "12px 6px", color: "rgba(0,0,0,.50)", fontWeight: 900 }}>
              workly.day
            </div>
          </>
        )}
      </aside>
    </>
  )
}
