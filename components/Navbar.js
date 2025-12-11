import React, { useState } from "react";
import Link from "next/link";
import { useAuthModal } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openAuthModal } = useAuthModal();

  const openForIntent = (intent = "student") => {
    openAuthModal(intent);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="top-nav">
        <button
          type="button"
          className="menu-button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="menu-button-lines">
            <span className="menu-button-line" />
            <span className="menu-button-line" />
            <span className="menu-button-line" />
          </span>
        </button>

        <div className="brand-center">WORKLY</div>

        <button
          type="button"
          className="join-button"
          data-auth-modal-trigger
          onClick={() => openForIntent("student")}
        >
          Join
        </button>
      </header>

      {menuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMenuOpen(false)}
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
                onClick={() => setMenuOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="mobile-menu-section">
              <div className="mobile-menu-section-label">ACCOUNT</div>
              <ul className="mobile-menu-list">
                <li className="mobile-menu-item">
                  <button
                    type="button"
                    className="mobile-menu-link"
                    data-auth-modal-trigger
                    onClick={() => openForIntent("student")}
                  >
                    Join Workly
                  </button>
                </li>
                <li className="mobile-menu-item">
                  <button
                    type="button"
                    className="mobile-menu-link secondary"
                    data-auth-modal-trigger
                    data-auth-modal-intent="creator"
                    onClick={() => openForIntent("creator")}
                  >
                    Join as a Creator
                  </button>
                </li>
                <li className="mobile-menu-item">
                  <button
                    type="button"
                    className="mobile-menu-link secondary"
                    data-auth-modal-trigger
                    onClick={() => openForIntent("student")}
                  >
                    Sign in
                  </button>
                </li>
              </ul>
            </div>

            <div className="mobile-menu-section">
              <div className="mobile-menu-section-label">FOR STUDENTS</div>
              <ul className="mobile-menu-list">
                <li className="mobile-menu-item">
                  <Link href="#categories" className="mobile-menu-link">
                    Browse categories
                  </Link>
                </li>
                <li className="mobile-menu-item">
                  <Link
                    href="#how-workly-works"
                    className="mobile-menu-link secondary"
                  >
                    How Workly works
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mobile-menu-section">
              <div className="mobile-menu-section-label">GENERAL</div>
              <ul className="mobile-menu-list">
                <li className="mobile-menu-item">
                  <Link href="/about" className="mobile-menu-link">
                    About Workly
                  </Link>
                </li>
                <li className="mobile-menu-item">
                  <Link href="/support" className="mobile-menu-link secondary">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
