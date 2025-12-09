import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((open) => !open);
  const closeMenu = () => setIsMenuOpen(false);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeMenu();
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="top-nav">
          <button
            type="button"
            className="hamburger-btn"
            aria-label="Open menu"
            onClick={toggleMenu}
          >
            <span />
            <span />
          </button>

          <div className="top-nav-title">WORKLY</div>

          <Link href="#join" className="join-button">
            Join
          </Link>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={handleOverlayClick}
        >
          <nav className="mobile-menu" aria-label="Workly navigation">
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">WORKLY</span>
              <button
                type="button"
                className="mobile-menu-close"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                ×
              </button>
            </div>

            <div className="mobile-menu-section">
              <div className="mobile-menu-section-label">Account</div>
              <div className="mobile-menu-link-group">
                <Link
                  href="#join"
                  className="mobile-menu-link"
                  onClick={closeMenu}
                >
                  Join Workly
                </Link>
                <Link
                  href="#join"
                  className="mobile-menu-link mobile-menu-link-muted"
                  onClick={closeMenu}
                >
                  Sign in
                </Link>
              </div>
            </div>

            <div className="mobile-menu-section">
              <div className="mobile-menu-section-label">For students</div>
              <div className="mobile-menu-link-group">
                <Link
                  href="#categories"
                  className="mobile-menu-link"
                  onClick={closeMenu}
                >
                  Browse categories
                </Link>
                <Link
                  href="#how-it-works"
                  className="mobile-menu-link mobile-menu-link-muted"
                  onClick={closeMenu}
                >
                  How Workly works
                </Link>
              </div>
            </div>

            <div className="mobile-menu-section">
              <div className="mobile-menu-section-label">General</div>
              <div className="mobile-menu-link-group">
                <Link
                  href="/"
                  className="mobile-menu-link"
                  onClick={closeMenu}
                >
                  Home
                </Link>
                <Link
                  href="#support"
                  className="mobile-menu-link mobile-menu-link-muted"
                  onClick={closeMenu}
                >
                  Support
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
