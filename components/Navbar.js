import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  let openAuthModal;
  try {
    const ctx = null;
    openAuthModal =
      ctx && typeof ctx.openAuthModal === "function" ? ctx.openAuthModal : undefined;
  } catch (e) {
    openAuthModal = undefined;
  }

  useEffect(() => {
    const close = () => setMenuOpen(false);
    router.events?.on("routeChangeStart", close);
    return () => router.events?.off("routeChangeStart", close);
  }, [router.events]);

  const go = (href) => {
    setMenuOpen(false);
    router.push(href);
  };

  const openForIntent = (intent = "student") => {
    setMenuOpen(false);
    if (openAuthModal) return window.location.href="/auth";
    if (intent === "creator") return router.push("/creators/setup");
    return router.push("/auth/email");
  };

  return (
    <>
      <header className="top-nav">
        <button
          type="button"
          className="menu-button"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
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
          role="presentation"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
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
                    onClick={() => (openAuthModal ? openForIntent("student") : go("/auth"))}
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
                  <a
                    href="#categories"
                    className="mobile-menu-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    Browse categories
                  </a>
                </li>
                <li className="mobile-menu-item">
                  <a
                    href="#how-workly-works"
                    className="mobile-menu-link secondary"
                    onClick={() => setMenuOpen(false)}
                  >
                    How Workly works
                  </a>
                </li>
              </ul>
            </div>

            <div className="mobile-menu-section">
              <div className="mobile-menu-section-label">GENERAL</div>
              <ul className="mobile-menu-list">
                <li className="mobile-menu-item">
                  <Link
                    href="/about"
                    className="mobile-menu-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    About Workly
                  </Link>
                </li>
                <li className="mobile-menu-item">
                  <Link
                    href="/support"
                    className="mobile-menu-link secondary"
                    onClick={() => setMenuOpen(false)}
                  >
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
