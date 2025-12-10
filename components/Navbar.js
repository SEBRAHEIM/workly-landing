import React, { useState } from "react";
import Link from "next/link";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="top-nav">
        <button
          type="button"
          className="menu-button"
          aria-label="Open menu"
          onClick={openMenu}
        >
          <span className="menu-button-lines">
            <span className="menu-button-line" />
            <span className="menu-button-line" />
            <span className="menu-button-line" />
          </span>
        </button>

        <div className="brand-center">WORKLY</div>

        <Link href="/join" className="join-button">
          Join
        </Link>
      </header>

      {isMenuOpen && (
        <div
          className="mobile-menu-overlay"
          role="dialog"
          aria-modal="true"
          onClick={closeMenu}
        >
          <div
            className="mobile-menu-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <div className="mobile-menu-title">WORKLY</div>
              <button
                type="button"
                className="mobile-menu-close"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                ×
              </button>
            </div>

            <nav className="mobile-menu-nav">
              <section className="mobile-menu-section">
                <div className="mobile-menu-section-label">Account</div>
                <ul className="mobile-menu-list">
                  <li className="mobile-menu-item">
                    <Link href="/join" className="mobile-menu-link">
                      Join Workly
                    </Link>
                  </li>
                  <li className="mobile-menu-item">
                    <Link
                      href="/signin"
                      className="mobile-menu-link secondary"
                    >
                      Sign in
                    </Link>
                  </li>
                </ul>
              </section>

              <hr className="mobile-menu-divider" />

              <section className="mobile-menu-section">
                <div className="mobile-menu-section-label">For students</div>
                <ul className="mobile-menu-list">
                  <li className="mobile-menu-item">
                    <Link
                      href="/#categories"
                      className="mobile-menu-link"
                      onClick={closeMenu}
                    >
                      Browse categories
                    </Link>
                  </li>
                  <li className="mobile-menu-item">
                    <Link
                      href="/how-workly-works"
                      className="mobile-menu-link secondary"
                    >
                      How Workly works
                    </Link>
                  </li>
                </ul>
              </section>

              <hr className="mobile-menu-divider" />

              <section className="mobile-menu-section">
                <div className="mobile-menu-section-label">General</div>
                <ul className="mobile-menu-list">
                  <li className="mobile-menu-item">
                    <Link
                      href="/about"
                      className="mobile-menu-link secondary"
                    >
                      About Workly
                    </Link>
                  </li>
                  <li className="mobile-menu-item">
                    <Link
                      href="/support"
                      className="mobile-menu-link secondary"
                    >
                      Support
                    </Link>
                  </li>
                </ul>
              </section>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
