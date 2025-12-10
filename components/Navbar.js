import { useState } from "react";
import Link from "next/link";

export default function Navbar({ loggedIn = false, userName }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Top navbar (same for home & category pages) */}
      <header className="top-nav">
        <button
          type="button"
          className="menu-button"
          onClick={openMenu}
          aria-label="Open menu"
        >
          <span className="menu-button-lines">
            <span className="menu-button-line" />
            <span className="menu-button-line" />
            <span className="menu-button-line" />
          </span>
        </button>

        <div className="top-nav-logo">WORKLY</div>

        {!loggedIn ? (
          <Link href="/join" className="top-nav-cta">
            Join
          </Link>
        ) : (
          <div className="top-nav-placeholder" />
        )}
      </header>

      {/* Mobile slide-out menu – يظهر فقط إذا menuOpen = true */}
      {menuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}>
          <nav
            className="mobile-menu-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <div className="mobile-menu-title">WORKLY</div>
              <button
                type="button"
                className="mobile-menu-close"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            {!loggedIn ? (
              <>
                <div className="mobile-menu-section">
                  <div className="mobile-menu-section-label">Account</div>
                  <ul className="mobile-menu-list">
                    <li className="mobile-menu-item">
                      <Link
                        href="/join"
                        className="mobile-menu-link"
                        onClick={closeMenu}
                      >
                        Join Workly
                      </Link>
                    </li>
                    <li className="mobile-menu-item">
                      <Link
                        href="/signin"
                        className="mobile-menu-link secondary"
                        onClick={closeMenu}
                      >
                        Sign in
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mobile-menu-section">
                  <div className="mobile-menu-section-label">For students</div>
                  <ul className="mobile-menu-list">
                    <li className="mobile-menu-item">
                      <a
                        href="#categories"
                        className="mobile-menu-link secondary"
                        onClick={closeMenu}
                      >
                        Browse categories
                      </a>
                    </li>
                    <li className="mobile-menu-item">
                      <a
                        href="#how-workly-works"
                        className="mobile-menu-link secondary"
                        onClick={closeMenu}
                      >
                        How Workly works
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="mobile-menu-section">
                  <div className="mobile-menu-section-label">General</div>
                  <ul className="mobile-menu-list">
                    <li className="mobile-menu-item">
                      <Link
                        href="/about"
                        className="mobile-menu-link secondary"
                        onClick={closeMenu}
                      >
                        About Workly
                      </Link>
                    </li>
                    <li className="mobile-menu-item">
                      <Link
                        href="/support"
                        className="mobile-menu-link secondary"
                        onClick={closeMenu}
                      >
                        Support
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="mobile-menu-section">
                  <div className="mobile-menu-section-label">Account</div>
                  <ul className="mobile-menu-list">
                    <li className="mobile-menu-item">
                      <div className="mobile-menu-link secondary">
                        {userName || "Student"}
                      </div>
                    </li>
                    <li className="mobile-menu-item">
                      <Link
                        href="/dashboard"
                        className="mobile-menu-link"
                        onClick={closeMenu}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="mobile-menu-item">
                      <Link
                        href="/orders"
                        className="mobile-menu-link secondary"
                        onClick={closeMenu}
                      >
                        Orders
                      </Link>
                    </li>
                    <li className="mobile-menu-item">
                      <Link
                        href="/logout"
                        className="mobile-menu-link secondary"
                        onClick={closeMenu}
                      >
                        Log out
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mobile-menu-section">
                  <div className="mobile-menu-section-label">Explore</div>
                  <ul className="mobile-menu-list">
                    <li className="mobile-menu-item">
                      <a
                        href="#categories"
                        className="mobile-menu-link secondary"
                        onClick={closeMenu}
                      >
                        Browse categories
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
