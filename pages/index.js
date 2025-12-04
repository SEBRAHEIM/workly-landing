import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const categories = [
  { key: "reports", label: "Reports & Essays", hint: "Word docs, research, reflections" },
  { key: "presentations", label: "Presentations & PPT", hint: "Slides, speaker notes, templates" },
  { key: "group", label: "Group projects", hint: "Case studies, group assignments" },
  { key: "excel", label: "Excel & Data", hint: "Sheets, dashboards, simple stats" },
  { key: "coding", label: "Programming & Tech", hint: "Basic apps, code snippets" },
  { key: "other", label: "Other uni tasks", hint: "Anything that doesn’t fit above" },
];

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="home-root">
      <Head>
        <title>Workly – University projects, done for you.</title>
        <meta
          name="description"
          content="Upload your university assessment as a student, or apply as a trusted creator. Workly connects both sides privately with clear approvals and payments."
        />
      </Head>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="desktop-layout">
        <div className="home-desktop-shell">
          {/* Top nav */}
          <header className="home-desktop-nav">
            <div className="home-nav-left">
              <button
                type="button"
                className="home-burger-btn"
                onClick={() => setNavOpen(true)}
                aria-label="Open menu"
              >
                <span />
                <span />
              </button>
              <div className="home-logo">WORKLY</div>
            </div>
            <nav className="home-nav-right">
              <Link href="/creator/apply" className="home-link-plain">
                Become a creator
              </Link>
              <Link href="/login" className="home-link-plain">
                Sign in
              </Link>
              <Link href="/get-started" className="home-nav-join">
                Join
              </Link>
            </nav>
          </header>

          {/* Main content */}
          <main className="home-desktop-main">
            {/* Hero */}
            <section className="home-desktop-hero">
              <div className="home-desktop-copy">
                <p className="home-kicker">University projects, done for you.</p>
                <h1 className="home-title">
                  Our creators will <span>take it from here.</span>
                </h1>
                <p className="home-sub">
                  Upload your rubric, choose a creator, and keep everything inside
                  Workly. No sharing numbers, no searching in WhatsApp.
                </p>
                <div className="home-actions">
                  <Link href="/get-started" className="home-primary-btn">
                    Find a creator
                  </Link>
                  <Link href="/login" className="home-secondary-btn">
                    Upload a rubric
                  </Link>
                </div>
              </div>

              <div className="home-desktop-search-card">
                <p className="home-search-label">What do you need help with?</p>
                <div className="home-search-row">
                  <input
                    className="home-search-input"
                    placeholder={`Try "HR group presentation"`}
                    readOnly
                  />
                  <button className="home-search-btn" type="button">
                    Browse creators
                  </button>
                </div>
                <p className="home-search-hint">
                  No public contact details. Students and creators stay inside Workly.
                </p>
              </div>
            </section>

            {/* Categories row */}
            <section className="home-section">
              <h2 className="home-section-title">Popular uni work categories</h2>
              <div className="home-categories-grid">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    className="home-category-card"
                  >
                    <div className="home-category-label">{cat.label}</div>
                    <div className="home-category-hint">{cat.hint}</div>
                  </button>
                ))}
              </div>
            </section>
          </main>

          <footer className="home-footer">
            <p className="home-footer-brand">© 2025 Workly.day</p>
            <div className="home-footer-links">
              <Link href="/terms">Terms</Link>
              <span>·</span>
              <Link href="/privacy">Privacy</Link>
              <span>·</span>
              <Link href="/support">Support</Link>
            </div>
          </footer>
        </div>
      </div>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="mobile-layout">
        <div className="home-mobile-shell">
          {/* Top bar */}
          <header className="home-mobile-header">
            <button
              type="button"
              className="home-burger-btn"
              onClick={() => setNavOpen(true)}
              aria-label="Open menu"
            >
              <span />
              <span />
            </button>
            <div className="home-logo">WORKLY</div>
            <Link href="/get-started" className="home-mobile-join">
              Join
            </Link>
          </header>

          <main className="home-mobile-main">
            {/* Hero like Fiverr mobile */}
            <section className="home-mobile-hero">
              <h1 className="home-mobile-title">
                Our creators will take it <span>from here.</span>
              </h1>
              <p className="home-sub">
                Search what you need, choose a creator, and keep everything private
                inside Workly.
              </p>
              <div className="home-mobile-search">
                <input
                  className="home-search-input"
                  placeholder={`Try "HR group project"`}
                  readOnly
                />
                <button className="home-search-btn" type="button">
                  Search
                </button>
              </div>
            </section>

            {/* Category cards like Fiverr screenshot */}
            <section className="home-mobile-categories">
              <div className="home-mobile-cards-grid">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    className="home-mobile-category-card"
                  >
                    <div className="home-mobile-category-icon">
                      {cat.label[0]}
                    </div>
                    <div className="home-mobile-category-text">
                      {cat.label}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </main>

          <footer className="home-footer home-footer-mobile">
            <p className="home-footer-brand">© 2025 Workly.day</p>
          </footer>
        </div>
      </div>

      {/* ===== SIDE MENU (desktop + mobile) ===== */}
      {navOpen && (
        <div
          className="home-side-overlay"
          onClick={() => setNavOpen(false)}
        >
          <aside
            className="home-side-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="home-side-header">
              <div className="home-logo">WORKLY</div>
              <button
                type="button"
                className="home-side-close"
                onClick={() => setNavOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className="home-side-nav">
              <div className="home-side-section-label">General</div>
              <Link href="/" className="home-side-link">
                Home
              </Link>
              <button type="button" className="home-side-link muted">
                Languages
              </button>
              <button type="button" className="home-side-link">
                AED (currency)
              </button>
            </nav>

            <div className="home-side-bottom">
              <Link href="/creator/apply" className="home-side-link">
                Become a creator
              </Link>
              <Link href="/login" className="home-side-link">
                Sign in
              </Link>
              <Link href="/get-started" className="home-side-join">
                Join Workly
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
