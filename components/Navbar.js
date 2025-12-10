import Link from "next/link";
import { useState } from "react";

export default function Navbar({ user }) {
  const [open, setOpen] = useState(false);
  const isLoggedIn = Boolean(user);

  return (
    <>
      <header className="workly-nav">
        <button
          type="button"
          className="workly-nav-hamburger"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <span className="workly-nav-hamburger-line" />
          <span className="workly-nav-hamburger-line" />
          <span className="workly-nav-hamburger-line" />
        </button>

        <div className="workly-nav-logo">WORKLY</div>

        {!isLoggedIn && (
          <Link href="/join" className="workly-nav-join">
            Join
          </Link>
        )}
      </header>

      <div
        className="workly-menu-overlay"
        data-open={open ? "true" : "false"}
        onClick={() => setOpen(false)}
      >
        <div
          className="workly-menu-panel"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="workly-menu-header">
            <div className="workly-menu-title">
              {isLoggedIn ? user : "WORKLY"}
            </div>
            <button
              type="button"
              className="workly-menu-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          {!isLoggedIn && (
            <div className="workly-menu-section">
              <div className="workly-menu-section-label">Account</div>
              <Link href="/join" className="workly-menu-link">
                Join Workly
              </Link>
              <Link href="/signin" className="workly-menu-link">
                Sign in
              </Link>
            </div>
          )}

          {isLoggedIn && (
            <div className="workly-menu-section">
              <div className="workly-menu-section-label">Account</div>
              <Link href="/" className="workly-menu-link">
                Home
              </Link>
              <Link href="/orders" className="workly-menu-link">
                My projects
              </Link>
              <Link href="/profile" className="workly-menu-link">
                My profile
              </Link>
            </div>
          )}

          <div className="workly-menu-section">
            <div className="workly-menu-section-label">For students</div>
            <Link href="/#categories" className="workly-menu-link">
              Browse categories
            </Link>
            <Link href="/#how-workly-works" className="workly-menu-link">
              How Workly works
            </Link>
          </div>

          <div className="workly-menu-section">
            <div className="workly-menu-section-label">General</div>
            <Link href="/about" className="workly-menu-link">
              About Workly
            </Link>
            <Link href="/support" className="workly-menu-link">
              Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
